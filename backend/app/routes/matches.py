from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.graph_service import get_matches

router = APIRouter()


class MatchRequest(BaseModel):
    skills: list[str]


@router.post("/matches")
def find_matches(request: MatchRequest):

    if not request.skills:
        raise HTTPException(
            status_code=400,
            detail="Select at least one skill."
        )

    try:

        results = get_matches(request.skills)

        return {
            "skills": request.skills,
            "matches": results
        }

    except Exception:

        raise HTTPException(
            status_code=503,
            detail="Unable to calculate career matches."
        )