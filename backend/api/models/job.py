"""
Job listing database model.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Date, ARRAY
from sqlalchemy.sql import func
from database.connection import Base
from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import Optional


class Job(Base):
    """SQLAlchemy model for job listings."""

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(100), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    url = Column(String(500), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    location = Column(String(100), default="Dhaka, Bangladesh")
    job_type = Column(String(50), default="Full-time")
    experience_level = Column(String(50), nullable=True)
    posted_date = Column(Date, nullable=True)
    deadline = Column(Date, nullable=True)
    salary_range = Column(String(100), nullable=True)
    tags = Column(ARRAY(String), default=[])
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


# Pydantic schemas
class JobBase(BaseModel):
    """Base schema for job data."""
    company: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=255)
    url: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = Field(None, max_length=50000)
    requirements: Optional[str] = Field(None, max_length=50000)
    location: Optional[str] = Field("Dhaka, Bangladesh", max_length=100)
    job_type: Optional[str] = Field("Full-time", max_length=50)
    experience_level: Optional[str] = Field(None, max_length=50)
    posted_date: Optional[date] = None
    deadline: Optional[date] = None
    salary_range: Optional[str] = Field(None, max_length=100)
    tags: Optional[list[str]] = Field(default=[], max_length=20)


class JobCreate(JobBase):
    """Schema for creating a job."""
    pass


class JobUpdate(BaseModel):
    """Schema for updating a job."""
    company: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None
    posted_date: Optional[date] = None
    deadline: Optional[date] = None
    salary_range: Optional[str] = None
    tags: Optional[list[str]] = None
    is_active: Optional[bool] = None


class JobResponse(JobBase):
    """Schema for job response."""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JobListResponse(BaseModel):
    """Schema for paginated job list."""
    jobs: list[JobResponse]
    total: int
    page: int
    per_page: int
    total_pages: int
