// Explore up to two relationship hops from an entity.

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

LIMIT 100;