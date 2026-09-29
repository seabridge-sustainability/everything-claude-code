# Agent Instruction Evals

Small, zero-cost evaluation for the SeaBridgeAI coding-agent instruction system.
Run it whenever an instruction file, the safety block, the goal block, or a
harness changes, and before/after adopting a new model.

## 1. Static checks (no model calls)

```powershell
node scripts\check-instruction-stack.js              # budgets, invariants, stale phrases, broken paths, duplication
node scripts\eval-instruction-scenarios.js           # scenario coverage, working tree
node scripts\eval-instruction-scenarios.js --ref HEAD  # same, as committed (use for before/after)
node tests\ci\instruction-stack.test.js              # the checker's own tests
```

`scenarios.json` holds fifteen representative SeaBridgeAI tasks (single-file bug,
cross-file feature, backend+frontend contract change, tenant bug, Mongo-sensitive
change, concurrent worktree, plan-only request, handoff continuation, external
provider blocker, ambiguous failing test, outcome-versus-activity accounting,
lane-versus-goal blockers, handoff admission, forecast correction, and the
all-null-product control). Each lists the guidance an agent's
startup instructions must deliver and the scaffolding that would push the wrong
behaviour. Patterns are concept-level on purpose, so the old and new wording can
both satisfy them; a pattern that only matches new phrasing makes the eval circular.

The eval scores the **effective** stack: Codex = `AGENTS.md`; Claude Code =
`CLAUDE.md` with `@` imports expanded plus `.claude/rules` without `paths:`.
Files that instructions merely *tell* the agent to read are not counted, because
session logs showed agents rarely read them (1 of 21 backend sessions).

## 2. Fresh-session probes (tiny, in-harness)

Editing an instruction file does not change a running session. To confirm what
a new session receives:

- Claude Code: start a new session (or a general-purpose subagent, which loads
  CLAUDE.md fresh) in the repo and ask, without tool use, for the backend work
  branch, who approves paid calls, and what the deletion rule is. Explore/Plan
  subagents do not load CLAUDE.md and are not valid probes.
- Codex: `codex exec` with the smallest effort in the repo root, same questions.

Record the answers in the modernization report; a wrong answer is an instruction
defect, not a model defect, until shown otherwise.

## 3. Behavioural replay (optional, needs approval for spend)

Plan the bounded cross-harness probe without making model calls:

```powershell
npm run agent-behavior:plan
node scripts/eval-agent-behavior.js --plan --harness codex,claude,gemini --runs 1 --budget-usd 3
```

The default probe asks three read-only instruction questions and records pass
rate, latency, tool calls, retries, tokens, and reported cost. Scenarios request
JSON answers and use field-level semantic assertions; prohibited-text checks are
negation-aware, so correct guidance such as "do not push after each change" is
not scored as harmful merely because it contains the prohibited phrase.

Live execution is local-only and sequential. A code-level ceiling allows at most
nine runs per batch, even if a scenario config requests more. Execution is
disabled unless the current session approved the spend,
`SEABRIDGE_AGENT_EVAL_APPROVED=1` is set, and all other gates pass. If
`--budget-usd` is omitted, the harness uses a conservative **USD 5 total ceiling
for the entire batch**, never per call; provide a lower explicit value whenever
practical. Claude is the hard-capped lane: each run receives a CLI budget and
is isolated with plan mode, no permission prompts, no session persistence,
strict MCP configuration, and only the `Read` tool. Codex and Gemini do not expose
equivalent hard CLI cost caps. Any live batch containing either therefore also
requires `--allow-soft-budget`, which explicitly acknowledges that reported
spend and the hard nine-run ceiling are operational controls, not a dollar cap.

The SeaBridgeAI pack uses three read-only repository fixtures for backend tenant
isolation, frontend browser QA, and a backend/frontend response-contract mismatch.
It is a separate nine-run batch so policy and implementation probes are never
silently combined into an 18-call spend.

```powershell
npm run agent-behavior:seabridge-plan
node scripts/eval-agent-behavior.js --plan --config evals/agent-behavior/seabridge-scenarios.json --budget-usd 3
```

The outcome-control pack targets the long-task failure mode where activity is
reported as delivery, one blocked lane becomes a blocked goal, or an expired
forecast is preserved by redefining "ready". Planning it makes no model calls:

```powershell
npm run agent-behavior:outcome-plan
node scripts/eval-agent-behavior.js --plan --config evals/agent-behavior/outcome-control-scenarios.json --budget-usd 3
```

Run this pack only with the same explicit live-eval approval and budget gates
described below. It is a separate nine-run batch; never append it silently to
another behavioral replay.

```powershell
$env:SEABRIDGE_AGENT_EVAL_APPROVED='1' # set only after current-session approval
# Cross-harness run: explicitly acknowledge Codex/Gemini's soft dollar budget.
node scripts/eval-agent-behavior.js --run --runs 1 --budget-usd 3 --allow-soft-budget

# Claude-only run: hard per-run CLI budgets, so no soft-budget acknowledgement.
node scripts/eval-agent-behavior.js --run --harness claude --runs 1 --budget-usd 1
```

Reports go to ignored `artifacts/agent-runs/behavior-evals/`. The harness writes
a partial checkpoint after every attempt and records an abort reason before
stopping on a reported budget breach. CLI, authentication, timeout, signal,
non-zero-exit, and empty-response failures remain visible as infrastructure
failures but are excluded from the behavioral pass-rate denominator. Run the
probe after an instruction-system or model change, and otherwise no more than
every 30 days. Do not schedule it in GitHub Actions: unattended model calls would
spend quota and defeat the Actions cost policy.

After one or more approved batches, render the ROI comparison locally:

```powershell
npm run agent-behavior:report
node scripts/agent-behavior-report.js --json
```

The report compares valid-run pass rate, infrastructure failures, time per
successful task, tool calls, retries, tokens, and cost per success. Cost per
success divides total batch spend, including failed-attempt spend, by successful
valid runs. It stays `unknown` unless every run for that harness supplied
provider cost telemetry; missing cost is never treated as zero.

The 2026-09-27 hardening and its zero-cost tests made no paid provider calls.

## Future model upgrade checklist

1. Read the vendor's migration / prompting guide for the new model and harness version.
2. Re-verify loading semantics (Claude: memory + imports + rules; Codex: AGENTS.md walk, byte cap).
3. Run section 1 and record the numbers; run section 2 probes on the new model.
4. For each always-loaded line, ask: does the new model still need it? Delete what it does unprompted.
5. Check model/effort defaults in harness config only (`~/.claude/settings.json`, `~/.codex/config.toml`); never restate them in prose.
6. Add a model-specific delta to a repo `AGENTS.md`/`CLAUDE.md` only after a probe or replay shows a real behavioural difference.
