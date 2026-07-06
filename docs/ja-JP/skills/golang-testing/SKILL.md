---
name: golang-testing
description: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£ÂÂ¨GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã©Â«ËœÃ¥â€œÂÃ¨Â³ÂªÃ£â€šâ€™Ã¤Â¿ÂÃ¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥Ã£â‚¬â€š
---

# Go Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

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


Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº(TDD)Ã£ÂÂ¨GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã©Â«ËœÃ¥â€œÂÃ¨Â³ÂªÃ£â€šâ€™Ã¤Â¿ÂÃ¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žGoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£ÂÂ¨Ã£ÂÂ
- GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã¦â€”Â¢Ã¥Â­ËœÃ£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€Â¹Ã¥â€“â€žÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¥Ââ€˜Ã¤Â¸Å Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã£Æ’â€¡Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ°Ã£ÂÂ¨Ã£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£Ã¦â„¢â€š

## Ã¦Â Â¸Ã£ÂÂ¨Ã£ÂÂªÃ£â€šâ€¹Ã¥Å½Å¸Ã¥â€°â€¡

### 1. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº(TDD)Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£â‚¬ÂÃ¥Â®Å¸Ã¨Â£â€¦Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂ¯Ã£Æ’Â«Ã£ÂÂ«Ã¥Â¾â€œÃ£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```go
// 1. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†Ã¥Â¤Â±Ã¦â€¢â€”Ã¯Â¼â€°
func TestCalculateTotal(t *testing.T) {
    total := CalculateTotal([]float64{10.0, 20.0, 30.0})
    want := 60.0
    if total != want {
        t.Errorf("got %f, want %f", total, want)
    }
}

// 2. Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ„¢Ã£â€šâ€¹Ã¯Â¼Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬Å¡Ã£Ââ„¢Ã¯Â¼â€°
func CalculateTotal(prices []float64) float64 {
    var total float64
    for _, price := range prices {
        total += price
    }
    return total
}

// 3. Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
// Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â£Å Ã£Ââ€¢Ã£ÂÅ¡Ã£ÂÂ«Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€Â¹Ã¥â€“â€ž
```

### 2. Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½â€œÃ§Â³Â»Ã§Å¡â€žÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -2, -3, -5},
        {"mixed signs", -2, 3, 1},
        {"zeros", 0, 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

### 3. Ã£â€šÂµÃ£Æ’â€“Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

Ã£â€šÂµÃ£Æ’â€“Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã¨Â«â€“Ã§Ââ€ Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¦Â§â€¹Ã¦Ë†ÂÃ£â‚¬â€š

```go
func TestUser(t *testing.T) {
    t.Run("validation", func(t *testing.T) {
        t.Run("empty email", func(t *testing.T) {
            user := User{Email: ""}
            if err := user.Validate(); err == nil {
                t.Error("expected validation error")
            }
        })

        t.Run("valid email", func(t *testing.T) {
            user := User{Email: "test@example.com"}
            if err := user.Validate(); err != nil {
                t.Errorf("unexpected error: %v", err)
            }
        })
    })

    t.Run("serialization", func(t *testing.T) {
        // Ã¥Ë†Â¥Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”
    })
}
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â§â€¹Ã¦Ë†Â

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦Â§â€¹Ã¦Ë†Â

```text
mypackage/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ user.go
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ user_test.go          # Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ integration_test.go   # Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ testdata/             # Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ valid_user.json
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ invalid_user.json
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ export_test.go        # Ã¥â€ â€¦Ã©Æ’Â¨Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã§â€Â¨Ã£ÂÂ®Ã©ÂÅ¾Ã¥â€¦Â¬Ã©â€“â€¹Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸

```go
// user_test.go - Ã¥ÂÅ’Ã£ÂËœÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã¯Â¼Ë†Ã£Æ’â€ºÃ£Æ’Â¯Ã£â€šÂ¤Ã£Æ’Ë†Ã£Æ’Å“Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼â€°
package user

func TestInternalFunction(t *testing.T) {
    // Ã¥â€ â€¦Ã©Æ’Â¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹
}

// user_external_test.go - Ã¥Â¤â€“Ã©Æ’Â¨Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã¯Â¼Ë†Ã£Æ’â€“Ã£Æ’Â©Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’Å“Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼â€°
package user_test

import "myapp/user"

