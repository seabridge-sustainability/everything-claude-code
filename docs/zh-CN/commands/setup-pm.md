---
description: Ã©â€¦ÂÃ§Â½Â®Ã¦â€šÂ¨Ã©Â¦â€“Ã©â‚¬â€°Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†npm/pnpm/yarn/bunÃ¯Â¼â€°
disable-model-invocation: true
---

# Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¨Â®Â¾Ã§Â½Â®

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


Ã©â€¦ÂÃ§Â½Â®Ã¦â€šÂ¨Ã¤Â¸ÂºÃ¦Â­Â¤Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Ë†â€“Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂÂÃ¥Â¥Â½Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

```bash
# Detect current package manager
node scripts/setup-package-manager.js --detect

# Set global preference
node scripts/setup-package-manager.js --global pnpm

# Set project preference
node scripts/setup-package-manager.js --project bun

# List available package managers
node scripts/setup-package-manager.js --list
```

## Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§

Ã¥Å“Â¨Ã§Â¡Â®Ã¥Â®Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¥â€œÂªÃ¤Â¸ÂªÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â¼Å¡Ã¦Å’â€°Ã¤Â»Â¥Ã¤Â¸â€¹Ã©Â¡ÂºÃ¥ÂºÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡

1. **Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â**Ã¯Â¼Å¡`CLAUDE_PACKAGE_MANAGER`
2. **Ã©Â¡Â¹Ã§â€ºÂ®Ã©â€¦ÂÃ§Â½Â®**Ã¯Â¼Å¡`.claude/package-manager.json`
3. **package.json**Ã¯Â¼Å¡`packageManager` Ã¥Â­â€”Ã¦Â®Âµ
4. **Ã©â€ÂÃ¦â€“â€¡Ã¤Â»Â¶**Ã¯Â¼Å¡package-lock.jsonÃ£â‚¬Âyarn.lockÃ£â‚¬Âpnpm-lock.yaml Ã¦Ë†â€“ bun.lockb Ã§Å¡â€žÃ¥Â­ËœÃ¥Å“Â¨
5. **Ã¥â€¦Â¨Ã¥Â±â‚¬Ã©â€¦ÂÃ§Â½Â®**Ã¯Â¼Å¡`~/.claude/package-manager.json`
6. **Ã¥â€ºÅ¾Ã©â‚¬â‚¬Ã¦â€“Â¹Ã¦Â¡Ë†**Ã¯Â¼Å¡Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨ (pnpm > bun > yarn > npm)

## Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶

### Ã¥â€¦Â¨Ã¥Â±â‚¬Ã©â€¦ÂÃ§Â½Â®

```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã©Â¡Â¹Ã§â€ºÂ®Ã©â€¦ÂÃ§Â½Â®

```json
// .claude/package-manager.json
{
  "packageManager": "bun"
}
```

### package.json

```json
{
  "packageManager": "pnpm@8.6.0"
}
```

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

Ã¨Â®Â¾Ã§Â½Â® `CLAUDE_PACKAGE_MANAGER` Ã¤Â»Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â£â‚¬Ã¦Âµâ€¹

Ã¨Â¦ÂÃ¦Å¸Â¥Ã§Å“â€¹Ã¥Â½â€œÃ¥â€°ÂÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦Â£â‚¬Ã¦Âµâ€¹Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å’Ã¨Â¯Â·Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

```bash
node scripts/setup-package-manager.js --detect
```
