# Claude Code Compatibility Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system path: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Claude Code must load the centralized `AGENTS_SYSTEM.md` / `SEABRIDGE_CODING_AGENT_SYSTEM.md` contract first, then repo-local `CLAUDE.md`, `AGENTS.md`, and `AGENTS_SYSTEM.md` overrides.

## Execution Cheatsheet

- Load first: `SEABRIDGE_CODING_AGENT_SYSTEM.md`, `AGENTS_SYSTEM.md`, then the repo-local instruction file that Claude Code auto-loads.
- Repo-specific instructions: apply local backend/frontend/OpenSeaBri rules only when they extend central policy; stricter safety wins.
- Skills: invoke supported slash skills when available or read the canonical `skills/sea-*/SKILL.md` body; wrappers only point to canonical behavior.
- Logs, reports, and handoffs: use `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; do not place transient reports in repo root.
- Approval gates: never auto-commit, push, install globally, enable yolo/autonomous/dangerous modes, run live paid calls, or perform destructive actions without explicit approval.
- Unsupported native commands: if a Claude-only command is unavailable or unsafe in the current runtime, apply the equivalent local checklist or document the unsupported step.
- Self-verification: keep the plan/test/verify loop and record skipped checks with reasons.

## Skill Resolution

- Canonical SeaBridgeAI skill bodies: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-*\SKILL.md`
- Callable wrappers, where supported: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sea-*\SKILL.md`
- Claude Code may invoke slash commands when available, but slash commands never override approval gates.
- Shared engineering skills are governed by `AGENT_SKILLS.md`, including
  `grill-me`, `ubiquitous-language`, `improve-codebase-architecture`, and the
  Harness reviewer skills.

## /goal Auto-Loop

- `/goal <task>` triggers autonomous persistent execution.
- `/goal` and auto-loop are the same mode; `/goal` is the command, auto-loop is the behavior.
- For long-running or non-trivial work, Claude Code must define the objective, DoD, phases, validation plan, stuck-task strategy, and completion evidence before claiming success.
- Final reports must include files changed, commands run, tests run, validation results, errors, fixes, unverified items, remaining risks, and DoD status.
- If a command or approach fails twice, inspect logs and change strategy instead of retrying blindly.
- Shared reference: `docs/CROSS_AGENT_GOAL_PROTOCOL.md`.

## Harness And Security Scans

- Harness Engineering: load `docs\harness\HARNESS_ENGINEERING.md` and run
  `scripts\check-harness.ps1` for baseline-aware checks.
- Baseline findings: `manifests\harness\harness-baseline.json`.
- Backend public-route exemptions:
  `manifests\harness\backend-public-routes.json`.
- Agent Shield is the advisory agent/MCP/config governance scanner.
- Strix is the active app-security scanner.
- When the user explicitly asks for a full vulnerability scan, run the approved
  ECC combined wrapper so Agent Shield and Strix execute together on approved
  local/staging scope only.

## Required Loop

Claude Code follows the same self-verification loop as every SeaBridgeAI agent: plan before edits, write/update tests when practical, prove red before green when practical, run focused checks, broaden checks when risk warrants it, document skipped tests, and never claim completion from code changes alone.

## Safe Auto Mode

Allowed without repeated prompts: formatting, lint/typecheck fixes, test discovery, import cleanup, small tested refactors, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

## No Flicker Mode

`CLAUDENOFLICKER=1` is a Claude-specific UI behavior flag. It is not a Codex, Gemini, OpenCode, Cursor, or Copilot CLI requirement unless those runtimes document their own equivalent.

PowerShell current session:

```powershell
$env:CLAUDENOFLICKER = "1"
```

Git Bash current session:

```bash
export CLAUDENOFLICKER=1
```

Windows user environment:

```powershell
[Environment]::SetEnvironmentVariable("CLAUDENOFLICKER", "1", "User")
```

Do not modify global shell profiles automatically. Provide the command and let the user decide.

## Reports And Logs

Write reports/logs only under `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`.
