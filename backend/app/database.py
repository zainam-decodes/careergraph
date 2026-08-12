from neo4j import GraphDatabase
from app.config import (
    COGNODB_URI,
    COGNODB_USERNAME,
    COGNODB_PASSWORD,
)

# Create one reusable Neo4j driver.
# CognoDB supports the official Neo4j driver.
driver = GraphDatabase.driver(
    COGNODB_URI,
    auth=(COGNODB_USERNAME, COGNODB_PASSWORD),
)


def verify_connection():
    """Check whether the backend can reach CognoDB."""
    driver.verify_connectivity()
    return True


def close_connection():
    """Close the database driver."""
    driver.close()