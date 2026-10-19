import fs from 'node:fs/promises';
import path from 'node:path';
import { newBundle, finish, addEvidence, rea, writeJson, config, httpUrl, loadBundle, digest } from './runtime.mjs';

export function scopedRequirements(requirements = []) {
  if (!Array.isArray(requirements) || requirements.length > 100) throw new Error('requirements must be an array of at most 100 scoped items');
  const ids = new Set();
  return requirements.map(item => {
    if (!item || typeof item.id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/.test(item.id) || typeof item.description !== 'string' || !item.description.trim() || item.description.length > 2000 || ids.has(item.id)) throw new Error('Each requirement needs a unique ID and nonempty description (at most 2000 characters)');
    ids.add(item.id);
    return { id: item.id, description: item.description.trim() };
  });
}

export async function referenceAnalyze({ source, kind = 'auto', targetId, cdpEndpoint, requirements }, options = {}) {
  if (typeof source !== 'string' || !source.trim()) throw new Error('source is required: path, URL, or active-browser');
  const scope = scopedRequirements(requirements);
  const c = await config();
  const bundle = await newBundle('reference', source);
  bundle.manifest.requirements = scope;
  let result;
  if (source === 'active-browser') {
    const endpoint = cdpEndpoint || c.cdpEndpoint;
    const endpointUrl = httpUrl(endpoint);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(endpointUrl.hostname)) throw new Error('CDP endpoint must be loopback');
    const targets = await rea(['list-browser-targets', endpoint], options);
    if (!targetId) {
      await writeJson(path.join(bundle.directory, 'targets.json'), targets);
      await addEvidence(bundle, path.join(bundle.directory, 'targets.json'));
      bundle.manifest.limitations.push('CDP cannot reliably identify the OS foreground tab. Select a target ID from targets.json, or pass the active URL from your agent browser tool.');
      return finish(bundle);
    }
    result = { page: await rea(['inspect-web-page', endpoint, targetId, '--include-script-sources'], options), architecture: await rea(['analyze-web-bundle', endpoint, targetId], options), screenshot: await rea(['capture-web-screenshot', endpoint, targetId], options) };
  } else if (/^https?:\/\//i.test(source)) {
    httpUrl(source);
    if (!c.browserExecutable) throw new Error('Set browserExecutable in workspace.local.json, or use active-browser with an existing CDP session');
    const scenario = { browser: { mode: 'launch', executable_path: c.browserExecutable }, start_url: { url: source }, actions: [{ step_id: 'settle', action: 'wait_for_timeout', duration_ms: 1500 }], capture: { at_end: ['url', 'dom', 'accessibility', 'screenshot'] } };
    const scenarioFile = path.join(bundle.directory, 'scenario.json');
    await writeJson(scenarioFile, scenario);
    result = await rea(['capture-browser-scenario', scenarioFile], options);
    bundle.manifest.limitations.push('Website evidence exposes browser-visible behavior only. For script/module architecture, attach a CDP target and analyze-web-bundle.');
  } else {
    if (!path.isAbsolute(source)) throw new Error('Desktop references require an absolute path');
    const stat = await fs.stat(source);
    const ext = path.extname(source).toLowerCase();
    const resolvedKind = kind === 'auto' ? (['.png', '.jpg', '.jpeg', '.webp'].includes(ext) ? 'image' : stat.isDirectory() || ['.asar', '.js', '.mjs', '.cjs'].includes(ext) ? 'javascript' : 'artifact') : kind;
    if (!['image', 'javascript', 'artifact', 'native', 'managed', 'android'].includes(resolvedKind)) throw new Error('Unsupported reference kind');
    bundle.manifest.inputKind = resolvedKind;
    if (resolvedKind === 'image') {
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) throw new Error('Image references require PNG, JPEG or WebP files');
      if (stat.size > 10 * 1024 * 1024) throw new Error('Image must be at most 10 MiB');
      const imageBytes = await fs.readFile(source);
      const valid = ext === '.png' ? imageBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) : ext === '.webp' ? imageBytes.toString('ascii', 0, 4) === 'RIFF' && imageBytes.toString('ascii', 8, 12) === 'WEBP' : imageBytes[0] === 255 && imageBytes[1] === 216;
      if (!valid) throw new Error('Image content does not match its declared format');
      const copy = path.join(bundle.directory, `reference${ext}`);
      await fs.copyFile(source, copy, fs.constants.COPYFILE_EXCL);
      await addEvidence(bundle, copy, { type: 'image' });
      bundle.manifest.limitations.push('Screenshot observations require the calling agent\'s vision model; a screenshot cannot decompile code or reveal hidden architecture.');
      // REA inventories the image artifact while the agent performs semantic vision.
      try { result = await rea(['inspect-artifact', source], options); }
      catch (error) { result = { unavailable: error.message }; bundle.manifest.limitations.push('REA does not decode screenshot semantics; image evidence is available for host vision analysis.'); }
    } else {
      const commands = { javascript: 'analyze-javascript-application', artifact: 'inspect-artifact', native: 'analyze', managed: 'inspect-managed-members', android: 'inspect-android-package' };
      result = await rea([commands[resolvedKind], source], options);
      if (resolvedKind === 'artifact') bundle.manifest.limitations.push('Artifact inventory only. Select native/managed/android explicitly for deeper analysis; native decompilation requires a configured Ghidra, IDA or Hopper provider.');
    }
    if (stat.isFile()) bundle.manifest.sourceSha256 = await addSourceDigest(source);
  }
  await extractScreenshots(bundle, result);
  const file = path.join(bundle.directory, 'rea.json');
  await writeJson(file, result);
  await addEvidence(bundle, file, { type: 'rea' });
  return finish(bundle);
}
async function extractScreenshots(bundle, result) {
  const visited = new Set();
  let count = 0;
  async function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (value.media_type === 'image/png' && typeof value.data_base64 === 'string' && !visited.has(value.sha256)) {
      const file = path.join(bundle.directory, `browser-${++count}.png`);
      await fs.writeFile(file, Buffer.from(value.data_base64, 'base64'), { flag: 'wx' });
      const { digest } = await import('./runtime.mjs');
      if (await digest(file) !== value.sha256) throw new Error('REA screenshot digest mismatch');
      visited.add(value.sha256);
      await addEvidence(bundle, file, { type: 'image' });
    }
    for (const child of Object.values(value)) if (typeof child === 'object') await visit(child);
  }
  await visit(result);
}
async function addSourceDigest(file) { const { digest } = await import('./runtime.mjs'); return digest(file); }

