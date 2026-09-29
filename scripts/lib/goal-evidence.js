'use strict';

const fs = require('fs');
const path = require('path');
const { sha256File } = require('./goal-store');

function uniqueRoots(roots = []) {
  return [...new Set(roots.filter(Boolean).map(root => path.resolve(root)))];
}

function isUri(reference) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(reference);
}

function resolveEvidencePath(reference, roots) {
  if (isUri(reference)) {
    throw new Error(`evidence must reference a local artifact, not an unverifiable URI: ${reference}`);
  }
  if (path.isAbsolute(reference)) return path.resolve(reference);
  const candidates = uniqueRoots(roots).map(root => path.resolve(root, reference));
  const found = candidates.find(candidate => fs.existsSync(candidate));
  if (found) return found;
  throw new Error(`evidence file not found for ${reference}; searched: ${candidates.join(', ') || '<no roots>'}`);
}

function verifyEvidenceItem(item, options = {}) {
  const resolved = resolveEvidencePath(item.ref, options.roots || [process.cwd()]);
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
          ...verifyEvidenceItem(item, { roots }),
        });
      } catch (error) {
        throw new Error(`outcome receipt ${receipt.receipt_id}: ${error.message}`);
      }
    }
  }
  return verified;
}

module.exports = {
  evidenceRoots,
  isUri,
  resolveEvidencePath,
  uniqueRoots,
  verifyBundleEvidence,
  verifyEvidenceItem,
};
