//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table'); //havent used yet
// says to run npm install console.table-worked and bower install console.table-didnt work

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

//================================================================  
// Inquirer prompts:

// initial menu question
const menuQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Add Role', 'Quit'],
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

// display all employees. Then go to menu to choose next step.
const viewAllEmployees = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

// display all departments. Then go to menu to choose next step.
const viewAllDepartments = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

// display all roles. Then go to menu to choose next step.
const viewAllRoles = () => {
    //pull table from db with all employees and display in cmd line
    connection.query('SELECT * FROM role', (err, data) => {
        if (err) throw err;
        console.table(data);
        askMenu()
        });
};

// choose which department to add. Then go to menu to choose next step.
const addDeptQuestion = 
    {
        type: 'input',
        message: 'What department do you want to add?',
        name: 'addDeptName'
    }

// use answers from prompts to add selected department to database. Use menu choice to determine next path.
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

// Select the names from the department table
// NEED TO GET DEPT ID AND NAME TOGETHER BUT ONLY DISPLAY NAME
const departmentChoiceArray = [];
connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    //console.log('!!!!!!', data)
    data.forEach(({ id, name }) => {
        departmentChoiceArray.push(id + ". " + name);
    });
}) // NEED TO CAPTURE DEPT ID AS WELL SO CAN SELECT ID BASED ON THE DEPT NAME THEY CHOOSE BELOW ***************

// choose which role to add. then go to menu to choose next step.
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
        type: 'input', 
        message: 'What department is this in?',
        name: 'addRoleSalary'
    },
    {
        type: 'list',
        message: 'Which department does it belong?',
        choices: departmentChoiceArray, 
        name: 'addRoleDeptName' // NEED FUNCTION TO CONVERT THIS TO ID TO PUT IN THE TABLE ***
    }
]

const addRole = () => {
    inquirer
        .prompt(addRoleQuestions)
        .then((res) => {
            //console.log('HERRREE', res.addRoleDeptName);
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

// // Select the titles from the role table
// NEED TO ADD ROLE ID ********
const roleChoiceArray = [];
connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, title }) => {
        roleChoiceArray.push(id + ". " + title);
    });
})

const managerChoiceArray = [];
connection.query("SELECT * FROM employee WHERE manager_id IS NULL", (err, data) => {
    //console.log('***', data)
    if (err) throw err;
    data.forEach(({ id, first_name, last_name }) => {
        managerChoiceArray.push(id + ". " + first_name + " " + last_name);
    })
})

// // Add Employee questions. Then go to menu to choose next step.
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
    // manager ids are 3, 16, and 9. need to figure out how to get the right id for each manager to attach to the name they chose. could just do : if res.managers === michael scott => set manager_id to 16. but thats not gonna be the best way. and also would have to break into first and last name to search...  **************
    /*choices: [array of manager names],*/
 }
]

// if chose add employee, run this function to ask 'Add Employee' questions, write response to db. Use menu choice to determine next path.
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
                for (let i=0; i<roleChoiceArray.length; i++) {
                    if (res.employeeRole === roleChoiceArray[i]) {
                        console.log('HEREEEE');
                        // below only has the title of role bc roleChoiceArray only has title, not id. so have to figure out how to get id from this then put in below ***********
                        /*connection.query(
                            'INSERT INTO employee SET ?',
                                {
                                    role_id: choiceArray.id[i]
                                },
                            (err) => {
                                if (err) throw err;
                                }
                        )
                        console.log('thisss', role_id) */
                    }
                }
                askMenu(); 
            })
        }
//addEmployee()
// /*
//             // connection.query("SELECT * from role", (err, data) => {
//                 // const roleChoices = data.map((role) => {
//                 //     return(
//                 //         {
//                 //     name: role.title,
//                 //     value: role.id,
//                 //         }
//                 //     )}     
//     //     )
//     //     console.log(res);
//     //     })
// */


// list all employees
const employeeChoiceArray = [];
connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    data.forEach(({ id, first_name, last_name }) => {
        employeeChoiceArray.push(id + ". " + first_name + " " + last_name);
    }) 
})

// // choose which employee to update their role and then choose the updated role. Then go to menu and choose next step.
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

// Use answers from prompts to select employee from database and then update their role. Use menu choice to determine next path.
const updateEmployeeRole = () => {
    //update employee role in db
    inquirer  
        .prompt(updateEmployeeRoleQuestion)
        .then((res) => {
            console.log('done') //remove line once rest of fxn working
            connection.query(
                // console.log('res.rolechoic', res.updateEmployeeRoleList),
                // console.log('res.empchoic' + res.updatedEmployeeRole)
                'UPDATE employee SET ? WHERE ?', //how to specify where since we get the employees name. would have to go into employee table to get match the employee name to id, then use that id here ****
                // and have to convert the updated employee role to its employee id and then set it below
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
            // use updateEmployeeRoleList.choice to select the employee from the db. then use updatedEmployeeRole.choice to update their role
            askMenu(); //figure out line this goes on
        }) 
}

/*
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

// */

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
// /*// display all employees, sorted by department. Then go to menu to choose next step.
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