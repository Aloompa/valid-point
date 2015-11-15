## Welcome to Valid Point

A simple extensible validation module.

## API

Valid Point is written with ES6 syntax, so you'll need a transpiler such as [Babel](http://babel.io) or [Traceur](https://github.com/google/traceur-compiler).

### Validating Fields

To validate your fields, just pass in an object with your data and your validations.

```
const validate = require('valid-point');

validate({
    data: {
        name: null
    },
    validations: {
        name: {
            required: true
        }
    }
}); // Throws an error because name is null
```

Each field of data can have as many validations as you'd like.

### Out of the box Rules

Currently, we have a few validation rules that are available without any effort:

- required

```
validate({
    data: {
        name: null
    },
    validations: {
        name: {
            required: true
        }
    }
}); // Throws an error because name is null
```

- alphanumeric

```
validate({
    data: {
        name: '123-a'
    },
    validations: {
        name: {
            alphanumeric: true
        }
    }
}); // Throws an error because the name has a dash in it
```

- string

```
validate({
    data: {
        name: 33
    },
    validations: {
        name: {
            string: true
        }
    }
}); // Throws an error because name is a number, not a string
```

- number

```
validate({
    data: {
        name: '33'
    },
    validations: {
        name: {
            required: true
        }
    }
}); // Throws an error because name is a string, not a number
```

You can easily add your own as well.

### Creating Custom Rules

New rules can be added globally to the validator, by calling the addRule() method:

```
validate.addRule('phoneNumber', {
    message: 'Please enter a valid phone number',
    fn: (value) => {
        return value.match(/\d/g).length === 10;
    }
});
```

You can also pass in a rule to the validations object if you have a rule that you only want to apply to the current validation instead of being available globally:

```
validate({
    data: {
        number: '33'
    },
    validations: {
        number: {
            phoneNumber: {
                message: 'Please enter a valid phone number',
                fn: (value) => {
                    return value.match(/\d/g).length === 10;
                }
            }
        }
    }
});
```

## Contributing

We encourage you to contribute to Valid Point by submitting bug reports and pull requests through [Github](http://github.com).

## License

Valid Point is released under The [MIT License](http://www.opensource.org/licenses/MIT) (MIT)

Copyright (c) [2015] [Aloompa LLC]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
