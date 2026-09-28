# Capture Guide

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Overview

VideoDB Capture enables real-time screen and audio recording with AI processing. Desktop capture currently supports **macOS** only.

For code-level details (SDK methods, event structures, AI pipelines), see [capture-reference.md](capture-reference.md).

## Quick Start

1. **Start WebSocket listener**: `python scripts/ws_listener.py --clear &`
2. **Run capture code** (see Complete Capture Workflow below)
3. **Events written to**: `/tmp/videodb_events.jsonl`

---

## Complete Capture Workflow

No webhooks or polling required. WebSocket delivers all events including session lifecycle.

> **CRITICAL:** The `CaptureClient` must remain running for the entire duration of the capture. It runs the local recorder binary that streams screen/audio data to VideoDB. If the Python process that created the `CaptureClient` exits, the recorder binary is killed and capture stops silently. Always run the capture code as a **long-lived background process** (e.g. `nohup python capture_script.py &`) and use signal handling (`asyncio.Event` + `SIGINT`/`SIGTERM`) to keep it alive until you explicitly stop it.

1. **Start WebSocket listener** in background with `--clear` flag to clear old events. Wait for it to create the WebSocket ID file.

2. **Read the WebSocket ID**. This ID is required for capture session and AI pipelines.

3. **Create a capture session** and generate a client token for the desktop client.

4. **Initialize CaptureClient** with the token. Request permissions for microphone and screen capture.

5. **List and select channels** (mic, display, system_audio). Set `store = True` on channels you want to persist as a video.

6. **Start the session** with selected channels.

7. **Wait for session active** by reading events until you see `capture_session.active`. This event contains the `rtstreams` array. Save session info (session ID, RTStream IDs) to a file (e.g. `/tmp/videodb_capture_info.json`) so other scripts can read it.

8. **Keep the process alive.** Use `asyncio.Event` with signal handlers for `SIGINT`/`SIGTERM` to block until explicitly stopped. Write a PID file (e.g. `/tmp/videodb_capture_pid`) so the process can be stopped later with `kill $(cat /tmp/videodb_capture_pid)`. The PID file should be overwritten on every run so reruns always have the correct PID.

9. **Start AI pipelines** (in a separate command/script) on each RTStream for audio indexing and visual indexing. Read the RTStream IDs from the saved session info file.

10. **Write custom event processing logic** (in a separate command/script) to read real-time events based on your use case. Examples:
    - Log Slack activity when `visual_index` mentions "Slack"
    - Summarize discussions when `audio_index` events arrive
    - Trigger alerts when specific keywords appear in `transcript`
    - Track application usage from screen descriptions

11. **Stop capture** when done Ã¢â‚¬â€ send SIGTERM to the capture process. It should call `client.stop_capture()` and `client.shutdown()` in its signal handler.

12. **Wait for export** by reading events until you see `capture_session.exported`. This event contains `exported_video_id`, `stream_url`, and `player_url`. This may take several seconds after stopping capture.

13. **Stop WebSocket listener** after receiving the export event. Use `kill $(cat /tmp/videodb_ws_pid)` to cleanly terminate it.

---

## Shutdown Sequence

Proper shutdown order is important to ensure all events are captured:

1. **Stop the capture session** Ã¢â‚¬â€ `client.stop_capture()` then `client.shutdown()`
2. **Wait for export event** Ã¢â‚¬â€ poll `/tmp/videodb_events.jsonl` for `capture_session.exported`
3. **Stop the WebSocket listener** Ã¢â‚¬â€ `kill $(cat /tmp/videodb_ws_pid)`

Do NOT kill the WebSocket listener before receiving the export event, or you will miss the final video URLs.

---

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/ws_listener.py` | WebSocket event listener (dumps to JSONL) |

### ws_listener.py Usage

```bash
# Start listener in background (append to existing events)
python scripts/ws_listener.py &

# Start listener with clear (new session, clears old events)
python scripts/ws_listener.py --clear &

# Custom output directory
python scripts/ws_listener.py --clear /path/to/events &

# Stop the listener
kill $(cat /tmp/videodb_ws_pid)
```

**Options:**
- `--clear`: Clear the events file before starting. Use when starting a new capture session.

**Output files:**
- `videodb_events.jsonl` - All WebSocket events
- `videodb_ws_id` - WebSocket connection ID (for `ws_connection_id` parameter)
- `videodb_ws_pid` - Process ID (for stopping the listener)

**Features:**
- Auto-reconnect with exponential backoff on connection drops
- Graceful shutdown on SIGINT/SIGTERM
- PID file for easy process management
- Connection status logging
