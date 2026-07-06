---
description: Enforce TDD workflow for Go. Write table-driven tests first, then implement. Verify 80%+ coverage with go test -cover.
---

# Go TDD Ã¦Å’â€¡Ã¤Â»Â¤

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Å¸Â·Ã¨Â¡Å’ Go Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¦â€“Â¹Ã¦Â³â€¢Ã¨Â«â€“Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¦â€¦Â£Ã§â€Â¨Ã§Å¡â€ž Go Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¥Â®Å¡Ã§Â¾Â©Ã©Â¡Å¾Ã¥Å¾â€¹/Ã¤Â»â€¹Ã©ÂÂ¢**Ã¯Â¼Å¡Ã¥â€¦Ë†Ã¥Â»ÂºÃ§Â«â€¹Ã¥â€¡Â½Ã¥Â¼ÂÃ§Â°Â½Ã¥ÂÂÃ©ÂªÂ¨Ã¦Å¾Â¶
2. **Ã¦â€™Â°Ã¥Â¯Â«Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¯Â¼Å¡Ã¥Â»ÂºÃ§Â«â€¹Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¡Ë†Ã¤Â¾â€¹Ã¯Â¼Ë†REDÃ¯Â¼â€°
3. **Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¯Â¼Å¡Ã©Â©â€”Ã¨Â­â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¢ÂºÃ§Å¡â€žÃ¥Å½Å¸Ã¥â€ºÂ Ã¥Â¤Â±Ã¦â€¢â€”
4. **Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼**Ã¯Â¼Å¡Ã¦â€™Â°Ã¥Â¯Â«Ã¦Å“â‚¬Ã¥Â°ÂÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â½Â¿Ã¥â€¦Â¶Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†GREENÃ¯Â¼â€°
5. **Ã©â€¡ÂÃ¦Â§â€¹**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¿ÂÃ¦Å’ÂÃ§Â¶Â Ã¨â€°Â²Ã§Å¡â€žÃ¥ÂÅ’Ã¦â„¢â€šÃ¦â€Â¹Ã©â‚¬Â²
6. **Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡**Ã¯Â¼Å¡Ã§Â¢ÂºÃ¤Â¿Â 80% Ã¤Â»Â¥Ã¤Â¸Å Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¤Â½Â¿Ã§â€Â¨ `/go-test`Ã¯Â¼Å¡
- Ã¥Â¯Â¦Ã¤Â½Å“Ã¦â€“Â°Ã§Å¡â€ž Go Ã¥â€¡Â½Ã¥Â¼Â
- Ã§â€šÂºÃ§ÂÂ¾Ã¦Å“â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦â€“Â°Ã¥Â¢Å¾Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
- Ã¤Â¿Â®Ã¥Â¾Â© BugÃ¯Â¼Ë†Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¥Â¤Â±Ã¦â€¢â€”Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼â€°
- Ã¥Â»ÂºÃ¦Â§â€¹Ã©â€”Å“Ã©ÂÂµÃ¥â€¢â€ Ã¦Â¥Â­Ã©â€šÂÃ¨Â¼Â¯
- Ã¥Â­Â¸Ã§Â¿â€™ Go Ã¤Â¸Â­Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

## TDD Ã¥Â¾ÂªÃ§â€™Â°

```
RED     Ã¢â€ â€™ Ã¦â€™Â°Ã¥Â¯Â«Ã¥Â¤Â±Ã¦â€¢â€”Ã§Å¡â€žÃ¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦
GREEN   Ã¢â€ â€™ Ã¥Â¯Â¦Ã¤Â½Å“Ã¦Å“â‚¬Ã¥Â°ÂÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â½Â¿Ã¥â€¦Â¶Ã©â‚¬Å¡Ã©ÂÅ½
REFACTOR Ã¢â€ â€™ Ã¦â€Â¹Ã©â‚¬Â²Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Å’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¿ÂÃ¦Å’ÂÃ§Â¶Â Ã¨â€°Â²
REPEAT  Ã¢â€ â€™ Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¡Ë†Ã¤Â¾â€¹
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦
```go
tests := []struct {
    name     string
    input    InputType
    want     OutputType
    wantErr  bool
}{
    {"case 1", input1, want1, false},
    {"case 2", input2, want2, true},
}

for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        got, err := Function(tt.input)
        // Ã¦â€“Â·Ã¨Â¨â‚¬
    })
}
```

### Ã¥Â¹Â³Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
```go
for _, tt := range tests {
    tt := tt // Ã¦â€œÂ·Ã¥Ââ€“
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€¦Â§Ã¥Â®Â¹
    })
}
```

### Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼Â
```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db := createDB()
    t.Cleanup(func() { db.Close() })
    return db
}
```

## Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¦Å’â€¡Ã¤Â»Â¤

```bash
# Ã¥Å¸ÂºÃ¦Å“Â¬Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go test -cover ./...

# Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡ profile
go test -coverprofile=coverage.out ./...

# Ã¥Å“Â¨Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¦ÂªÂ¢Ã¨Â¦â€“
go tool cover -html=coverage.out

# Ã¤Â¾ÂÃ¥â€¡Â½Ã¥Â¼ÂÃ©Â¡Â¯Ã§Â¤ÂºÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go tool cover -func=coverage.out

# Ã¥Â¸Â¶Ã§Â«Â¶Ã¦â€¦â€¹Ã¥ÂÂµÃ¦Â¸Â¬
go test -race -cover ./...
```

## Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â¨â„¢

| Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©Â¡Å¾Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â¨â„¢ |
|-----------|------|
| Ã©â€”Å“Ã©ÂÂµÃ¥â€¢â€ Ã¦Â¥Â­Ã©â€šÂÃ¨Â¼Â¯ | 100% |
| Ã¥â€¦Â¬Ã©â€“â€¹ API | 90%+ |
| Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ | 80%+ |
| Ã§â€Â¢Ã§â€Å¸Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ | Ã¦Å½â€™Ã©â„¢Â¤ |

## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

**Ã¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã¯Â¼Å¡**
- Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â¯Â¦Ã¤Â½Å“Ã¥â€°ÂÃ¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â®Å Ã¦â€ºÂ´Ã¥Â¾Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â»Â¥Ã§ÂÂ²Ã¥Â¾â€”Ã¥â€¦Â¨Ã©ÂÂ¢Ã¨Â¦â€ Ã¨â€œâ€¹
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¡Å’Ã§â€šÂºÃ¯Â¼Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â´Â°Ã§Â¯â‚¬
- Ã¥Å’â€¦Ã¥ÂÂ«Ã©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂnilÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¼Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã¯Â¼Å¡**
- Ã¥Å“Â¨Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¹â€¹Ã¥â€°ÂÃ¦â€™Â°Ã¥Â¯Â«Ã¥Â¯Â¦Ã¤Â½Å“
- Ã¨Â·Â³Ã©ÂÅ½ RED Ã©Å¡Å½Ã¦Â®Âµ
- Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Â§ÂÃ¦Å“â€°Ã¥â€¡Â½Ã¥Â¼Â
- Ã¥Å“Â¨Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `time.Sleep`
- Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦

## Ã§â€ºÂ¸Ã©â€”Å“Ã¦Å’â€¡Ã¤Â»Â¤

- `/go-build` - Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤
- `/go-review` - Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Â¾Å’Ã¥Â¯Â©Ã¦Å¸Â¥Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
- `/verify` - Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã©Â©â€”Ã¨Â­â€°Ã¨Â¿Â´Ã¥Å“Ë†

## Ã§â€ºÂ¸Ã©â€”Å“

- Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/golang-testing/`
- Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/tdd-workflow/`