func TestPublicAPI(t *testing.T) {
    // Ã¥â€¦Â¬Ã©â€“â€¹APIÃ£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
}
```

## Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```go
func TestBasicAssertions(t *testing.T) {
    // Ã§Â­â€°Ã¤Â¾Â¡Ã¦â‚¬Â§
    got := Calculate()
    want := 42
    if got != want {
        t.Errorf("got %d, want %d", got, want)
    }

    // Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
    _, err := Process()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }

    // nil Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
    result := GetResult()
    if result == nil {
        t.Fatal("expected non-nil result")
    }
}
```

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼Ã©â€“Â¢Ã¦â€¢Â°

```go
// Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã¯Â¼Ë†Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ«Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂªÃ£Ââ€žÃ¯Â¼â€°
func assertEqual(t *testing.T, got, want interface{}) {
    t.Helper()
    if got != want {
        t.Errorf("got %v, want %v", got, want)
    }
}

func assertNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¾â€¹
func TestWithHelpers(t *testing.T) {
    result, err := Process()
    assertNoError(t, err)
    assertEqual(t, result.Status, "success")
}
```

### Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’â€”Ã§Â­â€°Ã¤Â¾Â¡Ã¦â‚¬Â§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

```go
import "reflect"

func assertDeepEqual(t *testing.T, got, want interface{}) {
    t.Helper()
    if !reflect.DeepEqual(got, want) {
        t.Errorf("got %+v, want %+v", got, want)
    }
}

func TestStructEquality(t *testing.T) {
    got := User{Name: "Alice", Age: 30}
    want := User{Name: "Alice", Age: 30}
    assertDeepEqual(t, got, want)
}
```

## Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ¨Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’â€“

### Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```go
// Ã¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°
type UserStore interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

type UserService struct {
    store UserStore
}

// Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°
type MockUserStore struct {
    users map[string]*User
    err   error
}

func (m *MockUserStore) GetUser(id string) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    return m.users[id], nil
}

func (m *MockUserStore) SaveUser(user *User) error {
    if m.err != nil {
        return m.err
    }
    m.users[user.ID] = user
    return nil
}

// Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
func TestUserService(t *testing.T) {
    mock := &MockUserStore{
        users: make(map[string]*User),
    }
    service := &UserService{store: mock}

    // Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†...
}
```

### Ã¦â„¢â€šÃ©â€“â€œÃ£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```go
// Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â‚¬Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€° - Ã¦â„¢â€šÃ©â€“â€œÃ£â€šâ€™Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹
type TimeProvider interface {
    Now() time.Time
}

type RealTime struct{}

func (RealTime) Now() time.Time {
    return time.Now()
}

type Service struct {
    time TimeProvider
}

// Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°
type MockTime struct {
    current time.Time
}

func (m MockTime) Now() time.Time {
    return m.current
}

func TestTimeDependent(t *testing.T) {
    mockTime := MockTime{
        current: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC),
    }
    service := &Service{time: mockTime}

    // Ã¥â€ºÂºÃ¥Â®Å¡Ã¦â„¢â€šÃ©â€“â€œÃ£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†...
}
```

### HTTP Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```go
type HTTPClient interface {
    Do(req *http.Request) (*http.Response, error)
}

type MockHTTPClient struct {
    response *http.Response
    err      error
}

func (m *MockHTTPClient) Do(req *http.Request) (*http.Response, error) {
    return m.response, m.err
}

func TestAPICall(t *testing.T) {
    mockClient := &MockHTTPClient{
        response: &http.Response{
            StatusCode: 200,
            Body:       io.NopCloser(strings.NewReader(`{"status":"ok"}`)),
        },
    }

    api := &APIClient{client: mockClient}
    // APIÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†...
}
```

## HTTPÃ£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### httptest Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

```go
func TestHandler(t *testing.T) {
    handler := http.HandlerFunc(MyHandler)

    req := httptest.NewRequest("GET", "/users/123", nil)
    rec := httptest.NewRecorder()

    handler.ServeHTTP(rec, req)

    // Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
    if rec.Code != http.StatusOK {
        t.Errorf("got status %d, want %d", rec.Code, http.StatusOK)
    }

    // Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£Æ’Å“Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
    var response map[string]interface{}
    if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
        t.Fatalf("failed to decode response: %v", err)
    }

    if response["id"] != "123" {
        t.Errorf("got id %v, want 123", response["id"])
    }
}
```

### Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```go
func TestAuthMiddleware(t *testing.T) {
    // Ã£Æ’â‚¬Ã£Æ’Å¸Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼
    nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

    // Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£ÂÂ§Ã£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€”
    handler := AuthMiddleware(nextHandler)

    tests := []struct {
        name       string
        token      string
        wantStatus int
    }{
        {"valid token", "valid-token", http.StatusOK},
        {"invalid token", "invalid", http.StatusUnauthorized},
        {"no token", "", http.StatusUnauthorized},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest("GET", "/", nil)
            if tt.token != "" {
                req.Header.Set("Authorization", "Bearer "+tt.token)
            }
            rec := httptest.NewRecorder()

            handler.ServeHTTP(rec, req)

            if rec.Code != tt.wantStatus {
                t.Errorf("got status %d, want %d", rec.Code, tt.wantStatus)
            }
        })
    }
}
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼

