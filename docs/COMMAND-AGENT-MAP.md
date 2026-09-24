# Command Ã¢â€ â€™ Agent / Skill Map

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
