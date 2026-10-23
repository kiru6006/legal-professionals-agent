import structlog
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import AuditLog

logger = structlog.get_logger()


async def write_audit_log(
    db: AsyncSession,
    event_type: str,
    entity_name: str,
    entity_id: Optional[uuid.UUID] = None,
    actor_id: Optional[uuid.UUID] = None,
    metadata: Optional[dict] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> AuditLog:
    """
    Deterministic audit log writer. Always appends; never mutates existing records.
    Every critical platform action, AI recommendation, and user event
    must be traced through this function.
    """
    log_entry = AuditLog(
        actor_id=actor_id,
        event_type=event_type,
        entity_name=entity_name,
        entity_id=entity_id,
        metadata=metadata or {},
        ip_address=ip_address,
        user_agent=user_agent,
    )
    db.add(log_entry)
    await db.flush()  # get ID without committing transaction

    logger.info(
        "audit_event",
        event_type=event_type,
        entity_name=entity_name,
        entity_id=str(entity_id) if entity_id else None,
        actor_id=str(actor_id) if actor_id else None,
    )
    return log_entry
