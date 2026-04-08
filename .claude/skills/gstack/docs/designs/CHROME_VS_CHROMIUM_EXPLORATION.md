# Chrome vs Chromium: Why We Use Playwright's Bundled Chromium

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## The Original Vision

When we built `$B connect`, the plan was to connect to the user's **real Chrome browser** Ã¢â‚¬â€ the one with their cookies, sessions, extensions, and open tabs. No more cookie import. The design called for:

1. `chromium.connectOverCDP(wsUrl)` connecting to a running Chrome via CDP
2. Quit Chrome gracefully, relaunch with `--remote-debugging-port=9222`
3. Access the user's real browsing context

This is why `chrome-launcher.ts` existed (361 LOC of browser binary discovery, CDP port probing, and runtime detection) and why the method was called `connectCDP()`.

## What Actually Happened

Real Chrome silently blocks `--load-extension` when launched via Playwright's `channel: 'chrome'`. The extension wouldn't load. We needed the extension for the side panel (activity feed, refs, chat).

The implementation fell back to `chromium.launchPersistentContext()` with Playwright's bundled Chromium Ã¢â‚¬â€ which reliably loads extensions via `--load-extension` and `--disable-extensions-except`. But the naming stayed: `connectCDP()`, `connectionMode: 'cdp'`, `BROWSE_CDP_URL`, `chrome-launcher.ts`.

The original vision (access user's real browser state) was never implemented. We launched a fresh browser every time Ã¢â‚¬â€ functionally identical to Playwright's Chromium, but with 361 lines of dead code and misleading names.

## The Discovery (2026-03-22)

During a `/office-hours` design session, we traced the architecture and discovered:

1. `connectCDP()` doesn't use CDP Ã¢â‚¬â€ it calls `launchPersistentContext()`
2. `connectionMode: 'cdp'` is misleading Ã¢â‚¬â€ it's just "headed mode"
3. `chrome-launcher.ts` is dead code Ã¢â‚¬â€ its only import was in an unreachable `attemptReconnect()` method
4. `preExistingTabIds` was designed for protecting real Chrome tabs we never connect to
5. `$B handoff` (headless Ã¢â€ â€™ headed) used a different API (`launch()` + `newContext()`) that couldn't load extensions, creating two different "headed" experiences

## The Fix

### Renamed
- `connectCDP()` Ã¢â€ â€™ `launchHeaded()`
- `connectionMode: 'cdp'` Ã¢â€ â€™ `connectionMode: 'headed'`
- `BROWSE_CDP_URL` Ã¢â€ â€™ `BROWSE_HEADED`

### Deleted
- `chrome-launcher.ts` (361 LOC)
- `attemptReconnect()` (dead method)
- `preExistingTabIds` (dead concept)
- `reconnecting` field (dead state)
- `cdp-connect.test.ts` (tests for deleted code)

### Converged
- `$B handoff` now uses `launchPersistentContext()` + extension loading (same as `$B connect`)
- One headed mode, not two
- Handoff gives you the extension + side panel for free

### Gated
- Sidebar chat behind `--chat` flag
- `$B connect` (default): activity feed + refs only
- `$B connect --chat`: + experimental standalone chat agent

## Architecture (after)

```
Browser States:
  HEADLESS (default) Ã¢â€ ÂÃ¢â€ â€™ HEADED ($B connect or $B handoff)
     Playwright            Playwright (same engine)
     launch()              launchPersistentContext()
     invisible             visible + extension + side panel

Sidebar (orthogonal add-on, headed only):
  Activity tab    Ã¢â‚¬â€ always on, shows live browse commands
  Refs tab        Ã¢â‚¬â€ always on, shows @ref overlays
  Chat tab        Ã¢â‚¬â€ opt-in via --chat, experimental standalone agent

Data Bridge (sidebar Ã¢â€ â€™ workspace):
  Sidebar writes to .context/sidebar-inbox/*.json
  Workspace reads via $B inbox
```

## Why Not Real Chrome?

Real Chrome blocks `--load-extension` when launched by Playwright. This is a Chrome security feature Ã¢â‚¬â€ extensions loaded via command-line args are restricted in Chromium-based browsers to prevent malicious extension injection.

Playwright's bundled Chromium doesn't have this restriction because it's designed for testing and automation. The `ignoreDefaultArgs` option lets us bypass Playwright's own extension-blocking flags.

If we ever want to access the user's real cookies/sessions, the path is:
1. Cookie import (already works via `$B cookie-import`)
2. Conductor session injection (future Ã¢â‚¬â€ sidebar sends messages to workspace agent)

Not reconnecting to real Chrome.
