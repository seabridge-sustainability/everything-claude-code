---
description: Go TDD workflow with table-driven tests
agent: tdd-guide
subtask: true
---

# Go Test Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Implement using Go TDD methodology: $ARGUMENTS

## Your Task

Apply test-driven development with Go idioms:

1. **Define types** - Interfaces and structs
2. **Write table-driven tests** - Comprehensive coverage
3. **Implement minimal code** - Pass the tests
4. **Benchmark** - Verify performance

## TDD Cycle for Go

### Step 1: Define Interface
```go
type Calculator interface {
    Calculate(input Input) (Output, error)
}

type Input struct {
    // fields
}

type Output struct {
    // fields
}
```

### Step 2: Table-Driven Tests
```go
func TestCalculate(t *testing.T) {
    tests := []struct {
        name    string
        input   Input
        want    Output
        wantErr bool
    }{
        {
            name:  "valid input",
            input: Input{...},
            want:  Output{...},
        },
        {
            name:    "invalid input",
            input:   Input{...},
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Calculate(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("Calculate() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("Calculate() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Step 3: Run Tests (RED)
```bash
go test -v ./...
```

### Step 4: Implement (GREEN)
```go
func Calculate(input Input) (Output, error) {
    // Minimal implementation
}
```

### Step 5: Benchmark
```go
func BenchmarkCalculate(b *testing.B) {
    input := Input{...}
    for i := 0; i < b.N; i++ {
        Calculate(input)
    }
}
```

## Go Testing Commands

```bash
# Run all tests
go test ./...

# Run with verbose output
go test -v ./...

# Run with coverage
go test -cover ./...

# Run with race detector
go test -race ./...

# Run benchmarks
go test -bench=. ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

## Test File Organization

```
package/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ calculator.go       # Implementation
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ calculator_test.go  # Tests
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ testdata/           # Test fixtures
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ input.json
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mock_test.go        # Mock implementations
```

---

**TIP**: Use `testify/assert` for cleaner assertions, or stick with stdlib for simplicity.
