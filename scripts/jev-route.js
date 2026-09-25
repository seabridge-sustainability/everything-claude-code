#!/usr/bin/env node
'use strict';

/**
 * Dependency-free TypeSafe Jev router for coding-agent decisions.
 *
 * Reads AI_GATEWAY_API_KEY only from the process environment. It never prints
 * the key or raw state. Default policy is disabled, shadow-only, and ZDR.
 */

const ENDPOINT = 'https://ai-gateway.vercel.sh/v1/evaluate';
const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on']);

function envBool(env, name, fallback) {
  if (typeof env[name] === 'undefined' || env[name] === null) return fallback;
  return TRUE_VALUES.has(String(env[name]).trim().toLowerCase());
}

function sanitizeState(value) {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value);
  return serialized
    .replace(/\b(?:vck|sk|ghp|github_pat)_[A-Za-z0-9_-]{12,}\b/g, '[REDACTED_TOKEN]')
    .replace(/\bBearer\s+[A-Za-z0-9._~+/-]{12,}/gi, 'Bearer [REDACTED]')
    .replace(/\b([A-Z][A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD))\s*=\s*\S+/g, '$1=[REDACTED]')
    .slice(0, 12000);
}

function confidence(answer) {
  if (!answer || typeof answer !== 'object') return 0;
  if (answer.type === 'boolean' && Number.isFinite(answer.probability)) {
    return Math.max(answer.probability, 1 - answer.probability);
  }
  const values = Object.values(answer.probabilities || {}).filter(Number.isFinite);
  return values.length ? Math.max(...values) : 0;
}

async function evaluate({
  state,
  questions,
  purpose = 'coding.route',
  sensitive = true,
  env = process.env,
  fetchImpl = globalThis.fetch,
}) {
  if (!envBool(env, 'JEV_ENABLED', false)) return { skipped: 'disabled' };
  if (!env.AI_GATEWAY_API_KEY) return { skipped: 'missing_key' };
  const requireZdr = sensitive || envBool(env, 'JEV_REQUIRE_ZDR', true);
  if (!requireZdr && !envBool(env, 'JEV_ALLOW_NON_ZDR', false)) {
    return { skipped: 'non_zdr_not_allowed' };
  }
  if (typeof fetchImpl !== 'function') return { skipped: 'fetch_unavailable' };

  const payload = {
    model: env.JEV_MODEL || 'typesafe-ai/jev',
    state: sanitizeState(state),
    questions,
    ...(requireZdr
      ? { providerOptions: { gateway: { zeroDataRetention: true, only: ['typesafe-ai'] } } }
      : {}),
  };
  const timeoutMs = Number(env.JEV_TIMEOUT_MS || 800);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();
  try {
    const response = await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.AI_GATEWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { skipped: 'gateway_error', status: response.status, purpose };
    }
    const body = await response.json();
    if (!body || typeof body.answers !== 'object') {
      return { skipped: 'invalid_response', purpose };
    }
    return {
      model: body.model,
      answers: body.answers,
      usage: body.usage || {},
      costUsd: body.providerMetadata?.gateway?.gatewayCost ?? null,
      latencyMs: Math.round(performance.now() - started),
      shadow: envBool(env, 'JEV_SHADOW_MODE', true),
      minConfidence: Number(env.JEV_MIN_CONFIDENCE || 0.85),
      purpose,
    };
  } catch (error) {
    return { skipped: error?.name === 'AbortError' ? 'timeout' : 'transport_error', purpose };
  } finally {
    clearTimeout(timer);
  }
}

function choiceDecision(result, name = 'decision') {
  const answer = result?.answers?.[name];
  if (!answer || answer.type !== 'choice' || typeof answer.choice !== 'string') return null;
  const score = confidence(answer);
  const applied = !result.shadow && score >= result.minConfidence;
  return {
    value: answer.choice,
    confidence: score,
    applied,
    reason: result.shadow ? 'shadow_mode' : score < result.minConfidence ? 'below_confidence' : 'accepted',
    latencyMs: result.latencyMs,
  };
}

async function routeTask(state, options = {}) {
  const result = await evaluate({
    state,
    questions: {
      decision: {
        type: 'choice',
        instructions: 'Choose the safest and least expensive adequate execution tier.',
        criteria: {
          fast: 'Simple lookup, formatting, inventory, or deterministic localized change.',
          standard: 'Ordinary implementation or debugging with moderate reasoning.',
          deep: 'Architecture, cross-repository design, difficult diagnosis, or broad refactor.',
          security: 'Authentication, authorization, secrets, tenant isolation, or vulnerability work.',
          manual: 'Requires a human product decision, approval, production access, or unclear scope.',
        },
      },
    },
    purpose: 'coding.task_route',
    ...options,
  });
  return { result, decision: choiceDecision(result) };
}

async function routeError(state, options = {}) {
  const result = await evaluate({
    state,
    questions: {
      decision: {
        type: 'choice',
        instructions: 'Route this failure to exactly one diagnostic category.',
        criteria: {
          test: 'Test assertion or test-runner failure.',
          type: 'Static type-checking or schema type failure.',
          lint: 'Linting, formatting, or style enforcement failure.',
          dependency: 'Missing, incompatible, or vulnerable dependency.',
          environment: 'Machine, credential, network, path, or configuration issue.',
          security: 'Possible vulnerability, secret exposure, or unsafe behavior.',
          unknown: 'The evidence does not support another category.',
        },
      },
    },
    purpose: 'coding.error_route',
    ...options,
  });
  return { result, decision: choiceDecision(result) };
}

async function selectReviewers(state, options = {}) {
  const dimensions = {
    security: 'Does this change require a security reviewer?',
    database: 'Does this change require a database or persistence reviewer?',
    accessibility: 'Does this change require an accessibility reviewer?',
    documentation: 'Does this change require a documentation reviewer?',
  };
  const questions = Object.fromEntries(
    Object.entries(dimensions).map(([name, instructions]) => [
      name,
      {
        type: 'boolean',
        instructions,
        criteria: {
          true: `The ${name} dimension is materially affected.`,
          false: `The ${name} dimension is not materially affected.`,
        },
      },
    ]),
  );
  const result = await evaluate({
    state,
    questions,
    purpose: 'coding.reviewer_selection',
    ...options,
  });
  if (!result.answers) return { result, reviewers: [], applied: false };
  const reviewers = Object.entries(result.answers)
    .filter(([, answer]) => answer.type === 'boolean' && answer.probability >= result.minConfidence)
    .map(([name]) => name);
  return { result, reviewers, applied: !result.shadow };
}

async function runCli() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  let input;
  try {
    const stdinText = chunks
      .map(chunk => Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk))
      .join('')
      .replace(/^\uFEFF/, '')
      .trim();
    input = JSON.parse(stdinText);
  } catch {
    process.stderr.write('jev-route: stdin must be valid JSON\n');
    process.exitCode = 2;
    return;
  }
  const options = { sensitive: input.sensitive !== false };
  const handlers = { task: routeTask, error: routeError, reviewers: selectReviewers };
  const handler = handlers[input.kind];
  if (!handler) {
    process.stderr.write('jev-route: kind must be task, error, or reviewers\n');
    process.exitCode = 2;
    return;
  }
  const output = await handler(input.state, options);
  process.stdout.write(`${JSON.stringify(output)}\n`);
}

module.exports = {
  confidence,
  evaluate,
  routeError,
  routeTask,
  sanitizeState,
  selectReviewers,
};

if (require.main === module) {
  runCli().catch(() => {
    process.stderr.write('jev-route: unexpected failure\n');
    process.exitCode = 1;
  });
}