```go
func TestAPIIntegration(t *testing.T) {
    // Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{
            "message": "hello",
        })
    }))
    defer server.Close()

    // Ã¥Â®Å¸Ã©Å¡â€ºÃ£ÂÂ®HTTPÃ£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¡Å’Ã£Ââ€ 
    resp, err := http.Get(server.URL)
    if err != nil {
        t.Fatalf("request failed: %v", err)
    }
    defer resp.Body.Close()

    // Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
    var result map[string]string
    json.NewDecoder(resp.Body).Decode(&result)

    if result["message"] != "hello" {
        t.Errorf("got %s, want hello", result["message"])
    }
}
```

## Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢

```go
func TestUserRepository(t *testing.T) {
    db := setupTestDB(t)
    defer db.Close()

    tests := []struct {
        name string
        fn   func(*testing.T, *sql.DB)
    }{
        {"create user", testCreateUser},
        {"find user", testFindUser},
        {"update user", testUpdateUser},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            tx, err := db.Begin()
            if err != nil {
                t.Fatal(err)
            }
            defer tx.Rollback() // Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥Â¾Å’Ã£ÂÂ«Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯

            tt.fn(t, tx)
        })
    }
}
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()

    db, err := sql.Open("postgres", "postgres://localhost/test")
    if err != nil {
        t.Fatalf("failed to connect: %v", err)
    }

    // Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â¼Ã£Æ’Å¾Ã£â€šâ€™Ã§Â§Â»Ã¨Â¡Å’
    if err := runMigrations(db); err != nil {
        t.Fatalf("migrations failed: %v", err)
    }

    return db
}

func seedTestData(t *testing.T, db *sql.DB) {
    t.Helper()

    fixtures := []string{
        `INSERT INTO users (id, email) VALUES ('1', 'test@example.com')`,
        `INSERT INTO posts (id, user_id, title) VALUES ('1', '1', 'Test Post')`,
    }

    for _, query := range fixtures {
        if _, err := db.Exec(query); err != nil {
            t.Fatalf("failed to seed data: %v", err)
        }
    }
}
```

## Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯

```go
func BenchmarkCalculation(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Calculate(100)
    }
}

// Ã£Æ’Â¡Ã£Æ’Â¢Ã£Æ’ÂªÃ¥â€°Â²Ã£â€šÅ Ã¥Â½â€œÃ£ÂÂ¦Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 
func BenchmarkWithAllocs(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        ProcessData([]byte("test data"))
    }
}
```

### Ã£â€šÂµÃ£Æ’â€“Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯

```go
func BenchmarkEncoding(b *testing.B) {
    data := generateTestData()

    b.Run("json", func(b *testing.B) {
        b.ReportAllocs()
        for i := 0; i < b.N; i++ {
            json.Marshal(data)
        }
    })

    b.Run("gob", func(b *testing.B) {
        b.ReportAllocs()
        var buf bytes.Buffer
        enc := gob.NewEncoder(&buf)
        b.ResetTimer()
        for i := 0; i < b.N; i++ {
            enc.Encode(data)
            buf.Reset()
        }
    })
}
```

### Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã¦Â¯â€Ã¨Â¼Æ’

```go
// Ã¥Â®Å¸Ã¨Â¡Å’: go test -bench=. -benchmem
func BenchmarkStringConcat(b *testing.B) {
    b.Run("operator", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = "hello" + " " + "world"
        }
    })

    b.Run("fmt.Sprintf", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = fmt.Sprintf("%s %s", "hello", "world")
        }
    })

    b.Run("strings.Builder", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var sb strings.Builder
            sb.WriteString("hello")
            sb.WriteString(" ")
            sb.WriteString("world")
            _ = sb.String()
        }
    })
}
```

## Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¸Ã£Æ’Â³Ã£â€šÂ°Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂºÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†Go 1.18+Ã¯Â¼â€°

```go
func FuzzParseInput(f *testing.F) {
    // Ã£â€šÂ·Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¹
    f.Add("hello")
    f.Add("world")
    f.Add("123")

    f.Fuzz(func(t *testing.T, input string) {
        // Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÅ’Ã£Æ’â€˜Ã£Æ’â€¹Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
        result, err := ParseInput(input)

        // Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’Ã£Ââ€šÃ£ÂÂ£Ã£ÂÂ¦Ã£â€šâ€šÃ£â‚¬ÂnilÃ£ÂÂ§Ã£ÂÂªÃ£Ââ€žÃ£Ââ€¹Ã¤Â¸â‚¬Ã¨Â²Â«Ã¦â‚¬Â§Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
        if err == nil && result == nil {
            t.Error("got nil result with no error")
        }
    })
}
```

### Ã£â€šË†Ã£â€šÅ Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¸Ã£Æ’Â³Ã£â€šÂ°

```go
func FuzzJSONParsing(f *testing.F) {
    f.Add([]byte(`{"name":"test","age":30}`))
    f.Add([]byte(`{"name":"","age":0}`))

    f.Fuzz(func(t *testing.T, data []byte) {
        var user User
        err := json.Unmarshal(data, &user)

        // JSONÃ£ÂÅ’Ã£Æ’â€¡Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ¥â€ ÂÃ¥ÂºÂ¦Ã£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂ
        if err == nil {
            _, err := json.Marshal(user)
            if err != nil {
                t.Errorf("marshal failed after successful unmarshal: %v", err)
            }
        }
    })
}
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸

### Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’Ã£ÂÂ¨Ã¨Â¡Â¨Ã§Â¤Âº

```bash
# Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦HTMLÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
go test -cover ./...

# Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂªÃ£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
go test -coverprofile=coverage.out -covermode=atomic ./...
```

### Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

```go
// Good: Ã£Æ’â€ Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°
func ProcessData(data []byte) (Result, error) {
    if len(data) == 0 {
        return Result{}, ErrEmptyData
    }

    // Ã¥Ââ€žÃ¥Ë†â€ Ã¥Â²ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥ÂÂ¯Ã¨Æ’Â½
    if isValid(data) {
        return parseValid(data)
    }
    return parseInvalid(data)
}

// Ã¥Â¯Â¾Ã¥Â¿Å“Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥â€¦Â¨Ã¥Ë†â€ Ã¥Â²ÂÃ£â€šâ€™Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¼
func TestProcessData(t *testing.T) {
    tests := []struct {
        name    string
        data    []byte
        wantErr bool
    }{
        {"empty data", []byte{}, true},
        {"valid data", []byte("valid"), false},
        {"invalid data", []byte("invalid"), false},
    }
    // ...
}
```

## Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¿Ã£â€šÂ°Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

```go
//go:build integration
// +build integration

package myapp_test

import "testing"

func TestDatabaseIntegration(t *testing.T) {
    // Ã¥Â®Å¸Ã©Å¡â€ºÃ£ÂÂ®DBÃ£â€šâ€™Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
}
```

```bash
# Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
go test -tags=integration ./...

# Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â„¢Â¤Ã¥Â¤â€“
go test ./...
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Å Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

