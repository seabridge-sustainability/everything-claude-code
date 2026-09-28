# Capture Ã¦Å’â€¡Ã¥Ââ€”

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


## Ã¦Â¦â€šÃ¨Â¿Â°

VideoDB Capture Ã¦â€Â¯Ã¦Å’ÂÃ¥Â®Å¾Ã¦â€”Â¶Ã¥Â±ÂÃ¥Â¹â€¢Ã¥â€™Å’Ã©Å¸Â³Ã©Â¢â€˜Ã¥Â½â€¢Ã¥Ë†Â¶Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥â€¦Â·Ã¥Â¤â€¡ AI Ã¥Â¤â€žÃ§Ââ€ Ã¨Æ’Â½Ã¥Å â€ºÃ£â‚¬â€šÃ¦Â¡Å’Ã©ÂÂ¢Ã¦Ââ€¢Ã¨Å½Â·Ã§â€ºÂ®Ã¥â€°ÂÃ¤Â»â€¦Ã¦â€Â¯Ã¦Å’Â **macOS**Ã£â‚¬â€š

Ã¥â€¦Â³Ã¤ÂºÅ½Ã¤Â»Â£Ã§Â ÂÃ¥Â±â€šÃ©ÂÂ¢Ã§Å¡â€žÃ¨Â¯Â¦Ã§Â»â€ Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Ë†SDK Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ¤Âºâ€¹Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€žÃ£â‚¬ÂAI Ã§Â®Â¡Ã©Ââ€œÃ¯Â¼â€°Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [capture-reference.md](capture-reference.md)Ã£â‚¬â€š

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Â¼â‚¬Ã¥Â§â€¹

1. **Ã¥ÂÂ¯Ã¥Å Â¨ WebSocket Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨**Ã¯Â¼Å¡`python scripts/ws_listener.py --clear &`
2. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â»Â£Ã§Â Â**Ã¯Â¼Ë†Ã¨Â§ÂÃ¤Â¸â€¹Ã¦â€“Â¹Ã¥Â®Å’Ã¦â€¢Â´Ã¦Ââ€¢Ã¨Å½Â·Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¯Â¼â€°
3. **Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥â€ â„¢Ã¥â€¦Â¥Ã¥Ë†Â°**Ã¯Â¼Å¡`/tmp/videodb_events.jsonl`

***

## Ã¥Â®Å’Ã¦â€¢Â´Ã¦Ââ€¢Ã¨Å½Â·Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

Ã¦â€”Â Ã©Å“â‚¬ webhook Ã¦Ë†â€“Ã¨Â½Â®Ã¨Â¯Â¢Ã£â‚¬â€šWebSocket Ã¤Â¼Å¡Ã¤Â¼Â Ã©â‚¬â€™Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Âºâ€¹Ã¤Â»Â¶Ã¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬Ã¤Â¼Å¡Ã¨Â¯ÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¤Âºâ€¹Ã¤Â»Â¶Ã£â‚¬â€š

> **Ã¥â€¦Â³Ã©â€Â®Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡** `CaptureClient` Ã¥Â¿â€¦Ã©Â¡Â»Ã¥Å“Â¨Ã¦â€¢Â´Ã¤Â¸ÂªÃ¦Ââ€¢Ã¨Å½Â·Ã¦Å“Å¸Ã©â€”Â´Ã¦Å’ÂÃ§Â»Â­Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¥Â®Æ’Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â½â€¢Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¥Â°â€ Ã¥Â±ÂÃ¥Â¹â€¢/Ã©Å¸Â³Ã©Â¢â€˜Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¥Ë†Â° VideoDBÃ£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“Ã¥Ë†â€ºÃ¥Â»Âº `CaptureClient` Ã§Å¡â€ž Python Ã¨Â¿â€ºÃ§Â¨â€¹Ã©â‚¬â‚¬Ã¥â€¡ÂºÃ¯Â¼Å’Ã¥Â½â€¢Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â°â€ Ã¨Â¢Â«Ã§Â»Ë†Ã¦Â­Â¢Ã¯Â¼Å’Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â¼Å¡Ã©Ââ„¢Ã©Â»ËœÃ¥ÂÅ“Ã¦Â­Â¢Ã£â‚¬â€šÃ¨Â¯Â·Ã¥Â§â€¹Ã§Â»Ë†Ã¥Â°â€ Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â»Â£Ã§Â ÂÃ¤Â½Å“Ã¤Â¸Âº**Ã©â€¢Â¿Ã¦Å“Å¸Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¥ÂÅ½Ã¥ÂÂ°Ã¨Â¿â€ºÃ§Â¨â€¹**Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š `nohup python capture_script.py &`Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¿Â¡Ã¥ÂÂ·Ã¥Â¤â€žÃ§Ââ€ Ã¯Â¼Ë†`asyncio.Event` + `SIGINT`/`SIGTERM`Ã¯Â¼â€°Ã¦ÂÂ¥Ã¤Â¿ÂÃ¦Å’ÂÃ¥â€¦Â¶Ã¥Â­ËœÃ¦Â´Â»Ã¯Â¼Å’Ã§â€ºÂ´Ã¥Ë†Â°Ã¦â€šÂ¨Ã¦ËœÅ½Ã§Â¡Â®Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â®Æ’Ã£â‚¬â€š

