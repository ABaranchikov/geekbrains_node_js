const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
     .usage('Usage: -d <path to the directory>')
     .option('d', {
         alias: 'path',       
         describe: 'Path to the directory',
         type: 'string',
         demandOption: true,
    }).argv;

//const executionDir = process.cwd();
const executionDir = options.d;
console.log(executionDir);

const isDir = (fileName) => fs.statSync(fileName).isDirectory();
const listDir = (dir) => fs.readdirSync(dir).map(file => path.join(dir, file)).filter(isDir);

const selectDir = async (list) => {
    const answer = await inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Choose a directory to read',
            choices: list,
        },
    ]);
    const nextStep = listDir(answer.fileName);
    if (nextStep.length > 0) {
        selectDir(nextStep);
    } else {
        console.log("There are no more directories in this folder");
    }
    return answer.fileName;

}

selectDir(listDir(executionDir));