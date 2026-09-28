# Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/git-workflow.md](git-workflow.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Âºâ€ Ã¦â€°Â©Ã¥Â±â€¢Ã¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¤Âºâ€ Ã¥Å“Â¨ git Ã¦â€œÂÃ¤Â½Å“Ã¤Â¹â€¹Ã¥â€°ÂÃ¥Ââ€˜Ã§â€Å¸Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¨Â¿â€¡Ã§Â¨â€¹Ã£â‚¬â€š

Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â®Å¾Ã§Å½Â°Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¦ÂÂÃ¨Â¿Â°Ã¤Âºâ€ Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¯Â¼Å¡Ã§Â â€Ã§Â©Â¶Ã£â‚¬ÂÃ¨Â§â€žÃ¥Ë†â€™Ã£â‚¬ÂTDDÃ£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â° gitÃ£â‚¬â€š

## Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â®Å¾Ã§Å½Â°Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

0. **Ã§Â â€Ã§Â©Â¶Ã¤Â¸Å½Ã¥Â¤ÂÃ§â€Â¨** *(Ã¤Â»Â»Ã¤Â½â€¢Ã¦â€“Â°Ã¥Â®Å¾Ã§Å½Â°Ã¥â€°ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¦â€°Â§Ã¨Â¡Å’)*
   * **Ã¤Â¼ËœÃ¥â€¦Ë†Ã¨Â¿â€ºÃ¨Â¡Å’ GitHub Ã¤Â»Â£Ã§Â ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å¡** Ã¥Å“Â¨Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â»Ã¤Â½â€¢Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¨Â¿ÂÃ¨Â¡Å’ `gh search repos` Ã¥â€™Å’ `gh search code` Ã¤Â»Â¥Ã¦Å¸Â¥Ã¦â€°Â¾Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°Ã£â‚¬ÂÃ¦Â¨Â¡Ã¦ÂÂ¿Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
   * **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¦Å¸Â¥Ã©Ëœâ€¦Ã¥Âºâ€œÃ¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Å¡** Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ Context7 Ã¦Ë†â€“Ã¤Â¸Â»Ã¨Â¦ÂÃ¤Â¾â€ºÃ¥Âºâ€Ã¥â€¢â€ Ã¦â€“â€¡Ã¦Â¡Â£Ã¦ÂÂ¥Ã§Â¡Â®Ã¨Â®Â¤ API Ã¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬ÂÃ¥Å’â€¦Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã¤Â»Â¥Ã¥ÂÅ Ã§â€°Ë†Ã¦Å“Â¬Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ§Â»â€ Ã¨Å â€šÃ£â‚¬â€š
   * **Ã¤Â»â€¦Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸Å Ã¤Â¸Â¤Ã¨â‚¬â€¦Ã¤Â¸ÂÃ¨Â¶Â³Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ ExaÃ¯Â¼Å¡** Ã¥Å“Â¨ GitHub Ã¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã¤Â¸Â»Ã¨Â¦ÂÃ¦â€“â€¡Ã¦Â¡Â£Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å’Ã¥â€ ÂÃ¤Â½Â¿Ã§â€Â¨ Exa Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€ºÂ´Ã¥Â¹Â¿Ã¦Â³â€ºÃ§Å¡â€žÃ§Â½â€˜Ã§Â»Å“Ã§Â â€Ã§Â©Â¶Ã¦Ë†â€“Ã¦Å½Â¢Ã§Â´Â¢Ã£â‚¬â€š
   * **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Å’â€¦Ã¦Â³Â¨Ã¥â€ Å’Ã¤Â¸Â­Ã¥Â¿Æ’Ã¯Â¼Å¡** Ã¥Å“Â¨Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â·Â¥Ã¥â€¦Â·Ã¤Â»Â£Ã§Â ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¦ÂÅ“Ã§Â´Â¢ npmÃ£â‚¬ÂPyPIÃ£â‚¬Âcrates.io Ã¥â€™Å’Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Â³Â¨Ã¥â€ Å’Ã¤Â¸Â­Ã¥Â¿Æ’Ã£â‚¬â€šÃ¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬â€°Ã¦â€¹Â©Ã§Â»ÂÃ¨Â¿â€¡Ã¥Â®Å¾Ã¦Ë†ËœÃ¦Â£â‚¬Ã©ÂªÅ’Ã§Å¡â€žÃ¥Âºâ€œÃ¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¨â€¡ÂªÃ¥Â·Â±Ã¥Å Â¨Ã¦â€°â€¹Ã¥Â®Å¾Ã§Å½Â°Ã£â‚¬â€š
   * **Ã¥Â¯Â»Ã¦â€°Â¾Ã¥ÂÂ¯Ã©â‚¬â€šÃ©â€¦ÂÃ§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å¡** Ã¥Â¯Â»Ã¦â€°Â¾Ã¨Æ’Â½Ã¨Â§Â£Ã¥â€ Â³ 80% Ã¤Â»Â¥Ã¤Â¸Å Ã©â€”Â®Ã©Â¢ËœÃ§Å¡â€žÃ¥Â¼â‚¬Ã¦ÂºÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¥Ââ€°Ã£â‚¬ÂÃ§Â§Â»Ã¦Â¤ÂÃ¦Ë†â€“Ã¥Â°ÂÃ¨Â£â€¦Ã£â‚¬â€š
   * Ã¥Â¦â€šÃ¦Å¾Å“Ã§Â»ÂÃ¨Â¿â€¡Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢Ã¨Æ’Â½Ã¦Â»Â¡Ã¨Â¶Â³Ã©Å“â‚¬Ã¦Â±â€šÃ¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã©â€¡â€¡Ã§â€Â¨Ã¦Ë†â€“Ã§Â§Â»Ã¦Â¤ÂÃ¨Â¯Â¥Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã§Â¼â€“Ã¥â€ â„¢Ã¥â€¦Â¨Ã¦â€“Â°Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ£â‚¬â€š

