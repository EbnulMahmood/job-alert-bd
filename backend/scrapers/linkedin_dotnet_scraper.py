"""
Scraper for .NET/C# jobs in Bangladesh from LinkedIn public job search.
URL: https://www.linkedin.com/jobs/search

LinkedIn's public (guest) job search returns initial results without authentication.
This scraper specifically targets .NET, C#, and ASP.NET related jobs.
"""
from .base_scraper import BaseScraper, JobListing
from datetime import datetime, timedelta
import logging
import re

logger = logging.getLogger(__name__)


class LinkedInDotNetScraper(BaseScraper):
    """Scraper for .NET/C# jobs in Bangladesh from LinkedIn."""

    COMPANY_NAME = "LinkedIn (.NET Jobs)"
    BASE_URL = "https://www.linkedin.com"

    # Multiple search queries to cover different .NET keywords
    SEARCH_URLS = [
        # .NET developer in Bangladesh, past month
        "https://www.linkedin.com/jobs/search?keywords=.NET+developer&location=Bangladesh&f_TPR=r2592000",
        # C# developer in Bangladesh, past month
        "https://www.linkedin.com/jobs/search?keywords=C%23+developer&location=Bangladesh&f_TPR=r2592000",
        # ASP.NET in Bangladesh, past month
        "https://www.linkedin.com/jobs/search?keywords=ASP.NET&location=Bangladesh&f_TPR=r2592000",
        # dotnet in Bangladesh, past month
        "https://www.linkedin.com/jobs/search?keywords=dotnet&location=Bangladesh&f_TPR=r2592000",
    ]

    # .NET related keywords to validate results
    DOTNET_KEYWORDS = [
        ".net", "dotnet", "c#", "csharp", "asp.net", "entity framework",
        "sql server", "mssql", "azure", "blazor", "maui", "xamarin",
        "wpf", "winforms", "ef core",
    ]

    # Skip non-.NET generic titles
    SKIP_TITLE_PATTERNS = [
        "python", "django", "flask", "ruby", "rails",
        "php", "laravel", "wordpress", "drupal",
        "java ", "spring boot", "kotlin",
        "flutter", "dart",
        "go developer", "golang", "rust developer",
    ]

    async def scrape(self) -> list[JobListing]:
        """Scrape .NET/C# job listings from LinkedIn Bangladesh."""
        jobs = []
        seen_urls = set()

        for search_url in self.SEARCH_URLS:
            try:
                soup = await self.fetch_page(search_url)
                if not soup:
                    continue

                page_jobs = self._parse_job_cards(soup)
                for job in page_jobs:
                    if job.url not in seen_urls:
                        seen_urls.add(job.url)
                        jobs.append(job)

            except Exception as e:
                logger.error(f"Error scraping LinkedIn search: {e}")

        logger.info(f"Found {len(jobs)} .NET jobs on LinkedIn Bangladesh")
        return jobs

    def _parse_job_cards(self, soup) -> list[JobListing]:
        """Parse job cards from LinkedIn search results page."""
        jobs = []

        # LinkedIn public search uses these selectors for job cards
        job_cards = soup.select(
            ".base-card, .job-search-card, "
            "[data-entity-urn*='jobPosting'], "
            ".jobs-search__results-list li"
        )

        if not job_cards:
            # Fallback: try to find job links directly
            return self._parse_job_links(soup)

        for card in job_cards:
            try:
                job = self._parse_single_card(card)
                if job:
                    jobs.append(job)
            except Exception as e:
                logger.error(f"Error parsing LinkedIn job card: {e}")

        return jobs

    def _parse_single_card(self, card) -> JobListing | None:
        """Parse a single job card element."""
        # Extract title
        title_elem = card.select_one(
            ".base-search-card__title, .job-search-card__title, "
            "h3, h4, .base-card__full-link"
        )
        if not title_elem:
            return None
        title = title_elem.get_text(strip=True)

        if not title or len(title) < 5:
            return None

        # Check if title is .NET related (filter out non-.NET jobs)
        if not self._is_dotnet_job(title):
            return None

        # Extract company
        company_elem = card.select_one(
            ".base-search-card__subtitle, .job-search-card__company-name, "
            "h4 a, .base-card__subtitle"
        )
        company = company_elem.get_text(strip=True) if company_elem else "Unknown"

        # Extract URL
        link = card.select_one("a[href*='/jobs/view/']")
        if not link:
            link = card.select_one("a[href]")
        if not link:
            return None

        url = link.get("href", "")
        if not url:
            return None
        if not url.startswith("http"):
            url = f"{self.BASE_URL}{url}"

        # Clean URL (remove tracking parameters)
        url = url.split("?")[0]

        # Extract location
        location_elem = card.select_one(
            ".job-search-card__location, .base-search-card__metadata, "
            "[class*='location']"
        )
        location = location_elem.get_text(strip=True) if location_elem else "Bangladesh"

        # Extract posted date
        date_elem = card.select_one(
            "time, .job-search-card__listdate, [datetime]"
        )
        posted_date = None
        if date_elem:
            dt = date_elem.get("datetime")
            if dt:
                try:
                    posted_date = datetime.fromisoformat(dt.replace("Z", "+00:00"))
                except ValueError:
                    pass

        # Build tags
        tags = self._build_tags(title, company)

        return JobListing(
            company=company,
            title=title,
            url=url,
            location=location,
            posted_date=posted_date,
            experience_level=self.extract_experience_level(title),
            tags=tags,
            job_type="Full-time",
        )

    def _parse_job_links(self, soup) -> list[JobListing]:
        """Fallback: parse job links from the page text."""
        jobs = []
        seen_urls = set()

        for link in soup.select("a[href*='/jobs/view/']"):
            href = link.get("href", "").strip()
            title = link.get_text(strip=True)

            if not title or not href or len(title) < 10:
                continue

            # Must be .NET related
            if not self._is_dotnet_job(title):
                continue

            if not href.startswith("http"):
                href = f"{self.BASE_URL}{href}"
            href = href.split("?")[0]

            if href in seen_urls:
                continue
            seen_urls.add(href)

            # Try to find company from nearby elements
            company = self._extract_company_near_link(link)

            jobs.append(JobListing(
                company=company,
                title=title,
                url=href,
                location="Bangladesh",
                experience_level=self.extract_experience_level(title),
                tags=self._build_tags(title, company),
                job_type="Full-time",
            ))

        return jobs

    def _extract_company_near_link(self, link_elem) -> str:
        """Try to find company name near a job link."""
        parent = link_elem.parent
        if parent:
            # Look for subtitle/company elements
            company_elem = parent.select_one(
                ".base-search-card__subtitle, h4, [class*='company']"
            )
            if company_elem:
                return company_elem.get_text(strip=True)
            # Try parent's parent
            if parent.parent:
                company_elem = parent.parent.select_one(
                    ".base-search-card__subtitle, h4, [class*='company']"
                )
                if company_elem:
                    return company_elem.get_text(strip=True)
        return "Unknown"

    def _is_dotnet_job(self, title: str) -> bool:
        """Check if a job title is .NET/C# related."""
        title_lower = title.lower()

        # Must contain at least one .NET keyword
        has_dotnet = any(kw in title_lower for kw in self.DOTNET_KEYWORDS)

        # Or generic "software engineer" / "full stack" that might be .NET
        is_generic_dev = any(kw in title_lower for kw in [
            "software engineer", "full stack", "full-stack", "fullstack",
            "backend", "programmer",
        ])

        # If it's explicitly a non-.NET technology, skip
        is_other_tech = any(kw in title_lower for kw in self.SKIP_TITLE_PATTERNS)

        if has_dotnet:
            return True

        # Generic titles are OK only if they also mention .NET-adjacent terms
        if is_generic_dev and not is_other_tech:
            # Check for .NET hints in the broader title
            dotnet_hints = [".net", "c#", "sql server", "azure", "microsoft"]
            return any(hint in title_lower for hint in dotnet_hints)

        return False

    def _build_tags(self, title: str, company: str) -> list[str]:
        """Build relevant tags for the job."""
        tags = ["LinkedIn", "Bangladesh"]
        text = title.lower()

        tag_map = {
            ".NET": [".net", "dotnet"],
            "C#": ["c#", "csharp"],
            "ASP.NET": ["asp.net"],
            "SQL Server": ["sql server", "mssql"],
            "Azure": ["azure"],
            "Entity Framework": ["entity framework", "ef core"],
            "Full-Stack": ["full stack", "full-stack", "fullstack"],
            "Backend": ["backend", "back-end"],
        }

        for tag, keywords in tag_map.items():
            if any(kw in text for kw in keywords):
                tags.append(tag)

        return tags
