"""
FastAPI main application.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import init_db, close_db
from api.routes import jobs_router, subscriptions_router, notifications_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    try:
        await init_db()
        print("Database connected successfully!")
    except Exception as e:
        print(f"Warning: Database connection failed: {e}")
        print("Server will start without database. DB-dependent routes won't work.")
    yield
    # Shutdown
    try:
        await close_db()
    except Exception:
        pass


app = FastAPI(
    title="BD Job Alert API",
    description="API for monitoring tech job openings in Bangladesh",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",
        os.getenv("APP_URL", "http://localhost:5173"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(jobs_router, prefix="/api")
app.include_router(subscriptions_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "BD Job Alert API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy"}


# Companies being monitored
MONITORED_COMPANIES = [
    {"name": "Cefalo", "url": "https://career.cefalo.com/", "type": "private"},
    {"name": "Kaz Software", "url": "https://kazsoftware.hire.trakstar.com/", "type": "private"},
    {"name": "SELISE", "url": "https://selise.ch/career/", "type": "private"},
    {"name": "Enosis Solutions", "url": "https://enosisbd.pinpointhq.com/", "type": "private"},
    {"name": "BJIT", "url": "https://bjitgroup.com/career", "type": "private"},
    {"name": "Samsung R&D", "url": "https://www.samsung.com/bd/about-us/careers/", "type": "private"},
    {"name": "Therap BD", "url": "https://therap.hire.trakstar.com/", "type": "private"},
    {"name": "Brain Station 23", "url": "https://brainstation-23.com/career-verse/", "type": "private"},
    {"name": "Bangladesh Bank", "url": "https://erecruitment.bb.org.bd/", "type": "government"},
    {"name": "a2i", "url": "https://a2i.gov.bd/site/view/jobs/-", "type": "government"},
]


@app.get("/api/companies/monitored")
async def get_monitored_companies():
    """Get list of companies being monitored."""
    return MONITORED_COMPANIES


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
