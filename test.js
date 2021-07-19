//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table'); //havent used yet
// says to run npm install console.table-worked and bower install console.table-didnt work

// 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Root1234!',
  database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    afterConnection();
  });

// inquirer prompts

// initial menu question
const menuQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }


// MAKE SURE IN EACH DB THAT IS BEING MANIPULATED, YOU CREATE A COPY FIRST AND MANIPULATE THAT SO YOU DONT MESS UP THE MAIN DB 
// ==============================================

// ask initial menu question and then write response to db. Go to menu once complete to choose next step.
function askMenu() {
    inquirer
        .prompt(menuQuestion)
        .then((res) => {
        menuChoice(res.menu);
        })
        .catch((err) => err ? console.error(err) : null)
};
askMenu();