"""
Scraper for Enosis Solutions careers page.
URL: https://enosisbd.pinpointhq.com/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class EnosisScraper(BaseScraper):
    """Scraper for Enosis Solutions job listings."""

    COMPANY_NAME = "Enosis Solutions"
    BASE_URL = "https://enosisbd.pinpointhq.com"
    CAREER_URL = "https://enosisbd.pinpointhq.com/"
    # Pinpoint often has an API
    API_URL = "https://enosisbd.pinpointhq.com/postings.json"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Enosis's career page."""
        jobs = []

        # Try JSON API first (Pinpoint platforms usually have this)
        api_jobs = await self._scrape_api()
        if api_jobs:
            return api_jobs

        # Fallback to HTML scraping
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Pinpoint job board structure
            job_cards = soup.select(
                ".posting, .job-posting, .position, "
                "[data-posting], .vacancy-item"
            )

            if not job_cards:
                # Try alternative: look for job links
                job_links = soup.select("a[href*='/postings/'], a[href*='jobs']")
                seen_urls = set()

                for link in job_links:
                    href = link.get("href", "")
                    title = link.get_text(strip=True)

                    if not href.startswith("http"):
                        href = f"{self.BASE_URL}{href}"

                    if href in seen_urls or not title or len(title) < 3:
                        continue

                    seen_urls.add(href)

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location="Dhaka, Bangladesh",
                        experience_level=self.extract_experience_level(title),
                        tags=["Enosis", "US Clients"],
                    )
                    jobs.append(job)
            else:
                for card in job_cards:
                    try:
                        title_elem = card.select_one(".posting-title, h2, h3, a")
                        title = title_elem.get_text(strip=True) if title_elem else ""

                        link = card.select_one("a") or card
                        url = ""
                        if hasattr(link, 'get'):
                            url = link.get("href", "")
                            if url and not url.startswith("http"):
                                url = f"{self.BASE_URL}{url}"

                        dept_elem = card.select_one(".department, .team")
                        department = dept_elem.get_text(strip=True) if dept_elem else ""

                        if title and url:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location="Dhaka, Bangladesh",
                                experience_level=self.extract_experience_level(title),
                                tags=["Enosis", "US Clients", department] if department else ["Enosis", "US Clients"],
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
        """Try to scrape from Pinpoint API."""
        jobs = []
        try:
            data = await self.fetch_json(self.API_URL)
            if not data:
                return jobs

            postings = data if isinstance(data, list) else data.get("data", [])

            for posting in postings:
                if isinstance(posting, dict):
                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=posting.get("title", ""),
                        url=f"{self.BASE_URL}/postings/{posting.get('id', '')}",
                        description=posting.get("description", ""),
                        location=posting.get("location", {}).get("name", "Dhaka, Bangladesh"),
                        job_type=posting.get("employment_type", "Full-time"),
                        experience_level=self.extract_experience_level(
                            posting.get("title", ""),
                            posting.get("description", "")
                        ),
                        tags=["Enosis", "US Clients"],
                    )
                    jobs.append(job)

        except Exception as e:
            logger.debug(f"API scraping failed: {e}")

        return jobs
