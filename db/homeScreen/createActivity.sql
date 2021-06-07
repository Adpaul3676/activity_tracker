INSERT INTO activities (title, user_id) 
VALUES ($1, $2);
SELECT * FROM activities WHERE user_id = $2;