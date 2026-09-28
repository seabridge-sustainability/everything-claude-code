---
description: Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã¯Â¼Ë†npm/pnpm/yarn/bunÃ¯Â¼â€°
disable-model-invocation: true
---

# Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£ÂÂ®Ã¨Â¨Â­Ã¥Â®Å¡

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


Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã£ÂÂ§Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```bash
# Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
node scripts/setup-package-manager.js --detect

# Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Å’â€¡Ã¥Â®Å¡
node scripts/setup-package-manager.js --global pnpm

# Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Å’â€¡Ã¥Â®Å¡
node scripts/setup-package-manager.js --project bun

# Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
node scripts/setup-package-manager.js --list
```

## Ã¦Â¤Å“Ã¥â€¡ÂºÃ£ÂÂ®Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½Â

Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â±ÂºÃ¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã©Å¡â€ºÃ£â‚¬ÂÃ¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã©Â â€ Ã¥ÂºÂÃ£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢:

1. **Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°**: `CLAUDE_PACKAGE_MANAGER`
2. **Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡**: `.claude/package-manager.json`
3. **package.json**: `packageManager` Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°
4. **Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«**: package-lock.jsonÃ£â‚¬Âyarn.lockÃ£â‚¬Âpnpm-lock.yamlÃ£â‚¬Âbun.lockbÃ£ÂÂ®Ã¥Â­ËœÃ¥Å“Â¨
5. **Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡**: `~/.claude/package-manager.json`
6. **Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯**: Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã¯Â¼Ë†pnpm > bun > yarn > npmÃ¯Â¼â€°

## Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«

### Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡
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

## Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°

`CLAUDE_PACKAGE_MANAGER` Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£â‚¬ÂÃ¤Â»â€“Ã£ÂÂ®Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¦Â¤Å“Ã¥â€¡ÂºÃ¦â€“Â¹Ã¦Â³â€¢Ã£â€šâ€™Ã¤Â¸Å Ã¦â€ºÂ¸Ã£ÂÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Ã¦Â¤Å“Ã¥â€¡ÂºÃ£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’

Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã¦Â¤Å“Ã¥â€¡ÂºÃ§ÂµÂÃ¦Å¾Å“Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ¦Â¬Â¡Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```bash
node scripts/setup-package-manager.js --detect
```
