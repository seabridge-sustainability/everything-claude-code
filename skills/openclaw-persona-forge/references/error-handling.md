# Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸Å½Ã©â„¢ÂÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥

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


## Ã¨Â®Â¾Ã¨Â®Â¡Ã§Ââ€ Ã¥Â¿Âµ

> Ã¤Â»Â»Ã¤Â½â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã©Æ’Â½Ã¤Â¸ÂÃ¥Âºâ€Ã¤Â¸Â­Ã¦â€“Â­Ã§â€Â¨Ã¦Ë†Â·Ã§Å¡â€žÃ¥Ë†â€ºÃ©â‚¬Â Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€šÃ©â„¢ÂÃ§ÂºÂ§Ã¯Â¼Å’Ã¤Â¸ÂÃ¤Â¸Â­Ã¦â€“Â­Ã£â‚¬â€š

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Ë†â€ Ã§Â±Â»Ã¤Â¸Å½Ã©â„¢ÂÃ§ÂºÂ§Ã§Å¸Â©Ã©ËœÂµ

### Ã§Â±Â»Ã¥Å¾â€¹ AÃ¯Â¼Å¡Ã§Å½Â¯Ã¥Â¢Æ’Ã§Â¼ÂºÃ¥Â¤Â±

| Ã©â€â„¢Ã¨Â¯Â¯Ã¥Å“ÂºÃ¦â„¢Â¯ | Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦â€“Â¹Ã¥Â¼Â | Ã©â„¢ÂÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥ | Ã¥â€˜Å Ã§Å¸Â¥Ã§â€Â¨Ã¦Ë†Â· |
|----------|---------|---------|---------|
| Python 3 Ã¤Â¸ÂÃ¥ÂÂ¯Ã§â€Â¨ | `python3 --version` Ã¥Â¤Â±Ã¨Â´Â¥ | Ã¨Â·Â³Ã¨Â¿â€¡ gacha.pyÃ¯Â¼Å’Ã¤Â»Å½ 10 Ã§Â±Â»Ã©Â¢â€žÃ¨Â®Â¾Ã¦â€“Â¹Ã¥Ââ€˜Ã¤Â¸Â­Ã©Å¡ÂÃ¦Å“ÂºÃ©â‚¬â€°Ã¦â€¹Â© | "Ã¦Å Â½Ã¥ÂÂ¡Ã¥Â¼â€¢Ã¦â€œÅ½Ã©Å“â‚¬Ã¨Â¦Â Python 3Ã¯Â¼Å’Ã¥Â·Â²Ã¦â€Â¹Ã§â€Â¨Ã¥â€ â€¦Ã§Â½Â®Ã©Å¡ÂÃ¦Å“ÂºÃ©â‚¬â€°Ã¦â€¹Â©" |

### Ã§Â±Â»Ã¥Å¾â€¹ BÃ¯Â¼Å¡Ã¥ÂÂ¯Ã©â‚¬â€°Ã¤Â¾ÂÃ¨Âµâ€“Ã¤Â¸ÂÃ¥ÂÂ¯Ã§â€Â¨