1. Ã¥Å“Â¨Ã¥ÂÅ½Ã¥ÂÂ°**Ã¥ÂÂ¯Ã¥Å Â¨ WebSocket Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨**Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `--clear` Ã¦Â â€¡Ã¥Â¿â€”Ã¦ÂÂ¥Ã¦Â¸â€¦Ã©â„¢Â¤Ã¦â€”Â§Ã¤Âºâ€¹Ã¤Â»Â¶Ã£â‚¬â€šÃ§Â­â€°Ã¥Â¾â€¦Ã¥â€¦Â¶Ã¥Ë†â€ºÃ¥Â»Âº WebSocket ID Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€š

2. **Ã¨Â¯Â»Ã¥Ââ€“ WebSocket ID**Ã£â‚¬â€šÃ¦Â­Â¤ ID Ã¦ËœÂ¯Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥â€™Å’ AI Ã§Â®Â¡Ã©Ââ€œÃ¦â€°â‚¬Ã¥Â¿â€¦Ã©Å“â‚¬Ã§Å¡â€žÃ£â‚¬â€š

3. **Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Ââ€¢Ã¨Å½Â·Ã¤Â¼Å¡Ã¨Â¯Â**Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸ÂºÃ¦Â¡Å’Ã©ÂÂ¢Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§â€Å¸Ã¦Ë†ÂÃ¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¤Â»Â¤Ã§â€°Å’Ã£â‚¬â€š

4. Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»Â¤Ã§â€°Å’**Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“ CaptureClient**Ã£â‚¬â€šÃ¨Â¯Â·Ã¦Â±â€šÃ©ÂºÂ¦Ã¥â€¦â€¹Ã©Â£Å½Ã¥â€™Å’Ã¥Â±ÂÃ¥Â¹â€¢Ã¦Ââ€¢Ã¨Å½Â·Ã¦ÂÆ’Ã©â„¢ÂÃ£â‚¬â€š

5. **Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Â¹Â¶Ã©â‚¬â€°Ã¦â€¹Â©Ã©â‚¬Å¡Ã©Ââ€œ**Ã¯Â¼Ë†Ã©ÂºÂ¦Ã¥â€¦â€¹Ã©Â£Å½Ã£â‚¬ÂÃ¦ËœÂ¾Ã§Â¤ÂºÃ¥â„¢Â¨Ã£â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã©Å¸Â³Ã©Â¢â€˜Ã¯Â¼â€°Ã£â‚¬â€šÃ¥Å“Â¨Ã¦â€šÂ¨Ã¥Â¸Å’Ã¦Å“â€ºÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã¤Â¸ÂºÃ¨Â§â€ Ã©Â¢â€˜Ã§Å¡â€žÃ©â‚¬Å¡Ã©Ââ€œÃ¤Â¸Å Ã¨Â®Â¾Ã§Â½Â® `store = True`Ã£â‚¬â€š

6. Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬â€°Ã¥Â®Å¡Ã§Å¡â€žÃ©â‚¬Å¡Ã©Ââ€œ**Ã¥ÂÂ¯Ã¥Å Â¨Ã¤Â¼Å¡Ã¨Â¯Â**Ã£â‚¬â€š

7. Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¨Â¯Â»Ã¥Ââ€“Ã¤Âºâ€¹Ã¤Â»Â¶Ã§â€ºÂ´Ã¥Ë†Â°Ã§Å“â€¹Ã¥Ë†Â° `capture_session.active` Ã¦ÂÂ¥**Ã§Â­â€°Ã¥Â¾â€¦Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Â¿â‚¬Ã¦Â´Â»**Ã£â‚¬â€šÃ¦Â­Â¤Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥Å’â€¦Ã¥ÂÂ« `rtstreams` Ã¦â€¢Â°Ã§Â»â€žÃ£â‚¬â€šÃ¥Â°â€ Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Ë†Ã¤Â¼Å¡Ã¨Â¯Â IDÃ£â‚¬ÂRTStream IDÃ¯Â¼â€°Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â°Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š `/tmp/videodb_capture_info.json`Ã¯Â¼â€°Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥â€¦Â¶Ã¤Â»â€“Ã¨â€žÅ¡Ã¦Å“Â¬Ã¥ÂÂ¯Ã¤Â»Â¥Ã¨Â¯Â»Ã¥Ââ€“Ã£â‚¬â€š

8. **Ã¤Â¿ÂÃ¦Å’ÂÃ¨Â¿â€ºÃ§Â¨â€¹Ã¥Â­ËœÃ¦Â´Â»**Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ `asyncio.Event` Ã©â€¦ÂÃ¥ÂË† `SIGINT`/`SIGTERM` Ã§Å¡â€žÃ¤Â¿Â¡Ã¥ÂÂ·Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¦ÂÂ¥Ã©ËœÂ»Ã¥Â¡Å¾Ã¨Â¿â€ºÃ§Â¨â€¹Ã¯Â¼Å’Ã§â€ºÂ´Ã¥Ë†Â°Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥ÂÅ“Ã¦Â­Â¢Ã£â‚¬â€šÃ¥â€ â„¢Ã¥â€¦Â¥Ã¤Â¸â‚¬Ã¤Â¸Âª PID Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š `/tmp/videodb_capture_pid`Ã¯Â¼â€°Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã§Â¨ÂÃ¥ÂÅ½Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â½Â¿Ã§â€Â¨ `kill $(cat /tmp/videodb_capture_pid)` Ã¥ÂÅ“Ã¦Â­Â¢Ã¨Â¯Â¥Ã¨Â¿â€ºÃ§Â¨â€¹Ã£â‚¬â€šPID Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Âºâ€Ã¥Å“Â¨Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¨Â¢Â«Ã¨Â¦â€ Ã§â€ºâ€“Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¥Â§â€¹Ã§Â»Ë†Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€ž PIDÃ£â‚¬â€š

9. **Ã¥ÂÂ¯Ã¥Å Â¨ AI Ã§Â®Â¡Ã©Ââ€œ**Ã¯Â¼Ë†Ã¥Å“Â¨Ã¥Ââ€¢Ã§â€¹Â¬Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤/Ã¨â€žÅ¡Ã¦Å“Â¬Ã¤Â¸Â­Ã¯Â¼â€°Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸Âª RTStream Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Å¸Â³Ã©Â¢â€˜Ã§Â´Â¢Ã¥Â¼â€¢Ã¥â€™Å’Ã¨Â§â€ Ã¨Â§â€°Ã§Â´Â¢Ã¥Â¼â€¢Ã£â‚¬â€šÃ¤Â»Å½Ã¤Â¿ÂÃ¥Â­ËœÃ§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¿Â¡Ã¦ÂÂ¯Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¨Â¯Â»Ã¥Ââ€“ RTStream IDÃ£â‚¬â€š

