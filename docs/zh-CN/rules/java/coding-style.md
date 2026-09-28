---
paths:
  - "**/*.java"
---

# Java Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/coding-style.md](../common/coding-style.md)Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Java Ã§â€°Â¹Ã¦Å“â€°Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼Â

* Ã¤Â½Â¿Ã§â€Â¨ **google-java-format** Ã¦Ë†â€“ **Checkstyle**Ã¯Â¼Ë†Google Ã¦Ë†â€“ Sun Ã©Â£Å½Ã¦Â Â¼Ã¯Â¼â€°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¨Â§â€žÃ¨Å’Æ’
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÂªÃ¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©Â¡Â¶Ã¥Â±â€šÃ§Å¡â€žÃ¥â€¦Â¬Ã¥â€¦Â±Ã§Â±Â»Ã¥Å¾â€¹
* Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ§Â¼Â©Ã¨Â¿â€ºÃ¯Â¼Å¡2 Ã¦Ë†â€“ 4 Ã¤Â¸ÂªÃ§Â©ÂºÃ¦Â Â¼Ã¯Â¼Ë†Ã©ÂÂµÃ¥Â¾ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â â€¡Ã¥â€¡â€ Ã¯Â¼â€°
* Ã¦Ë†ÂÃ¥â€˜ËœÃ©Â¡ÂºÃ¥ÂºÂÃ¯Â¼Å¡Ã¥Â¸Â¸Ã©â€¡ÂÃ£â‚¬ÂÃ¥Â­â€”Ã¦Â®ÂµÃ£â‚¬ÂÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¥â€¦Â¬Ã¥â€¦Â±Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ¥Ââ€”Ã¤Â¿ÂÃ¦Å Â¤Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ§Â§ÂÃ¦Å“â€°Ã¦â€“Â¹Ã¦Â³â€¢

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `record`Ã¯Â¼Ë†Java 16+Ã¯Â¼â€°
* Ã©Â»ËœÃ¨Â®Â¤Ã¥Â°â€ Ã¥Â­â€”Ã¦Â®ÂµÃ¦Â â€¡Ã¨Â®Â°Ã¤Â¸Âº `final` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€”Â¶Ã¦â€°ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â
* Ã¤Â»Å½Ã¥â€¦Â¬Ã¥â€¦Â± API Ã¨Â¿â€Ã¥â€ºÅ¾Ã©ËœÂ²Ã¥Â¾Â¡Ã¦â‚¬Â§Ã¥â€°Â¯Ã¦Å“Â¬Ã¯Â¼Å¡`List.copyOf()`Ã£â‚¬Â`Map.copyOf()`Ã£â‚¬Â`Set.copyOf()`
* Ã¥â€ â„¢Ã¦â€”Â¶Ã¥Â¤ÂÃ¥Ë†Â¶Ã¯Â¼Å¡Ã¨Â¿â€Ã¥â€ºÅ¾Ã¦â€“Â°Ã¥Â®Å¾Ã¤Â¾â€¹Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¤Â¿Â®Ã¦â€Â¹Ã§Å½Â°Ã¦Å“â€°Ã¥Â®Å¾Ã¤Â¾â€¹

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

## Ã¥â€˜Â½Ã¥ÂÂ

Ã©ÂÂµÃ¥Â¾ÂªÃ¦Â â€¡Ã¥â€¡â€ Ã§Å¡â€ž Java Ã¥â€˜Â½Ã¥ÂÂÃ§ÂºÂ¦Ã¥Â®Å¡Ã¯Â¼Å¡

* `PascalCase` Ã§â€Â¨Ã¤ÂºÅ½Ã§Â±Â»Ã£â‚¬ÂÃ¦Å½Â¥Ã¥ÂÂ£Ã£â‚¬ÂÃ¨Â®Â°Ã¥Â½â€¢Ã£â‚¬ÂÃ¦Å¾Å¡Ã¤Â¸Â¾
* `camelCase` Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ¥Â­â€”Ã¦Â®ÂµÃ£â‚¬ÂÃ¥Ââ€šÃ¦â€¢Â°Ã£â‚¬ÂÃ¥Â±â‚¬Ã©Æ’Â¨Ã¥ÂËœÃ©â€¡Â
* `SCREAMING_SNAKE_CASE` Ã§â€Â¨Ã¤ÂºÅ½ `static final` Ã¥Â¸Â¸Ã©â€¡Â
* Ã¥Å’â€¦Ã¥ÂÂÃ¯Â¼Å¡Ã¥â€¦Â¨Ã¥Â°ÂÃ¥â€ â„¢Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÂÃ¥Ââ€˜Ã¥Å¸Å¸Ã¥ÂÂÃ¯Â¼Ë†`com.example.app.service`Ã¯Â¼â€°

## Ã§Å½Â°Ã¤Â»Â£ Java Ã§â€°Â¹Ã¦â‚¬Â§

Ã¥Å“Â¨Ã¨Æ’Â½Ã¦ÂÂÃ©Â«ËœÃ¤Â»Â£Ã§Â ÂÃ¦Â¸â€¦Ã¦â„¢Â°Ã¥ÂºÂ¦Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â°Ã¤Â»Â£Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§â€°Â¹Ã¦â‚¬Â§Ã¯Â¼Å¡

