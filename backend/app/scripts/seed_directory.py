"""
Seed Script: Tamil Nadu Advocate Directory + Platform Taxonomy

Populates:
1. Districts (38 Tamil Nadu districts + Pondicherry)
2. Courts (major courts per district)
3. Practice Areas (standard legal taxonomy)
4. Services (professional services)
5. Sample directory records (when real CSV data is unavailable, uses Faker)

Run with:  python -m app.scripts.seed_directory
"""

import asyncio
import csv
import os
from pathlib import Path
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import AsyncSessionLocal, engine, Base
from app.models.user import (
    District, Court, PracticeArea, Service, DirectoryRecord, RecordStatus,
    User, ProfessionalProfile, ProfilePracticeArea, ProfileCourt, ProfileServiceOffered, UserRole,
)


DISTRICTS = [
    "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli",
    "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Thoothukudi",
    "Kancheepuram", "Namakkal", "Dindigul", "Cuddalore", "Nagapattinam",
    "Villupuram", "Thanjavur", "Pudukkottai", "Ramanathapuram", "Sivaganga",
    "Virudhunagar", "Krishnagiri", "Dharmapuri", "The Nilgiris",
    "Perambalur", "Ariyalur", "Karur", "Thiruvarur", "Nilgiris",
    "Tiruvannamalai", "Ranipet", "Chengalpattu", "Kallakurichi",
    "Tenkasi", "Mayiladuthurai", "Tirupattur",
]

COURTS_DATA = [
    # (name, court_type, district_name)
    ("Madras High Court", "High Court", None),
    ("Principal District Court, Chennai", "District", "Chennai"),
    ("Principal Sessions Court, Chennai", "Sessions", "Chennai"),
    ("City Civil Court, Chennai", "Civil", "Chennai"),
    ("Principal District Court, Coimbatore", "District", "Coimbatore"),
    ("Principal Sessions Court, Coimbatore", "Sessions", "Coimbatore"),
    ("Principal District Court, Madurai", "District", "Madurai"),
    ("Principal Sessions Court, Madurai", "Sessions", "Madurai"),
    ("Madurai Bench of Madras High Court", "High Court Bench", "Madurai"),
    ("Principal District Court, Salem", "District", "Salem"),
    ("Principal Sessions Court, Salem", "Sessions", "Salem"),
    ("Principal District Court, Tiruchirappalli", "District", "Tiruchirappalli"),
    ("Principal Sessions Court, Tiruchirappalli", "Sessions", "Tiruchirappalli"),
    ("Principal District Court, Tirunelveli", "District", "Tirunelveli"),
    ("Principal Sessions Court, Tirunelveli", "Sessions", "Tirunelveli"),
    ("Principal District Court, Vellore", "District", "Vellore"),
    ("Principal Sessions Court, Vellore", "Sessions", "Vellore"),
    ("Principal District Court, Erode", "District", "Erode"),
    ("Principal District Court, Tiruppur", "District", "Tiruppur"),
    ("National Consumer Disputes Redressal Commission, Tamil Nadu", "Tribunal", "Chennai"),
    ("Income Tax Appellate Tribunal, Chennai", "Tribunal", "Chennai"),
    ("National Company Law Tribunal, Chennai", "Tribunal", "Chennai"),
]

PRACTICE_AREAS = [
    ("criminal-law", "Criminal Law", "Trial, appeals, bail, FIR matters, POCSO, NDPS"),
    ("civil-litigation", "Civil Litigation", "Suits, injunctions, decree execution, appeals"),
    ("constitutional-law", "Constitutional Law", "Fundamental rights, writ petitions, PILs"),
    ("corporate-law", "Corporate Law", "Companies Act, M&A, governance, compliance"),
    ("family-law", "Family Law", "Divorce, custody, maintenance, domestic violence"),
    ("property-law", "Property Law", "Real estate disputes, land acquisition, revenue matters"),
    ("labour-law", "Labour Law", "Industrial disputes, ESIC, PF, employment law"),
    ("tax-law", "Tax Law", "Direct and indirect taxation, GST, customs, income tax"),
    ("intellectual-property", "Intellectual Property", "Patents, trademarks, copyrights, designs"),
    ("arbitration", "Arbitration", "Domestic and international commercial arbitration"),
    ("administrative-law", "Administrative Law", "Service matters, government disputes"),
    ("banking-law", "Banking Law", "DRT, SARFAESI, NPA recovery, banking disputes"),
    ("motor-accident-claims", "Motor Accident Claims", "MACT tribunals, insurance claims"),
    ("consumer-law", "Consumer Law", "Consumer disputes, product liability"),
    ("immigration-law", "Immigration Law", "Visa, OCI, citizenship matters"),
    ("environmental-law", "Environmental Law", "NGT, pollution matters, forest rights"),
    ("mediation", "Mediation", "Court-annexed and commercial mediation"),
]