10. **Ã§Â¼â€“Ã¥â€ â„¢Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥Â¤â€žÃ§Ââ€ Ã©â‚¬Â»Ã¨Â¾â€˜**Ã¯Â¼Ë†Ã¥Å“Â¨Ã¥Ââ€¢Ã§â€¹Â¬Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤/Ã¨â€žÅ¡Ã¦Å“Â¬Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å’Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€šÂ¨Ã§Å¡â€žÃ§â€Â¨Ã¤Â¾â€¹Ã¨Â¯Â»Ã¥Ââ€“Ã¥Â®Å¾Ã¦â€”Â¶Ã¤Âºâ€¹Ã¤Â»Â¶Ã£â‚¬â€šÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡
    * Ã¥Â½â€œ `visual_index` Ã¦ÂÂÃ¥Ë†Â° "Slack" Ã¦â€”Â¶Ã¨Â®Â°Ã¥Â½â€¢ Slack Ã¦Â´Â»Ã¥Å Â¨
    * Ã¥Â½â€œ `audio_index` Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥Ë†Â°Ã¨Â¾Â¾Ã¦â€”Â¶Ã¦â‚¬Â»Ã§Â»â€œÃ¨Â®Â¨Ã¨Â®Âº
    * Ã¥Â½â€œ `transcript` Ã¤Â¸Â­Ã¥â€¡ÂºÃ§Å½Â°Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦â€”Â¶Ã¨Â§Â¦Ã¥Ââ€˜Ã¨Â­Â¦Ã¦Å Â¥
    * Ã¤Â»Å½Ã¥Â±ÂÃ¥Â¹â€¢Ã¦ÂÂÃ¨Â¿Â°Ã¤Â¸Â­Ã¨Â·Å¸Ã¨Â¸ÂªÃ¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ Âµ

11. **Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Ââ€¢Ã¨Å½Â·** - Ã¥Â®Å’Ã¦Ë†ÂÃ¥ÂÅ½Ã¯Â¼Å’Ã¥Ââ€˜Ã¦Ââ€¢Ã¨Å½Â·Ã¨Â¿â€ºÃ§Â¨â€¹Ã¥Ââ€˜Ã©â‚¬Â SIGTERMÃ£â‚¬â€šÃ¥Â®Æ’Ã¥Âºâ€Ã¥Å“Â¨Ã¤Â¿Â¡Ã¥ÂÂ·Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Â­Ã¨Â°Æ’Ã§â€Â¨ `client.stop_capture()` Ã¥â€™Å’ `client.shutdown()`Ã£â‚¬â€š

12. **Ã§Â­â€°Ã¥Â¾â€¦Ã¥Â¯Â¼Ã¥â€¡Âº** - Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¨Â¯Â»Ã¥Ââ€“Ã¤Âºâ€¹Ã¤Â»Â¶Ã§â€ºÂ´Ã¥Ë†Â°Ã§Å“â€¹Ã¥Ë†Â° `capture_session.exported`Ã£â‚¬â€šÃ¦Â­Â¤Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥Å’â€¦Ã¥ÂÂ« `exported_video_id`Ã£â‚¬Â`stream_url` Ã¥â€™Å’ `player_url`Ã£â‚¬â€šÃ¨Â¿â„¢Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Å“Â¨Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Ââ€¢Ã¨Å½Â·Ã¥ÂÅ½Ã©Å“â‚¬Ã¨Â¦ÂÃ¥â€¡Â Ã§Â§â€™Ã©â€™Å¸Ã£â‚¬â€š

13. **Ã¥ÂÅ“Ã¦Â­Â¢ WebSocket Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨** - Ã¦â€Â¶Ã¥Ë†Â°Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¤Âºâ€¹Ã¤Â»Â¶Ã¥ÂÅ½Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `kill $(cat /tmp/videodb_ws_pid)` Ã¦ÂÂ¥Ã¥Â¹Â²Ã¥â€¡â‚¬Ã¥Å“Â°Ã§Â»Ë†Ã¦Â­Â¢Ã¥Â®Æ’Ã£â‚¬â€š

***

## Ã¥â€¦Â³Ã¦Å“ÂºÃ©Â¡ÂºÃ¥ÂºÂ

Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ¥â€¦Â³Ã¦Å“ÂºÃ©Â¡ÂºÃ¥ÂºÂÃ¥Â¯Â¹Ã¤ÂºÅ½Ã§Â¡Â®Ã¤Â¿ÂÃ¦Ââ€¢Ã¨Å½Â·Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Âºâ€¹Ã¤Â»Â¶Ã©ÂÅ¾Ã¥Â¸Â¸Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼Å¡

