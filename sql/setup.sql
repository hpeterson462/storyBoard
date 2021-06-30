DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  point_one TEXT,
  point_two TEXT,
  point_three TEXT,
  point_four TEXT,
  point_five TEXT,
  point_six TEXT,
  point_seven TEXT
);
