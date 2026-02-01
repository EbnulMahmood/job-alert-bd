"""
Base scraper class that all company scrapers inherit from.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
import httpx
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class JobListing:
    """Represents a single job listing."""
    company: str
    title: str
    url: str
    description: Optional[str] = None
    requirements: Optional[str] = None
    location: Optional[str] = "Dhaka, Bangladesh"
    job_type: Optional[str] = "Full-time"
    experience_level: Optional[str] = None
    posted_date: Optional[datetime] = None
    deadline: Optional[datetime] = None
    salary_range: Optional[str] = None
    tags: list[str] = field(default_factory=list)


class BaseScraper(ABC):
    """
    Abstract base class for all job scrapers.
    Each company scraper must implement the scrape() method.
    """

    COMPANY_NAME: str = "Unknown"
    BASE_URL: str = ""
    CAREER_URL: str = ""

    def __init__(self):
        self.client = httpx.AsyncClient(
            timeout=30.0,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
            },
            follow_redirects=True,
        )

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()

    async def fetch_page(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch and parse a web page."""
        try:
            response = await self.client.get(url)
            response.raise_for_status()
            return BeautifulSoup(response.text, "lxml")
        except httpx.HTTPError as e:
            logger.error(f"Error fetching {url}: {e}")
            return None

    async def fetch_json(self, url: str) -> Optional[dict]:
        """Fetch JSON data from an API endpoint."""
        try:
            response = await self.client.get(url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            logger.error(f"Error fetching JSON from {url}: {e}")
            return None

    @abstractmethod
    async def scrape(self) -> list[JobListing]:
        """
        Scrape job listings from the company's career page.
        Must be implemented by each company scraper.

        Returns:
            List of JobListing objects.
        """
        pass

    def is_dotnet_related(self, job: JobListing) -> bool:
        """Check if a job is related to .NET/C# development."""
        keywords = [
            ".net", "dotnet", "c#", "csharp", "asp.net", "entity framework",
            "azure", "sql server", "mssql", "backend", "full-stack", "fullstack"
        ]

        text_to_search = f"{job.title} {job.description or ''} {job.requirements or ''}".lower()
        return any(keyword in text_to_search for keyword in keywords)

    def extract_experience_level(self, title: str, description: str = "") -> str:
        """Extract experience level from job title or description."""
        text = f"{title} {description}".lower()

        if any(word in text for word in ["senior", "sr.", "lead", "principal", "staff"]):
            return "Senior"
        elif any(word in text for word in ["junior", "jr.", "entry", "fresher", "fresh"]):
            return "Junior"
        elif any(word in text for word in ["mid", "intermediate", "associate"]):
            return "Mid-Level"
        elif any(word in text for word in ["intern", "trainee"]):
            return "Intern"

        return "Not Specified"
