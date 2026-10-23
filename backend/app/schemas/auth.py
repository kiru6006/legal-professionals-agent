from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    phone_number: Optional[str] = Field(None, pattern=r"^\+?[0-9]{10,15}$")

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        return v


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: "UserPublic"


class UserPublic(BaseModel):
    id: UUID
    email: str
    role: str
    is_verified: bool
    profile_id: Optional[UUID] = None

    model_config = {"from_attributes": True}


class RefreshTokenRequest(BaseModel):
    refresh_token: str
