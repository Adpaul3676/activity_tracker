DELETE FROM days_completed
WHERE activity_id = ($1);

DELETE FROM activities
WHERE activity_id = ($1);

SELECT * FROM activities;