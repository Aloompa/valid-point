'use strict';

const validator = require('../validator');
const assert = require('assert');

describe('Validator', () => {

    describe('When we use a default rule that is already on the validator', () => {
        it('Should validate using the defined rule', () => {
            assert.throws(() => {
                validator({
                    data: {
                        name: null
                    },
                    validations: {
                        name: {
                            required: true
                        }
                    }
                });
            }, Error);
        });

        it('Should not fail if the value is defined', () => {
            const response = validator({
                data: {
                    name: 'Riddler'
                },
                validations: {
                    name: {
                        required: true
                    }
                }
            });

            assert.ok(response);
        });
    });

    describe('When we do a custom validation type', () => {
        it('Should run the custom validation', () => {
            const response = validator({
                data: {
                    name: 'Penguin'
                },
                validations: {
                    isPenguin: {
                        message: 'You are not the Penguin',
                        fn: (val) => {
                            return val === 'Penguin';
                        }
                    }
                }
            });

            assert.ok(response);
        });

        it('Should throw an error if it fails', () => {
            assert.throws(() => {
                validator({
                    data: {
                        name: 'Harley Quinn'
                    },
                    validations: {
                        name: {
                            isPenguin: {
                                message: 'You are not the Penguin',
                                fn: (val) => {
                                    return val === 'Penguin';
                                }
                            }
                        }
                    }
                });
            }, Error);
        });
    });

    describe('When we add a global custom rule', () => {
        it('Should run the custom rule', () => {
            validator.addRule('isPenguin', {
                message: 'You are not the Penguin',
                fn: (val) => {
                    return val === 'Penguin';
                }
            });

            const response = validator({
                data: {
                    name: 'Penguin'
                },
                validations: {
                    name: {
                        isPenguin: true
                    }
                }
            });

            assert.ok(response);
        });

        it('Should throw an error if it does not pass the custom rule', () => {
            validator.addRule('isJoker', {
                message: 'You are not the Joker',
                fn: (val) => {
                    return val === 'Joker';
                }
            });

            assert.throws(() => {
                validator({
                    data: {
                        name: 'Penguin'
                    },
                    validations: {
                        name: {
                            isJoker: true
                        }
                    }
                });
            }, Error);
        });
    });

    describe('When we have multiple validations on the same model', () => {
        it('Should throw only one error with both messages', () => {
            try {
                validator({
                    data: {
                        name: 'Batman'
                    },
                    validations: {
                        name: {
                            isJoker: true,
                            isPenguin: true
                        }
                    }
                });
                
            } catch (e) {
                assert.equal(e.message.name.length, 2);
            }
        });

    });

    describe('When we have failed validations on different models', () => {

        it('Should throw only one error with all messages', () => {
            try {
                validator({
                    data: {
                        name: 'Batman',
                        nickname: 'Batz'
                    },
                    validations: {
                        name: {
                            isJoker: true,
                            isPenguin: true
                        },
                        nickname: {
                            isJoker: true
                        }
                    }
                });

            } catch (e) {
                assert.equal(e.message.name.length, 2);
                assert.equal(e.message.nickname.length, 1);
            }
        });
    });

});
