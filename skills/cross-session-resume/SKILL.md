---
name: cross-session-resume
description: Use when an agent workflow must resume after restart, compaction, channel switch, or human handoff with checkpoints, validation logs, artifacts, and safe next actions.
---

# cross-session-resume

## Purpose

Make agent continuation reliable by serializing the current goal, event evidence, validation logs, artifacts, and a human-readable handoff.

## When To Use

- A task must continue later.
- Work may move between Codex, Claude Code, Gemini, OpenCode, Hermes, or OpenSeaBri agents.
- The agent needs to survive process restart, WebUI reload, chat context compaction, or channel change.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\cross-session-state\README.md`

## Resume Checklist

- Current goal id and status.
- Active phase.
- Definition of done.
- Completed subtasks with evidence.
- Open subtasks.
- Blockers and approvals.
- Last checkpoint.
- Validation results.
- Artifact references.
- Safe next action.

## Verification

- Reload state from disk/database and confirm the same projection.
- Verify append-only evidence can rebuild the current goal.
- Verify handoff summary does not contain secrets.
- Verify skipped checks and unverified items are explicit.
