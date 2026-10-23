import enum
import uuid
from datetime import datetime, timezone
from typing import Optional, List
from sqlalchemy import (
    String, Boolean, Enum as SAEnum, DateTime, Text, Integer,
    ForeignKey, UniqueConstraint, Index, JSON
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from pgvector.sqlalchemy import Vector
from app.core.database import Base


# ─── Enums ──────────────────────────────────────────────────────────────────


class RecordStatus(str, enum.Enum):
    UNCLAIMED = "UNCLAIMED"
    CLAIMED = "CLAIMED"
    VERIFICATION_PENDING = "VERIFICATION_PENDING"
    VERIFIED = "VERIFIED"
    VERIFICATION_FAILED = "VERIFICATION_FAILED"
    SUSPENDED = "SUSPENDED"


class UserRole(str, enum.Enum):
    GUEST = "GUEST"
    ADVOCATE_UNVERIFIED = "ADVOCATE_UNVERIFIED"
    ADVOCATE_VERIFIED = "ADVOCATE_VERIFIED"
    SENIOR_ADVOCATE = "SENIOR_ADVOCATE"
    FIRM_ADMIN = "FIRM_ADMIN"
    PLATFORM_ADMIN = "PLATFORM_ADMIN"


class PrivacyLevel(str, enum.Enum):
    PUBLIC = "PUBLIC"
    VERIFIED_MEMBERS_ONLY = "VERIFIED_MEMBERS_ONLY"
    MUTUAL_CONNECTIONS_ONLY = "MUTUAL_CONNECTIONS_ONLY"
    HIDDEN = "HIDDEN"


class ConnectionStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"
    BLOCKED = "BLOCKED"


# ─── Directory Record ────────────────────────────────────────────────────────


class DirectoryRecord(Base):
    __tablename__ = "directory_records"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    enrollment_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    gender: Mapped[Optional[str]] = mapped_column(String(20))
    bar_association_name: Mapped[Optional[str]] = mapped_column(String(255))
    district_name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    source_name: Mapped[str] = mapped_column(
        String(100), default="Tamil Nadu Advocate Directory 2024"
    )
    source_provenance: Mapped[dict] = mapped_column(JSONB, default=dict)
    record_status: Mapped[RecordStatus] = mapped_column(
        SAEnum(RecordStatus, name="record_status_enum"),
        default=RecordStatus.UNCLAIMED,
        nullable=False,
        index=True,
    )
    claimed_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))
    claimed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


# ─── User ────────────────────────────────────────────────────────────────────


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    phone_number: Mapped[Optional[str]] = mapped_column(String(30), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        SAEnum(UserRole, name="user_role_enum"),
        default=UserRole.ADVOCATE_UNVERIFIED,
        nullable=False,
        index=True,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    profile: Mapped[Optional["ProfessionalProfile"]] = relationship(
        "ProfessionalProfile", back_populates="user", uselist=False
    )
    verification_requests: Mapped[List["VerificationRequest"]] = relationship(
        "VerificationRequest", foreign_keys="VerificationRequest.user_id", back_populates="user"
    )
    audit_logs: Mapped[List["AuditLog"]] = relationship("AuditLog", back_populates="actor")


# ─── Taxonomy: Districts ──────────────────────────────────────────────────────


class District(Base):
    __tablename__ = "districts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    state: Mapped[str] = mapped_column(String(100), default="Tamil Nadu", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    courts: Mapped[List["Court"]] = relationship("Court", back_populates="district")
    profiles: Mapped[List["ProfessionalProfile"]] = relationship(
        "ProfessionalProfile", back_populates="district"
    )


# ─── Taxonomy: Courts ────────────────────────────────────────────────────────


class Court(Base):
    __tablename__ = "courts"
    __table_args__ = (UniqueConstraint("name", "district_id", name="uq_court_name_district"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    court_type: Mapped[str] = mapped_column(String(100), nullable=False)
    district_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("districts.id")
    )
    jurisdiction_details: Mapped[Optional[str]] = mapped_column(Text)

    district: Mapped[Optional[District]] = relationship("District", back_populates="courts")
    profile_courts: Mapped[List["ProfileCourt"]] = relationship(
        "ProfileCourt", back_populates="court"
    )


# ─── Taxonomy: Practice Areas ─────────────────────────────────────────────────


class PracticeArea(Base):
    __tablename__ = "practice_areas"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)

    profile_practice_areas: Mapped[List["ProfilePracticeArea"]] = relationship(
        "ProfilePracticeArea", back_populates="practice_area"
    )


# ─── Taxonomy: Services ───────────────────────────────────────────────────────


class Service(Base):
    __tablename__ = "services"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)

    profile_services: Mapped[List["ProfileServiceOffered"]] = relationship(
        "ProfileServiceOffered", back_populates="service"
    )


