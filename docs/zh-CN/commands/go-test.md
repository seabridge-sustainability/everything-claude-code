---
description: Ã¤Â¸ÂºGoÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’TDDÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€šÃ©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¡Â¨Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Å¾Ã§Å½Â°Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨go test -coverÃ©ÂªÅ’Ã¨Â¯Â80%Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š
---

# Go TDD Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’Â¯Ã§â€Â¨Ã§Å¡â€ž Go Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¤Â¸Âº Go Ã¤Â»Â£Ã§Â ÂÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â±Â»Ã¥Å¾â€¹/Ã¦Å½Â¥Ã¥ÂÂ£**Ã¯Â¼Å¡Ã©Â¦â€“Ã¥â€¦Ë†Ã¦ÂÂ­Ã¥Â»ÂºÃ¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂ
2. **Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¡Â¨Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹Ã¯Â¼Ë†RED Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼â€°
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¡Â®Ã¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
4. **Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â Â**Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†GREEN Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼â€°
5. **Ã©â€¡ÂÃ¦Å¾â€ž**Ã¯Â¼Å¡Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¥ÂÅ’Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
6. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡**Ã¯Â¼Å¡Ã§Â¡Â®Ã¤Â¿Â 80% Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/go-test`Ã¯Â¼Å¡

* Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã§Å¡â€ž Go Ã¥â€¡Â½Ã¦â€¢Â°Ã¦â€”Â¶
* Ã¤Â¸ÂºÃ§Å½Â°Ã¦Å“â€°Ã¤Â»Â£Ã§Â ÂÃ¦Â·Â»Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦â€”Â¶
* Ã¤Â¿Â®Ã¥Â¤Â bug Ã¦â€”Â¶Ã¯Â¼Ë†Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â  Go Ã¤Â¸Â­Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¦â€”Â¶

## TDD Ã¥Â¾ÂªÃ§Å½Â¯

```
RED     Ã¢â€ â€™ Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢
GREEN   Ã¢â€ â€™ Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
REFACTOR Ã¢â€ â€™ Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
REPEAT  Ã¢â€ â€™ Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````
Ã§â€Â¨Ã¦Ë†Â·: /go-test Ã¦Ë†â€˜Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂªÅ’Ã¨Â¯ÂÃ§â€ÂµÃ¥Â­ÂÃ©â€šÂ®Ã§Â®Â±Ã¥Å“Â°Ã¥Ââ‚¬Ã§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°

Ã¤Â»Â£Ã§Ââ€ :
# TDD Ã¤Â¼Å¡Ã¨Â¯Â: Ã§â€ÂµÃ¥Â­ÂÃ©â€šÂ®Ã¤Â»Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â„¢Â¨

## Ã¦Â­Â¥Ã©ÂªÂ¤ 1: Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Å½Â¥Ã¥ÂÂ£

```go
// validator/email.go
package validator

// ValidateEmail Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Â»â„¢Ã¥Â®Å¡Ã§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¤Â¸ÂºÃ¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ§â€ÂµÃ¥Â­ÂÃ©â€šÂ®Ã¤Â»Â¶Ã¥Å“Â°Ã¥Ââ‚¬Ã£â‚¬â€š
// Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¦â€¢Ë†Ã¥Ë†â„¢Ã¨Â¿â€Ã¥â€ºÅ¾ nilÃ¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¨Â¿â€Ã¥â€ºÅ¾Ã¦ÂÂÃ¨Â¿Â°Ã©â€”Â®Ã©Â¢ËœÃ§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š
func ValidateEmail(email string) error {
    panic("not implemented")
}
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2: Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¡Â¨Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢ (RED)

```go
// validator/email_test.go
package validator

import (
    "testing"
)

