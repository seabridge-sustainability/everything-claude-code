---
description: Go code review for idiomatic patterns
agent: go-reviewer
subtask: true
---

# Go Review Command

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
