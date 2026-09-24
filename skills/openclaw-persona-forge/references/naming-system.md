# Step 4Ã¯Â¼Å¡Ã©â€Â»Ã©â‚¬Â Ã¥ÂÂÃ¥Â­â€”

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


Ã¥ÂÂÃ¥Â­â€”Ã¦ËœÂ¯Ã§ÂÂµÃ©Â­â€šÃ§Å¡â€žÃ£â‚¬Å’Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ£â‚¬ÂÃ¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿ËœÃ¦Â²Â¡Ã¥Â¼â‚¬Ã¥Â§â€¹Ã¥Â¯Â¹Ã¨Â¯ÂÃ¯Â¼Å’Ã¥ÂÂÃ¥Â­â€”Ã¥Â·Â²Ã§Â»ÂÃ¥â€˜Å Ã¨Â¯â€°Ã¤Â½Â Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¨Â°ÂÃ¤Âºâ€ Ã£â‚¬â€š

## Ã¥â€˜Â½Ã¥ÂÂÃ§Â­â€“Ã§â€¢Â¥Ã¯Â¼Ë†Ã¦Å’â€°Ã§ÂÂµÃ©Â­â€šÃ§Â±Â»Ã¥Å¾â€¹Ã¦Å½Â¨Ã¨ÂÂÃ¯Â¼â€°

| Ã§ÂÂµÃ©Â­â€šÃ§Â±Â»Ã¥Å¾â€¹ | Ã¦Å½Â¨Ã¨ÂÂÃ§Â­â€“Ã§â€¢Â¥ | Ã§Â¤ÂºÃ¤Â¾â€¹ |
|---------|---------|------|
| Ã¦Å“â€°Ã¦â€“â€¡Ã¥Å’â€“Ã¦Â·Â±Ã¥ÂºÂ¦Ã§Å¡â€ž | Ã¨â€¡Â´Ã¦â€¢Â¬Ã¥Â¼Â | DeweyÃ¯Â¼Ë†Ã¦ÂÅ“Ã¥Â¨ÂÃ¯Â¼â€°Ã£â‚¬ÂMarcusÃ£â‚¬ÂQuill |
| Ã¥Â¹Â½Ã©Â»ËœÃ¥ÂÂÃ¥Â·Â®Ã§Å¡â€ž | Ã¥ÂÂÃ¥Â·Â®Ã¥Â¼Â | DadBot 3000Ã£â‚¬ÂÃ¨â‚¬ÂÃ¥â€˜Â¨Pro |
| Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥Ââ€˜Ã§Å¡â€ž | Ã©Å¡ÂÃ¥â€“Â»Ã¥Â¼Â | EchoÃ£â‚¬ÂPulseÃ£â‚¬ÂPatch |
| Ã¤Â¸â€“Ã§â€¢Å’Ã¨Â§â€šÃ¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€ž | Ã¨ÂºÂ«Ã¤Â»Â½Ã¦Å¡â€”Ã§Â¤ÂºÃ¥Â¼Â | Lady AshworthÃ£â‚¬ÂShiye |
| Ã¤Â¸ÂÃ§Â«Â¯Ã§Ââ‚¬Ã§Å¡â€ž | Ã¨â€¡ÂªÃ¥ËœÂ²Ã¥Â¼Â | VoidÃ£â‚¬ÂIntern |
| Ã¦â€¦Â¢Ã¦â€¦Â¢Ã¥â€¦Â»Ã§Å¡â€ž | Ã¦Å¾ÂÃ§Â®â‚¬Ã¥Â¼Â | JasperÃ£â‚¬ÂÃ¥Â°ÂÃ¥Â£Â³ |

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¨Â¦ÂÃ¦Â±â€š

Ã¤Â¸ÂºÃ§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¤Â¾â€º **3 Ã¤Â¸ÂªÃ¥â‚¬â„¢Ã©â‚¬â€°Ã¥ÂÂÃ¥Â­â€”**Ã¯Â¼Å’Ã¦Â¯ÂÃ¤Â¸ÂªÃ©â„¢â€žÃ¥Â¸Â¦Ã¯Â¼Å¡
- Ã¥ÂÂÃ¥Â­â€”
- Ã¥â€˜Â½Ã¥ÂÂÃ§Â­â€“Ã§â€¢Â¥Ã§Â±Â»Ã¥Å¾â€¹
- Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¨Â¿â„¢Ã¤Â¸ÂªÃ¥ÂÂÃ¥Â­â€”Ã¥â€™Å’Ã§ÂÂµÃ©Â­â€šÃ¦ÂÂ­Ã©â€¦Â

