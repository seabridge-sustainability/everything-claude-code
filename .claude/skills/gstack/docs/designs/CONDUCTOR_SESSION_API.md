# Conductor Session Streaming API Proposal

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


## Problem

When Claude controls your real browser via CDP (gstack `$B connect`), you look at two
windows: **Conductor** (to see Claude's thinking) and **Chrome** (to see Claude's actions).

gstack's Chrome extension Side Panel shows browse activity Ã¢â‚¬â€ every command, result,
and error. But for *full* session mirroring (Claude's thinking, tool calls, code edits),
the Side Panel needs Conductor to expose the conversation stream.

## What this enables

A "Session" tab in the gstack Chrome extension Side Panel that shows:
- Claude's thinking/content (truncated for performance)
- Tool call names + icons (Edit, Bash, Read, etc.)
- Turn boundaries with cost estimates
- Real-time updates as the conversation progresses

The user sees everything in one place Ã¢â‚¬â€ Claude's actions in their browser + Claude's
thinking in the Side Panel Ã¢â‚¬â€ without switching windows.

## Proposed API

### `GET http://127.0.0.1:{PORT}/workspace/{ID}/session/stream`

Server-Sent Events endpoint that re-emits Claude Code's conversation as NDJSON events.

**Event types** (reuse Claude Code's `--output-format stream-json` format):

```
event: assistant
data: {"type":"assistant","content":"Let me check that page...","truncated":true}

event: tool_use
data: {"type":"tool_use","name":"Bash","input":"$B snapshot","truncated_input":true}

event: tool_result
data: {"type":"tool_result","name":"Bash","output":"[snapshot output...]","truncated_output":true}

event: turn_complete
data: {"type":"turn_complete","input_tokens":1234,"output_tokens":567,"cost_usd":0.02}
```

**Content truncation:** Tool inputs/outputs capped at 500 chars in the stream. Full
data stays in Conductor's UI. The Side Panel is a summary view, not a replacement.

### `GET http://127.0.0.1:{PORT}/api/workspaces`

Discovery endpoint listing active workspaces.

```json
{
  "workspaces": [
    {
      "id": "abc123",
      "name": "gstack",
      "branch": "garrytan/chrome-extension-ctrl",
      "directory": "/Users/garry/gstack",
      "pid": 12345,
      "active": true
    }
  ]
}
```

The Chrome extension auto-selects a workspace by matching the browse server's git repo
(from `/health` response) to a workspace's directory or name.

## Security

- **Localhost-only.** Same trust model as Claude Code's own debug output.
- **No auth required.** If Conductor wants auth, include a Bearer token in the
  workspace listing that the extension passes on SSE requests.
- **Content truncation** is a privacy feature Ã¢â‚¬â€ long code outputs, file contents, and
  sensitive tool results never leave Conductor's full UI.

## What gstack builds (extension side)

Already scaffolded in the Side Panel "Session" tab (currently shows placeholder).

When Conductor's API is available:
1. Side Panel discovers Conductor via port probe or manual entry
2. Fetches `/api/workspaces`, matches to browse server's repo
3. Opens `EventSource` to `/workspace/{id}/session/stream`
4. Renders: assistant messages, tool names + icons, turn boundaries, cost
5. Falls back gracefully: "Connect Conductor for full session view"

Estimated effort: ~200 LOC in `sidepanel.js`.

## What Conductor builds (server side)

1. SSE endpoint that re-emits Claude Code's stream-json per workspace
2. `/api/workspaces` discovery endpoint with active workspace list
3. Content truncation (500 char cap on tool inputs/outputs)

Estimated effort: ~100-200 LOC if Conductor already captures the Claude Code stream
internally (which it does for its own UI rendering).

## Design decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Transport | SSE (not WebSocket) | Unidirectional, auto-reconnect, simpler |
| Format | Claude's stream-json | Conductor already parses this; no new schema |
| Discovery | HTTP endpoint (not file) | Chrome extensions can't read filesystem |
| Auth | None (localhost) | Same as browse server, CDP port, Claude Code |
| Truncation | 500 chars | Side Panel is ~300px wide; long content useless |