func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        wantErr bool
    }{
        // Ã¦Å“â€°Ã¦â€¢Ë†Ã©â€šÂ®Ã§Â®Â±
        {"simple email", "user@example.com", false},
        {"with subdomain", "user@mail.example.com", false},
        {"with plus", "user+tag@example.com", false},
        {"with dots", "first.last@example.com", false},

        // Ã¦â€”Â Ã¦â€¢Ë†Ã©â€šÂ®Ã§Â®Â±
        {"empty string", "", true},
        {"no at sign", "userexample.com", true},
        {"no domain", "user@", true},
        {"no local part", "@example.com", true},
        {"double at", "user@@example.com", true},
        {"spaces", "user @example.com", true},
        {"no tld", "user@example", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ValidateEmail(tt.email)
            if tt.wantErr && err == nil {
                t.Errorf("ValidateEmail(%q) = nil; want error", tt.email)
            }
            if !tt.wantErr && err != nil {
                t.Errorf("ValidateEmail(%q) = %v; want nil", tt.email, err)
            }
        })
    }
}
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3: Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤Â±Ã¨Â´Â¥

```bash
$ go test ./validator/...

--- FAIL: TestValidateEmail (0.00s)
    --- FAIL: TestValidateEmail/simple_email (0.00s)
        panic: not implemented

FAIL
```

Ã¢Å“â€œ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å’â€°Ã©Â¢â€žÃ¦Å“Å¸Ã¥Â¤Â±Ã¨Â´Â¥ (panic)Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 4: Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â Â (GREEN)

```go
// validator/email.go
package validator

import (
    "errors"
    "regexp"
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)

var (
    ErrEmailEmpty   = errors.New("email cannot be empty")
    ErrEmailInvalid = errors.New("email format is invalid")
)

func ValidateEmail(email string) error {
    if email == "" {
        return ErrEmailEmpty
    }
    if !emailRegex.MatchString(email) {
        return ErrEmailInvalid
    }
    return nil
}
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 5: Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ©â‚¬Å¡Ã¨Â¿â€¡

```bash
$ go test ./validator/...

PASS
ok      project/validator    0.003s
```

Ã¢Å“â€œ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Â

## Ã¦Â­Â¥Ã©ÂªÂ¤ 6: Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
$ go test -cover ./validator/...

PASS
coverage: 100.0% of statements
ok      project/validator    0.003s
```

Ã¢Å“â€œ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡: 100%

## TDD Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Â
````

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¨Â¡Â¨Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢

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
        // assertions
    })
}
```

### Ã¥Â¹Â¶Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

```go
for _, tt := range tests {
    tt := tt // Capture
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // test body
    })
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾â€¦Ã¥Å Â©Ã¥â€¡Â½Ã¦â€¢Â°

```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db := createDB()
    t.Cleanup(func() { db.Close() })
    return db
}
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Basic coverage
go test -cover ./...

# Coverage profile
go test -coverprofile=coverage.out ./...

# View in browser
go tool cover -html=coverage.out

# Coverage by function
go tool cover -func=coverage.out

# With race detection
go test -race -cover ./...
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

| Ã¤Â»Â£Ã§Â ÂÃ§Â±Â»Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ | 100% |
| Ã¥â€¦Â¬Ã¥â€¦Â± API | 90%+ |
| Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â Â | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â Â | Ã¦Å½â€™Ã©â„¢Â¤ |

## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¨Â¯Â¥Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥â€ ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â®Å¾Ã§Å½Â°
* Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂnilÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¼Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¥Âºâ€Ã¨Â¯Â¥Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥Å“Â¨Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥â€°ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¥Â®Å¾Ã§Å½Â°
* Ã¨Â·Â³Ã¨Â¿â€¡ RED Ã©ËœÂ¶Ã¦Â®Âµ
* Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â§ÂÃ¦Å“â€°Ã¥â€¡Â½Ã¦â€¢Â°
* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `time.Sleep`
* Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/go-build` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
* `/go-review` - Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â Â
* `/verify` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/golang-testing/`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/tdd-workflow/`
