// Find a skill and the roles that require it.

MATCH (s:Skill)
WHERE toLower(s.name) = toLower($skill_name)

OPTIONAL MATCH (s)-[:REQUIRED_FOR]->(r:Role)

RETURN
    s.name AS skill,
    s.description AS description,
    collect(DISTINCT r.name) AS roles;