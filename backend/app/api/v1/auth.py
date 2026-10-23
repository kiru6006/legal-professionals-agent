from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.auth import UserRegisterRequest, UserLoginRequest, TokenResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=dict, status_code=201)
async def register(
    data: UserRegisterRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """Register a new user account."""
    service = AuthService(db)
    user = await service.register(data, ip=request.client.host if request.client else None)
    return {
        "message": "Account created successfully. Please claim and verify your professional profile.",
        "user_id": str(user.id),
        "email": user.email,
    }


@router.post("/login", response_model=dict)
async def login(
    data: UserLoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """Authenticate and receive JWT access + refresh tokens."""
    service = AuthService(db)
    return await service.login(
        data.email,
        data.password,
        ip=request.client.host if request.client else None,
    )
