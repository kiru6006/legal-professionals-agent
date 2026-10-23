from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from uuid import UUID
import json

from app.core.database import get_db
from app.core.security import get_current_user, get_optional_user
from app.models.user import User
from app.schemas.ai import AskNetworkRequest, AskNetworkResponse, AIExtractRequest, AIExtractResponse, AIExtractedDraft
from app.agents.discovery import run_discovery_agent, extract_profile_from_text
from app.core.audit import write_audit_log

router = APIRouter(prefix="/ai", tags=["AI Agents"])


@router.post("/ask", response_model=AskNetworkResponse)
@router.post("/ask-network", response_model=AskNetworkResponse)
async def ask_network(
    request: AskNetworkRequest,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    """
    AI orchestration hub — 'Ask the Network'.
    Parses natural language intent, routes to appropriate agent, and returns
    grounded professional recommendations with explainable reasoning.
    """
    actor_id = current_user.id if current_user else None

    prompt = request.prompt or request.query
    response = await run_discovery_agent(db, prompt, actor_id=actor_id)

    # Audit the AI interaction
    await write_audit_log(
        db,
        event_type="AI_SEARCH_PERFORMED",
        entity_name="AIInteraction",
        actor_id=actor_id,
        metadata={
            "prompt": prompt[:200],
            "intent_detected": response.intent_detected.value,
            "recommendations_count": len(response.recommendations),
            "confidence": response.confidence,
        },
    )

    return response


@router.post("/profiles/extract", response_model=AIExtractResponse)
@router.post("/extract-profile", response_model=AIExtractResponse)
async def extract_profile_ai(
    request: AIExtractRequest,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    """
    AI Profile Intelligence — extract structured profile data from bio/resume text.
    Returns a DRAFT that must be reviewed and approved by the user before applying.
    """
    extracted = await extract_profile_from_text(request.raw_text)

    await write_audit_log(
        db,
        event_type="AI_PROFILE_EXTRACT",
        entity_name="ProfessionalProfile",
        actor_id=current_user.id if current_user else None,
        metadata={"text_length": len(request.raw_text)},
    )

    return AIExtractResponse(
        extracted_draft=AIExtractedDraft(
            years_of_experience=extracted.get("years_of_experience"),
            practice_areas=extracted.get("practice_areas", []),
            courts=extracted.get("courts", []),
            services_offered=extracted.get("services_offered", []),
            languages=extracted.get("languages", []),
        ),
        needs_user_confirmation=True,
        unmatched_terms=extracted.get("unmatched_terms", []),
    )


@router.websocket("/stream")
async def ws_ai_stream(websocket: WebSocket, db: AsyncSession = Depends(get_db)):
    """
    WebSocket endpoint for streaming agent reasoning steps to the frontend.
    Allows the user to see the AI thought process in real time.
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            query = payload.get("query", "")

            if not query:
                await websocket.send_json({"type": "ERROR", "content": "Query is required"})
                continue

            # Stream steps
            await websocket.send_json({"type": "STEP", "content": "Analysing your query..."})
            await websocket.send_json({"type": "STEP", "content": "Parsing intent and extracting search criteria..."})

            response = await run_discovery_agent(db, query)

            await websocket.send_json({"type": "STEP", "content": f"Searching {len(response.recommendations)} candidates in the professional network..."})
            await websocket.send_json({"type": "STEP", "content": "Applying grounding validation to verify each recommendation..."})
            await websocket.send_json({"type": "RESULT", "data": response.model_dump(mode="json")})
            await websocket.send_json({"type": "DONE"})

    except WebSocketDisconnect:
        pass
    except Exception as e:
        try:
            await websocket.send_json({"type": "ERROR", "content": str(e)})
        except Exception:
            pass
