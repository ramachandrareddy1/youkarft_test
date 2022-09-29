create table users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	user_name VARCHAR(50),
	email VARCHAR(50) NOT NULL  UNIQUE,
	password VARCHAR(20) NOT NULL
);