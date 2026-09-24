# Chrome vs Chromium: Why We Use Playwright's Bundled Chromium

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