# ─── Professional Profile ─────────────────────────────────────────────────────


class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    directory_record_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("directory_records.id", ondelete="SET NULL")
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    enrollment_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    designation: Mapped[str] = mapped_column(String(100), default="Advocate", nullable=False)
    years_of_experience: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    bar_association_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))
    district_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("districts.id")
    )
    headline: Mapped[Optional[str]] = mapped_column(String(255))
    bio: Mapped[Optional[str]] = mapped_column(Text)
    avatar_url: Mapped[Optional[str]] = mapped_column(Text)
    office_address: Mapped[Optional[str]] = mapped_column(Text)
    phone_number: Mapped[Optional[str]] = mapped_column(String(30))
    languages: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String), default=list)

    # Privacy settings
    phone_visibility: Mapped[PrivacyLevel] = mapped_column(
        SAEnum(PrivacyLevel, name="privacy_level_enum"),
        default=PrivacyLevel.MUTUAL_CONNECTIONS_ONLY,
        nullable=False,
    )
    email_visibility: Mapped[PrivacyLevel] = mapped_column(
        SAEnum(PrivacyLevel, name="privacy_level_enum"),
        default=PrivacyLevel.MUTUAL_CONNECTIONS_ONLY,
        nullable=False,
    )
    location_visibility: Mapped[PrivacyLevel] = mapped_column(
        SAEnum(PrivacyLevel, name="privacy_level_enum"),
        default=PrivacyLevel.PUBLIC,
        nullable=False,
    )

    # AI-generated, human-approved
    ai_profile_insights: Mapped[dict] = mapped_column(JSONB, default=dict)
    is_profile_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Vector & FTS
    embedding: Mapped[Optional[List[float]]] = mapped_column(Vector(1536))
    search_vector: Mapped[Optional[str]] = mapped_column(Text)  # handled via trigger

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    user: Mapped[User] = relationship("User", back_populates="profile")
    district: Mapped[Optional[District]] = relationship("District", back_populates="profiles")
    practice_areas: Mapped[List["ProfilePracticeArea"]] = relationship(
        "ProfilePracticeArea", back_populates="profile", cascade="all, delete-orphan"
    )
    courts: Mapped[List["ProfileCourt"]] = relationship(
        "ProfileCourt", back_populates="profile", cascade="all, delete-orphan"
    )
    services_offered: Mapped[List["ProfileServiceOffered"]] = relationship(
        "ProfileServiceOffered", back_populates="profile", cascade="all, delete-orphan"
    )
    sent_connections: Mapped[List["Connection"]] = relationship(
        "Connection", foreign_keys="Connection.sender_profile_id", back_populates="sender"
    )
    received_connections: Mapped[List["Connection"]] = relationship(
        "Connection", foreign_keys="Connection.receiver_profile_id", back_populates="receiver"
    )


# ─── Adjacency Tables ─────────────────────────────────────────────────────────


