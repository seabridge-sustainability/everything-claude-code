---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* **gofmt** Ã¥â€™Å’ **goimports** Ã¦ËœÂ¯Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â‚¬Â§Ã§Å¡â€ž Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦â€”Â Ã©Å“â‚¬Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Â£Å½Ã¦Â Â¼Ã¨Â¾Â©Ã¨Â®Âº

## Ã¨Â®Â¾Ã¨Â®Â¡Ã¥Å½Å¸Ã¥Ë†â„¢

* Ã¦Å½Â¥Ã¥Ââ€”Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œ
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å½Â¥Ã¥ÂÂ£Ã¥Â°ÂÃ¥Â·Â§Ã¯Â¼Ë†1-3 Ã¤Â¸ÂªÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼â€°

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¥Â§â€¹Ã§Â»Ë†Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å’â€¦Ã¨Â£â€¦Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

```go
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`golang-patterns` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
