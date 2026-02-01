"""
Scraper for Kaz Software careers page.
URL: https://kazsoftware.hire.trakstar.com/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class KazScraper(BaseScraper):
    """Scraper for Kaz Software job listings."""

    COMPANY_NAME = "Kaz Software"
    BASE_URL = "https://kazsoftware.hire.trakstar.com"
    CAREER_URL = "https://kazsoftware.hire.trakstar.com/"
    # Trakstar often has a JSON API
    API_URL = "https://kazsoftware.hire.trakstar.com/api/v1/openings"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Kaz Software's career page."""
        jobs = []

        # Try API first (Trakstar platforms often have an API)
        api_jobs = await self._scrape_api()
        if api_jobs:
            return api_jobs

        # Fallback to HTML scraping
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Find job listings
            job_cards = soup.select(".opening, .job-opening, .position, li.job")

            if not job_cards:
                # Try finding links to job postings
                job_links = soup.select("a[href*='jobs'], a[href*='opening']")
                for link in job_links:
                    title = link.get_text(strip=True)
                    url = link.get("href", "")
                    if url and not url.startswith("http"):
                        url = f"{self.BASE_URL}{url}"

                    if title and url:
                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=url,
                            location="Dhaka, Bangladesh",
                            experience_level=self.extract_experience_level(title),
                            tags=["Kaz Software"],
                        )
                        jobs.append(job)
            else:
                for card in job_cards:
                    try:
                        title_elem = card.select_one(".title, h2, h3, a")
                        title = title_elem.get_text(strip=True) if title_elem else ""

                        link = card.select_one("a")
                        url = ""
                        if link:
                            url = link.get("href", "")
                            if not url.startswith("http"):
                                url = f"{self.BASE_URL}{url}"

                        if title and url:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location="Dhaka, Bangladesh",
                                experience_level=self.extract_experience_level(title),
                                tags=["Kaz Software", "Award-winning"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")
                        continue

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs

    async def _scrape_api(self) -> list[JobListing]:
        """Try to scrape from Trakstar API."""
        jobs = []
        try:
            data = await self.fetch_json(self.API_URL)
            if not data:
                return jobs

            openings = data.get("openings", data) if isinstance(data, dict) else data

            for opening in openings:
                if isinstance(opening, dict):
                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=opening.get("title", ""),
                        url=opening.get("url", f"{self.CAREER_URL}"),
                        description=opening.get("description", ""),
                        location=opening.get("location", "Dhaka, Bangladesh"),
                        job_type=opening.get("employment_type", "Full-time"),
                        experience_level=self.extract_experience_level(
                            opening.get("title", ""),
                            opening.get("description", "")
                        ),
                        tags=["Kaz Software"],
                    )
                    jobs.append(job)

        except Exception as e:
            logger.debug(f"API scraping failed, will use HTML: {e}")

        return jobs
