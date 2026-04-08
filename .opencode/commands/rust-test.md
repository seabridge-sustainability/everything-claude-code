---
description: Rust TDD workflow with unit and property tests
agent: tdd-guide
subtask: true
---

# Rust Test Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Implement using Rust TDD methodology: $ARGUMENTS

## Your Task

Apply test-driven development with Rust idioms:

1. **Define types** - Structs, enums, traits
2. **Write tests** - Unit tests in `#[cfg(test)]` modules
3. **Implement minimal code** - Pass the tests
4. **Check coverage** - Target 80%+

## TDD Cycle for Rust

### Step 1: Define Interface
```rust
pub struct Input {
    // fields
}

pub fn process(input: &Input) -> Result<Output, Error> {
    todo!()
}
```

### Step 2: Write Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_input_succeeds() {
        let input = Input { /* ... */ };
        let result = process(&input);
        assert!(result.is_ok());
    }

    #[test]
    fn invalid_input_returns_error() {
        let input = Input { /* ... */ };
        let result = process(&input);
        assert!(result.is_err());
    }
}
```

### Step 3: Run Tests (RED)
```bash
cargo test
```

### Step 4: Implement (GREEN)
```rust
pub fn process(input: &Input) -> Result<Output, Error> {
    // Minimal implementation that handles both paths
    validate(input)?;
    Ok(Output { /* ... */ })
}
```

### Step 5: Check Coverage
```bash
cargo llvm-cov
cargo llvm-cov --fail-under-lines 80
```

## Rust Testing Commands

```bash
cargo test                        # Run all tests
cargo test -- --nocapture         # Show println output
cargo test test_name              # Run specific test
cargo test --no-fail-fast         # Don't stop on first failure
cargo test --lib                  # Unit tests only
cargo test --test integration     # Integration tests only
cargo test --doc                  # Doc tests only
cargo bench                       # Run benchmarks
```

## Test File Organization

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs             # Library root
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ service.rs         # Implementation
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ service/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ tests.rs       # Or inline #[cfg(test)] mod tests {}
tests/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ integration.rs     # Integration tests
benches/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ benchmark.rs       # Criterion benchmarks
```

---

**TIP**: Use `rstest` for parameterized tests and `proptest` for property-based testing.
