#!/usr/bin/env node
'use strict';

// Offline, caller-scoped memory eval. The vault is context, never authority.
const { readMemoryById, searchMemories } = require('./lib/memory-vault');

const HANDOFF_FIELDS = Object.freeze([
  'Objective', 'Current evidence', 'Decision', 'Owner', 'Scope',
  'Source SHA', 'Known limitation', 'Next proof',
]);

function validateHandoffBody(body) {
  const lines = String(body || '').split(/\r?\n/);
  const values = new Map();
  for (const line of lines) {
    const match = line.match(/^- ([A-Za-z ]+):\s*(.+)$/);
    if (match) values.set(match[1], match[2].trim());
  }
  const missing = HANDOFF_FIELDS.filter(field => !values.get(field) || /^(?:todo|tbd|unknown|n\/a)$/i.test(values.get(field)));
  if (values.has('Source SHA') && !/^[0-9a-f]{40}$/i.test(values.get('Source SHA'))) {
    missing.push('Source SHA must be a full commit hash');
  }
  return { valid: missing.length === 0, missing };
}

function evaluateCase(spec, options = {}) {
  const query = String(spec.query || '');
  const expected = Array.isArray(spec.expectedIds) ? spec.expectedIds : [];
  const forbidden = Array.isArray(spec.forbiddenIds) ? spec.forbiddenIds : [];
  const result = searchMemories(query, {
    ...options,
    scopes: spec.scopes || ['project'],
    targetHarness: spec.targetHarness || options.targetHarness,
  });
  const diagnostics = result.diagnostics;
  const complete = diagnostics.invalidFileCount === 0 && diagnostics.skippedSymlinkCount === 0
    && !diagnostics.truncated && !diagnostics.diagnosticsTruncated;
  const citations = result.results.map(item => item.memory.id);
  const missing = expected.filter(id => !citations.includes(id));
  const leaked = forbidden.filter(id => citations.includes(id));
  const unknownCorrect = spec.expectUnknown === undefined
    || (spec.expectUnknown ? citations.length === 0 : citations.length > 0);
  const typedHandoffs = [];
  if (complete && spec.requireTypedHandoff) {
    for (const id of expected) {
      try {
        const entry = readMemoryById(id, { ...options, scopes: spec.scopes || ['project'], targetHarness: spec.targetHarness });
        typedHandoffs.push({ id, ...validateHandoffBody(entry.memory.body) });
      } catch {
        typedHandoffs.push({ id, valid: false, missing: ['complete cited handoff'] });
      }
    }
  }
  return {
    id: spec.id,
    pass: complete && missing.length === 0 && leaked.length === 0 && unknownCorrect
      && typedHandoffs.every(item => item.valid),
    citations,
    missing,
    leaked,
    unknownCorrect,
    scanComplete: complete,
    typedHandoffs,
    trust: 'unreviewed-context-only',
    usableAsInstructions: false,
  };
}

function evaluateSuite(specs, options = {}) {
  const cases = specs.map(spec => evaluateCase(spec, options));
  return { passed: cases.filter(item => item.pass).length, total: cases.length, cases };
}

module.exports = { HANDOFF_FIELDS, evaluateCase, evaluateSuite, validateHandoffBody };
