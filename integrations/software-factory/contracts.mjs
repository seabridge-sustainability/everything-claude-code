import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { ROOT, SOURCE, hashFile } from './runtime.mjs';
const workspace = path.dirname(ROOT);
function compiler() { return createRequire(path.join(workspace,'manageesg-frontend/package.json'))('typescript'); }
export function compareContract(backend, frontendText, map) {
  if(!backend?.enums || !backend.fields || !map?.enums || !map.fields || !Object.keys(map.enums).length || !Object.keys(map.fields).length)throw Error('Non-empty mapped contract checks required');
  const ts = compiler(), file = ts.createSourceFile('contract.ts', frontendText, ts.ScriptTarget.Latest, true);
  if(file.parseDiagnostics.length)throw Error('Frontend contract has syntax errors');
  const aliases = new Map(file.statements.filter(ts.isTypeAliasDeclaration).map(node => [node.name.text, node.type]));
  const problems = [], checks = [];
  for (const [server, client] of Object.entries(map.enums)) {
    const node = aliases.get(client);
    const actual = node && (ts.isUnionTypeNode(node) ? node.types : [node]).map(type => ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal) ? type.literal.text : null);
    const expected = backend.enums[server];
    checks.push(`enum:${client}`);
    if (!expected || !actual || actual.some(x => x === null) || JSON.stringify([...expected].sort()) !== JSON.stringify([...actual].sort())) problems.push(`Enum mismatch: ${server}/${client}`);
  }
  const model = aliases.get(map.frontendType);
  const fields = new Map(model && ts.isTypeLiteralNode(model) ? model.members.filter(ts.isPropertySignature).map(node => [node.name.getText(file), node]) : []);
  for (const [name, required] of Object.entries(map.fields)) {
    checks.push(`field:${name}`);
    const py = backend.fields[name], node = fields.get(name), actual = node?.type?.getText(file).replace(/\s+/g, ' ').trim();
    if (!py || !node || node.questionToken || actual !== required) { problems.push(`Missing or incompatible field: ${name}`); continue; }
    const optional = /^Optional\[|\|\s*None\b/.test(py);
    if (optional !== /\bnull\b/.test(required)) problems.push(`Nullability mismatch: ${name}`);
    const expectedPy = required.includes('number') ? /\b(?:int|float)\b/ : required === 'string' || required.includes('string |') ? /\bstr\b/ : /Literal\[['"]kWh['"]\]/;
    if (!expectedPy.test(py)) problems.push(`Backend field type drift: ${name}`);
  }
  return { verdict: problems.length ? 'FAIL' : 'PASS', checks, problems, authenticatedProductProof: false,
    limitation: 'Scoped AST conformance for mapped enums, fields and nullability; not a complete generated API or runtime/scientific proof.' };
}
export function verifyContracts() {
  const map = JSON.parse(fs.readFileSync(path.join(SOURCE,'contract-map.json'),'utf8'));
  const paths = [path.join(workspace,'manageesg-backend',map.backendModel),path.join(workspace,'manageesg-backend',map.backendSchema),path.join(workspace,'manageesg-frontend',map.frontend)];
  const sources = paths.map(file => ({ file, sha256: hashFile(file) }));
  const python = path.join(workspace,'manageesg-backend/venv/Scripts/python.exe');
  const read = spawnSync(python,[path.join(SOURCE,'schema-reader.py')],{input:JSON.stringify({model:fs.readFileSync(paths[0],'utf8'),schema:fs.readFileSync(paths[1],'utf8')}),encoding:'utf8',timeout:10000,maxBuffer:64000,windowsHide:true,env:{SYSTEMROOT:process.env.SYSTEMROOT,PATH:process.env.PATH,PYTHONDONTWRITEBYTECODE:'1'}});
  if (read.status !== 0) throw Error('Existing AST parser unavailable; no application import, dependency install or fallback attempted');
  const result = compareContract(JSON.parse(read.stdout),fs.readFileSync(paths[2],'utf8'),map);
  if (sources.some(row => hashFile(row.file) !== row.sha256)) throw Error('Contract source changed during verification');
  return {...result,sources,providerCalls:0,sourceImportsExecuted:0};
}
