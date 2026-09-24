# RTStream Guide

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


## Overview

RTStream enables real-time ingestion of live video streams (RTSP/RTMP) and desktop capture sessions. Once connected, you can record, index, search, and export content from live sources.

For code-level details (SDK methods, parameters, examples), see [rtstream-reference.md](rtstream-reference.md).

## Use Cases

- **Security & Monitoring**: Connect RTSP cameras, detect events, trigger alerts
- **Live Broadcasts**: Ingest RTMP streams, index in real-time, enable instant search
- **Meeting Recording**: Capture desktop screen and audio, transcribe live, export recordings
- **Event Processing**: Monitor live feeds, run AI analysis, respond to detected content

## Quick Start

1. **Connect to a live stream** (RTSP/RTMP URL) or get RTStream from a capture session

2. **Start ingestion** to begin recording the live content

3. **Start AI pipelines** for real-time indexing (audio, visual, transcription)

4. **Monitor events** via WebSocket for live AI results and alerts

5. **Stop ingestion** when done

6. **Export to video** for permanent storage and further processing

7. **Search the recording** to find specific moments

## RTStream Sources

### From RTSP/RTMP Streams

Connect directly to a live video source:

```python
rtstream = coll.connect_rtstream(
    url="rtmp://your-stream-server/live/stream-key",
    name="My Live Stream",
)
```

### From Capture Sessions

Get RTStreams from desktop capture (mic, screen, system audio):

```python
session = conn.get_capture_session(session_id)

mics = session.get_rtstream("mic")
displays = session.get_rtstream("screen")
system_audios = session.get_rtstream("system_audio")
```

For capture session workflow, see [capture.md](capture.md).

---

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/ws_listener.py` | WebSocket event listener for real-time AI results |
