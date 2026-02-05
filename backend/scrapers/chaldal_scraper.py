"""
Scraper for Chaldal Engineering careers page.
URL: https://chaldal.tech/

Chaldal uses .NET, F#, C#, SQL Server, TypeScript in their tech stack.
Page structure: div.list-group > a[href="#"] > span (title) + p (locations)
"""
from .base_scraper import BaseScraper, JobListing
import logging
import re

logger = logging.getLogger(__name__)


class ChaldalScraper(BaseScraper):
    """Scraper for Chaldal Engineering job listings."""

    COMPANY_NAME = "Chaldal"
    BASE_URL = "https://chaldal.tech"
    CAREER_URL = "https://chaldal.tech/"

    async def scrape(self) -> list[JobListing]:
        """Scrape job listings from Chaldal Engineering's careers page."""
        jobs = []
        soup = await self.fetch_page(self.CAREER_URL)

        if not soup:
            logger.error(f"Failed to fetch {self.COMPANY_NAME} career page")
            return jobs

        try:
            # Chaldal uses: div.list-group > a[href="#"] > span (title) + p (locations)
            job_cards = soup.select("div.list-group a[href='#']")

            for card in job_cards:
                title_elem = card.select_one("span")
                location_elem = card.select_one("p")

                if not title_elem:
                    continue

                title = title_elem.get_text(strip=True)
                if not title or len(title) < 10:
                    continue

                # Must look like a job title
                title_lower = title.lower()
                if not any(kw in title_lower for kw in [
                    "engineer", "developer", "designer", "analyst",
                    "manager", "lead", "architect", "intern",
                ]):
                    continue

                # Extract location from <p> child
                location = "Dhaka, Bangladesh"
                if location_elem:
                    loc_text = location_elem.get_text(" ", strip=True)
                    if loc_text:
                        location = loc_text

                # Find the APPLY link after this card
                apply_url = self._find_apply_link(card)

                # Build description from siblings between this card and next
                description = self._extract_description(card)

                # Extract tech tags from description
                tags = self._extract_tech_tags(f"{title} {description}")

                # Generate unique URL using title slug (APPLY links are same generic form)
                slug = re.sub(r'[^\w\s-]', '', title.lower())
                slug = re.sub(r'[\s_]+', '-', slug).strip('-')
                job_url = apply_url or f"{self.CAREER_URL}#job-{slug}"

                job = JobListing(
                    company=self.COMPANY_NAME,
                    title=title,
                    url=job_url,
                    description=description[:2000] if description else None,
                    location=location,
                    experience_level=self.extract_experience_level(title, description or ""),
                    tags=tags,
                )
                jobs.append(job)

        except Exception as e:
            logger.error(f"Error scraping {self.COMPANY_NAME}: {e}")

        logger.info(f"Found {len(jobs)} jobs at {self.COMPANY_NAME}")
        return jobs

    def _find_apply_link(self, card) -> str | None:
        """Find the APPLY link (Microsoft Forms) after a job card."""
        parent = card.parent  # div.list-group
        sibling = parent.find_next_sibling() if parent else None
        count = 0
        while sibling and count < 20:
            # Check if we hit another job card
            if sibling.select("div.list-group a[href='#']"):
                break
            # Look for Forms link
            forms_link = sibling.select_one("a[href*='forms.office.com'], a[href*='forms.gle']")
            if forms_link:
                return forms_link.get("href")
            # Also check for text "APPLY" links
            for link in sibling.select("a[href]"):
                if "apply" in link.get_text(strip=True).lower():
                    return link.get("href")
            sibling = sibling.find_next_sibling()
            count += 1
        return None

    def _extract_description(self, card) -> str:
        """Extract job description from elements after the card."""
        texts = []
        parent = card.parent
        sibling = parent.find_next_sibling() if parent else None
        count = 0
        while sibling and count < 15:
            # Stop at next job card
            if sibling.select("div.list-group a[href='#']"):
                break
            # Skip APPLY links
            if sibling.select("a[href*='forms.office.com']"):
                break
            text = sibling.get_text(strip=True)
            if text and len(text) > 10:
                texts.append(text)
            sibling = sibling.find_next_sibling()
            count += 1
        return " ".join(texts)

    def _extract_tech_tags(self, text: str) -> list[str]:
        """Extract technology tags from text."""
        tags = ["Chaldal"]
        tech_map = {
            ".NET": [".net", "dotnet", ".net core"],
            "F#": ["f#", "fsharp"],
            "C#": ["c#", "csharp"],
            "SQL Server": ["sql server", "mssql"],
            "TypeScript": ["typescript"],
            "React": ["react", "reactjs"],
            "React Native": ["react native"],
            "Python": ["python"],
            "JavaScript": ["javascript"],
        }

        text_lower = text.lower()
        for tag, keywords in tech_map.items():
            if any(kw in text_lower for kw in keywords):
                tags.append(tag)

        return tags
