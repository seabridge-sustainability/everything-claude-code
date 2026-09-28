'use strict';

const CONTRACTS = Object.freeze({
  'tdd-workflow': {
    required: [/repository-owned coverage/i, /Select unit, integration, E2E, eval, or runtime checks by boundary and risk/i],
    forbidden: [/Minimum Test Coverage:\s*80%|80%\+ coverage|ALL required/i],
  },
  'verification-loop': {
    required: [/Do not run verification on a timer/i, /smallest verification ladder/i],
    forbidden: [/every 15 minutes|15-minute/i],
  },
  'requesting-code-review': {
    required: [/skills\/sea-senior-dev-workflow\/SKILL\.md/, /If that file is unavailable/i],
    forbidden: [],
  },
  'receiving-code-review': {
    required: [/skills\/sea-senior-dev-workflow\/SKILL\.md/, /repository evidence/i],
    forbidden: [],
  },
  'verification-before-completion': {
    required: [/skills\/verification-loop\/SKILL\.md/, /fresh behavior evidence/i],
    forbidden: [],
  },
});

function behaviorFailures(name, text) {
  const contract = CONTRACTS[name];
  if (!contract) return [];
  const failures = [];
  for (const pattern of contract.required) {
    if (!pattern.test(text)) failures.push(`missing behavior ${pattern}`);
  }
  for (const pattern of contract.forbidden) {
    if (pattern.test(text)) failures.push(`forbidden behavior ${pattern}`);
  }
  return failures;
}

module.exports = { CONTRACTS, behaviorFailures };
