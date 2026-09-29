'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CAPABILITY_PATH = path.join(ROOT, 'manifests', 'goal-runtime-capabilities.json');
const ADAPTER_PATH = path.join(ROOT, 'manifests', 'instruction-adapters.json');

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadCapabilities() {
  return loadJson(CAPABILITY_PATH);
}

function validateCapabilities(capabilities = loadCapabilities(), options = {}) {
  const root = options.root || ROOT;
  const adapterManifest = loadJson(options.adapterPath || ADAPTER_PATH);
  const evidenceText = options.evidenceText || {};
  const errors = [];
  const adapterIds = new Set(adapterManifest.adapters.map(adapter => adapter.id));
  const runtimeIds = new Set();
  for (const runtime of capabilities.runtimes || []) {
    if (runtimeIds.has(runtime.id)) errors.push(`duplicate runtime ${runtime.id}`);
    runtimeIds.add(runtime.id);
    if (!adapterIds.has(runtime.id)) errors.push(`runtime ${runtime.id} has no instruction adapter`);
    if (!['native', 'hybrid', 'wrapper', 'instruction'].includes(runtime.tier)) {
      errors.push(`runtime ${runtime.id} has invalid tier ${runtime.tier}`);
    }
    if (!['native', 'wrapper', 'instruction'].includes(runtime.admission)) {
      errors.push(`runtime ${runtime.id} has invalid admission surface ${runtime.admission}`);
    }
    if (!['native', 'wrapper', 'instruction'].includes(runtime.final_claim)) {
      errors.push(`runtime ${runtime.id} has invalid final claim surface ${runtime.final_claim}`);
    }
    if (runtime.tier === 'native' && (!runtime.native_events || runtime.native_events.length < 2)) {
      errors.push(`native runtime ${runtime.id} must declare admission and final lifecycle events`);
    }
    const runtimeEvidence = [];
    for (const source of runtime.evidence || []) {
      const sourcePath = path.join(root, source);
      if (Object.prototype.hasOwnProperty.call(evidenceText, source)) {
        runtimeEvidence.push(String(evidenceText[source]));
      } else if (!fs.existsSync(sourcePath)) {
        errors.push(`runtime ${runtime.id} evidence is missing: ${source}`);
      } else {
        runtimeEvidence.push(fs.readFileSync(sourcePath, 'utf8'));
      }
    }
    if (runtime.tier === 'native' && !runtimeEvidence.some(text => /goal-runtime-(?:gate|bridge)|runGoalRuntime/.test(text))) {
      errors.push(`native runtime ${runtime.id} does not invoke the canonical goal runtime gate`);
    }
  }
  for (const adapterId of adapterIds) {
    if (!runtimeIds.has(adapterId)) errors.push(`instruction adapter ${adapterId} has no goal runtime capability`);
  }
  if (!capabilities.model_policy || !/telemetry only/i.test(capabilities.model_policy)) {
    errors.push('model policy must state that model identity is telemetry only');
  }
  for (const family of capabilities.model_families || []) {
    if (family.policy !== 'inherited_from_runtime') {
      errors.push(`model family ${family.id} defines a separate outcome policy`);
    }
  }
  return errors;
}

function runtimeById(id, capabilities = loadCapabilities()) {
  const runtime = capabilities.runtimes.find(item => item.id === id);
  if (!runtime) throw new Error(`unknown goal runtime: ${id}`);
  return runtime;
}

function classifyTaskText(text) {
  const source = String(text || '');
  const reasons = [];
  const checks = [
    [/\/goal\b/i, 'explicit /goal request'],
    [/\b(resume|handoff|continue inherited|continue working)\b/i, 'resumed or inherited work'],
    [/\b(multi-agent|parallel agents?|subagents?)\b/i, 'multi-agent work'],
    [/\b(cross[- ]repo|backend and frontend|multiple repositories)\b/i, 'cross-repository work'],
    [/\b(deploy|migration|production|tenant isolation|authentication|security review)\b/i, 'high-risk work'],
    [/\b(provider|paid api|live model|cloud resource)\b/i, 'provider-dependent work'],
    [/\b(do not stop|until (it is|you are) finished|long-running|multi-day)\b/i, 'long-running work'],
  ];
  for (const [pattern, reason] of checks) if (pattern.test(source)) reasons.push(reason);
  if (reasons.length) return { mode: 'controlled', reasons };
  if (/\b(implement|fix|build|refactor|change|edit)\b/i.test(source)) {
    return { mode: 'standard', reasons: ['implementation task'] };
  }
  return { mode: 'lightweight', reasons: ['read-only or small task'] };
}

function admissionDecision({ runtimeId, mode, goalExists, goalValid = false, model = null }, capabilities = loadCapabilities()) {
  const runtime = runtimeById(runtimeId, capabilities);
  if (mode === 'controlled' && !goalExists) {
    return {
      admitted: false,
      runtime: runtime.id,
      model,
      mode,
      tier: runtime.tier,
      reason: 'controlled work requires an active goal before implementation',
      next_action: 'Run ecc goal init from a reviewed goal contract, then retry admission.',
    };
  }
  if (goalExists && !goalValid) {
    return {
      admitted: false,
      runtime: runtime.id,
      model,
      mode,
      tier: runtime.tier,
      reason: 'active goal exists but did not pass validation',
      next_action: 'Repair the goal records and run ecc goal validate.',
    };
  }
  return {
    admitted: true,
    runtime: runtime.id,
    model,
    mode,
    tier: runtime.tier,
    reason: goalExists ? 'active goal validated' : 'task mode does not require controlled-goal state',
    next_action: null,
  };
}

function inferClaim(text) {
  const source = String(text || '');
  if (!/\b(not|isn't|is not)\s+(done|complete|completed|finished)\b/i.test(source)
      && /\b(done|complete|completed|finished|goal achieved|fully functional)\b/i.test(source)) return 'complete';
  if (!/\bnot\s+blocked\b/i.test(source)
      && /\b(goal|task|work)\b.{0,30}\bblocked\b|\bblocked as a whole\b/i.test(source)) return 'blocked';
  if (/\bon[ -]track\b/i.test(source)) return 'on-track';
  return null;
}

module.exports = {
  ADAPTER_PATH,
  CAPABILITY_PATH,
  ROOT,
  admissionDecision,
  classifyTaskText,
  inferClaim,
  loadCapabilities,
  runtimeById,
  validateCapabilities,
};
