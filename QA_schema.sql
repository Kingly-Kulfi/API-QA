DROP DATABASE IF EXISTS QA;

CREATE DATABASE QA;

DROP TABLE IF EXISTS questions, answers, answer_photos CASCADE;

-- USE QA;

CREATE TABLE questions (
  question_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL CHECK (question_body <> ''),
  question_date DATE DEFAULT CURRENT_DATE,
  asker_name VARCHAR(60) NOT NULL CHECK (asker_name <> ''),
  question_helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN DEFAULT false
);

CREATE TABLE answers (
  answer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INT NOT NULL REFERENCES questions(question_id),
  body VARCHAR(1000) NOT NULL CHECK (body <> ''),
  date DATE DEFAULT CURRENT_DATE,
  answerer_name VARCHAR(60) NOT NULL CHECK (answerer_name <> ''),
  helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN DEFAULT false
);

CREATE TABLE answer_photos (
  id SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  answer_id INT REFERENCES answers(answer_id),
  url VARCHAR(1000) DEFAULT NULL
);