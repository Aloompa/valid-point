/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const ValidationError = __webpack_require__(2);
	const rules = __webpack_require__(3);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const exists = __webpack_require__(4);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Check to see if a value "exists".
	 *
	 * @param  {mixed} value Value to compare.
	 * @return {Boolean} Whether or not the value exists.
	 */
	module.exports = (value) => {
	    if (value === undefined) {
	        return false;
	    }

	    if (value === null) {
	        return false;
	    }

	    if (Number.isNaN(value)) {
	        return false;
	    }

	    return true;
	};


/***/ }
/******/ ]);