//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table'); 

// FOREIGN KEY ISSUE ON EMPLDB.SQL ***

// Establish connection
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
    //afterConnection();
  });

/*===================================================================*/
// MENU 

// initial menu question
const menuQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Update Employee Role', 'Add Department', 'Add Role', 'Quit'],
        name: 'menu',
    }

// ask initial menu question and then run that answer through menuChoic() to determine  which path to take
function askMenu() {
    inquirer
        .prompt(menuQuestion)
        .then((res) => {
        menuChoice(res.menu);
        })
        .catch((err) => err ? console.error(err) : null)
};
// start function
askMenu();

/* ================================================================*/
// DISPLAY OPTIONS 

// display all EMPLOYEES. Then go to menu to choose next step.
const viewAllEmployees = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

// display all DEPARTMENTS. Then go to menu to choose next step.
const viewAllDepartments = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

// display all ROLES. Then go to menu to choose next step.
const viewAllRoles = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM role', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

/* ================================================================*/
// ADD OPTIONS


// ADD DEPARTMENT

// choose which DEPARTMENT to add.
const addDeptQuestion = 
    {
        type: 'input',
        message: 'What department do you want to add?',
        name: 'addDeptName'
    }

// use answers from prompts to add new DEPARTMENT to department table. Use menu choice to determine next path.
const addDept = () => {
    inquirer
        .prompt(addDeptQuestion)
        .then((res) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: res.addDeptName,
                },
                (err) => {
                    if (err) throw err;
                },
                askMenu()
            )
        })
        .catch((err) => err ? console.error(err) : null)
};


// ADD ROLE

// Select the names and id's of departments from the department table and push into array to access for prompts and to add to DB in later function
const departmentChoiceArray = [];
connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, name }) => {
        departmentChoiceArray.push(id + ". " + name);
    });
})

// choose which role to add and assign it a salary and department. then go to menu to choose next step.
const addRoleQuestions = [
    {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'addRoleName'
    },
    {
        type: 'input', 
        message: 'What is the salary?',
        name: 'addRoleSalary'
    },
    {
        type: 'list',
        message: 'Which department does it belong?',
        choices: departmentChoiceArray, 
        name: 'addRoleDeptName' 
    }
]

// use answers from prompts to add new ROLE to role table. Use menu choice to determine next path.
const addRole = () => {
    inquirer
        .prompt(addRoleQuestions)
        .then((res) => {
            connection.query('INSERT INTO role SET ?',
                {
                    title: res.addRoleName,
                    salary: res.addRoleSalary,
                    department_id: res.addRoleDeptName.split(". ")[0]
                },
                (err) => {
                    if (err) throw err;
                },
                askMenu()
            )
        })
        .catch((err) => err ? console.error(err) : null)
};


// ADD EMPLOYEE

// Select the titles and ids from the role table
const roleChoiceArray = [];
connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, title }) => {
        roleChoiceArray.push(id + ". " + title);
    });
})

// Select the manager names and ids from the employee table
const managerChoiceArray = [];
connection.query("SELECT * FROM employee WHERE manager_id IS NULL", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, first_name, last_name }) => {
        managerChoiceArray.push(id + ". " + first_name + " " + last_name);
    })
})

// Add Employee questions (new employee's first and last name, role, manager). 
const addEmployeeQuestions = [
{
    type: 'input',
    message: "What is the employee's first name?",
    name: 'employeeFirstName',
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'employeeLastName',
  },
  {
    type: 'list',
    message: "What is the employee's role?",
    name: 'employeeRole',
    choices: roleChoiceArray
    },   
  {
    type: 'list',  
    message: "Who is the employee's manager?",
    name: 'managers',
    choices: managerChoiceArray
 }
]

// use answers from prompts to add new EMPLOYEE to role table. Use menu choice to determine next path.
const addEmployee = () => {     
        inquirer    
            .prompt(addEmployeeQuestions)
            .then((res) => {
                console.log('pls') 
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: res.employeeFirstName,
                        last_name: res.employeeLastName,
                        role_id: res.employeeRole.split(". ")[0],
                        manager_id: res.managers.split(". ")[0]
                    },
                    (err) => {
                        if (err) throw err;
                    },
                )
                askMenu(); 
            })
        }

/* ================================================================*/
// UPDATE OPTIONS


// UPDATE EMPLOYEE ROLE

// list all employees
const employeeChoiceArray = [];
connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, first_name, last_name }) => {
        employeeChoiceArray.push(id + ". " + first_name + " " + last_name);
    }) 
})

// choose which employee to update their role and then choose the updated role. 
const updateEmployeeRoleQuestion = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        choices: employeeChoiceArray,
        name: 'chooseEmployee'
    },
    {
        type: 'list',
        message: "What is the employee's updated role?",
        name: 'updatedEmployeeRole',
        choices: roleChoiceArray
      }
] 

// Use answers from prompts to select employee from database (employee table) and then update their role. Use menu choice to determine next path.
const updateEmployeeRole = () => {
    inquirer  
        .prompt(updateEmployeeRoleQuestion)
        .then((res) => {
            console.log('done') 
            connection.query(
                'UPDATE employee SET ? WHERE ?', 
                [
                    {
                        role_id: res.updatedEmployeeRole.split(". ")[0],
                    },
                    {
                        id: res.chooseEmployee.split(". ")[0], 
                    },
                ],
                (error) => {
                    if (error) throw err;
                  }
            )
            askMenu(); 
        }) 
}

