# Everything Claude Code for Trae

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


Ã¤Â¸Âº Trae IDE Ã¥Â¸Â¦Ã¦ÂÂ¥ Everything Claude Code (ECC) Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€šÃ¦Â­Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ¦ÂÂÃ¤Â¾â€ºÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬ÂÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¥â€™Å’Ã¨Â§â€žÃ¥Ë†â„¢Ã¯Â¼Å’Ã¥ÂÂ¯Ã¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Ââ€¢Ã¤Â¸ÂªÃ¥â€˜Â½Ã¤Â»Â¤Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¤Â»Â»Ã¤Â½â€¢ Trae Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã£â‚¬â€š

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Â¼â‚¬Ã¥Â§â€¹

### Ã¦â€“Â¹Ã¥Â¼ÂÃ¤Â¸â‚¬Ã¯Â¼Å¡Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° `.trae` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°

```bash
# Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž .trae Ã§â€ºÂ®Ã¥Â½â€¢
cd /path/to/your/project
.trae/install.sh
```

Ã¨Â¿â„¢Ã¥Â°â€ Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­Ã¥Ë†â€ºÃ¥Â»Âº `.trae/`Ã£â‚¬â€š

### Ã¦â€“Â¹Ã¥Â¼ÂÃ¤ÂºÅ’Ã¯Â¼Å¡Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° `.trae-cn` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†CN Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°

```bash
# Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž .trae-cn Ã§â€ºÂ®Ã¥Â½â€¢
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

Ã¨Â¿â„¢Ã¥Â°â€ Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­Ã¥Ë†â€ºÃ¥Â»Âº `.trae-cn/`Ã£â‚¬â€š

### Ã¦â€“Â¹Ã¥Â¼ÂÃ¤Â¸â€°Ã¯Â¼Å¡Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° `~/.trae` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°

```bash
# Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° ~/.trae/
cd /path/to/your/project
.trae/install.sh ~
```

Ã¨Â¿â„¢Ã¥Â°â€ Ã¥Ë†â€ºÃ¥Â»Âº `~/.trae/`Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€°â‚¬Ã¦Å“â€° Trae Ã©Â¡Â¹Ã§â€ºÂ®Ã£â‚¬â€š

### Ã¦â€“Â¹Ã¥Â¼ÂÃ¥â€ºâ€ºÃ¯Â¼Å¡Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° `~/.trae-cn` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†CN Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°

```bash
# Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° ~/.trae-cn/
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh ~
```

Ã¨Â¿â„¢Ã¥Â°â€ Ã¥Ë†â€ºÃ¥Â»Âº `~/.trae-cn/`Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€°â‚¬Ã¦Å“â€° Trae Ã©Â¡Â¹Ã§â€ºÂ®Ã£â‚¬â€š

Ã¥Â®â€°Ã¨Â£â€¦Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã©ÂÅ¾Ã§Â Â´Ã¥ÂÂÃ¦â‚¬Â§Ã¥Â¤ÂÃ¥Ë†Â¶ - Ã¥Â®Æ’Ã¤Â¸ÂÃ¤Â¼Å¡Ã¨Â¦â€ Ã§â€ºâ€“Ã¦â€šÂ¨Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€š

## Ã¥Â®â€°Ã¨Â£â€¦Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â®â€°Ã¨Â£â€¦

Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž `.trae` Ã¦Ë†â€“ `.trae-cn` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å¡

```bash
# Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž .trae Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
cd /path/to/your/project
.trae/install.sh

# Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž .trae-cn Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†CN Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

### Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦

Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â°Ã¦â€šÂ¨Ã¤Â¸Â»Ã§â€ºÂ®Ã¥Â½â€¢Ã§Å¡â€ž `.trae` Ã¦Ë†â€“ `.trae-cn` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€°â‚¬Ã¦Å“â€° Trae Ã©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
# Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° ~/.trae/Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
.trae/install.sh ~

# Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†Â° ~/.trae-cn/Ã¯Â¼Ë†CN Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°
TRAE_ENV=cn .trae/install.sh ~
```

**Ã¦Â³Â¨Ã¦â€žÂ**Ã¯Â¼Å¡Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â®â€°Ã¨Â£â€¦Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¥Â¸Å’Ã¦Å“â€ºÃ¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¹â€¹Ã©â€”Â´Ã§Â»Â´Ã¦Å Â¤Ã¥Ââ€¢Ã¤Â¸Âª ECC Ã¥â€°Â¯Ã¦Å“Â¬Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã£â‚¬â€š

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¦â€Â¯Ã¦Å’Â

- **Ã©Â»ËœÃ¨Â®Â¤**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `.trae` Ã§â€ºÂ®Ã¥Â½â€¢
- **CN Ã§Å½Â¯Ã¥Â¢Æ’**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `.trae-cn` Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ `TRAE_ENV=cn` Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼â€°

### Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦Å’â€¡Ã¥Â®Å¡Ã§Å½Â¯Ã¥Â¢Æ’

```bash
# Ã¤Â»Å½Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¤Â½Â¿Ã§â€Â¨ CN Ã§Å½Â¯Ã¥Â¢Æ’
TRAE_ENV=cn .trae/install.sh

