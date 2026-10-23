from typing import Optional, List
from uuid import UUID
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user, get_optional_user
from app.models.user import User, District, Court, PracticeArea, Service
from app.schemas.profile import (
    ProfilePublic, ProfileUpdateRequest, DirectoryRecordPublic,
    ClaimProfileRequest, ClaimResponse, ProfilePracticeAreaUpdate,
    ProfileCourtUpdate, ProfileServiceUpdate, CourtOut, DistrictOut,
    PracticeAreaOut, ServiceOut,
)
from app.services.profile_service import ProfileService, DirectoryService

router = APIRouter(prefix="/profiles", tags=["Profiles"])
directory_router = APIRouter(prefix="/directory", tags=["Directory"])
taxonomy_router = APIRouter(prefix="/taxonomy", tags=["Taxonomy"])


# ─── Profiles ─────────────────────────────────────────────────────────────────


@router.get("/{profile_id}", response_model=ProfilePublic)
async def get_profile(
    profile_id: UUID,
    db: AsyncSession = Depends(get_db),
    requesting_user: Optional[User] = Depends(get_optional_user),
):
    """Get a professional profile with privacy-aware contact info."""
    svc = ProfileService(db)
    return await svc.get_profile(profile_id, requesting_user)


@router.put("/me", response_model=dict)
async def update_my_profile(
    data: ProfileUpdateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update authenticated user's own profile."""
    svc = ProfileService(db)
    await svc.update_profile(current_user, data)
    return {"message": "Profile updated successfully"}


@router.post("/me/publish", response_model=dict)
async def publish_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Publish profile to make it visible in search results."""
    svc = ProfileService(db)
    await svc.publish_profile(current_user)
    return {"message": "Profile is now publicly visible"}


@router.put("/me/practice-areas", response_model=dict)
async def update_practice_areas(
    areas: List[ProfilePracticeAreaUpdate],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    svc = ProfileService(db)
    await svc.update_practice_areas(current_user, areas)
    return {"message": "Practice areas updated"}


@router.put("/me/courts", response_model=dict)
async def update_courts(
    courts: List[ProfileCourtUpdate],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    svc = ProfileService(db)
    await svc.update_courts(current_user, courts)
    return {"message": "Courts updated"}


@router.put("/me/services", response_model=dict)
async def update_services(
    services: List[ProfileServiceUpdate],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    svc = ProfileService(db)
    await svc.update_services(current_user, services)
    return {"message": "Services updated"}


# ─── Directory ────────────────────────────────────────────────────────────────


@directory_router.get("", response_model=List[DirectoryRecordPublic])
@directory_router.get("/", response_model=List[DirectoryRecordPublic])
async def search_directory(
    q: Optional[str] = Query(None, description="Search by name or enrollment number"),
    district: Optional[str] = Query(None),
    bar_association: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """Search the Tamil Nadu advocate directory."""
    svc = DirectoryService(db)
    records = await svc.search_directory(q, district, bar_association, limit=limit, offset=offset)
    return [
        DirectoryRecordPublic(
            id=r.id,
            enrollment_number=r.enrollment_number,
            full_name=r.full_name,
            bar_association_name=r.bar_association_name,
            district_name=r.district_name,
            record_status=r.record_status.value,
            is_claimed=r.claimed_user_id is not None,
        )
        for r in records
    ]


@directory_router.get("/{directory_id}", response_model=DirectoryRecordPublic)
async def get_directory_record(
    directory_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    svc = DirectoryService(db)
    r = await svc.get_record(directory_id)
    return DirectoryRecordPublic(
        id=r.id,
        enrollment_number=r.enrollment_number,
        full_name=r.full_name,
        bar_association_name=r.bar_association_name,
        district_name=r.district_name,
        record_status=r.record_status.value,
        is_claimed=r.claimed_user_id is not None,
    )


@directory_router.post("/{directory_id}/claim", response_model=ClaimResponse, status_code=202)
async def claim_directory_record(
    directory_id: UUID,
    data: ClaimProfileRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit a claim on a directory record with Bar Council ID proof."""
    svc = DirectoryService(db)
    vr = await svc.submit_claim(current_user, directory_id, data)
    return ClaimResponse(
        claim_id=vr.id,
        directory_id=directory_id,
        status=vr.status.value,
        submitted_at=vr.submitted_at,
    )


# ─── Taxonomy ─────────────────────────────────────────────────────────────────


@taxonomy_router.get("/districts", response_model=List[DistrictOut])
async def list_districts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(District).where(District.is_active == True).order_by(District.name))
    return [DistrictOut(id=d.id, name=d.name, state=d.state) for d in result.scalars()]


@taxonomy_router.get("/courts", response_model=List[CourtOut])
async def list_courts(
    district_id: Optional[UUID] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    from sqlalchemy.orm import selectinload
    stmt = select(Court).options(selectinload(Court.district))
    if district_id:
        stmt = stmt.where(Court.district_id == district_id)
    result = await db.execute(stmt.order_by(Court.name))
    courts = result.scalars().all()
    return [
        CourtOut(
            id=c.id, name=c.name, court_type=c.court_type,
            district=DistrictOut(id=c.district.id, name=c.district.name, state=c.district.state) if c.district else None,
        )
        for c in courts
    ]


@taxonomy_router.get("/practice-areas", response_model=List[PracticeAreaOut])
async def list_practice_areas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PracticeArea).order_by(PracticeArea.name))
    return [PracticeAreaOut(id=p.id, slug=p.slug, name=p.name, description=p.description) for p in result.scalars()]


@taxonomy_router.get("/services", response_model=List[ServiceOut])
async def list_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).order_by(Service.title))
    return [ServiceOut(id=s.id, slug=s.slug, title=s.title, category=s.category) for s in result.scalars()]
