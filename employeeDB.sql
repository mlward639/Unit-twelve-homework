DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department(
	deptId INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (deptId)
);

CREATE TABLE role(
	roleId INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
	PRIMARY KEY (roleId),
    department_id INTEGER(11) 
    FOREIGN KEY (department_id) REFERENCES department(deptId)
        --department_id INT to hold reference to department role belongs to
        --HAVE TO ENTER THE DEPT ID AND STUFF IN THE SEEDS.SQL 
);

CREATE TABLE employee(
	empId INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (empId),
    FOREIGN KEY (role_id) REFERENCES role(roleId),
    --FOREIGN KEY (manager_id) REFERENCES role(roleId) --?? would we need another table with manager???

        --role_id INT to hold reference to role employee has
    --manager_id  INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

);

--INSERT INTO role(department_id) SELECT deptId FROM department INNER JOIN role ON role.department_id = department.deptId;

