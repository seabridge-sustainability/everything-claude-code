---
name: session-mobility
description: Move Claude Code sessions across devices using --teleport (cloudÃ¢â€ â€™local) and Remote Control (localÃ¢â€ Âphone/web). Covers setup, enabling remote control by default, and cross-device workflow patterns.
origin: ECC
---

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
