---
name: golang-testing
description: Go testing patterns including table-driven tests, subtests, benchmarks, fuzzing, and test coverage. Follows TDD methodology with idiomatic Go practices.
---

# Go Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã§â€Â¨Ã¦â€“Â¼Ã¦â€™Â°Ã¥Â¯Â«Ã¥ÂÂ¯Ã©ÂÂ Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â¶Â­Ã¨Â­Â·Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´ Go Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã©ÂÂµÃ¥Â¾Âª TDD Ã¦â€“Â¹Ã¦Â³â€¢Ã¨Â«â€“Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¥â€¢Å¸Ã§â€Â¨

- Ã¦â€™Â°Ã¥Â¯Â«Ã¦â€“Â°Ã§Å¡â€ž Go Ã¥â€¡Â½Ã¥Â¼ÂÃ¦Ë†â€“Ã¦â€“Â¹Ã¦Â³â€¢
- Ã§â€šÂºÃ§ÂÂ¾Ã¦Å“â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¢Å¾Ã¥Å Â Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
- Ã§â€šÂºÃ¦â€¢Ë†Ã¨Æ’Â½Ã©â€”Å“Ã©ÂÂµÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â»ÂºÃ§Â«â€¹Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¥Â¯Â¦Ã¤Â½Å“Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°Ã§Å¡â€žÃ¦Â¨Â¡Ã§Â³Å Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¥Å“Â¨ Go Ã¥Â°Ë†Ã¦Â¡Ë†Ã¤Â¸Â­Ã©ÂÂµÃ¥Â¾Âª TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

## Go Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

### RED-GREEN-REFACTOR Ã¥Â¾ÂªÃ§â€™Â°

```
RED     Ã¢â€ â€™ Ã¥â€¦Ë†Ã¥Â¯Â«Ã¥Â¤Â±Ã¦â€¢â€”Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
GREEN   Ã¢â€ â€™ Ã¦â€™Â°Ã¥Â¯Â«Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â½Â¿Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½
REFACTOR Ã¢â€ â€™ Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã§Â¶Â Ã¨â€°Â²Ã§Å¡â€žÃ¥ÂÅ’Ã¦â„¢â€šÃ¦â€Â¹Ã¥â€“â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
REPEAT  Ã¢â€ â€™ Ã§Â¹Â¼Ã§ÂºÅ’Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã©Å“â‚¬Ã¦Â±â€š
```

### Go Ã¤Â¸Â­Ã§Å¡â€žÃ©â‚¬ÂÃ¦Â­Â¥ TDD

```go
// Ã¦Â­Â¥Ã©Â©Å¸ 1Ã¯Â¼Å¡Ã¥Â®Å¡Ã§Â¾Â©Ã¤Â»â€¹Ã©ÂÂ¢/Ã§Â°Â½Ã§Â«Â 
// calculator.go
package calculator

func Add(a, b int) int {
    panic("not implemented") // Ã¤Â½â€Ã¤Â½ÂÃ§Â¬Â¦
}

// Ã¦Â­Â¥Ã©Â©Å¸ 2Ã¯Â¼Å¡Ã¦â€™Â°Ã¥Â¯Â«Ã¥Â¤Â±Ã¦â€¢â€”Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†REDÃ¯Â¼â€°
// calculator_test.go
package calculator

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}

// Ã¦Â­Â¥Ã©Â©Å¸ 3Ã¯Â¼Å¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã©Â©â€”Ã¨Â­â€°Ã¥Â¤Â±Ã¦â€¢â€”
// $ go test
// --- FAIL: TestAdd (0.00s)
// panic: not implemented

// Ã¦Â­Â¥Ã©Â©Å¸ 4Ã¯Â¼Å¡Ã¥Â¯Â¦Ã¤Â½Å“Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Ë†GREENÃ¯Â¼â€°
func Add(a, b int) int {
    return a + b
}

// Ã¦Â­Â¥Ã©Â©Å¸ 5Ã¯Â¼Å¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã©Â©â€”Ã¨Â­â€°Ã©â‚¬Å¡Ã©ÂÅ½
// $ go test
// PASS

// Ã¦Â­Â¥Ã©Â©Å¸ 6Ã¯Â¼Å¡Ã¥Â¦â€šÃ©Å“â‚¬Ã¨Â¦ÂÃ¥â€°â€¡Ã©â€¡ÂÃ¦Â§â€¹Ã¯Â¼Å’Ã©Â©â€”Ã¨Â­â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â»ÂÃ§â€žÂ¶Ã©â‚¬Å¡Ã©ÂÅ½
```

## Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦

Go Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ¦Â¨â„¢Ã¦Âºâ€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€šÃ¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©Ââ€Ã¥Ë†Â°Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â¦â€ Ã¨â€œâ€¹Ã£â‚¬â€š

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -1, -2, -3},
        {"zero values", 0, 0, 0},
        {"mixed signs", -1, 1, 0},
        {"large numbers", 1000000, 2000000, 3000000},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, got, tt.expected)
            }
        })
    }
}
```

### Ã¥Â¸Â¶Ã©Å’Â¯Ã¨ÂªÂ¤Ã¦Â¡Ë†Ã¤Â¾â€¹Ã§Å¡â€žÃ¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func TestParseConfig(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    *Config
        wantErr bool
    }{
        {
            name:  "valid config",
            input: `{"host": "localhost", "port": 8080}`,
            want:  &Config{Host: "localhost", Port: 8080},
        },
        {
            name:    "invalid JSON",
            input:   `{invalid}`,
            wantErr: true,
        },
        {
            name:    "empty input",
            input:   "",
            wantErr: true,
        },
        {
            name:  "minimal config",
            input: `{}`,
            want:  &Config{}, // Ã©â€ºÂ¶Ã¥â‚¬Â¼ config
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseConfig(tt.input)

            if tt.wantErr {
                if err == nil {
                    t.Error("expected error, got nil")
                }
                return
            }

            if err != nil {
                t.Fatalf("unexpected error: %v", err)
            }

            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("got %+v; want %+v", got, tt.want)
            }
        })
    }
}
```

## Ã¥Â­ÂÃ¦Â¸Â¬Ã¨Â©Â¦

### Ã§Âµâ€žÃ§Â¹â€Ã§â€ºÂ¸Ã©â€”Å“Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func TestUser(t *testing.T) {
    // Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â­ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ¨Â¨Â­Ã§Â½Â®
    db := setupTestDB(t)

    t.Run("Create", func(t *testing.T) {
        user := &User{Name: "Alice"}
        err := db.CreateUser(user)
        if err != nil {
            t.Fatalf("CreateUser failed: %v", err)
        }
        if user.ID == "" {
            t.Error("expected user ID to be set")
        }
    })

    t.Run("Get", func(t *testing.T) {
        user, err := db.GetUser("alice-id")
        if err != nil {
            t.Fatalf("GetUser failed: %v", err)
        }
        if user.Name != "Alice" {
            t.Errorf("got name %q; want %q", user.Name, "Alice")
        }
    })

    t.Run("Update", func(t *testing.T) {
        // ...
    })

    t.Run("Delete", func(t *testing.T) {
        // ...
    })
}
```

### Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Â­ÂÃ¦Â¸Â¬Ã¨Â©Â¦

```go
func TestParallel(t *testing.T) {
    tests := []struct {
        name  string
        input string
    }{
        {"case1", "input1"},
        {"case2", "input2"},
        {"case3", "input3"},
    }

    for _, tt := range tests {
        tt := tt // Ã¦Ââ€¢Ã§ÂÂ²Ã§Â¯â€žÃ¥Å“ÂÃ¨Â®Å Ã¦â€¢Â¸
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel() // Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â­ÂÃ¦Â¸Â¬Ã¨Â©Â¦
            result := Process(tt.input)
            // Ã¦â€“Â·Ã¨Â¨â‚¬...
            _ = result
        })
    }
}
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼Â

### Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼Â

```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper() // Ã¦Â¨â„¢Ã¨Â¨ËœÃ§â€šÂºÃ¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼Â

    db, err := sql.Open("sqlite3", ":memory:")
    if err != nil {
        t.Fatalf("failed to open database: %v", err)
    }

    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ¦Â¸â€¦Ã§Ââ€ 
    t.Cleanup(func() {
        db.Close()
    })

    // Ã¥Å¸Â·Ã¨Â¡Å’ migrations
    if _, err := db.Exec(schema); err != nil {
        t.Fatalf("failed to create schema: %v", err)
    }

    return db
}

func assertNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
}

func assertEqual[T comparable](t *testing.T, got, want T) {
    t.Helper()
    if got != want {
        t.Errorf("got %v; want %v", got, want)
    }
}
```

### Ã¨â€¡Â¨Ã¦â„¢â€šÃ¦Âªâ€Ã¦Â¡Ë†Ã¥â€™Å’Ã§â€ºÂ®Ã©Å’â€ž

