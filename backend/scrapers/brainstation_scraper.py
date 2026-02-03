"""
Scraper for Brain Station 23 careers page.
URL: https://brainstation-23.easy.jobs/

Brain Station 23 uses the easy.jobs platform for their career portal.
"""
from .base_scraper import BaseScraper, JobListing
from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)


class BrainStationScraper(BaseScraper):
    """Scraper for Brain Station 23 job listings."""

    COMPANY_NAME = "Brain Station 23"
    BASE_URL = "https://brainstation-23.easy.jobs"
    CAREER_URL = "https://brainstation-23.easy.jobs/"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Brain Station 23's easy.jobs portal."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # easy.jobs renders job cards in the page HTML
            # Look for job card elements
            job_elements = self._find_job_elements(soup)

            for elem in job_elements:
                job = self._parse_job_element(elem)
                if job:
                    jobs.append(job)

            # If structured parsing didn't work, try link-based parsing
            if not jobs:
                jobs = self._parse_job_links(soup)

            # Remove duplicates by URL
            seen_urls = set()
            unique_jobs = []
            for job in jobs:
                if job.url not in seen_urls:
                    seen_urls.add(job.url)
                    unique_jobs.append(job)
            jobs = unique_jobs

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs

    def _find_job_elements(self, soup) -> list:
        """Find job card/listing elements in the page."""
        # Try various selectors that easy.jobs might use
        selectors = [
            ".job-card", ".ej-job-card", ".position-card",
            ".job-listing", "[class*='job-card']",
            ".card.job", "article.job",
        ]

        for selector in selectors:
            elements = soup.select(selector)
            if elements:
                return elements

        return []

    def _parse_job_element(self, elem) -> JobListing | None:
        """Parse a job card element into a JobListing."""
        try:
            # Extract title
            title_elem = elem.select_one("h2, h3, h4, .job-title, .title, a")
            title = title_elem.get_text(strip=True) if title_elem else ""

            if not title or len(title) < 5:
                return None

            # Extract URL
            link = elem.select_one("a[href]")
            if not link:
                return None
            url = link.get("href", "")
            if not url:
                return None
            if not url.startswith("http"):
                url = f"{self.BASE_URL}/{url.lstrip('/')}"

            # Extract deadline
            deadline = self._extract_deadline_from_element(elem)

            # Extract location
            location = "Dhaka, Bangladesh"
            loc_elem = elem.select_one(".location, [class*='location']")
            if loc_elem:
                location = loc_elem.get_text(strip=True) or location

            # Extract vacancy count
            tags = ["Brain Station 23", "Local Company", "700+ Engineers"]

            return JobListing(
                company=self.COMPANY_NAME,
                title=title,
                url=url,
                location=location,
                deadline=deadline,
                experience_level=self.extract_experience_level(title),
                tags=tags,
            )
        except Exception as e:
            logger.error(f"Error parsing job element: {e}")
            return None

    # Non-job URL path segments to skip
    SKIP_URL_PATHS = [
        "/locale/", "/company/", "/about/", "/contact/",
        "/login", "/register", "/signup", "/sign-up",
        "/privacy", "/terms", "/faq", "/help",
        "/category/", "/tag/", "/page/", "/author/",
    ]

    # Non-job title patterns
    SKIP_TITLE_PATTERNS = [
        "apply now", "learn more", "read more", "view all",
        "contact", "about", "home", "career", "login", "sign up",
        "english", "bangla", "chinese", "japanese", "korean",
        "french", "german", "spanish", "arabic", "hindi",
        "traditional", "simplified", "português", "italiano",
    ]

    def _parse_job_links(self, soup) -> list[JobListing]:
        """Fallback: parse job links from the page."""
        jobs = []
        seen_urls = set()

        for link in soup.select("a[href]"):
            href = link.get("href", "").strip()
            title = link.get_text(strip=True)

            if not title or not href:
                continue

            # Must be a link to a specific job on easy.jobs
            if "easy.jobs" not in href and not href.startswith("/"):
                continue

            # Skip short titles (likely nav links)
            if len(title) < 10:
                continue

            # Skip navigation/non-job titles
            title_lower = title.lower()
            if any(pattern in title_lower for pattern in self.SKIP_TITLE_PATTERNS):
                continue

            # Normalize URL
            if not href.startswith("http"):
                href = f"{self.BASE_URL}/{href.lstrip('/')}"

            # Must look like a job detail URL (not homepage, not company page)
            if href.rstrip("/") == self.BASE_URL.rstrip("/"):
                continue

            # Skip non-job URL paths (locale, company info, etc.)
            href_lower = href.lower()
            if any(path in href_lower for path in self.SKIP_URL_PATHS):
                continue

            if href in seen_urls:
                continue
            seen_urls.add(href)

            # Try to find deadline near this link
            deadline = self._extract_deadline_nearby(link)

            jobs.append(JobListing(
                company=self.COMPANY_NAME,
                title=title,
                url=href,
                location="Dhaka, Bangladesh",
                deadline=deadline,
                experience_level=self.extract_experience_level(title),
                tags=["Brain Station 23", "Local Company", "700+ Engineers"],
            ))

        return jobs

    def _extract_deadline_from_element(self, elem) -> datetime | None:
        """Extract deadline date from a job element."""
        text = elem.get_text(strip=True)
        return self._parse_date_text(text)

    def _extract_deadline_nearby(self, link_elem) -> datetime | None:
        """Try to find a deadline date near a link element."""
        parent = link_elem.parent
        if parent:
            text = parent.get_text(strip=True)
            return self._parse_date_text(text)
        return None

    def _parse_date_text(self, text: str) -> datetime | None:
        """Parse date from text in various formats."""
        # Format: "10 Feb, 2026" or "10 Feb 2026" or "15 February, 2026"
        date_patterns = [
            (r'(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[,]?\s+(\d{4})',
             lambda m: datetime.strptime(f"{m.group(1)} {m.group(2)} {m.group(3)}", "%d %b %Y")),
            (r'(\d{1,2})[-/](\d{1,2})[-/](\d{4})',
             lambda m: datetime.strptime(m.group(), "%d-%m-%Y" if "-" in m.group() else "%d/%m/%Y")),
        ]

        for pattern, parser in date_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    return parser(match)
                except ValueError:
                    continue

        return None
