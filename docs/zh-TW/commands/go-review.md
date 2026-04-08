---
description: Comprehensive Go code review for idiomatic patterns, concurrency safety, error handling, and security. Invokes the go-reviewer agent.
---

# Go Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã¥â€˜Â¼Ã¥ÂÂ« **go-reviewer** Agent Ã©â‚¬Â²Ã¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Go Ã§â€°Â¹Ã¥Â®Å¡Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¨Â­ËœÃ¥Ë†Â¥ Go Ã¨Â®Å Ã¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬ÂÃ©ÂÅ½ `git diff` Ã¦â€°Â¾Ã¥â€¡ÂºÃ¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€ž `.go` Ã¦Âªâ€Ã¦Â¡Ë†
2. **Ã¥Å¸Â·Ã¨Â¡Å’Ã©ÂÅ“Ã¦â€¦â€¹Ã¥Ë†â€ Ã¦Å¾Â**Ã¯Â¼Å¡Ã¥Å¸Â·Ã¨Â¡Å’ `go vet`Ã£â‚¬Â`staticcheck` Ã¥â€™Å’ `golangci-lint`
3. **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦Å½Æ’Ã¦ÂÂ**Ã¯Â¼Å¡Ã¦ÂªÂ¢Ã¦Å¸Â¥ SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ§Â«Â¶Ã¦â€¦â€¹Ã¦Â¢ÂÃ¤Â»Â¶
4. **Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Â¯Â©Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾Â goroutine Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬Âchannel Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬Âmutex Ã¦Â¨Â¡Ã¥Â¼Â
5. **Ã¦â€¦Â£Ã§â€Â¨ Go Ã¦ÂªÂ¢Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã©Â©â€”Ã¨Â­â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©ÂÂµÃ¥Â¾Âª Go Ã¦â€¦Â£Ã¤Â¾â€¹Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢
6. **Ã§â€Â¢Ã§â€Å¸Ã¥Â Â±Ã¥â€˜Å **Ã¯Â¼Å¡Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Ë†â€ Ã©Â¡Å¾Ã¥â€¢ÂÃ©Â¡Å’

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¤Â½Â¿Ã§â€Â¨ `/go-review`Ã¯Â¼Å¡
- Ã¦â€™Â°Ã¥Â¯Â«Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ Go Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¾Å’
- Ã¦ÂÂÃ¤ÂºÂ¤ Go Ã¨Â®Å Ã¦â€ºÂ´Ã¥â€°Â
- Ã¥Â¯Â©Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« Go Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Å¡â€ž PR
- Ã¥Å Â Ã¥â€¦Â¥Ã¦â€“Â°Ã§Å¡â€ž Go Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¦â„¢â€š
- Ã¥Â­Â¸Ã§Â¿â€™Ã¦â€¦Â£Ã§â€Â¨ Go Ã¦Â¨Â¡Ã¥Â¼Â

## Ã¥Â¯Â©Ã¦Å¸Â¥Ã©Â¡Å¾Ã¥Ë†Â¥

### Ã©â€”Å“Ã©ÂÂµÃ¯Â¼Ë†Ã¥Â¿â€¦Ã©Â Ë†Ã¤Â¿Â®Ã¥Â¾Â©Ã¯Â¼â€°
- SQL/Ã¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥Â¼Â±Ã©Â»Å¾
- Ã¦Â²â€™Ã¦Å“â€°Ã¥ÂÅ’Ã¦Â­Â¥Ã§Å¡â€žÃ§Â«Â¶Ã¦â€¦â€¹Ã¦Â¢ÂÃ¤Â»Â¶
- Goroutine Ã¦Â´Â©Ã¦Â¼Â
- Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¦â€ â€˜Ã¨Â­â€°
- Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¦Å’â€¡Ã¦Â¨â„¢Ã¤Â½Â¿Ã§â€Â¨
- Ã©â€”Å“Ã©ÂÂµÃ¨Â·Â¯Ã¥Â¾â€˜Ã¤Â¸Â­Ã¥Â¿Â½Ã§â€¢Â¥Ã©Å’Â¯Ã¨ÂªÂ¤

