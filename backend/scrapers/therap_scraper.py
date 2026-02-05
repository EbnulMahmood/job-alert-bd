"""
Scraper for Therap (BD) Ltd. careers page.
URL: https://therap.hire.trakstar.com/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class TherapScraper(BaseScraper):
    """Scraper for Therap BD job listings."""

    COMPANY_NAME = "Therap BD"
    BASE_URL = "https://therap.hire.trakstar.com"
    CAREER_URL = "https://therap.hire.trakstar.com/"
    # Trakstar API endpoint
    API_URL = "https://therap.hire.trakstar.com/api/v1/openings"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Therap's career page."""
        jobs = []

        # Try API first
        api_jobs = await self._scrape_api()
        if api_jobs:
            return api_jobs

        # Fallback to HTML
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Trakstar job board structure
            job_cards = soup.select(
                ".opening, .job-opening, .position-listing, "
                "[data-opening], .jobs-list li"
            )

            if not job_cards:
                # Trakstar HTML: a[href*='jobs'] > div.row > div > h3 + div.location
                job_links = soup.select("a[href*='jobs'], a[href*='opening']")
                seen = set()

                for link in job_links:
                    href = link.get("href", "")

                    # Extract title from h3 only (not full link text)
                    title_elem = link.select_one(
                        "h3.js-job-list-opening-name, h3, h4, .opening-title"
                    )
                    title = title_elem.get_text(strip=True) if title_elem else ""

                    if href in seen or not title or len(title) < 3:
                        continue

                    seen.add(href)

                    if not href.startswith("http"):
                        href = f"{self.BASE_URL}{href}"

                    # Extract location separately
                    loc_elem = link.select_one(
                        "div.js-job-list-opening-loc, .location, [class*='location']"
                    )
                    location = loc_elem.get_text(strip=True) if loc_elem else "Dhaka, Bangladesh"

                    # Extract department
                    dept_elem = link.select_one("div.rb-text-4")
                    department = dept_elem.get_text(strip=True) if dept_elem else ""

                    # Extract job type (specifically the meta div, not location meta spans)
                    type_elem = link.select_one("div.js-job-list-opening-meta")
                    job_type = type_elem.get_text(strip=True) if type_elem else "Full-time"

                    tags = ["Therap", "US Healthcare", "SaaS"]
                    if department:
                        tags.append(department)

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location=location,
                        job_type=job_type,
                        experience_level=self.extract_experience_level(title),
                        tags=tags,
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

                        location_elem = card.select_one(".location")
                        location = location_elem.get_text(strip=True) if location_elem else "Dhaka, Bangladesh"

                        if title and url:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location=location,
                                experience_level=self.extract_experience_level(title),
                                tags=["Therap", "US Healthcare", "SaaS"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")

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
                        url=opening.get("url", self.CAREER_URL),
                        description=opening.get("description", ""),
                        location=opening.get("location", "Dhaka, Bangladesh"),
                        job_type=opening.get("employment_type", "Full-time"),
                        experience_level=self.extract_experience_level(
                            opening.get("title", ""),
                            opening.get("description", "")
                        ),
                        tags=["Therap", "US Healthcare", "SaaS"],
                    )
                    jobs.append(job)

        except Exception as e:
            logger.debug(f"API scraping failed: {e}")

        return jobs