| Ã©â€â„¢Ã¨Â¯Â¯Ã¥Å“ÂºÃ¦â„¢Â¯ | Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦â€“Â¹Ã¥Â¼Â | Ã©â„¢ÂÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥ | Ã¥â€˜Å Ã§Å¸Â¥Ã§â€Â¨Ã¦Ë†Â· |
|----------|---------|---------|---------|
| Ã§â€Å¸Ã¥â€ºÂ¾ skill Ã¦Å“ÂªÃ¥Â®â€°Ã¨Â£â€¦ | Ã¦Â£â‚¬Ã¦Å¸Â¥ skill Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨ | Ã¨Â¾â€œÃ¥â€¡ÂºÃ¥Â®Å’Ã¦â€¢Â´Ã¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¦â€“â€¡Ã¦Å“Â¬ + Ã¦â€°â€¹Ã¥Å Â¨Ã§â€Å¸Ã¥â€ºÂ¾Ã¥Â¹Â³Ã¥ÂÂ°Ã¨Â¯Â´Ã¦ËœÅ½ | "Ã¦Å“ÂªÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ§â€Å¸Ã¥â€ºÂ¾ skillÃ¯Â¼Å’Ã¥Â·Â²Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¤Â¾â€ºÃ¦â€°â€¹Ã¥Å Â¨Ã¤Â½Â¿Ã§â€Â¨" |
| Ã§â€Å¸Ã¥â€ºÂ¾ skill Ã¨Â°Æ’Ã§â€Â¨Ã¥Â¤Â±Ã¨Â´Â¥ | skill Ã¨Â¿â€Ã¥â€ºÅ¾Ã©â€â„¢Ã¨Â¯Â¯ | Ã©â€¡ÂÃ¨Â¯â€¢ 1 Ã¦Â¬Â¡Ã¯Â¼Å’Ã¤Â»ÂÃ¥Â¤Â±Ã¨Â´Â¥Ã¥Ë†â„¢Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¦â€“â€¡Ã¦Å“Â¬ | "Ã§â€Å¸Ã¥â€ºÂ¾Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥Â·Â²Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¤Â¾â€ºÃ¦â€°â€¹Ã¥Å Â¨Ã¤Â½Â¿Ã§â€Â¨" |

### Ã§Â±Â»Ã¥Å¾â€¹ CÃ¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¥Â¼â€šÃ¥Â¸Â¸

| Ã©â€â„¢Ã¨Â¯Â¯Ã¥Å“ÂºÃ¦â„¢Â¯ | Ã©â„¢ÂÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥ | Ã¥â€˜Å Ã§Å¸Â¥Ã§â€Â¨Ã¦Ë†Â· |
|----------|---------|---------|
| gacha.py Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼ÂÃ¥Â¼â€šÃ¥Â¸Â¸ | Ã¤Â»Å½ 10 Ã§Â±Â»Ã©Â¢â€žÃ¨Â®Â¾Ã¦â€“Â¹Ã¥Ââ€˜Ã¤Â¸Â­Ã©Å¡ÂÃ¦Å“ÂºÃ©â‚¬â€°Ã¦â€¹Â© | "Ã¦Å Â½Ã¥ÂÂ¡Ã§Â»â€œÃ¦Å¾Å“Ã¨Â§Â£Ã¦Å¾ÂÃ¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥Â·Â²Ã¦â€Â¹Ã§â€Â¨Ã¥â€ â€¦Ã§Â½Â®Ã©Å¡ÂÃ¦Å“Âº" |
| Ã¤Â»Â»Ã¤Â½â€¢Ã¦Å“ÂªÃ©Â¢â€žÃ¦Å“Å¸Ã©â€â„¢Ã¨Â¯Â¯ | Ã¨Â®Â°Ã¥Â½â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Å’Ã¨Â·Â³Ã¨Â¿â€¡Ã¨Â¯Â¥Ã¦Â­Â¥Ã©ÂªÂ¤Ã¯Â¼Å’Ã§Â»Â§Ã§Â»Â­Ã¤Â¸Â»Ã¦ÂµÂÃ§Â¨â€¹ | "Ã©Ââ€¡Ã¥Ë†Â°Ã¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡[Ã©â€â„¢Ã¨Â¯Â¯Ã§Â®â‚¬Ã¨Â¿Â°]Ã£â‚¬â€šÃ¥Â·Â²Ã¨Â·Â³Ã¨Â¿â€¡Ã§Â»Â§Ã§Â»Â­" |

## Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯Ã§Â»Å¸Ã¤Â¸â‚¬Ã¦Â Â¼Ã¥Â¼Â

```markdown
> [Ã¨Â­Â¦Ã¥â€˜Å ] **[Ã¦Â­Â¥Ã©ÂªÂ¤Ã¥ÂÂ] Ã¥Â·Â²Ã©â„¢ÂÃ§ÂºÂ§**
> Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å¡[Ã¥Ââ€˜Ã§â€Å¸Ã¤Âºâ€ Ã¤Â»â‚¬Ã¤Â¹Ë†]
> Ã¥Â½Â±Ã¥â€œÂÃ¯Â¼Å¡[Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¥Å Å¸Ã¨Æ’Â½Ã¥Ââ€”Ã©â„¢Â]
> Ã¦â€ºÂ¿Ã¤Â»Â£Ã¯Â¼Å¡[Ã¦Â­Â£Ã¥Å“Â¨Ã§â€Â¨Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¥â€¦Å“Ã¥Âºâ€¢]
> Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡[Ã¦â‚¬Å½Ã¤Â¹Ë†Ã¦ÂÂ¢Ã¥Â¤ÂÃ¥Â®Å’Ã¦â€¢Â´Ã¥Å Å¸Ã¨Æ’Â½]
```

Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡

