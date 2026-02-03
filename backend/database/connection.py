"""
Database connection configuration using SQLAlchemy async.
"""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator
import os
import ssl
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@localhost:5432/job_alert_bd"
)

is_production = os.getenv("APP_ENV") == "production"
is_supabase = "supabase" in DATABASE_URL

# Create async engine
connect_args = {}
if is_supabase or is_production:
    # Supabase (pooler or direct) requires: no prepared statements + SSL
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    connect_args = {
        "statement_cache_size": 0,
        "prepared_statement_cache_size": 0,
        "ssl": ssl_context,
        "timeout": 30,  # asyncpg connection timeout in seconds
    }

engine = create_async_engine(
    DATABASE_URL,
    echo=not is_production and not is_supabase,
    pool_size=2,
    max_overflow=3,
    pool_pre_ping=True,
    pool_recycle=300,  # Recycle connections every 5 minutes
    pool_timeout=30,
    connect_args=connect_args,
)

# Create session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all models."""
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency to get database session."""
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db():
    """Initialize database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def close_db():
    """Close database connections."""
    await engine.dispose()
