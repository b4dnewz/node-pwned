#!/usr/bin/env node

const { version } = require('../package.json');
const program = require('commander');
const pwner = new (require('../dist/pwned.node'))();

const printErr = err => {
  console.log('An error occurred', err);
};

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
  .option(
    '-d, --domain <domain>',
    'Filters the result set to only breaches against the domain specified'
  )
  .action(options => {
    pwner
      .breaches({
        domain: options.domain
      })
      .then(printRes)
      .catch(printErr);
  });

// Return a list of all breaches a particular account has been involved in
program
  .command('breached <account>')
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
      .catch(printErr);
  });

// Return single breach details by name
program.command('breach <name>').action(name => {
  pwner
    .breach(name)
    .then(printRes)
    .catch(printErr);
});

// Return all the data classes in the systems
program.command('dataclasses').action(() => {
  pwner
    .dataClasses()
    .then(printRes)
    .catch(printErr);
});

// Return all pastes for an account
program.command('pasteaccount <account>').action(account => {
  pwner
    .pasteAccount(account)
    .then(printRes)
    .catch(printErr);
});

// // TODO: Handle the 404 cases and investigates on missing count on response
// // Check if a password been exposed in data breaches and exists on HIBP database
// program
//   .command('password <password>')
//   .option('-o, --original-hash')
//   .action((password, options) => {
//     pwner
//       .pwnedPassword(password, {
//         originalPasswordIsAHash: options.originalHash
//       })
//       .then(() => printRes({ found: true }))
//       .catch(printErr);
//   });

program.parse(process.argv);
