'use strict';

const ValidationError = require('../validationError');
const assert = require('assert');

describe('Validation Errors', () => {
    describe('When we get the error name', () => {
        it('Should return the name of the constructor', () => {
            const err = new ValidationError();
            assert.equal(err.name, 'ValidationError');
        });
    });
});
