#!/usr/bin/env node

const { version } = require('../package.json');
const program = require('commander');
const pwner = new (require('../dist/pwned.node'))();

const printRes = res => {
  if (Object.keys(res).length === 0) {
    console.log('No results found.');
    return;
  }
  console.log(JSON.stringify(res, null, 2));
};

program.name('pwned').version(version);

// List all the available breaches
program
  .command('breaches')
  .description('Get all the breached sites in the system')
  .option(
    '-d, --domain <domain>',
    'Filters the result set to only breaches against the domain specified'
  )
  .action(({ domain }) => {
    pwner
      .breaches({ domain })
      .then(printRes)
      .catch(console.error);
  });

// Return a list of all breaches a particular account has been involved in
program
  .command('breached <account>')
  .description('Get all the breaches for an account')
  .option('-t, --truncate', 'Returns only the name of the breach')
  .option('-u, --unverified', 'Returns breaches that have been flagged as unverified')
  .option(
    '-d, --domain <domain>',
    'Filters the result set to only breaches against the domain specified'
  )
  .action((account, options) => {
    pwner
      .breachedAccount(account, {
        domain: options.domain,
        truncateResponse: options.truncate,
        includeUnverified: options.unverified
      })
      .then(printRes)
      .catch(console.error);
  });

// Return single breach details by name
program
  .command('breach <name>')
  .description('Get a single breached site')
  .action(name => {
    pwner
      .breach(name)
      .then(printRes)
      .catch(console.error);
  });

// Return all the data classes in the systems
program
  .command('dataclasses')
  .description('Get all the data classes in the system')
  .action(() => {
    pwner
      .dataClasses()
      .then(printRes)
      .catch(console.error);
  });

// Return all pastes for an account
program
  .command('pasteaccount <account>')
  .description('Get all pastes for an account')
  .action(account => {
    pwner
      .pasteAccount(account)
      .then(printRes)
      .catch(console.error);
  });

program.parse(process.argv);
