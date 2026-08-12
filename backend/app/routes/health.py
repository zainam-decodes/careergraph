from fastapi import APIRouter
from app.database import verify_connection

router = APIRouter()


@router.get("/health")
def health_check():
    """
    Simple health endpoint.

    Also verifies that CognoDB is reachable.
    """

    try:
        verify_connection()

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception:
        return {
            "status": "unhealthy",
            "database": "unavailable"
        }