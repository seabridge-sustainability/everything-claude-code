---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/testing.md](../common/testing.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â¡â€ Ã¦Å¾Â¶

Ã¤Â½Â¿Ã§â€Â¨Ã¦Â â€¡Ã¥â€¡â€ Ã§Å¡â€ž `go test` Ã¥Â¹Â¶Ã©â€¡â€¡Ã§â€Â¨ **Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã£â‚¬â€š

## Ã§Â«Å¾Ã¦â‚¬ÂÃ¦Â£â‚¬Ã¦Âµâ€¹

Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `-race` Ã¦Â â€¡Ã¥Â¿â€”Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

```bash
go test -race ./...
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
go test -cover ./...
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`golang-testing` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€ž Go Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€š
