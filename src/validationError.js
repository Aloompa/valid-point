'use strict';


class ValidationError extends Error {
	constructor (errors) {
        super(errors);

		/* istanbul ignore else */
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);

        } else {
            Object.defineProperty(this, 'stack', {
                value: (new Error()).stack
            });
        }

        Object.defineProperty(this, 'message', {
            value: errors
        });
	}

	get name () {
        return this.constructor.name;
	}
}

module.exports = ValidationError;
