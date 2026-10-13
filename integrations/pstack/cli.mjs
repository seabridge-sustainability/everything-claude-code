import fs from 'node:fs/promises';
import { preparePlan, validateReview, verifyFeature, sourceIntegrity, features, revision } from './runtime.mjs';
import { findWorkflow, readEntry } from '../dev-suite/runtime.mjs';
const [command, input] = process.argv.slice(2);
async function request() {
  let raw = '';
  if (input === '-') for await (const part of process.stdin) { raw += part; if (raw.length > 128000) throw Error('Input exceeds context budget'); }
  else { if (!input) throw Error('JSON request path or - required'); const stat = await fs.stat(input); if (stat.size > 128000) throw Error('Input exceeds context budget'); raw = await fs.readFile(input, 'utf8'); }
  return JSON.parse(raw);
}
try {
  let result;
  if (command === 'plan') result = await preparePlan(await request());
  else if (command === 'find') result = await findWorkflow(await request());
  else if (command === 'read') result = await readEntry(await request());
  else if (command === 'review') result = await validateReview(await request());
  else if (command === 'verify') result = await verifyFeature(input);
  else if (command === 'factory') result = await (await import('../software-factory/runtime.mjs')).factoryRequest(await request());
  else if (command === 'status') result = { revision, source: await sourceIntegrity(), features, providerCalls: 0, runtime: 'ECC-controlled; agent-native model calls are separately authorized' };
  else if (command === 'mcp') await (await import('./mcp.mjs')).startMcp();
  else throw Error('Usage: node integrations/pstack/cli.mjs status | find|read|plan|review|factory request.json|- | verify FEATURE | mcp');
  if (result) { console.log(JSON.stringify(result, null, 2)); if (result.verdict === 'FAIL') process.exitCode = 1; if (result.verdict === 'BLOCKED') process.exitCode = 2; }
} catch (error) { console.error('ECC Pstack: ' + error.message); process.exitCode = 1; }
