"""
Notification service for push and email notifications.
"""
from pywebpush import webpush, WebPushException
import json
import os
import time
import logging

logger = logging.getLogger(__name__)


class NotificationService:
    """Service for sending push notifications."""

    def __init__(self):
        self.vapid_private_key = os.getenv("VAPID_PRIVATE_KEY", "")
        self.vapid_public_key = os.getenv("VAPID_PUBLIC_KEY", "")
        self.vapid_subject = os.getenv("VAPID_SUBJECT", "mailto:admin@example.com")

    async def send_push_notification(
        self,
        endpoint: str,
        keys: dict,
        title: str,
        body: str,
        url: str = "/",
        icon: str = "/icon-192.png",
    ) -> bool:
        """
        Send a push notification to a subscriber.

        Args:
            endpoint: Push service endpoint URL
            keys: Dictionary containing p256dh and auth keys
            title: Notification title
            body: Notification body
            url: URL to open when notification is clicked
            icon: Notification icon URL

        Returns:
            True if successful, False otherwise
        """
        if not self.vapid_private_key:
            logger.warning("VAPID keys not configured")
            return False

        subscription_info = {
            "endpoint": endpoint,
            "keys": keys,
        }

        data = json.dumps({
            "title": title,
            "body": body,
            "url": url,
            "icon": icon,
            "badge": "/badge-72.png",
            "timestamp": int(time.time() * 1000),
        })

        try:
            webpush(
                subscription_info=subscription_info,
                data=data,
                vapid_private_key=self.vapid_private_key,
                vapid_claims={
                    "sub": self.vapid_subject,
                },
            )
            logger.info(f"Push notification sent successfully")
            return True

        except WebPushException as e:
            logger.error(f"Push notification failed: {e}")
            # If subscription is expired/invalid, we should mark it
            if e.response and e.response.status_code in [404, 410]:
                logger.info("Subscription endpoint is no longer valid")
            return False

    async def send_job_alert(
        self,
        endpoint: str,
        keys: dict,
        job_title: str,
        company: str,
        job_url: str,
    ) -> bool:
        """Send a job alert notification."""
        return await self.send_push_notification(
            endpoint=endpoint,
            keys=keys,
            title=f"New Job at {company}",
            body=job_title,
            url=job_url,
        )

    async def send_daily_digest(
        self,
        endpoint: str,
        keys: dict,
        new_jobs_count: int,
    ) -> bool:
        """Send daily digest notification."""
        if new_jobs_count == 0:
            return True  # Don't send if no new jobs

        return await self.send_push_notification(
            endpoint=endpoint,
            keys=keys,
            title="Daily Job Digest",
            body=f"{new_jobs_count} new job(s) matching your preferences!",
            url="/jobs",
        )
