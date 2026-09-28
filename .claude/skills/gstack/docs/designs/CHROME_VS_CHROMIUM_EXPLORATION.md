# Chrome vs Chromium: Why We Use Playwright's Bundled Chromium

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
