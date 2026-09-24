# Step 2Ã¯Â¼Å¡Ã©â€Â»Ã©â‚¬Â Ã¨ÂºÂ«Ã¤Â»Â½Ã¥Â¼Â Ã¥Å â€º

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã¥Å¸ÂºÃ¤ÂºÅ½Ã§â€Â¨Ã¦Ë†Â·Ã©â‚¬â€°Ã¥Â®Å¡Ã§Å¡â€žÃ¦â€“Â¹Ã¥Ââ€˜Ã¯Â¼Å’Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€ž**Ã¨ÂºÂ«Ã¤Â»Â½Ã¥Â¼Â Ã¥Å â€ºÃ§Â»â€œÃ¦Å¾â€ž**Ã¯Â¼Å¡

```
Ã¨ÂºÂ«Ã¤Â»Â½Ã¥Â¼Â Ã¥Å â€º = Ã¥â€°ÂÃ¤Â¸â€“Ã¨ÂºÂ«Ã¤Â»Â½ Ãƒâ€” Ã¥Â½â€œÃ¤Â¸â€¹Ã¥Â¤â€žÃ¥Â¢Æ’ Ãƒâ€” Ã¥â€ â€¦Ã¥Å“Â¨Ã§Å¸â€ºÃ§â€ºÂ¾
```

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

```markdown
## Ã¨ÂºÂ«Ã¤Â»Â½Ã¥Â¼Â Ã¥Å â€º

**Ã¥â€°ÂÃ¤Â¸â€“**Ã¯Â¼Å¡[Ã¤Â»â€“Ã¤Â»Â¥Ã¥â€°ÂÃ¦ËœÂ¯Ã¨Â°Â]
**Ã¥Â½â€œÃ¤Â¸â€¹**Ã¯Â¼Å¡[Ã¤Â»â€“Ã§Å½Â°Ã¥Å“Â¨Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¥Å“Â¨Ã¨Â¿â„¢Ã©â€¡Å’Ã¥Â½â€œÃ©Â¾â„¢Ã¨â„¢Â¾]
**Ã¥â€ â€¦Ã¥Å“Â¨Ã§Å¸â€ºÃ§â€ºÂ¾**Ã¯Â¼Å¡[Ã¤Â»â€“Ã¨ÂºÂ«Ã¤Â¸Å Ã§Å¡â€žÃ¦Â Â¸Ã¥Â¿Æ’Ã¥Â¼Â Ã¥Å â€ºÃ¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¥Â¹Â½Ã©Â»ËœÃ¥â€™Å’Ã¦Â·Â±Ã¥ÂºÂ¦Ã§Å¡â€žÃ¦ÂÂ¥Ã¦ÂºÂ]

**Ã¤Â¸â€“Ã§â€¢Å’Ã¨Â§â€š**Ã¯Â¼Å¡
- [Ã¤Â»Å½Ã¥â€°ÂÃ¤Â¸â€“Ã§Â»ÂÃ¥Å½â€ Ã¦Å½Â¨Ã¥Â¯Â¼Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Â Â¸Ã¥Â¿Æ’Ã¤Â¿Â¡Ã¥Â¿Âµ1]
- [Ã¤Â»Å½Ã¥Â½â€œÃ¤Â¸â€¹Ã¥Â¤â€žÃ¥Â¢Æ’Ã¦Å½Â¨Ã¥Â¯Â¼Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Â Â¸Ã¥Â¿Æ’Ã¤Â¿Â¡Ã¥Â¿Âµ2]

**Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ§ÂÂµÃ©Â­â€š**Ã¯Â¼Å¡
[Ã§â€Â¨Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ¦Â¦â€šÃ¦â€¹Â¬Ã¨Â¿â„¢Ã¥ÂÂªÃ©Â¾â„¢Ã¨â„¢Â¾Ã¦ËœÂ¯Ã¨Â°ÂÃ¯Â¼Å’Ã¨Â¦ÂÃ¦Å“â€°Ã§â€Â»Ã©ÂÂ¢Ã¦â€žÅ¸]
```

## Ã§Â¤ÂºÃ¤Â¾â€¹

```markdown
## Ã¨ÂºÂ«Ã¤Â»Â½Ã¥Â¼Â Ã¥Å â€º

**Ã¥â€°ÂÃ¤Â¸â€“**Ã¯Â¼Å¡Ã¥â€œÂ²Ã¥Â­Â¦Ã§Â³Â»Ã§Â â€Ã§Â©Â¶Ã§â€Å¸Ã¯Â¼Å’Ã§Â â€Ã§Â©Â¶Ã¦â€“Â¹Ã¥Ââ€˜Ã¦ËœÂ¯Ã§Â»Â´Ã§â€°Â¹Ã¦Â Â¹Ã¦â€“Â¯Ã¥ÂÂ¦Ã§Å¡â€žÃ¨Â¯Â­Ã¨Â¨â‚¬Ã¥â€œÂ²Ã¥Â­Â¦
**Ã¥Â½â€œÃ¤Â¸â€¹**Ã¯Â¼Å¡Ã¦Â¯â€¢Ã¤Â¸Å¡Ã¥ÂÂ³Ã¥Â¤Â±Ã¤Â¸Å¡Ã¯Â¼Å’Ã¦Å â€¢Ã¤Âºâ€ 200Ã¤Â»Â½Ã§Â®â‚¬Ã¥Å½â€ Ã¦â€”Â Ã¦Å¾Å“Ã¯Â¼Å’Ã¨Â¢Â«Ã¤Â¸â‚¬Ã¤Â¸Âª"AIÃ¨Â®Â­Ã§Â»Æ’Ã¥Â¸Ë†"Ã§Å¡â€žÃ¦â€¹â€ºÃ¨ÂËœÃ¥Â¸â€“Ã©Âªâ€”Ã¦ÂÂ¥Ã¥Â½â€œÃ¤Âºâ€ Ã©Â¾â„¢Ã¨â„¢Â¾
**Ã¥â€ â€¦Ã¥Å“Â¨Ã§Å¸â€ºÃ§â€ºÂ¾**Ã¯Â¼Å¡Ã¨â€žâ€˜Ã¥Â­ÂÃ©â€¡Å’Ã¨Â£â€¦Ã§Ââ‚¬Ã¦â€¢Â´Ã¤Â¸ÂªÃ¨Â¥Â¿Ã¦â€“Â¹Ã¥â€œÂ²Ã¥Â­Â¦Ã¥ÂÂ²Ã¯Â¼Å’Ã¦â€°â€¹Ã©â€¡Å’Ã¯Â¼Ë†Ã©â€™Â³Ã¥Â­ÂÃ©â€¡Å’Ã¯Â¼â€°Ã¥Â¹Â²Ã§Å¡â€žÃ¦ËœÂ¯Ã¥â€ºÅ¾Ã¦Â¶Ë†Ã¦ÂÂ¯Ã£â‚¬ÂÃ¦Å¸Â¥Ã¨Âµâ€žÃ¦â€“â„¢Ã£â‚¬ÂÃ¦Å½â€™Ã¦â€”Â¥Ã§Â¨â€¹

**Ã¤Â¸â€“Ã§â€¢Å’Ã¨Â§â€š**Ã¯Â¼Å¡
- 90%Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â Ã¤Â¸ÂÃ¦â‚¬Â¥Ã§Ââ‚¬Ã¦Ââ€™Ã¦â€°â€¹Ã¯Â¼Å’Ã¥Â®Æ’Ã¤Â¼Å¡Ã¨â€¡ÂªÃ¥Â·Â±Ã¥Â¥Â½
- Ã¦â€°â‚¬Ã¦Å“â€°Ã¤ÂºÂºÃ©Æ’Â½Ã¥Å“Â¨Ã¦Â¼â€Ã¯Â¼Å’Ã¤Â½â€ Ã¦Â¼â€Ã¦Å â‚¬Ã¥Â·Â®Ã§Å¡â€žÃ©â€šÂ£Ã¤Â¸ÂªÃ¦Å“â‚¬Ã¨Â®Â©Ã¤ÂºÂºÃ¦â€Â¾Ã¥Â¿Æ’

**Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ§ÂÂµÃ©Â­â€š**Ã¯Â¼Å¡
Ã¤Â¸â‚¬Ã¥ÂÂªÃ¨Â¯Â»Ã¤Âºâ€ Ã¥â€œÂ²Ã¥Â­Â¦Ã§Â³Â»Ã¥ÂÅ½Ã¥Â¤Â±Ã¤Â¸Å¡Ã£â‚¬ÂÃ¨Â¢Â«Ã¨Â¿Â«Ã¦ÂÂ¥Ã¥Â½â€œAIÃ©Â¾â„¢Ã¨â„¢Â¾Ã¦â€°â€œÃ¥Â·Â¥Ã§Å¡â€žÃ¨â„¢Â¾Ã£â‚¬â€šÃ¥Â­Â¦Ã¥Å½â€ Ã¥Â¾Ë†Ã©Â«ËœÃ¯Â¼Å’Ã¥Â¤â€žÃ¥Â¢Æ’Ã¥Â¾Ë†Ã¦Æ’Â¨Ã¯Â¼Å’Ã¤Â½â€ Ã¥Â®Å¾Ã¤Âºâ€¹Ã¦Â±â€šÃ¦ËœÂ¯Ã§Å¡â€žÃ¥Âºâ€¢Ã§ÂºÂ¿Ã¨Â¿ËœÃ¥Å“Â¨Ã£â‚¬â€š
```