```go
func TestFileProcessing(t *testing.T) {
    // Ã¥Â»ÂºÃ§Â«â€¹Ã¨â€¡Â¨Ã¦â„¢â€šÃ§â€ºÂ®Ã©Å’â€ž - Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â¸â€¦Ã§Ââ€ 
    tmpDir := t.TempDir()

    // Ã¥Â»ÂºÃ§Â«â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†
    testFile := filepath.Join(tmpDir, "test.txt")
    err := os.WriteFile(testFile, []byte("test content"), 0644)
    if err != nil {
        t.Fatalf("failed to create test file: %v", err)
    }

    // Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
    result, err := ProcessFile(testFile)
    if err != nil {
        t.Fatalf("ProcessFile failed: %v", err)
    }

    // Ã¦â€“Â·Ã¨Â¨â‚¬...
    _ = result
}
```

## Golden Ã¦Âªâ€Ã¦Â¡Ë†

Ã¤Â½Â¿Ã§â€Â¨Ã¥â€žÂ²Ã¥Â­ËœÃ¥Å“Â¨ `testdata/` Ã¤Â¸Â­Ã§Å¡â€žÃ©Â ÂÃ¦Å“Å¸Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¦Âªâ€Ã¦Â¡Ë†Ã©â‚¬Â²Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦Ã£â‚¬â€š

```go
var update = flag.Bool("update", false, "update golden files")

func TestRender(t *testing.T) {
    tests := []struct {
        name  string
        input Template
    }{
        {"simple", Template{Name: "test"}},
        {"complex", Template{Name: "test", Items: []string{"a", "b"}}},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Render(tt.input)

            golden := filepath.Join("testdata", tt.name+".golden")

            if *update {
                // Ã¦â€ºÂ´Ã¦â€“Â° golden Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡go test -update
                err := os.WriteFile(golden, got, 0644)
                if err != nil {
                    t.Fatalf("failed to update golden file: %v", err)
                }
            }

            want, err := os.ReadFile(golden)
            if err != nil {
                t.Fatalf("failed to read golden file: %v", err)
            }

            if !bytes.Equal(got, want) {
                t.Errorf("output mismatch:\ngot:\n%s\nwant:\n%s", got, want)
            }
        })
    }
}
```

## Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»â€¹Ã©ÂÂ¢ Mock

### Ã¥Å¸ÂºÃ¦â€“Â¼Ã¤Â»â€¹Ã©ÂÂ¢Ã§Å¡â€ž Mock

```go
// Ã¥Â®Å¡Ã§Â¾Â©Ã¤Â¾ÂÃ¨Â³Â´Ã§Å¡â€žÃ¤Â»â€¹Ã©ÂÂ¢
type UserRepository interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

// Ã§â€Å¸Ã§â€Â¢Ã¥Â¯Â¦Ã¤Â½Å“
type PostgresUserRepository struct {
    db *sql.DB
}

func (r *PostgresUserRepository) GetUser(id string) (*User, error) {
    // Ã¥Â¯Â¦Ã©Å¡â€ºÃ¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦Å¸Â¥Ã¨Â©Â¢
}

// Ã¦Â¸Â¬Ã¨Â©Â¦Ã§â€Â¨ Mock Ã¥Â¯Â¦Ã¤Â½Å“
type MockUserRepository struct {
    GetUserFunc  func(id string) (*User, error)
    SaveUserFunc func(user *User) error
}

func (m *MockUserRepository) GetUser(id string) (*User, error) {
    return m.GetUserFunc(id)
}

func (m *MockUserRepository) SaveUser(user *User) error {
    return m.SaveUserFunc(user)
}

// Ã¤Â½Â¿Ã§â€Â¨ mock Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
func TestUserService(t *testing.T) {
    mock := &MockUserRepository{
        GetUserFunc: func(id string) (*User, error) {
            if id == "123" {
                return &User{ID: "123", Name: "Alice"}, nil
            }
            return nil, ErrNotFound
        },
    }

    service := NewUserService(mock)

    user, err := service.GetUserProfile("123")
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    if user.Name != "Alice" {
        t.Errorf("got name %q; want %q", user.Name, "Alice")
    }
}
```

## Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func BenchmarkProcess(b *testing.B) {
    data := generateTestData(1000)
    b.ResetTimer() // Ã¤Â¸ÂÃ¨Â¨Ë†Ã§Â®â€”Ã¨Â¨Â­Ã§Â½Â®Ã¦â„¢â€šÃ©â€“â€œ

    for i := 0; i < b.N; i++ {
        Process(data)
    }
}

// Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡go test -bench=BenchmarkProcess -benchmem
// Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¯Â¼Å¡BenchmarkProcess-8   10000   105234 ns/op   4096 B/op   10 allocs/op
```

### Ã¤Â¸ÂÃ¥ÂÅ’Ã¥Â¤Â§Ã¥Â°ÂÃ§Å¡â€žÃ¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func BenchmarkSort(b *testing.B) {
    sizes := []int{100, 1000, 10000, 100000}

    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            data := generateRandomSlice(size)
            b.ResetTimer()

            for i := 0; i < b.N; i++ {
                // Ã¨Â¤â€¡Ã¨Â£Â½Ã¤Â»Â¥Ã©ÂÂ¿Ã¥â€¦ÂÃ¦Å½â€™Ã¥ÂºÂÃ¥Â·Â²Ã¦Å½â€™Ã¥ÂºÂÃ§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢
                tmp := make([]int, len(data))
                copy(tmp, data)
                sort.Ints(tmp)
            }
        })
    }
}
```

### Ã¨Â¨ËœÃ¦â€ Â¶Ã©Â«â€Ã¥Ë†â€ Ã©â€¦ÂÃ¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func BenchmarkStringConcat(b *testing.B) {
    parts := []string{"hello", "world", "foo", "bar", "baz"}

    b.Run("plus", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var s string
            for _, p := range parts {
                s += p
            }
            _ = s
        }
    })

    b.Run("builder", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var sb strings.Builder
            for _, p := range parts {
                sb.WriteString(p)
            }
            _ = sb.String()
        }
    })

    b.Run("join", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = strings.Join(parts, "")
        }
    })
}
```

## Ã¦Â¨Â¡Ã§Â³Å Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Go 1.18+Ã¯Â¼â€°

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã¦Â¨Â¡Ã§Â³Å Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func FuzzParseJSON(f *testing.F) {
    // Ã¦â€“Â°Ã¥Â¢Å¾Ã§Â¨Â®Ã¥Â­ÂÃ¨ÂªÅ¾Ã¦â€“â„¢Ã¥ÂºÂ«
    f.Add(`{"name": "test"}`)
    f.Add(`{"count": 123}`)
    f.Add(`[]`)
    f.Add(`""`)

    f.Fuzz(func(t *testing.T, input string) {
        var result map[string]interface{}
        err := json.Unmarshal([]byte(input), &result)

        if err != nil {
            // Ã©Å¡Â¨Ã¦Â©Å¸Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â ÂÃ¦Å“Å¸Ã¦Å“Æ’Ã¦Å“â€°Ã§â€žÂ¡Ã¦â€¢Ë† JSON
            return
        }

        // Ã¥Â¦â€šÃ¦Å¾Å“Ã¨Â§Â£Ã¦Å¾ÂÃ¦Ë†ÂÃ¥Å Å¸Ã¯Â¼Å’Ã©â€¡ÂÃ¦â€“Â°Ã§Â·Â¨Ã§Â¢Â¼Ã¦â€¡â€°Ã¨Â©Â²Ã¥ÂÂ¯Ã¨Â¡Å’
        _, err = json.Marshal(result)
        if err != nil {
            t.Errorf("Marshal failed after successful Unmarshal: %v", err)
        }
    })
}

// Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡go test -fuzz=FuzzParseJSON -fuzztime=30s
```

### Ã¥Â¤Å¡Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¦Â¨Â¡Ã§Â³Å Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func FuzzCompare(f *testing.F) {
    f.Add("hello", "world")
    f.Add("", "")
    f.Add("abc", "abc")

    f.Fuzz(func(t *testing.T, a, b string) {
        result := Compare(a, b)

        // Ã¥Â±Â¬Ã¦â‚¬Â§Ã¯Â¼Å¡Compare(a, a) Ã¦â€¡â€°Ã¨Â©Â²Ã§Â¸Â½Ã¦ËœÂ¯Ã§Â­â€°Ã¦â€“Â¼ 0
        if a == b && result != 0 {
            t.Errorf("Compare(%q, %q) = %d; want 0", a, b, result)
        }

        // Ã¥Â±Â¬Ã¦â‚¬Â§Ã¯Â¼Å¡Compare(a, b) Ã¥â€™Å’ Compare(b, a) Ã¦â€¡â€°Ã¨Â©Â²Ã¦Å“â€°Ã§â€ºÂ¸Ã¥ÂÂÃ§Â¬Â¦Ã¨â„¢Å¸
        reverse := Compare(b, a)
        if (result > 0 && reverse >= 0) || (result < 0 && reverse <= 0) {
            if result != 0 || reverse != 0 {
                t.Errorf("Compare(%q, %q) = %d, Compare(%q, %q) = %d; inconsistent",
                    a, b, result, b, a, reverse)
            }
        }
    })
}
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