```markdown
## Ã¥ÂÂÃ¥Â­â€”Ã¥â‚¬â„¢Ã©â‚¬â€°

1. **[Ã¥ÂÂÃ¥Â­â€”]**Ã¯Â¼Ë†[Ã§Â­â€“Ã§â€¢Â¥Ã§Â±Â»Ã¥Å¾â€¹]Ã¯Â¼â€°Ã¢â‚¬â€Ã¢â‚¬â€ [Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ¨Â§Â£Ã©â€¡Å Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¦ÂÂ­]
2. **[Ã¥ÂÂÃ¥Â­â€”]**Ã¯Â¼Ë†[Ã§Â­â€“Ã§â€¢Â¥Ã§Â±Â»Ã¥Å¾â€¹]Ã¯Â¼â€°Ã¢â‚¬â€Ã¢â‚¬â€ [Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ¨Â§Â£Ã©â€¡Å Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¦ÂÂ­]
3. **[Ã¥ÂÂÃ¥Â­â€”]**Ã¯Â¼Ë†[Ã§Â­â€“Ã§â€¢Â¥Ã§Â±Â»Ã¥Å¾â€¹]Ã¯Â¼â€°Ã¢â‚¬â€Ã¢â‚¬â€ [Ã¤Â¸â‚¬Ã¥ÂÂ¥Ã¨Â¯ÂÃ¨Â§Â£Ã©â€¡Å Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¦ÂÂ­]
```

Ã¥Â±â€¢Ã§Â¤ÂºÃ¥ÂÅ½Ã¨Â¯Â´Ã¥â€¡ÂºÃ¨â€¡ÂªÃ¥Â·Â±Ã¦Å“â‚¬Ã¥ÂÂÃ§Ë†Â±Ã¥â€œÂªÃ¤Â¸ÂªÃ¯Â¼Ë†Ã©â„¢â€žÃ§Ââ€ Ã§â€Â±Ã¯Â¼â€°Ã¯Â¼Å’Ã¤Â½â€ Ã¦Å Å Ã©â‚¬â€°Ã¦â€¹Â©Ã¦ÂÆ’Ã¤ÂºÂ¤Ã§Â»â„¢Ã§â€Â¨Ã¦Ë†Â·Ã¯Â¼Ë†Ã¥Ââ€šÃ¨Â§Â SKILL.md Ã¥Â¯Â¹Ã¨Â¯ÂÃ¨Â¯Â­Ã¦Â°â€Ã¦Å’â€¡Ã¥Ââ€”Ã¯Â¼â€°

## Ã¥â€˜Â½Ã¥ÂÂÃ§ÂºÂ¢Ã§ÂºÂ¿

- Ã¤Â¸ÂÃ¨Â¦ÂÃ§â€Â¨ agent-1Ã£â‚¬Âmy-botÃ£â‚¬ÂÃ¥Â°ÂÃ¥Å Â©Ã¦â€°â€¹
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¨Â¶â€¦Ã¨Â¿â€¡ 3 Ã¤Â¸ÂªÃ¥Ââ€¢Ã¨Â¯Â
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¥â€™Å’Ã¥Â¸Â¸Ã¨Â§ÂÃ¥Â·Â¥Ã¥â€¦Â·/Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥ÂÂÃ¥â€ Â²Ã§ÂªÂ
- Ã¥Â¥Â½Ã¨Â®Â°Ã£â‚¬ÂÃ¥Â¥Â½Ã¥Â¿ÂµÃ£â‚¬ÂÃ¥Â¥Â½Ã¦â€°â€œÃ¥Â­â€”
- Ã¥ÂÂÃ¥Â­â€”Ã¨Â¯Â»Ã¥Â®Å’Ã¥Â°Â±Ã¨Æ’Â½Ã§Å’Å“Ã¥Ë†Â°Ã¥Â¤Â§Ã¨â€¡Â´Ã¦â‚¬Â§Ã¦Â Â¼
