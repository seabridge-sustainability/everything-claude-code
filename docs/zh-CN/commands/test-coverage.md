# Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å’Ã¨Â¯â€ Ã¥Ë†Â«Ã§Â¼ÂºÃ¥ÂÂ£Ã¯Â¼Å’Ã¥Â¹Â¶Ã§â€Å¸Ã¦Ë†ÂÃ§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â»Â¥Ã¨Â¾Â¾Ã¥Ë†Â° 80%+ Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 1Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶

| Ã¦Å’â€¡Ã¦Â â€¡ | Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤ |
|-----------|-----------------|
| `jest.config.*` Ã¦Ë†â€“ `package.json` jest | `npx jest --coverage --coverageReporters=json-summary` |
| `vitest.config.*` | `npx vitest run --coverage` |
| `pytest.ini` / `pyproject.toml` pytest | `pytest --cov=src --cov-report=json` |
| `Cargo.toml` | `cargo llvm-cov --json` |
| `pom.xml` Ã¤Â¸Å½ JaCoCo | `mvn test jacoco:report` |
| `go.mod` | `go test -coverprofile=coverage.out ./...` |

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Å Â¥Ã¥â€˜Å 

1. Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤
2. Ã¨Â§Â£Ã¦Å¾ÂÃ¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼Ë†JSON Ã¦â€˜ËœÃ¨Â¦ÂÃ¦Ë†â€“Ã§Â»Ë†Ã§Â«Â¯Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼â€°
3. Ã¥Ë†â€”Ã¥â€¡Âº**Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¤Â½Å½Ã¤ÂºÅ½ 80%** Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¦Å’â€°Ã¦Å“â‚¬Ã¥Â·Â®Ã¦Æ’â€¦Ã¥â€ ÂµÃ¦Å½â€™Ã¥ÂºÂ
4. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¤Â¸ÂÃ¨Â¶Â³Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¨Â¯â€ Ã¥Ë†Â«Ã¯Â¼Å¡
   * Ã¦Å“ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã¦â€“Â¹Ã¦Â³â€¢
   * Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¥Ë†â€ Ã¦â€Â¯Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Ë†if/elseÃ£â‚¬ÂswitchÃ£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼â€°
   * Ã¥Â¢Å¾Ã¥Å Â Ã¥Ë†â€ Ã¦Â¯ÂÃ§Å¡â€žÃ¦Â­Â»Ã¤Â»Â£Ã§Â Â

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3Ã¯Â¼Å¡Ã§â€Å¸Ã¦Ë†ÂÃ§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¤Â¸ÂÃ¨Â¶Â³Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¦Å’â€°Ã¤Â»Â¥Ã¤Â¸â€¹Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡

1. **Ã¥Â¿Â«Ã¤Â¹ÂÃ¨Â·Â¯Ã¥Â¾â€ž** Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“â€°Ã¦â€¢Ë†Ã¨Â¾â€œÃ¥â€¦Â¥Ã§Å¡â€žÃ¦Â Â¸Ã¥Â¿Æ’Ã¥Å Å¸Ã¨Æ’Â½
2. **Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ ** Ã¢â‚¬â€ Ã¦â€”Â Ã¦â€¢Ë†Ã¨Â¾â€œÃ¥â€¦Â¥Ã£â‚¬ÂÃ§Â¼ÂºÃ¥Â¤Â±Ã¦â€¢Â°Ã¦ÂÂ®Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã¦â€¢â€¦Ã©Å¡Å“
3. **Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ Âµ** Ã¢â‚¬â€ Ã§Â©ÂºÃ¦â€¢Â°Ã§Â»â€žÃ£â‚¬Ânull/undefinedÃ£â‚¬ÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¥â‚¬Â¼Ã¯Â¼Ë†0Ã£â‚¬Â-1Ã£â‚¬ÂMAX\_INTÃ¯Â¼â€°
4. **Ã¥Ë†â€ Ã¦â€Â¯Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡** Ã¢â‚¬â€ Ã¦Â¯ÂÃ¤Â¸Âª if/elseÃ£â‚¬Âswitch caseÃ£â‚¬ÂÃ¤Â¸â€°Ã¥â€¦Æ’Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Å¸Ã¦Ë†ÂÃ¨Â§â€žÃ¥Ë†â„¢

