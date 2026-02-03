"""
Scraper for SELISE Digital Platforms careers page.
URL: https://selisegroup.com/job/ (redirected from selise.ch/career/)

SELISE uses a WordPress-based dynamic job portal that loads jobs via AJAX.
We attempt to fetch job data from the WordPress REST API and page parsing.
"""
from .base_scraper import BaseScraper, JobListing
import logging
import json

logger = logging.getLogger(__name__)


class SeliseScraper(BaseScraper):
    """Scraper for SELISE job listings."""

    COMPANY_NAME = "SELISE"
    BASE_URL = "https://selisegroup.com"
    CAREER_URL = "https://selisegroup.com/job/"
    WP_API_URL = "https://selisegroup.com/wp-json/wp/v2/job-listing"
    AJAX_URL = "https://selisegroup.com/wp-admin/admin-ajax.php"

    SKIP_TITLES = {
        "career", "careers", "join the team", "join us", "about",
        "about us", "contact", "contact us", "home", "search job",
        "find the right role", "apply", "jobs", "open positions",
    }

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from SELISE's career portal."""
        jobs = []

        # Strategy 1: Try WordPress REST API
        jobs = await self._try_wp_rest_api()
        if jobs:
            logger.info(f"Found {len(jobs)} jobs via WP REST API")
            return jobs

        # Strategy 2: Parse the /job/ page for direct job links
        jobs = await self._parse_job_page()
        if jobs:
            logger.info(f"Found {len(jobs)} jobs via HTML parsing")
            return jobs

        # Strategy 3: Try AJAX endpoint
        jobs = await self._try_ajax_endpoint()
        if jobs:
            logger.info(f"Found {len(jobs)} jobs via AJAX")
            return jobs

        logger.warning(f"No jobs found for {self.COMPANY_NAME} - site may use JS rendering")
        return jobs

    async def _try_wp_rest_api(self) -> list[JobListing]:
        """Try fetching jobs from WordPress REST API."""
        jobs = []
        try:
            endpoints = [
                self.WP_API_URL,
                f"{self.BASE_URL}/wp-json/wp/v2/jobs",
                f"{self.BASE_URL}/wp-json/wp/v2/career",
            ]

            for endpoint in endpoints:
                data = await self.fetch_json(endpoint)
                if data and isinstance(data, list):
                    for item in data:
                        title = item.get("title", {})
                        if isinstance(title, dict):
                            title = title.get("rendered", "")
                        title = str(title).strip()

                        if not title or self._is_skip_title(title):
                            continue

                        link = item.get("link", "")
                        if not link:
                            continue

                        description = item.get("content", {})
                        if isinstance(description, dict):
                            description = description.get("rendered", "")

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=link,
                            description=str(description).strip()[:2000] if description else None,
                            location="Dhaka, Bangladesh",
                            experience_level=self.extract_experience_level(title, str(description or "")),
                            tags=["SELISE", "Swiss Company", "Enterprise"],
                        )
                        jobs.append(job)

                    if jobs:
                        return jobs

        except Exception as e:
            logger.debug(f"WP REST API not available: {e}")

        return jobs

    async def _parse_job_page(self) -> list[JobListing]:
        """Parse the /job/ page for actual job posting links."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)
        if not soup:
            return jobs

        try:
            seen_urls = set()
            for link in soup.select("a[href]"):
                href = link.get("href", "").strip()
                title = link.get_text(strip=True)

                if not href or not self._is_valid_job_url(href):
                    continue

                if not title or self._is_skip_title(title):
                    continue

                if not href.startswith("http"):
                    href = f"{self.BASE_URL}{href}"

                if href in seen_urls:
                    continue
                seen_urls.add(href)

                job = JobListing(
                    company=self.COMPANY_NAME,
                    title=title,
                    url=href,
                    location="Dhaka, Bangladesh",
                    experience_level=self.extract_experience_level(title),
                    tags=["SELISE", "Swiss Company", "Enterprise"],
                )
                jobs.append(job)

        except Exception as e:
            logger.error(f"Error parsing SELISE job page: {e}")

        return jobs

    async def _try_ajax_endpoint(self) -> list[JobListing]:
        """Try fetching jobs via WordPress AJAX."""
        jobs = []
        try:
            response = await self.client.post(
                self.AJAX_URL,
                data={"action": "selise_get_jobs"},
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            if response.status_code == 200:
                try:
                    data = response.json()
                    if isinstance(data, dict) and data.get("data"):
                        for item in data["data"]:
                            title = item.get("title", "").strip()
                            url = item.get("url", "") or item.get("link", "")
                            if title and url and not self._is_skip_title(title):
                                job = JobListing(
                                    company=self.COMPANY_NAME,
                                    title=title,
                                    url=url,
                                    location="Dhaka, Bangladesh",
                                    experience_level=self.extract_experience_level(title),
                                    tags=["SELISE", "Swiss Company", "Enterprise"],
                                )
                                jobs.append(job)
                except (json.JSONDecodeError, ValueError):
                    pass
        except Exception as e:
            logger.debug(f"AJAX endpoint not available: {e}")

        return jobs

    def _is_skip_title(self, title: str) -> bool:
        """Check if the title is a navigation/non-job text."""
        normalized = title.lower().strip()
        if normalized in self.SKIP_TITLES:
            return True
        if len(normalized) < 8:
            return True
        if any(normalized.startswith(prefix) for prefix in [
            "search ", "find ", "join ", "about ", "contact ", "our ",
        ]):
            return True
        return False

    def _is_valid_job_url(self, href: str) -> bool:
        """Check if URL is an actual job posting, not navigation."""
        if "/job/" not in href:
            return False
        parts = href.split("/job/")
        if len(parts) < 2 or not parts[1].strip("/"):
            return False
        slug = parts[1].strip("/")
        if slug in ("", "open-application", "open-application-2"):
            return False
        return True
