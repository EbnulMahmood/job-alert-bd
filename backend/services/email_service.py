"""
Email service for sending job alerts via Resend.
"""
import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# Resend is optional - only import if available
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False
    logger.warning("Resend not installed. Email notifications disabled.")


class EmailService:
    """Service for sending email notifications."""

    def __init__(self):
        self.api_key = os.getenv("RESEND_API_KEY", "")
        self.from_email = os.getenv("FROM_EMAIL", "jobs@jobalert.bd")

        if RESEND_AVAILABLE and self.api_key:
            resend.api_key = self.api_key

    async def send_email(
        self,
        to: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None,
    ) -> bool:
        """
        Send an email using Resend.

        Args:
            to: Recipient email address
            subject: Email subject
            html_content: HTML content of the email
            text_content: Plain text content (optional)

        Returns:
            True if successful, False otherwise
        """
        if not RESEND_AVAILABLE:
            logger.warning("Resend not available")
            return False

        if not self.api_key:
            logger.warning("Resend API key not configured")
            return False

        try:
            params = {
                "from": self.from_email,
                "to": [to],
                "subject": subject,
                "html": html_content,
            }

            if text_content:
                params["text"] = text_content

            resend.Emails.send(params)
            logger.info(f"Email sent to {to}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email: {e}")
            return False

    async def send_job_alert(
        self,
        to: str,
        jobs: list[dict],
    ) -> bool:
        """Send a job alert email with new job listings."""
        if not jobs:
            return True

        subject = f"🚀 {len(jobs)} New Job Alert(s) - BD Tech Jobs"

        # Build HTML content
        jobs_html = ""
        for job in jobs:
            jobs_html += f"""
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">
                    <a href="{job.get('url', '#')}" style="color: #2563eb; text-decoration: none;">
                        {job.get('title', 'Unknown Position')}
                    </a>
                </h3>
                <p style="margin: 5px 0; color: #666;">
                    <strong>{job.get('company', 'Unknown Company')}</strong> • {job.get('location', 'Dhaka')}
                </p>
                {f"<p style='margin: 10px 0; color: #555;'>{job.get('description', '')[:200]}...</p>" if job.get('description') else ""}
                <a href="{job.get('url', '#')}"
                   style="display: inline-block; padding: 8px 16px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">
                    View Job →
                </a>
            </div>
            """

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1a1a1a; margin: 0;">🎯 New Jobs For You</h1>
                <p style="color: #666;">We found {len(jobs)} new job(s) matching your preferences</p>
            </div>

            {jobs_html}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
                <p>You're receiving this because you subscribed to BD Tech Job Alerts.</p>
                <p><a href="{{{{unsubscribe_url}}}}" style="color: #888;">Unsubscribe</a></p>
            </div>
        </body>
        </html>
        """

        return await self.send_email(to, subject, html_content)

    async def send_daily_digest(
        self,
        to: str,
        jobs: list[dict],
        stats: dict,
    ) -> bool:
        """Send a daily digest email."""
        subject = f"📊 Daily Job Digest - {stats.get('total', 0)} Active Jobs"

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a;">📊 Your Daily Job Digest</h1>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px 0;">Today's Stats</h3>
                <p><strong>Total Active Jobs:</strong> {stats.get('total', 0)}</p>
                <p><strong>New Today:</strong> {len(jobs)}</p>
            </div>

            <h3>🆕 New Jobs Today</h3>
            {''.join([f"<p>• <a href='{j.get('url', '#')}'>{j.get('title', '')} at {j.get('company', '')}</a></p>" for j in jobs[:10]])}

            <div style="margin-top: 30px; text-align: center;">
                <a href="{{{{app_url}}}}"
                   style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">
                    View All Jobs →
                </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
                <p><a href="{{{{unsubscribe_url}}}}" style="color: #888;">Unsubscribe</a></p>
            </div>
        </body>
        </html>
        """

        return await self.send_email(to, subject, html_content)
