'use strict';

const assert = require('assert');
const packageJson = require('../../package.json');
const packageLock = require('../../package-lock.json');

assert.strictEqual(packageLock.lockfileVersion, 3);

const lockedRoot = packageLock.packages?.[''];
assert.ok(lockedRoot, 'package-lock.json must contain the root package entry');

for (const section of ['dependencies', 'devDependencies', 'optionalDependencies']) {
  const declared = packageJson[section] || {};
  const locked = lockedRoot[section] || {};
  assert.deepStrictEqual(locked, declared, `package-lock root ${section} must match package.json`);
  for (const name of Object.keys(declared)) {
    assert.ok(
      packageLock.packages[`node_modules/${name}`],
      `package-lock must resolve direct ${section} entry ${name}`
    );
  }
}

console.log('package lock parity: 3 sections passed');
