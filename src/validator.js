'use strict';

const ValidationError = require('./validationError');
const rules = require('./rules');

const validator = (options) => {

    const data = options.data;
    const validations = options.validations;
    let errorObject = {};

    const doValidation = (fieldName, ruleName) => {

        const value = data[fieldName];
        let validation = validations[fieldName][ruleName];
        let error;

        // Default rules
        if (validation === true) {
            validation = rules[ruleName];
        }

        if (typeof validation === 'object') {
            if (!validation.fn(value)) {
                error = validation.message;
            }
        }

        return error;

    };

    Object.keys(validations).forEach((fieldName) => {
        Object.keys(validations[fieldName]).forEach((ruleName) => {
            const error = doValidation(fieldName, ruleName);

            if (error) {
                errorObject[fieldName] = errorObject[fieldName] || [];
                errorObject[fieldName].push(error);
            }
        });
    });

    if (Object.keys(errorObject).length) {
        throw new ValidationError(errorObject);
    }

    return true;

};

validator.addRule = (name, options) => {
    rules[name] = options;
};

module.exports = validator;