SERVICES = [
    ("court-appearance", "Court Appearance", "Litigation"),
    ("local-counsel", "Local Counsel", "Litigation"),
    ("legal-research", "Legal Research", "Advisory"),
    ("legal-drafting", "Legal Drafting", "Advisory"),
    ("legal-opinion", "Legal Opinion", "Advisory"),
    ("consultation", "Consultation", "Advisory"),
    ("arbitration-service", "Arbitration", "Dispute Resolution"),
    ("mediation-service", "Mediation", "Dispute Resolution"),
    ("compliance", "Compliance Advisory", "Corporate"),
    ("due-diligence", "Due Diligence", "Corporate"),
    ("document-review", "Document Review", "Advisory"),
    ("notary", "Notary / Oath Commissioner", "Attestation"),
]

SAMPLE_ADVOCATES = [
    ("TN/01001/2010", "Adv. S. Ramanathan", "M", "Salem Bar Association", "Salem"),
    ("TN/01002/2012", "Adv. P. Meenakshi", "F", "Madurai Bar Association", "Madurai"),
    ("TN/01003/2008", "Adv. K. Venkatesh", "M", "Madras Bar Association", "Chennai"),
    ("TN/01004/2015", "Adv. R. Kavitha", "F", "Coimbatore Bar Association", "Coimbatore"),
    ("TN/01005/2005", "Adv. M. Sundaresan", "M", "Salem Bar Association", "Salem"),
    ("TN/01006/2018", "Adv. A. Priya", "F", "Vellore Bar Association", "Vellore"),
    ("TN/01007/2011", "Adv. B. Krishnaswamy", "M", "Tiruchirappalli Bar Association", "Tiruchirappalli"),
    ("TN/01008/2009", "Adv. S. Lakshmi", "F", "Madras Bar Association", "Chennai"),
    ("TN/01009/2013", "Adv. V. Arumugam", "M", "Erode Bar Association", "Erode"),
    ("TN/01010/2016", "Adv. T. Selvi", "F", "Tirunelveli Bar Association", "Tirunelveli"),
    ("TN/01011/2003", "Adv. N. Balasubramanian", "M", "Madras Bar Association", "Chennai"),
    ("TN/01012/2019", "Adv. G. Nithya", "F", "Coimbatore Bar Association", "Coimbatore"),
    ("TN/01013/2007", "Adv. C. Murugesan", "M", "Madurai Bar Association", "Madurai"),
    ("TN/01014/2014", "Adv. D. Jayalakshmi", "F", "Salem Bar Association", "Salem"),
    ("TN/01015/2006", "Adv. E. Senthilkumar", "M", "Tiruppur Bar Association", "Tiruppur"),
    ("TN/01016/2020", "Adv. F. Saranya", "F", "Namakkal Bar Association", "Namakkal"),
    ("TN/01017/2004", "Adv. H. Natarajan", "M", "Madras Bar Association", "Chennai"),
    ("TN/01018/2017", "Adv. I. Malarvizhi", "F", "Thanjavur Bar Association", "Thanjavur"),
    ("TN/01019/2002", "Adv. J. Palaniswamy", "M", "Dindigul Bar Association", "Dindigul"),
    ("TN/01020/2021", "Adv. L. Suganya", "F", "Madurai Bar Association", "Madurai"),
]