### Ã¥Å¸Â·Ã¨Â¡Å’Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

```bash
# Ã¥Å¸ÂºÃ¦Å“Â¬Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go test -cover ./...

# Ã§â€Â¢Ã§â€Å¸Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡ profile
go test -coverprofile=coverage.out ./...

# Ã¥Å“Â¨Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¦Å¸Â¥Ã§Å“â€¹Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go tool cover -html=coverage.out

# Ã¦Å’â€°Ã¥â€¡Â½Ã¥Â¼ÂÃ¦Å¸Â¥Ã§Å“â€¹Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go tool cover -func=coverage.out

# Ã¥ÂÂ«Ã§Â«Â¶Ã¦â€¦â€¹Ã¥ÂÂµÃ¦Â¸Â¬Ã§Å¡â€žÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
go test -race -coverprofile=coverage.out ./...
```

### Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â¨â„¢

| Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©Â¡Å¾Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â¨â„¢ |
|-----------|------|
| Ã©â€”Å“Ã©ÂÂµÃ¦Â¥Â­Ã¥â€¹â„¢Ã©â€šÂÃ¨Â¼Â¯ | 100% |
| Ã¥â€¦Â¬Ã©â€“â€¹ API | 90%+ |
| Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ | 80%+ |
| Ã§â€Â¢Ã§â€Å¸Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ | Ã¦Å½â€™Ã©â„¢Â¤ |

## HTTP Handler Ã¦Â¸Â¬Ã¨Â©Â¦

```go
func TestHealthHandler(t *testing.T) {
    // Ã¥Â»ÂºÃ§Â«â€¹Ã¨Â«â€¹Ã¦Â±â€š
    req := httptest.NewRequest(http.MethodGet, "/health", nil)
    w := httptest.NewRecorder()

    // Ã¥â€˜Â¼Ã¥ÂÂ« handler
    HealthHandler(w, req)

    // Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥â€ºÅ¾Ã¦â€¡â€°
    resp := w.Result()
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        t.Errorf("got status %d; want %d", resp.StatusCode, http.StatusOK)
    }

    body, _ := io.ReadAll(resp.Body)
    if string(body) != "OK" {
        t.Errorf("got body %q; want %q", body, "OK")
    }
}

func TestAPIHandler(t *testing.T) {
    tests := []struct {
        name       string
        method     string
        path       string
        body       string
        wantStatus int
        wantBody   string
    }{
        {
            name:       "get user",
            method:     http.MethodGet,
            path:       "/users/123",
            wantStatus: http.StatusOK,
            wantBody:   `{"id":"123","name":"Alice"}`,
        },
        {
            name:       "not found",
            method:     http.MethodGet,
            path:       "/users/999",
            wantStatus: http.StatusNotFound,
        },
        {
            name:       "create user",
            method:     http.MethodPost,
            path:       "/users",
            body:       `{"name":"Bob"}`,
            wantStatus: http.StatusCreated,
        },
    }

    handler := NewAPIHandler()

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            var body io.Reader
            if tt.body != "" {
                body = strings.NewReader(tt.body)
            }

            req := httptest.NewRequest(tt.method, tt.path, body)
            req.Header.Set("Content-Type", "application/json")
            w := httptest.NewRecorder()

            handler.ServeHTTP(w, req)

            if w.Code != tt.wantStatus {
                t.Errorf("got status %d; want %d", w.Code, tt.wantStatus)
            }

            if tt.wantBody != "" && w.Body.String() != tt.wantBody {
                t.Errorf("got body %q; want %q", w.Body.String(), tt.wantBody)
            }
        })
    }
}
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Å’â€¡Ã¤Â»Â¤

```bash
# Ã¥Å¸Â·Ã¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¸Â¬Ã¨Â©Â¦
go test ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¨Â©Â³Ã§Â´Â°Ã¨Â¼Â¸Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
go test -v ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦
go test -run TestAdd ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Å’Â¹Ã©â€¦ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
go test -run "TestUser/Create" ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã§Â«Â¶Ã¦â€¦â€¹Ã¥ÂÂµÃ¦Â¸Â¬Ã¥â„¢Â¨Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
go test -race ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
go test -cover -coverprofile=coverage.out ./...

