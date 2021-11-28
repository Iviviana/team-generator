//node modules
const inquirer=require('inquirer');
const fs=require('fs');
const path =require('path');
//link to html creator
const generateHTML=require('./src/generatehtml');
//team members
const Engineer=require('./lib/engineer');
const Manager=require('./lib/manager');
const Intern=require('./lib/intern');
//team members array
const teamMembers=[];

let placeholder= {
    type:'',
    name:'',
    message:'',
    validate: answer=>{
        if(answer!=="") {
            return true;
        } else {
            console.log("Please enter the information required.");
            return false;
        }
    }
}

const createManager=()=> {
    console.log('Add your teams manager!');
    return inquirer.prompt([ 
        /* Pass your questions in here */
        {
            type:'input',
            name:'managerName',
            message:'What is the Manager\'s name?',
            validate: answer=>{
                if(answer!=="") {
                    return true;
                } else {
                    console.log("Please enter the Manager\'s name!");
                    return false;
                }
            }
        },

        {
            type:'input',
            name:'managerId',
            message:'Please provide the Manager\'s ID?',
            validate: answer=>{
                const yesNumb=answer.match(
                    /^\d+$/
                );
                if (yesNumb) {
                    return true;
                } else {
                    return "Please enter a numeric value."
                }
            }
        },

        {
            type:'input',
            name:'managerEmail',
            message:'Please provide the Manager\'s email?',
            validate: answer=>{
                const yesEmail=answer.match(
                    /\S+@\S+\.\S+/
                );
                if (yesEmail) {
                    return true;
                } else {
                    return "Please enter a valid email address."
                }
            }
        },

        {
            type:'input',
            name:'number',
            message:'What is the manager\'s office number?',
            validate: answer=>{
                const yesPhone=answer.match(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                );
                if(yesPhone) {
                    return true;
                } else {
                    return "Please enter a valid phone number."
                }
            }
        }


    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        const newManager=new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.number);
        teamMembers.push(newManager);
        console.log(manager);
        
    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        throw error
        };
    });
};

const createTeam=()=> {
    console.log('Build your team!');
    return inquirer.prompt([
        {
            type:'list',
            name:'role',
            message:'Which team member would you like to add next?',
            choices:[
                "Engineer",
                "Intern",
            ]
        },
        {
            type:'input',
            name:'name',
            message:'What is the employee\'s name?',
            validate: answer=>{
                if(answer!=="") {
                    return true;
                } else {
                    console.log("Please enter your employee\'s name.");
                    return false;
                }
            }
        },
        {
            type:'input',
            name:'id',
            message:'please provide the employee\'s ID.',
            validate: answer=>{
                const yesNumb=answer.match(
                    /^\d+$/
                );
                if (yesNumb) {
                    return true;
                } else {
                    return "Please enter a numeric value."
                }
            }
        },
        {
            type:'input',
            name:'email',
            message:'Please enter the employee\'s email.',
            validate: answer=>{
                const yesEmail=answer.match(
                    /\S+@\S+\.\S+/
                );
                if (yesEmail) {
                    return true;
                } else {
                    return "Please enter a valid email address."
                }
            }
        },
        {
            type:'input',
            name:'github',
            message:'Please provide the engineer\'s github username.',
            when:(input)=>input.role==="Engineer",
            validate: answer=>{
                if(answer!=="") {
                    return true;
                } else {
                    console.log("Please enter the employee\'s github username.");
                    return false;
                }
            }
        },
        {
            type:'input',
            name:'school',
            message:'Please provide your Intern\'s current school.',
            when:(input)=>input.role==="Intern",
            validate: answer=>{
                if(answer!=="") {
                    return true;
                } else {
                    console.log("Please enter your intern\'s current school.");
                    return false;
                }
            }
        },
        {
            type:'confirm',
            name:'confirmCreateTeam',
            message:'Would you like to add more team members?',
            default:false
        }
    ]).then(userChoice => {
        let {name, id, email, role, github, school, confirmCreateTeam}=userChoice;
        let employee;

        if(role==="Engineer") {
            employee=new Engineer(name,id,email,github);
            console.log(employee);
        } else if(role==="Intern") {
            employee=new Intern(name,id,email,school);
            console.log(employee);
        };

        teamMembers.push(employee);

        if(confirmCreateTeam) {
            return createTeam(teamMembers);
        } else {
            return teamMembers;
        }
    }).catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        throw error
        } else {
        // Something else went wrong
        console.log('Something went wrong');
        }
    });
};

const writeFile=data=> {
    fs.writeFile('./dist/index.html',data,error => {
        //if there is an error
        if(error) {
            throw error;
            
        } else {
            console.log("Team profile has been created!")
        }
    })
};

createManager()
    .then(createTeam)
    .then(teamMembers=> {
        return generateHTML(teamMembers);
    })
    .then(pageHTML=> {
        return writeFile(pageHTML);
    })
    .catch(error=> {
        console.log(error);
    });