async def seed_districts(db: AsyncSession) -> dict[str, District]:
    district_map = {}
    from sqlalchemy import select
    for name in DISTRICTS:
        result = await db.execute(select(District).where(District.name == name))
        existing = result.scalar_one_or_none()
        if not existing:
            d = District(name=name, state="Tamil Nadu", is_active=True)
            db.add(d)
            await db.flush()
            district_map[name] = d
        else:
            district_map[name] = existing
    print(f"✓ Seeded {len(DISTRICTS)} districts")
    return district_map


async def seed_courts(db: AsyncSession, district_map: dict) -> None:
    from sqlalchemy import select
    for name, court_type, district_name in COURTS_DATA:
        result = await db.execute(select(Court).where(Court.name == name))
        if not result.scalar_one_or_none():
            district = district_map.get(district_name) if district_name else None
            c = Court(
                name=name,
                court_type=court_type,
                district_id=district.id if district else None,
            )
            db.add(c)
    await db.flush()
    print(f"✓ Seeded {len(COURTS_DATA)} courts")


async def seed_practice_areas(db: AsyncSession) -> None:
    from sqlalchemy import select
    for slug, name, description in PRACTICE_AREAS:
        result = await db.execute(select(PracticeArea).where(PracticeArea.slug == slug))
        if not result.scalar_one_or_none():
            db.add(PracticeArea(slug=slug, name=name, description=description))
    await db.flush()
    print(f"✓ Seeded {len(PRACTICE_AREAS)} practice areas")


async def seed_services(db: AsyncSession) -> None:
    from sqlalchemy import select
    for slug, title, category in SERVICES:
        result = await db.execute(select(Service).where(Service.slug == slug))
        if not result.scalar_one_or_none():
            db.add(Service(slug=slug, title=title, category=category))
    await db.flush()
    print(f"✓ Seeded {len(SERVICES)} services")


async def seed_directory_records(db: AsyncSession, csv_path: Optional[str] = None) -> None:
    from sqlalchemy import select
    records = SAMPLE_ADVOCATES

    if csv_path and Path(csv_path).exists():
        print(f"Loading directory records from CSV: {csv_path}")
        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            records = [
                (
                    row.get("enrollment_number", "").strip(),
                    row.get("full_name", "").strip(),
                    row.get("gender", "").strip(),
                    row.get("bar_association", "").strip(),
                    row.get("district", "").strip(),
                )
                for row in reader
                if row.get("enrollment_number") and row.get("full_name")
            ]

    inserted = 0
    for enrollment, name, gender, bar_assoc, district in records:
        if not enrollment or not name:
            continue
        result = await db.execute(
            select(DirectoryRecord).where(DirectoryRecord.enrollment_number == enrollment)
        )
        if not result.scalar_one_or_none():
            db.add(DirectoryRecord(
                enrollment_number=enrollment,
                full_name=name,
                gender=gender or None,
                bar_association_name=bar_assoc or None,
                district_name=district,
                record_status=RecordStatus.UNCLAIMED,
                source_provenance={"source": "Tamil Nadu Advocate Directory", "import_version": "1.0"},
            ))
            inserted += 1

        if inserted % 1000 == 0 and inserted > 0:
            await db.flush()
            print(f"  → {inserted} records inserted so far...")

    await db.flush()
    print(f"✓ Seeded {inserted} directory records (status: UNCLAIMED)")


