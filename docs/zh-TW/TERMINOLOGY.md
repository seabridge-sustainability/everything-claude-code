# Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¥Â°ÂÃ§â€¦Â§Ã¨Â¡Â¨ (Terminology Glossary)

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


Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â¨ËœÃ©Å’â€žÃ§Â¹ÂÃ©Â«â€Ã¤Â¸Â­Ã¦â€“â€¡Ã§Â¿Â»Ã¨Â­Â¯Ã§Å¡â€žÃ¨Â¡â€œÃ¨ÂªÅ¾Ã¥Â°ÂÃ§â€¦Â§Ã¯Â¼Å’Ã§Â¢ÂºÃ¤Â¿ÂÃ§Â¿Â»Ã¨Â­Â¯Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã£â‚¬â€š

## Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¨ÂªÂªÃ¦ËœÅ½

- **Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂ (Confirmed)**: Ã§Â¶â€œÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã§Â¢ÂºÃ¨ÂªÂÃ§Å¡â€žÃ§Â¿Â»Ã¨Â­Â¯
- **Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ (Pending)**: Ã¥Â¾â€¦Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Â¯Â©Ã¦Â Â¸Ã§Å¡â€žÃ§Â¿Â»Ã¨Â­Â¯

---

## Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¨Â¡Â¨

| English | zh-TW | Ã§â€¹â‚¬Ã¦â€¦â€¹ | Ã¥â€šâ„¢Ã¨Â¨Â» |
|---------|-------|------|------|
| Agent | Agent | Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Hook | Hook | Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Plugin | Ã¥Â¤â€“Ã¦Å½â€º | Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂ | Ã¥ÂÂ°Ã§ÂÂ£Ã¦â€¦Â£Ã§â€Â¨ |
| Token | Token | Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Skill | Ã¦Å â‚¬Ã¨Æ’Â½ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Command | Ã¦Å’â€¡Ã¤Â»Â¤ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Rule | Ã¨Â¦ÂÃ¥â€°â€¡ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| TDD (Test-Driven Development) | TDDÃ¯Â¼Ë†Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¯Â¼â€° | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã©Â¦â€“Ã¦Â¬Â¡Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã©â€“â€¹ |
| E2E (End-to-End) | E2EÃ¯Â¼Ë†Ã§Â«Â¯Ã¥Â°ÂÃ§Â«Â¯Ã¯Â¼â€° | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã©Â¦â€“Ã¦Â¬Â¡Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã©â€“â€¹ |
| API | API | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| CLI | CLI | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| IDE | IDE | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| MCP (Model Context Protocol) | MCP | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Workflow | Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Codebase | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ« | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Coverage | Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Build | Ã¥Â»ÂºÃ§Â½Â® | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Debug | Ã©â„¢Â¤Ã©Å’Â¯ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Deploy | Ã©Æ’Â¨Ã§Â½Â² | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Commit | Commit | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Git Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| PR (Pull Request) | PR | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Branch | Ã¥Ë†â€ Ã¦â€Â¯ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Merge | Ã¥ÂË†Ã¤Â½Âµ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Repository | Ã¥â€žÂ²Ã¥Â­ËœÃ¥ÂºÂ« | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Fork | Fork | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Supabase | Supabase | - | Ã§â€Â¢Ã¥â€œÂÃ¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| Redis | Redis | - | Ã§â€Â¢Ã¥â€œÂÃ¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| Playwright | Playwright | - | Ã§â€Â¢Ã¥â€œÂÃ¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| TypeScript | TypeScript | - | Ã¨ÂªÅ¾Ã¨Â¨â‚¬Ã¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| JavaScript | JavaScript | - | Ã¨ÂªÅ¾Ã¨Â¨â‚¬Ã¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| Go/Golang | Go | - | Ã¨ÂªÅ¾Ã¨Â¨â‚¬Ã¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| React | React | - | Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| Next.js | Next.js | - | Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| PostgreSQL | PostgreSQL | - | Ã§â€Â¢Ã¥â€œÂÃ¥ÂÂÃ§Â¨Â±Ã¤Â¿ÂÃ§â€¢â„¢ |
| RLS (Row Level Security) | RLSÃ¯Â¼Ë†Ã¥Ë†â€”Ã¥Â±Â¤Ã§Â´Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼â€° | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã©Â¦â€“Ã¦Â¬Â¡Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã©â€“â€¹ |
| OWASP | OWASP | - | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| XSS | XSS | - | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| SQL Injection | SQL Ã¦Â³Â¨Ã¥â€¦Â¥ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| CSRF | CSRF | - | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Refactor | Ã©â€¡ÂÃ¦Â§â€¹ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Dead Code | Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Lint/Linter | Lint | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Code Review | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Security Review | Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Â¯Â©Ã¦Å¸Â¥ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Best Practices | Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Edge Case | Ã©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³Â | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Happy Path | Ã¦Â­Â£Ã¥Â¸Â¸Ã¦ÂµÂÃ§Â¨â€¹ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Fallback | Ã¥â€šâ„¢Ã¦ÂÂ´Ã¦â€“Â¹Ã¦Â¡Ë† | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Cache | Ã¥Â¿Â«Ã¥Ââ€“ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Queue | Ã¤Â½â€¡Ã¥Ë†â€” | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Pagination | Ã¥Ë†â€ Ã©Â Â | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Cursor | Ã¦Â¸Â¸Ã¦Â¨â„¢ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Index | Ã§Â´Â¢Ã¥Â¼â€¢ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Schema | Ã§ÂµÂÃ¦Â§â€¹Ã¦ÂÂÃ¨Â¿Â° | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Migration | Ã©ÂÂ·Ã§Â§Â» | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Transaction | Ã¤ÂºÂ¤Ã¦Ëœâ€œ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Concurrency | Ã¤Â¸Â¦Ã¨Â¡Å’ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Goroutine | Goroutine | - | Go Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¤Â¿ÂÃ§â€¢â„¢ |
| Channel | Channel | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Go context Ã¥ÂÂ¯Ã¤Â¿ÂÃ§â€¢â„¢ |
| Mutex | Mutex | - | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Interface | Ã¤Â»â€¹Ã©ÂÂ¢ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Struct | Struct | - | Go Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¤Â¿ÂÃ§â€¢â„¢ |
| Mock | Mock | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¥ÂÂ¯Ã¤Â¿ÂÃ§â€¢â„¢ |
| Stub | Stub | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¥ÂÂ¯Ã¤Â¿ÂÃ§â€¢â„¢ |
| Fixture | Fixture | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¡â€œÃ¨ÂªÅ¾Ã¥ÂÂ¯Ã¤Â¿ÂÃ§â€¢â„¢ |
| Assertion | Ã¦â€“Â·Ã¨Â¨â‚¬ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Snapshot | Ã¥Â¿Â«Ã§â€¦Â§ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Trace | Ã¨Â¿Â½Ã¨Â¹Â¤ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| Artifact | Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â© | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |
| CI/CD | CI/CD | - | Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡ |
| Pipeline | Ã§Â®Â¡Ã§Â·Å¡ | Ã¥Â¾â€¦Ã§Â¢ÂºÃ¨ÂªÂ | |

