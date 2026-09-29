# Command Ã¢â€ â€™ Agent / Skill Map

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
| `ecc goal init` | goal protocol / `scripts/goal-control.js` | Create a controlled goal from a reviewed YAML or JSON contract |
| `ecc goal profiles` | goal protocol / `manifests/goal-proof-profiles.json` | List the nine risk-scaled minimum proof contracts shared by every runtime and model |
| `ecc goal checkpoint` | goal protocol / `scripts/goal-control.js` | Refresh the promised next proof and forecast |
| `ecc goal correct` | goal protocol / `scripts/goal-control.js` | Make the newest owner correction replace priority, checkpoint, and next action; stale plans fail validation |
| `ecc goal record` | goal protocol / `scripts/goal-control.js` | Hash local evidence and append an outcome receipt |
| `ecc goal assign` | goal protocol / `scripts/goal-control.js` | Issue a scoped delegated assignment with a lease and hard tool, retry, CI, and cost budgets |
| `ecc goal integrate` | goal protocol / `scripts/goal-control.js` | Record parent-reviewed integration evidence; worker self-attestation cannot complete an assignment |
| `ecc goal watch-config` | goal protocol / `scripts/goal-control.js` | Set the proof window and activity, retry, CI, and cost ceilings for a controlled goal |
| `ecc goal activity` | goal protocol / `scripts/goal-control.js` | Append measured activity or an explicit tactic change without misclassifying it as product evidence |
| `ecc goal watch` | goal protocol / `scripts/goal-control.js` | Detect activity plateaus and budget breaches; require a tactic change before on-track is available |
| `ecc goal resume` | goal protocol / `scripts/goal-control.js` | Capture repository state before continuing inherited work |
| `ecc goal handoff` | goal protocol / `scripts/goal-control.js` | Record successor-ready current state and history |
| `ecc goal validate` | goal protocol / `scripts/goal-control.js` | Validate portable active-goal, outcome, and resume records |
| `ecc goal status` | goal protocol / `scripts/goal-control.js` | Report demonstrated proof stages rather than activity totals |
| `ecc goal claim` | goal protocol / `scripts/goal-control.js` | Gate complete, blocked, and on-track claims against current receipts |
| `ecc goal-runtime admit` | goal protocol / `scripts/goal-runtime-bridge.js` | Apply risk-scaled admission through the same canonical engine for every registered runtime and model |
| `ecc goal-runtime final` | goal protocol / `scripts/goal-runtime-bridge.js` | Gate a runtime's complete, blocked, or on-track claim against the active goal evidence |
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
