---
name: agent-eval
description: Measure coding-agent instruction or model changes with reproducible pass-rate, latency, tool-use, retry, token, and cost evidence. Use for explicit agent comparisons or regressions, not ordinary code verification.
license: MIT
metadata:
  origin: ECC
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Agent Evaluation

Use deterministic checks before spending model quota. A live replay is a paid or
quota-consuming action and requires current-session approval under `AGENTS.md`.

## SeaBridge instruction checks

For changes to startup instructions, adapters, or model defaults:

1. Run the zero-cost instruction and scenario checks.
2. Preview the live batch with `npm run agent-behavior:plan`.
3. If a live comparison is approved, run the smallest representative batch.
4. Compare pass rate, latency, tool calls, retries, tokens, and observed cost.

```powershell
node scripts/check-instruction-stack.js
node scripts/eval-instruction-scenarios.js
npm run agent-behavior:test
npm run agent-behavior:plan
```

Live Codex, Claude, and Gemini probes use
`scripts/eval-agent-behavior.js`. They are read-only, sequential, limited to
nine runs per batch, and require both an approved budget and the explicit
`SEABRIDGE_AGENT_EVAL_APPROVED=1` acknowledgement. Do not put live probes in
GitHub Actions.

## Implementation comparisons

When comparing agents on code changes, use 3-5 real tasks pinned to a commit and
an isolated worktree per run. Every task needs at least one deterministic judge
such as a focused test, build, schema check, or runtime assertion. Use an LLM
judge only for qualities that deterministic checks cannot measure.

Run repeated trials only when variance matters. Start with one smoke run per
candidate; expand to three or more after the task and judge are proven useful.

## Report

Record:

- pinned repository revision and task definition;
- agent, model, and relevant harness version;
- trials, passes, and deterministic failure reasons;
- median latency, tool calls, retries, tokens, and cost coverage;
- skipped or unavailable metrics;
- recommendation with the quality/cost tradeoff.

Never rank an agent from one anecdotal run or treat missing cost telemetry as
zero cost.