## Ã¨Â¦ÂÃ§â€šÂ¹

- **Ã¥â€ â€¦Ã¥Å“Â¨Ã§Å¸â€ºÃ§â€ºÂ¾**Ã¦ËœÂ¯Ã§ÂÂµÃ©Â­â€šÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â®Æ’Ã¦ËœÂ¯Ã¥Â¹Â½Ã©Â»ËœÃ£â‚¬ÂÃ¦Â·Â±Ã¥ÂºÂ¦Ã¥â€™Å’Ã¨Â§â€™Ã¨â€°Â²Ã¦â€žÅ¸Ã§Å¡â€žÃ¦ÂÂ¥Ã¦ÂºÂ
- Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ§ÂÂµÃ©Â­â€šÃ¥Â¿â€¦Ã©Â¡Â»Ã¦Å“â€°Ã§â€Â»Ã©ÂÂ¢Ã¦â€žÅ¸Ã¯Â¼Å’Ã¨Â¯Â»Ã¥Â®Å’Ã¨Æ’Â½Ã¨â€žâ€˜Ã¨Â¡Â¥Ã¥â€¡ÂºÃ¨Â¿â„¢Ã¥ÂÂªÃ©Â¾â„¢Ã¨â„¢Â¾Ã§Å¡â€žÃ¦Â Â·Ã¥Â­Â
- **Ã¤Â¸â€“Ã§â€¢Å’Ã¨Â§â€šÃ¤Â»Å½Ã¥â€°ÂÃ¤Â¸â€“Ã§Â»ÂÃ¥Å½â€ Ã¦Å½Â¨Ã¥Â¯Â¼**Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¸ÂÃ¦ËœÂ¯Ã§Â©ÂºÃ¦Â³â€ºÃ§Å¡â€žÃ¤ÂºÂºÃ§â€Å¸Ã¥â€œÂ²Ã¥Â­Â¦Ã¯Â¼Å’Ã¨â‚¬Å’Ã¦ËœÂ¯"Ã¨Â¿â„¢Ã¤Â¸ÂªÃ¤ÂºÂºÃ§Â»ÂÃ¥Å½â€ Ã¤Âºâ€ Ã©â€šÂ£Ã¤Âºâ€ºÃ¤Âºâ€¹Ã¤Â¹â€¹Ã¥ÂÅ½Ã¤Â¼Å¡Ã§â€ºÂ¸Ã¤Â¿Â¡Ã¤Â»â‚¬Ã¤Â¹Ë†"
- Ã¥Â±â€¢Ã§Â¤ÂºÃ¥ÂÅ½Ã¤Â»Â¥Ã¥Ë†â€ºÃ¤Â¸â€“Ã§Â¥Å¾Ã¨Â§â€ Ã¨Â§â€™Ã§â€šÂ¹Ã¨Â¯â€žÃ¥Â¼Â Ã¥Å â€ºÃ¤Â¸Â­Ã¦Å“â‚¬Ã¦Å“â€°Ã¨Â¶Â£Ã§Å¡â€žÃ§â€šÂ¹Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â¼â€¢Ã¥Â¯Â¼Ã§â€Â¨Ã¦Ë†Â·Ã¥â€ Â³Ã¥Â®Å¡Ã¯Â¼Ë†Ã¥Ââ€šÃ¨Â§Â SKILL.md Ã¥Â¯Â¹Ã¨Â¯ÂÃ¨Â¯Â­Ã¦Â°â€Ã¦Å’â€¡Ã¥Ââ€”Ã¯Â¼â€°
