from datetime import datetime, timezone
from typing import Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from fastapi import HTTPException, status
import structlog

from app.models.user import User, UserRole
from app.schemas.auth import UserRegisterRequest
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from app.core.config import settings
from app.core.audit import write_audit_log

logger = structlog.get_logger()


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def register(self, data: UserRegisterRequest, ip: Optional[str] = None) -> User:
        # Check email uniqueness
        existing = await self.db.execute(select(User).where(User.email == data.email))
        if existing.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists",
            )

        user = User(
            email=data.email,
            phone_number=data.phone_number,
            password_hash=hash_password(data.password),
            role=UserRole.ADVOCATE_UNVERIFIED,
            is_active=True,
            is_verified=False,
        )
        self.db.add(user)
        await self.db.flush()

        await write_audit_log(
            self.db,
            event_type="USER_REGISTERED",
            entity_name="User",
            entity_id=user.id,
            actor_id=user.id,
            metadata={"email": data.email},
            ip_address=ip,
        )

        logger.info("user_registered", user_id=str(user.id), email=data.email)
        return user

    async def login(self, email: str, password: str, ip: Optional[str] = None) -> dict:
        result = await self.db.execute(
            select(User).where(User.email == email, User.is_active == True)
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # Update last login
        await self.db.execute(
            update(User)
            .where(User.id == user.id)
            .values(last_login_at=datetime.now(timezone.utc))
        )

        access_token = create_access_token({"sub": str(user.id), "role": user.role.value})
        refresh_token = create_refresh_token({"sub": str(user.id)})

        await write_audit_log(
            self.db,
            event_type="USER_LOGIN",
            entity_name="User",
            entity_id=user.id,
            actor_id=user.id,
            metadata={"email": email},
            ip_address=ip,
        )

        # Get profile ID if exists
        profile_id = None
        if user.profile:
            profile_id = user.profile.id

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role.value,
                "is_verified": user.is_verified,
                "profile_id": profile_id,
            },
        }
