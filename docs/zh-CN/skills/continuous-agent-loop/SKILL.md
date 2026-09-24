---
name: continuous-agent-loop
description: Ã¥â€¦Â·Ã¦Å“â€°Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã£â‚¬ÂÃ¨Â¯â€žÃ¤Â¼Â°Ã¥â€™Å’Ã¦ÂÂ¢Ã¥Â¤ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã§Å¡â€žÃ¨Â¿Å¾Ã§Â»Â­Ã¨â€¡ÂªÃ¤Â¸Â»Ã¤Â»Â£Ã§Ââ€ Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
origin: ECC
---

# Ã¦Å’ÂÃ§Â»Â­Ã¤Â»Â£Ã§Ââ€ Ã¥Â¾ÂªÃ§Å½Â¯

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


Ã¨Â¿â„¢Ã¦ËœÂ¯ v1.8+ Ã§Å¡â€žÃ¨Â§â€žÃ¨Å’Æ’Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂÃ§Â§Â°Ã£â‚¬â€šÃ¥Â®Æ’Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€˜Ã¥Â¸Æ’Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§Ã§Å¡â€žÃ¥ÂÅ’Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Ââ€“Ã¤Â»Â£Ã¤Âºâ€  `autonomous-loops`Ã£â‚¬â€š

## Ã¥Â¾ÂªÃ§Å½Â¯Ã©â‚¬â€°Ã¦â€¹Â©Ã¦ÂµÂÃ§Â¨â€¹

```text
Start
  |
  +-- Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€ž CI/PR Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Å¸ -- yes --> continuous-pr
  |
  +-- Ã©Å“â‚¬Ã¨Â¦Â RFC Ã¥Ë†â€ Ã¨Â§Â£Ã¯Â¼Å¸ -- yes --> rfc-dag
  |
  +-- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å½Â¢Ã§Â´Â¢Ã¦â‚¬Â§Ã¥Â¹Â¶Ã¨Â¡Å’Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼Å¸ -- yes --> infinite
  |
  +-- default --> sequential
```

## Ã§Â»â€žÃ¥ÂË†Ã¦Â¨Â¡Ã¥Â¼Â

Ã¦Å½Â¨Ã¨ÂÂÃ§Å¡â€žÃ§â€Å¸Ã¤ÂºÂ§Ã¦Â Ë†Ã¯Â¼Å¡

1. RFC Ã¥Ë†â€ Ã¨Â§Â£ (`ralphinho-rfc-pipeline`)
2. Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨ (`plankton-code-quality` + `/quality-gate`)
3. Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â¾ÂªÃ§Å½Â¯ (`eval-harness`)
4. Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“ (`nanoclaw-repl`)

## Ã¦â€¢â€¦Ã©Å¡Å“Ã¦Â¨Â¡Ã¥Â¼Â

* Ã¥Â¾ÂªÃ§Å½Â¯Ã§Â©ÂºÃ¨Â½Â¬Ã¯Â¼Å’Ã¦Â²Â¡Ã¦Å“â€°Ã¥ÂÂ¯Ã¨Â¡Â¡Ã©â€¡ÂÃ§Å¡â€žÃ¨Â¿â€ºÃ¥Â±â€¢
* Ã¥â€ºÂ Ã§â€ºÂ¸Ã¥ÂÅ’Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã©â€¡ÂÃ¥Â¤ÂÃ©â€¡ÂÃ¨Â¯â€¢
* Ã¥ÂË†Ã¥Â¹Â¶Ã©ËœÅ¸Ã¥Ë†â€”Ã¥ÂÅ“Ã¦Â»Å¾
* Ã¦â€”Â Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Ââ€¡Ã§ÂºÂ§Ã¥Â¯Â¼Ã¨â€¡Â´Ã§Å¡â€žÃ¦Ë†ÂÃ¦Å“Â¬Ã¦Â¼â€šÃ§Â§Â»

## Ã¦ÂÂ¢Ã¥Â¤Â

* Ã¥â€ Â»Ã§Â»â€œÃ¥Â¾ÂªÃ§Å½Â¯
* Ã¨Â¿ÂÃ¨Â¡Å’ `/harness-audit`
* Ã¥Â°â€ Ã¨Å’Æ’Ã¥â€ºÂ´Ã§Â¼Â©Ã¥Â°ÂÃ¥Ë†Â°Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Ââ€¢Ã¥â€¦Æ’
* Ã¤Â½Â¿Ã§â€Â¨Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ©ÂªÅ’Ã¦â€Â¶Ã¦Â â€¡Ã¥â€¡â€ Ã©â€¡ÂÃ¦â€Â¾