* **Ã¨Â®Â°Ã¥Â½â€¢** Ã§â€Â¨Ã¤ÂºÅ½ DTO Ã¥â€™Å’Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Ë†Java 16+Ã¯Â¼â€°
* **Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â°ÂÃ©â€”Â­Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â±â€šÃ¦Â¬Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Ë†Java 17+Ã¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨ `instanceof` Ã¨Â¿â€ºÃ¨Â¡Å’**Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦Â** Ã¢â‚¬â€Ã¢â‚¬â€ Ã©ÂÂ¿Ã¥â€¦ÂÃ¦ËœÂ¾Ã¥Â¼ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢Ã¯Â¼Ë†Java 16+Ã¯Â¼â€°
* **Ã¦â€“â€¡Ã¦Å“Â¬Ã¥Ââ€”** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤Å¡Ã¨Â¡Å’Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â² Ã¢â‚¬â€Ã¢â‚¬â€ SQLÃ£â‚¬ÂJSON Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¯Â¼Ë†Java 15+Ã¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨Ã§Â®Â­Ã¥Â¤Â´Ã¨Â¯Â­Ã¦Â³â€¢Ã§Å¡â€ž**Switch Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼Â**Ã¯Â¼Ë†Java 14+Ã¯Â¼â€°
* **Switch Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦Â** Ã¢â‚¬â€Ã¢â‚¬â€ Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤â€žÃ§Ââ€ Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Å¾â€¹Ã§Å¡â€žÃ§Â©Â·Ã¤Â¸Â¾Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Java 21+Ã¯Â¼â€°

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

## Optional Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨

* Ã¤Â»Å½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦Â²Â¡Ã¦Å“â€°Ã§Â»â€œÃ¦Å¾Å“Ã§Å¡â€žÃ¦Å¸Â¥Ã¦â€°Â¾Ã¦â€“Â¹Ã¦Â³â€¢Ã¤Â¸Â­Ã¨Â¿â€Ã¥â€ºÅ¾ `Optional<T>`
* Ã¤Â½Â¿Ã§â€Â¨ `map()`Ã£â‚¬Â`flatMap()`Ã£â‚¬Â`orElseThrow()` Ã¢â‚¬â€Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¨Â°Æ’Ã§â€Â¨ `get()` Ã¨â‚¬Å’Ã¤Â¸ÂÃ¥â€¦Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥ `isPresent()`
* Ã§Â»ÂÃ¤Â¸ÂÃ¥Â°â€  `Optional` Ã§â€Â¨Ã¤Â½Å“Ã¥Â­â€”Ã¦Â®ÂµÃ§Â±Â»Ã¥Å¾â€¹Ã¦Ë†â€“Ã¦â€“Â¹Ã¦Â³â€¢Ã¥Ââ€šÃ¦â€¢Â°

```java
// GOOD
return repository.findById(id)
    .map(ResponseDto::from)
    .orElseThrow(() -> new OrderNotFoundException(id));

// BAD Ã¢â‚¬â€ Optional as parameter
public void process(Optional<String> name) {}
```

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©Â¢â€ Ã¥Å¸Å¸Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã©ÂÅ¾Ã¥Ââ€”Ã¦Â£â‚¬Ã¥Â¼â€šÃ¥Â¸Â¸
* Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€°Â©Ã¥Â±â€¢Ã¨â€¡Âª `RuntimeException` Ã§Å¡â€žÃ©Â¢â€ Ã¥Å¸Å¸Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â¼â€šÃ¥Â¸Â¸
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Â®Â½Ã¦Â³â€ºÃ§Å¡â€ž `catch (Exception e)`Ã¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã¥Å“Â¨Ã¦Å“â‚¬Ã©Â¡Â¶Ã¥Â±â€šÃ§Å¡â€žÃ¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Â­
* Ã¥Å“Â¨Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¸Â­Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¿Â¡Ã¦ÂÂ¯

```java
public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Long id) {
        super("Order not found: id=" + id);
    }
}
```

## Ã¦ÂµÂ

* Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂµÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¨Â½Â¬Ã¦ÂÂ¢Ã¯Â¼â€ºÃ¤Â¿ÂÃ¦Å’ÂÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã§Â®â‚¬Ã§Å¸Â­Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Å¡ 3-4 Ã¤Â¸ÂªÃ¦â€œÂÃ¤Â½Å“Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§Ã¥Â¥Â½Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢Ã¥Â¼â€¢Ã§â€Â¨Ã¯Â¼Å¡`.map(Order::getTotal)`
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦ÂµÂÃ¦â€œÂÃ¤Â½Å“Ã¤Â¸Â­Ã¤ÂºÂ§Ã§â€Å¸Ã¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤ÂÃ¦Ââ€šÃ©â‚¬Â»Ã¨Â¾â€˜Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã©Å¡Â¾Ã¤Â»Â¥Ã§Ââ€ Ã¨Â§Â£Ã§Å¡â€žÃ¦ÂµÂÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¥Â®Å’Ã¦â€¢Â´Ã§Â¼â€“Ã§Â ÂÃ¦Â â€¡Ã¥â€¡â€ Ã¥ÂÅ Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`java-coding-standards`Ã£â‚¬â€š
JPA/Hibernate Ã¥Â®Å¾Ã¤Â½â€œÃ¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`jpa-patterns`Ã£â‚¬â€š
