'use strict';

const fs = require('fs');
const path = require('path');
const { sha256File } = require('./goal-store');
const crypto = require('crypto');

// Explicit, digest-pinned relocation records only. These recover artifact identity,
// never refresh code fingerprints, ownership, acceptance or scientific eligibility.
function loadEvidenceMaps(specs = []) {
  const mappings = [];
  for (const spec of specs) {
    const match = /^([a-f0-9]{64})=(.+)$/i.exec(spec);
    if (!match) throw new Error('--evidence-map requires SHA256=FILE');
    const file = path.resolve(match[2]);
    const size = fs.statSync(file).size;
    if (size > 16 * 1024 * 1024) throw new Error('evidence map exceeds 16 MiB');
    const bytes = fs.readFileSync(file);
    const digest = crypto.createHash('sha256').update(bytes).digest('hex');
    if (digest !== match[1].toLowerCase()) throw new Error(`evidence map hash mismatch: ${file}`);
    const document = JSON.parse(bytes.toString('utf8'));
    const entries = [...(document.relocated_roots || [])];
    // Recovery ledgers sometimes preserved individual private paths, not a root.
    for (const row of document.rows || []) {
      for (const item of row.preserved || []) {
        if (item.identity_preserved !== true) continue;
        if (typeof row.source !== 'string' || !path.isAbsolute(row.source) || isUri(row.source)
            || typeof item.relative !== 'string' || !item.relative || path.isAbsolute(item.relative)) {
          throw new Error(`evidence ledger requires an absolute root and contained relative path: ${file}`);
        }
        const source = path.resolve(row.source, item.relative);
        const suffix = path.relative(row.source, source);
        if (path.isAbsolute(suffix) || suffix === '..' || suffix.startsWith(`..${path.sep}`)) {
          throw new Error(`evidence ledger path escapes source root: ${file}`);
        }
        entries.push({ source, destination: item.destination });
      }
    }
    if (!entries.length) throw new Error(`evidence map has no verified relocation entries: ${file}`);
    for (const entry of entries) {
      if (typeof entry.source !== 'string' || typeof entry.destination !== 'string'
          || isUri(entry.source) || isUri(entry.destination)
          || !path.isAbsolute(entry.source) || !path.isAbsolute(entry.destination)) {
        throw new Error(`evidence map requires absolute local source/destination paths: ${file}`);
      }
      mappings.push({ source: path.resolve(entry.source), destination: path.resolve(entry.destination) });
    }
  }
  return mappings;
}

function relocateEvidencePath(original, mappings = []) {
  const matches = [];
  for (const mapping of mappings) {
    const suffix = path.relative(mapping.source, original);
    if (path.isAbsolute(suffix) || suffix === '..' || suffix.startsWith(`..${path.sep}`)) continue;
    matches.push({ source: mapping.source, candidate: path.resolve(mapping.destination, suffix) });
  }
  // Most-specific ledger entry wins; ambiguous entries fail, never guess by basename.
  matches.sort((a, b) => b.source.length - a.source.length);
  if (!matches.length) return null;
  const best = matches.filter(item => item.source.length === matches[0].source.length);
  const candidates = [...new Set(best.map(item => item.candidate))];
  if (candidates.length !== 1) throw new Error(`ambiguous evidence relocation for ${original}`);
  return fs.existsSync(candidates[0]) ? candidates[0] : null;
}

function uniqueRoots(roots = []) {
  return [...new Set(roots.filter(Boolean).map(root => path.resolve(root)))];
}

function isUri(reference) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(reference);
}

function resolveEvidencePath(reference, roots, mappings = []) {
  if (isUri(reference)) {
    throw new Error(`evidence must reference a local artifact, not an unverifiable URI: ${reference}`);
  }
  const candidates = path.isAbsolute(reference) ? [path.resolve(reference)]
    : uniqueRoots(roots).map(root => path.resolve(root, reference));
  const found = candidates.find(candidate => fs.existsSync(candidate));
  if (found) return found;
  for (const candidate of candidates) {
    const relocated = relocateEvidencePath(candidate, mappings);
    if (relocated) return relocated;
  }
  throw new Error(`evidence file not found for ${reference}; searched: ${candidates.join(', ') || '<no roots>'}`);
}

