'use strict';

const qs = require('querystring');
const fetch = require('node-fetch');
const ENDPOINT = 'https://haveibeenpwned.com/api/v2';

const defaults = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

export default class {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
  }

  // Run the API call
  run({ service, value = '', params = {}, callback = () => {} }) {
    return new Promise((resolve, reject) => {
      fetch(`${ENDPOINT}/${service}/${value}?${qs.stringify(params)}`, this.options)
        .then(res => {
          return res.text().then(function(text) {
            return text ? JSON.parse(text) : {};
          });
        })
        .then(body => {
          callback(null, body);
          resolve(body);
        })
        .catch(err => {
          callback(err);
          reject(err);
        });
    });
  }

  breachedAccount(value, params, callback) {
    this.run({ service: 'breachedaccount', value, params, callback });
  }

  breaches(params, callback) {
    return this.run({ service: 'breaches', params, callback });
  }

  breach(value, callback) {
    return this.run({ service: 'breach', value, callback });
  }

  dataClasses(callback) {
    return this.run({ service: 'dataclasses', callback });
  }

  pasteAccount(value, callback) {
    return this.run({ service: 'pasteaccount', value, callback });
  }

  pwnedPassword(value, params, callback) {
    return this.run({ service: 'pwnedpassword', value, params, callback });
  }
}
