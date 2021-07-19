DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
	PRIMARY KEY (id)
        --department_id INT to hold reference to department role belongs to
);

CREATE TABLE employee(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
        --role_id INT to hold reference to role employee has
    --manager_id  INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

);




