---
description: Inspect active loop state, progress, failure signals, and recommended intervention.
---

# Loop Status Command

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


Inspect active loop state, progress, and failure signals.

This slash command can only run after the current session dequeues it. If you
need to inspect a wedged or sibling session, run the packaged CLI from another
terminal:

```bash
npx --package ecc-universal ecc loop-status --json
```

The CLI scans local Claude transcript JSONL files under
`~/.claude/projects/**` and reports stale `ScheduleWakeup` calls or `Bash`
tool calls that have no matching `tool_result`.

## Usage

`/loop-status [--watch]`

## What to Report

- active loop pattern
- current phase and last successful checkpoint
- failing checks (if any)
- estimated time/cost drift
- recommended intervention (continue/pause/stop)

## Cross-Session CLI

- `ecc loop-status --json` emits machine-readable status for recent local
  Claude transcripts.
- `ecc loop-status --home <dir>` scans a different home directory when
  inspecting another local profile or mounted workspace.
- `ecc loop-status --transcript <session.jsonl>` inspects one transcript
  directly.
- `ecc loop-status --bash-timeout-seconds 1800` adjusts the stale Bash
  threshold.
- `ecc loop-status --exit-code` exits `2` when stale loop or tool signals are
  found, or `1` when transcripts cannot be scanned.
- `--exit-code` with `--watch` requires `--watch-count` so watchdog scripts do
  not wait forever for a process exit.
- `ecc loop-status --watch` refreshes status until interrupted.
- `ecc loop-status --watch --watch-count 3 --exit-code` refreshes a bounded
  number of times, then exits with the highest status seen.
- `ecc loop-status --watch --watch-count 3` emits a bounded watch stream for
  scripts and handoffs.
- `ecc loop-status --watch --write-dir ~/.claude/loops` maintains
  `index.json` and per-session JSON snapshots for sibling terminals or
  watchdog scripts.

## Watch Mode

When `--watch` is present, refresh status periodically. With `--json`, each
refresh is emitted as one JSON object per line so another terminal or script can
consume the stream.

## Snapshot Files

Use `--write-dir <dir>` when a separate process needs to inspect loop state
without waiting for the current Claude session to dequeue `/loop-status`. The
CLI writes:

- `index.json` with one row per inspected session.
- `<session-id>.json` with the full status payload for that session.

These files are snapshots of local transcript analysis. They do not control or
timeout Claude Code runtime tool calls.

## Token Retry Loop Status

For loops started through `scripts/agent-token-retry.ps1`, inspect:

```powershell
Get-Content .ecc\loops\agent-token-retry-latest.json
Get-ChildItem .ecc\loops\*.log | Sort-Object LastWriteTime -Descending | Select-Object -First 5
```

Report:
- last attempt number
- last exit code
- whether the failure looked like a token/rate/quota limit
- next retry time
- log path

## Arguments

$ARGUMENTS:
- `--watch` optional

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
