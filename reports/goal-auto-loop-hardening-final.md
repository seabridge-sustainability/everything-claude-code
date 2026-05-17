# Goal Auto-Loop Hardening Final Report

Date: 2026-05-17

## Status

- Central `/goal` protocol: PASS
- Repo instruction consistency: PASS with review notes
- Skill conflict status: PASS
- GSD integration: PASS
- Spec Kit integration: PASS
- Cross-agent compatibility: PASS
- Duplicate protocol blocks: PASS
- Empty scanned instruction files: PASS

## Repos Scanned

- `everything-claude-code`
- `legacy-external-skills-repo`
- `manageesg-backend`
- `manageesg-frontend`
- `openseabri`
- `_upstream`
- `autoresearch`
- `climada-stack`
- `get-shit-done-temp`
- `nanobot-temp`
- `spec-kit-temp`

`C:\Users\adelm\SeaBridgeAI\seabridge-dev` was not present as a top-level repo; `manageesg-backend\seabridge-dev` remains covered through the backend repo.

All scanned git repos are on `goal_auto_loop_diagnostics`.

## Protocol Gaps Found

Initial diagnostics showed that several repos had `/goal`, DoD, validation, and no-false-completion language, but lacked explicit `/goal` and auto-loop unification, completion evidence, and timeout/stagnation language.

The initial before report was written to:

- `reports/goal-protocol-diagnostics-before.md`

During validation, the diagnostics script itself was corrected because its recursive de-duplication was only auditing root instruction files. The final after report is the authoritative scan and covers recursive skills, commands, workflows, checklists, protocols, and compatibility docs.

Final diagnostics:

- `reports/goal-protocol-diagnostics-after.md`
- 1,390 relevant files scanned across 11 repos
- All repos show `/goal`, auto-loop, explicit unification, DoD, validation, stuck recovery, anti-false-completion, timeout/stagnation, and completion evidence signals
- 0 duplicate protocol blocks
- 0 empty scanned files

## Changes Applied

Canonical protocol:

- Updated `protocols/GOAL_PROTOCOL.md`
- Updated `protocols/GOAL_PROTOCOL_SHORT.md`
- Updated `skills/goal-default/SKILL.md`

Added required protocol language:

- `/goal` is the user-facing command
- auto-loop is the execution behavior
- `/goal` and auto-loop are the same operating mode
- no early return after code generation
- no completion claim until validation passes
- 15-minute complexity heuristic
- no premature completion under 10 minutes for non-trivial work without evidence
- stagnation detection
- maximum 2 identical retries
- hard blocker criteria
- progress heartbeat
- completion evidence requirement
- anti-stuck loop rule

Scripts:

- Added `scripts/diagnose-goal-protocol.ps1`
- Updated `scripts/sync-goal-protocol.ps1`
- Updated `scripts/sync-goal-protocol-all.ps1`

Docs:

- Added `docs/GSD_GOAL_AUTO_LOOP_INTEGRATION.md`
- Added `docs/SPECKIT_GOAL_AUTO_LOOP_INTEGRATION.md`
- Added `docs/CROSS_AGENT_GOAL_PROTOCOL.md`
- Updated `docs/GSD_GOAL_PROTOCOL_INTEGRATION.md`
- Updated `docs/SPECKIT_GOAL_PROTOCOL_INTEGRATION.md`
- Updated `docs/agent-compatibility/claude-code.md`
- Updated `docs/agent-compatibility/codex.md`
- Updated `docs/agent-compatibility/gemini.md`
- Updated `docs/agent-compatibility/opencode.md`
- Updated `docs/agent-compatibility/cursor.md`
- Updated `docs/agent-compatibility/copilot-cli.md`

GSD:

- Updated `.claude/skills/gsd-lifecycle/SKILL.md`
- Updated `.claude/get-shit-done/workflows/next.md`
- Documented that `/gsd-execute-phase`, `/gsd-quick`, `/gsd-plan-phase`, `/gsd-verify-work`, and `/gsd-next` inherit `/goal` validation and completion-evidence requirements
- Documented `/gsd-fast`, where present, as trivial/inspection-only

Spec Kit:

- Updated `skills/spec-kit/implement/SKILL.md`
- Updated `skills/spec-kit/plan/SKILL.md`
- Updated `skills/spec-kit/tasks/SKILL.md`
- Updated `skills/spec-kit/analyze/SKILL.md`
- Updated `skills/spec-kit/checklist/SKILL.md`

