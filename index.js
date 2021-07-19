//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
// says to run npm install console.table-worked and bower install console.table-didnt work

// 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234Root!',
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
          /* const initialHTML = pageTemplate.createInitialHTML(res);
          //console.log("TEST", pageTemplate.createInitialHTML(res));
            writeFileAsync('./output/teamFile.html', initialHTML); 
          //console.log('res.menu', res.menu) */
          menuChoice(res.menu);
        })
        .catch((err) => err ? console.error(err) : null)
};
askMenu();

// display all employees. Then go to menu to choose next step.
const viewAllEmployees = () => {
    //pull table from db with all employees and display in cmd line
    inquirer    
        .prompt(menuQuestion)
        .then((res) => {
            //write to db
        afterConnection = () => {   
            connection.query('SELECT * FROM employee', (err, res) => {
                if (err) throw err;
                console.log(res);
                connection.end();
              });
            };
            console.log(res);
            menuChoice(res.menu); 
        })
}

// display all employees, sorted by department. Then go to menu to choose next step.
const viewAllEmployeesByDept = () => {
    //pull table from db with all employees and arrange/sort by department, display in cmd line
    inquirer    
    .prompt(menuQuestion)
    .then((res) => {
        //write to db
        console.log(res);
        menuChoice(res.menu); 
    })
}

// display all employees, sorted by manager. Then go to menu to choose next step.
const viewAllEmployeesByMgr = () => {
    //pull table from db with all employees and arrange/sort by manager, display in cmd line
    inquirer    
    .prompt(menuQuestion)
    .then((res) => {
        //write to db
        console.log(res);
        menuChoice(res.menu); 
    })
}

// Add Employee questions. Then go to menu to choose next step.
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
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
  },
  {
    type: 'list',  
    message: "Who is the employee's manager?",
    name: 'managers',
    choices: ['A', 'B', 'C']
    /*choices: [array of manager names],*/
  },
  {    
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'],
    name: 'menu',
}
]

// if chose add employee, run this function to ask 'Add Employee' questions, write response to db. Use menu choice to determine next path.
const addEmployee = () => {
    inquirer    
        .prompt(addEmployeeQuestions)
        .then((res) => {
        //write to db
        console.log(res);
        menuChoice(res.menu); 
        })
}

// Choose employee to remove. Then go to menu to choose next step.
const removeEmployeeQuestion = [
    {
        type: 'list',
        message: 'Which employee would you like to remove?',
        choices: ['A', 'B', 'C'], //add the array of employee names in db
        name: 'employeeRemoveList',
    },
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }
]
// remove an Employee from the db. Use menu choice to determine next path.
const removeEmployee = () => {
    //remove employee from db
    inquirer
        .prompt(removeEmployeeQuestion)
        .then((res) => { 
            console.log(res);
            //match removeEmployeeQuestion.choice with name in db and remove
            menuChoice(res.menu); 
        })
    }

// choose which employee to update their role and then choose the updated role. Then go to menu and choose next step.
const updateEmployeeRoleQuestion = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        choices: ['A', 'B', 'C'], //add the array of employee names in db
        name: 'updateEmployeeRoleList'
    },
    {
        type: 'list',
        message: "What is the employee's updated role?",
        name: 'updatedEmployeeRole',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
      },
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }
]

// Use answers from prompts to select employee from database and then update their role. Use menu choice to determine next path.
const updateEmployeeRole = () => {
    //update employee role in db
    inquirer  
        .prompt(updateEmployeeRoleQuestion)
        .then((res) => {
            console.log(res);
            // use updateEmployeeRoleList.choice to select the employee from the db. then use updatedEmployeeRole.choice to update their role
            menuChoice(res.menu); 
        }) 
}

/*function askEngineerQuestions(){
    inquirer
      .prompt(engineerQuestions)
      .then((res) => {
        const engineerCardHTML = pageTemplate.createEngineerCardHTML(res);
        fs.appendFile('./output/teamFile.html', engineerCardHTML, (err) => err ? console.error(err) : null);
        menuChoices(res.menu); 
      })
  } */

// choose which employee to update their manager and then choose the updated manager. Then go to menu and choose next step.
const updateEmployeeMgrQuestion = [
    {
        type: 'list',
        message: "Which employee's manager would you like to update?",
        choices: ['A', 'B', 'C'], //add the array of employee names in db
        name: 'updateEmployeeMgrList'
    },
    {
        type: 'list',
        message: "Who is the employee's updated manager?",
        name: 'updatedEmployeeMgr',
        choices: ['A', 'B', 'C'], //add the array of employee managers in db
      },
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }
]

// Use answers from prompts to select employee from database and then update their manager. Use menu choice to determine next path.
const updateEmployeeMgr = () => {
    //update employee manager in db. then choose what to do next.
    inquirer  
        .prompt(updateEmployeeMgrQuestion)
        .then((res) => {
            console.log(res);
            // use updateEmployeeMgrList.choice to select the employee from the db. then use updatedEmployeeMgr.choice to update their manager
            menuChoice(res.menu); 
        }) 
}

// choose which department to add. Then go to menu to choose next step.
const addDeptQuestion = [
    {
    },
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }
]

// use answers from prompts to add selected department to database. Use menu choice to determine next path.
const addDept = () => {
    inquirer
        .prompt(addDeptQuestion)
        .then((res) => {
            console.log(res);
            // idk
            menuChoice(res.menu); 
        }) 
}

// Choose which department to remove
const removeDeptQuestion = [
    {
        type: 'list',
        message: 'Which department do you want to remove?',
        choices: ['A', 'B', 'C'], //insert list of departments from db
        name: removeDeptList
    },
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }
]

// Use answers from prompts to select department from database to delete. Then go to menu to choose next step.
const removeDept = () => {
    //remove selected dept in db. then choose what to do next.
    inquirer  
    .prompt(removeDeptQuestion)
    .then((res) => {
        console.log(res);
        // use removeDeptList.choice to select the dept from the db and delete
        menuChoice(res.menu); 
    }) 
}

    inquirer    
        .prompt(menuQuestion)
        .then((res) => {
            //write to db
            console.log(res);
            menuChoice(res.menu); 
        })

        inquirer    
        .prompt(menuQuestion)
        .then((res) => {
            //write to db
            console.log(res);
            menuChoice(res.menu); 
        })
const menuChoice = (res) => {
    if (res === 'View All Employees') {
        console.log('chose View All Employees');
        viewAllEmployees();
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
    } else if (res === 'Quit'){
        console.log('Quit');
        return;
    }
}
/*function menuChoices(res) {
    if (res === 'engineer') {
        console.log('chose engineer')
        askEngineerQuestions();
    } else if (res === 'intern') {
        console.log('chose intern')
        askInternQuestions();
    } else if (res === 'team is complete') {
        appendEndHTML();
        return console.log('Team is complete. Generating HTML.');
    }
} */