# Ã¨Â¿â€ºÃ¥â€¦Â¥ .trae Ã§â€ºÂ®Ã¥Â½â€¢Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã§Å½Â¯Ã¥Â¢Æ’
cd .trae
./install.sh
```

**Ã¦Â³Â¨Ã¦â€žÂ**Ã¯Â¼Å¡`TRAE_ENV` Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€¦Â¨Ã¥Â±â‚¬Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€¢Â´Ã¤Â¸ÂªÃ¥Â®â€°Ã¨Â£â€¦Ã¤Â¼Å¡Ã¨Â¯ÂÃ£â‚¬â€š

## Ã¥ÂÂ¸Ã¨Â½Â½

Ã¥ÂÂ¸Ã¨Â½Â½Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã¦Â¸â€¦Ã¥Ââ€¢Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†`.ecc-manifest`Ã¯Â¼â€°Ã¨Â·Å¸Ã¨Â¸ÂªÃ¥Â·Â²Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã§Â¡Â®Ã¤Â¿ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†Â Ã©â„¢Â¤Ã¯Â¼Å¡

```bash
# Ã¤Â»Å½Ã¥Â½â€œÃ¥â€°ÂÃ§â€ºÂ®Ã¥Â½â€¢Ã¥ÂÂ¸Ã¨Â½Â½Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â·Â²Ã§Â»ÂÃ¥Å“Â¨ .trae Ã¦Ë†â€“ .trae-cn Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­Ã¯Â¼â€°
cd .trae-cn
./uninstall.sh

# Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¤Â»Å½Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¥ÂÂ¸Ã¨Â½Â½
cd /path/to/your/project
TRAE_ENV=cn .trae/uninstall.sh

# Ã¤Â»Å½Ã¤Â¸Â»Ã§â€ºÂ®Ã¥Â½â€¢Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂÂ¸Ã¨Â½Â½
TRAE_ENV=cn .trae/uninstall.sh ~

# Ã¥ÂÂ¸Ã¨Â½Â½Ã¥â€°ÂÃ¤Â¼Å¡Ã¨Â¯Â¢Ã©â€”Â®Ã§Â¡Â®Ã¨Â®Â¤
```

### Ã¥ÂÂ¸Ã¨Â½Â½Ã¨Â¡Å’Ã¤Â¸Âº

- **Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†Â Ã©â„¢Â¤**Ã¯Â¼Å¡Ã¤Â»â€¦Ã¥Ë†Â Ã©â„¢Â¤Ã¦Â¸â€¦Ã¥Ââ€¢Ã¤Â¸Â­Ã¨Â·Å¸Ã¨Â¸ÂªÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã§â€Â± ECC Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼â€°
- **Ã¤Â¿ÂÃ§â€¢â„¢Ã§â€Â¨Ã¦Ë†Â·Ã¦â€“â€¡Ã¤Â»Â¶**Ã¯Â¼Å¡Ã¦â€šÂ¨Ã¦â€°â€¹Ã¥Å Â¨Ã¦Â·Â»Ã¥Å Â Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦â€“â€¡Ã¤Â»Â¶Ã©Æ’Â½Ã¤Â¼Å¡Ã¨Â¢Â«Ã¤Â¿ÂÃ§â€¢â„¢
- **Ã©ÂÅ¾Ã§Â©ÂºÃ§â€ºÂ®Ã¥Â½â€¢**Ã¯Â¼Å¡Ã¥Å’â€¦Ã¥ÂÂ«Ã§â€Â¨Ã¦Ë†Â·Ã¦Â·Â»Ã¥Å Â Ã¦â€“â€¡Ã¤Â»Â¶Ã§Å¡â€žÃ§â€ºÂ®Ã¥Â½â€¢Ã¤Â¼Å¡Ã¨Â¢Â«Ã¨Â·Â³Ã¨Â¿â€¡
- **Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Â¸â€¦Ã¥Ââ€¢**Ã¯Â¼Å¡Ã©Å“â‚¬Ã¨Â¦Â `.ecc-manifest` Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Å“Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¦â€”Â¶Ã¥Ë†â€ºÃ¥Â»ÂºÃ¯Â¼â€°

### Ã§Å½Â¯Ã¥Â¢Æ’Ã¦â€Â¯Ã¦Å’Â

Ã¥ÂÂ¸Ã¨Â½Â½Ã§Â¨â€¹Ã¥ÂºÂÃ©ÂÂµÃ¥Â¾ÂªÃ¤Â¸Å½Ã¥Â®â€°Ã¨Â£â€¦Ã§Â¨â€¹Ã¥ÂºÂÃ§â€ºÂ¸Ã¥ÂÅ’Ã§Å¡â€ž `TRAE_ENV` Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¯Â¼Å¡

```bash
# Ã¤Â»Å½ .trae-cn Ã¥ÂÂ¸Ã¨Â½Â½Ã¯Â¼Ë†CN Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°
TRAE_ENV=cn ./uninstall.sh

