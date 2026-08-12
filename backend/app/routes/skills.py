from fastapi import APIRouter, HTTPException

from app.services.graph_service import get_skill

router = APIRouter()


@router.get("/skills/{skill_name}")
def skill_details(skill_name: str):

    try:

        results = get_skill(skill_name)

        if not results:
            raise HTTPException(
                status_code=404,
                detail="Skill not found."
            )

        return results[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Career graph is temporarily unavailable."
        )