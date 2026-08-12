from app.database import driver


def run_query(query: str, parameters: dict | None = None):
    """
    Execute a parameterized Cypher query against CognoDB.

    parameters are passed separately from the query,
    preventing string-concatenated Cypher.
    """
    with driver.session() as session:
        result = session.run(
            query,
            parameters or {}
        )

        return [record.data() for record in result]


def get_all_entities():
    """Return a small mixed list of CareerGraph entities."""

    query = """
    MATCH (n)
    RETURN
        elementId(n) AS id,
        labels(n)[0] AS type,
        n.name AS name,
        n.description AS description
    ORDER BY n.name
    LIMIT 100
    """

    return run_query(query)


def search_entities(search: str, entity_type: str | None = None):
    """
    Search Skills, Roles, Companies and Projects.

    Uses parameters rather than building Cypher with string concatenation.
    """

    if entity_type:
        query = """
        MATCH (n)
        WHERE $entity_type IN labels(n)
          AND toLower(n.name) CONTAINS toLower($search)
        RETURN
            elementId(n) AS id,
            labels(n)[0] AS type,
            n.name AS name,
            n.description AS description
        ORDER BY n.name
        LIMIT 50
        """
    else:
        query = """
        MATCH (n)
        WHERE toLower(n.name) CONTAINS toLower($search)
        RETURN
            elementId(n) AS id,
            labels(n)[0] AS type,
            n.name AS name,
            n.description AS description
        ORDER BY n.name
        LIMIT 50
        """

    parameters = {
        "search": search,
        "entity_type": entity_type,
    }

    return run_query(query, parameters)


def get_skill(skill_name: str):
    """
    Find a skill and its directly connected career roles.
    """

    query = """
    MATCH (s:Skill)
    WHERE toLower(s.name) = toLower($skill_name)

    OPTIONAL MATCH (s)-[:REQUIRED_FOR]->(r:Role)

    RETURN
        s.name AS skill,
        s.description AS description,
        collect(DISTINCT r.name) AS roles
    """

    return run_query(
        query,
        {"skill_name": skill_name}
    )


def get_matches(skill_names: list[str]):
    """
    Find career roles connected to the selected skills.

    The role's match percentage is calculated from
    how many selected skills it requires.
    """

    query = """
    MATCH (r:Role)-[:REQUIRES]->(s:Skill)
    WITH r, collect(DISTINCT s.name) AS all_required_skills
    
    WITH r, all_required_skills, 
         [skill IN all_required_skills WHERE skill IN $skills] AS matching_skills
         
    WHERE size(matching_skills) > 0
    
    WITH r, all_required_skills, matching_skills,
         [skill IN all_required_skills WHERE NOT skill IN $skills] AS missing_skills
         
    OPTIONAL MATCH (r)-[:OFFERED_BY]->(c:Company)
         
    RETURN
        r.name AS role,
        r.description AS description,
        matching_skills,
        missing_skills,
        collect(DISTINCT c.name) AS connected_companies,
        round(100.0 * size(matching_skills) / size(all_required_skills)) AS match_percentage
        
    ORDER BY match_percentage DESC
    LIMIT 20
    """

    return run_query(
        query,
        {"skills": skill_names}
    )


def get_graph(entity_name: str):
    """
    Return a two-hop neighborhood around an entity.

    This demonstrates the graph traversal capability.
    """

    query = """
    MATCH (start)
    WHERE toLower(start.name) = toLower($entity_name)

    MATCH path = (start)-[*1..2]-(connected)

    RETURN DISTINCT
        elementId(start) AS source_id,
        labels(start)[0] AS source_type,
        start.name AS source_name,

        elementId(connected) AS target_id,
        labels(connected)[0] AS target_type,
        connected.name AS target_name

    LIMIT 100
    """

    return run_query(
        query,
        {"entity_name": entity_name}
    )