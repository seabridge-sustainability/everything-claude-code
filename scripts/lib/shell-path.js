'use strict';

const { spawnSync } = require('child_process');

const styleCache = new Map();

function detectWindowsShellStyle(shell, options = {}) {
  const platform = options.platform || process.platform;
  if (platform !== 'win32') return 'posix';
  if (!shell) return 'unknown';

  const key = String(shell).toLowerCase();
  if (styleCache.has(key)) return styleCache.get(key);

  const spawn = options.spawnSync || spawnSync;
  const probe = spawn(
    shell,
    ['-c', 'if [ -d /mnt/c ]; then printf wsl; elif [ -d /c ]; then printf msys; else printf unknown; fi'],
    { encoding: 'utf8', windowsHide: true, timeout: 2000 }
  );
  const style = !probe.error && probe.status === 0
    ? String(probe.stdout || '').trim()
    : 'unknown';
  const normalized = style === 'wsl' || style === 'msys' ? style : 'unknown';
  styleCache.set(key, normalized);
  return normalized;
}

function toShellPath(filePath, shell, options = {}) {
  const value = String(filePath || '');
  const platform = options.platform || process.platform;
  if (platform !== 'win32') return value;

  const match = value.match(/^([A-Za-z]):[\\/](.*)$/);
  if (!match) return value.replace(/\\/g, '/');

  const drive = match[1].toLowerCase();
  const rest = match[2].replace(/\\/g, '/');
  const style = options.style || detectWindowsShellStyle(shell, options);
  if (style === 'wsl') return `/mnt/${drive}/${rest}`;
  if (style === 'msys') return `/${drive}/${rest}`;
  return value.replace(/\\/g, '/');
}

module.exports = { detectWindowsShellStyle, toShellPath };
