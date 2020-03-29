const { Transform } = require('stream');

function caesarCipher(string, key) {
    let result = '';

    string = string || '';

    for (let i = 0, chr; i < string.length; i++) {
        chr = string.charCodeAt(i);

        if (chr >= 65 && chr <= 90) {
            result += String.fromCharCode((chr - 65 + key) % 26 + 65);
        } else if (chr >= 97 && chr <= 122) {
            result += String.fromCharCode((chr - 97 + key) % 26 + 97);
        } else {
            result += string.charAt(i);
        }
    }

    return result;
}

function caesarTransform(key) {
    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const data = caesarCipher(chunk.toString(), key);
            callback(null, data);
        }
    })
}

module.exports = {
    caesarTransform
};
