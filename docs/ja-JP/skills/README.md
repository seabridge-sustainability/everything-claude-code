# Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÂ¯ Claude Code Ã£ÂÅ’Ã¦â€“â€¡Ã¨â€žË†Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£Ââ€žÃ£ÂÂ¦Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬Ã§Å¸Â¥Ã¨Â­ËœÃ£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¥Â®Å¡Ã§Â¾Â©Ã£ÂÂ¨Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã§Å¸Â¥Ã¨Â­ËœÃ£â€šâ€™Ã¥ÂÂ«Ã£ÂÂ¿Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šÂ«Ã£Æ’â€ Ã£â€šÂ´Ã£Æ’Âª

### Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã¥Ë†Â¥Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `python-patterns/` - Python Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `golang-patterns/` - Go Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `frontend-patterns/` - React/Next.js Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `backend-patterns/` - API Ã£ÂÂ¨Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã¥Ë†Â¥Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- `python-testing/` - Python Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥
- `golang-testing/` - Go Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥
- `cpp-testing/` - C++ Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£Æ’â€¢Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯
- `django-patterns/` - Django Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹
- `django-tdd/` - Django Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº
- `django-security/` - Django Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£
- `springboot-patterns/` - Spring Boot Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `springboot-tdd/` - Spring Boot Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- `springboot-security/` - Spring Boot Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

### Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹
- `postgres-patterns/` - PostgreSQL Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `jpa-patterns/` - JPA/Hibernate Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£
- `security-review/` - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†
- `security-scan/` - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³

### Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `tdd-workflow/` - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `continuous-learning/` - Ã§Â¶â„¢Ã§Â¶Å¡Ã§Å¡â€žÃ¥Â­Â¦Ã§Â¿â€™

### Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã§â€°Â¹Ã¥Â®Å¡
- `eval-harness/` - Ã¨Â©â€¢Ã¤Â¾Â¡Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ¹
- `iterative-retrieval/` - Ã¥ÂÂÃ¥Â¾Â©Ã§Å¡â€žÃ¦Â¤Å“Ã§Â´Â¢

## Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã¦Â§â€¹Ã©â‚¬Â 

Ã¥Ââ€žÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÂ¯Ã¨â€¡ÂªÃ¥Ë†â€ Ã£ÂÂ®Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£ÂÂ« SKILL.md Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¥ÂÂ«Ã£ÂÂ¿Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Å¡

```
skills/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ python-patterns/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ SKILL.md          # Ã¥Â®Å¸Ã¨Â£â€¦Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬ÂÃ¤Â¾â€¹Ã£â‚¬ÂÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ golang-testing/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ SKILL.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ django-patterns/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ SKILL.md
...
```

## Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢

Claude Code Ã£ÂÂ¯Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£Ââ€žÃ£ÂÂ¦Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šâ€™Ã¨â€¡ÂªÃ¥â€¹â€¢Ã§Å¡â€žÃ£ÂÂ«Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¿Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¤Â¾â€¹Ã¯Â¼Å¡

- Python Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË† Ã¢â€ â€™ `python-patterns` Ã£ÂÂ¨ `python-testing` Ã£ÂÅ’Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¾Ã£â€šÅ’Ã£â€šâ€¹
- Django Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË† Ã¢â€ â€™ `django-*` Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÅ’Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¾Ã£â€šÅ’Ã£â€šâ€¹
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£â€šâ€™Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË† Ã¢â€ â€™ `tdd-workflow` Ã£ÂÅ’Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¾Ã£â€šÅ’Ã£â€šâ€¹

## Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†Â

Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ«Ã£ÂÂ¯Ã¯Â¼Å¡

1. `skills/your-skill-name/` Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
2. `SKILL.md` Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
3. Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¯Â¼Å¡

```markdown
---
name: your-skill-name
description: Brief description shown in skill list
---

# Your Skill Title

Brief overview.

## Core Concepts

Key patterns and guidelines.

## Code Examples

\`\`\`language
// Practical, tested examples
\`\`\`

## Best Practices

- Actionable guideline 1
- Actionable guideline 2

## When to Use

Describe scenarios where this skill applies.
```

---

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**Ã¯Â¼Å¡Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÂ¯Ã¥Ââ€šÃ§â€¦Â§Ã¨Â³â€¡Ã¦â€“â„¢Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â®Å¸Ã¨Â£â€¦Ã£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â‚¬Ã£Æ’Â³Ã£â€šÂ¹Ã£â€šâ€™Ã¦ÂÂÃ¤Â¾â€ºÃ£Ââ€”Ã£â‚¬ÂÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šâ€™Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£ÂÂ¨Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¤Â¸â‚¬Ã§Â·â€™Ã£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â‚¬ÂÃ©Â«ËœÃ¥â€œÂÃ¨Â³ÂªÃ£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
