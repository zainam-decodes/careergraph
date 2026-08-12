from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health
from app.routes import explore
from app.routes import skills
from app.routes import matches
from app.routes import graph


app = FastAPI(
    title="CareerGraph API",
    description="Graph-powered career exploration API using CognoDB",
    version="1.0.0",
)


# Allow the frontend to communicate with FastAPI.
# During development, allow the local frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes.
app.include_router(
    health.router,
    prefix="/api"
)

app.include_router(
    explore.router,
    prefix="/api"
)

app.include_router(
    skills.router,
    prefix="/api"
)

app.include_router(
    matches.router,
    prefix="/api"
)

app.include_router(
    graph.router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "name": "CareerGraph API",
        "status": "running"
    }