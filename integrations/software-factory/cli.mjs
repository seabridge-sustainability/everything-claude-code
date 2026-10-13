import fs from 'node:fs';
import { factoryRequest } from './runtime.mjs';
const [operation, file] = process.argv.slice(2);
try {
  let request = {};
  if (file) {
    let raw = '';
    if (file === '-') for await (const part of process.stdin) { raw += part; if (Buffer.byteLength(raw) > 64000) throw Error('Bounded input required'); }
    else { const info=fs.lstatSync(file);if(!info.isFile()||info.isSymbolicLink()||info.size>64000)throw Error('Bounded regular input file required');raw=fs.readFileSync(file,'utf8'); }
    request = JSON.parse(raw);
  }
  const result = await factoryRequest({ ...request, operation });
  console.log(JSON.stringify(result, null, 2));
  if (result.verdict === 'FAIL') process.exitCode = 1;
  else if (result.verdict === 'BLOCKED') process.exitCode = 2;
} catch (error) { console.error('ECC factory: ' + error.message); process.exitCode = 1; }
