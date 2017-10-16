const assert = require('assert');
const nock = require('nock');
const mock = nock('https://haveibeenpwned.com/api/v2');

// Get the module
const Pwned = require('../index.js').default;

// Load mocked responses
const responses = require('./responses.json');

describe('Pwned API Test Suite:', () => {
  let Pwner;
  beforeAll(() => {
    Pwner = new Pwned();
  });

  it('calls the breach API endpoint', done => {
    mock.get('/breach/Adobe?').reply(200, responses.breach);
    Pwner.breach('Adobe', (err, res) => {
      assert(!err && res, 'It should recive response data');
      done();
    });
  });

  it('calls the breaches API endpoint', done => {
    mock.get('/breaches/?').reply(200, responses.breaches);
    Pwner.breaches({}, (err, res) => {
      assert(!err && res, 'It should recive response data');
      done();
    });
  });

  it('calls the breachedaccount API endpoint', done => {
    mock.get('/breachedaccount/foo@bar.com?').reply(200, responses.breaches);
    Pwner.breachedAccount('foo@bar.com', {}, (err, res) => {
      assert(!err && res, 'It should recive response data');
      done();
    });
  });

  it('calls the dataclasses API endpoint', done => {
    mock.get('/dataclasses/?').reply(200, responses.dataclasses);
    Pwner.dataClasses((err, res) => {
      assert(!err && res, 'It should recive response data');
      done();
    });
  });

  it('calls the pasteaccount API endpoint', done => {
    mock.get('/pasteaccount/test@example.com?').reply(200, responses.pasteaccount);
    Pwner.pasteAccount('test@example.com', (err, res) => {
      assert(!err && res, 'It should recive response data');
      done();
    });
  });

  it('calls the pwnedpassword API endpoint', done => {
    mock.get('/pwnedpassword/P@55w0rd?').reply(200);
    Pwner.pwnedPassword('P@55w0rd', {}, (err, res) => {
      assert(
        !err && (Object.keys(res).length === 0 && res.constructor === Object),
        'It should respond empty body'
      );
      done();
    });
  });
});
