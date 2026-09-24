---
description: Rust TDD workflow with unit and property tests
agent: tdd-guide
subtask: true
---

# Rust Test Command

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
