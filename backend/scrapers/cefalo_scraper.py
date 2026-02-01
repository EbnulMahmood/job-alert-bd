"""
Scraper for Cefalo Bangladesh careers page.
URL: https://career.cefalo.com/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class CefaloScraper(BaseScraper):
    """Scraper for Cefalo Bangladesh job listings."""

    COMPANY_NAME = "Cefalo"
    BASE_URL = "https://career.cefalo.com"
    CAREER_URL = "https://career.cefalo.com/"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Cefalo's career page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Find job listing cards
            job_cards = soup.select(".job-card, .job-listing, .position-card, article.job, .career-item")

            if not job_cards:
                # Try alternative selectors
                job_cards = soup.select("a[href*='/job/']")

            for card in job_cards:
                try:
                    # Extract job title
                    title_elem = card.select_one("h2, h3, .job-title, .position-title")
                    title = title_elem.get_text(strip=True) if title_elem else card.get_text(strip=True)

                    # Extract job URL
                    link = card.get("href") if card.name == "a" else card.select_one("a")
                    if link:
                        url = link if isinstance(link, str) else link.get("href", "")
                        if url and not url.startswith("http"):
                            url = f"{self.BASE_URL}{url}"
                    else:
                        continue

                    # Extract location
                    location_elem = card.select_one(".location, .job-location")
                    location = location_elem.get_text(strip=True) if location_elem else "Dhaka, Bangladesh"

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=url,
                        location=location,
                        experience_level=self.extract_experience_level(title),
                        tags=["Cefalo", "Norwegian Company"],
                    )
                    jobs.append(job)

                except Exception as e:
                    logger.error(f"Error parsing job card: {e}")
                    continue

            # Fetch details for each job
            for job in jobs[:5]:  # Limit to avoid rate limiting
                await self._fetch_job_details(job)

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs

    async def _fetch_job_details(self, job: JobListing) -> None:
        """Fetch additional details for a job listing."""
        soup = await self.fetch_page(job.url)
        if not soup:
            return

        try:
            # Extract description
            desc_elem = soup.select_one(".job-description, .description, article")
            if desc_elem:
                job.description = desc_elem.get_text(strip=True)[:2000]

            # Extract requirements
            req_elem = soup.select_one(".requirements, .qualifications")
            if req_elem:
                job.requirements = req_elem.get_text(strip=True)[:2000]

        except Exception as e:
            logger.error(f"Error fetching job details: {e}")
