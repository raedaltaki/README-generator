// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMd = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type:'input',
        name: 'title',
        message: 'What is the project title ?',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter a project title!');
              return false;
            }
        }
    },
    {
        type:'input',
        name: 'description',
        message: 'Enter the project description ?',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter a project description!');
              return false;
            }
        }
    },
    {
        type:'editor',
        name: 'installation',
        message: 'Enter the installation steps',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter installation steps!');
              return false;
            }
        }
    },
    {
        type:'editor',
        name: 'usage',
        message: 'Enter the usage information',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter usage information!');
              return false;
            }
        }
    },
    {
        type:'input',
        name: 'contribution',
        message: 'Enter the contribution guidelines',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter contribution guidelines!');
              return false;
            }
        }
    },
    {
        type:'input',
        name: 'test',
        message: 'Enter the test instructions',
        validate: input => 
        {
            if (input) 
            {
              return true;
            } else {
              console.log('You need to enter test instructions!');
              return false;
            }
        }
    },
    {
        type:'list',
        name: 'license',
        message: 'Choose license type',
        choices: ['GNU AGPLv3','GNU GPLv3','GNU LGPLv3','Mozilla Public License 2.0','Apache License 2.0','MIT License','Boost Software License 1.0','The Unlicense'],
        pageSize: 5
    },
    {
        type:'input',
        name: 'username',
        message: 'What is your GitHub username ?',
        validate: input => 
        {
            if (input) {
              return true;
            } else {
              console.log('You need to enter a GitHub username!');
              return false;
            }
        }
    },
    {
        type:'input',
        name: 'email',
        message: 'What is your Email address ?',
        validate: input => 
        {
            if (input) {
              return true;
            } else {
              console.log('You need to enter an Email address!');
              return false;
            }
        }
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) 
{
    return new Promise((resolve,reject) =>
    {
        fs.writeFile(`./dist/${fileName}.md`,data,err=>
        { 
            if(err)
            {
                reject(err);
                return;
            }
            resolve(
            {
                ok: true,
                message: 'File created!'
            });
        }
    )}
)}

// TODO: Create a function to initialize app
function init() 
{
    inquirer.prompt(questions)
    .then(data => 
        {
            return generateMd(data);
        })
    .then(answer => 
        {
            return writeToFile('README',answer)
        })
    .then(writeFileResponse =>
        {
            console.log(writeFileResponse);
        })
    .catch(err => console.log(err));
}

// Function call to initialize app
init();
