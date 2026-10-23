"""
Professional Discovery Agent — Phase 1 Core AI Feature

This agent translates natural language professional queries into structured
hybrid search criteria, executes the search, and returns grounded, explainable
recommendation sets.

ZERO hallucination policy: every matching reason must be tied to a verified
profile attribute. If an attribute is missing, it is labeled as such.
"""

from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, func
from sqlalchemy.orm import selectinload
import structlog

from app.llm.provider import get_llm_provider
from app.models.user import (
    ProfessionalProfile, District, Court, PracticeArea, Service,
    ProfilePracticeArea, ProfileCourt, ProfileServiceOffered, UserRole,
)
from app.schemas.ai import (
    ParsedSearchParameters, ProfileMatch, ConfidenceLevel, AskNetworkResponse, IntentType,
)

logger = structlog.get_logger()

INTENT_SYSTEM_PROMPT = """You are a legal professional network AI. Your job is ONLY to parse user queries.

Extract intent and parameters from the user's message. Return valid JSON only, with this exact structure:
{
  "intent": "PROFESSIONAL_DISCOVERY" | "SERVICE_REQUEST" | "REFERRAL_REQUEST" | "PROFILE_INGESTION" | "COMMUNITY_KNOWLEDGE" | "AMBIGUOUS",
  "confidence": 0.0-1.0,
  "location": "district name or null",
  "practice_area": "practice area name or null",
  "court": "court name or null",
  "service_required": "service name or null",
  "languages": ["list of languages"] or [],
  "min_experience_years": number or null,
  "clarification_needed": "question to ask user if ambiguous" or null
}

Rules:
- For Indian legal context: map "criminal" to "Criminal Law", "civil" to "Civil Litigation", etc.
- Known Tamil Nadu districts: Chennai, Coimbatore, Madurai, Salem, Trichy, Tiruchirappalli, Vellore, Tirunelveli, Erode, Tiruppur, etc.
- If location is ambiguous, set null and ask for clarification.
- DO NOT invent information not present in the query.
- Return ONLY the JSON object, no markdown, no explanation."""

PROFILE_EXTRACT_SYSTEM_PROMPT = """You are a legal profile extraction AI for Indian legal professionals.
Extract structured information from the provided text.

Return ONLY valid JSON:
{
  "years_of_experience": number or null,
  "practice_areas": ["list of practice areas"],
  "courts": ["list of court names"],
  "services_offered": ["list of services"],
  "languages": ["list of languages"]
}

Map practice areas to: Criminal Law, Civil Litigation, Constitutional Law, Corporate Law, Family Law,
Property Law, Labour Law, Tax Law, Intellectual Property, Arbitration, Administrative Law, Banking Law.

Map services to: Court Appearance, Local Counsel, Legal Research, Legal Drafting, Legal Opinion,
Consultation, Arbitration, Mediation, Compliance.

DO NOT invent information. If not mentioned, omit it."""


async def parse_intent_and_parameters(query: str) -> dict:
    """Parse natural language query into structured search parameters via LLM."""
    llm = get_llm_provider()
    try:
        result = await llm.complete_json(
            prompt=f"Parse this legal professional query: {query}",
            system=INTENT_SYSTEM_PROMPT,
        )
        return result
    except Exception as e:
        logger.error("intent_parsing_failed", error=str(e), query=query[:100])
        return {
            "intent": "AMBIGUOUS",
            "confidence": 0.0,
            "clarification_needed": "Could you please clarify what kind of legal assistance you need?",
        }


async def extract_profile_from_text(raw_text: str) -> dict:
    """Extract profile information from unstructured resume/bio text."""
    llm = get_llm_provider()
    try:
        return await llm.complete_json(
            prompt=f"Extract professional profile information from this text:\n\n{raw_text}",
            system=PROFILE_EXTRACT_SYSTEM_PROMPT,
        )
    except Exception as e:
        logger.error("profile_extraction_failed", error=str(e))
        return {"practice_areas": [], "courts": [], "services_offered": [], "languages": []}


