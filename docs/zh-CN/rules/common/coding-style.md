# Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§Ã¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼â€°

Ã¥Â§â€¹Ã§Â»Ë†Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å’Ã§Â»ÂÃ¤Â¸ÂÃ¦â€Â¹Ã¥ÂËœÃ§Å½Â°Ã¦Å“â€°Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å¡

```
// Ã¤Â¼ÂªÃ¤Â»Â£Ã§Â Â
WRONG:  modify(original, field, value) Ã¢â€ â€™ Ã¥Å½Å¸Ã¥Å“Â°Ã¤Â¿Â®Ã¦â€Â¹ original
CORRECT: update(original, field, value) Ã¢â€ â€™ Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“Â°Ã¥â€°Â¯Ã¦Å“Â¬
```

Ã§Ââ€ Ã§â€Â±Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â€¢Â°Ã¦ÂÂ®Ã¥ÂÂ¯Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã©Å¡ÂÃ¨â€”ÂÃ§Å¡â€žÃ¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã¯Â¼Å’Ã¤Â½Â¿Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦â€ºÂ´Ã¥Â®Â¹Ã¦Ëœâ€œÃ¯Â¼Å’Ã¥Â¹Â¶Ã¦â€Â¯Ã¦Å’ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã£â‚¬â€š

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€žÃ§Â»â€¡

Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥Â°ÂÃ¦â€“â€¡Ã¤Â»Â¶ > Ã¥Â°â€˜Ã¦â€¢Â°Ã¥Â¤Â§Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

* Ã©Â«ËœÃ¥â€ â€¦Ã¨ÂÅ¡Ã¯Â¼Å’Ã¤Â½Å½Ã¨â‚¬Â¦Ã¥ÂË†
* Ã©â‚¬Å¡Ã¥Â¸Â¸ 200-400 Ã¨Â¡Å’Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â¤Å¡ 800 Ã¨Â¡Å’
* Ã¤Â»Å½Ã¥Â¤Â§Ã¥Å¾â€¹Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã¥Â®Å¾Ã§â€Â¨Ã¥Â·Â¥Ã¥â€¦Â·
* Ã¦Å’â€°Ã¥Å Å¸Ã¨Æ’Â½/Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¦Å’â€°Ã§Â±Â»Ã¥Å¾â€¹Ã§Â»â€žÃ§Â»â€¡

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¥Â§â€¹Ã§Â»Ë†Ã¥â€¦Â¨Ã©ÂÂ¢Ã¥Â¤â€žÃ§Ââ€ Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

* Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Â±â€šÃ§ÂºÂ§Ã¦ËœÅ½Ã§Â¡Â®Ã¥Â¤â€žÃ§Ââ€ Ã©â€â„¢Ã¨Â¯Â¯
* Ã¥Å“Â¨Ã©ÂÂ¢Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¦ÂÂÃ¤Â¾â€ºÃ§â€Â¨Ã¦Ë†Â·Ã¥Ââ€¹Ã¥Â¥Â½Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯
* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã¨Â®Â°Ã¥Â½â€¢Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* Ã§Â»ÂÃ¤Â¸ÂÃ©Â»ËœÃ©Â»ËœÃ¥Å“Â°Ã¥Â¿Â½Ã§â€¢Â¥Ã©â€â„¢Ã¨Â¯Â¯

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

Ã¥Â§â€¹Ã§Â»Ë†Ã¥Å“Â¨Ã§Â³Â»Ã§Â»Å¸Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡

* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥
* Ã¥Å“Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¨Â¯Â
* Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯
* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â¿Â¡Ã¤Â»Â»Ã¥Â¤â€“Ã©Æ’Â¨Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†API Ã¥â€œÂÃ¥Âºâ€Ã£â‚¬ÂÃ§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼â€°

## Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

Ã¥Å“Â¨Ã¦Â â€¡Ã¨Â®Â°Ã¥Â·Â¥Ã¤Â½Å“Ã¥Â®Å’Ã¦Ë†ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

* \[ ] Ã¤Â»Â£Ã§Â ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¤Â¸â€Ã¥â€˜Â½Ã¥ÂÂÃ¨â€°Â¯Ã¥Â¥Â½
* \[ ] Ã¥â€¡Â½Ã¦â€¢Â°Ã§Å¸Â­Ã¥Â°ÂÃ¯Â¼Ë†<50 Ã¨Â¡Å’Ã¯Â¼â€°
* \[ ] Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸â€œÃ¦Â³Â¨Ã¯Â¼Ë†<800 Ã¨Â¡Å’Ã¯Â¼â€°
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥ÂµÅ’Ã¥Â¥â€”Ã¯Â¼Ë†>4 Ã¥Â±â€šÃ¯Â¼â€°
* \[ ] Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â‚¬Â¼Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¸Ã©â€¡ÂÃ¦Ë†â€“Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼â€°
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã§ÂªÂÃ¥ÂËœÃ¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
