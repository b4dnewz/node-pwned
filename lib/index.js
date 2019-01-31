'use strict';

const qs = require('querystring');
const fetch = require('node-fetch').default;
const ENDPOINT = 'https://haveibeenpwned.com/api/v2';

const defaults = {
  method: 'GET',
  // A custom user agent must be provided
  // @see https://haveibeenpwned.com/API/v2#UserAgent
  headers: {
    Accept: 'application/json',
    'User-Agent': 'Node-Pwner'
  }
};

const doError = function(res, body = '') {
  const err = new Error('API Error');
  err.statusCode = res.status;
  err.statusText = res.statusText;
  err.body = body;
  return err;
};

const prepareParams = function(obj) {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
  return qs.stringify(obj);
};

const assignDefined = function(target, ...sources) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key];
      if (val !== undefined) {
        if (typeof target[key] === 'object') {
          assignDefined(target[key], val);
        } else {
          target[key] = val;
        }
      }
    }
  }

  return target;
};

export default class Pwner {
  constructor({ timeout, agent, headers } = {}) {
    this.options = assignDefined({}, defaults, {
      timeout,
      headers: agent ? { 'User-Agent': agent } : headers
    });
  }

  run({ service, value = '', params = {}, callback = () => {} }) {
    return new Promise((resolve, reject) => {
      const query = prepareParams(params);
      fetch(`${ENDPOINT}/${service}/${value}?${query}`, this.options)
        .then(res => {
          return res.text().then(function(text) {
            if (res.status !== 200) {
              throw doError(res, text);
            }
            return text === '' ? text : JSON.parse(text);
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
    return this.run({ service: 'breachedaccount', value, params, callback });
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
