from fastapi import APIRouter, HTTPException, Query

from app.services.graph_service import get_graph

router = APIRouter()


@router.get("/graph")
def graph(
    entity: str = Query(...)
):

    try:

        results = get_graph(entity)

        return {
            "entity": entity,
            "connections": results
        }

    except Exception:

        raise HTTPException(
            status_code=503,
            detail="Unable to load graph connections."
        )