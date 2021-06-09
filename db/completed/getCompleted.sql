SELECT * FROM days_completed
WHERE activity_id = $1
ORDER BY date ASC;