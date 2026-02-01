"""
Scraper for Bangladesh Bank e-Recruitment portal.
URL: https://erecruitment.bb.org.bd/
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
    # Alternative URLs
    NOTICE_URL = "https://erecruitment.bb.org.bd/onlineapp/joblist.php"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Bangladesh Bank's e-recruitment portal."""
        jobs = []

        # Try main career page
        soup = await self.fetch_page(self.CAREER_URL)
        if soup:
            jobs.extend(await self._parse_page(soup))

        # Try job list page
        notice_soup = await self.fetch_page(self.NOTICE_URL)
        if notice_soup:
            jobs.extend(await self._parse_page(notice_soup))

        # Remove duplicates
        seen = set()
        unique_jobs = []
        for job in jobs:
            key = job.title
            if key not in seen:
                seen.add(key)
                unique_jobs.append(job)

        logger.info(f"Found {len(unique_jobs)} jobs at {self.COMPANY_NAME}")
        return unique_jobs

    async def _parse_page(self, soup) -> list[JobListing]:
        """Parse Bangladesh Bank recruitment page."""
        jobs = []

        try:
            # Common selectors for government job portals
            job_tables = soup.select("table")
            job_cards = soup.select(
                ".job-item, .circular-item, .notice-item, "
                "tr[class*='job'], [class*='circular']"
            )

            # Try table-based listings (common in govt sites)
            for table in job_tables:
                rows = table.select("tr")
                for row in rows:
                    cells = row.select("td")
                    if len(cells) >= 2:
                        # Look for job title and deadline
                        link = row.select_one("a")
                        if link:
                            title = link.get_text(strip=True)
                            href = link.get("href", "")

                            if not href.startswith("http"):
                                href = f"{self.BASE_URL}/{href}"

                            # Try to extract deadline
                            deadline = None
                            for cell in cells:
                                text = cell.get_text(strip=True)
                                # Look for date patterns
                                date_match = re.search(r'\d{1,2}[-/]\d{1,2}[-/]\d{2,4}', text)
                                if date_match:
                                    try:
                                        deadline = datetime.strptime(
                                            date_match.group(),
                                            "%d-%m-%Y" if "-" in date_match.group() else "%d/%m/%Y"
                                        )
                                    except ValueError:
                                        pass

                            if title and len(title) > 5:
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

            # Try card-based listings
            if not jobs and job_cards:
                for card in job_cards:
                    try:
                        title_elem = card.select_one("h2, h3, h4, a, .title")
                        title = title_elem.get_text(strip=True) if title_elem else ""

                        link = card.select_one("a")
                        url = self.CAREER_URL
                        if link:
                            url = link.get("href", "")
                            if not url.startswith("http"):
                                url = f"{self.BASE_URL}/{url}"

                        if title and len(title) > 5:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location="Bangladesh",
                                job_type="Government",
                                experience_level=self.extract_experience_level(title),
                                tags=["Bangladesh Bank", "Government", "Central Bank"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")

            # If still no jobs found, look for any recruitment-related links
            if not jobs:
                links = soup.select("a")
                keywords = ["circular", "recruitment", "job", "vacancy", "post", "officer", "programmer"]

                for link in links:
                    href = link.get("href", "")
                    text = link.get_text(strip=True)

                    if any(kw in text.lower() for kw in keywords) and len(text) > 10:
                        if not href.startswith("http"):
                            href = f"{self.BASE_URL}/{href}" if href else self.CAREER_URL

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=text,
                            url=href,
                            location="Bangladesh",
                            job_type="Government",
                            experience_level=self.extract_experience_level(text),
                            tags=["Bangladesh Bank", "Government", "Central Bank"],
                        )
                        jobs.append(job)

        except Exception as e:
            logger.error(f"Error parsing Bangladesh Bank page: {e}")

        return jobs
