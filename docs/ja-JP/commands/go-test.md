---
description: GoÃ£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº(TDD)Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¨Â¨ËœÃ¨Â¿Â°Ã£Ââ€”Ã£â‚¬ÂÃ£ÂÂÃ£ÂÂ®Ã¥Â¾Å’Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šgo test -coverÃ£ÂÂ§80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
---

# Go TDD Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã£Ââ€œÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£ÂÂ¯Ã£â‚¬ÂGoÃ£ÂÂ®Ã£â€šÂ¤Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂªÃ£Æ’Â Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ¦â€°â€¹Ã¦Â³â€¢Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£Ââ€œÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£ÂÂ®Ã¦Â©Å¸Ã¨Æ’Â½

1. **Ã¥Å¾â€¹/Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¥Â®Å¡Ã§Â¾Â©**: Ã©â€“Â¢Ã¦â€¢Â°Ã£â€šÂ·Ã£â€šÂ°Ã£Æ’ÂÃ£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°
2. **Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†Â**: Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â(RED)
3. **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ§Ââ€ Ã§â€Â±Ã£ÂÂ§Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
4. **Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€˜Ã£â€šÂ¹Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¨Â¨ËœÃ¨Â¿Â°(GREEN)
5. **Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ°Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂªÃ£ÂÅ’Ã£â€šâ€°Ã¦â€Â¹Ã¥â€“â€ž
6. **Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã§Â¢ÂºÃ¨ÂªÂ**: 80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¤Â¿ÂÃ¨Â¨Â¼

## Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°

`/go-test` Ã£ÂÂ¯Ã¦Â¬Â¡Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:
- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žGoÃ©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦Ã¦â„¢â€š
- Ã¦â€”Â¢Ã¥Â­ËœÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ¸Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¨Â¿Â½Ã¥Å Â Ã¦â„¢â€š
- Ã£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£Ã¦â„¢â€š(Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¤Â½Å“Ã¦Ë†Â)
- Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã¦Â§â€¹Ã§Â¯â€°Ã¦â„¢â€š
- GoÃ£ÂÂ§Ã£ÂÂ®TDDÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ®Ã¥Â­Â¦Ã§Â¿â€™Ã¦â„¢â€š

## TDD Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂ¯Ã£Æ’Â«

```
RED     Ã¢â€ â€™ Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
GREEN   Ã¢â€ â€™ Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€˜Ã£â€šÂ¹Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦
REFACTOR Ã¢â€ â€™ Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€Â¹Ã¥â€“â€žÃ£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã£â€šÂ°Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã¤Â¿ÂÃ¦Å’Â
REPEAT  Ã¢â€ â€™ Ã¦Â¬Â¡Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ¸
```

## Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¤Â¾â€¹

```text
User: /go-test Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’â€°Ã£Æ’Â¬Ã£â€šÂ¹Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ§Ã£Ââ„¢

Agent:
# TDD Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³: Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’ÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 1: Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¥Â®Å¡Ã§Â¾Â©

```go
// validator/email.go
package validator

// ValidateEmail checks if the given string is a valid email address.
// Returns nil if valid, error describing the issue otherwise.
func ValidateEmail(email string) error {
    panic("not implemented")
}
```

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 2: Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†Â (RED)

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
        // Ã¦Å“â€°Ã¥Å Â¹Ã£ÂÂªÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’â€°Ã£Æ’Â¬Ã£â€šÂ¹
        {"simple email", "user@example.com", false},
        {"with subdomain", "user@mail.example.com", false},
        {"with plus", "user+tag@example.com", false},
        {"with dots", "first.last@example.com", false},

        // Ã§â€žÂ¡Ã¥Å Â¹Ã£ÂÂªÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’â€°Ã£Æ’Â¬Ã£â€šÂ¹
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

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 3: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’ - Ã¥Â¤Â±Ã¦â€¢â€”Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ

```bash
$ go test ./validator/...

