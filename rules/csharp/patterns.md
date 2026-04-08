---
paths:
  - "**/*.cs"
  - "**/*.csx"
---
# C# Patterns

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends [common/patterns.md](../common/patterns.md) with C#-specific content.

## API Response Pattern

```csharp
public sealed record ApiResponse<T>(
    bool Success,
    T? Data = default,
    string? Error = null,
    object? Meta = null);
```

## Repository Pattern

```csharp
public interface IRepository<T>
{
    Task<IReadOnlyList<T>> FindAllAsync(CancellationToken cancellationToken);
    Task<T?> FindByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<T> CreateAsync(T entity, CancellationToken cancellationToken);
    Task<T> UpdateAsync(T entity, CancellationToken cancellationToken);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);
}
```

## Options Pattern

Use strongly typed options for config instead of reading raw strings throughout the codebase.

```csharp
public sealed class PaymentsOptions
{
    public const string SectionName = "Payments";
    public required string BaseUrl { get; init; }
    public required string ApiKeySecretName { get; init; }
}
```

## Dependency Injection

- Depend on interfaces at service boundaries
- Keep constructors focused; if a service needs too many dependencies, split responsibilities
- Register lifetimes intentionally: singleton for stateless/shared services, scoped for request data, transient for lightweight pure workers
