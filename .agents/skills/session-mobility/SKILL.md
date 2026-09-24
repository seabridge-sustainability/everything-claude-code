---
name: session-mobility
description: Move Claude Code sessions across devices using --teleport (cloudÃ¢â€ â€™local) and Remote Control (localÃ¢â€ Âphone/web). Covers setup, enabling remote control by default, and cross-device workflow patterns.
origin: ECC
---

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
