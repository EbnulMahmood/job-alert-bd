"""
API authentication dependencies.
"""
import os
from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)


async def require_admin_key(
    api_key: str = Security(API_KEY_HEADER),
) -> str:
    """
    Dependency that requires a valid admin API key.
    Used for write operations (create, update, delete jobs)
    and internal endpoints (send notifications, daily digest).
    """
    expected_key = os.getenv("ADMIN_API_KEY", "")
    if not expected_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin API key not configured",
        )
    if not api_key or api_key != expected_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
        )
    return api_key