async def seed_sample_published_profiles(db: AsyncSession, district_map: dict):
    # Check if sample profile already exists
    existing = await db.execute(select(User).where(User.email == "ramanathan.salem@legalnet.in"))
    if existing.scalar_one_or_none():
        return

    # Fetch taxonomy references
    pa_res = await db.execute(select(PracticeArea))
    pa_map = {pa.slug: pa for pa in pa_res.scalars().all()}

    court_res = await db.execute(select(Court))
    court_map = {c.name: c for c in court_res.scalars().all()}

    svc_res = await db.execute(select(Service))
    svc_map = {s.slug: s for s in svc_res.scalars().all()}

    # 1. Adv. S. Ramanathan (Salem Criminal Lawyer)
    u1 = User(
        email="ramanathan.salem@legalnet.in",
        password_hash="$2b$12$e8kPqZ9X5V9L3y8t0zK8.uF1iR3rZ5P9l7u0y2x4v6b8n0m", # dummy bcrypt
        role=UserRole.ADVOCATE_VERIFIED,
        is_verified=True,
    )
    db.add(u1)
    await db.flush()

    salem_district = district_map.get("Salem")
    p1 = ProfessionalProfile(
        user_id=u1.id,
        full_name="Adv. S. Ramanathan",
        enrollment_number="TN/01001/2010",
        designation="Advocate",
        years_of_experience=14,
        district_id=salem_district.id if salem_district else None,
        headline="Senior Criminal Defense Advocate, Salem",
        bio="Practicing trial and appellate advocate before the Principal Sessions Court, Salem and Madras High Court with 14 years of defense experience.",
        phone_number="+91 94431 82910",
        languages=["Tamil", "English"],
        is_profile_published=True,
    )
    db.add(p1)
    await db.flush()

    if "criminal-law" in pa_map:
        db.add(ProfilePracticeArea(profile_id=p1.id, practice_area_id=pa_map["criminal-law"].id, is_primary=True, years_focused=14))
    if "Principal Sessions Court, Salem" in court_map:
        db.add(ProfileCourt(profile_id=p1.id, court_id=court_map["Principal Sessions Court, Salem"].id, is_regular=True))
    if "court-appearance" in svc_map:
        db.add(ProfileServiceOffered(profile_id=p1.id, service_id=svc_map["court-appearance"].id, is_active=True))
    if "local-counsel" in svc_map:
        db.add(ProfileServiceOffered(profile_id=p1.id, service_id=svc_map["local-counsel"].id, is_active=True))

    # 2. Adv. P. Meenakshi (Madurai Civil & High Court Lawyer)
    u2 = User(
        email="meenakshi.madurai@legalnet.in",
        password_hash="$2b$12$e8kPqZ9X5V9L3y8t0zK8.uF1iR3rZ5P9l7u0y2x4v6b8n0m",
        role=UserRole.ADVOCATE_VERIFIED,
        is_verified=True,
    )
    db.add(u2)
    await db.flush()

    madurai_district = district_map.get("Madurai")
    p2 = ProfessionalProfile(
        user_id=u2.id,
        full_name="Adv. P. Meenakshi",
        enrollment_number="TN/01002/2012",
        designation="Advocate",
        years_of_experience=12,
        district_id=madurai_district.id if madurai_district else None,
        headline="Civil Litigation & Appellate Counsel, Madurai Bench",
        bio="Specializing in civil appeals, writ petitions, and land disputes before the Madurai Bench of Madras High Court.",
        phone_number="+91 98421 54321",
        languages=["Tamil", "English"],
        is_profile_published=True,
    )
    db.add(p2)
    await db.flush()

    if "civil-litigation" in pa_map:
        db.add(ProfilePracticeArea(profile_id=p2.id, practice_area_id=pa_map["civil-litigation"].id, is_primary=True, years_focused=12))
    if "constitutional-law" in pa_map:
        db.add(ProfilePracticeArea(profile_id=p2.id, practice_area_id=pa_map["constitutional-law"].id, is_primary=False, years_focused=8))
    if "Madurai Bench of Madras High Court" in court_map:
        db.add(ProfileCourt(profile_id=p2.id, court_id=court_map["Madurai Bench of Madras High Court"].id, is_regular=True))
    if "court-appearance" in svc_map:
        db.add(ProfileServiceOffered(profile_id=p2.id, service_id=svc_map["court-appearance"].id, is_active=True))

    await db.flush()
    print("✓ Seeded sample published verified advocate profiles")


async def run_seed(csv_path: Optional[str] = None):
    print("🌱 Starting Legal Professionals Network seed process...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Tables initialized.")

    async with AsyncSessionLocal() as db:
        try:
            district_map = await seed_districts(db)
            await seed_courts(db, district_map)
            await seed_practice_areas(db)
            await seed_services(db)
            await seed_directory_records(db, csv_path)
            await seed_sample_published_profiles(db, district_map)
            await db.commit()
            print("✅ Seed completed successfully!")
        except Exception as e:
            await db.rollback()
            print(f"❌ Seed failed: {e}")
            raise


if __name__ == "__main__":
    import sys
    csv_file = sys.argv[1] if len(sys.argv) > 1 else None
    asyncio.run(run_seed(csv_file))
