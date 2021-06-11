UPDATE activities
SET title = $2
WHERE activity_id = $1
RETURNING * FROM activities;