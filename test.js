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
  });

  connection.query("SELECT * from role", (err, data) => {
    //console.log('dataaa', data)
    const choiceArray = [];
        data.forEach((
            { id, title }) => {
                choiceArray.push({id, title});
            });
            console.log(choiceArray);
        })