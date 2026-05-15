# Claude Code Best Practices Agent System Validation - 2026-05-10

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical source: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

## Scope

Local-only update. No commit, no push, no global install, no shell profile edit, no unsafe autonomous/yolo/dangerous execution.

Target repos:

- `C:\Users\adelm\SeaBridgeAI\manageesg-backend`
- `C:\Users\adelm\SeaBridgeAI\manageesg-frontend`
- `C:\Users\adelm\SeaBridgeAI\openseabri`
- `C:\Users\adelm\SeaBridgeAI\autoresearch`
- `C:\Users\adelm\SeaBridgeAI\_upstream`

## Files Inspected

Central:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENTS_SYSTEM.md`
- `docs/agent-compatibility/claude-code.md`
- `docs/agent-compatibility/codex.md`
- `docs/agent-compatibility/gemini.md`
- `docs/agent-compatibility/opencode.md`
- `docs/agent-compatibility/cursor.md`
- `docs/agent-compatibility/copilot-cli.md`
- `repo-integrations/manageesg-backend.md`
- `repo-integrations/manageesg-frontend.md`
- `repo-integrations/openseabri.md`
- `repo-integrations/upstream.md`
- `skills/sea-senior-dev-workflow/SKILL.md`
- `skills/sea-test-driven-development/SKILL.md`
- `skills/sea-gsd-controlled-execution/SKILL.md`
- `skills/sea-code-review-response/SKILL.md`
- `checklists/pre-completion.md`
- `checklists/gsd-safe-execution.md`
- `checklists/pre-merge.md`
- `workflows/module-review.md`
- `workflows/cross-repo-change.md`

Repo instruction files:

- `manageesg-backend/CLAUDE.md`, `AGENTS.md`, `AGENTS_SYSTEM.md`
- `manageesg-frontend/CLAUDE.md`, `AGENTS.md`, `AGENTS_SYSTEM.md`
- `openseabri/CLAUDE.md`, `AGENTS.md`, `AGENTS_SYSTEM.md`
- `autoresearch/CLAUDE.md`, `AGENTS.md`, `AGENTS_SYSTEM.md`
- `_upstream/CLAUDE.md`, `AGENTS.md`, `AGENTS_SYSTEM.md`

No `GEMINI.md`, `CODEX.md`, or `OPENCODE.md` files were present in the five target repo roots.

## Files Changed

Central:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENTS_SYSTEM.md`
- `docs/agent-compatibility/claude-code.md`
- `docs/agent-compatibility/codex.md`
- `docs/agent-compatibility/gemini.md`
- `docs/agent-compatibility/opencode.md`
- `docs/agent-compatibility/cursor.md`
- `docs/agent-compatibility/copilot-cli.md`
- `repo-integrations/manageesg-backend.md`
- `repo-integrations/manageesg-frontend.md`
- `repo-integrations/openseabri.md`
- `repo-integrations/upstream.md`
- `repo-integrations/autoresearch.md`
- `skills/sea-senior-dev-workflow/SKILL.md`
- `skills/sea-test-driven-development/SKILL.md`
- `skills/sea-gsd-controlled-execution/SKILL.md`
- `skills/sea-code-review-response/SKILL.md`
- `checklists/pre-completion.md`
- `checklists/gsd-safe-execution.md`
- `checklists/pre-merge.md`
- `workflows/module-review.md`
- `workflows/cross-repo-change.md`
- Historical ECC validation docs containing an old ECC repository alias were mechanically normalized to `legacy ECC alias`.

Target repos:

- `manageesg-backend/CLAUDE.md`
- `manageesg-backend/AGENTS.md`
- `manageesg-backend/AGENTS_SYSTEM.md`
- `manageesg-frontend/CLAUDE.md`
- `manageesg-frontend/AGENTS.md`
- `manageesg-frontend/AGENTS_SYSTEM.md`
- `openseabri/CLAUDE.md`
- `openseabri/AGENTS.md`
- `openseabri/AGENTS_SYSTEM.md`
- `autoresearch/CLAUDE.md`
- `autoresearch/AGENTS.md`
- `autoresearch/AGENTS_SYSTEM.md`
- `_upstream/CLAUDE.md`
- `_upstream/AGENTS.md`
- `_upstream/AGENTS_SYSTEM.md`

## Repo Coverage

PASS. Each target repo root has `SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1`, the canonical central path, and a compact pointer to repo structure, commands, recurring lessons, artifact policy, self-verification, controlled auto mode, and approval gates.

## Claude No-Flicker Setup

PASS. Documented in `docs/agent-compatibility/claude-code.md`.

Included:

