---
description: Fix Go build and vet errors
agent: go-build-resolver
subtask: true
---

# Go Build Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
