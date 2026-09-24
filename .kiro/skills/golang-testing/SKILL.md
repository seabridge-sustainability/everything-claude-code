---
name: golang-testing
description: >
  Go testing best practices including table-driven tests, test helpers,
  benchmarking, race detection, coverage analysis, and integration testing
  patterns. Use when writing or improving Go tests.
metadata:
  origin: ECC
  globs: ["**/*.go", "**/go.mod", "**/go.sum"]
---

# Go Testing

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


> This skill provides comprehensive Go testing patterns extending common testing principles with Go-specific idioms.

## Testing Framework

Use the standard `go test` with **table-driven tests** as the primary pattern.

### Table-Driven Tests

The idiomatic Go testing pattern:

```go
func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        wantErr bool
    }{
        {
            name:    "valid email",
            email:   "user@example.com",
            wantErr: false,
        },
        {
            name:    "missing @",
            email:   "userexample.com",
            wantErr: true,
        },
        {
            name:    "empty string",
            email:   "",
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ValidateEmail(tt.email)
            if (err != nil) != tt.wantErr {
                t.Errorf("ValidateEmail(%q) error = %v, wantErr %v",
                    tt.email, err, tt.wantErr)
            }
        })
    }
}
```

**Benefits:**
- Easy to add new test cases
- Clear test case documentation
- Parallel test execution with `t.Parallel()`
- Isolated subtests with `t.Run()`

## Test Helpers

Use `t.Helper()` to mark helper functions:

```go
func assertNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
}

func assertEqual(t *testing.T, got, want interface{}) {
    t.Helper()
    if !reflect.DeepEqual(got, want) {
        t.Errorf("got %v, want %v", got, want)
    }
}
```

**Benefits:**
- Correct line numbers in test failures
- Reusable test utilities
- Cleaner test code

## Test Fixtures

Use `t.Cleanup()` for resource cleanup:

```go
func testDB(t *testing.T) *sql.DB {
    t.Helper()

    db, err := sql.Open("sqlite3", ":memory:")
    if err != nil {
        t.Fatalf("failed to open test db: %v", err)
    }

    // Cleanup runs after test completes
    t.Cleanup(func() {
        if err := db.Close(); err != nil {
            t.Errorf("failed to close db: %v", err)
        }
    })

    return db
}

func TestUserRepository(t *testing.T) {
    db := testDB(t)
    repo := NewUserRepository(db)
    // ... test logic
}
```

## Race Detection

Always run tests with the `-race` flag to detect data races:

```bash
go test -race ./...
```

**In CI/CD:**
```yaml
- name: Test with race detector
  run: go test -race -timeout 5m ./...
```

**Why:**
- Detects concurrent access bugs
- Prevents production race conditions
- Minimal performance overhead in tests

## Coverage Analysis

### Basic Coverage

```bash
go test -cover ./...
```

### Detailed Coverage Report

```bash
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

### Coverage Thresholds

```bash
# Fail if coverage below 80%
go test -cover ./... | grep -E 'coverage: [0-7][0-9]\.[0-9]%' && exit 1
```

## Benchmarking

```go
func BenchmarkValidateEmail(b *testing.B) {
    email := "user@example.com"

    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        ValidateEmail(email)
    }
}
```

**Run benchmarks:**
```bash
go test -bench=. -benchmem
```

**Compare benchmarks:**
```bash
go test -bench=. -benchmem > old.txt
# make changes
go test -bench=. -benchmem > new.txt
benchstat old.txt new.txt
```

## Mocking

### Interface-Based Mocking

```go
type UserRepository interface {
    GetUser(id string) (*User, error)
}

type mockUserRepository struct {
    users map[string]*User
    err   error
}

func (m *mockUserRepository) GetUser(id string) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    return m.users[id], nil
}

func TestUserService(t *testing.T) {
    mock := &mockUserRepository{
        users: map[string]*User{
            "1": {ID: "1", Name: "Alice"},
        },
    }

    service := NewUserService(mock)
    // ... test logic
}
```

## Integration Tests

### Build Tags

```go
//go:build integration
// +build integration

package user_test

func TestUserRepository_Integration(t *testing.T) {
    // ... integration test
}
```

**Run integration tests:**
```bash
go test -tags=integration ./...
```

### Test Containers

```go
func TestWithPostgres(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping integration test")
    }

    // Setup test container
    ctx := context.Background()
    container, err := testcontainers.GenericContainer(ctx, ...)
    assertNoError(t, err)

    t.Cleanup(func() {
        container.Terminate(ctx)
    })

    // ... test logic
}
```

## Test Organization

### File Structure

```
package/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ user.go
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ user_test.go          # Unit tests
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ user_integration_test.go  # Integration tests
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ testdata/             # Test fixtures
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ users.json
```

### Package Naming

```go
// Black-box testing (external perspective)
package user_test

// White-box testing (internal access)
package user
```

## Common Patterns

### Testing HTTP Handlers

```go
func TestUserHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/users/1", nil)
    rec := httptest.NewRecorder()

    handler := NewUserHandler(mockRepo)
    handler.ServeHTTP(rec, req)

    assertEqual(t, rec.Code, http.StatusOK)
}
```

### Testing with Context

```go
func TestWithTimeout(t *testing.T) {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    err := SlowOperation(ctx)
    if !errors.Is(err, context.DeadlineExceeded) {
        t.Errorf("expected timeout error, got %v", err)
    }
}
```

## Best Practices

1. **Use `t.Parallel()`** for independent tests
2. **Use `testing.Short()`** to skip slow tests
3. **Use `t.TempDir()`** for temporary directories
4. **Use `t.Setenv()`** for environment variables
5. **Avoid `init()`** in test files
6. **Keep tests focused** - one behavior per test
7. **Use meaningful test names** - describe what's being tested

## When to Use This Skill

- Writing new Go tests
- Improving test coverage
- Setting up test infrastructure
- Debugging flaky tests
- Optimizing test performance
- Implementing integration tests