- PowerShell current-session setup: `$env:CLAUDENOFLICKER = "1"`
- Git Bash current-session setup: `export CLAUDENOFLICKER=1`
- Windows user environment setup: `[Environment]::SetEnvironmentVariable("CLAUDENOFLICKER", "1", "User")`
- Explicit note that `CLAUDENOFLICKER=1` is Claude-specific UI behavior.
- Explicit note not to modify global shell profiles automatically.

## Self-Verification Loop Status

PASS.

Integrated into:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENTS_SYSTEM.md`
- `skills/sea-senior-dev-workflow/SKILL.md`
- `skills/sea-test-driven-development/SKILL.md`
- `checklists/pre-completion.md`
- target repo root instruction files

Required behavior now states: plan before edits, update relevant tests when practical, prove red/green when practical, run targeted checks, broaden checks when risk warrants it, document skipped tests, and never claim completion from code changes alone.

## Controlled Auto-Mode Status

PASS.

Integrated into:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENTS_SYSTEM.md`
- `skills/sea-gsd-controlled-execution/SKILL.md`
- `skills/sea-senior-dev-workflow/SKILL.md`
- `checklists/gsd-safe-execution.md`
- target repo root instruction files

Allowed low-risk auto steps and explicit approval-required operations are documented. Dangerous/yolo/autonomous permission modes remain approval-gated and disabled by default.

## Automated Review Collaboration Status

PASS.

Integrated into:

- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENTS_SYSTEM.md`
- `workflows/module-review.md`
- `workflows/cross-repo-change.md`
- `checklists/pre-merge.md`
- `skills/sea-code-review-response/SKILL.md`

Policy distinguishes primary coding agent ownership from secondary review-agent scope. `/review`, `/ultra-review`, and CodeRabbit-style secondary review expectations are documented.

## Cross-Agent Compatibility Status

PASS.

Updated:

- `docs/agent-compatibility/codex.md`
- `docs/agent-compatibility/gemini.md`
- `docs/agent-compatibility/opencode.md`
- `docs/agent-compatibility/cursor.md`
- `docs/agent-compatibility/copilot-cli.md`

Each covers central load order, `skills\sea-*` resolution, `.agents\skills` wrappers where supported, self-verification, safe auto mode, and report/log placement under `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`.

## Conflicts Found And Resolved

- Missing `autoresearch/AGENTS_SYSTEM.md`: resolved with a lightweight repo-specific system pointer.
- Missing `repo-integrations/autoresearch.md`: resolved with an ECC integration note.
- Historical old-alias validation strings in ECC docs: resolved by replacing the legacy string with `legacy ECC alias`.
- `autoresearch/CLAUDE.md` and `autoresearch/AGENTS.md` contain non-UTF-8 bytes, so their baseline section was appended byte-wise instead of rewriting the files.

No contradictory active auto-mode/yolo/dangerous rules were found in active instruction surfaces. All hits were prohibition or explicit-approval language.

## Tests And Scans Run

- Old ECC alias absence scan across ECC and target repos.
- `rg -n -i "claude[- ]?mem|thedotmack|sqlite/vector memory|vector-memory" ...`
- SYSTEM_ID and canonical path scan across all target root instruction files.
- Baseline/self-verification scan across all target root instruction files.
- Canonical `skills/sea-*` to `.agents/skills/sea-*` wrapper coverage scan.
- Unsafe auto/yolo/dangerous wording scan across active central and repo instruction files.
- Root clutter scan for report/log/audit/readiness/handoff files in target repo roots.
- Secret-pattern scan across active instruction files and sea-* skills.
- Compatibility-doc required-field scan for Codex, Gemini, OpenCode, Cursor, and Copilot CLI.
- Claude no-flicker required-field scan.

Scan results:

- No old ECC alias references remain in scanned files.
- No active Claude Mem integration found; remaining mentions are explicit exclusion/prohibition or upstream reference-only text.
- All target root instruction files reference `SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1`.
- All target root instruction files reference `C:\Users\adelm\SeaBridgeAI\everything-claude-code`.
- All canonical `sea-*` skills have `.agents` wrappers.
- No root report/log clutter matched in target repo roots.
- No secret-like values matched in active instruction files or sea-* skills.

## Unresolved Risks

- The workspace has pre-existing dirty changes outside this task. They were not reverted or normalized.
- Some vendored/upstream reference docs mention memory tooling generically; active SeaBridgeAI instruction surfaces keep Claude Mem excluded.
- `autoresearch/CLAUDE.md` and `autoresearch/AGENTS.md` should eventually be normalized to UTF-8 in a separate controlled docs cleanup.

## No Commit / No Push Confirmation

No commit was created. No push was performed. No global install or shell profile modification was performed. No unsafe autonomous/yolo/dangerous execution mode was enabled.
