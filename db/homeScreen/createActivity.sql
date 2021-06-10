INSERT INTO activities (title, description, user_id) 
VALUES ($1, $2, $3);
SELECT * FROM activities WHERE user_id = $3;