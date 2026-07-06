---
paths:
  - "**/*.java"
---

# Java Ã¥Â®â€°Ã¥â€¦Â¨

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/security.md](../common/security.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Java Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â Â API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¦Ë†â€“Ã¥â€¡Â­Ã¦ÂÂ®
* Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¯Â¼Å¡`System.getenv("API_KEY")`
* Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¥Â¯â€ Ã©â€™Â¥Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†Ã¥Â¦â€š VaultÃ£â‚¬ÂAWS Secrets ManagerÃ¯Â¼â€°
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â¯â€ Ã©â€™Â¥Ã§Å¡â€žÃ¦Å“Â¬Ã¥Å“Â°Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Âºâ€Ã¦â€Â¾Ã¥Å“Â¨ `.gitignore` Ã¤Â¸Â­

```java
// BAD
private static final String API_KEY = "sk-abc123...";

// GOOD Ã¢â‚¬â€ environment variable
String apiKey = System.getenv("PAYMENT_API_KEY");
Objects.requireNonNull(apiKey, "PAYMENT_API_KEY must be set");
```

## SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¦Å Â¤

* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â°â€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¦â€¹Â¼Ã¦Å½Â¥Ã¥Ë†Â° SQL Ã¨Â¯Â­Ã¥ÂÂ¥Ã¤Â¸Â­
* Ã¤Â½Â¿Ã§â€Â¨ `PreparedStatement` Ã¦Ë†â€“Ã¤Â½Â Ã¦â€°â‚¬Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¡â€ Ã¦Å¾Â¶Ã§Å¡â€žÃ¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢ API
* Ã¥Â¯Â¹Ã§â€Â¨Ã¤ÂºÅ½Ã¥Å½Å¸Ã§â€Å¸Ã¦Å¸Â¥Ã¨Â¯Â¢Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¨Â¾â€œÃ¥â€¦Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¦Â¸â€¦Ã§Ââ€ 

```java
// BAD Ã¢â‚¬â€ SQL injection via string concatenation
Statement stmt = conn.createStatement();
String sql = "SELECT * FROM orders WHERE name = '" + name + "'";
stmt.executeQuery(sql);

// GOOD Ã¢â‚¬â€ PreparedStatement with parameterized query
PreparedStatement ps = conn.prepareStatement("SELECT * FROM orders WHERE name = ?");
ps.setString(1, name);

// GOOD Ã¢â‚¬â€ JDBC template
jdbcTemplate.query("SELECT * FROM orders WHERE name = ?", mapper, name);
```

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¥â€°ÂÃ¯Â¼Å’Ã¤ÂºÅ½Ã§Â³Â»Ã§Â»Å¸Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥
* Ã¤Â½Â¿Ã§â€Â¨Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¡â€ Ã¦Å¾Â¶Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Å“Â¨ DTO Ã¤Â¸Å Ã¤Â½Â¿Ã§â€Â¨ Bean Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Ë†`@NotNull`, `@NotBlank`, `@Size`Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¥â€™Å’Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¥â€°ÂÃ¯Â¼Å’Ã¥Â¯Â¹Ã¥â€¦Â¶Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¸â€¦Ã§Ââ€ 
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Å’Ã¥Âºâ€Ã¦â€¹â€™Ã§Â»ÂÃ¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯

```java
// Validate manually in plain Java
public Order createOrder(String customerName, BigDecimal amount) {
    if (customerName == null || customerName.isBlank()) {
        throw new IllegalArgumentException("Customer name is required");
    }
    if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("Amount must be positive");
    }
    return new Order(customerName, amount);
}
```

## Ã¨Â®Â¤Ã¨Â¯ÂÃ¤Â¸Å½Ã¦Å½Ë†Ã¦ÂÆ’

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¨â€¡ÂªÃ¨Â¡Å’Ã¥Â®Å¾Ã§Å½Â°Ã¨Â®Â¤Ã¨Â¯ÂÃ¥Å Â Ã¥Â¯â€ Ã©â‚¬Â»Ã¨Â¾â€˜Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨Ã¦Ë†ÂÃ§â€ Å¸Ã§Å¡â€žÃ¥Âºâ€œ
* Ã¤Â½Â¿Ã§â€Â¨ bcrypt Ã¦Ë†â€“ Argon2 Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Â¯â€ Ã§Â ÂÃ¯Â¼Å’Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â½Â¿Ã§â€Â¨ MD5/SHA1
* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Å½Ë†Ã¦ÂÆ’Ã¦Â£â‚¬Ã¦Å¸Â¥
* Ã¦Â¸â€¦Ã§Ââ€ Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¦Ë†â€“Ã¤Â¸ÂªÃ¤ÂºÂºÃ¨ÂºÂ«Ã¤Â»Â½Ã¤Â¿Â¡Ã¦ÂÂ¯

## Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Â®â€°Ã¥â€¦Â¨

* Ã¨Â¿ÂÃ¨Â¡Å’ `mvn dependency:tree` Ã¦Ë†â€“ `./gradlew dependencies` Ã¦ÂÂ¥Ã¥Â®Â¡Ã¨Â®Â¡Ã¤Â¼Â Ã©â‚¬â€™Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¤Â½Â¿Ã§â€Â¨ OWASP Dependency-Check Ã¦Ë†â€“ Snyk Ã¦â€°Â«Ã¦ÂÂÃ¥Â·Â²Ã§Å¸Â¥Ã§Å¡â€ž CVE
* Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦â€ºÂ´Ã¦â€“Â°Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â®Â¾Ã§Â½Â® Dependabot Ã¦Ë†â€“ Renovate

## Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨ API Ã¥â€œÂÃ¥Âºâ€Ã¤Â¸Â­Ã¦Å¡Â´Ã©Å“Â²Ã¥Â â€ Ã¦Â Ë†Ã¨Â·Å¸Ã¨Â¸ÂªÃ£â‚¬ÂÃ¥â€ â€¦Ã©Æ’Â¨Ã¨Â·Â¯Ã¥Â¾â€žÃ¦Ë†â€“ SQL Ã©â€â„¢Ã¨Â¯Â¯
* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â°â€ Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦ËœÂ Ã¥Â°â€žÃ¤Â¸ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ©â‚¬Å¡Ã§â€Â¨Ã§Å¡â€žÃ¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯
* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã¨Â®Â°Ã¥Â½â€¢Ã¨Â¯Â¦Ã§Â»â€ Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€ºÃ¥Ââ€˜Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¨Â¿â€Ã¥â€ºÅ¾Ã©â‚¬Å¡Ã§â€Â¨Ã¦Â¶Ë†Ã¦ÂÂ¯

```java
// Log the detail, return a generic message
try {
    return orderService.findById(id);
} catch (OrderNotFoundException ex) {
    log.warn("Order not found: id={}", id);
    return ApiResponse.error("Resource not found");  // generic, no internals
} catch (Exception ex) {
    log.error("Unexpected error processing order id={}", id, ex);
    return ApiResponse.error("Internal server error");  // never expose ex.getMessage()
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¥â€¦Â³Ã¤ÂºÅ½ Spring Security Ã¨Â®Â¤Ã¨Â¯ÂÃ¤Â¸Å½Ã¦Å½Ë†Ã¦ÂÆ’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ¨Â§ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`springboot-security`Ã£â‚¬â€š
Ã¥â€¦Â³Ã¤ÂºÅ½Ã©â‚¬Å¡Ã§â€Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ¨Â§ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`security-review`Ã£â‚¬â€š
