from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func, text
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
import structlog

from app.models.user import (
    User, ProfessionalProfile, DirectoryRecord, District, Court,
    PracticeArea, Service, ProfilePracticeArea, ProfileCourt,
    ProfileServiceOffered, VerificationRequest, PrivacyLevel,
    RecordStatus, UserRole,
)
from app.schemas.profile import (
    ProfilePublic, ProfileUpdateRequest, ClaimProfileRequest,
    ClaimResponse, ContactInfo, DirectoryRecordPublic,
    ProfilePracticeAreaUpdate, ProfileCourtUpdate, ProfileServiceUpdate,
)
from app.core.audit import write_audit_log

logger = structlog.get_logger()

ENROLLMENT_PATTERN_HELP = "Format: MS/XXXX/YYYY (State Code / Number / Year)"


def _mask_phone(phone: Optional[str]) -> Optional[str]:
    if not phone or len(phone) < 6:
        return phone
    visible_suffix = phone[-4:]
    return phone[:3] + "****" + visible_suffix


def _mask_email(email: Optional[str]) -> Optional[str]:
    if not email or "@" not in email:
        return email
    local, domain = email.split("@", 1)
    masked_local = local[:2] + "****" if len(local) > 2 else "****"
    return f"{masked_local}@{domain}"


def _build_contact_info(
    profile: ProfessionalProfile,
    requesting_user: Optional[User],
    is_mutual_connection: bool,
) -> ContactInfo:
    """Apply privacy-level masking deterministically."""
    def can_see_field(visibility: PrivacyLevel) -> bool:
        if visibility == PrivacyLevel.PUBLIC:
            return True
        if visibility == PrivacyLevel.HIDDEN:
            return False
        if requesting_user is None:
            return False
        if requesting_user.role in (UserRole.PLATFORM_ADMIN,):
            return True
        if visibility == PrivacyLevel.VERIFIED_MEMBERS_ONLY:
            return requesting_user.is_verified
        if visibility == PrivacyLevel.MUTUAL_CONNECTIONS_ONLY:
            return is_mutual_connection

    show_phone = can_see_field(profile.phone_visibility)
    show_email = can_see_field(profile.email_visibility)

    return ContactInfo(
        phone=profile.phone_number if show_phone else _mask_phone(profile.phone_number),
        email=profile.user.email if show_email else _mask_email(profile.user.email if profile.user else None),
        is_masked=not (show_phone and show_email),
        unmask_instructions=(
            None if (show_phone and show_email)
            else "Connect with this advocate to exchange verified contact details."
        ),
    )


async def _get_profile_with_relations(db: AsyncSession, profile_id: UUID) -> ProfessionalProfile:
    result = await db.execute(
        select(ProfessionalProfile)
        .options(
            selectinload(ProfessionalProfile.user),
            selectinload(ProfessionalProfile.district),
            selectinload(ProfessionalProfile.practice_areas).selectinload(ProfilePracticeArea.practice_area),
            selectinload(ProfessionalProfile.courts).selectinload(ProfileCourt.court).selectinload(Court.district),
            selectinload(ProfessionalProfile.services_offered).selectinload(ProfileServiceOffered.service),
        )
        .where(ProfessionalProfile.id == profile_id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return profile


class ProfileService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_profile(
        self,
        profile_id: UUID,
        requesting_user: Optional[User] = None,
    ) -> ProfilePublic:
        profile = await _get_profile_with_relations(self.db, profile_id)

        if not profile.is_profile_published and (
            requesting_user is None or str(requesting_user.id) != str(profile.user_id)
        ):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

        is_mutual = False  # Phase 1: simplified - Phase 3 will check actual connections

        contact_info = _build_contact_info(profile, requesting_user, is_mutual)
        return _serialize_profile(profile, contact_info)

    async def update_profile(
        self, user: User, data: ProfileUpdateRequest
    ) -> ProfessionalProfile:
        if not user.profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

        profile = user.profile
        update_data = data.model_dump(exclude_none=True)

        for field, value in update_data.items():
            if hasattr(profile, field):
                setattr(profile, field, value)

        await write_audit_log(
            self.db,
            event_type="PROFILE_UPDATED",
            entity_name="ProfessionalProfile",
            entity_id=profile.id,
            actor_id=user.id,
            metadata={"updated_fields": list(update_data.keys())},
        )
        return profile

    async def publish_profile(self, user: User) -> ProfessionalProfile:
        if not user.profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
        profile = user.profile
        profile.is_profile_published = True

        await write_audit_log(
            self.db, "PROFILE_PUBLISHED", "ProfessionalProfile", profile.id, user.id
        )
        return profile

    async def update_practice_areas(
        self, user: User, areas: List[ProfilePracticeAreaUpdate]
    ) -> None:
        profile = user.profile
        # Remove existing
        existing = await self.db.execute(
            select(ProfilePracticeArea).where(ProfilePracticeArea.profile_id == profile.id)
        )
        for row in existing.scalars():
            await self.db.delete(row)

        for area in areas:
            pa_result = await self.db.execute(
                select(PracticeArea).where(PracticeArea.slug == area.practice_area_slug)
            )
            pa = pa_result.scalar_one_or_none()
            if not pa:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Practice area '{area.practice_area_slug}' not found",
                )
            self.db.add(ProfilePracticeArea(
                profile_id=profile.id,
                practice_area_id=pa.id,
                is_primary=area.is_primary,
                years_focused=area.years_focused,
            ))
        await self.db.flush()

    async def update_courts(self, user: User, courts: List[ProfileCourtUpdate]) -> None:
        profile = user.profile
        existing = await self.db.execute(
            select(ProfileCourt).where(ProfileCourt.profile_id == profile.id)
        )
        for row in existing.scalars():
            await self.db.delete(row)

        for c in courts:
            self.db.add(ProfileCourt(
                profile_id=profile.id,
                court_id=c.court_id,
                is_regular=c.is_regular,
            ))
        await self.db.flush()

    async def update_services(self, user: User, services: List[ProfileServiceUpdate]) -> None:
        profile = user.profile
        existing = await self.db.execute(
            select(ProfileServiceOffered).where(ProfileServiceOffered.profile_id == profile.id)
        )
        for row in existing.scalars():
            await self.db.delete(row)

        for s in services:
            svc_result = await self.db.execute(
                select(Service).where(Service.slug == s.service_slug)
            )
            svc = svc_result.scalar_one_or_none()
            if not svc:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Service '{s.service_slug}' not found",
                )
            self.db.add(ProfileServiceOffered(
                profile_id=profile.id,
                service_id=svc.id,
                details=s.details,
                is_active=s.is_active,
            ))
        await self.db.flush()


class DirectoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def search_directory(
        self,
        query: Optional[str] = None,
        district: Optional[str] = None,
        bar_association: Optional[str] = None,
        status_filter: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[DirectoryRecord]:
        stmt = select(DirectoryRecord)

        filters = []
        if query:
            filters.append(
                or_(
                    DirectoryRecord.full_name.ilike(f"%{query}%"),
                    DirectoryRecord.enrollment_number.ilike(f"%{query}%"),
                )
            )
        if district:
            filters.append(DirectoryRecord.district_name.ilike(f"%{district}%"))
        if bar_association:
            filters.append(DirectoryRecord.bar_association_name.ilike(f"%{bar_association}%"))
        if status_filter:
            filters.append(DirectoryRecord.record_status == status_filter)

        if filters:
            stmt = stmt.where(*filters)

        stmt = stmt.limit(limit).offset(offset)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_record(self, record_id: UUID) -> DirectoryRecord:
        result = await self.db.execute(
            select(DirectoryRecord).where(DirectoryRecord.id == record_id)
        )
        record = result.scalar_one_or_none()
        if not record:
            raise HTTPException(status_code=404, detail="Directory record not found")
        return record

    async def submit_claim(
        self,
        user: User,
        directory_id: UUID,
        data: ClaimProfileRequest,
    ) -> VerificationRequest:
        record = await self.get_record(directory_id)

        if record.record_status not in (RecordStatus.UNCLAIMED,):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"This record is already {record.record_status.value} and cannot be claimed.",
            )

        # Create verification request
        vr = VerificationRequest(
            user_id=user.id,
            directory_record_id=record.id,
            enrollment_number=data.enrollment_number,
            bar_council_id_card_doc_url=data.bar_council_id_card_doc_url,
            additional_id_doc_url=data.additional_id_doc_url,
            status=RecordStatus.VERIFICATION_PENDING,
        )
        self.db.add(vr)

        # Mark directory record as claimed
        record.record_status = RecordStatus.CLAIMED
        record.claimed_user_id = user.id

        await self.db.flush()

        await write_audit_log(
            self.db,
            event_type="CLAIM_SUBMITTED",
            entity_name="VerificationRequest",
            entity_id=vr.id,
            actor_id=user.id,
            metadata={
                "directory_record_id": str(directory_id),
                "enrollment_number": data.enrollment_number,
            },
        )
        return vr


def _serialize_profile(profile: ProfessionalProfile, contact_info: ContactInfo) -> ProfilePublic:
    from app.schemas.profile import (
        ProfilePracticeAreaOut, ProfileCourtOut, ProfileServiceOut,
        PracticeAreaOut, CourtOut, ServiceOut, DistrictOut,
    )

    district_out = None
    if profile.district:
        district_out = DistrictOut(
            id=profile.district.id,
            name=profile.district.name,
            state=profile.district.state,
        )

    practice_areas_out = [
        ProfilePracticeAreaOut(
            practice_area=PracticeAreaOut(
                id=pa.practice_area.id,
                slug=pa.practice_area.slug,
                name=pa.practice_area.name,
                description=pa.practice_area.description,
            ),
            is_primary=pa.is_primary,
            years_focused=pa.years_focused,
        )
        for pa in profile.practice_areas
    ]

    courts_out = [
        ProfileCourtOut(
            court=CourtOut(
                id=pc.court.id,
                name=pc.court.name,
                court_type=pc.court.court_type,
                district=DistrictOut(
                    id=pc.court.district.id,
                    name=pc.court.district.name,
                    state=pc.court.district.state,
                ) if pc.court.district else None,
            ),
            is_regular=pc.is_regular,
        )
        for pc in profile.courts
    ]

    services_out = [
        ProfileServiceOut(
            service=ServiceOut(
                id=ps.service.id,
                slug=ps.service.slug,
                title=ps.service.title,
                category=ps.service.category,
            ),
            details=ps.details,
            is_active=ps.is_active,
        )
        for ps in profile.services_offered
    ]

    return ProfilePublic(
        id=profile.id,
        full_name=profile.full_name,
        designation=profile.designation,
        enrollment_number=profile.enrollment_number,
        is_verified=profile.user.is_verified if profile.user else False,
        years_of_experience=profile.years_of_experience,
        district=district_out,
        headline=profile.headline,
        bio=profile.bio,
        avatar_url=profile.avatar_url,
        languages=profile.languages or [],
        practice_areas=practice_areas_out,
        courts=courts_out,
        services=services_out,
        contact_info=contact_info,
        ai_profile_insights=profile.ai_profile_insights or {},
        is_profile_published=profile.is_profile_published,
        created_at=profile.created_at,
    )
