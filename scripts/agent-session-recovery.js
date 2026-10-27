#!/usr/bin/env node
'use strict';

// Owner-invoked recovery only. Never starts services, repairs goals, or changes credentials.
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const net = require('net');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const suffix = '/app/services/second_brain/gbrain_proxy.py';
const normalize = value => String(value).replaceAll('\\', '/');

function inspect(configPath, workspaceRoot) {
  if (fs.lstatSync(configPath).isSymbolicLink()) throw new Error('Refusing a symlinked client configuration');
  const bytes = fs.readFileSync(configPath);
  const config = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, ''));
  const server = config.mcpServers?.seabridge_memory;
  const args = server?.args;
  const index = Array.isArray(args) ? args.findIndex(arg => typeof arg === 'string' && normalize(arg).endsWith(suffix)) : -1;
  const oldPath = index < 0 ? null : args[index];
  const replacement = path.join(workspaceRoot, 'manageesg-backend', ...suffix.slice(1).split('/'));
  const tokenIndex = Array.isArray(args) ? args.indexOf('--token-file') : -1;
  const tokenPath = tokenIndex < 0 ? null : args[tokenIndex + 1];
  const stale = oldPath !== null && !fs.existsSync(oldPath);
  const recognized = oldPath !== null && normalize(oldPath).includes('/.worktrees/second-brain-be-20261011/');
  const repairable = stale && recognized && fs.existsSync(replacement);
  return {
    bytes, index,
    report: {
      configPath, configSha256: hash(bytes),
      memory: { oldPath, replacement, stale, repairable, tokenFileExists: typeof tokenPath === 'string' && fs.existsSync(tokenPath) },
    },
  };
}

function repairMemoryPath(configPath, workspaceRoot, expectedHash) {
  if (!/^[a-f0-9]{64}$/.test(expectedHash || '')) throw new Error('--repair-memory-path requires --expect-sha256 from a fresh audit');
  const lock = configPath + '.recovery.lock';
  const handle = fs.openSync(lock, 'wx', 0o600);
  let temporary;
  try {
    const state = inspect(configPath, workspaceRoot);
    if (state.report.configSha256 !== expectedHash) throw new Error('Client configuration changed; audit again before repairing');
    if (!state.report.memory.repairable) return { changed: false, ...state.report };
    const { oldPath, replacement } = state.report.memory;
    const original = state.bytes.toString('utf8');
    const needle = JSON.stringify(oldPath);
    if (original.split(needle).length !== 2) throw new Error('Path is not uniquely encoded; refusing a broad replacement');
    const updated = original.replace(needle, JSON.stringify(replacement));
    const parsed = JSON.parse(updated.replace(/^\uFEFF/, ''));
    if (parsed.mcpServers.seabridge_memory.args[state.index] !== replacement) throw new Error('Replacement did not change the intended argument');
    // Back up only the changed non-secret field, never the complete credential-bearing config.
    const receipt = configPath + '.memory-path-recovery-' + expectedHash.slice(0, 12) + '.json';
    const rollback = JSON.stringify({ configPath, beforeSha256: expectedHash, afterSha256: hash(Buffer.from(updated)), argumentIndex: state.index, oldPath, replacement }, null, 2) + '\n';
    if (fs.existsSync(receipt)) {
      if (fs.readFileSync(receipt, 'utf8') !== rollback) throw new Error('Existing rollback receipt differs');
    } else fs.writeFileSync(receipt, rollback, { flag: 'wx', mode: 0o600 });
    temporary = configPath + '.recovery-' + process.pid + '.tmp';
    fs.writeFileSync(temporary, updated, { flag: 'wx', mode: fs.statSync(configPath).mode });
    // The lock serializes this helper; the hash also rejects observed native-client edits.
    if (hash(fs.readFileSync(configPath)) !== expectedHash) throw new Error('Concurrent client edit detected; configuration was not replaced');
    fs.renameSync(temporary, configPath);
    temporary = null;
    return { changed: true, rollbackReceipt: receipt, ...inspect(configPath, workspaceRoot).report };
  } finally {
    if (temporary && fs.existsSync(temporary)) fs.unlinkSync(temporary);
    fs.closeSync(handle);
    fs.unlinkSync(lock);
  }
}

function listening(port) {
  return new Promise(resolve => {
    const socket = net.createConnection({ host: '127.0.0.1', port });
    const finish = value => { socket.destroy(); resolve(value); };
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.setTimeout(1000, () => finish(false));
  });
}

async function checkClaudeStatus(statusFile, request = fetch) {
  const response = await request('https://status.claude.com/api/v2/summary.json', { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!response.ok) throw new Error('Public Claude status returned HTTP ' + response.status);
  const body = await response.text();
  if (body.length > 1024 * 1024) throw new Error('Public status response exceeds 1 MiB');
  const data = JSON.parse(body);
  if (typeof data.status?.indicator !== 'string' || !Array.isArray(data.incidents)) throw new Error('Invalid public status response');
  const result = {
    observedAt: new Date().toISOString(),
    indicator: data.status.indicator,
    description: data.status.description,
    sonnetComponents: (data.components || []).filter(item => /sonnet/i.test(item.name)).map(({ name, status }) => ({ name, status })),
    activeIncidents: data.incidents.filter(item => !['resolved', 'postmortem'].includes(item.status)).map(({ name, status }) => ({ name, status })),
    limitation: 'Public service status only; no model/classifier probe and no automatic configuration changes.',
  };
  fs.mkdirSync(path.dirname(statusFile), { recursive: true });
  const temporary = statusFile + '.' + process.pid + '.tmp';
  try {
    fs.writeFileSync(temporary, JSON.stringify(result, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    fs.renameSync(temporary, statusFile);
  } finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
  return result;
}

async function main(args = process.argv.slice(2)) {
  const options = { config: path.join(os.homedir(), '.claude.json'), workspace: path.resolve(__dirname, '../..') };
  for (let i = 0; i < args.length; i++) {
    const flag = args[i];
    if (flag === '--repair-memory-path') options.repair = true;
    else if (flag === '--check-claude-status') options.status = true;
    else if (['--config', '--workspace', '--expect-sha256', '--status-file'].includes(flag)) {
      const value = args[++i];
      if (!value || value.startsWith('--')) throw new Error('Missing value for ' + flag);
      options[flag.slice(2)] = value;
    } else throw new Error('Unknown option: ' + flag);
  }
  if (options.status) {
    if (options.repair) throw new Error('Status check and configuration repair must be separate operations');
    console.log(JSON.stringify(await checkClaudeStatus(options['status-file'] || path.join(os.homedir(), '.omniroute', 'logs', 'claude-status-latest.json')), null, 2));
    return;
  }
  const result = options.repair
    ? repairMemoryPath(options.config, options.workspace, options['expect-sha256'])
    : inspect(options.config, options.workspace).report;
  result.listeners = Object.fromEntries(await Promise.all([3773, 8790, 11544, 8182].map(async port => [port, await listening(port)])));
  result.limitation = 'Listener readiness is not authenticated MCP or task acceptance. Goal recovery remains per-owner; tokens and OAuth are never created or copied.';
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { inspect, repairMemoryPath, checkClaudeStatus };
