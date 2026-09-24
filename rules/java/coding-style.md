---
paths:
  - "**/*.java"
---
# Java Coding Style

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


> This file extends [common/coding-style.md](../common/coding-style.md) with Java-specific content.

## Formatting

- **google-java-format** or **Checkstyle** (Google or Sun style) for enforcement
- One public top-level type per file
- Consistent indent: 2 or 4 spaces (match project standard)
- Member order: constants, fields, constructors, public methods, protected, private

## Immutability

- Prefer `record` for value types (Java 16+)
- Mark fields `final` by default Ã¢â‚¬â€ use mutable state only when required
- Return defensive copies from public APIs: `List.copyOf()`, `Map.copyOf()`, `Set.copyOf()`
- Copy-on-write: return new instances rather than mutating existing ones

```java
// GOOD Ã¢â‚¬â€ immutable value type
public record OrderSummary(Long id, String customerName, BigDecimal total) {}

// GOOD Ã¢â‚¬â€ final fields, no setters
public class Order {
    private final Long id;
    private final List<LineItem> items;

    public List<LineItem> getItems() {
        return List.copyOf(items);
    }
}
```

## Naming

Follow standard Java conventions:
- `PascalCase` for classes, interfaces, records, enums
- `camelCase` for methods, fields, parameters, local variables
- `SCREAMING_SNAKE_CASE` for `static final` constants
- Packages: all lowercase, reverse domain (`com.example.app.service`)

## Modern Java Features

Use modern language features where they improve clarity:
- **Records** for DTOs and value types (Java 16+)
- **Sealed classes** for closed type hierarchies (Java 17+)
- **Pattern matching** with `instanceof` Ã¢â‚¬â€ no explicit cast (Java 16+)
- **Text blocks** for multi-line strings Ã¢â‚¬â€ SQL, JSON templates (Java 15+)
- **Switch expressions** with arrow syntax (Java 14+)
- **Pattern matching in switch** Ã¢â‚¬â€ exhaustive sealed type handling (Java 21+)

```java
// Pattern matching instanceof
if (shape instanceof Circle c) {
    return Math.PI * c.radius() * c.radius();
}

// Sealed type hierarchy
public sealed interface PaymentMethod permits CreditCard, BankTransfer, Wallet {}

// Switch expression
String label = switch (status) {
    case ACTIVE -> "Active";
    case SUSPENDED -> "Suspended";
    case CLOSED -> "Closed";
};
```

## Optional Usage

- Return `Optional<T>` from finder methods that may have no result
- Use `map()`, `flatMap()`, `orElseThrow()` Ã¢â‚¬â€ never call `get()` without `isPresent()`
- Never use `Optional` as a field type or method parameter

```java
// GOOD
return repository.findById(id)
    .map(ResponseDto::from)
    .orElseThrow(() -> new OrderNotFoundException(id));

// BAD Ã¢â‚¬â€ Optional as parameter
public void process(Optional<String> name) {}
```

## Error Handling

- Prefer unchecked exceptions for domain errors
- Create domain-specific exceptions extending `RuntimeException`
- Avoid broad `catch (Exception e)` unless at top-level handlers
- Include context in exception messages

```java
public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Long id) {
        super("Order not found: id=" + id);
    }
}
```

## Streams

- Use streams for transformations; keep pipelines short (3-4 operations max)
- Prefer method references when readable: `.map(Order::getTotal)`
- Avoid side effects in stream operations
- For complex logic, prefer a loop over a convoluted stream pipeline

## References

See skill: `java-coding-standards` for full coding standards with examples.
See skill: `jpa-patterns` for JPA/Hibernate entity design patterns.
