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
