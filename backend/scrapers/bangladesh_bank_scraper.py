"""
Scraper for Bangladesh Bank e-Recruitment portal.
URL: https://erecruitment.bb.org.bd/

Note: Bangladesh Bank's e-recruitment portal is CAPTCHA-protected,
which means automated scraping cannot reliably access job listings.
This scraper handles that gracefully by returning empty when CAPTCHA is detected.
"""
from .base_scraper import BaseScraper, JobListing
from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)


class BangladeshBankScraper(BaseScraper):
    """Scraper for Bangladesh Bank job listings."""

    COMPANY_NAME = "Bangladesh Bank"
    BASE_URL = "https://erecruitment.bb.org.bd"
    CAREER_URL = "https://erecruitment.bb.org.bd/"
    NOTICE_URL = "https://erecruitment.bb.org.bd/onlineapp/joblist.php"

    SKIP_PATTERNS = [
        "erecruitment home", "edit resume", "guidance",
        "online job application", "contact us", "login",
        "register", "forgot password", "help", "faq",
        "privacy policy", "terms", "sitemap",
    ]

    CAPTCHA_PATTERNS = [
        "captcha", "what code is in the image",
        "please enable javascript", "security verification",
    ]

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Bangladesh Bank's e-recruitment portal."""
        jobs = []

        # Try main career page
        soup = await self.fetch_page(self.CAREER_URL)
        if soup:
            page_text = soup.get_text(strip=True).lower()
            if any(pattern in page_text for pattern in self.CAPTCHA_PATTERNS):
                logger.warning(f"{self.COMPANY_NAME}: CAPTCHA detected, cannot scrape")
                return jobs
            jobs.extend(self._parse_job_tables(soup))

        # Try job list page if main page didn't yield results
        if not jobs:
            notice_soup = await self.fetch_page(self.NOTICE_URL)
            if notice_soup:
                page_text = notice_soup.get_text(strip=True).lower()
                if any(pattern in page_text for pattern in self.CAPTCHA_PATTERNS):
                    logger.warning(f"{self.COMPANY_NAME}: CAPTCHA on job list page")
                    return jobs
                jobs.extend(self._parse_job_tables(notice_soup))

        # Remove duplicates
        seen = set()
        unique_jobs = []
        for job in jobs:
            if job.title not in seen:
                seen.add(job.title)
                unique_jobs.append(job)

        logger.info(f"Found {len(unique_jobs)} jobs at {self.COMPANY_NAME}")
        return unique_jobs

    def _parse_job_tables(self, soup) -> list[JobListing]:
        """Parse job listings from table-based layout."""
        jobs = []

        try:
            for table in soup.select("table"):
                rows = table.select("tr")
                for row in rows:
                    cells = row.select("td")
                    if len(cells) < 2:
                        continue

                    link = row.select_one("a[href]")
                    if not link:
                        continue

                    title = link.get_text(strip=True)
                    href = link.get("href", "")

                    if not title or len(title) < 10:
                        continue
                    if self._is_skip_title(title):
                        continue

                    # Validate URL
                    if not href or href.startswith("javascript:"):
                        continue
                    if not href.startswith("http"):
                        href = f"{self.BASE_URL}/{href.lstrip('/')}"

                    # Skip non-job pages
                    if any(skip in href.lower() for skip in [
                        "appguide", "front_resume", "index.php",
                        "login", "register",
                    ]):
                        continue

                    deadline = self._extract_deadline(cells)

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location="Bangladesh",
                        job_type="Government",
                        deadline=deadline,
                        experience_level=self.extract_experience_level(title),
                        tags=["Bangladesh Bank", "Government", "Central Bank"],
                    )
                    jobs.append(job)

        except Exception as e:
            logger.error(f"Error parsing Bangladesh Bank page: {e}")

        return jobs

    def _extract_deadline(self, cells) -> datetime | None:
        """Extract deadline date from table cells."""
        for cell in cells:
            text = cell.get_text(strip=True)
            date_match = re.search(r'(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})', text)
            if date_match:
                try:
                    date_str = date_match.group()
                    sep = "-" if "-" in date_str else "/"
                    fmt = f"%d{sep}%m{sep}%Y" if len(date_match.group(3)) == 4 else f"%d{sep}%m{sep}%y"
                    return datetime.strptime(date_str, fmt)
                except ValueError:
                    pass
        return None

    def _is_skip_title(self, title: str) -> bool:
        """Check if title is a navigation link, not a job posting."""
        normalized = title.lower().strip()
        return any(pattern in normalized for pattern in self.SKIP_PATTERNS)
