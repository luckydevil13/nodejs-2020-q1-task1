const fs = require('fs');

function showError(error) {
    process.stderr.write(error);
    process.exit(1);
}

module.exports = {
    validateAction: function(type) {
        if (type !== 'encode' && type !== 'decode' ) {
            showError('Error: --action `type` must be encode or decode');
        }
    },
    validateShift: function(shift) {
        if (isNaN(shift)) {
            showError('Error: --shift `number` must be number');
        }
        else if (shift < 1) {
            showError('Error: --shift `number` must be > 0');
        }
    },
    validateInputFile: function (fileName) {
        fs.access(fileName, fs.constants.R_OK, (err) => {
            if (err) {
                showError(`Error open input file: ${fileName}\n ${err}`);
            }
        })
    },
    validateOutputFile: function (fileName) {
        fs.access(fileName, fs.constants.W_OK, (err) => {
            if (err) {
                showError(`Error write to output file: ${fileName}\n ${err}`);
            }
        })
    }
};
