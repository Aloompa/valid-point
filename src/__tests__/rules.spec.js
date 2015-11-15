'use strict';

const rules = require('../rules');
const assert = require('assert');

describe('Validator Rules', () => {
    describe('when a field is required', () => {
        it('should return true for a truthy value', () => {
            let test = rules.required.fn('Hello');
            assert.ok(test);
        });

        it('should return false for a falsey value', () => {
            let test = rules.required.fn('');
            assert.ok(!test);
        });

        it('should return true for 0', () => {
            let test = rules.required.fn(0);
            assert.ok(test);
        });

        it('should return false for undefined', () => {
            let test = rules.required.fn();
            assert.ok(!test);
        });
    });

    describe('when a field is alphanumeric', () => {
        it('should not let special characters in', () => {
            let test = rules.alphanumeric.fn('#ABC');
            assert.ok(!test);
        });

        it('should allow letters and numbers', () => {
            let test = rules.alphanumeric.fn('Abc123');
            assert.ok(test);
        });
    });

    describe('when a field is a number', () => {
        it('should allow number', () => {
            let test = rules.number.fn(123);
            assert.ok(test);
        });

        it('should not allow strings', () => {
            let test = rules.number.fn('B0B');
            assert.ok(!test);
        });
    });
});
