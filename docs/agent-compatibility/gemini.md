# Gemini Compatibility Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system path: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Gemini must load the centralized `AGENTS_SYSTEM.md` / `SEABRIDGE_CODING_AGENT_SYSTEM.md` contract first, then repo-local `AGENTS.md`, `CLAUDE.md`, and `AGENTS_SYSTEM.md` overrides.

## Skill Resolution

- Canonical SeaBridgeAI skill bodies: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-*\SKILL.md`
- Wrapper references, where supported by the harness: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sea-*\SKILL.md`
- Gemini should read the relevant `SKILL.md` directly and follow the same approval gates.
- Shared engineering skills are governed by `AGENT_SKILLS.md`, including
  `grill-me`, `ubiquitous-language`, `improve-codebase-architecture`, and the
  Harness reviewer skills.

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

Gemini follows the same self-verification loop: plan before edits, write/update tests when practical, prove red before green when practical, run focused checks, broaden checks when risk warrants it, document skipped tests, and never claim completion from code changes alone.

## Safe Auto Mode

Allowed without repeated prompts: formatting, lint/typecheck fixes, test discovery, import cleanup, small tested refactors, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

## Reports And Logs

Write reports/logs only under `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`.
