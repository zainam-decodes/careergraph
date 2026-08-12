// Search across CareerGraph entities.

MATCH (n)
WHERE toLower(n.name) CONTAINS toLower($search)

RETURN
    elementId(n) AS id,
    labels(n)[0] AS type,
    n.name AS name,
    n.description AS description

ORDER BY n.name

LIMIT 50;