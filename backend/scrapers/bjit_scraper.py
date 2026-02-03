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

    NO_VACANCY_PATTERNS = [
        "no vacancies", "no vacancy", "no current openings",
        "no positions", "currently no", "no jobs available",
        "no open positions",
    ]

    SKIP_TITLES = {
        "career", "careers", "home", "about", "contact",
        "services", "projects", "blog", "news", "team",
        "apply", "apply now", "submit", "send", "join us",
    }

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from BJIT's career page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Check if page says "no vacancies"
            page_text = soup.get_text(strip=True).lower()
            if any(pattern in page_text for pattern in self.NO_VACANCY_PATTERNS):
                logger.info(f"{self.COMPANY_NAME}: No vacancies available")
                return jobs

            # Strategy 1: Look for structured job cards
            job_cards = soup.select(
                ".job-card, .career-card, .position-card, "
                ".jobs-list li, .vacancy-item, article.job"
            )

            if job_cards:
                for card in job_cards:
                    job = self._parse_job_card(card)
                    if job:
                        jobs.append(job)
            else:
                # Strategy 2: Look for job listing links with strict validation
                jobs = self._find_job_links(soup)

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

    def _parse_job_card(self, card) -> JobListing | None:
        """Parse a structured job card element."""
        try:
            title_elem = card.select_one("h2, h3, h4, .job-title, .title")
            title = title_elem.get_text(strip=True) if title_elem else ""

            if not title or title.lower().strip() in self.SKIP_TITLES or len(title) < 5:
                return None

            link = card.select_one("a[href]")
            url = ""
            if link:
                url = link.get("href", "")
                if url and not url.startswith("http"):
                    url = f"{self.BASE_URL}{url}"

            # Require a valid URL - never generate fake URLs
            if not url or url.endswith("#") or "/#" in url:
                return None
            if any(url.startswith(p) for p in ["javascript:", "mailto:", "tel:"]):
                return None

            location_elem = card.select_one(".location")
            location = location_elem.get_text(strip=True) if location_elem else "Dhaka, Bangladesh"

            desc_elem = card.select_one(".description, .summary, p")
            description = desc_elem.get_text(strip=True) if desc_elem else ""

            return JobListing(
                company=self.COMPANY_NAME,
                title=title,
                url=url,
                description=description or None,
                location=location,
                experience_level=self.extract_experience_level(title, description),
                tags=["BJIT", "Japanese Clients", "Global"],
            )
        except Exception as e:
            logger.error(f"Error parsing job card: {e}")
            return None

    def _find_job_links(self, soup) -> list[JobListing]:
        """Find actual job posting links, not navigation."""
        jobs = []
        seen_urls = set()

        for link in soup.select("a[href]"):
            href = link.get("href", "").strip()
            title = link.get_text(strip=True)

            if not title or not href:
                continue
            if title.lower().strip() in self.SKIP_TITLES:
                continue
            if len(title) < 10:
                continue

            if not href.startswith("http"):
                href = f"{self.BASE_URL}{href}"

            # Skip invalid URLs
            if any(href.startswith(p) for p in ["javascript:", "mailto:", "tel:"]):
                continue
            if href.endswith("#") or "/#" in href:
                continue

            # Must look like a job detail page
            href_lower = href.lower()
            if not any(kw in href_lower for kw in [
                "/career/", "/job/", "/position/", "/vacancy/", "/opening/",
            ]):
                continue

            if href in seen_urls:
                continue
            seen_urls.add(href)

            jobs.append(JobListing(
                company=self.COMPANY_NAME,
                title=title,
                url=href,
                location="Dhaka, Bangladesh",
                experience_level=self.extract_experience_level(title),
                tags=["BJIT", "Japanese Clients", "Global"],
            ))

        return jobs
