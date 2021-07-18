DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    --department_id INT to hold reference to department role belongs to
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    --role_id INT to hold reference to role employee has
    --manager_id  INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

);


--INSERT INTO songs (title, artist, genre)
--VALUES ("Title1", "artist1", "pop");

