"""
Scraper for Brain Station 23 careers page.
URL: https://brainstation-23.com/career-verse/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class BrainStationScraper(BaseScraper):
    """Scraper for Brain Station 23 job listings."""

    COMPANY_NAME = "Brain Station 23"
    BASE_URL = "https://brainstation-23.com"
    CAREER_URL = "https://brainstation-23.com/career-verse/"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Brain Station 23's career page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Brain Station 23 career page structure
            job_cards = soup.select(
                ".job-card, .career-card, .position-item, "
                ".jobs-listing li, article.job, .vacancy"
            )

            if not job_cards:
                # Try finding job sections with links
                sections = soup.select(
                    "[class*='job'], [class*='career'], [class*='position'], "
                    ".grid, .list, section"
                )

                for section in sections:
                    cards = section.select("a, .card, article")
                    for card in cards:
                        if card.name == "a":
                            href = card.get("href", "")
                            title = card.get_text(strip=True)
                        else:
                            link = card.select_one("a")
                            if not link:
                                continue
                            href = link.get("href", "")
                            title_elem = card.select_one("h2, h3, h4, .title")
                            title = title_elem.get_text(strip=True) if title_elem else link.get_text(strip=True)

                        # Skip navigation/empty links
                        if not title or len(title) < 5:
                            continue
                        if any(skip in title.lower() for skip in [
                            "apply now", "learn more", "read more", "view all", "contact"
                        ]):
                            continue

                        if not href.startswith("http"):
                            href = f"{self.BASE_URL}{href}"

                        job = JobListing(
                            company=self.COMPANY_NAME,
                            title=title,
                            url=href,
                            location="Dhaka, Bangladesh",
                            experience_level=self.extract_experience_level(title),
                            tags=["Brain Station 23", "Local Company", "700+ Engineers"],
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

                        dept_elem = card.select_one(".department, .team, .category")
                        department = dept_elem.get_text(strip=True) if dept_elem else ""

                        desc_elem = card.select_one(".description, .summary, p")
                        description = desc_elem.get_text(strip=True) if desc_elem else ""

                        if title:
                            tags = ["Brain Station 23", "Local Company"]
                            if department:
                                tags.append(department)

                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url or self.CAREER_URL,
                                description=description,
                                location="Dhaka, Bangladesh",
                                experience_level=self.extract_experience_level(title, description),
                                tags=tags,
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")

            # Remove duplicates
            seen = set()
            unique_jobs = []
            for job in jobs:
                key = (job.title, job.url)
                if key not in seen:
                    seen.add(key)
                    unique_jobs.append(job)
            jobs = unique_jobs

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs
