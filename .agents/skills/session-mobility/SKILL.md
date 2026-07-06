<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->
---
name: session-mobility
description: Move Claude Code sessions across devices using --teleport (cloudÃ¢â€ â€™local) and Remote Control (localÃ¢â€ Âphone/web). Covers setup, enabling remote control by default, and cross-device workflow patterns.
origin: ECC
---

# Session Mobility

Move active Claude Code sessions between devices Ã¢â‚¬â€ pull a cloud session to your machine or drive a local session from your phone or browser.

## When to Activate

- You started a session on claude.ai and want to continue it locally with full tool access
- You want to review or steer a local Claude Code session from your phone while away from your desk
- You need to set up remote control so it's always-on by default

---

## Feature 1: `--teleport` Ã¢â‚¬â€ Cloud Ã¢â€ â€™ Local

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
[Phone/claude.ai] Ã¢â€ â€™ start session Ã¢â€ â€™ get teleport URL
[Local machine]   Ã¢â€ â€™ claude --teleport Ã¢â€ â€™ session moves here with all tools
```

---

## Feature 2: Remote Control Ã¢â‚¬â€ Local Ã¢â€ Â Phone/Web

Lets you drive a local Claude Code session from your phone or any browser without teleporting.

### Enable for a single session

```bash
claude  # start normally Ã¢â‚¬â€ Remote Control is offered in session settings
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

- Enable `remoteControlEnabled: true` globally (Boris does this) Ã¢â‚¬â€ zero friction when you need it
- Use `--teleport` when you need full local tool access; use remote control when you just want to observe or steer
- Remote control sessions auto-expire when the local session ends
- Do not share remote-control URLs Ã¢â‚¬â€ they grant full session input access

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
