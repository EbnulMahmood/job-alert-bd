"""
Scraper for Samsung R&D Institute Bangladesh careers page.
URL: https://www.samsung.com/bd/about-us/careers/
"""
from .base_scraper import BaseScraper, JobListing
import logging

logger = logging.getLogger(__name__)


class SamsungScraper(BaseScraper):
    """Scraper for Samsung R&D Bangladesh job listings."""

    COMPANY_NAME = "Samsung R&D"
    BASE_URL = "https://www.samsung.com"
    CAREER_URL = "https://www.samsung.com/bd/about-us/careers/"
    BDJOBS_URL = "https://jobs.bdjobs.com/companyofferedjobs.asp?id=31249"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Samsung R&D's career page."""
        jobs = []

        # Scrape main career page
        soup = await self.fetch_page(self.CAREER_URL)
        if soup:
            jobs.extend(await self._parse_samsung_page(soup))

        # Also try BDJobs page for Samsung
        bdjobs_soup = await self.fetch_page(self.BDJOBS_URL)
        if bdjobs_soup:
            jobs.extend(await self._parse_bdjobs_page(bdjobs_soup))

        # Remove duplicates
        seen_titles = set()
        unique_jobs = []
        for job in jobs:
            if job.title not in seen_titles:
                seen_titles.add(job.title)
                unique_jobs.append(job)

        logger.info(f"Found {len(unique_jobs)} jobs at {self.COMPANY_NAME}")
        return unique_jobs

    async def _parse_samsung_page(self, soup) -> list[JobListing]:
        """Parse Samsung's official career page."""
        jobs = []

        try:
            # Samsung's career page structure
            job_cards = soup.select(
                ".job-listing, .career-item, .position-card, "
                "[class*='career'], [class*='job']"
            )

            if not job_cards:
                # Try finding any job-related links
                job_links = soup.select("a[href*='job'], a[href*='career'], a[href*='position']")

                for link in job_links:
                    href = link.get("href", "")
                    title = link.get_text(strip=True)

                    if not title or len(title) < 5:
                        continue

                    if not href.startswith("http"):
                        href = f"{self.BASE_URL}{href}"

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location="Dhaka, Bangladesh",
                        experience_level=self.extract_experience_level(title),
                        tags=["Samsung", "MNC", "R&D"],
                    )
                    jobs.append(job)
            else:
                for card in job_cards:
                    try:
                        title_elem = card.select_one("h2, h3, h4, .title, a")
                        title = title_elem.get_text(strip=True) if title_elem else ""

                        link = card.select_one("a")
                        url = self.CAREER_URL
                        if link:
                            url = link.get("href", "")
                            if not url.startswith("http"):
                                url = f"{self.BASE_URL}{url}"

                        if title:
                            job = JobListing(
                                company=self.COMPANY_NAME,
                                title=title,
                                url=url,
                                location="Dhaka, Bangladesh",
                                experience_level=self.extract_experience_level(title),
                                tags=["Samsung", "MNC", "R&D"],
                            )
                            jobs.append(job)

                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")

        except Exception as e:
            logger.error(f"Error parsing Samsung page: {e}")

        return jobs

    async def _parse_bdjobs_page(self, soup) -> list[JobListing]:
        """Parse BDJobs page for Samsung listings."""
        jobs = []

        try:
            # BDJobs structure
            job_rows = soup.select("tr.job-row, .job-item, [class*='job']")

            if not job_rows:
                # Try finding job links directly
                job_links = soup.select("a[href*='jobdetails'], a[href*='job']")

                for link in job_links:
                    title = link.get_text(strip=True)
                    href = link.get("href", "")

                    if not title or len(title) < 5:
                        continue

                    if not href.startswith("http"):
                        href = f"https://jobs.bdjobs.com{href}"

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=href,
                        location="Dhaka, Bangladesh",
                        experience_level=self.extract_experience_level(title),
                        tags=["Samsung", "MNC", "R&D", "BDJobs"],
                    )
                    jobs.append(job)

        except Exception as e:
            logger.error(f"Error parsing BDJobs page: {e}")

        return jobs
