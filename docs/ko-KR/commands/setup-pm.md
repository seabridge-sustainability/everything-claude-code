---
description: Ã¬â€žÂ Ã­ËœÂ¸Ã­â€¢ËœÃ«Å â€ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬(npm/pnpm/yarn/bun) Ã¬â€žÂ¤Ã¬Â â€¢
disable-model-invocation: true
---

# Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã¬â€žÂ¤Ã¬Â â€¢

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


Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«ËœÂÃ«Å â€ Ã¬Â â€žÃ¬â€”Â­Ã¬Å“Â¼Ã«Â¡Å“ Ã¬â€žÂ Ã­ËœÂ¸Ã­â€¢ËœÃ«Å â€ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã«Â²â€¢

```bash
# Ã­Ëœâ€žÃ¬Å¾Â¬ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ ÃªÂ°ÂÃ¬Â§â‚¬
node scripts/setup-package-manager.js --detect

# Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢
node scripts/setup-package-manager.js --global pnpm

# Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢
node scripts/setup-package-manager.js --project bun

# Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã«ÂªÂ©Ã«Â¡Â
node scripts/setup-package-manager.js --list
```

## ÃªÂ°ÂÃ¬Â§â‚¬ Ã¬Å¡Â°Ã¬â€žÂ Ã¬Ë†Å“Ã¬Å“â€ž

Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã«Â¥Â¼ ÃªÂ²Â°Ã¬Â â€¢Ã­â€¢Â  Ã«â€¢Å’ Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬Ë†Å“Ã¬â€žÅ“Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. **Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ**: `CLAUDE_PACKAGE_MANAGER`
2. **Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢**: `.claude/package-manager.json`
3. **package.json**: `packageManager` Ã­â€¢â€žÃ«â€œÅ“
4. **Ã«ÂÂ½ Ã­Å’Å’Ã¬ÂÂ¼**: package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockbÃ¬ÂËœ Ã¬Â¡Â´Ã¬Å¾Â¬ Ã¬â€”Â¬Ã«Â¶â‚¬
5. **Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢**: `~/.claude/package-manager.json`
6. **Ã­ÂÂ´Ã«Â°Â±**: `npm`

## Ã¬â€žÂ¤Ã¬Â â€¢ Ã­Å’Å’Ã¬ÂÂ¼

### Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢
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

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

`CLAUDE_PACKAGE_MANAGER`Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢Ã­â€¢ËœÃ«Â©Â´ Ã«â€¹Â¤Ã«Â¥Â¸ Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ°ÂÃ¬Â§â‚¬ Ã«Â°Â©Ã«Â²â€¢Ã¬Ââ€ž Ã«Â¬Â´Ã¬â€¹Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## ÃªÂ°ÂÃ¬Â§â‚¬ Ã¬â€¹Â¤Ã­â€“â€°

Ã­Ëœâ€žÃ¬Å¾Â¬ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ ÃªÂ°ÂÃ¬Â§â‚¬ ÃªÂ²Â°ÃªÂ³Â¼Ã«Â¥Â¼ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢ËœÃ«Â Â¤Ã«Â©Â´ Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€:

```bash
node scripts/setup-package-manager.js --detect
```
