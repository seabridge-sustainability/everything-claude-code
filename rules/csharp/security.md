---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
  - "**/appsettings*.json"
---
# C# Security

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


> This file extends [common/security.md](../common/security.md) with C#-specific content.

## Secret Management

- Never hardcode API keys, tokens, or connection strings in source code
- Use environment variables, user secrets for local development, and a secret manager in production
- Keep `appsettings.*.json` free of real credentials

```csharp
// BAD
const string ApiKey = "sk-live-123";

// GOOD
var apiKey = builder.Configuration["OpenAI:ApiKey"]
    ?? throw new InvalidOperationException("OpenAI:ApiKey is not configured.");
```

## SQL Injection Prevention

- Always use parameterized queries with ADO.NET, Dapper, or EF Core
- Never concatenate user input into SQL strings
- Validate sort fields and filter operators before using dynamic query composition

```csharp
const string sql = "SELECT * FROM Orders WHERE CustomerId = @customerId";
await connection.QueryAsync<Order>(sql, new { customerId });
```

## Input Validation

- Validate DTOs at the application boundary
- Use data annotations, FluentValidation, or explicit guard clauses
- Reject invalid model state before running business logic

## Authentication and Authorization

- Prefer framework auth handlers instead of custom token parsing
- Enforce authorization policies at endpoint or handler boundaries
- Never log raw tokens, passwords, or PII

## Error Handling

- Return safe client-facing messages
- Log detailed exceptions with structured context server-side
- Do not expose stack traces, SQL text, or filesystem paths in API responses

## References

See skill: `security-review` for broader application security review checklists.
