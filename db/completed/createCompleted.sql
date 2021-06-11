INSERT INTO days_completed (activity_id, title, user_id, date)
VALUES ($1, $2, $3, $4)
RETURNING *;