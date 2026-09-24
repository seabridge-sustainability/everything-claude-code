---
description: Fix Go build and vet errors
agent: go-build-resolver
subtask: true
---

# Go Build Command

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


Fix Go build, vet, and compilation errors: $ARGUMENTS

## Your Task

1. **Run go build**: `go build ./...`
2. **Run go vet**: `go vet ./...`
3. **Fix errors** one by one
4. **Verify fixes** don't introduce new errors

## Common Go Errors

### Import Errors
```
imported and not used: "package"
```
**Fix**: Remove unused import or use `_` prefix

### Type Errors
```
cannot use x (type T) as type U
```
**Fix**: Add type conversion or fix type definition

### Undefined Errors
```
undefined: identifier
```
**Fix**: Import package, define variable, or fix typo

### Vet Errors
```
printf: call has arguments but no formatting directives
```
**Fix**: Add format directive or remove arguments

## Fix Order

1. **Import errors** - Fix or remove imports
2. **Type definitions** - Ensure types exist
3. **Function signatures** - Match parameters
4. **Vet warnings** - Address static analysis

## Build Commands

```bash
# Build all packages
go build ./...

# Build with race detector
go build -race ./...

# Build for specific OS/arch
GOOS=linux GOARCH=amd64 go build ./...

# Run go vet
go vet ./...

# Run staticcheck
staticcheck ./...

# Format code
gofmt -w .

# Tidy dependencies
go mod tidy
```

## Verification

After fixes:
```bash
go build ./...    # Should succeed
go vet ./...      # Should have no warnings
go test ./...     # Tests should pass
```

---

**IMPORTANT**: Fix errors only. No refactoring, no improvements. Get the build green with minimal changes.
