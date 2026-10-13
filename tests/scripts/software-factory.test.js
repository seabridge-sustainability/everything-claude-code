'use strict';
// The existing CI runner discovers *.test.js; preserve that runner and execute
// the ESM tests here. Local-only prerequisites report explicit skips in CI.
import('./software-factory.test.mjs').catch(error => {
  console.error(error);
  process.exitCode = 1;
});
