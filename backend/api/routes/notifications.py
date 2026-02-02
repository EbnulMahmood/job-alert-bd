"""
Notification-related API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta, timezone
from database.connection import get_db
from api.dependencies import require_admin_key
from api.models import Subscription, NotificationLog, Job
from services.notification_service import NotificationService
from services.email_service import EmailService
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/notifications", tags=["Notifications"])

notification_service = NotificationService()
email_service = EmailService()
APP_URL = os.getenv("APP_URL", "http://localhost:5173")


@router.get("/vapid-public-key")
async def get_vapid_public_key():
    """
    Get the VAPID public key for push notifications.
    Frontend uses this to subscribe to push notifications.
    """
    public_key = os.getenv("VAPID_PUBLIC_KEY", "")
    return {"publicKey": public_key}


@router.post("/test-push/{subscription_id}")
async def test_push_notification(
    subscription_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Send a test push notification to verify setup."""
    query = select(Subscription).where(Subscription.id == subscription_id)
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()

    if not subscription or not subscription.push_endpoint:
        raise HTTPException(status_code=404, detail="Subscription not found or no push endpoint")

    try:
        await notification_service.send_push_notification(
            endpoint=subscription.push_endpoint,
            keys=subscription.push_keys,
            title="Test Notification",
            body="Your job alerts are working! You'll be notified of new openings.",
            url="/",
        )
        return {"success": True, "message": "Test notification sent"}
    except Exception as e:
        return {"success": False, "message": str(e)}


@router.post("/send-daily-digest")
async def send_daily_digest(
    db: AsyncSession = Depends(get_db),
    _: str = Depends(require_admin_key),
):
    """
    Trigger daily digest notifications. Requires admin API key.
    Sends notifications to subscribers about new jobs matching their preferences.
    """
    # Get new jobs from last 24 hours
    since = datetime.now(timezone.utc) - timedelta(hours=24)
    new_jobs_query = select(Job).where(
        Job.is_active == True,
        Job.created_at >= since,
    )
    new_jobs_result = await db.execute(new_jobs_query)
    new_jobs = new_jobs_result.scalars().all()

    if not new_jobs:
        return {"success": True, "sent": 0, "errors": 0, "message": "No new jobs in last 24h"}

    # Get all active subscriptions (push or email)
    query = select(Subscription).where(Subscription.is_active == True)
    result = await db.execute(query)
    subscriptions = result.scalars().all()

    push_sent = 0
    email_sent = 0
    error_count = 0

    # Get total active jobs count for email digest stats
    total_jobs_result = await db.execute(
        select(func.count(Job.id)).where(Job.is_active == True)
    )
    total_active_jobs = total_jobs_result.scalar() or 0

    for subscription in subscriptions:
        try:
            # Filter jobs matching subscription preferences
            matching_jobs = _filter_matching_jobs(new_jobs, subscription)
            if not matching_jobs:
                continue

            # Send push notification if push endpoint exists
            if subscription.push_endpoint and subscription.push_keys:
                push_success = await notification_service.send_daily_digest(
                    endpoint=subscription.push_endpoint,
                    keys=subscription.push_keys,
                    new_jobs_count=len(matching_jobs),
                )
                if push_success:
                    push_sent += 1
                    for job in matching_jobs[:5]:
                        db.add(NotificationLog(
                            subscription_id=subscription.id,
                            job_id=job.id,
                            notification_type="push",
                            status="sent",
                        ))
                else:
                    error_count += 1

            # Send email if email exists
            if subscription.email:
                jobs_for_email = [
                    {
                        "title": j.title,
                        "company": j.company,
                        "url": j.url,
                        "location": j.location or "Bangladesh",
                        "description": j.description,
                    }
                    for j in matching_jobs[:10]
                ]
                email_success = await email_service.send_job_alert(
                    to=subscription.email,
                    jobs=jobs_for_email,
                )
                if email_success:
                    email_sent += 1
                    for job in matching_jobs[:5]:
                        db.add(NotificationLog(
                            subscription_id=subscription.id,
                            job_id=job.id,
                            notification_type="email",
                            status="sent",
                        ))

        except Exception as e:
            logger.error(f"Failed to send digest to sub {subscription.id}: {e}")
            error_count += 1

    await db.commit()

    return {
        "success": True,
        "new_jobs": len(new_jobs),
        "push_sent": push_sent,
        "email_sent": email_sent,
        "errors": error_count,
    }


def _filter_matching_jobs(jobs: list, subscription) -> list:
    """Filter jobs matching subscription company/keyword preferences."""
    sub_companies = [c.lower() for c in (subscription.companies or [])]
    sub_keywords = [k.lower() for k in (subscription.keywords or [])]

    # If no preferences set, send all jobs
    if not sub_companies and not sub_keywords:
        return jobs

    matching = []
    for job in jobs:
        # Check company match
        if sub_companies and job.company.lower() in sub_companies:
            matching.append(job)
            continue

        # Check keyword match in title, description, requirements
        if sub_keywords:
            text = f"{job.title} {job.description or ''} {job.requirements or ''}".lower()
            if any(kw in text for kw in sub_keywords):
                matching.append(job)

    return matching
