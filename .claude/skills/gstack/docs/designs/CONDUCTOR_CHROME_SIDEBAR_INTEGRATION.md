# Chrome Sidebar + Conductor: What We Need

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


## What we're building

Right now when Claude is working in a Conductor workspace Ã¢â‚¬â€ editing files, running tests, browsing your app Ã¢â‚¬â€ you can only watch from Conductor's chat window. If Claude is doing QA on your website, you see tool calls scrolling by but you can't actually *see* the browser.

We built a Chrome sidebar that fixes this. When you run `$B connect`, Chrome opens with a side panel that shows everything Claude is doing in real time. You can type messages in the sidebar and Claude acts on them Ã¢â‚¬â€ "click the signup button", "go to the settings page", "summarize what you see."

The problem: the sidebar currently runs its own separate Claude instance. It can't see what the main Conductor session is doing, and the main session can't see what the sidebar is doing. They're two separate agents that don't talk to each other.

The fix is simple: make the sidebar a *window into* the Conductor session, not a separate thing.

## What we need from Conductor (3 things)

### 1. Let us watch what the agent is doing

We need a way to subscribe to the active session's events. Something like an SSE stream or WebSocket that sends us events as they happen:

- "Claude is editing `src/App.tsx`"
- "Claude is running `npm test`"
- "Claude says: I'll fix the CSS issue..."

The sidebar already knows how to render these events Ã¢â‚¬â€ tool calls show as compact badges, text shows as chat bubbles. We just need a pipe from Conductor's session to our extension.

### 2. Let us send messages into the session

When the user types "click the other button" in the Chrome sidebar, that message should appear in the Conductor session as if the user typed it in the workspace chat. The agent picks it up on its next turn and acts on it.

This is the magic moment: user is watching Chrome, sees something wrong, types a correction in the sidebar, and Claude responds Ã¢â‚¬â€ without the user ever switching windows.

### 3. Let us create a workspace from a directory

When `$B connect` launches, it creates a git worktree for file isolation. We want to register that worktree as a Conductor workspace so the user can see the sidebar agent's file changes in Conductor's file tree. This also sets up the foundation for multiple browser sessions, each with their own workspace.

## Why this matters

Today, `/qa` and `/design-review` feel like a black box. Claude says "I found 3 issues" but you can't see what it's looking at. With the sidebar connected to Conductor:

- **You watch Claude test your app** in real time Ã¢â‚¬â€ every click, every navigation, every screenshot appears in Chrome while you watch
- **You can interrupt** Ã¢â‚¬â€ "no, test the mobile view" or "skip that page" Ã¢â‚¬â€ without switching windows
- **One agent, two views** Ã¢â‚¬â€ the same Claude that's editing your code is also controlling the browser. No context duplication, no stale state

## What's already built (gstack side)

Everything on our side is done and shipping:

- Chrome extension that auto-loads when you run `$B connect`
- Side panel that auto-opens (zero setup for the user)
- Streaming event renderer (tool calls, text, results)
- Chat input with message queuing
- Reconnect logic with status banners
- Session management with persistent chat history
- Agent lifecycle (spawn, stop, kill, timeout detection)

The only change on our side: swap the data source from "local `claude -p` subprocess" to "Conductor session stream." The extension code stays the same.

**Estimated effort:** 2-3 days Conductor engineering, 1 day gstack integration.
