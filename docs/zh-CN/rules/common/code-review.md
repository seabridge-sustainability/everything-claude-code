# Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¦Â â€¡Ã¥â€¡â€ 

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


## Ã§â€ºÂ®Ã§Å¡â€ž

Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã§Â¡Â®Ã¤Â¿ÂÃ¤Â»Â£Ã§Â ÂÃ¥ÂË†Ã¥Â¹Â¶Ã¥â€°ÂÃ§Å¡â€žÃ¨Â´Â¨Ã©â€¡ÂÃ£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§Ã£â‚¬â€šÃ¦Â­Â¤Ã¨Â§â€žÃ¥Ë†â„¢Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â»Â¥Ã¥ÂÅ Ã¥Â¦â€šÃ¤Â½â€¢Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¥Â®Â¡Ã¦Å¸Â¥

**Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¥Â®Â¡Ã¦Å¸Â¥Ã¨Â§Â¦Ã¥Ââ€˜Ã¦ÂÂ¡Ã¤Â»Â¶Ã¯Â¼Å¡**

- Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½
- Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â°Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥Ë†â€ Ã¦â€Â¯Ã¤Â¹â€¹Ã¥â€°Â
- Ã¦â€ºÂ´Ã¦â€Â¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€¢ÂÃ¦â€žÅ¸Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶Ã¯Â¼Ë†Ã¨Â®Â¤Ã¨Â¯ÂÃ£â‚¬ÂÃ¦â€Â¯Ã¤Â»ËœÃ£â‚¬ÂÃ§â€Â¨Ã¦Ë†Â·Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼â€°
- Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¦â€”Â¶
- Ã¥ÂË†Ã¥Â¹Â¶ pull request Ã¤Â¹â€¹Ã¥â€°Â

**Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€°ÂÃ¨Â¦ÂÃ¦Â±â€šÃ¯Â¼Å¡**

Ã¥Å“Â¨Ã¨Â¯Â·Ã¦Â±â€šÃ¥Â®Â¡Ã¦Å¸Â¥Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã§Â¡Â®Ã¤Â¿ÂÃ¯Â¼Å¡

- Ã¦â€°â‚¬Ã¦Å“â€°Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†CI/CDÃ¯Â¼â€°Ã¥Â·Â²Ã©â‚¬Å¡Ã¨Â¿â€¡
- Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€ Â²Ã§ÂªÂÃ¥Â·Â²Ã¨Â§Â£Ã¥â€ Â³
- Ã¥Ë†â€ Ã¦â€Â¯Ã¥Â·Â²Ã¤Â¸Å½Ã§â€ºÂ®Ã¦Â â€¡Ã¥Ë†â€ Ã¦â€Â¯Ã¥ÂÅ’Ã¦Â­Â¥

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

Ã¥Å“Â¨Ã¦Â â€¡Ã¨Â®Â°Ã¤Â»Â£Ã§Â ÂÃ¥Â®Å’Ã¦Ë†ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

- [ ] Ã¤Â»Â£Ã§Â ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¤Â¸â€Ã¥â€˜Â½Ã¥ÂÂÃ¨â€°Â¯Ã¥Â¥Â½
- [ ] Ã¥â€¡Â½Ã¦â€¢Â°Ã¨ÂÅ¡Ã§â€žÂ¦Ã¯Â¼Ë†<50 Ã¨Â¡Å’Ã¯Â¼â€°
- [ ] Ã¦â€“â€¡Ã¤Â»Â¶Ã¥â€ â€¦Ã¨ÂÅ¡Ã¯Â¼Ë†<800 Ã¨Â¡Å’Ã¯Â¼â€°
- [ ] Ã¦â€”Â Ã¦Â·Â±Ã¥Â±â€šÃ¥ÂµÅ’Ã¥Â¥â€”Ã¯Â¼Ë†>4 Ã¥Â±â€šÃ¯Â¼â€°
- [ ] Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Â¤â€žÃ§Ââ€ 
- [ ] Ã¦â€”Â Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥Ã¦Ë†â€“Ã¥â€¡Â­Ã¦ÂÂ®
- [ ] Ã¦â€”Â  console.log Ã¦Ë†â€“Ã¨Â°Æ’Ã¨Â¯â€¢Ã¨Â¯Â­Ã¥ÂÂ¥
- [ ] Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢
- [ ] Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Â»Â¡Ã¨Â¶Â³ 80% Ã¦Å“â‚¬Ã¤Â½Å½Ã¨Â¦ÂÃ¦Â±â€š

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â®Â¡Ã¦Å¸Â¥Ã¨Â§Â¦Ã¥Ââ€˜Ã¦ÂÂ¡Ã¤Â»Â¶

**Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨ security-reviewer Ã¤Â»Â£Ã§Ââ€ Ã¥Â½â€œÃ¯Â¼Å¡**

- Ã¨Â®Â¤Ã¨Â¯ÂÃ¦Ë†â€“Ã¦Å½Ë†Ã¦ÂÆ’Ã¤Â»Â£Ã§Â Â
- Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥Â¤â€žÃ§Ââ€ 
- Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Å¸Â¥Ã¨Â¯Â¢
- Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã¦â€œÂÃ¤Â½Å“
- Ã¥Â¤â€“Ã©Æ’Â¨ API Ã¨Â°Æ’Ã§â€Â¨
- Ã¥Å Â Ã¥Â¯â€ Ã¦â€œÂÃ¤Â½Å“
- Ã¦â€Â¯Ã¤Â»ËœÃ¦Ë†â€“Ã©â€¡â€˜Ã¨Å¾ÂÃ¤Â»Â£Ã§Â Â

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â¸Â¥Ã©â€¡ÂÃ§ÂºÂ§Ã¥Ë†Â«

| Ã§ÂºÂ§Ã¥Ë†Â« | Ã¥ÂÂ«Ã¤Â¹â€° | Ã¨Â¡Å’Ã¥Å Â¨ |
|-------|---------|--------|
| CRITICALÃ¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼â€° | Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã¦Ë†â€“Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¸Â¢Ã¥Â¤Â±Ã©Â£Å½Ã©â„¢Â© | **Ã©ËœÂ»Ã¦Â­Â¢** - Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€°ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤Â |
| HIGHÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€° | Bug Ã¦Ë†â€“Ã©â€¡ÂÃ¥Â¤Â§Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â®Ã©Â¢Ëœ | **Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€°ÂÃ¥Âºâ€Ã¤Â¿Â®Ã¥Â¤Â |
| MEDIUMÃ¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€° | Ã¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢Ëœ | **Ã¤Â¿Â¡Ã¦ÂÂ¯** - Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¤Â¿Â®Ã¥Â¤Â |
| LOWÃ¯Â¼Ë†Ã¤Â½Å½Ã¯Â¼â€° | Ã©Â£Å½Ã¦Â Â¼Ã¦Ë†â€“Ã¦Â¬Â¡Ã¨Â¦ÂÃ¥Â»ÂºÃ¨Â®Â® | **Ã¦Â³Â¨Ã¦â€žÂ** - Ã¥ÂÂ¯Ã©â‚¬â€° |

## Ã¤Â»Â£Ã§Ââ€ Ã¤Â½Â¿Ã§â€Â¨

Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å¡

| Ã¤Â»Â£Ã§Ââ€  | Ã§â€Â¨Ã©â‚¬â€ |
|-------|--------|
| **code-reviewer** | Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ£â‚¬ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ |
| **security-reviewer** | Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã£â‚¬ÂOWASP Top 10 |
| **typescript-reviewer** | TypeScript/JavaScript Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢Ëœ |
| **python-reviewer** | Python Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢Ëœ |
| **go-reviewer** | Go Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢Ëœ |
| **rust-reviewer** | Rust Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢Ëœ |

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```
1. Ã¨Â¿ÂÃ¨Â¡Å’ git diff Ã¤Âºâ€ Ã¨Â§Â£Ã¦â€ºÂ´Ã¦â€Â¹
2. Ã¥â€¦Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢
3. Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢
4. Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Âµâ€¹Ã¨Â¯â€¢
5. Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ >= 80%
6. Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¯Â¦Ã§Â»â€ Ã¥Â®Â¡Ã¦Å¸Â¥
```

## Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€”Â®Ã©Â¢ËœÃ¦Ââ€¢Ã¨Å½Â·

### Ã¥Â®â€°Ã¥â€¦Â¨

- Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥â€¡Â­Ã¦ÂÂ®Ã¯Â¼Ë†API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¯Â¼â€°
- SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦â€¹Â¼Ã¦Å½Â¥Ã¯Â¼â€°
- XSS Ã¦Â¼ÂÃ¦Â´Å¾Ã¯Â¼Ë†Ã¦Å“ÂªÃ¨Â½Â¬Ã¤Â¹â€°Ã§Å¡â€žÃ§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼â€°
- Ã¨Â·Â¯Ã¥Â¾â€žÃ©ÂÂÃ¥Å½â€ Ã¯Â¼Ë†Ã¦Å“ÂªÃ¥â€¡â‚¬Ã¥Å’â€“Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼â€°
- CSRF Ã¤Â¿ÂÃ¦Å Â¤Ã§Â¼ÂºÃ¥Â¤Â±
- Ã¨Â®Â¤Ã¨Â¯ÂÃ§Â»â€¢Ã¨Â¿â€¡

### Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â

- Ã¥Â¤Â§Ã¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Ë†>50 Ã¨Â¡Å’Ã¯Â¼â€°- Ã¦â€¹â€ Ã¥Ë†â€ Ã¤Â¸ÂºÃ¦â€ºÂ´Ã¥Â°ÂÃ§Å¡â€ž
- Ã¥Â¤Â§Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†>800 Ã¨Â¡Å’Ã¯Â¼â€°- Ã¦ÂÂÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Ââ€”
- Ã¦Â·Â±Ã¥Â±â€šÃ¥ÂµÅ’Ã¥Â¥â€”Ã¯Â¼Ë†>4 Ã¥Â±â€šÃ¯Â¼â€°- Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¥â€°ÂÃ¨Â¿â€Ã¥â€ºÅ¾
- Ã§Â¼ÂºÃ¥Â°â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€  - Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Â¤â€žÃ§Ââ€ 
- Ã¥ÂËœÃ¦â€ºÂ´Ã¦Â¨Â¡Ã¥Â¼Â - Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â€œÂÃ¤Â½Å“
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã¦Â·Â»Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“

### Ã¦â‚¬Â§Ã¨Æ’Â½

- N+1 Ã¦Å¸Â¥Ã¨Â¯Â¢ - Ã¤Â½Â¿Ã§â€Â¨ JOIN Ã¦Ë†â€“Ã¦â€°Â¹Ã¥Â¤â€žÃ§Ââ€ 
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Ë†â€ Ã©Â¡Âµ - Ã§Â»â„¢Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦Â·Â»Ã¥Å Â  LIMIT
- Ã¦â€”Â Ã§â€¢Å’Ã¦Å¸Â¥Ã¨Â¯Â¢ - Ã¦Â·Â»Ã¥Å Â Ã§ÂºÂ¦Ã¦ÂÅ¸
- Ã§Â¼ÂºÃ¥Â°â€˜Ã§Â¼â€œÃ¥Â­Ëœ - Ã§Â¼â€œÃ¥Â­ËœÃ¦Ëœâ€šÃ¨Â´ÂµÃ¦â€œÂÃ¤Â½Å“

## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â â€¡Ã¥â€¡â€ 

- **Ã¦â€°Â¹Ã¥â€¡â€ **Ã¯Â¼Å¡Ã¦â€”Â Ã¥â€¦Â³Ã©â€Â®Ã¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢Ëœ
- **Ã¨Â­Â¦Ã¥â€˜Å **Ã¯Â¼Å¡Ã¤Â»â€¦Ã¦Å“â€°Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼â€°
- **Ã©ËœÂ»Ã¦Â­Â¢**Ã¯Â¼Å¡Ã¥Ââ€˜Ã§Å½Â°Ã¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¨Â§â€žÃ¥Ë†â„¢Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

Ã¦Â­Â¤Ã¨Â§â€žÃ¥Ë†â„¢Ã¤Â¸Å½Ã¤Â»Â¥Ã¤Â¸â€¹Ã¨Â§â€žÃ¥Ë†â„¢Ã©â€¦ÂÃ¥ÂË†Ã¯Â¼Å¡

- [testing.md](testing.md) - Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¨Â¦ÂÃ¦Â±â€š
- [security.md](security.md) - Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢
- [git-workflow.md](git-workflow.md) - Ã¦ÂÂÃ¤ÂºÂ¤Ã¦Â â€¡Ã¥â€¡â€ 
- [agents.md](agents.md) - Ã¤Â»Â£Ã§Ââ€ Ã¥Â§â€Ã¦â€°Ëœ
