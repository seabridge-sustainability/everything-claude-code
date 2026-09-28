'use strict';

const assert = require('assert');
const { detectWindowsShellStyle, toShellPath } = require('../../scripts/lib/shell-path');

assert.strictEqual(
  toShellPath('C:\\work\\script.sh', 'bash', { platform: 'win32', style: 'wsl' }),
  '/mnt/c/work/script.sh'
);
assert.strictEqual(
  toShellPath('D:\\work\\script.sh', 'bash', { platform: 'win32', style: 'msys' }),
  '/d/work/script.sh'
);
assert.strictEqual(
  toShellPath('/opt/work/script.sh', 'bash', { platform: 'linux' }),
  '/opt/work/script.sh'
);
assert.strictEqual(
  detectWindowsShellStyle('wsl-test-shell', {
    platform: 'win32',
    spawnSync: () => ({ status: 0, stdout: 'wsl', error: null })
  }),
  'wsl'
);
assert.strictEqual(
  detectWindowsShellStyle('unknown-test-shell', {
    platform: 'win32',
    spawnSync: () => ({ status: 1, stdout: '', error: null })
  }),
  'unknown'
);

console.log('shell path conversion: 5 checks passed');