export async function saveBlueprint({ bundleId, visionConfirmed = false, workflows, architecture, unknowns, coverage = [], requireComplete = false }) {
  const bundle = await loadBundle(bundleId);
  if (typeof requireComplete !== 'boolean') throw new Error('requireComplete must be boolean');
  if (bundle.manifest.evidence.some(item => item.type === 'image') && visionConfirmed !== true) throw new Error('Inspect images with a vision model before saving a blueprint; visionConfirmed is a caller attestation');
  for (const [name, values] of Object.entries({ workflows, architecture })) {
    if (!Array.isArray(values) || !values.length) throw new Error(`${name} must contain at least one evidence-linked finding`);
    for (const value of values) {
      if (!value || typeof value.description !== 'string' || !value.description.trim() || !['observed', 'inferred'].includes(value.confidence)) throw new Error('Each finding needs description and confidence: observed/inferred');
      if (!Array.isArray(value.evidence) || !value.evidence.length || value.evidence.some(ref => !bundle.manifest.evidence.some(item => item.file === ref))) throw new Error('Each finding must link to an existing evidence filename');
      for (const ref of value.evidence) {
        const item = bundle.manifest.evidence.find(evidence => evidence.file === ref);
        if (ref !== path.basename(ref) || await digest(path.join(bundle.directory, ref)) !== item.sha256) throw new Error('Referenced evidence digest changed');
      }
    }
  }
  if (!Array.isArray(unknowns) || unknowns.some(item => typeof item !== 'string')) throw new Error('unknowns must be a string array');
  const requirements = scopedRequirements(bundle.manifest.requirements);
  if (!Array.isArray(coverage) || coverage.length > 100) throw new Error('coverage must be an array of at most 100 items');
  const findings = { workflows, architecture };
  const rows = new Map();
  for (const row of coverage) {
    if (!row || !requirements.some(item => item.id === row.requirementId) || rows.has(row.requirementId) || !['covered', 'unknown'].includes(row.status)) throw new Error('Coverage must reference unique declared requirement IDs with status covered or unknown');
    if (row.status === 'covered') {
      if (!Array.isArray(row.findings) || !row.findings.length) throw new Error('Covered requirements need observed finding references');
      for (const ref of row.findings) {
        if (!ref || !['workflows', 'architecture'].includes(ref.section) || !Number.isInteger(ref.index) || ref.index < 0 || !findings[ref.section][ref.index] || findings[ref.section][ref.index].confidence !== 'observed') throw new Error('Covered requirements must reference existing observed findings, not inferences');
      }
      rows.set(row.requirementId, { requirementId: row.requirementId, status: 'covered', findings: row.findings.map(({ section, index }) => ({ section, index })) });
    } else {
      if (typeof row.reason !== 'string' || !row.reason.trim()) throw new Error('Unknown coverage needs an explicit reason');
      rows.set(row.requirementId, { requirementId: row.requirementId, status: 'unknown', reason: row.reason.trim() });
    }
  }
  const assessed = requirements.map(item => ({ ...item, ...(rows.get(item.id) || { requirementId: item.id, status: 'unknown', reason: 'No coverage supplied' }) }));
  const complete = requirements.length > 0 && assessed.every(item => item.status === 'covered') && unknowns.length === 0;
  if (requireComplete && !complete) throw new Error('Evidence coverage incomplete: declare requirements at capture, cover every requirement with observed findings, and resolve explicit unknowns');
  const blueprint = { schema: 'ecc.rea.blueprint.v1', bundleId, repositories: bundle.manifest.repositories, visionConfirmed, workflows, architecture, unknowns, coverage: { complete, requirements: assessed, limitation: 'Scoped caller assessment only; validates evidence links, not semantic truth or discovery of undeclared requirements.' }, implementation: { frontend: 'Map observed UI flows to existing components, hooks and HTTP consumers; preserve approved design tokens.', backend: 'Map supported behavior to existing endpoints, schemas and services; validate contracts and tenant boundaries.', acceptance: 'Compare implementation to cited reference states; test Save/reopen and attachments where applicable.' } };
  const filename = `blueprint-${Date.now()}.json`;
  await writeJson(path.join(bundle.directory, filename), blueprint);
  return { file: path.join(bundle.directory, filename), blueprint };
}
