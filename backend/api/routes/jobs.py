"""
Job-related API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from typing import Optional
from database.connection import get_db
from api.models import Job, JobCreate, JobUpdate, JobResponse, JobListResponse

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/", response_model=JobListResponse)
async def get_jobs(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    company: Optional[str] = None,
    search: Optional[str] = None,
    experience_level: Optional[str] = None,
    job_type: Optional[str] = None,
    is_active: bool = True,
    db: AsyncSession = Depends(get_db),
):
    """
    Get paginated list of job listings with optional filters.
    """
    # Build query
    query = select(Job).where(Job.is_active == is_active)

    # Apply filters
    if company:
        query = query.where(Job.company.ilike(f"%{company}%"))

    if search:
        search_filter = or_(
            Job.title.ilike(f"%{search}%"),
            Job.description.ilike(f"%{search}%"),
            Job.requirements.ilike(f"%{search}%"),
        )
        query = query.where(search_filter)

    if experience_level:
        query = query.where(Job.experience_level == experience_level)

    if job_type:
        query = query.where(Job.job_type == job_type)

    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query) or 0

    # Apply pagination
    offset = (page - 1) * per_page
    query = query.order_by(Job.created_at.desc()).offset(offset).limit(per_page)

    # Execute query
    result = await db.execute(query)
    jobs = result.scalars().all()

    total_pages = max((total + per_page - 1) // per_page, 1) if total else 0

    return JobListResponse(
        jobs=[JobResponse.model_validate(job) for job in jobs],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )


@router.get("/companies")
async def get_companies(db: AsyncSession = Depends(get_db)):
    """Get list of all companies with job counts."""
    query = (
        select(Job.company, func.count(Job.id).label("count"))
        .where(Job.is_active == True)
        .group_by(Job.company)
        .order_by(func.count(Job.id).desc())
    )
    result = await db.execute(query)
    companies = result.all()

    return [{"company": c[0], "count": c[1]} for c in companies]


@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    """Get job statistics."""
    # Total active jobs
    total_query = select(func.count(Job.id)).where(Job.is_active == True)
    total = await db.scalar(total_query)

    # Jobs by company
    by_company_query = (
        select(Job.company, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.company)
    )
    by_company_result = await db.execute(by_company_query)
    by_company = {row[0]: row[1] for row in by_company_result.all()}

    # Jobs by experience level
    by_level_query = (
        select(Job.experience_level, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.experience_level)
    )
    by_level_result = await db.execute(by_level_query)
    by_level = {row[0] or "Not Specified": row[1] for row in by_level_result.all()}

    return {
        "total_jobs": total,
        "by_company": by_company,
        "by_experience_level": by_level,
    }


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific job by ID."""
    query = select(Job).where(Job.id == job_id)
    result = await db.execute(query)
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return JobResponse.model_validate(job)


@router.post("/", response_model=JobResponse)
async def create_job(job_data: JobCreate, db: AsyncSession = Depends(get_db)):
    """Create a new job listing (internal use for scraper)."""
    # Check if job already exists by URL
    existing_query = select(Job).where(Job.url == job_data.url)
    existing = await db.execute(existing_query)
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Job with this URL already exists")

    job = Job(**job_data.model_dump())
    db.add(job)
    await db.commit()
    await db.refresh(job)

    return JobResponse.model_validate(job)


@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update a job listing."""
    query = select(Job).where(Job.id == job_id)
    result = await db.execute(query)
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    update_data = job_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)

    await db.commit()
    await db.refresh(job)

    return JobResponse.model_validate(job)


@router.delete("/{job_id}")
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db)):
    """Soft delete a job listing."""
    query = select(Job).where(Job.id == job_id)
    result = await db.execute(query)
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.is_active = False
    await db.commit()

    return {"message": "Job deactivated successfully"}
