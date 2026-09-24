---
paths:
  - "**/*.rs"
---
# Rust Coding Style

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


> This file extends [common/coding-style.md](../common/coding-style.md) with Rust-specific content.

## Formatting

- **rustfmt** for enforcement Ã¢â‚¬â€ always run `cargo fmt` before committing
- **clippy** for lints Ã¢â‚¬â€ `cargo clippy -- -D warnings` (treat warnings as errors)
- 4-space indent (rustfmt default)
- Max line width: 100 characters (rustfmt default)

## Immutability

Rust variables are immutable by default Ã¢â‚¬â€ embrace this:

- Use `let` by default; only use `let mut` when mutation is required
- Prefer returning new values over mutating in place
- Use `Cow<'_, T>` when a function may or may not need to allocate

```rust
use std::borrow::Cow;

// GOOD Ã¢â‚¬â€ immutable by default, new value returned
fn normalize(input: &str) -> Cow<'_, str> {
    if input.contains(' ') {
        Cow::Owned(input.replace(' ', "_"))
    } else {
        Cow::Borrowed(input)
    }
}

// BAD Ã¢â‚¬â€ unnecessary mutation
fn normalize_bad(input: &mut String) {
    *input = input.replace(' ', "_");
}
```

## Naming

Follow standard Rust conventions:
- `snake_case` for functions, methods, variables, modules, crates
- `PascalCase` (UpperCamelCase) for types, traits, enums, type parameters
- `SCREAMING_SNAKE_CASE` for constants and statics
- Lifetimes: short lowercase (`'a`, `'de`) Ã¢â‚¬â€ descriptive names for complex cases (`'input`)

## Ownership and Borrowing

- Borrow (`&T`) by default; take ownership only when you need to store or consume
- Never clone to satisfy the borrow checker without understanding the root cause
- Accept `&str` over `String`, `&[T]` over `Vec<T>` in function parameters
- Use `impl Into<String>` for constructors that need to own a `String`

```rust
// GOOD Ã¢â‚¬â€ borrows when ownership isn't needed
fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

// GOOD Ã¢â‚¬â€ takes ownership in constructor via Into
fn new(name: impl Into<String>) -> Self {
    Self { name: name.into() }
}

// BAD Ã¢â‚¬â€ takes String when &str suffices
fn word_count_bad(text: String) -> usize {
    text.split_whitespace().count()
}
```

## Error Handling

- Use `Result<T, E>` and `?` for propagation Ã¢â‚¬â€ never `unwrap()` in production code
- **Libraries**: define typed errors with `thiserror`
- **Applications**: use `anyhow` for flexible error context
- Add context with `.with_context(|| format!("failed to ..."))?`
- Reserve `unwrap()` / `expect()` for tests and truly unreachable states

```rust
// GOOD Ã¢â‚¬â€ library error with thiserror
#[derive(Debug, thiserror::Error)]
pub enum ConfigError {
    #[error("failed to read config: {0}")]
    Io(#[from] std::io::Error),
    #[error("invalid config format: {0}")]
    Parse(String),
}

// GOOD Ã¢â‚¬â€ application error with anyhow
use anyhow::Context;

fn load_config(path: &str) -> anyhow::Result<Config> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("failed to read {path}"))?;
    toml::from_str(&content)
        .with_context(|| format!("failed to parse {path}"))
}
```

## Iterators Over Loops

Prefer iterator chains for transformations; use loops for complex control flow:

```rust
// GOOD Ã¢â‚¬â€ declarative and composable
let active_emails: Vec<&str> = users.iter()
    .filter(|u| u.is_active)
    .map(|u| u.email.as_str())
    .collect();

// GOOD Ã¢â‚¬â€ loop for complex logic with early returns
for user in &users {
    if let Some(verified) = verify_email(&user.email)? {
        send_welcome(&verified)?;
    }
}
```

## Module Organization

Organize by domain, not by type:

```text
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/           # Domain module
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ token.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ middleware.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ orders/         # Domain module
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ model.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ service.rs
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ db/             # Infrastructure
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pool.rs
```

## Visibility

- Default to private; use `pub(crate)` for internal sharing
- Only mark `pub` what is part of the crate's public API
- Re-export public API from `lib.rs`

## References

See skill: `rust-patterns` for comprehensive Rust idioms and patterns.
