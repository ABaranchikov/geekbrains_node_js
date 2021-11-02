const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -d <path to the directory>, -p <Pattern to search>')
    .option('d', {
        alias: 'dir',
        describe: 'Path to the directory',
        type: 'string',
        demandOption: true,
    })
    .option('p', {
        alias: 'pattern',
        describe: 'Pattern to search',
        type: 'string',
        demandOption: true,
    })
    .argv;

const executionDir = options.dir;
const pattern = options.pattern;

const isFile = (fileName) => fs.statSync(fileName).isFile();
const list = fs.readdirSync(executionDir).map(file => path.join(executionDir, file)).filter(isFile);

const checkPattern = (data, pattern) => {
    const re = new RegExp(pattern, 'g');
    return (data.match(re) || []).length;
}

if (list.length == 0) {
    console.log("No files to read!");
    return;
}

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'Choose a file to read',
        choices: list,
    },
])
    .then(({ fileName }) => {
        const st = fs.readFileSync(fileName, 'utf-8');
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) console.log(err);
            else console.log("Count: " + checkPattern(data, pattern));
        });

    });

