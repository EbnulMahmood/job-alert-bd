"""
Scraper for Cefalo Bangladesh careers page.
URL: https://career.cefalo.com/
"""
from .base_scraper import BaseScraper, JobListing
from datetime import datetime
import logging
import re

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
                # Try alternative selectors for links to specific job pages
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

                    # Try to extract deadline from card text
                    deadline = self._extract_deadline_from_text(card.get_text())

                    job = JobListing(
                        company=self.COMPANY_NAME,
                        title=title,
                        url=url,
                        location=location,
                        deadline=deadline,
                        experience_level=self.extract_experience_level(title),
                        tags=["Cefalo", "Norwegian Company"],
                    )
                    jobs.append(job)

                except Exception as e:
                    logger.error(f"Error parsing job card: {e}")
                    continue

            # Fetch details for each job (including deadline)
            for job in jobs[:5]:
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

            # Extract deadline from the detail page
            # Cefalo uses: <div class="apply-sec"> with "Application Deadline:" label
            deadline = self._extract_deadline_from_detail(soup)
            if deadline:
                job.deadline = deadline

        except Exception as e:
            logger.error(f"Error fetching job details: {e}")

    def _extract_deadline_from_detail(self, soup) -> datetime | None:
        """Extract deadline from Cefalo's job detail page.
        Structure: .apply-sec contains "Application Deadline:" + date text
        """
        try:
            # Try finding the apply section
            apply_sec = soup.select_one(".apply-sec")
            if apply_sec:
                text = apply_sec.get_text(strip=True)
                return self._extract_deadline_from_text(text)

            # Try finding any element containing "deadline" text
            for elem in soup.find_all(string=re.compile(r'deadline|last date|apply before', re.I)):
                parent = elem.parent
                if parent:
                    # Get the text of the parent and nearby siblings
                    context_text = parent.get_text(strip=True)
                    if parent.parent:
                        context_text = parent.parent.get_text(strip=True)
                    deadline = self._extract_deadline_from_text(context_text)
                    if deadline:
                        return deadline

        except Exception as e:
            logger.error(f"Error extracting deadline: {e}")

        return None

    def _extract_deadline_from_text(self, text: str) -> datetime | None:
        """Extract a date from text in various formats."""
        if not text:
            return None

        # Format: "14 December 2025" or "14 Dec 2025" or "11 Dec, 2025"
        patterns = [
            (r'(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)[,]?\s+(\d{4})',
             "%d %B %Y"),
            (r'(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[,]?\s+(\d{4})',
             "%d %b %Y"),
            (r'(\d{1,2})[-/](\d{1,2})[-/](\d{4})',
             None),  # Will handle separately
        ]

        for pattern, fmt in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    if fmt:
                        date_str = f"{match.group(1)} {match.group(2)} {match.group(3)}"
                        return datetime.strptime(date_str, fmt)
                    else:
                        # DD-MM-YYYY or DD/MM/YYYY
                        date_str = match.group()
                        sep = "-" if "-" in date_str else "/"
                        return datetime.strptime(date_str, f"%d{sep}%m{sep}%Y")
                except ValueError:
                    continue

        return None
