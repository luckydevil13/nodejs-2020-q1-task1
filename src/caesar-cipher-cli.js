const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const { program } = require('commander');
const { validateAction, validateShift, validateInputFile, validateOutputFile } = require('./modules/paramsValidator');
const { caesarTransform } = require('./modules/caesarTransform');

program
    .requiredOption('-a, --action <type> (required)', 'an action encode/decode')
    .requiredOption('-s, --shift <number> (required)', 'shift number')
    .option('-i, --input <filename>', 'an input file')
    .option('-o, --output <filename>', 'an output file');

program.parse(process.argv);

validateAction(program.action);
validateShift(program.shift);
if (program.input) {
    validateInputFile(program.input);
}
if (program.output) {
    validateOutputFile(program.output);
}

const pipelineAsync = promisify(pipeline);

(async function() {
    try {
        await pipelineAsync(
            program.input ? fs.createReadStream(program.input) : process.stdin,
            program.action === 'encode' ? caesarTransform(+program.shift) : caesarTransform(26 - +program.shift),
            program.output ? fs.createWriteStream(program.output) : process.stdout
        );
        console.log(`${program.action} was done`);
    }

    catch(err) {
        console.error(`${program.action} failed with error:`, err);
    }
})();