1. **Ã¥â€¦Ë†Ã¨Â§â€žÃ¥Ë†â€™**
   * Ã¤Â½Â¿Ã§â€Â¨ **planner** Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¦ÂÂ¥Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â®Å¾Ã¦â€“Â½Ã¨Â®Â¡Ã¥Ë†â€™
   * Ã§Â¼â€“Ã§Â ÂÃ¥â€°ÂÃ§â€Å¸Ã¦Ë†ÂÃ¨Â§â€žÃ¥Ë†â€™Ã¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Å¡PRDÃ£â‚¬ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ£â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¨Â®Â¾Ã¨Â®Â¡Ã£â‚¬ÂÃ¦Å â‚¬Ã¦Å“Â¯Ã¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬ÂÃ¤Â»Â»Ã¥Å Â¡Ã¥Ë†â€”Ã¨Â¡Â¨
   * Ã¨Â¯â€ Ã¥Ë†Â«Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥â€™Å’Ã©Â£Å½Ã©â„¢Â©
   * Ã¥Ë†â€ Ã¨Â§Â£Ã¤Â¸ÂºÃ¥Â¤Å¡Ã¤Â¸ÂªÃ©ËœÂ¶Ã¦Â®Âµ

2. **TDD Ã¦â€“Â¹Ã¦Â³â€¢**
   * Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ
   * Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†REDÃ¯Â¼â€°
   * Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†GREENÃ¯Â¼â€°
   * Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Ë†IMPROVEÃ¯Â¼â€°
   * Ã©ÂªÅ’Ã¨Â¯Â 80% Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

3. **Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥**
   * Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½Ã§Â«â€¹Ã¥ÂÂ³Ã¤Â½Â¿Ã§â€Â¨ **code-reviewer** Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ
   * Ã¨Â§Â£Ã¥â€ Â³ CRITICAL Ã¥â€™Å’ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ
   * Ã¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¿Â®Ã¥Â¤Â MEDIUM Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ

4. **Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â¸Å½Ã¦Å½Â¨Ã©â‚¬Â**
   * Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ¦ÂÂÃ¤ÂºÂ¤Ã¤Â¿Â¡Ã¦ÂÂ¯
   * Ã©ÂÂµÃ¥Â¾ÂªÃ§ÂºÂ¦Ã¥Â®Å¡Ã¥Â¼ÂÃ¦ÂÂÃ¤ÂºÂ¤Ã¦Â Â¼Ã¥Â¼Â
   * Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¦Â Â¼Ã¥Â¼ÂÃ¥â€™Å’ PR Ã¦ÂµÂÃ§Â¨â€¹Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [git-workflow.md](git-workflow.md)
