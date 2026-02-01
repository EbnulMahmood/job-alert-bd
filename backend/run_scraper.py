"""
Script to run all scrapers and store results in the database.
Can be run manually or via cron job.
"""
import asyncio
import os
import sys
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
load_dotenv()

from scrapers import ALL_SCRAPERS
from scrapers.base_scraper import JobListing
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select
from database.connection import Base
from api.models import Job
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def run_all_scrapers() -> list[JobListing]:
    """Run all scrapers and collect jobs."""
    all_jobs = []

    for scraper_class in ALL_SCRAPERS:
        try:
            logger.info(f"Running scraper: {scraper_class.COMPANY_NAME}")
            async with scraper_class() as scraper:
                jobs = await scraper.scrape()
                all_jobs.extend(jobs)
                logger.info(f"Found {len(jobs)} jobs from {scraper_class.COMPANY_NAME}")
        except Exception as e:
            logger.error(f"Error running {scraper_class.COMPANY_NAME} scraper: {e}")

    logger.info(f"Total jobs found: {len(all_jobs)}")
    return all_jobs


async def save_jobs_to_db(jobs: list[JobListing]) -> dict:
    """Save jobs to database, avoiding duplicates."""
    import ssl

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:postgres@localhost:5432/job_alert_bd"
    )

    # Supabase requires SSL
    connect_args = {}
    if "supabase" in DATABASE_URL:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        connect_args = {
            "statement_cache_size": 0,
            "prepared_statement_cache_size": 0,
            "ssl": ssl_context,
        }

    engine = create_async_engine(DATABASE_URL, connect_args=connect_args)

    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    stats = {"new": 0, "existing": 0, "errors": 0}

    async with async_session() as session:
        for job_listing in jobs:
            try:
                # Check if job already exists
                query = select(Job).where(Job.url == job_listing.url)
                result = await session.execute(query)
                existing = result.scalar_one_or_none()

                if existing:
                    # Update existing job
                    existing.title = job_listing.title
                    existing.description = job_listing.description
                    existing.requirements = job_listing.requirements
                    existing.is_active = True
                    stats["existing"] += 1
                else:
                    # Create new job
                    new_job = Job(
                        company=job_listing.company,
                        title=job_listing.title,
                        url=job_listing.url,
                        description=job_listing.description,
                        requirements=job_listing.requirements,
                        location=job_listing.location,
                        job_type=job_listing.job_type,
                        experience_level=job_listing.experience_level,
                        posted_date=job_listing.posted_date,
                        deadline=job_listing.deadline,
                        salary_range=job_listing.salary_range,
                        tags=job_listing.tags,
                        is_active=True,
                    )
                    session.add(new_job)
                    stats["new"] += 1

            except Exception as e:
                logger.error(f"Error saving job {job_listing.title}: {e}")
                stats["errors"] += 1

        await session.commit()

    await engine.dispose()
    return stats


async def main():
    """Main function to run scrapers and save results."""
    logger.info(f"Starting job scraping at {datetime.now()}")

    # Run scrapers
    jobs = await run_all_scrapers()

    if not jobs:
        logger.warning("No jobs found from any scraper")
        return

    # Save to database
    stats = await save_jobs_to_db(jobs)

    logger.info(f"Scraping complete!")
    logger.info(f"  New jobs: {stats['new']}")
    logger.info(f"  Updated jobs: {stats['existing']}")
    logger.info(f"  Errors: {stats['errors']}")

    # Print summary
    print("\n" + "="*50)
    print("SCRAPING SUMMARY")
    print("="*50)
    print(f"Total jobs found: {len(jobs)}")
    print(f"New jobs added: {stats['new']}")
    print(f"Existing jobs updated: {stats['existing']}")
    print(f"Errors: {stats['errors']}")
    print("="*50)

    # Print jobs by company
    by_company = {}
    for job in jobs:
        by_company[job.company] = by_company.get(job.company, 0) + 1

    print("\nJobs by Company:")
    for company, count in sorted(by_company.items()):
        print(f"  {company}: {count}")


if __name__ == "__main__":
    asyncio.run(main())
