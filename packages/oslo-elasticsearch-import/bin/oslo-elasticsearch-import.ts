import { Command } from 'commander';
import { Orchestrator } from '../lib/Orchestrator';

const program = new Command();

// TODO: add bulk option and option for updates
program
    .usage('converts vocabularies, application profiles to a JSON structure that is added to Elasticsearch')
    .requiredOption('-t, --type <type>', 'type of the input data: "vocabulary" or "applicationProfile"')
    .requiredOption('-f, --file <file>', 'URL that contains the JSON data');

program.on('--help', () => {
    console.log('');
    console.log('This program is created for the Open Standards for Linked Organizations team.');
    console.log('It is used to add vocabularies, application profiles or other documents to our Elasticsearch engine');
    console.log('More options on how to use this program will follow soon');
});

program.parse(process.argv);

const options = program.opts();
const type = options.type;
const fileUrl = options.file;

if (type !== 'applicationProfile' && type !== 'vocabulary') {
    throw new Error(`Please provide a valid type: "vocabulary" or "applicationProfile".`);
}

function processInput(_file: string, _type: string): void {
    // TODO
    const orchestrator = new Orchestrator(_file, _type);
    const result = orchestrator.run();
}

processInput(fileUrl, type);