function verifyEvidenceItem(item, options = {}) {
  const resolved = resolveEvidencePath(item.ref, options.roots || [process.cwd()], options.mappings);
  const actual = sha256File(resolved);
  if (actual.toLowerCase() !== item.sha256.toLowerCase()) {
    throw new Error(`evidence hash mismatch for ${item.ref}: expected ${item.sha256}, got ${actual}`);
  }
  return {
    kind: item.kind,
    ref: item.ref,
    resolved,
    sha256: actual,
    size_bytes: fs.statSync(resolved).size,
  };
}

function evidenceRoots(bundle, options = {}) {
  const roots = [...(options.roots || [])];
  if (bundle.resume?.repository_states) {
    roots.push(...bundle.resume.repository_states.map(state => state.repo_root));
  }
  if (bundle.resume?.repository_state?.repo_root) roots.push(bundle.resume.repository_state.repo_root);
  roots.push(process.cwd());
  return uniqueRoots(roots);
}

const TERMINAL_INTEGRATION_OUTCOMES = new Set(['superseded', 'not_adopted']);

// A receipt is historical only when a STRICTLY LATER receipt for the same assignment
// is an explicit terminal state (superseded/not_adopted, which validateBundle already
// requires to carry a reason) that itself pins at least one evidence item. A later
// 'pass' or 'fail' is not an explicit retirement, so earlier receipts stay strict.
// The latest receipt, equal-timestamp receipts and every other ledger are never
// historical. Pure and deterministic: ties on observed_at resolve by ledger order.
function classifyHistoricalIntegrations(integrations = []) {
  const byAssignment = new Map();
  (integrations || []).forEach((receipt, index) => {
    const time = Date.parse(receipt.observed_at);
    const list = byAssignment.get(receipt.assignment_id) || [];
    list.push({ receipt, index, time });
    byAssignment.set(receipt.assignment_id, list);
  });
  const historical = [];
  for (const [assignmentId, entries] of byAssignment) {
    const latest = entries.reduce((best, entry) => (
      entry.time > best.time || (entry.time === best.time && entry.index > best.index) ? entry : best
    ));
    if (!TERMINAL_INTEGRATION_OUTCOMES.has(latest.receipt.outcome)) continue;
    if (!Array.isArray(latest.receipt.evidence) || !latest.receipt.evidence.length) continue;
    if (!Number.isFinite(latest.time)) continue;
    for (const entry of entries) {
      if (entry.receipt !== latest.receipt && Number.isFinite(entry.time) && entry.time < latest.time) {
        historical.push({
          receipt_id: entry.receipt.receipt_id,
          assignment_id: assignmentId,
          superseded_by: latest.receipt.receipt_id,
          outcome: latest.receipt.outcome,
        });
      }
    }
  }
  return historical;
}

function verifyBundleEvidence(bundle, options = {}) {
  const roots = evidenceRoots(bundle, options);
  const verified = [];
  const superseded = new Set((bundle.outcomes || []).flatMap(receipt => receipt.supersedes || []));
  const current = (bundle.outcomes || []).filter(receipt => (
    receipt.status === 'accepted' && !superseded.has(receipt.receipt_id)
  ));
  for (const receipt of current) {
    for (const item of receipt.evidence || []) {
      try {
        verified.push({
          receipt_id: receipt.receipt_id,
          ...verifyEvidenceItem(item, { roots, mappings: options.mappings }),
        });
      } catch (error) {
        throw new Error(`outcome receipt ${receipt.receipt_id}: ${error.message}`);
      }
    }
  }
  const historical = new Set(classifyHistoricalIntegrations(bundle.integrations).map(item => item.receipt_id));
  for (const receipt of bundle.integrations || []) {
    // Retired history stays in the ledger and schema-validated, but its pinned live
    // files are not re-hashed once a later terminal receipt re-pins the current state.
    if (historical.has(receipt.receipt_id)) continue;
    for (const item of receipt.evidence || []) {
      try {
        verified.push({
          receipt_id: receipt.receipt_id,
          ...verifyEvidenceItem(item, { roots, mappings: options.mappings }),
        });
      } catch (error) {
        throw new Error(`integration receipt ${receipt.receipt_id}: ${error.message}`);
      }
    }
  }
  return verified;
}

module.exports = {
  classifyHistoricalIntegrations,
  evidenceRoots,
  isUri,
  loadEvidenceMaps,
  relocateEvidencePath,
  resolveEvidencePath,
  uniqueRoots,
  verifyBundleEvidence,
  verifyEvidenceItem,
};
