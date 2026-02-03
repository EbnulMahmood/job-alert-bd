"""
Scraper for Samsung R&D Institute Bangladesh careers.

Samsung uses Workday for their job portal which is fully JS-rendered.
We query the Workday API directly for Bangladesh positions.
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class SamsungScraper(BaseScraper):
    """Scraper for Samsung R&D Bangladesh job listings."""

    COMPANY_NAME = "Samsung R&D"
    BASE_URL = "https://sec.wd3.myworkdayjobs.com"
    CAREER_URL = "https://sec.wd3.myworkdayjobs.com/Samsung_Careers"
    WORKDAY_API = "https://sec.wd3.myworkdayjobs.com/wday/cxs/sec/Samsung_Careers/jobs"

    async def scrape(self) -> list[JobListing]:
        """Scrape Samsung R&D Bangladesh jobs from Workday API."""
        jobs = []

        # Strategy 1: Workday API with Bangladesh country filter
        jobs = await self._query_workday_api()
        if jobs:
            logger.info(f"Found {len(jobs)} jobs via Workday API")
            return jobs

        # Strategy 2: Workday API with keyword search
        jobs = await self._query_workday_keyword()
        if jobs:
            logger.info(f"Found {len(jobs)} jobs via Workday keyword search")
            return jobs

        logger.warning(f"No jobs found for {self.COMPANY_NAME}")
        return jobs

    async def _query_workday_api(self) -> list[JobListing]:
        """Query Samsung's Workday API with Bangladesh country filter."""
        jobs = []
        try:
            search_payload = {
                "appliedFacets": {
                    "locationCountry": ["db69d0e4446c11de98360015c5e6daf6"]
                },
                "limit": 20,
                "offset": 0,
                "searchText": ""
            }

            response = await self.client.post(
                self.WORKDAY_API,
                json=search_payload,
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            )

            if response.status_code != 200:
                logger.debug(f"Workday API returned {response.status_code}")
                return jobs

            data = response.json()
            jobs = self._parse_workday_response(data)

        except Exception as e:
            logger.error(f"Error querying Workday API: {e}")

        return jobs

    async def _query_workday_keyword(self) -> list[JobListing]:
        """Query Workday API with 'Bangladesh' keyword."""
        jobs = []
        try:
            search_payload = {
                "appliedFacets": {},
                "limit": 20,
                "offset": 0,
                "searchText": "Bangladesh"
            }

            response = await self.client.post(
                self.WORKDAY_API,
                json=search_payload,
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            )

            if response.status_code != 200:
                return jobs

            data = response.json()
            jobs = self._parse_workday_response(data)

        except Exception as e:
            logger.debug(f"Workday keyword search failed: {e}")

        return jobs

    def _parse_workday_response(self, data: dict) -> list[JobListing]:
        """Parse Workday API response into JobListing objects."""
        jobs = []
        for posting in data.get("jobPostings", []):
            title = posting.get("title", "").strip()
            if not title:
                continue

            external_path = posting.get("externalPath", "")
            url = f"{self.CAREER_URL}{external_path}" if external_path else self.CAREER_URL

            loc_info = posting.get("locationsText", "Bangladesh")

            job = JobListing(
                company=self.COMPANY_NAME,
                title=title,
                url=url,
                location=loc_info or "Dhaka, Bangladesh",
                experience_level=self.extract_experience_level(title),
                tags=["Samsung", "MNC", "R&D"],
            )
            jobs.append(job)

        return jobs
