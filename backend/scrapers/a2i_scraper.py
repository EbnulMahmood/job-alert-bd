"""
Scraper for a2i (Aspire to Innovate) careers page.
URL: https://a2i.gov.bd/site/view/jobs/
"""
from .base_scraper import BaseScraper, JobListing
from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)


class A2IScraper(BaseScraper):
    """Scraper for a2i job listings."""

    COMPANY_NAME = "a2i"
    BASE_URL = "https://a2i.gov.bd"
    CAREER_URL = "https://a2i.gov.bd/site/view/jobs/-"
    ALT_CAREER_URL = "https://a2i.portal.gov.bd/site/view/jobs/Job-Circular"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from a2i's career page."""
        jobs = []

        # Try main career page
        soup = await self.fetch_page(self.CAREER_URL)
        if soup:
            jobs.extend(await self._parse_page(soup, self.BASE_URL))

        # Try alternative portal
        alt_soup = await self.fetch_page(self.ALT_CAREER_URL)
        if alt_soup:
            jobs.extend(await self._parse_page(alt_soup, "https://a2i.portal.gov.bd"))

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

    async def _parse_page(self, soup, base_url: str) -> list[JobListing]:
        """Parse a2i job page."""
        jobs = []

        try:
            # Government portal structures
            job_items = soup.select(
                ".job-item, .circular-item, .notice-item, "
                "tr, .list-item, article, .card"
            )

            # First try to find specific job listings
            job_tables = soup.select("table.job-table, table")

            for table in job_tables:
                rows = table.select("tr")
                for row in rows:
                    link = row.select_one("a")
                    if link:
                        title = link.get_text(strip=True)
                        href = link.get("href", "")

                        if not title or len(title) < 5:
                            continue

                        # Skip header rows
                        if any(skip in title.lower() for skip in ["title", "position", "job"]):
                            continue

                        if not href.startswith("http"):
                            href = f"{base_url}{href}"

                        # Extract deadline
                        deadline = None
                        cells = row.select("td")
                        for cell in cells:
                            text = cell.get_text(strip=True)
                            date_match = re.search(r'\d{1,2}[-/]\d{1,2}[-/]\d{2,4}', text)
                            if date_match:
                                try:
                                    date_str = date_match.group()
                                    if "-" in date_str:
                                        deadline = datetime.strptime(date_str, "%d-%m-%Y")
                                    else:
                                        deadline = datetime.strptime(date_str, "%d/%m/%Y")
                                except ValueError:
                                    pass

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=href,
                            location="Dhaka, Bangladesh",
                            job_type="Government/Semi-Government",
                            deadline=deadline,
                            experience_level=self.extract_experience_level(title),
                            tags=["a2i", "ICT Division", "Digital Bangladesh"],
                        )
                        jobs.append(job)

            # Try list-based structure
            if not jobs:
                list_items = soup.select("ul li, .list-group-item, .job-list li")
                for item in list_items:
                    link = item.select_one("a")
                    if link:
                        title = link.get_text(strip=True)
                        href = link.get("href", "")

                        if not title or len(title) < 5:
                            continue

                        if not href.startswith("http"):
                            href = f"{base_url}{href}"

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=href,
                            location="Dhaka, Bangladesh",
                            job_type="Government/Semi-Government",
                            experience_level=self.extract_experience_level(title),
                            tags=["a2i", "ICT Division", "Digital Bangladesh"],
                        )
                        jobs.append(job)

            # Fallback: find any recruitment-related links
            if not jobs:
                links = soup.select("a[href]")
                keywords = ["consultant", "engineer", "developer", "programmer", "officer", "specialist", "intern"]

                for link in links:
                    text = link.get_text(strip=True)
                    href = link.get("href", "")

                    if any(kw in text.lower() for kw in keywords) and len(text) > 10:
                        if not href.startswith("http"):
                            href = f"{base_url}{href}"

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=text,
                            url=href,
                            location="Dhaka, Bangladesh",
                            job_type="Government/Semi-Government",
                            experience_level=self.extract_experience_level(text),
                            tags=["a2i", "ICT Division", "Digital Bangladesh"],
                        )
                        jobs.append(job)

        except Exception as e:
            logger.error(f"Error parsing a2i page: {e}")

        return jobs
