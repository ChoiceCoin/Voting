/*Enter this code into a SQL Terminal, logged in as a root user*/  

CREATE DATABASE voting;
USE DATABASE voting;
CREATE table accounts 
( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
 name VARCHAR(100) NOT NULL, 
 DL VARCHAR(300) NOT NULL, 
 SS VARCHAR(400) NOT NULL 
);
CREATE table corporate
(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
Stake INT(6),
Secret VARCHAR(500) NOT NULL
);
