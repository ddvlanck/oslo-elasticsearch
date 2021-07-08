import { Command } from 'commander';
import { configuration } from '../lib/Configuration';
import { Orchestrator } from '../lib/Orchestrator';

const program = new Command();

program.usage('CLI tool to query the OSLO Knowledge Graph')
  .requiredOption('-k, --keys <words...>', 'the word to be searched in the OSLO Knowledge Graph')
  .option('--applicationProfile', 'query application profiles in the OSLO Knowledge Graph')
  .option('--vocabulary', 'query vocabularies in the OSLO Knowledge Graph');

program.on('--help', () => {
  console.log('');
  console.log('This program is created for the Open Standards for Linked Organizations team.');
  console.log('It can be used to query the OSLO Knowledge graph');
});

program.parse(process.argv);

const options = program.opts();
configuration.processInputOptions(options);

(async() => {
  const orchestrator = new Orchestrator();
  const stream = await orchestrator.run();
  stream.pipe(process.stdout);
})().catch(error => console.error(error.stack));