class ProfilePracticeArea(Base):
    __tablename__ = "profile_practice_areas"
    __table_args__ = (
        UniqueConstraint("profile_id", "practice_area_id", name="uq_profile_practice_area"),
    )

    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("professional_profiles.id", ondelete="CASCADE"),
        primary_key=True,
    )
    practice_area_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("practice_areas.id", ondelete="CASCADE"),
        primary_key=True,
    )
    years_focused: Mapped[int] = mapped_column(Integer, default=1)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

    profile: Mapped[ProfessionalProfile] = relationship(
        "ProfessionalProfile", back_populates="practice_areas"
    )
    practice_area: Mapped[PracticeArea] = relationship(
        "PracticeArea", back_populates="profile_practice_areas"
    )


class ProfileCourt(Base):
    __tablename__ = "profile_courts"
    __table_args__ = (
        UniqueConstraint("profile_id", "court_id", name="uq_profile_court"),
    )

    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("professional_profiles.id", ondelete="CASCADE"),
        primary_key=True,
    )
    court_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("courts.id", ondelete="CASCADE"),
        primary_key=True,
    )
    is_regular: Mapped[bool] = mapped_column(Boolean, default=True)

    profile: Mapped[ProfessionalProfile] = relationship("ProfessionalProfile", back_populates="courts")
    court: Mapped[Court] = relationship("Court", back_populates="profile_courts")


class ProfileServiceOffered(Base):
    __tablename__ = "profile_services_offered"
    __table_args__ = (
        UniqueConstraint("profile_id", "service_id", name="uq_profile_service"),
    )

    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("professional_profiles.id", ondelete="CASCADE"),
        primary_key=True,
    )
    service_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("services.id", ondelete="CASCADE"),
        primary_key=True,
    )
    details: Mapped[Optional[str]] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    profile: Mapped[ProfessionalProfile] = relationship(
        "ProfessionalProfile", back_populates="services_offered"
    )
    service: Mapped[Service] = relationship("Service", back_populates="profile_services")


# ─── Connections ──────────────────────────────────────────────────────────────


class Connection(Base):
    __tablename__ = "connections"
    __table_args__ = (
        UniqueConstraint("sender_profile_id", "receiver_profile_id", name="uq_connection"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("professional_profiles.id", ondelete="CASCADE")
    )
    receiver_profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("professional_profiles.id", ondelete="CASCADE")
    )
    status: Mapped[ConnectionStatus] = mapped_column(
        SAEnum(ConnectionStatus, name="connection_status_enum"),
        default=ConnectionStatus.PENDING,
        nullable=False,
    )
    note: Mapped[Optional[str]] = mapped_column(Text)
    initiated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    responded_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    sender: Mapped[ProfessionalProfile] = relationship(
        "ProfessionalProfile", foreign_keys=[sender_profile_id], back_populates="sent_connections"
    )
    receiver: Mapped[ProfessionalProfile] = relationship(
        "ProfessionalProfile", foreign_keys=[receiver_profile_id], back_populates="received_connections"
    )


# ─── Verification ─────────────────────────────────────────────────────────────


class VerificationRequest(Base):
    __tablename__ = "verification_requests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    directory_record_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("directory_records.id")
    )
    enrollment_number: Mapped[str] = mapped_column(String(100), nullable=False)
    bar_council_id_card_doc_url: Mapped[str] = mapped_column(Text, nullable=False)
    additional_id_doc_url: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[RecordStatus] = mapped_column(
        SAEnum(RecordStatus, name="record_status_enum"),
        default=RecordStatus.VERIFICATION_PENDING,
        nullable=False,
    )
    admin_reviewer_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id")
    )
    rejection_reason: Mapped[Optional[str]] = mapped_column(Text)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    user: Mapped[User] = relationship(
        "User", foreign_keys=[user_id], back_populates="verification_requests"
    )


# ─── Audit Log ────────────────────────────────────────────────────────────────


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    actor_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL")
    )
    event_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    entity_name: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))
    metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    ip_address: Mapped[Optional[str]] = mapped_column(String(50))
    user_agent: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True
    )

    actor: Mapped[Optional[User]] = relationship("User", back_populates="audit_logs")
