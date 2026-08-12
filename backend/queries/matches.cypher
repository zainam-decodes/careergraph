// Find career roles matching the user's selected skills.

MATCH (r:Role)-[:REQUIRES]->(s:Skill)

WHERE s.name IN $skills

WITH
    r,
    collect(DISTINCT s.name) AS matching_skills,
    size($skills) AS selected_count

RETURN
    r.name AS role,
    r.description AS description,
    matching_skills,
    round(
        100.0 * size(matching_skills) / selected_count
    ) AS match_percentage

ORDER BY match_percentage DESC

LIMIT 20;