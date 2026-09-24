---
description: Enforce TDD workflow for Go. Write table-driven tests first, then implement. Verify 80%+ coverage with go test -cover.
---

# Go TDD Ã¦Å’â€¡Ã¤Â»Â¤

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