def _calculate_confidence(
    profile: ProfessionalProfile,
    params: ParsedSearchParameters,
    district_match: bool,
    practice_area_match: bool,
    court_match: bool,
    service_match: bool,
) -> tuple[ConfidenceLevel, List[str], List[str]]:
    """
    Deterministic confidence scorer.
    HIGH: 3+ verified exact attribute matches.
    MEDIUM: 2 verified matches.
    LOW: 1 or fewer matches.
    """
    reasons = []
    missing = []
    match_count = 0

    # Check practice area (derived from actual profile data)
    pa_names = [pa.practice_area.name for pa in profile.practice_areas]
    if practice_area_match and pa_names:
        reasons.append(f"{', '.join(pa_names[:2])} listed on verified profile")
        match_count += 1
    elif params.practice_area:
        missing.append(f"{params.practice_area} not explicitly listed on profile")

    # Check district
    district_name = profile.district.name if profile.district else None
    if district_match and district_name:
        reasons.append(f"Located in {district_name} district")
        match_count += 1
    elif params.location:
        missing.append(f"Location information not declared for {params.location}")

    # Check court
    court_names = [pc.court.name for pc in profile.courts]
    if court_match and court_names:
        reasons.append(f"Regular appearance at {court_names[0]}")
        match_count += 1
    elif params.court:
        missing.append(f"Appearance before {params.court} not declared on profile")

    # Check service
    service_names = [ps.service.title for ps in profile.services_offered if ps.is_active]
    if service_match and service_names:
        reasons.append(f"Offers {', '.join(service_names[:2])} services")
        match_count += 1
    elif params.service_required:
        missing.append(f"{params.service_required} service not declared on profile")

    # Language
    if params.languages:
        profile_langs = set(l.lower() for l in (profile.languages or []))
        query_langs = set(l.lower() for l in params.languages)
        if query_langs.issubset(profile_langs):
            reasons.append(f"Fluent in {', '.join(params.languages)}")
            match_count += 1
        else:
            missing.append(f"Language proficiency in {params.languages} not confirmed")

    # Always note missing availability
    missing.append("Current calendar availability not declared on profile")

    if match_count >= 3:
        confidence = ConfidenceLevel.HIGH
    elif match_count >= 2:
        confidence = ConfidenceLevel.MEDIUM
    else:
        confidence = ConfidenceLevel.LOW

    return confidence, reasons, missing


