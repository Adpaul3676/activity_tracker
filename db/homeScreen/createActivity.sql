INSERT INTO activities (title, user_id) 
VALUES ($1, $2)
RETURNING *;