--- FAIL: TestValidateEmail (0.00s)
    --- FAIL: TestValidateEmail/simple_email (0.00s)
        panic: not implemented

FAIL
```

Ã¢Å“â€œ Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¦Å“Å¸Ã¥Â¾â€¦Ã©â‚¬Å¡Ã£â€šÅ Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ€”Ã£ÂÅ¸(panic)Ã£â‚¬â€š

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 4: Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Â®Å¸Ã¨Â£â€¦ (GREEN)

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

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 5: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’ - Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ

```bash
$ go test ./validator/...

PASS
ok      project/validator    0.003s
```

Ã¢Å“â€œ Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã©â‚¬Å¡Ã£â€šÅ Ã£ÂÂ¾Ã£Ââ€”Ã£ÂÅ¸!

## Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€” 6: Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã§Â¢ÂºÃ¨ÂªÂ

```bash
$ go test -cover ./validator/...

PASS
coverage: 100.0% of statements
ok      project/validator    0.003s
```

Ã¢Å“â€œ Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸: 100%

## TDD Ã¥Â®Å’Ã¤Âºâ€ !
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
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

### Ã¤Â¸Â¦Ã¥Ë†â€”Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
```go
for _, tt := range tests {
    tt := tt // Capture
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // test body
    })
}
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼
```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db := createDB()
    t.Cleanup(func() { db.Close() })
    return db
}
```

## Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

```bash
# Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
go test -cover ./...

# Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
go test -coverprofile=coverage.out ./...

# Ã£Æ’â€“Ã£Æ’Â©Ã£â€šÂ¦Ã£â€šÂ¶Ã£ÂÂ§Ã¨Â¡Â¨Ã§Â¤Âº
go tool cover -html=coverage.out

# Ã©â€“Â¢Ã¦â€¢Â°Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
go tool cover -func=coverage.out

# Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã¦Â¤Å“Ã¥â€¡ÂºÃ¤Â»ËœÃ£ÂÂ
go test -race -cover ./...
```

## Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã§â€ºÂ®Ã¦Â¨â„¢

| Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” | Ã§â€ºÂ®Ã¦Â¨â„¢ |
|-----------|--------|
| Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯ | 100% |
| Ã£Æ’â€˜Ã£Æ’â€“Ã£Æ’ÂªÃ£Æ’Æ’Ã£â€šÂ¯API | 90%+ |
| Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€° | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€° | Ã©â„¢Â¤Ã¥Â¤â€“ |

## TDD Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

**Ã¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦:**
- Ã¥Â®Å¸Ã¨Â£â€¦Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¦â€ºÂ¸Ã£ÂÂ
- Ã¥Ââ€žÃ¥Â¤â€°Ã¦â€ºÂ´Ã¥Â¾Å’Ã£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
- Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¥Â®Å¸Ã¨Â£â€¦Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ¥â€¹â€¢Ã¤Â½Å“Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- Ã£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹(Ã§Â©ÂºÃ£â‚¬ÂnilÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¤)

**Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂÃ¤Âºâ€¹Ã©Â â€¦:**
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
- REDÃ£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂºÃ£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ„¢Ã£â€šâ€¹
- Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â„¢Ã£Æ’Â¼Ã£Æ’Ë†Ã©â€“Â¢Ã¦â€¢Â°Ã£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§`time.Sleep`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¤Â¸ÂÃ¥Â®â€°Ã¥Â®Å¡Ã£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€žÂ¡Ã¨Â¦â€“Ã£Ââ„¢Ã£â€šâ€¹

## Ã©â€“Â¢Ã©â‚¬Â£Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

- `/go-build` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã¤Â¿Â®Ã¦Â­Â£
- `/go-review` - Ã¥Â®Å¸Ã¨Â£â€¦Ã¥Â¾Å’Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
- `/verify` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ¦Â¤Å“Ã¨Â¨Â¼Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’

## Ã©â€“Â¢Ã©â‚¬Â£

- Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«: `skills/golang-testing/`
- Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«: `skills/tdd-workflow/`