const menuChoice = (res) => {
    if (res === 'View All Employees') {
        console.log('View All Employees');
        viewAllEmployees();
    } else if (res === 'View All Departments') {
        console.log('View All Departments');
        viewAllDepartments();
    } else if (res === 'View All Roles') {
        console.log('View All Roles');
        viewAllRoles();
    } else if (res === 'Add Employee'){
        console.log('Add Employee');        
        addEmployee();
    } else if (res === 'Add Department'){
        console.log('Add Department');
        addDept();
    } else if (res === 'Add Role') {
        console.log('Add Role');
        addRole();
    } else if (res === 'Update Employee Role'){
        console.log('Update Employee Role');
        updateEmployeeRole();
    } else if (res === 'Quit'){
        console.log('Quit');
        connection.end();
        return;
    }
}

/* FUTURE DEV (BONUS)
const menuQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Add Role', 'Quit'],
        name: 'menu',
    }
// // Choose employee to remove. Then go to menu to choose next step.
// const removeEmployeeQuestion = [
//     {
//         type: 'list',
//         message: 'Which employee would you like to remove?',
//         choices: ['A', 'B', 'C'], //add the array of employee names in db
//         name: 'employeeRemoveList',
//     },
//     {
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
//         name: 'menu',
//     }
// ]
// // remove an Employee from the db. Use menu choice to determine next path.
// const removeEmployee = () => {
//     //remove employee from db
//     inquirer
//         .prompt(removeEmployeeQuestion)
//         .then((res) => { 
//             console.log(res);
//             //match removeEmployeeQuestion.choice with name in db and remove
//             menuChoice(res.menu); 
//         })
//     }




// // choose which employee to update their manager and then choose the updated manager. Then go to menu and choose next step.
// const updateEmployeeMgrQuestion = [
//     {
//         type: 'list',
//         message: "Which employee's manager would you like to update?",
//         choices: ['A', 'B', 'C'], //add the array of employee names in db
//         name: 'updateEmployeeMgrList'
//     },
//     {
//         type: 'list',
//         message: "Who is the employee's updated manager?",
//         name: 'updatedEmployeeMgr',
//         choices: ['A', 'B', 'C'], //add the array of employee managers in db
//       },
//       {
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
//         name: 'menu',
//     }
// ]

// // Use answers from prompts to select employee from database and then update their manager. Use menu choice to determine next path.
// const updateEmployeeMgr = () => {
//     //update employee manager in db. then choose what to do next.
//     inquirer  
//         .prompt(updateEmployeeMgrQuestion)
//         .then((res) => {
//             console.log(res);
//             // use updateEmployeeMgrList.choice to select the employee from the db. then use updatedEmployeeMgr.choice to update their manager
//             menuChoice(res.menu); 
//         }) 
// }

// // Choose which department to remove
// const removeDeptQuestion = [
//     {
//         type: 'list',
//         message: 'Which department do you want to remove?',
//         choices: ['A', 'B', 'C'], //insert list of departments from db
//         name: removeDeptList
//     },
//     {
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
//         name: 'menu',
//     }
// ]

// // Use answers from prompts to select department from database to delete. Then go to menu to choose next step.
// const removeDept = () => {
//     //remove selected dept in db. then choose what to do next.
//     inquirer  
//     .prompt(removeDeptQuestion)
//     .then((res) => {
//         console.log(res);
//         // use removeDeptList.choice to select the dept from the db and delete
//         menuChoice(res.menu); 
//     }) 
// }

// 

const menuChoice = (res) => {
    if (res === 'View All Employees') {
        console.log('chose View All Employees');
        viewAllEmployees();
    } else if (res === 'View All Departments') {
        console.log('chose View All Departments');
        viewAllDepartments();
    } else if (res === 'View All Roles') {
        console.log('chose View All Roles');
        viewAllRoles();
    } else if (res === 'View All Employees by Department'){
        console.log('View All Employees by Department');
        viewAllEmployeesByDept();
    } else if (res === 'View All Employees by Manager'){
        console.log('View All Employees by Manager');
        viewAllEmployeesByMgr();
    } else if (res === 'Add Employee'){
        console.log('Add Employee');        
        addEmployee();
        //write to db
    } else if (res === 'Remove Employee'){
        console.log('Remove Employee');
        removeEmployee();
        //write to db
    } else if (res === 'Update Employee Role'){
    console.log('Update Employee Role');
    updateEmployeeRole();
    } else if (res === 'Update Employee Manager'){
        console.log('Update Employee Manager');
        updateEmployeeMgr();
    } else if (res === 'Add Department'){
        console.log('Add Department');
        addDept();
        //Dont get??? arent there already set deparatments??? if you remove a department, i guess you remove all the employees in it and display the rest. but how would you add a department if they are all already showing?
    } else if (res === 'Remove Department'){
        console.log('Remove Department');
        removeDept();
    } else if (res === 'Add Role') {
        console.log('Add Role');
        addRole();
    } else if (res === 'Quit'){
        console.log('Quit');
        connection.end();
        return;
    }
}
// display all employees, sorted by department. Then go to menu to choose next step.
// // const viewAllEmployeesByDept = () => {
// //     //pull table from db with all employees and arrange/sort by department, display in cmd line
// //     inquirer    
// //         .prompt(menuQuestion)
// //         .then((res) => {
// //             //write to db
// //             console.log(res);
// //             menuChoice(res.menu); 
// //         })
// // }
// /*
// // display all employees, sorted by manager. Then go to menu to choose next step.
// const viewAllEmployeesByMgr = () => {
//     //pull table from db with all employees and arrange/sort by manager, display in cmd line
//     inquirer    
//     .prompt(menuQuestion)
//     .then((res) => {
//         //write to db
//         console.log(res);
//         menuChoice(res.menu); 
//     })
// } */