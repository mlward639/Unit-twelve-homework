-- Create data for tables in employeeDB

USE employeeDB;

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

-- Department table
INSERT INTO department (name)
VALUES ('Accounting');

INSERT INTO department (name)
VALUES ('Sales');

INSERT INTO department (name)
VALUES ('Office');

INSERT INTO department (name)
VALUES ('Warehouse');

-- Role table
-- Accounting
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Head Of Accounting', 90000, 1);

-- Sales
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 90000, 2);

-- Office
INSERT INTO role (title, salary, department_id)
VALUES ('Office Administrator', 50000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Human Resources Representative', 70000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 40000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Supplier Relations', 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Quality Assurance Director', 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Customer Service Specialist', 60000, 3);

-- Warehouse
INSERT INTO role (title, salary, department_id)
VALUES ('Warehouse worker', 40000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Warehouse Foreman', 60000, 4);

-- Employee table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Oscar', 'Martinez', 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Kevin', 'Malone', 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Angela', 'Martin', 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Phyllis', 'Vance', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Jim', 'Halpert', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Stanley', 'Hudson', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Ryan', 'Howard', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Andy', 'Bernard', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Dwight', 'Schrute', 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Pam', 'Beesly', 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Toby', 'Flenderson', 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Erin', 'Hannon', 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Meredith', 'Palmer', 8);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Creed', 'Bratton', 9);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Kelly', 'Kapoor', 10);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Roy', 'Anderson', 11);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Madge', 'NoLastName', 11);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Daryll', 'Philbin', 12);


Managers
Michael Scott - Branch Manager
Dwight schrute - Assistant to the Regional Manager

Nellie Bertram -- Sabre's President Of Special Projects, Branch Manager, & Special Projects Manager

