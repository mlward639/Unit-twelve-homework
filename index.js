//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
// says to run npm install console.table-worked and bower install console.table-didnt work


// inquirer prompts

// initial menu question
const menuQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View all Employees by Manager',  'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit'],
        name: 'menu',
    }

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

const addEmployee = () => {
    inquirer    
        .prompt(addEmployeeQuestions)
        .then((res) => {
        //write to db
        console.log(res);
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

const menuChoice = (res) => {
    if (res === 'View All Employees') {
        console.log('chose View All Employees');

    } else if (res === 'View All Employees by Department'){
        console.log('View All Employees by Department')
    } else if (res === 'View All Employees by Manager'){
        console.log('View All Employees by Manager')
    } else if (res === 'Add Employee'){
        console.log('Add Employee');        
        addEmployee();
        //write to db
    } else if (res === 'Remove Employee'){
        console.log('Remove Employee')
    } else if (res === 'Update Employee Role'){
    console.log('Update Employee Role')
    } else if (res === 'Update Employee Manager'){
        console.log('Update Employee Manager')
    } else if (res === 'Add Department'){
        console.log('Add Department');

    } else if (res === 'Remove Department'){
        console.log('Remove Department');

    } else if (res === 'Quit'){
        console.log('Quit');

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