* Ã¥Â°â€ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€Â¾Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¦â€”ÂÃ¨Â¾Â¹Ã¯Â¼Å¡`foo.ts` Ã¢â€ â€™ `foo.test.ts`Ã¯Â¼Ë†Ã¦Ë†â€“Ã©ÂÂµÃ¥Â¾ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Æ’Â¯Ã¤Â¾â€¹Ã¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¥Â¯Â¼Ã¥â€¦Â¥Ã©Â£Å½Ã¦Â Â¼Ã£â‚¬ÂÃ¦â€“Â­Ã¨Â¨â‚¬Ã¥Âºâ€œÃ£â‚¬ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼â€°
* Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¯Â¼Ë†Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ£â‚¬ÂAPIÃ£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã¯Â¼â€°
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Æ’Â½Ã¥Âºâ€Ã¨Â¯Â¥Ã¦ËœÂ¯Ã§â€¹Â¬Ã§Â«â€¹Ã§Å¡â€ž Ã¢â‚¬â€ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã©â€”Â´Ã¦Â²Â¡Ã¦Å“â€°Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â
* Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¥Å“Â°Ã¥â€˜Â½Ã¥ÂÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡`test_create_user_with_duplicate_email_returns_409`

## Ã¦Â­Â¥Ã©ÂªÂ¤ 4Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯Â

1. Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶ Ã¢â‚¬â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¿â€¦Ã©Â¡Â»Ã©â‚¬Å¡Ã¨Â¿â€¡
2. Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ Ã¢â‚¬â€ Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€Â¹Ã¨Â¿â€º
3. Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â»ÂÃ§â€žÂ¶Ã¤Â½Å½Ã¤ÂºÅ½ 80%Ã¯Â¼Å’Ã©â€™Ë†Ã¥Â¯Â¹Ã¥â€°Â©Ã¤Â½â„¢Ã§Å¡â€žÃ§Â¼ÂºÃ¥ÂÂ£Ã©â€¡ÂÃ¥Â¤ÂÃ¦Â­Â¥Ã©ÂªÂ¤ 3

## Ã¦Â­Â¥Ã©ÂªÂ¤ 5Ã¯Â¼Å¡Ã¦Å Â¥Ã¥â€˜Å 

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥â€°ÂÃ¥ÂÅ½Ã¥Â¯Â¹Ã¦Â¯â€Ã¯Â¼Å¡

```
Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Å Â¥Ã¥â€˜Å 
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Ã¦â€“â€¡Ã¤Â»Â¶                   Ã¥ÂËœÃ¦â€ºÂ´Ã¥â€°Â  Ã¥ÂËœÃ¦â€ºÂ´Ã¥ÂÅ½
src/services/auth.ts   45%     88%
src/utils/validation.ts 32%    82%
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Ã¦â‚¬Â»Ã¨Â®Â¡Ã¯Â¼Å¡               67%     84%  PASS:
```

## Ã©â€¡ÂÃ§â€šÂ¹Ã¥â€¦Â³Ã¦Â³Â¨Ã©Â¢â€ Ã¥Å¸Å¸

* Ã¥â€¦Â·Ã¦Å“â€°Ã¥Â¤ÂÃ¦Ââ€šÃ¥Ë†â€ Ã¦â€Â¯Ã§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Ë†Ã©Â«ËœÃ¥Å“Ë†Ã¥Â¤ÂÃ¦Ââ€šÃ¥ÂºÂ¦Ã¯Â¼â€°
* Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã§Â¨â€¹Ã¥ÂºÂÃ¥â€™Å’ catch Ã¥Ââ€”
* Ã¦â€¢Â´Ã¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã¥â€¡Â½Ã¦â€¢Â°
* API Ã§Â«Â¯Ã§â€šÂ¹Ã¥Â¤â€žÃ§Ââ€ Ã§Â¨â€¹Ã¥ÂºÂÃ¯Â¼Ë†Ã¨Â¯Â·Ã¦Â±â€š Ã¢â€ â€™ Ã¥â€œÂÃ¥Âºâ€Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼â€°
* Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å¡nullÃ£â‚¬ÂundefinedÃ£â‚¬ÂÃ§Â©ÂºÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã£â‚¬ÂÃ§Â©ÂºÃ¦â€¢Â°Ã§Â»â€žÃ£â‚¬ÂÃ©â€ºÂ¶Ã£â‚¬ÂÃ¨Â´Å¸Ã¦â€¢Â°
