---
name: session-mobility
description: Move Claude Code sessions across devices using --teleport (cloud→local) and Remote Control (local←phone/web). Covers setup, enabling remote control by default, and cross-device workflow patterns.
origin: ECC
---

# Session Mobility

Move active Claude Code sessions between devices — pull a cloud session to your machine or drive a local session from your phone or browser.

## When to Activate

- You started a session on claude.ai and want to continue it locally with full tool access
- You want to review or steer a local Claude Code session from your phone while away from your desk
- You need to set up remote control so it's always-on by default

---

## Feature 1: `--teleport` — Cloud → Local

Moves a running cloud (claude.ai) session to your local machine, giving it access to your local tools, files, and MCP servers.

### Usage

```bash
# From the terminal on the target machine:
claude --teleport
```

Claude will print a URL. Open that URL on the device where the cloud session is running. The session migrates to your local machine.

### Requirements

- Active `claude.ai` subscription (cloud sessions require subscription)
- `claude` CLI installed and authenticated on the local machine

### Workflow

```
[Phone/claude.ai] → start session → get teleport URL
[Local machine]   → claude --teleport → session moves here with all tools
```

---

## Feature 2: Remote Control — Local ← Phone/Web

Lets you drive a local Claude Code session from your phone or any browser without teleporting.

### Enable for a single session

```bash
claude  # start normally — Remote Control is offered in session settings
# or use /remote-control inside a running session
```

### Enable by default for all sessions

Add to `~/.claude/settings.json`:

```json
{
  "remoteControlEnabled": true
}
```

Or use the skill:
```
/update-config
```
Then ask it to set `remoteControlEnabled: true`.

### How it works

1. Local session starts and registers a remote-control endpoint
2. You receive a URL (or QR code on mobile) to open on another device
3. That device shows the session output in real-time and lets you send messages
4. All tool execution still happens on your local machine

---

## Best Practices

- Enable `remoteControlEnabled: true` globally (Boris does this) — zero friction when you need it
- Use `--teleport` when you need full local tool access; use remote control when you just want to observe or steer
- Remote control sessions auto-expire when the local session ends
- Do not share remote-control URLs — they grant full session input access

---

## Common Patterns

### Morning review from phone

```
Night before:   Leave a long-running local session running
Morning:        Open remote control URL on phone
                Review progress, send steering messages
                Let session continue while commuting
```

### Teleport to debug locally

```
Mobile:   Start exploratory session on claude.ai
Stuck:    Need real file access and MCP tools
Action:   claude --teleport on laptop
Result:   Full session context + local tools
```
