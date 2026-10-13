import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const SUITE = path.join(ROOT, 'integrations/company-dev-tools');
export const names = ['sea-requirements-discovery', 'sea-quality-contract', 'sea-adversarial-review'];
export const hash = text => crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');
export async function indexEngineering(base) {
  const c = structuredClone(base);
  c.skills = c.skills.filter(e => e.source !== 'ecc-engineering');
  const adapted = [];
  c.sources['ecc-engineering'] = { execution: 'ECC adapters only', upstream: ['mattpocock-skills', 'addyosmani-agent-skills'], manifest: '../engineering-skills/adaptation.json' };
  for (const name of names) {
    const file = `skills/ecc-engineering/${name}/SKILL.md`;
    const content = (await fs.readFile(path.join(SUITE, file), 'utf8')).replace(/\r\n/g, '\n');
    const description = content.match(/^description: (.+)$/m)?.[1];
    if (!description) throw Error('Missing adapter description: ' + name);
    adapted.push({ id: `ecc-engineering/ecc/${name}`, name, source: 'ecc-engineering', plugin: 'ecc', description, file, sha256: hash(content), adapted: true });
  }
  // Existing family reindexers append Pstack/Ponytail; keep their original terminal order.
  const at = c.skills.findIndex(e => ['cursor-pstack', 'ponytail'].includes(e.source));
  c.skills.splice(at < 0 ? c.skills.length : at, 0, ...adapted);
  if (new Set(c.skills.map(e => e.id)).size !== c.skills.length) throw Error('Duplicate workflow IDs');
  return c;
}
export async function installEngineering() {
  const file = path.join(SUITE, 'catalog.json'), before = await fs.readFile(file, 'utf8'), base = JSON.parse(before);
  const upstream = [
    ['mattpocock-skills', 'skills/productivity/grilling/SKILL.md'],
    ['mattpocock-skills', 'skills/engineering/grill-with-docs/SKILL.md'],
    ['addyosmani-agent-skills', 'skills/constraint-driven-development/SKILL.md'],
    ['addyosmani-agent-skills', 'skills/doubt-driven-development/SKILL.md'],
    ['addyosmani-agent-skills', '.claude/commands/webperf.md']
  ];
  const sources = [];
  for (const [source, relative] of upstream) {
    const repo = path.join(SUITE, 'sources', source), revision = base.sources[source].revision;
    const head = execFileSync('git', ['-C', repo, 'rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true }).trim();
    if (head !== revision) throw Error('Upstream pin changed: ' + source);
    const pinned = execFileSync('git', ['-C', repo, 'show', `${revision}:${relative}`], { encoding: 'utf8', windowsHide: true });
    const local = await fs.readFile(path.join(repo, relative), 'utf8');
    if (hash(local) !== hash(pinned)) throw Error('Retained upstream content differs: ' + relative);
    await fs.access(path.join(repo, 'LICENSE'));
    sources.push({ source, revision, file: relative, sha256: hash(pinned), execution: 'reference only' });
  }
  const next = await indexEngineering(base);
  if (await fs.readFile(file, 'utf8') !== before) throw Error('Catalog changed concurrently');
  await fs.writeFile(file, JSON.stringify(next, null, 2) + '\n');
  await fs.writeFile(path.join(ROOT, 'integrations/engineering-skills/adaptation.json'), JSON.stringify({ schema: 'ecc.engineering-adaptation.v1', selected: names, sources, canonicalBodies: 'integrations/company-dev-tools/skills/ecc-engineering', productInstructionFilesAdded: 0, sourcePinsUpdated: false, rawHooksExecuted: false, newMcpServers: 0, liveModelCalls: 0 }, null, 2) + '\n');
  return { skills: next.skills.length, commands: next.commands.length, selected: names };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(JSON.stringify(await installEngineering()));
