const exists = require('../exists');
const assert = require('assert');

describe('exists()', () => {
    describe('When a value does not exist', () => {
        it('Should return false for undefined', () => {
            const response = exists(undefined);
            assert.ok(!response);
        });

        it('Should return false for null', () => {
            const response = exists(null);
            assert.ok(!response);
        });

        it('Should return false for NaN', () => {
            const response = exists(NaN);
            assert.ok(!response);
        });
    });

    describe('When a value does exist', () => {
        it('Should return true for a string', () => {
            const response = exists('Hello');
            assert.ok(response);
        });

        it('Should return true for an object', () => {
            const response = exists({});
            assert.ok(response);
        });

        it('Should return true for a array', () => {
            const response = exists([]);
            assert.ok(response);
        });

        it('Should return true for a number', () => {
            const response = exists(10);
            assert.ok(response);
        });

        it('Should return true for zero', () => {
            const response = exists(0);
            assert.ok(response);
        });
    });
});
