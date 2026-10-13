import fs from 'node:fs/promises';
import { findWorkflow, readEntry } from '../dev-suite/runtime.mjs';
import { collectDebt, sourceIntegrity, revision } from './runtime.mjs';
const [command, input] = process.argv.slice(2);
async function request() {
  let raw = '';
  if (input === '-') for await (const part of process.stdin) { raw += part; if (Buffer.byteLength(raw) > 128000) throw Error('Input exceeds budget'); }
  else { if (!input) throw Error('JSON request path or - required'); if ((await fs.stat(input)).size > 128000) throw Error('Input exceeds budget'); raw = await fs.readFile(input, 'utf8'); }
  return JSON.parse(raw);
}
try {
  let result;
  if (command === 'find') result = await findWorkflow(await request());
  else if (command === 'read') result = await readEntry(await request());
  else if (command === 'debt') result = await collectDebt(await request());
  else if (command === 'status') result = { revision, source: await sourceIntegrity(), activation: 'explicit task/session selection; no global lifecycle hooks', providerCalls: 0 };
  else if (command === 'mcp') await (await import('./mcp.mjs')).startMcp();
  else throw Error('Usage: node integrations/ponytail/cli.mjs status | find|read|debt request.json|- | mcp');
  if (result) console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error('ECC Ponytail: ' + error.message); process.exitCode = 1; }
