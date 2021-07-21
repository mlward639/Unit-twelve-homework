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
    title VARCHAR(60) NOT NULL,
    salary DECIMAL NOT NULL,
	PRIMARY KEY (id),
    department_id INTEGER(11),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id),
    role_id INTEGER(11),
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER(11)
    --FUTURE: FOREIGN KEY (manager_id) REFERENCES employee(id) 
);


