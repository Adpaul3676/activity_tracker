DROP TABLE IF EXISTS days_completed;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS users; 

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(60) NOT NULL,
password VARCHAR(200) NOT NULL
);

CREATE TABLE activities (
activity_id SERIAL PRIMARY KEY,
title VARCHAR(60),
user_id INT REFERENCES users(user_id)
);

CREATE TABLE days_completed (
id SERIAL PRIMARY KEY,
title VARCHAR(60),
activity_id INT REFERENCES activities(activity_id),
user_id INT REFERENCES activities(user_id),
date TIMESTAMP  
);