1. **Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â¼Å¡Ã¨Â¯Â** Ã¢â‚¬â€ `client.stop_capture()` Ã§â€žÂ¶Ã¥ÂÅ½ `client.shutdown()`
2. **Ã§Â­â€°Ã¥Â¾â€¦Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¤Âºâ€¹Ã¤Â»Â¶** Ã¢â‚¬â€ Ã¨Â½Â®Ã¨Â¯Â¢ `/tmp/videodb_events.jsonl` Ã¤Â»Â¥Ã¦Å¸Â¥Ã¦â€°Â¾ `capture_session.exported`
3. **Ã¥ÂÅ“Ã¦Â­Â¢ WebSocket Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨** Ã¢â‚¬â€ `kill $(cat /tmp/videodb_ws_pid)`

Ã¥Å“Â¨Ã¦â€Â¶Ã¥Ë†Â°Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¤Âºâ€¹Ã¤Â»Â¶Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¨Â¯Â·**Ã¤Â¸ÂÃ¨Â¦Â**Ã¦Ââ‚¬Ã¦Â­Â» WebSocket Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¦â€šÂ¨Ã¥Â°â€ Ã©â€â„¢Ã¨Â¿â€¡Ã¦Å“â‚¬Ã§Â»Ë†Ã§Å¡â€žÃ¨Â§â€ Ã©Â¢â€˜ URLÃ£â‚¬â€š

***

## Ã¨â€žÅ¡Ã¦Å“Â¬

| Ã¨â€žÅ¡Ã¦Å“Â¬ | Ã¦ÂÂÃ¨Â¿Â° |
|--------|-------------|
| `scripts/ws_listener.py` | WebSocket Ã¤Âºâ€¹Ã¤Â»Â¶Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨Ã¯Â¼Ë†Ã¨Â½Â¬Ã¥â€šÂ¨Ã¤Â¸Âº JSONLÃ¯Â¼â€° |

### ws\_listener.py Ã§â€Â¨Ã¦Â³â€¢

```bash
# Start listener in background (append to existing events)
python scripts/ws_listener.py &

# Start listener with clear (new session, clears old events)
python scripts/ws_listener.py --clear &

# Custom output directory
python scripts/ws_listener.py --clear /path/to/events &

# Stop the listener
kill $(cat /tmp/videodb_ws_pid)
```

**Ã©â‚¬â€°Ã©Â¡Â¹Ã¯Â¼Å¡**

* `--clear`Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€°ÂÃ¦Â¸â€¦Ã©â„¢Â¤Ã¤Âºâ€¹Ã¤Â»Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€šÃ¥ÂÂ¯Ã¥Å Â¨Ã¦â€“Â°Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€š

**Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡**

* `videodb_events.jsonl` - Ã¦â€°â‚¬Ã¦Å“â€° WebSocket Ã¤Âºâ€¹Ã¤Â»Â¶
* `videodb_ws_id` - WebSocket Ã¨Â¿Å¾Ã¦Å½Â¥ IDÃ¯Â¼Ë†Ã§â€Â¨Ã¤ÂºÅ½ `ws_connection_id` Ã¥Ââ€šÃ¦â€¢Â°Ã¯Â¼â€°
* `videodb_ws_pid` - Ã¨Â¿â€ºÃ§Â¨â€¹ IDÃ¯Â¼Ë†Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÅ“Ã¦Â­Â¢Ã§â€ºâ€˜Ã¥ÂÂ¬Ã¥â„¢Â¨Ã¯Â¼â€°

**Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å¡**

* Ã¨Â¿Å¾Ã¦Å½Â¥Ã¦â€“Â­Ã¥Â¼â‚¬Ã¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã©â€¡ÂÃ¨Â¿Å¾Ã¯Â¼Å’Ã¥Â¹Â¶Ã©â€¡â€¡Ã§â€Â¨Ã¦Å’â€¡Ã¦â€¢Â°Ã©â‚¬â‚¬Ã©ÂÂ¿
* Ã¦â€Â¶Ã¥Ë†Â° SIGINT/SIGTERM Ã¦â€”Â¶Ã¤Â¼ËœÃ©â€ºâ€¦Ã¥â€¦Â³Ã¦Å“Âº
* PID Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¤Â¾Â¿Ã¤ÂºÅ½Ã¨Â¿â€ºÃ§Â¨â€¹Ã§Â®Â¡Ã§Ââ€ 
* Ã¨Â¿Å¾Ã¦Å½Â¥Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢
