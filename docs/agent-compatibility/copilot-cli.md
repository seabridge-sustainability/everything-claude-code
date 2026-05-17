# Copilot CLI Compatibility Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system path: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Copilot CLI must load the centralized `AGENTS_SYSTEM.md` / `SEABRIDGE_CODING_AGENT_SYSTEM.md` contract first when available, then repo-local `AGENTS.md`, `CLAUDE.md`, and `AGENTS_SYSTEM.md` overrides.

## Execution Cheatsheet

- Load first: `SEABRIDGE_CODING_AGENT_SYSTEM.md`, `AGENTS_SYSTEM.md`, then repo-local `AGENTS.md` and sibling instruction files.
- Repo-specific instructions: apply local backend/frontend/OpenSeaBri rules only when they extend central policy; stricter safety wins.
- Skills: use the Copilot skill tool when available or read canonical `skills/sea-*/SKILL.md` bodies; wrappers only point to canonical behavior.
- Logs, reports, and handoffs: use `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; do not place transient reports in repo root.
- Approval gates: never auto-commit, push, install globally, enable yolo/autonomous/dangerous modes, run live paid calls, or perform destructive actions without explicit approval.
- Unsupported native commands: if another agent's native command has no Copilot CLI equivalent, use the local file/tool workflow and document the unsupported step.
- Self-verification: keep the plan/test/verify loop and record skipped checks with reasons.

## Skill Resolution

- Canonical SeaBridgeAI skill bodies: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-*\SKILL.md`
- Wrapper references, where supported by the harness: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sea-*\SKILL.md`
- Copilot CLI should read matching `SKILL.md` files directly because it has no native slash-command or subagent system.
- Shared engineering skills are governed by `AGENT_SKILLS.md`, including
  `grill-me`, `ubiquitous-language`, `improve-codebase-architecture`, and the
  Harness reviewer skills.

## /goal Auto-Loop

- If slash commands are unsupported, every non-trivial implementation request inherits `/goal` by default.
- `/goal` and auto-loop are the same mode; `/goal` is the command pattern, auto-loop is the behavior.
- Copilot CLI must define the objective, DoD, phases, validation plan, stuck-task strategy, and completion evidence before claiming success.
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

Copilot CLI follows the same self-verification loop: plan before edits, write/update tests when practical, prove red before green when practical, run focused checks, broaden checks when risk warrants it, document skipped tests, and never claim completion from code changes alone.

## Safe Auto Mode

Allowed without repeated prompts: formatting, lint/typecheck fixes, test discovery, import cleanup, small tested refactors, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

## Reports And Logs

Write reports/logs only under `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`.
