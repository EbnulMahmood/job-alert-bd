"""
Scraper for SELISE Digital Platforms careers page.
URL: https://selise.ch/career/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class SeliseScraper(BaseScraper):
    """Scraper for SELISE job listings."""

    COMPANY_NAME = "SELISE"
    BASE_URL = "https://selise.ch"
    CAREER_URL = "https://selise.ch/career/"
    OPEN_APPLICATION_URL = "https://selisegroup.com/job/open-application-2/"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from SELISE's career page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Find job listings - SELISE uses various CSS structures
            job_cards = soup.select(
                ".job-listing, .career-listing, .position-item, "
                ".jobs-list li, article.job, .vacancy"
            )

            if not job_cards:
                # Try finding job links
                job_links = soup.select(
                    "a[href*='job'], a[href*='career'], a[href*='position']"
                )

                for link in job_links:
                    href = link.get("href", "")
                    title = link.get_text(strip=True)

                    # Skip navigation links
                    if not title or len(title) < 5 or title.lower() in ["careers", "jobs", "apply"]:
                        continue

                    if not href.startswith("http"):
                        href = f"{self.BASE_URL}{href}"

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location="Dhaka, Bangladesh",
                        experience_level=self.extract_experience_level(title),
                        tags=["SELISE", "Swiss Company", "Enterprise"],
                    )
                    jobs.append(job)

            else:
                for card in job_cards:
                    try:
                        title_elem = card.select_one("h2, h3, h4, .job-title, .title")
                        title = title_elem.get_text(strip=True) if title_elem else ""

                        link = card.select_one("a")
                        url = ""
                        if link:
                            url = link.get("href", "")
                            if not url.startswith("http"):
                                url = f"{self.BASE_URL}{url}"

                        location_elem = card.select_one(".location, .job-location")
                        location = location_elem.get_text(strip=True) if location_elem else "Dhaka, Bangladesh"

                        if title and url:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location=location,
                                experience_level=self.extract_experience_level(title),
                                tags=["SELISE", "Swiss Company", "Enterprise"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")
                        continue

            # Always add the open application option
            jobs.append(JobListing(
                company=self.COMPANY_NAME,
                title="Open Application - Submit Your Profile",
                url=self.OPEN_APPLICATION_URL,
                description="Didn't see your exact role listed? Submit an open application.",
                location="Dhaka, Bangladesh",
                experience_level="All Levels",
                tags=["SELISE", "Swiss Company", "Open Application"],
            ))

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs
