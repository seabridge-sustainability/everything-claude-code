---
description: Fix Go build errors, go vet warnings, and linter issues incrementally. Invokes the go-build-resolver agent for minimal, surgical fixes.
---

# Go Ã¥Â»ÂºÃ§Â½Â®Ã¨Ë†â€¡Ã¤Â¿Â®Ã¥Â¾Â©

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


Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã¥â€˜Â¼Ã¥ÂÂ« **go-build-resolver** AgentÃ¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ¨Â®Å Ã¦â€ºÂ´Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¾Â© Go Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¥Å¸Â·Ã¨Â¡Å’Ã¨Â¨ÂºÃ¦â€“Â·**Ã¯Â¼Å¡Ã¥Å¸Â·Ã¨Â¡Å’ `go build`Ã£â‚¬Â`go vet`Ã£â‚¬Â`staticcheck`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©Å’Â¯Ã¨ÂªÂ¤**Ã¯Â¼Å¡Ã¤Â¾ÂÃ¦Âªâ€Ã¦Â¡Ë†Ã¥Ë†â€ Ã§Âµâ€žÃ¤Â¸Â¦Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ
3. **Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¾Â©**Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤
4. **Ã©Â©â€”Ã¨Â­â€°Ã¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¾Â©**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â®Å Ã¦â€ºÂ´Ã¥Â¾Å’Ã©â€¡ÂÃ¦â€“Â°Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â»ÂºÃ§Â½Â®
5. **Ã¥Â Â±Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã©Â¡Â¯Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¾Â©Ã¥â€™Å’Ã¥â€°Â©Ã©Â¤ËœÃ§Å¡â€žÃ¥â€¢ÂÃ©Â¡Å’

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¤Â½Â¿Ã§â€Â¨ `/go-build`Ã¯Â¼Å¡
- `go build ./...` Ã¥Â¤Â±Ã¦â€¢â€”Ã¤Â¸Â¦Ã¥â€¡ÂºÃ§ÂÂ¾Ã©Å’Â¯Ã¨ÂªÂ¤
- `go vet ./...` Ã¥Â Â±Ã¥â€˜Å Ã¥â€¢ÂÃ©Â¡Å’
- `golangci-lint run` Ã©Â¡Â¯Ã§Â¤ÂºÃ¨Â­Â¦Ã¥â€˜Å 
- Ã¦Â¨Â¡Ã§Âµâ€žÃ§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§Ã¦ÂÂÃ¥Â£Å¾
- Ã¦â€¹â€°Ã¥Ââ€“Ã§Â Â´Ã¥Â£Å¾Ã¥Â»ÂºÃ§Â½Â®Ã§Å¡â€žÃ¨Â®Å Ã¦â€ºÂ´Ã¥Â¾Å’

## Ã¥Å¸Â·Ã¨Â¡Å’Ã§Å¡â€žÃ¨Â¨ÂºÃ¦â€“Â·Ã¦Å’â€¡Ã¤Â»Â¤

```bash
# Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Â»ÂºÃ§Â½Â®Ã¦ÂªÂ¢Ã¦Å¸Â¥
go build ./...

# Ã©ÂÅ“Ã¦â€¦â€¹Ã¥Ë†â€ Ã¦Å¾Â
go vet ./...

# Ã¦â€œÂ´Ã¥Â±â€¢ lintingÃ¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥ÂÂ¯Ã§â€Â¨Ã¯Â¼â€°
staticcheck ./...
golangci-lint run

# Ã¦Â¨Â¡Ã§Âµâ€žÃ¥â€¢ÂÃ©Â¡Å’
go mod verify
go mod tidy -v
```

## Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¤Â¿Â®Ã¥Â¾Â©Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤

| Ã©Å’Â¯Ã¨ÂªÂ¤ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¾Â© |
|------|----------|
| `undefined: X` | Ã¦â€“Â°Ã¥Â¢Å¾ import Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¦â€°â€œÃ¥Â­â€”Ã©Å’Â¯Ã¨ÂªÂ¤ |
| `cannot use X as Y` | Ã¥Å¾â€¹Ã¥Ë†Â¥Ã¨Â½â€°Ã¦Ââ€ºÃ¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¨Â³Â¦Ã¥â‚¬Â¼ |
| `missing return` | Ã¦â€“Â°Ã¥Â¢Å¾ return Ã©â„¢Â³Ã¨Â¿Â°Ã¥Â¼Â |
| `X does not implement Y` | Ã¦â€“Â°Ã¥Â¢Å¾Ã§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢ |
| `import cycle` | Ã©â€¡ÂÃ§Âµâ€žÃ¥Â¥â€”Ã¤Â»Â¶ |
| `declared but not used` | Ã§Â§Â»Ã©â„¢Â¤Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨Ã¨Â®Å Ã¦â€¢Â¸ |
| `cannot find package` | `go get` Ã¦Ë†â€“ `go mod tidy` |

## Ã¤Â¿Â®Ã¥Â¾Â©Ã§Â­â€“Ã§â€¢Â¥

1. **Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥â€žÂªÃ¥â€¦Ë†** - Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¿â€¦Ã©Â Ë†Ã§Â·Â¨Ã¨Â­Â¯
2. **Vet Ã¨Â­Â¦Ã¥â€˜Å Ã¦Â¬Â¡Ã¤Â¹â€¹** - Ã¤Â¿Â®Ã¥Â¾Â©Ã¥ÂÂ¯Ã§â€“â€˜Ã¦Â§â€¹Ã©â‚¬Â 
3. **Lint Ã¨Â­Â¦Ã¥â€˜Å Ã§Â¬Â¬Ã¤Â¸â€°** - Ã©Â¢Â¨Ã¦Â Â¼Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¤Â¿Â®Ã¥Â¾Â©** - Ã©Â©â€”Ã¨Â­â€°Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â®Å Ã¦â€ºÂ´
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¨Â®Å Ã¦â€ºÂ´** - Ã¤Â¸ÂÃ¨Â¦ÂÃ©â€¡ÂÃ¦Â§â€¹Ã¯Â¼Å’Ã¥ÂÂªÃ¤Â¿Â®Ã¥Â¾Â©

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Â¢ÂÃ¤Â»Â¶

Agent Ã¦Å“Æ’Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¥ÂÅ“Ã¦Â­Â¢Ã¤Â¸Â¦Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡
- 3 Ã¦Â¬Â¡Ã¥Ëœâ€”Ã¨Â©Â¦Ã¥Â¾Å’Ã¥ÂÅ’Ã¦Â¨Â£Ã©Å’Â¯Ã¨ÂªÂ¤Ã¤Â»ÂÃ¥Â­ËœÃ¥Å“Â¨
- Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â¼â€¢Ã¥â€¦Â¥Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©Å’Â¯Ã¨ÂªÂ¤
- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å¾Â¶Ã¦Â§â€¹Ã¨Â®Å Ã¦â€ºÂ´
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¤â€“Ã©Æ’Â¨Ã§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§

## Ã§â€ºÂ¸Ã©â€”Å“Ã¦Å’â€¡Ã¤Â»Â¤

- `/go-test` - Ã¥Â»ÂºÃ§Â½Â®Ã¦Ë†ÂÃ¥Å Å¸Ã¥Â¾Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
- `/go-review` - Ã¥Â¯Â©Ã¦Å¸Â¥Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³Âª
- `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã©Â©â€”Ã¨Â­â€°Ã¨Â¿Â´Ã¥Å“Ë†

## Ã§â€ºÂ¸Ã©â€”Å“

- AgentÃ¯Â¼Å¡`agents/go-build-resolver.md`
- Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/golang-patterns/`