---

## Ã§Â¿Â»Ã¨Â­Â¯Ã¥Å½Å¸Ã¥â€°â€¡

1. **Ã§â€Â¢Ã¥â€œÂÃ¥ÂÂÃ§Â¨Â±**Ã¯Â¼Å¡Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡Ã¯Â¼Ë†Supabase, Redis, PlaywrightÃ¯Â¼â€°
2. **Ã§Â¨â€¹Ã¥Â¼ÂÃ¨ÂªÅ¾Ã¨Â¨â‚¬**Ã¯Â¼Å¡Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡Ã¯Â¼Ë†TypeScript, Go, JavaScriptÃ¯Â¼â€°
3. **Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥ÂÂÃ§Â¨Â±**Ã¯Â¼Å¡Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡Ã¯Â¼Ë†React, Next.js, VueÃ¯Â¼â€°
4. **Ã¦Å â‚¬Ã¨Â¡â€œÃ§Â¸Â®Ã¥Â¯Â«**Ã¯Â¼Å¡Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡Ã¯Â¼Ë†API, CLI, IDE, MCP, TDD, E2EÃ¯Â¼â€°
5. **Git Ã¨Â¡â€œÃ¨ÂªÅ¾**Ã¯Â¼Å¡Ã¥Â¤Â§Ã¥Â¤Å¡Ã¤Â¿ÂÃ§â€¢â„¢Ã¨â€¹Â±Ã¦â€“â€¡Ã¯Â¼Ë†commit, PR, forkÃ¯Â¼â€°
6. **Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€¦Â§Ã¥Â®Â¹**Ã¯Â¼Å¡Ã¤Â¸ÂÃ§Â¿Â»Ã¨Â­Â¯Ã¯Â¼Ë†Ã¨Â®Å Ã¦â€¢Â¸Ã¥ÂÂÃ£â‚¬ÂÃ¥â€¡Â½Ã¥Â¼ÂÃ¥ÂÂÃ£â‚¬ÂÃ¨Â¨Â»Ã¨Â§Â£Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å½Å¸Ã¦Â¨Â£Ã¯Â¼Å’Ã¤Â½â€ Ã¨ÂªÂªÃ¦ËœÅ½Ã¦â‚¬Â§Ã¨Â¨Â»Ã¨Â§Â£Ã¥ÂÂ¯Ã§Â¿Â»Ã¨Â­Â¯Ã¯Â¼â€°
7. **Ã©Â¦â€“Ã¦Â¬Â¡Ã¥â€¡ÂºÃ§ÂÂ¾**Ã¯Â¼Å¡Ã§Â¸Â®Ã¥Â¯Â«Ã©Â¦â€“Ã¦Â¬Â¡Ã¥â€¡ÂºÃ§ÂÂ¾Ã¦â„¢â€šÃ¥Â±â€¢Ã©â€“â€¹Ã¨ÂªÂªÃ¦ËœÅ½

---

## Ã¦â€ºÂ´Ã¦â€“Â°Ã¨Â¨ËœÃ©Å’â€ž

- 2024-XX-XX: Ã¥Ë†ÂÃ§â€°Ë†Ã¥Â»ÂºÃ§Â«â€¹Ã¯Â¼Å’Ã¥ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Â·Â²Ã§Â¢ÂºÃ¨ÂªÂÃ¨Â¡â€œÃ¨ÂªÅ¾
