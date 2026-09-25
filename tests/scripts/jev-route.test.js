#!/usr/bin/env node
'use strict';

const assert = require('assert');
const {
  evaluate,
  routeError,
  routeTask,
  sanitizeState,
  selectReviewers,
} = require('../../scripts/jev-route');

const baseEnv = {
  AI_GATEWAY_API_KEY: 'unit-test-key',
  JEV_ENABLED: 'true',
  JEV_SHADOW_MODE: 'false',
  JEV_TIMEOUT_MS: '1000',
  JEV_MIN_CONFIDENCE: '0.85',
  JEV_REQUIRE_ZDR: 'true',
};

function response(answers) {
  return {
    ok: true,
    status: 200,
    async json() {
      return {
        model: 'typesafe-ai/jev',
        answers,
        usage: { inputTokens: 10, outputTokens: 5 },
        providerMetadata: { gateway: { gatewayCost: '0' } },
      };
    },
  };
}

async function run() {
  assert.strictEqual(
    sanitizeState('AI_GATEWAY_API_KEY=secret-value-that-is-long'),
    'AI_GATEWAY_API_KEY=[REDACTED]',
  );
  assert.ok(!sanitizeState('Bearer abcdefghijklmnopqrstuvwxyz').includes('abcdefghijklmnopqrstuvwxyz'));

  let captured;
  const evaluated = await evaluate({
    state: 'synthetic state',
    questions: { safe: { type: 'boolean', instructions: 'Safe?' } },
    purpose: 'test.zdr',
    sensitive: true,
    env: baseEnv,
    fetchImpl: async (_url, init) => {
      captured = { init, body: JSON.parse(init.body) };
      return response({ safe: { type: 'boolean', probability: 0.99 } });
    },
  });
  assert.strictEqual(captured.init.headers.Authorization, 'Bearer unit-test-key');
  assert.deepStrictEqual(captured.body.providerOptions.gateway, {
    zeroDataRetention: true,
    only: ['typesafe-ai'],
  });
  assert.strictEqual(evaluated.answers.safe.probability, 0.99);

  const task = await routeTask('Fix this assertion failure', {
    env: baseEnv,
    fetchImpl: async () => response({
      decision: {
        type: 'choice',
        choice: 'standard',
        probabilities: { fast: 0.02, standard: 0.96, deep: 0.02 },
      },
    }),
  });
  assert.deepStrictEqual(task.decision, {
    value: 'standard',
    confidence: 0.96,
    applied: true,
    reason: 'accepted',
    latencyMs: task.result.latencyMs,
  });

  const shadow = await routeError('pytest failed', {
    env: { ...baseEnv, JEV_SHADOW_MODE: 'true' },
    fetchImpl: async () => response({
      decision: {
        type: 'choice',
        choice: 'test',
        probabilities: { test: 1, unknown: 0 },
      },
    }),
  });
  assert.strictEqual(shadow.decision.applied, false);
  assert.strictEqual(shadow.decision.reason, 'shadow_mode');

  const blocked = await evaluate({
    state: 'synthetic',
    questions: {},
    sensitive: false,
    env: {
      ...baseEnv,
      JEV_REQUIRE_ZDR: 'false',
      JEV_ALLOW_NON_ZDR: 'false',
    },
    fetchImpl: async () => {
      throw new Error('must not call');
    },
  });
  assert.strictEqual(blocked.skipped, 'non_zdr_not_allowed');

  const reviewers = await selectReviewers('Changed auth and docs', {
    env: baseEnv,
    fetchImpl: async () => response({
      security: { type: 'boolean', probability: 0.99 },
      database: { type: 'boolean', probability: 0.1 },
      accessibility: { type: 'boolean', probability: 0.2 },
      documentation: { type: 'boolean', probability: 0.9 },
    }),
  });
  assert.deepStrictEqual(reviewers.reviewers, ['security', 'documentation']);
  assert.strictEqual(reviewers.applied, true);

  console.log('jev-route tests passed');
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
