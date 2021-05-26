DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS connection;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(60) NOT NULL,
password VARCHAR(200) NOT NULL
);

CREATE TABLE activities (
activity_id SERIAL PRIMARY KEY,
title VARCHAR	(60),
user_id INT REFERENCES users(user_id)
);

CREATE TABLE days_completed (
id SERIAL PRIMARY KEY,
activity_id INT REFERENCES activities(activity_id)
date TIMESTAMP
);