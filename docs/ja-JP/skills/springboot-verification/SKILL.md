---
name: springboot-verification
description: Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR.
---

# Spring Boot Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


PRÃ¥â€°ÂÃ£â‚¬ÂÃ¥Â¤Â§Ã£ÂÂÃ£ÂÂªÃ¥Â¤â€°Ã¦â€ºÂ´Ã¥Â¾Å’Ã£â‚¬ÂÃ£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤Ã¥â€°ÂÃ£ÂÂ«Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº1: Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°

```bash
mvn -T 4 clean verify -DskipTests
# Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯
./gradlew clean assemble -x test
```

Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£ÂÅ’Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬ÂÃ¥ÂÅ“Ã¦Â­Â¢Ã£Ââ€”Ã£ÂÂ¦Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº2: Ã©Ââ„¢Ã§Å¡â€žÃ¨Â§Â£Ã¦Å¾Â

MavenÃ¯Â¼Ë†Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã¯Â¼â€°:
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

GradleÃ¯Â¼Ë†Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã¯Â¼â€°:
```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº3: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† + Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸

```bash
mvn -T 4 test
mvn jacoco:report   # 80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
# Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯
./gradlew test jacocoTestReport
```

Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†:
- Ã§Â·ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦â€¢Â°Ã£â‚¬ÂÃ¥ÂË†Ã¦Â Â¼/Ã¥Â¤Â±Ã¦â€¢â€”
- Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸%Ã¯Â¼Ë†Ã¨Â¡Å’/Ã¥Ë†â€ Ã¥Â²ÂÃ¯Â¼â€°

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº4: Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³

```bash
# Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£ÂÂ®CVE
mvn org.owasp:dependency-check-maven:check
# Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯
./gradlew dependencyCheckAnalyze

# Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã¯Â¼Ë†gitÃ¯Â¼â€°
git secrets --scan  # Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†
```

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº5: Lint/FormatÃ¯Â¼Ë†Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ²Ã£Æ’Â¼Ã£Æ’Ë†Ã¯Â¼â€°

```bash
mvn spotless:apply   # SpotlessÃ£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†
./gradlew spotlessApply
```

## Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº6: Ã¥Â·Â®Ã¥Ë†â€ Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

```bash
git diff --stat
git diff
```

Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†:
- Ã£Æ’â€¡Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ°Ã£Æ’Â­Ã£â€šÂ°Ã£ÂÅ’Ã¦Â®â€¹Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ¯Â¼Ë†`System.out`Ã£â‚¬ÂÃ£â€šÂ¬Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ® `log.debug`Ã¯Â¼â€°
- Ã¦â€žÂÃ¥â€˜Â³Ã£ÂÂ®Ã£Ââ€šÃ£â€šâ€¹Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¨HTTPÃ£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹
- Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ¥Â Â´Ã¦â€°â‚¬Ã£ÂÂ«Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨Ã¦Â¤Å“Ã¨Â¨Â¼Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
- Ã¨Â¨Â­Ã¥Â®Å¡Ã¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÅ’Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹

## Ã¥â€¡ÂºÃ¥Å â€ºÃ£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†

```
Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
===================
Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°:     [Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼]
Ã©Ââ„¢Ã§Å¡â€žÃ¨Â§Â£Ã¦Å¾Â:   [Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼] (spotbugs/pmd/checkstyle)
Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†:     [Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼] (X/Y Ã¥ÂË†Ã¦Â Â¼, Z% Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸)
Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£: [Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼] (CVEÃ§â„¢ÂºÃ¨Â¦â€¹: N)
Ã¥Â·Â®Ã¥Ë†â€ :       [X Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¥Â¤â€°Ã¦â€ºÂ´]

Ã¥â€¦Â¨Ã¤Â½â€œ:       [Ã¦Âºâ€“Ã¥â€šâ„¢Ã¥Â®Å’Ã¤Âºâ€  / Ã¦Å“ÂªÃ¥Â®Å’Ã¤Âºâ€ ]

Ã¤Â¿Â®Ã¦Â­Â£Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’:
1. ...
2. ...
```

## Ã§Â¶â„¢Ã§Â¶Å¡Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°

- Ã¥Â¤Â§Ã£ÂÂÃ£ÂÂªÃ¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÅ’Ã£Ââ€šÃ£ÂÂ£Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã©â€¢Â·Ã£Ââ€žÃ£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ§30Ã£â‚¬Å“60Ã¥Ë†â€ Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂºÃ£â€šâ€™Ã¥â€ ÂÃ¥Â®Å¸Ã¨Â¡Å’
- Ã§Å¸Â­Ã£Ââ€žÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã£â€šâ€™Ã§Â¶Â­Ã¦Å’Â: `mvn -T 4 test` + spotbugs Ã£ÂÂ§Ã¨Â¿â€¦Ã©â‚¬Å¸Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯

**Ã¦Â³Â¨Ã¦â€žÂ**: Ã¨Â¿â€¦Ã©â‚¬Å¸Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ¯Ã©Ââ€¦Ã£Ââ€žÃ©Â©Å¡Ã£ÂÂÃ£ÂÂ«Ã¥â€¹ÂÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂ²Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¥Å½Â³Ã¦Â Â¼Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£â‚¬ÂÃ¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã£ÂÂ§Ã£ÂÂ¯Ã¨Â­Â¦Ã¥â€˜Å Ã£â€šâ€™Ã¦Â¬Â Ã©â„¢Â¥Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã¦â€°Â±Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
