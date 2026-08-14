# Command Ã¢â€ â€™ Agent / Skill Map

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


This document lists each slash command and the primary agent(s) or skills it invokes, plus notable direct-invoke agents. Use it to discover which commands use which agents and to keep refactoring consistent.

| Command | Primary agent(s) | Notes |
|---------|------------------|--------|
| `/plan` | planner | Implementation planning before code |
| `/plan-canvas` | — (skill: plan-canvas) | Browser review canvas for plan artifacts: annotate, chat, approve/request changes |
| `/tdd` | tdd-guide | Test-driven development |
| `/code-review` | code-reviewer | Quality and security review |
| `/build-fix` | build-error-resolver | Fix build/type errors |
| `/e2e` | e2e-runner | Playwright E2E tests |
| `/refactor-clean` | refactor-cleaner | Dead code removal |
| `/update-docs` | doc-updater | Documentation sync |
| `/update-codemaps` | doc-updater | Codemaps / architecture docs |
| `/go-review` | go-reviewer | Go code review |
| `/go-test` | tdd-guide | Go TDD workflow |
| `/go-build` | go-build-resolver | Fix Go build errors |
| `/python-review` | python-reviewer | Python code review |
| `/harness-audit` | Ã¢â‚¬â€ | Harness scorecard (no single agent) |
| `/loop-start` | loop-operator | Start autonomous loop |
| `/loop-status` | loop-operator | Inspect loop status |
| `/quality-gate` | Ã¢â‚¬â€ | Quality pipeline (hook-like) |
| `/model-route` | Ã¢â‚¬â€ | Model recommendation (no agent) |
| `/orchestrate` | planner, tdd-guide, code-reviewer, security-reviewer, architect | Multi-agent handoff |
| `/multi-plan` | architect (Codex/Gemini prompts) | Multi-model planning |
| `/multi-execute` | architect / frontend prompts | Multi-model execution |
| `/multi-backend` | architect | Backend multi-service |
| `/multi-frontend` | architect | Frontend multi-service |
| `/multi-workflow` | architect | General multi-service |
| `/learn` | Ã¢â‚¬â€ | continuous-learning skill, instincts |
| `/learn-eval` | Ã¢â‚¬â€ | continuous-learning-v2, evaluate then save |
| `/instinct-status` | Ã¢â‚¬â€ | continuous-learning-v2 |
| `/instinct-import` | Ã¢â‚¬â€ | continuous-learning-v2 |
| `/instinct-export` | Ã¢â‚¬â€ | continuous-learning-v2 |
| `/evolve` | Ã¢â‚¬â€ | continuous-learning-v2, cluster instincts |
| `/promote` | Ã¢â‚¬â€ | continuous-learning-v2 |
| `/projects` | Ã¢â‚¬â€ | continuous-learning-v2 |
| `/skill-create` | Ã¢â‚¬â€ | skill-create-output script, git history |
| `/checkpoint` | Ã¢â‚¬â€ | verification-loop skill |
| `/verify` | Ã¢â‚¬â€ | verification-loop skill |
| `/eval` | Ã¢â‚¬â€ | eval-harness skill |
| `/test-coverage` | Ã¢â‚¬â€ | Coverage analysis |
| `/sessions` | Ã¢â‚¬â€ | Session history |
| `/setup-pm` | Ã¢â‚¬â€ | Package manager setup script |
| `/claw` | Ã¢â‚¬â€ | NanoClaw CLI (scripts/claw.js) |
| `/pm2` | Ã¢â‚¬â€ | PM2 service lifecycle |
| `/security-scan` | security-reviewer (skill) | AgentShield via security-scan skill |

## Non-Slash CLI Surfaces

| CLI surface | Primary skill/runtime | Notes |
|-------------|-----------------------|-------|
| `ecc memory init` | unified-memory / `scripts/memory.js` | Initialize project, team, or user Markdown vault scopes |
| `ecc memory save` | unified-memory / `scripts/memory.js` | Create unreviewed memory; body must come from stdin or a regular file |
| `ecc memory handoff` | unified-memory / `scripts/memory.js` | Create a targeted, cross-harness handoff |
| `ecc memory search` | unified-memory / `scripts/memory.js` | Bounded lexical search over selected vault scopes |
| `ecc memory read` | unified-memory / `scripts/memory.js` | Read one memory plus derived backlinks |
| `ecc memory doctor` | unified-memory / `scripts/memory.js` | Audit malformed files, duplicate IDs, broken links, and symlinks |
| `ecc-memory-mcp` | unified-memory / `scripts/memory-mcp.mjs` | Optional stdio MCP adapter; exposes save/search/read/doctor only |

## Direct-Use Agents

| Direct agent | Purpose | Scope | Notes |
|--------------|---------|-------|-------|
| `typescript-reviewer` | TypeScript/JavaScript code review | TypeScript/JavaScript projects | Invoke the agent directly when a review needs TS/JS-specific findings and there is no dedicated slash command yet. |

## Skills referenced by commands

- **continuous-learning**, **continuous-learning-v2**: `/learn`, `/learn-eval`, `/instinct-*`, `/evolve`, `/promote`, `/projects`
- **verification-loop**: `/checkpoint`, `/verify`
- **eval-harness**: `/eval`
- **security-scan**: `/security-scan` (runs AgentShield)
- **strategic-compact**: suggested at compaction points (hooks)
- **unified-memory**: `ecc memory ...` and the opt-in `ecc-memory-mcp` server

## How to use this map

- **Discoverability:** Find which command triggers which agent (e.g. Ã¢â‚¬Å“use `/code-review` for code-reviewerÃ¢â‚¬Â).
- **Refactoring:** When renaming or removing an agent, search this doc and the command files for references.
- **CI/docs:** The catalog script (`node scripts/ci/catalog.js`) outputs agent/command/skill counts; this map complements it with commandÃ¢â‚¬â€œagent relationships.
