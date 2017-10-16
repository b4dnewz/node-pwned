# pwned-api
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A very simple javascript client for HaveIBeenPwned API.

## Installation

```sh
$ npm install --save pwned-api
```

## Usage

```js
const Pwned = require('pwned-api');
const pwner = new Pwned();

pwner.breaches({}, (err, results) => {
  console.log('Results:', results);
});
```

For details in depth about the API please consult the [HaveIBeenPwned](https://haveibeenpwned.com/API/v2) page.

## License

MIT © b4dnewz


[npm-image]: https://badge.fury.io/js/pwned-api.svg
[npm-url]: https://npmjs.org/package/pwned-api
[travis-image]: https://travis-ci.org/b4dnewz/node-pwned.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-pwned
[daviddm-image]: https://david-dm.org/b4dnewz/node-pwned.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/node-pwned
[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-pwned/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-pwned
