import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT, revision } from './runtime.mjs';
const suite = path.join(ROOT, 'integrations/company-dev-tools');
const localRoot = path.join(suite, 'skills/pstack');
const sha = text => crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');
export const workflows = {
  arena: ['Compare independent implementation plans with an explicit judge before owner-approved implementation.', 'Use sea-multi-model-planning. Prepare a packet with pstack_prepare_plan, obtain two completed native-agent plans, then an independent critique. Validate exact candidate digests with pstack_validate_review. Keep planner outputs separate inside artifacts/agent-runs, with no product edits or worktrees. An absent model is absent; do not silently substitute or call persona prompts model diversity.'],
  architect: ['Ground a substantial design in current contracts, compare interfaces and obtain plan approval.', 'Use the same planning packet as arena; do not start a second plan. Compare structurally distinct approaches against real callers and schemas. The owner approval checkpoint is required for this workflow; upstream proceed-without-checkpoint behavior is not adopted.'],
  'create-verification-skill': ['Turn a recurring user journey into an executable verification recipe with durable evidence.', 'Use sea-verify-seabridge and the existing verification-loop. Interview source and existing harnesses. Define prerequisites, doctor, drive, assertions, evidence and cleanup. Extend an existing test or recipe before adding a harness. Prove the recipe against its declared target; unexecuted recipes remain configured-unverified. Reuse primary listeners and approved test data; no automatic seeding, migrations or replacement servers.'],
  'maintain-verification-skill': ['Keep affected feature journeys and verification prerequisites accurate as behavior changes.', 'Read the feature map and affected source. Correct confirmed drift and add a regression check only where useful. Run affected checks and the declared live journey when required. Keep documentation drift, harness defects and product defects distinct. Do not retest every feature on every merge or weaken an unreachable journey.'],
  interrogate: ['Obtain bounded independent critique for a consequential diff or design.', 'Use one review workflow, selected by the current task. Reviewers receive the same exact revision, stated intent and acceptance contract. Verify concrete findings, retain disagreements, and distinguish real defects from optional improvements. No automatic fixes, provider calls, publication or extra review chains. Use existing review tooling when it suffices.'],
  reflect: ['Capture recurring engineering lessons in existing verification and feature guidance.', 'Review only this authorized task and its receipts. Turn repeatable defects into checks or improve the matching existing workflow. Maintain version-controlled feature documentation under current knowledge-ops boundaries. Do not scan unrelated conversations, create another memory store, file tickets, or change personal memory automatically.'],
  correct: ['Prevent repeated defects with contracts, assertions and bounded regression checks.', 'Start with a demonstrated recurring failure. Prefer an existing type, boundary validation, lint rule or behavioral regression test over another prose rule. Preserve acceptance and protected behavior. If a check cannot observe the defect, report the gap instead of asserting enforcement.'],
  how: ['Explain an affected subsystem from current source and runtime evidence.', 'Use current source entry points and matching contracts. Use knowledge or graph citations only after freshness validation. Keep explanation relevant to the requested change and distinguish inferred relationships from observed behavior.'],
  why: ['Recover design rationale and constraints using authorized evidence sources.', 'Use existing documentation, source history and authorized issue evidence. State missing rationale as unknown. No automatic external account connection or private-history ingestion. The explanation is supporting context, not permission for a redesign.'],
  'blast-radius': ['Identify affected callers and the smallest checks that can detect regressions.', 'Trace affected routes, schemas, callers and persistence boundaries from current source. Select focused checks and material failure cases. A missing graph is not proof of no callers; use source. Preserve frontend contracts, authentication, tenant boundaries and scientific inputs.' ]
};

export async function indexPstack(base) {
  const c = structuredClone(base);
  c.skills = c.skills.filter(x => x.source !== 'cursor-pstack');
  c.sources['cursor-pstack'] = { revision, repository: 'https://github.com/cursor/plugins', path: 'pstack', execution: 'ECC adapters only' };
  for (const name of Object.keys(workflows)) {
    const file = `skills/pstack/${name}/SKILL.md`;
    const content = await fs.readFile(path.join(suite, file), 'utf8');
    c.skills.push({ id: `cursor-pstack/ecc/${name}`, name, source: 'cursor-pstack', plugin: 'ecc', description: workflows[name][0], file, sha256: sha(content), upstreamSkill: `pstack/skills/${name}/SKILL.md`, adapted: true });
  }
  if (new Set(c.skills.map(x => x.id)).size !== c.skills.length) throw Error('Duplicate shared workflow IDs');
  return c;
}

export async function installCatalog() {
  for (const [name, [description, body]] of Object.entries(workflows)) {
    const dir = path.join(localRoot, name);
    await fs.mkdir(dir, { recursive: true });
    const content = `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\nmetadata:\n  origin: Pstack adapted for SeaBridge ECC\n---\n\n# ${name}\n\n${body}\n\nUse the current project instructions and active ECC goal. Upstream is pinned at ${revision}; its defaults do not grant scope, tool access or approval.\n\nRead [PSTACK_ECC_GUIDE.md](../../../../../docs/tools/PSTACK_ECC_GUIDE.md) for invocation and proof boundaries.\n`;
    const target = path.join(dir, 'SKILL.md');
    try { const old = await fs.readFile(target, 'utf8'); if (old !== content) throw Error(`Existing different adapter: ${name}`); }
    catch (e) { if (e.code !== 'ENOENT') throw e; await fs.writeFile(target, content, { flag: 'wx' }); }
  }
  const license = await fs.readFile(path.join(suite, 'sources/cursor-plugins/pstack/LICENSE'));
  await fs.writeFile(path.join(localRoot, 'UPSTREAM-LICENSE'), license);
  const file = path.join(suite, 'catalog.json');
  const before = await fs.readFile(file, 'utf8');
  const next = await indexPstack(JSON.parse(before));
  if (await fs.readFile(file, 'utf8') !== before) throw Error('Shared catalog changed concurrently');
  await fs.writeFile(file, JSON.stringify(next, null, 2) + '\n');
  await fs.writeFile(path.join(ROOT, 'integrations/pstack/adaptation.json'), JSON.stringify({ revision, selected: Object.keys(workflows), retainedUpstreamSkills: 52, upstreamScriptsExecuted: false, automaticShipping: false, automaticWorktrees: false, automaticCloudDispatch: false, primaryWorkflow: 'ECC task routing', sourceManifest: 'source-manifest.json' }, null, 2) + '\n');
  return { skills: next.skills.length, commands: next.commands.length, pstackAdapters: Object.keys(workflows).length };
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.join(ROOT, 'integrations/pstack/catalog.mjs')) console.log(JSON.stringify(await installCatalog()));
