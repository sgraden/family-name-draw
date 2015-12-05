USE fam;

CREATE TABLE IF NOT EXISTS people (
	id INT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	isPicked BOOLEAN NOT NULL DEFAULT 0
);

INSERT INTO people (name) 
VALUES('Tom');
INSERT INTO people (name) 
VALUES('Mark');
INSERT INTO people (name) 
VALUES('Cassie');
INSERT INTO people (name) 
VALUES('Jenna');