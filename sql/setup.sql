DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS project CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE project (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  point_one TEXT,
  point_two TEXT,
  point_three TEXT,
  point_four TEXT,
  point_five TEXT,
  point_six TEXT,
  point_seven TEXT,
  owner_id BIGINT NOT NULL REFERENCES users(id),
);