```go
import "github.com/testcontainers/testcontainers-go"

func setupPostgres(t *testing.T) *sql.DB {
    ctx := context.Background()

    req := testcontainers.ContainerRequest{
        Image:        "postgres:15",
        ExposedPorts: []string{"5432/tcp"},
        Env: map[string]string{
            "POSTGRES_PASSWORD": "test",
            "POSTGRES_DB":       "testdb",
        },
    }

    container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: req,
        Started:          true,
    })
    if err != nil {
        t.Fatal(err)
    }

    t.Cleanup(func() {
        container.Terminate(ctx)
    })

    // Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Å Ã£ÂÂ«Ã¦Å½Â¥Ã§Â¶Å¡
    // ...
    return db
}
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Å’â€“

### Ã¤Â¸Â¦Ã¥Ë†â€”Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```go
func TestParallel(t *testing.T) {
    tests := []struct {
        name string
        fn   func(*testing.T)
    }{
        {"test1", testCase1},
        {"test2", testCase2},
        {"test3", testCase3},
    }

    for _, tt := range tests {
        tt := tt // Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’â€”Ã£Æ’ÂÃ£Æ’Â£
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel() // Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’
            tt.fn(t)
        })
    }
}
```

### Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’Ã£ÂÂ®Ã¥Ë†Â¶Ã¥Â¾Â¡

```go
func TestWithResourceLimit(t *testing.T) {
    // Ã¥ÂÅ’Ã¦â„¢â€šÃ£ÂÂ«5Ã£ÂÂ¤Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÂ¿
    sem := make(chan struct{}, 5)

    tests := generateManyTests()

    for _, tt := range tests {
        tt := tt
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()

            sem <- struct{}{}        // Ã§ÂÂ²Ã¥Â¾â€”
            defer func() { <-sem }() // Ã¨Â§Â£Ã¦â€Â¾

            tt.fn(t)
        })
    }
}
```

## GoÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã§ÂµÂ±Ã¥ÂË†

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

```bash
# Ã¥Å¸ÂºÃ¦Å“Â¬Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
go test ./...
go test -v ./...                    # Ã¨Â©Â³Ã§Â´Â°Ã¥â€¡ÂºÃ¥Å â€º
go test -run TestSpecific ./...     # Ã§â€°Â¹Ã¥Â®Å¡Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’

# Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
go test -cover ./...
go test -coverprofile=coverage.out ./...

# Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³
go test -race ./...

# Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯
go test -bench=. ./...
go test -bench=. -benchmem ./...
go test -bench=. -cpuprofile=cpu.prof ./...

# Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¸Ã£Æ’Â³Ã£â€šÂ°
go test -fuzz=FuzzTest

# Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
go test -tags=integration ./...

# JSONÃ£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã¯Â¼Ë†CIÃ§ÂµÂ±Ã¥ÂË†Ã§â€Â¨Ã¯Â¼â€°
go test -json ./...
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡

```bash
# Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†
go test -timeout 30s ./...

# Ã§Å¸Â­Ã¦â„¢â€šÃ©â€“â€œÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†Ã©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Æ’Ã£Æ’â€”Ã¯Â¼â€°
go test -short ./...

# Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£ÂÂ®Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¢
go clean -testcache
go test ./...
```

## Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### DRYÃ¯Â¼Ë†Don't Repeat YourselfÃ¯Â¼â€°Ã¥Å½Å¸Ã¥â€°â€¡

```go
// Good: Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã©Â§â€ Ã¥â€¹â€¢Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã§Â¹Â°Ã£â€šÅ Ã¨Â¿â€Ã£Ââ€”Ã£â€šâ€™Ã¥â€°Å Ã¦Â¸â€º
func TestValidation(t *testing.T) {
    tests := []struct {
        input string
        valid bool
    }{
        {"valid@email.com", true},
        {"invalid-email", false},
        {"", false},
    }

    for _, tt := range tests {
        t.Run(tt.input, func(t *testing.T) {
            err := Validate(tt.input)
            if (err == nil) != tt.valid {
                t.Errorf("Validate(%q) error = %v, want valid = %v",
                    tt.input, err, tt.valid)
            }
        })
    }
}
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢

```go
// Good: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™ testdata/ Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£ÂÂ«Ã©â€¦ÂÃ§Â½Â®
func TestLoadConfig(t *testing.T) {
    data, err := os.ReadFile("testdata/config.json")
    if err != nil {
        t.Fatal(err)
    }

    config, err := ParseConfig(data)
    // ...
}
```

### Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

```go
func TestWithCleanup(t *testing.T) {
    // Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
    file, err := os.CreateTemp("", "test")
    if err != nil {
        t.Fatal(err)
    }

    // Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã§â„¢Â»Ã©Å’Â²Ã¯Â¼Ë†deferÃ£ÂÂ«Ã¤Â¼Â¼Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£ÂÅ’Ã£â‚¬ÂÃ£â€šÂµÃ£Æ’â€“Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã¥â€¹â€¢Ã¤Â½Å“Ã¯Â¼â€°
    t.Cleanup(func() {
        os.Remove(file.Name())
    })

    // Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§Â¶Å¡Ã£Ââ€˜Ã£â€šâ€¹...
}
```

### Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸Ã£ÂÂ®Ã¦ËœÅ½Ã§Â¢ÂºÃ¥Å’â€“

```go
// Bad: Ã¤Â¸ÂÃ¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂªÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
if result != expected {
    t.Error("wrong result")
}

// Good: Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã¤Â»ËœÃ£ÂÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
if result != expected {
    t.Errorf("Calculate(%d) = %d; want %d", input, result, expected)
}

// Better: Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨
assertEqual(t, result, expected, "Calculate(%d)", input)
```

## Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂÃ£â€šÂ¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```go
// Bad: Ã¥Â¤â€“Ã©Æ’Â¨Ã§Å Â¶Ã¦â€¦â€¹Ã£ÂÂ«Ã¤Â¾ÂÃ¥Â­Ëœ
func TestBadDependency(t *testing.T) {
    result := GetUserFromDatabase("123") // Ã¥Â®Å¸Ã©Å¡â€ºÃ£ÂÂ®DBÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
    // Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â£Å Ã£â€šÅ’Ã£â€šâ€žÃ£Ââ„¢Ã£ÂÂÃ©Ââ€¦Ã£Ââ€ž
}

// Good: Ã¤Â¾ÂÃ¥Â­ËœÃ£â€šâ€™Ã¦Â³Â¨Ã¥â€¦Â¥
func TestGoodDependency(t *testing.T) {
    mockDB := &MockDatabase{
        users: map[string]User{"123": {ID: "123"}},
    }
    result := GetUser(mockDB, "123")
}

// Bad: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©â€“â€œÃ£ÂÂ§Ã§Å Â¶Ã¦â€¦â€¹Ã£â€šâ€™Ã¥â€¦Â±Ã¦Å“â€°
var sharedCounter int

func TestShared1(t *testing.T) {
    sharedCounter++
    // Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã©Â â€ Ã¥ÂºÂÃ£ÂÂ«Ã¤Â¾ÂÃ¥Â­Ëœ
}

// Good: Ã¥Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€¹Â¬Ã§Â«â€¹Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹
func TestIndependent(t *testing.T) {
    counter := 0
    counter++
    // Ã¤Â»â€“Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â½Â±Ã©Å¸Â¿Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
}

// Bad: Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã§â€žÂ¡Ã¨Â¦â€“
func TestIgnoreError(t *testing.T) {
    result, _ := Process()
    if result != expected {
        t.Error("wrong result")
    }
}

// Good: Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
func TestCheckError(t *testing.T) {
    result, err := Process()
    if err != nil {
        t.Fatalf("Process() error = %v", err)
    }
    if result != expected {
        t.Errorf("got %v, want %v", result, expected)
    }
}
```

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

| Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°/Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã§â€ºÂ®Ã§Å¡â€ž |
|--------------|---------|
| `go test ./...` | Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ |
| `go test -v` | Ã¨Â©Â³Ã§Â´Â°Ã¥â€¡ÂºÃ¥Å â€º |
| `go test -cover` | Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë† |
| `go test -race` | Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¦Â¤Å“Ã¥â€¡Âº |
| `go test -bench=.` | Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ |
| `t.Run()` | Ã£â€šÂµÃ£Æ’â€“Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† |
| `t.Helper()` | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼Ã©â€“Â¢Ã¦â€¢Â° |
| `t.Parallel()` | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’ |
| `t.Cleanup()` | Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã§â„¢Â»Ã©Å’Â² |
| `testdata/` | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã§â€Â¨Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Âª |
| `-short` | Ã©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Æ’Ã£Æ’â€” |
| `-tags=integration` | Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¿Ã£â€šÂ°Ã£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ |

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã¨â€°Â¯Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã©Â«ËœÃ©â‚¬Å¸Ã£ÂÂ§Ã£â‚¬ÂÃ¤Â¿Â¡Ã©Â Â¼Ã¦â‚¬Â§Ã£ÂÅ’Ã£Ââ€šÃ£â€šÅ Ã£â‚¬ÂÃ¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ§Ã£â‚¬ÂÃ¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¨Â¤â€¡Ã©â€ºâ€˜Ã£Ââ€¢Ã£â€šË†Ã£â€šÅ Ã¦ËœÅ½Ã§Â¢ÂºÃ£Ââ€¢Ã£â€šâ€™Ã§â€ºÂ®Ã¦Å’â€¡Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
