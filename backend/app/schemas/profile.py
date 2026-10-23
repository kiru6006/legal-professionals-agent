from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


# ─── Taxonomy schemas ──────────────────────────────────────────────────────────

class DistrictOut(BaseModel):
    id: UUID
    name: str
    state: str
    model_config = {"from_attributes": True}


class CourtOut(BaseModel):
    id: UUID
    name: str
    court_type: str
    district: Optional[DistrictOut] = None
    model_config = {"from_attributes": True}


class PracticeAreaOut(BaseModel):
    id: UUID
    slug: str
    name: str
    description: Optional[str] = None
    model_config = {"from_attributes": True}


class ServiceOut(BaseModel):
    id: UUID
    slug: str
    title: str
    category: str
    model_config = {"from_attributes": True}


# ─── Profile schemas ───────────────────────────────────────────────────────────

class ProfilePracticeAreaOut(BaseModel):
    practice_area: PracticeAreaOut
    is_primary: bool
    years_focused: int
    model_config = {"from_attributes": True}


class ProfileCourtOut(BaseModel):
    court: CourtOut
    is_regular: bool
    model_config = {"from_attributes": True}


class ProfileServiceOut(BaseModel):
    service: ServiceOut
    details: Optional[str] = None
    is_active: bool
    model_config = {"from_attributes": True}


class ContactInfo(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    is_masked: bool = True
    unmask_instructions: Optional[str] = None


class ProfilePublic(BaseModel):
    """Public profile view – contact info respects privacy settings."""
    id: UUID
    full_name: str
    designation: str
    enrollment_number: str
    is_verified: bool
    years_of_experience: int
    district: Optional[DistrictOut] = None
    headline: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    languages: List[str] = []
    practice_areas: List[ProfilePracticeAreaOut] = []
    courts: List[ProfileCourtOut] = []
    services: List[ProfileServiceOut] = []
    contact_info: ContactInfo
    ai_profile_insights: dict = {}
    is_profile_published: bool
    created_at: datetime
    model_config = {"from_attributes": True}


class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, max_length=255)
    headline: Optional[str] = Field(None, max_length=255)
    bio: Optional[str] = None
    years_of_experience: Optional[int] = Field(None, ge=0, le=60)
    languages: Optional[List[str]] = None
    office_address: Optional[str] = None
    phone_number: Optional[str] = None
    phone_visibility: Optional[str] = None
    email_visibility: Optional[str] = None
    location_visibility: Optional[str] = None


class ProfilePracticeAreaUpdate(BaseModel):
    practice_area_slug: str
    is_primary: bool = False
    years_focused: int = Field(1, ge=0)


class ProfileCourtUpdate(BaseModel):
    court_id: UUID
    is_regular: bool = True


class ProfileServiceUpdate(BaseModel):
    service_slug: str
    details: Optional[str] = None
    is_active: bool = True


# ─── Directory schemas ─────────────────────────────────────────────────────────

class DirectoryRecordPublic(BaseModel):
    id: UUID
    enrollment_number: str
    full_name: str
    bar_association_name: Optional[str] = None
    district_name: str
    record_status: str
    is_claimed: bool = False
    model_config = {"from_attributes": True}


class ClaimProfileRequest(BaseModel):
    enrollment_number: str = Field(..., description="Bar Council enrollment number, e.g. MS/1234/2015")
    bar_council_id_card_doc_url: str = Field(..., description="Uploaded document URL from S3")
    additional_id_doc_url: Optional[str] = None
    declaration_accepted: bool = Field(..., description="Must be true")

    @classmethod
    def validate_declaration(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Declaration must be accepted to proceed with claim")
        return v


class ClaimResponse(BaseModel):
    claim_id: UUID
    directory_id: Optional[UUID]
    status: str
    estimated_review_time: str = "24-48 hours"
    submitted_at: datetime
    model_config = {"from_attributes": True}