Repo-level instruction sync:

- Applied compact `/goal` protocol block to `AGENT.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, and `OPENCODE.md` where applicable.
- Created missing sibling instruction files in repos that did not already have them.
- Marker-based updates were idempotent; follow-up dry-run reported no pending changes.

Simulation:

- Added `reports/goal-protocol-simulated-task.md`

## Validation Results

Commands run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\diagnose-goal-protocol.ps1 -Root "C:\Users\adelm\SeaBridgeAI" -Output "C:\Users\adelm\SeaBridgeAI\everything-claude-code\reports\goal-protocol-diagnostics-before.md"
powershell -ExecutionPolicy Bypass -File .\scripts\sync-goal-protocol.ps1 -TargetRepo "C:\Users\adelm\SeaBridgeAI\legacy-external-skills-repo" -DryRun -IncludeOptionalAgentFiles -IncludeAutoLoop -IncludeAntiStuckRules -IncludeCompletionEvidence
powershell -ExecutionPolicy Bypass -File .\scripts\sync-goal-protocol.ps1 -TargetRepo "C:\Users\adelm\SeaBridgeAI\legacy-external-skills-repo" -IncludeOptionalAgentFiles -IncludeAutoLoop -IncludeAntiStuckRules -IncludeCompletionEvidence
powershell -ExecutionPolicy Bypass -File .\scripts\sync-goal-protocol-all.ps1 -Apply -IncludeOptionalAgentFiles -IncludeAutoLoop -IncludeAntiStuckRules -IncludeCompletionEvidence
powershell -ExecutionPolicy Bypass -File .\scripts\diagnose-goal-protocol.ps1 -Root "C:\Users\adelm\SeaBridgeAI" -Output "C:\Users\adelm\SeaBridgeAI\everything-claude-code\reports\goal-protocol-diagnostics-after.md"
powershell -ExecutionPolicy Bypass -File .\scripts\check-goal-protocol.ps1 -WorkspaceRoot "C:\Users\adelm\SeaBridgeAI"
powershell -ExecutionPolicy Bypass -File .\scripts\check-coding-agent-system.ps1
```

Results:

- `check-goal-protocol.ps1`: passed for 23 files
- `check-coding-agent-system.ps1`: PASS, no findings
- `diagnose-goal-protocol.ps1`: after report written successfully
- sync dry-run after apply: no pending changes for target repos
- duplicate marker scan: no duplicate `SEABRIDGE_GOAL_PROTOCOL` blocks
- empty-file scan: no empty scanned files

## JSON/TOML Safety

The sync script only writes Markdown agent instruction files. JSON, JSONC, and TOML files were read by diagnostics but not modified by the sync script. Pre-existing dirty JSON/TOML files remain outside this task's changes.

## Review Notes

The final diagnostics report still lists potential sensitive terms in some repos:

- `auto-push`
- `yolo`
- `skip tests`

Manual review indicates these are scanner term hits in prohibition or caution language, not active permission to auto-push, run yolo/dangerous execution, or skip validation. They remain as review notes rather than failures.

## Unresolved Issues

- Several repos had substantial pre-existing dirty worktrees before this task. No attempt was made to revert or normalize unrelated changes.
- `get-shit-done-temp` started dirty on `remove_sentinel_local`; it was branched to `goal_auto_loop_diagnostics` and updated, preserving existing changes.
- `nanobot-temp` had no active branch name before branching; it now has `goal_auto_loop_diagnostics`.
- No product test suites were run because this task changed agent protocol/docs/scripts only and did not modify product runtime behavior.

## Manual Approval Items

- Commit approval is required before committing any repo.
- Push approval is required before pushing any branch.
- Review whether the newly created sibling instruction files in temp/reference repos should be kept long-term.
- Decide whether potential sensitive-term scanner findings should be classified more precisely in a future scanner version.

## Recommended Next Steps

1. Review dirty worktrees repo by repo before any commit.
2. If approved, commit protocol changes in focused commits per repo.
3. Optionally refine diagnostics classification so prohibited `yolo`/`auto-push` mentions are separated from permissive mentions.
4. Add a CI check that runs `scripts/diagnose-goal-protocol.ps1` and fails only on missing protocol fields, duplicate blocks, or empty agent files.
