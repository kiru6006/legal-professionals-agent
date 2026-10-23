from pydantic import BaseModel, Field
from typing import Optional, List, Any
from uuid import UUID
from enum import Enum


class IntentType(str, Enum):
    PROFESSIONAL_DISCOVERY = "PROFESSIONAL_DISCOVERY"
    SERVICE_REQUEST = "SERVICE_REQUEST"
    REFERRAL_REQUEST = "REFERRAL_REQUEST"
    PROFILE_INGESTION = "PROFILE_INGESTION"
    COMMUNITY_KNOWLEDGE = "COMMUNITY_KNOWLEDGE"
    AMBIGUOUS = "AMBIGUOUS"


class ConfidenceLevel(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class AskNetworkRequest(BaseModel):
    prompt: str = Field(..., min_length=5, max_length=2000, description="Natural language query")


class ParsedSearchParameters(BaseModel):
    location: Optional[str] = None
    practice_area: Optional[str] = None
    court: Optional[str] = None
    service_required: Optional[str] = None
    min_experience_years: Optional[int] = None
    languages: Optional[List[str]] = None
    urgency: Optional[str] = None


class MatchReason(BaseModel):
    reason: str
    evidence_key: str
    is_verified: bool = True


class ProfileMatch(BaseModel):
    profile_id: UUID
    full_name: str
    designation: str
    district: Optional[str] = None
    primary_court: Optional[str] = None
    years_experience: int
    is_verified: bool
    avatar_url: Optional[str] = None
    match_reasons: List[str]
    confidence: ConfidenceLevel
    missing_information: List[str] = []


class AskNetworkResponse(BaseModel):
    intent_detected: IntentType
    confidence: float = Field(..., ge=0.0, le=1.0)
    parsed_parameters: Optional[ParsedSearchParameters] = None
    recommendations: List[ProfileMatch] = []
    alternative_suggestions: List[str] = []
    clarification_question: Optional[str] = None  # set when intent is AMBIGUOUS


class AIExtractRequest(BaseModel):
    raw_text: str = Field(..., min_length=20, max_length=10000)


class AIExtractedDraft(BaseModel):
    years_of_experience: Optional[int] = None
    practice_areas: List[str] = []
    courts: List[str] = []
    services_offered: List[str] = []
    languages: List[str] = []


class AIExtractResponse(BaseModel):
    extracted_draft: AIExtractedDraft
    needs_user_confirmation: bool = True
    unmatched_terms: List[str] = []