# Ã¤Â»Å½ .trae Ã¥ÂÂ¸Ã¨Â½Â½Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°
./uninstall.sh
```

**Ã¦Â³Â¨Ã¦â€žÂ**Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¦â€°Â¾Ã¤Â¸ÂÃ¥Ë†Â°Ã¦Â¸â€¦Ã¥Ââ€¢Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¦â€”Â§Ã§â€°Ë†Ã¦Å“Â¬Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å’Ã¥ÂÂ¸Ã¨Â½Â½Ã§Â¨â€¹Ã¥ÂºÂÃ¥Â°â€ Ã¨Â¯Â¢Ã©â€”Â®Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Ë†Â Ã©â„¢Â¤Ã¦â€¢Â´Ã¤Â¸ÂªÃ§â€ºÂ®Ã¥Â½â€¢Ã£â‚¬â€š

## Ã¥Å’â€¦Ã¥ÂÂ«Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹

### Ã¥â€˜Â½Ã¤Â»Â¤

Ã¥â€˜Â½Ã¤Â»Â¤Ã¦ËœÂ¯Ã©â‚¬Å¡Ã¨Â¿â€¡ Trae Ã¨ÂÅ Ã¥Â¤Â©Ã¤Â¸Â­Ã§Å¡â€ž `/` Ã¨ÂÅ“Ã¥Ââ€¢Ã¨Â°Æ’Ã§â€Â¨Ã§Å¡â€žÃ¦Å’â€°Ã©Å“â‚¬Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã¥â€˜Â½Ã¤Â»Â¤Ã©Æ’Â½Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã§Å¡â€ž `commands/` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤Â¹Ã£â‚¬â€š

### Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ

Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¦ËœÂ¯Ã¥â€¦Â·Ã¦Å“â€°Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€¦ÂÃ§Â½Â®Ã§Å¡â€žÃ¤Â¸â€œÃ©â€”Â¨ AI Ã¥Å Â©Ã¦â€°â€¹Ã£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ©Æ’Â½Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã§Å¡â€ž `agents/` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤Â¹Ã£â‚¬â€š

### Ã¦Å â‚¬Ã¨Æ’Â½

Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ËœÂ¯Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¨ÂÅ Ã¥Â¤Â©Ã¤Â¸Â­Ã§Å¡â€ž `/` Ã¨ÂÅ“Ã¥Ââ€¢Ã¨Â°Æ’Ã§â€Â¨Ã§Å¡â€žÃ¦Å’â€°Ã©Å“â‚¬Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Å â‚¬Ã¨Æ’Â½Ã©Æ’Â½Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž `skills/` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤Â¹Ã£â‚¬â€š

### Ã¨Â§â€žÃ¥Ë†â„¢

Ã¨Â§â€žÃ¥Ë†â„¢Ã¦ÂÂÃ¤Â¾â€ºÃ¥Â§â€¹Ã§Â»Ë†Ã©â‚¬â€šÃ§â€Â¨Ã§Å¡â€žÃ¨Â§â€žÃ¥Ë†â„¢Ã¥â€™Å’Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Å’Ã¥Â¡â€˜Ã©â‚¬Â Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Â¤â€žÃ§Ââ€ Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€“Â¹Ã¥Â¼ÂÃ£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â§â€žÃ¥Ë†â„¢Ã©Æ’Â½Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã§Å¡â€ž `rules/` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤Â¹Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

1. Ã¥Å“Â¨Ã¨ÂÅ Ã¥Â¤Â©Ã¤Â¸Â­Ã¨Â¾â€œÃ¥â€¦Â¥ `/` Ã¤Â»Â¥Ã¦â€°â€œÃ¥Â¼â‚¬Ã¥â€˜Â½Ã¤Â»Â¤Ã¨ÂÅ“Ã¥Ââ€¢
2. Ã©â‚¬â€°Ã¦â€¹Â©Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Ë†â€“Ã¦Å â‚¬Ã¨Æ’Â½
3. Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Â°â€ Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥â€¦Â·Ã¤Â½â€œÃ¨Â¯Â´Ã¦ËœÅ½Ã¥â€™Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã¦Å’â€¡Ã¥Â¯Â¼Ã¦â€šÂ¨Ã¥Â®Å’Ã¦Ë†ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

## Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â»â€œÃ¦Å¾â€ž

```
.trae/ (Ã¦Ë†â€“ .trae-cn/)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/           # Ã¥â€˜Â½Ã¤Â»Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ agents/             # Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ skills/             # Ã¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡Âª skills/Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ rules/              # Ã¨Â§â€žÃ¥Ë†â„¢Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Â¤ÂÃ§â€Â¨Ã¨â€¡ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ install.sh          # Ã¥Â®â€°Ã¨Â£â€¦Ã¨â€žÅ¡Ã¦Å“Â¬
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ uninstall.sh        # Ã¥ÂÂ¸Ã¨Â½Â½Ã¨â€žÅ¡Ã¦Å“Â¬
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ README.md           # Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶
```

## Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°

Ã¥Â®â€°Ã¨Â£â€¦Ã¥ÂÅ½Ã¯Â¼Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã©Æ’Â½Ã¥Â½â€™Ã¦â€šÂ¨Ã¤Â¿Â®Ã¦â€Â¹Ã£â‚¬â€šÃ¥Â®â€°Ã¨Â£â€¦Ã§Â¨â€¹Ã¥ÂºÂÃ¦Â°Â¸Ã¨Â¿Å“Ã¤Â¸ÂÃ¤Â¼Å¡Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½Â°Ã¦Å“â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¥â€ºÂ Ã¦Â­Â¤Ã¦â€šÂ¨Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Å“Â¨Ã©â€¡ÂÃ¦â€“Â°Ã¥Â®â€°Ã¨Â£â€¦Ã¦â€”Â¶Ã¦ËœÂ¯Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ£â‚¬â€š

**Ã¦Â³Â¨Ã¦â€žÂ**Ã¯Â¼Å¡Ã¥Â®â€°Ã¨Â£â€¦Ã¦â€”Â¶Ã¤Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Â°â€  `install.sh` Ã¥â€™Å’ `uninstall.sh` Ã¨â€žÅ¡Ã¦Å“Â¬Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â°Ã§â€ºÂ®Ã¦Â â€¡Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å’Ã¨Â¿â„¢Ã¦Â Â·Ã¦â€šÂ¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Å“Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Å“Â¬Ã¥Å“Â°Ã§â€ºÂ´Ã¦Å½Â¥Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š

## Ã¦Å½Â¨Ã¨ÂÂÃ§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

1. **Ã¤Â»Å½Ã¨Â®Â¡Ã¥Ë†â€™Ã¥Â¼â‚¬Ã¥Â§â€¹**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `/plan` Ã¥â€˜Â½Ã¤Â»Â¤Ã¥Ë†â€ Ã¨Â§Â£Ã¥Â¤ÂÃ¦Ââ€šÃ¥Å Å¸Ã¨Æ’Â½
2. **Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¹â€¹Ã¥â€°ÂÃ¨Â°Æ’Ã§â€Â¨ `/tdd` Ã¥â€˜Â½Ã¤Â»Â¤
3. **Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦â€šÂ¨Ã§Å¡â€žÃ¤Â»Â£Ã§Â Â**Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨ `/code-review`
4. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂAPI Ã§Â«Â¯Ã§â€šÂ¹Ã¦Ë†â€“Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â¤â€žÃ§Ââ€ Ã¯Â¼Å’Ã¥â€ ÂÃ¦Â¬Â¡Ã¤Â½Â¿Ã§â€Â¨ `/code-review`
5. **Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/build-fix`

## Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¦Â­Â¥

- Ã¥Å“Â¨ Trae Ã¤Â¸Â­Ã¦â€°â€œÃ¥Â¼â‚¬Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®
- Ã¨Â¾â€œÃ¥â€¦Â¥ `/` Ã¤Â»Â¥Ã¦Å¸Â¥Ã§Å“â€¹Ã¥ÂÂ¯Ã§â€Â¨Ã¥â€˜Â½Ã¤Â»Â¤
- Ã¤ÂºÂ«Ã¥Ââ€” ECC Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¯Â¼Â
