'use strict';

const exists = require('./utilities/exists');

let rules = {

    required: {
        message: 'This field is required.',
        fn: (data) => {
            switch (typeof data) {
                case 'string':
                    return data || data.trim().length !== 0;
                default:
                    return exists(data);
            }
        }
    },

    alphanumeric: {
        message: 'Please enter only letters or numbers.',
        fn: (data) => {
            for (let i = 0; i < data.length; i++) {
                let code = data.charCodeAt(i);
                if (!(code > 47 && code < 58) && // Numeric (0-9)
                !(code > 64 && code < 91) && // Upper alpha (A-Z)
                !(code > 96 && code < 123)) { // Lower alpha (a-z)
                    return false;
                }
            }

            return true;
        }
    },

    string: {
        message: 'Please enter a string.',
        fn: (data) => {
            return typeof data === 'string';
        }
    },

    number: {
        message: 'Please enter a real number.',
        fn: (data) => {
            return !Number.isNaN(parseFloat(data));
        }
    }

};

module.exports = rules;
