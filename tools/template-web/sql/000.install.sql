/*

CREATE DATABSE demo;
USE demo;

*/

CREATE TABLE users (
    id       INTEGER PRIMARY KEY AUTO_INCREMENT
  , login    VARCHAR(250) NOT NULL
  , password VARCHAR(250) NOT NULL
  , email    VARCHAR(250)
  , name     VARCHAR(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (login, password, name) VALUES ('admin', md5('admin'), 'John Administrator');