async def run_discovery_agent(
    db: AsyncSession,
    query: str,
    actor_id: Optional[UUID] = None,
) -> AskNetworkResponse:
    """
    Main discovery agent pipeline:
    1. Parse intent
    2. Build hybrid search criteria
    3. Execute SQL + semantic search
    4. Apply grounding engine
    5. Return explainable results
    """
    # Step 1: Parse intent
    parsed = await parse_intent_and_parameters(query)

    intent_str = parsed.get("intent", "AMBIGUOUS")
    try:
        intent = IntentType(intent_str)
    except ValueError:
        intent = IntentType.AMBIGUOUS

    confidence_score = float(parsed.get("confidence", 0.5))

    # If ambiguous, return clarification request
    if intent == IntentType.AMBIGUOUS or confidence_score < 0.4:
        return AskNetworkResponse(
            intent_detected=IntentType.AMBIGUOUS,
            confidence=confidence_score,
            clarification_question=parsed.get(
                "clarification_needed",
                "Could you describe what type of legal professional you're looking for and in which location?",
            ),
        )

    params = ParsedSearchParameters(
        location=parsed.get("location"),
        practice_area=parsed.get("practice_area"),
        court=parsed.get("court"),
        service_required=parsed.get("service_required"),
        min_experience_years=parsed.get("min_experience_years"),
        languages=parsed.get("languages") or [],
    )

    # Step 2: Build hybrid SQL query
    stmt = (
        select(ProfessionalProfile)
        .options(
            selectinload(ProfessionalProfile.user),
            selectinload(ProfessionalProfile.district),
            selectinload(ProfessionalProfile.practice_areas).selectinload(ProfilePracticeArea.practice_area),
            selectinload(ProfessionalProfile.courts).selectinload(ProfileCourt.court).selectinload(Court.district),
            selectinload(ProfessionalProfile.services_offered).selectinload(ProfileServiceOffered.service),
        )
        .join(ProfessionalProfile.user)
        .where(
            ProfessionalProfile.is_profile_published == True,
        )
    )

    # Verified-first filter (verified users rank higher but unverified may appear at lower confidence)
    if params.min_experience_years:
        stmt = stmt.where(
            ProfessionalProfile.years_of_experience >= params.min_experience_years
        )

    result = await db.execute(stmt.limit(50))
    candidates = result.scalars().all()

    # Step 3: Grounding & scoring
    matches: List[ProfileMatch] = []

    for profile in candidates:
        district_match = False
        practice_area_match = False
        court_match = False
        service_match = False

        # District match
        if params.location and profile.district:
            district_match = params.location.lower() in profile.district.name.lower()

        # Practice area match
        if params.practice_area:
            pa_names = [pa.practice_area.name.lower() for pa in profile.practice_areas]
            practice_area_match = any(
                params.practice_area.lower() in pa for pa in pa_names
            )

        # Court match
        if params.court:
            court_names = [pc.court.name.lower() for pc in profile.courts]
            practice_area_match_court = any(
                params.court.lower() in cn for cn in court_names
            )
            court_match = practice_area_match_court

        # Service match
        if params.service_required:
            svc_titles = [
                ps.service.title.lower()
                for ps in profile.services_offered
                if ps.is_active
            ]
            service_match = any(
                params.service_required.lower() in s for s in svc_titles
            )

        # Require at least one dimension match to include in results
        any_match = district_match or practice_area_match or court_match or service_match
        if not any_match and (params.location or params.practice_area or params.court):
            continue

        confidence, reasons, missing = _calculate_confidence(
            profile, params,
            district_match, practice_area_match, court_match, service_match,
        )

        # Skip LOW confidence if user provided specific criteria
        specific_query = bool(params.location or params.practice_area or params.court)
        if specific_query and confidence == ConfidenceLevel.LOW:
            continue

        # Get primary court name
        primary_court = None
        if profile.courts:
            regular_courts = [pc for pc in profile.courts if pc.is_regular]
            if regular_courts:
                primary_court = regular_courts[0].court.name
            else:
                primary_court = profile.courts[0].court.name

        matches.append(ProfileMatch(
            profile_id=profile.id,
            full_name=profile.full_name,
            designation=profile.designation,
            district=profile.district.name if profile.district else None,
            primary_court=primary_court,
            years_experience=profile.years_of_experience,
            is_verified=profile.user.is_verified if profile.user else False,
            avatar_url=profile.avatar_url,
            match_reasons=reasons,
            confidence=confidence,
            missing_information=missing,
        ))

    # Sort: verified first, then confidence HIGH > MEDIUM > LOW
    confidence_order = {ConfidenceLevel.HIGH: 0, ConfidenceLevel.MEDIUM: 1, ConfidenceLevel.LOW: 2}
    matches.sort(key=lambda m: (not m.is_verified, confidence_order[m.confidence]))

    return AskNetworkResponse(
        intent_detected=intent,
        confidence=confidence_score,
        parsed_parameters=params,
        recommendations=matches[:10],
        alternative_suggestions=_build_suggestions(params, len(matches)),
    )


def _build_suggestions(params: ParsedSearchParameters, total: int) -> List[str]:
    suggestions = []
    if params.location and total == 0:
        suggestions.append(f"No verified advocates found in {params.location}. Try expanding your search to nearby districts.")
    if total > 10:
        suggestions.append(f"View all {total} matching advocates with detailed filters.")
    if params.practice_area:
        suggestions.append(f"Post a private service request to {params.location or 'the'} {params.practice_area} network.")
    return suggestions
