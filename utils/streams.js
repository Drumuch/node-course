const cla       = require('command-line-args');
const fs        = require('fs');
const jsdom     = require('jsdom');
const axios     = require('axios');
const csvToJson = require('convert-csv-to-json');
const clu       = require('command-line-usage');
const { JSDOM } = jsdom;


const optionDefinitions = [
    { name: 'action', alias: 'a', type: String },
    { name: 'file', alias: 'f', type: String },
    { name: 'help', alias: 'h', type: Boolean }
];

const dom = new JSDOM(``, {
    url: "https://epa.ms/nodejs18-hw3-css",
    contentType: "text/html",
    includeNodeLocations: true,
    runScripts: "dangerously"
});

try {
    const options = cla(optionDefinitions);
    if (options.help) {
        const sections = [
            {
                header: '--------- HELP ---------',
                content: 'Usage: node [options] [ -e script | script.js | - ] [arguments]'
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'help',
                        description: 'Display all possible commands',
                        alias: 'h',
                        type: String,
                    },
                    {
                        name: 'action',
                        description: `One of available actions which will execute:
                                        - reverse
                                        - transform
                                        - outputFile ( -f or --file flag required )
                                        - convertFromFile ( -f or --file flag required )
                                        - convertToFile ( -f or --file flag required )`,
                        alias: 'a',
                        type: String,
                    },
                    {
                        name: 'file',
                        description: 'Path to the file',
                        alias: 'f',
                        type: String,
                    }
                ]
            }
        ];
        const usage = clu(sections);
        process.stdout.write(usage);
        return;
    }
    switch (options.action) {
        case 'reverse':
            reverse();
            break;
        case 'transform':
            transform();
            break;
        case 'outputFile':
            if (pathIsValid(options.file)) {
                outputFile(options.file);
            }
            break;
        case 'convertFromFile':
            if (pathIsValid(options.file)) {
                convertFromFile(options.file);
            }
            break;
        case 'convertToFile':
            if (pathIsValid(options.file)) {
                convertToFile(options.file);
            }
            break;
        default:
            break;
    }
} catch (e) {
    const sections = [
        {
            header: 'An error',
            content: 'Probably you entered invalid parameters try -h or --help to check valid commands'
        }
    ];
    const usage = clu(sections);
    console.log(usage);
}

function reverse() {
    process.stdin.on('data', (buf) => process.stdout.write(buf.toString().split('').reverse().join('').trim()));
}

function transform() {
    process.stdin.on('data', (buf) => process.stdout.write(buf.toString().toUpperCase()));
}
function outputFile(filePath = validateFilePath()) {
    fs.createReadStream(filePath).pipe(process.stdout);
}
function convertFromFile(filePath) {
    process.stdout.write(JSON.stringify(csvToJson.formatValueByType().getJsonFromCsv(filePath)));
}
function convertToFile(filePath) {
    const filename = filePath.split('.');
    filename.pop();
    filename.push('json');
    csvToJson.generateJsonFileFromCsv(filePath, filename.join('.'));
}

function pathIsValid(path) {
    if (!path) {
        const sections = [
            {
                header: 'An error',
                content: 'Probably you forgot to enter file name try -f fileName or --file=fileName'
            }
        ];
        const usage = clu(sections);
        console.log(usage);
        return false;
    }
    if (!fs.existsSync(path)) {
        const sections = [
            {
                header: 'An error',
                content: 'Probably you entered invalid file name or path to it.'
            }
        ];
        const usage = clu(sections);
        console.log(usage);
        return false;
    }
    return true;
}