```markdown
> [Ã¨Â­Â¦Ã¥â€˜Å ] **Ã¥Â¤Â´Ã¥Æ’ÂÃ§â€Å¸Ã¦Ë†ÂÃ¥Â·Â²Ã©â„¢ÂÃ§ÂºÂ§**
> Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å¡Ã¦Å“ÂªÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ§â€Å¸Ã¥â€ºÂ¾ skill
> Ã¥Â½Â±Ã¥â€œÂÃ¯Â¼Å¡Ã¦â€”Â Ã¦Â³â€¢Ã¨â€¡ÂªÃ¥Å Â¨Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¤Â´Ã¥Æ’ÂÃ¥â€ºÂ¾Ã§â€°â€¡
> Ã¦â€ºÂ¿Ã¤Â»Â£Ã¯Â¼Å¡Ã¥Â·Â²Ã¨Â¾â€œÃ¥â€¡ÂºÃ¥Â®Å’Ã¦â€¢Â´Ã¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¯Â¼Å’Ã¥ÂÂ¯Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â° Gemini / ChatGPT Ã¦â€°â€¹Ã¥Å Â¨Ã§â€Å¸Ã¦Ë†Â
> Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¥Å“Â¨Ã¥Â½â€œÃ¥â€°ÂÃ§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¥Â®â€°Ã¨Â£â€¦Ã¥Â¹Â¶Ã¥ÂÂ¯Ã§â€Â¨Ã§Â»ÂÃ¨Â¿â€¡Ã¥Â®Â¡Ã¦Â Â¸Ã§Å¡â€žÃ§â€Å¸Ã¥â€ºÂ¾ skill
```

## Ã¥â€¦Â³Ã©â€Â®Ã¥Å½Å¸Ã¥Ë†â„¢

1. **Ã¦â€“â€¡Ã¦Å“Â¬Ã¦â€“Â¹Ã¦Â¡Ë†Ã¦ËœÂ¯Ã¦Â Â¸Ã¥Â¿Æ’Ã¤Â»Â·Ã¥â‚¬Â¼Ã¯Â¼Å’Ã¥Â¤Â´Ã¥Æ’ÂÃ¦ËœÂ¯Ã©â€Â¦Ã¤Â¸Å Ã¦Â·Â»Ã¨Å Â±**Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¾â€¦Ã¥Å Â©Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¤Â±Ã¨Â´Â¥Ã¦Â°Â¸Ã¤Â¸ÂÃ¤Â¸Â­Ã¦â€“Â­Ã¤Â¸Â»Ã¦ÂµÂÃ§Â¨â€¹
2. **Ã©â„¢ÂÃ§ÂºÂ§Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¨Â¦ÂÃ¥ÂÂ¯Ã¦â€œÂÃ¤Â½Å“**Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¸ÂÃ¥ÂÂªÃ¨Â¯Â´"Ã¥â€¡ÂºÃ©â€â„¢Ã¤Âºâ€ "Ã¯Â¼Å’Ã¨Â¦ÂÃ¨Â¯Â´"Ã¦â‚¬Å½Ã¤Â¹Ë†Ã¤Â¿Â®"
3. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã©â„¢ÂÃ§ÂºÂ§Ã¤Â¸ÂÃ¥Â½Â±Ã¥â€œÂÃ¥ÂÅ½Ã§Â»Â­Ã¦Â­Â¥Ã©ÂªÂ¤**Ã¢â‚¬â€Ã¢â‚¬â€Step 5 Ã©â„¢ÂÃ§ÂºÂ§Ã¤Âºâ€ Ã¯Â¼Å’Step 6 Ã§â€¦Â§Ã¥Â¸Â¸Ã¨Â¾â€œÃ¥â€¡Âº