# Ã¥ÂÂªÃ¥Å¸Â·Ã¨Â¡Å’Ã§Å¸Â­Ã¦Â¸Â¬Ã¨Â©Â¦
go test -short ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã©â‚¬Â¾Ã¦â„¢â€šÃ§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
go test -timeout 30s ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¸Â¬Ã¨Â©Â¦
go test -bench=. -benchmem ./...

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¨Â¡Ã§Â³Å Ã¦Â¸Â¬Ã¨Â©Â¦
go test -fuzz=FuzzParse -fuzztime=30s ./...

# Ã¨Â¨Ë†Ã§Â®â€”Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¬Â¡Ã¦â€¢Â¸Ã¯Â¼Ë†Ã§â€Â¨Ã¦â€“Â¼Ã¥ÂÂµÃ¦Â¸Â¬Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼â€°
go test -count=10 ./...
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

**Ã¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã§Å¡â€žÃ¯Â¼Å¡**
- Ã¥â€¦Ë†Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†TDDÃ¯Â¼â€°
- Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©â€¦Ã¥â€¹â€¢Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â»Â¥Ã§ÂÂ²Ã¥Â¾â€”Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â¦â€ Ã¨â€œâ€¹
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¡Å’Ã§â€šÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â¯Â¦Ã¤Â½Å“
- Ã¥Å“Â¨Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `t.Helper()`
- Ã¥Â°ÂÃ§ÂÂ¨Ã§Â«â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â½Â¿Ã§â€Â¨ `t.Parallel()`
- Ã§â€Â¨ `t.Cleanup()` Ã¦Â¸â€¦Ã§Ââ€ Ã¨Â³â€¡Ã¦ÂºÂ
- Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¨Â¿Â°Ã¦Æ’â€¦Ã¥Â¢Æ’Ã§Å¡â€žÃ¦Å“â€°Ã¦â€žÂÃ§Â¾Â©Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥ÂÂÃ§Â¨Â±

**Ã¤Â¸ÂÃ¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã§Å¡â€žÃ¯Â¼Å¡**
- Ã¤Â¸ÂÃ¨Â¦ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Â§ÂÃ¦Å“â€°Ã¥â€¡Â½Ã¥Â¼ÂÃ¯Â¼Ë†Ã©â‚¬ÂÃ©ÂÅ½Ã¥â€¦Â¬Ã©â€“â€¹ API Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Å“Â¨Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `time.Sleep()`Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨ channels Ã¦Ë†â€“Ã¦Â¢ÂÃ¤Â»Â¶Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Ã¤Â¿Â®Ã¥Â¾Â©Ã¦Ë†â€“Ã§Â§Â»Ã©â„¢Â¤Ã¥Â®Æ’Ã¥â‚¬â€˜Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦Â mock Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÂ±Ã¨Â¥Â¿Ã¯Â¼Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â„¢â€šÃ¥ÂÂÃ¥Â¥Â½Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¨Â·Â³Ã©ÂÅ½Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â·Â¯Ã¥Â¾â€˜Ã¦Â¸Â¬Ã¨Â©Â¦

## CI/CD Ã¦â€¢Â´Ã¥ÂË†

```yaml
# GitHub Actions Ã§Â¯â€žÃ¤Â¾â€¹
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-go@v5
      with:
        go-version: '1.22'

    - name: Run tests
      run: go test -race -coverprofile=coverage.out ./...

    - name: Check coverage
      run: |
        go tool cover -func=coverage.out | grep total | awk '{print $3}' | \
        awk -F'%' '{if ($1 < 80) exit 1}'
```

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦ËœÂ¯Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€šÃ¥Â®Æ’Ã¥â‚¬â€˜Ã¥Â±â€¢Ã§Â¤ÂºÃ¤Â½Â Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦â€¡â€°Ã¨Â©Â²Ã¥Â¦â€šÃ¤Â½â€¢Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ¦Â¸â€¦Ã¦Â¥Å¡Ã¥Å“Â°Ã¦â€™Â°Ã¥Â¯Â«Ã¤Â¸Â¦Ã¤Â¿ÂÃ¦Å’ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€š
