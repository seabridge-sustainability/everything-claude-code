---
name: agent-webui-review
description: Use when designing or reviewing WebUI/agent console surfaces for goal state, active task status, tool timelines, provider status, artifacts, approvals, logs, pause/resume, or multimodal previews.
---

# agent-webui-review

## Purpose

Review agent UI as an operational console, not just a chat transcript.

## When To Use

- Adding goal dashboards, task status, tool traces, provider status, generated artifacts, approval gates, pause/resume, or task logs.
- Reviewing WebSocket/canvas event contracts for OpenSeaBri or SeaBridge agent surfaces.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\webui-agent-console\README.md`

## Review Checklist

- Chat messages and operational traces are visually distinct.
- Tool traces are collapsed by default and expandable.
- Provider fallback/degraded mode is visible.
- Pending approvals are prominent.
- Generated artifacts show safety labels.
- Completion is driven by `turn_end` or equivalent final state, not token stream end.
- UI does not expose secrets, local paths, raw provider error bodies, or private prompts.
- Reasoning traces are not presented as verified facts.

## Verification

- UI tests cover running, blocked, validating, completed, and failed states.
- Event shape tests cover goal, tool, provider, artifact, approval, validation, and turn-end events.
- Responsive layout and text overflow are checked for dashboard elements.
