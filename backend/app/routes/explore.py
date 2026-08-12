from fastapi import APIRouter, Query, HTTPException

from app.services.graph_service import (
    get_all_entities,
    search_entities,
)

router = APIRouter()


@router.get("/explore")
def explore(
    search: str | None = Query(default=None),
    entity_type: str | None = Query(default=None),
):
    """
    Explore CareerGraph entities.

    Examples:

    /api/explore

    /api/explore?search=python

    /api/explore?search=data&entity_type=Role
    """

    try:

        if search:
            results = search_entities(
                search,
                entity_type
            )
        else:
            results = get_all_entities()

        return {
            "results": results,
            "count": len(results)
        }

    except Exception as error:

        raise HTTPException(
            status_code=503,
            detail="Career graph is temporarily unavailable."
        )