### Ã©Â«ËœÃ¯Â¼Ë†Ã¦â€¡â€°Ã¨Â©Â²Ã¤Â¿Â®Ã¥Â¾Â©Ã¯Â¼â€°
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¸Â¶Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤Ã¥Å’â€¦Ã¨Â£Â
- Ã§â€Â¨ Panic Ã¥Ââ€“Ã¤Â»Â£ Error Ã¥â€ºÅ¾Ã¥â€šÂ³
- Context Ã¦Å“ÂªÃ¥â€šÂ³Ã©ÂÅ¾
- Ã§â€žÂ¡Ã§Â·Â©Ã¨Â¡Â channel Ã¥Â°Å½Ã¨â€¡Â´Ã¦Â­Â»Ã©Å½â€“
- Ã¤Â»â€¹Ã©ÂÂ¢Ã¦Å“ÂªÃ¦Â»Â¿Ã¨Â¶Â³Ã©Å’Â¯Ã¨ÂªÂ¤
- Ã§Â¼ÂºÃ¥Â°â€˜ mutex Ã¤Â¿ÂÃ¨Â­Â·

### Ã¤Â¸Â­Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¦â€¦Â®Ã¯Â¼â€°
- Ã©ÂÅ¾Ã¦â€¦Â£Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¨Â¡Ã¥Â¼Â
- Ã¥Å’Â¯Ã¥â€¡ÂºÃ©Â â€¦Ã§â€ºÂ®Ã§Â¼ÂºÃ¥Â°â€˜ godoc Ã¨Â¨Â»Ã¨Â§Â£
- Ã¤Â½Å½Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â­â€”Ã¤Â¸Â²Ã¤Â¸Â²Ã¦Å½Â¥
- Slice Ã¦Å“ÂªÃ©Â ÂÃ¥Ë†â€ Ã©â€¦Â
- Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦

## Ã¥Å¸Â·Ã¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å’â€“Ã¦ÂªÂ¢Ã¦Å¸Â¥

```bash
# Ã©ÂÅ“Ã¦â€¦â€¹Ã¥Ë†â€ Ã¦Å¾Â
go vet ./...

# Ã©â‚¬Â²Ã©Å¡Å½Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â·Â²Ã¥Â®â€°Ã¨Â£ÂÃ¯Â¼â€°
staticcheck ./...
golangci-lint run

# Ã§Â«Â¶Ã¦â€¦â€¹Ã¥ÂÂµÃ¦Â¸Â¬
go build -race ./...

# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Â¼Â±Ã©Â»Å¾
govulncheck ./...
```

## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â¨â„¢Ã¦Âºâ€“

| Ã§â€¹â‚¬Ã¦â€¦â€¹ | Ã¦Â¢ÂÃ¤Â»Â¶ |
|------|------|
| PASS: Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦Â²â€™Ã¦Å“â€°Ã©â€”Å“Ã©ÂÂµÃ¦Ë†â€“Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’ |
| WARNING: Ã¨Â­Â¦Ã¥â€˜Å  | Ã¥ÂÂªÃ¦Å“â€°Ã¤Â¸Â­Ã¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã¨Â¬Â¹Ã¦â€¦Å½Ã¥ÂË†Ã¤Â½ÂµÃ¯Â¼â€°|
| FAIL: Ã©ËœÂ»Ã¦â€œâ€¹ | Ã§â„¢Â¼Ã§ÂÂ¾Ã©â€”Å“Ã©ÂÂµÃ¦Ë†â€“Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’ |

## Ã¨Ë†â€¡Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¦â€¢Â´Ã¥ÂË†

- Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/go-test` Ã§Â¢ÂºÃ¤Â¿ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½
- Ã¥Â¦â€šÃ¦Å¾Å“Ã§â„¢Â¼Ã§â€Å¸Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/go-build`
- Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/go-review`
- Ã¥Â°ÂÃ©ÂÅ¾ Go Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€¢ÂÃ©Â¡Å’Ã¤Â½Â¿Ã§â€Â¨ `/code-review`

## Ã§â€ºÂ¸Ã©â€”Å“

- AgentÃ¯Â¼Å¡`agents/go-reviewer.md`
- Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/golang-patterns/`Ã£â‚¬Â`skills/golang-testing/`
