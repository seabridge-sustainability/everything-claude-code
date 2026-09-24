---
description: Go code review for idiomatic patterns
agent: go-reviewer
subtask: true
---

# Go Review Command

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


Review Go code for idiomatic patterns and best practices: $ARGUMENTS

## Your Task

1. **Analyze Go code** for idioms and patterns
2. **Check concurrency** - goroutines, channels, mutexes
3. **Review error handling** - proper error wrapping
4. **Verify performance** - allocations, bottlenecks

## Review Checklist

### Idiomatic Go
- [ ] Package naming (lowercase, no underscores)
- [ ] Variable naming (camelCase, short)
- [ ] Interface naming (ends with -er)
- [ ] Error naming (starts with Err)

### Error Handling
- [ ] Errors are checked, not ignored
- [ ] Errors wrapped with context (`fmt.Errorf("...: %w", err)`)
- [ ] Sentinel errors used appropriately
- [ ] Custom error types when needed

### Concurrency
- [ ] Goroutines properly managed
- [ ] Channels buffered appropriately
- [ ] No data races (use `-race` flag)
- [ ] Context passed for cancellation
- [ ] WaitGroups used correctly

### Performance
- [ ] Avoid unnecessary allocations
- [ ] Use `sync.Pool` for frequent allocations
- [ ] Prefer value receivers for small structs
- [ ] Buffer I/O operations

### Code Organization
- [ ] Small, focused packages
- [ ] Clear dependency direction
- [ ] Internal packages for private code
- [ ] Godoc comments on exports

## Report Format

### Idiomatic Issues
- [file:line] Issue description
  Suggestion: How to fix

### Error Handling Issues
- [file:line] Issue description
  Suggestion: How to fix

### Concurrency Issues
- [file:line] Issue description
  Suggestion: How to fix

### Performance Issues
- [file:line] Issue description
  Suggestion: How to fix

---

**TIP**: Run `go vet` and `staticcheck` for additional automated checks.
