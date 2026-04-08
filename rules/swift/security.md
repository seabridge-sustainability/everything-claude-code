---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---
# Swift Security

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends [common/security.md](../common/security.md) with Swift specific content.

## Secret Management

- Use **Keychain Services** for sensitive data (tokens, passwords, keys) Ã¢â‚¬â€ never `UserDefaults`
- Use environment variables or `.xcconfig` files for build-time secrets
- Never hardcode secrets in source Ã¢â‚¬â€ decompilation tools extract them trivially

```swift
let apiKey = ProcessInfo.processInfo.environment["API_KEY"]
guard let apiKey, !apiKey.isEmpty else {
    fatalError("API_KEY not configured")
}
```

## Transport Security

- App Transport Security (ATS) is enforced by default Ã¢â‚¬â€ do not disable it
- Use certificate pinning for critical endpoints
- Validate all server certificates

## Input Validation

- Sanitize all user input before display to prevent injection
- Use `URL(string:)` with validation rather than force-unwrapping
- Validate data from external sources (APIs, deep links, pasteboard) before processing
