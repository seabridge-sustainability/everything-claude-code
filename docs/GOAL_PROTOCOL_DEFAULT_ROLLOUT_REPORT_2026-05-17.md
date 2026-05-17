# /goal Default Protocol Rollout Report

Date: 2026-05-17

## 1. Repos Scanned

Authorized repos scanned and updated:

- `C:\Users\adelm\SeaBridgeAI\everything-claude-code`
- `C:\Users\adelm\SeaBridgeAI\manageesg-backend`
- `C:\Users\adelm\SeaBridgeAI\manageesg-frontend`
- `C:\Users\adelm\SeaBridgeAI\openseabri`
- `C:\Users\adelm\SeaBridgeAI\legacy-external-skills-repo`
- `C:\Users\adelm\SeaBridgeAI\climada-stack`
- `C:\Users\adelm\SeaBridgeAI\autoresearch`

Also updated inside the backend worktree:

- `C:\Users\adelm\SeaBridgeAI\manageesg-backend\seabridge-dev`

`_upstream` was audited earlier but not modified because the write authorization did not include `_upstream`, and removal of the empty backup prompt was explicitly not approved.

## 2. Branches Created

Created or reused local branch:

- `goal_protocol_default`

Confirmed in all seven authorized repos. No pull, push, commit, or dependency install was performed.

## 3. Files Created

ECC canonical protocol and integration:

- `protocols/GOAL_PROTOCOL.md`
- `protocols/GOAL_PROTOCOL_SHORT.md`
- `skills/goal-default/SKILL.md`
- `docs/GSD_GOAL_PROTOCOL_INTEGRATION.md`
- `docs/SPECKIT_GOAL_PROTOCOL_INTEGRATION.md`
- `scripts/sync-goal-protocol.ps1`
- `scripts/sync-goal-protocol-all.ps1`

OpenSeaBri runtime planning:

- `openseabri/docs/agent-harness/OPENSEABRI_GOAL_PROTOCOL_RUNTIME_PLAN.md`

Top-level instruction files created where missing:

- `CODEX.md`
- `GEMINI.md`
- `OPENCODE.md`
- missing `AGENT.md` / `AGENTS.md` / `CLAUDE.md` variants in support repos and `seabridge-dev`.

## 4. Files Updated

Updated top-level agent instruction files in authorized repos:

- `AGENT.md`
- `AGENTS.md`
- `AGENTS_SYSTEM.md` where present
- `CLAUDE.md`
- `CODEX.md`
- `GEMINI.md`
- `OPENCODE.md`

