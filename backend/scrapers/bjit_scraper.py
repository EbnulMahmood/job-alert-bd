"""
Scraper for BJIT Group careers page.
URL: https://bjitgroup.com/career
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class BJITScraper(BaseScraper):
    """Scraper for BJIT Group job listings."""

    COMPANY_NAME = "BJIT"
    BASE_URL = "https://bjitgroup.com"
    CAREER_URL = "https://bjitgroup.com/career"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from BJIT's career page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Find job listings - BJIT structure
            job_cards = soup.select(
                ".job-card, .career-card, .position-card, "
                ".jobs-list li, .vacancy-item, article.job"
            )

            if not job_cards:
                # Try finding job sections or links
                job_sections = soup.select(
                    "[class*='job'], [class*='career'], [class*='position']"
                )

                for section in job_sections:
                    links = section.select("a[href]")
                    for link in links:
                        href = link.get("href", "")
                        title = link.get_text(strip=True)

                        # Filter out non-job links
                        if (not title or len(title) < 5 or
                            any(skip in title.lower() for skip in ["apply", "more", "read", "view"])):
                            continue

                        if not href.startswith("http"):
                            href = f"{self.BASE_URL}{href}"

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=href,
                            location="Dhaka, Bangladesh",
                            experience_level=self.extract_experience_level(title),
                            tags=["BJIT", "Japanese Clients", "Global"],
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

                        location_elem = card.select_one(".location")
                        location = location_elem.get_text(strip=True) if location_elem else "Dhaka, Bangladesh"

                        desc_elem = card.select_one(".description, .summary, p")
                        description = desc_elem.get_text(strip=True) if desc_elem else ""

                        if title:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url or f"{self.CAREER_URL}#{title.lower().replace(' ', '-')}",
                                description=description,
                                location=location,
                                experience_level=self.extract_experience_level(title, description),
                                tags=["BJIT", "Japanese Clients", "Global"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")
                        continue

            # Remove duplicates based on title
            seen_titles = set()
            unique_jobs = []
            for job in jobs:
                if job.title not in seen_titles:
                    seen_titles.add(job.title)
                    unique_jobs.append(job)
            jobs = unique_jobs

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs
