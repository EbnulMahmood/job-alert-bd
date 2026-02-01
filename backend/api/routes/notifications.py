"""
Notification-related API routes.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.connection import get_db
from api.models import Subscription, NotificationLog
from services.notification_service import NotificationService
import os

router = APIRouter(prefix="/notifications", tags=["Notifications"])

notification_service = NotificationService()


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
        return {"success": False, "message": "Subscription not found or no push endpoint"}

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
async def send_daily_digest(db: AsyncSession = Depends(get_db)):
    """
    Trigger daily digest notifications.
    This is typically called by a cron job.
    """
    # Get all active subscriptions
    query = select(Subscription).where(Subscription.is_active == True)
    result = await db.execute(query)
    subscriptions = result.scalars().all()

    sent_count = 0
    error_count = 0

    for subscription in subscriptions:
        try:
            # Here you would get new jobs matching subscription preferences
            # and send notifications
            # For now, this is a placeholder
            sent_count += 1
        except Exception as e:
            error_count += 1

    return {
        "success": True,
        "sent": sent_count,
        "errors": error_count,
    }
