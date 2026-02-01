"""
Subscription database model for notifications.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ARRAY
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from database.connection import Base
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class Subscription(Base):
    """SQLAlchemy model for user subscriptions."""

    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=True, index=True)
    push_endpoint = Column(Text, nullable=True)
    push_keys = Column(JSONB, nullable=True)
    companies = Column(ARRAY(String), default=[])  # Companies to monitor
    keywords = Column(ARRAY(String), default=[])  # Keywords like '.NET', 'C#'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class NotificationLog(Base):
    """SQLAlchemy model for notification logs."""

    __tablename__ = "notification_logs"

    id = Column(Integer, primary_key=True, index=True)
    subscription_id = Column(Integer, nullable=False, index=True)
    job_id = Column(Integer, nullable=False, index=True)
    notification_type = Column(String(50), default="push")  # push, email
    status = Column(String(50), default="sent")  # sent, failed, pending
    error_message = Column(Text, nullable=True)
    sent_at = Column(DateTime(timezone=True), server_default=func.now())


# Pydantic schemas
class PushKeys(BaseModel):
    """Web Push keys."""
    p256dh: str
    auth: str


class SubscriptionBase(BaseModel):
    """Base schema for subscription."""
    email: Optional[EmailStr] = None
    push_endpoint: Optional[str] = Field(None, max_length=1000)
    push_keys: Optional[PushKeys] = None
    companies: Optional[list[str]] = Field(default=[], max_length=50)
    keywords: Optional[list[str]] = Field(default=[], max_length=30)


class SubscriptionCreate(SubscriptionBase):
    """Schema for creating a subscription."""
    pass


class SubscriptionUpdate(BaseModel):
    """Schema for updating a subscription."""
    email: Optional[EmailStr] = None
    push_endpoint: Optional[str] = Field(None, max_length=1000)
    push_keys: Optional[PushKeys] = None
    companies: Optional[list[str]] = Field(None, max_length=50)
    keywords: Optional[list[str]] = Field(None, max_length=30)
    is_active: Optional[bool] = None


class SubscriptionResponse(SubscriptionBase):
    """Schema for subscription response."""
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationLogResponse(BaseModel):
    """Schema for notification log response."""
    id: int
    subscription_id: int
    job_id: int
    notification_type: str
    status: str
    sent_at: datetime

    class Config:
        from_attributes = True
