create table messages (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	text VARCHAR(50) NOT NULL,
	date DATE,
	from_user BIGINT REFERENCES users(id) ,
    to_usr BIGINT REFERENCES users(id),
	is_sent BOOLEAN
);