Updated ECC shared system pointers:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENT_SKILLS.md`
- legacy `docs/GOAL_PROTOCOL_DEFAULT.md` now points to the new canonical protocol path.

## 5. Empty Files Repaired

No empty agent instruction files remained in the authorized repos after the rollout.

The known empty `_upstream` backup prompt remains unchanged:

- `_upstream/space-agent/app/L0/_all/mod/_core/onscreen_agent/prompts/system-prompt.backup-before-026B-imperative-followthrough-2026-04-06.md`

## 6. Skills Updated

Added compact `/goal` inheritance blocks to:

- ECC canonical `skills/sea-*`
- ECC `.agents/skills/sea-*` wrappers
- ECC reviewer skill wrappers
- ECC Spec Kit skills
- product/repo-local `SKILL.md` files under `.agents`, `.claude/skills`, `.deepagents`, `agent-tooling`, `skills`, and design skill folders in the authorized repos
- `legacy-external-skills-repo` skill corpus
- `autoresearch` local and Feynman-related agent skills
- OpenSeaBri consumer sustainability/resilience skills

## 7. GSD Integration Updates

Added:

- `docs/GSD_GOAL_PROTOCOL_INTEGRATION.md`

Updated GSD surfaces with `/goal` inheritance:

- `.claude/commands/gsd/*.md`
- `workflows/gsd-*.md`
- `checklists/gsd-*.md`
- `templates/gsd/*.md`
- `sea-gsd-controlled-execution` skill and wrapper

GSD quick/execute/verify now explicitly inherit DoD, validation, no-false-completion, and approval gates.

## 8. Spec Kit Integration Updates

Added:

- `docs/SPECKIT_GOAL_PROTOCOL_INTEGRATION.md`

Updated:

- `skills/spec-kit/*/SKILL.md`
- `skills/spec-kit/presets/seabridge/*.md`
- synchronized repo-local Spec Kit skill wrappers where present

Spec Kit plan/tasks/checklist/implement/analyze now inherit `/goal` DoD, validation, and completion rules.

## 9. OpenSeaBri / Agent Runtime Updates

Updated docs and skills only. No runtime code, database schema, WebSocket payload, canvas state, or approval-flow code was changed in this rollout.

Added the future runtime shape:

- `goal_id`
- `normalized_goal`
- `definition_of_done`
- `status`
- `validation_requirements`
- `blockers`
- `artifacts`
- `validation_log`
- `final_report`

Runtime code changes are deferred to a focused implementation with tests.

## 10. Scripts Added

- `scripts/sync-goal-protocol.ps1`
- `scripts/sync-goal-protocol-all.ps1`

Capabilities:

- dry-run mode
- backup mode
- required instruction files
- optional `CODEX.md`, `GEMINI.md`, `OPENCODE.md`
- empty/missing instruction file creation
- marker-based idempotent updates
- no custom-content overwrite

## 11. Validation Performed

Passed:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-goal-protocol.ps1
```

Result:

```text
Goal Protocol validation passed for 23 files.
```

Passed PowerShell parser checks:

- `scripts/sync-goal-protocol.ps1`
- `scripts/sync-goal-protocol-all.ps1`
- `scripts/check-goal-protocol.ps1`

Passed sync idempotency:

- `sync-goal-protocol-all.ps1 -DryRun -IncludeOptionalAgentFiles` returned `Changed=False` for all 42 top-level instruction files.
- `sync-goal-protocol.ps1 -TargetRepo manageesg-backend\seabridge-dev -DryRun -IncludeOptionalAgentFiles` returned `Changed=False`.

Passed config validation:

- agent JSON/TOML parse: `AGENT_CONFIG_PARSE_OK json=111 toml=55`
- focused root config parse: `CONFIG_PARSE_OK json=12 toml=6`

Passed duplication validation:

- `DUPLICATE_MARKERS_OK files_with_markers=343`

Passed instruction presence:

- `INSTRUCTION_CHECK_OK repos=7 files=42`

Passed empty/placeholder scan:

- `EMPTY_AGENT_FILES_OK checked=1248`

Confirmed `_upstream` empty backup prompt unchanged:

- `UPSTREAM_EMPTY_BACKUP_UNCHANGED size=0`

ECC graphify follow-up after adding PowerShell scripts:

- `graphify update .`
- First result: timed out after 122 seconds.
- Retried with 600 second timeout: AST extraction reached `6876/6876 files (100%)`, then failed during HTML visualization because the graph has `144407 nodes`; graphify recommended `--no-viz`.
- `graphify update . --no-viz` still entered the same visualization path and failed with the same oversized-graph message.
- Direct `_rebuild_code(Path('.'))` timed out after 604 seconds.
- Verified `graphify-out/graph.json` contains `scripts/sync-goal-protocol.ps1` and `scripts/sync-goal-protocol-all.ps1`.
- Verified `graphify-out/GRAPH_REPORT.md` contains `sync-goal-protocol-all.ps1`.

Status: graph data freshness for the new scripts is verified in `graph.json` and `GRAPH_REPORT.md`; HTML visualization generation remains blocked by graph size.

## 12. Validation Not Performed

Application test suites were not run because this rollout intentionally avoided product runtime code and dependency installs were not approved. Targeted docs/skills/script validation was run instead, including PowerShell parser checks, sync dry-runs, protocol validation, JSON/TOML parse checks, duplicate marker checks, and instruction presence checks.

No live provider, paid API, migration, production data, browser, or end-to-end runtime verification was run because this was a docs/skills/scripts rollout and those actions were outside the approved scope.

ECC graphify HTML visualization generation did not complete because the graph is too large for the renderer. The code graph/report artifacts were updated enough to include the newly added sync scripts.

## 13. Remaining Risks

- Several repos had large pre-existing dirty worktrees before this rollout. This report documents rollout changes, but reviewers should inspect diffs carefully.
- Existing Sentinel/hook files were already dirty or deleted in several repos before this work. This rollout did not re-enable, weaken, restore, or remove Sentinel hooks.
- The OpenSeaBri runtime goal-state fields are documented but not implemented in code.
- `_upstream` remains unsynchronized by design due the narrower write authorization.

## 14. Recommended Next Steps

1. Review only `/goal` rollout diffs on `goal_protocol_default`.
2. Decide whether to commit the docs/skills/scripts rollout in each repo.
3. Schedule a separate focused task for OpenSeaBri runtime goal-state persistence if desired.
4. Decide whether `_upstream` should receive a separate authorized pointer-only update.
5. Keep `GOAL_PROTOCOL.md` as the canonical source and avoid copying the full protocol into product repos.
