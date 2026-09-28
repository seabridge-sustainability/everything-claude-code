# ÃªÂ³ÂµÃ­â€ Âµ Ã­Å’Â¨Ã­â€žÂ´

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


## Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸

Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬Ââ€ž ÃªÂµÂ¬Ã­Ëœâ€žÃ­â€¢Â  Ã«â€¢Å’:
1. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã«Â¥Â¼ ÃªÂ²â‚¬Ã¬Æ’â€°
2. Ã«Â³â€˜Ã«Â Â¬ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¡Å“ Ã¬ËœÂµÃ¬â€¦Ëœ Ã­Ââ€°ÃªÂ°â‚¬:
   - Ã«Â³Â´Ã¬â€¢Ë† Ã­Ââ€°ÃªÂ°â‚¬
   - Ã­â„¢â€¢Ã¬Å¾Â¥Ã¬â€žÂ± Ã«Â¶â€žÃ¬â€žÂ
   - ÃªÂ´â‚¬Ã«Â Â¨Ã¬â€žÂ± Ã¬Â ÂÃ¬Ë†Ëœ
   - ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â
3. ÃªÂ°â‚¬Ã¬Å¾Â¥ Ã¬Â ÂÃ­â€¢Â©Ã­â€¢Å“ ÃªÂ²Æ’Ã¬Ââ€ž ÃªÂ¸Â°Ã«Â°ËœÃ¬Å“Â¼Ã«Â¡Å“ Ã­ÂÂ´Ã«Â¡Â 
4. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ ÃªÂµÂ¬Ã¬Â¡Â° Ã«â€šÂ´Ã¬â€”ÂÃ¬â€žÅ“ Ã«Â°ËœÃ«Â³Âµ ÃªÂ°Å“Ã¬â€žÂ 

## Ã«â€â€Ã¬Å¾ÂÃ¬ÂÂ¸ Ã­Å’Â¨Ã­â€žÂ´

### Ã«Â¦Â¬Ã­ÂÂ¬Ã¬Â§â‚¬Ã­â€ Â Ã«Â¦Â¬ Ã­Å’Â¨Ã­â€žÂ´

Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã«â€™Â¤Ã¬â€”Â Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â€˜ÃªÂ·Â¼Ã¬Ââ€ž Ã¬ÂºÂ¡Ã¬Å ÂÃ­â„¢â€:
- Ã­â€˜Å“Ã¬Â¤â‚¬ Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬Â â€¢Ã¬ÂËœ: findAll, findById, create, update, delete
- ÃªÂµÂ¬Ã¬Â²Â´Ã¬Â Â ÃªÂµÂ¬Ã­Ëœâ€žÃ¬ÂÂ´ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã¬â€žÂ¸Ã«Â¶â‚¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬Â²ËœÃ«Â¦Â¬ (Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤, API, Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€œÂ±)
- Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ‚¬ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã«Â©â€Ã¬Â»Â¤Ã«â€¹Ë†Ã¬Â¦ËœÃ¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬Â¶â€Ã¬Æ’Â Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤Ã¬â€”Â Ã¬ÂËœÃ¬Â¡Â´
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬â€ Å’Ã¬Å Â¤Ã¬ÂËœ Ã¬â€°Â¬Ã¬Å¡Â´ ÃªÂµÂÃ¬Â²Â´ Ã«Â°Â Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬Ââ€ž Ã­â€ ÂµÃ­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«â€¹Â¨Ã¬Ë†Å“Ã­â„¢â€ ÃªÂ°â‚¬Ã«Å Â¥

### API Ã¬Ââ€˜Ã«â€¹Âµ Ã­Ëœâ€¢Ã¬â€¹Â

Ã«ÂªÂ¨Ã«â€œÂ  API Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬â€”â€Ã«Â²Â¨Ã«Â¡Å“Ã­â€â€ž Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€žÂ±ÃªÂ³Âµ/Ã¬Æ’ÂÃ­Æ’Å“ Ã­â€˜Å“Ã¬â€¹Å“Ã¬Å¾Â Ã­ÂÂ¬Ã­â€¢Â¨
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­Å½ËœÃ¬ÂÂ´Ã«Â¡Å“Ã«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€”ÂÃ«Å¸Â¬ Ã¬â€¹Å“ null)
- Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ Ã­â€¢â€žÃ«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€žÂ±ÃªÂ³Âµ Ã¬â€¹Å“ null)
- Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬Ã«â€žÂ¤Ã¬ÂÂ´Ã¬â€¦Ëœ Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã«Â©â€Ã­Æ’â‚¬Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­ÂÂ¬Ã­â€¢Â¨ (total, page, limit)
