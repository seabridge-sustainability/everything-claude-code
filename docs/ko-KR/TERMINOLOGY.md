# Ã¬Å¡Â©Ã¬â€“Â´ Ã«Å’â‚¬Ã¬Â¡Â°Ã­â€˜Å“ (Terminology Glossary)

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


Ã«Â³Â¸ Ã«Â¬Â¸Ã¬â€žÅ“Ã«Å â€ Ã­â€¢Å“ÃªÂµÂ­Ã¬â€“Â´ Ã«Â²Ë†Ã¬â€”Â­Ã¬ÂËœ Ã¬Å¡Â©Ã¬â€“Â´ Ã«Å’â‚¬Ã¬Â¡Â°Ã«Â¥Â¼ ÃªÂ¸Â°Ã«Â¡ÂÃ­â€¢ËœÃ¬â€”Â¬ Ã«Â²Ë†Ã¬â€”Â­ Ã¬ÂÂ¼ÃªÂ´â‚¬Ã¬â€žÂ±Ã¬Ââ€ž Ã«Â³Â´Ã¬Å¾Â¥Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬Æ’ÂÃ­Æ’Å“ Ã¬â€žÂ¤Ã«Âªâ€¦

- **Ã­â„¢â€¢Ã¬Â â€¢ (Confirmed)**: Ã­â„¢â€¢Ã¬Â â€¢Ã«ÂÅ“ Ã«Â²Ë†Ã¬â€”Â­
- **Ã«Â¯Â¸Ã­â„¢â€¢Ã¬Â â€¢ (Pending)**: ÃªÂ²â‚¬Ã­â€ Â  Ã«Å’â‚¬ÃªÂ¸Â° Ã¬Â¤â€˜Ã¬ÂÂ¸ Ã«Â²Ë†Ã¬â€”Â­

---

## Ã¬Å¡Â©Ã¬â€“Â´Ã­â€˜Å“

| English | ko-KR | Ã¬Æ’ÂÃ­Æ’Å“ | Ã«Â¹â€žÃªÂ³Â  |
|---------|-------|------|------|
| Agent | Agent | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Hook | Hook | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Plugin | Ã­â€Å’Ã«Å¸Â¬ÃªÂ·Â¸Ã¬ÂÂ¸ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Token | Token | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Skill | Ã¬Å Â¤Ã­â€šÂ¬ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Command | Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Rule | ÃªÂ·Å“Ã¬Â¹â„¢ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| TDD (Test-Driven Development) | TDD(Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“) | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ÂµÅ“Ã¬Â´Ë† Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“ Ã¬Â â€žÃªÂ°Å“ |
| E2E (End-to-End) | E2E(Ã¬â€”â€Ã«â€œÅ“ Ã­Ë†Â¬ Ã¬â€”â€Ã«â€œÅ“) | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ÂµÅ“Ã¬Â´Ë† Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“ Ã¬Â â€žÃªÂ°Å“ |
| API | API | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| CLI | CLI | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| IDE | IDE | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| MCP (Model Context Protocol) | MCP | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Workflow | Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â° | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Codebase | Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Coverage | Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Build | Ã«Â¹Å’Ã«â€œÅ“ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Debug | Ã«â€â€Ã«Â²â€žÃªÂ·Â¸ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Deploy | Ã«Â°Â°Ã­ÂÂ¬ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Commit | Ã¬Â»Â¤Ã«Â°â€¹ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| PR (Pull Request) | PR | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Branch | Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Merge | merge | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Repository | Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Fork | Fork | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Supabase | Supabase | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬Â Å“Ã­â€™Ë†Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| Redis | Redis | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬Â Å“Ã­â€™Ë†Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| Playwright | Playwright | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬Â Å“Ã­â€™Ë†Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| TypeScript | TypeScript | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬â€“Â¸Ã¬â€“Â´Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| JavaScript | JavaScript | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬â€“Â¸Ã¬â€“Â´Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| Go/Golang | Go | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬â€“Â¸Ã¬â€“Â´Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| React | React | Ã­â„¢â€¢Ã¬Â â€¢ | Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| Next.js | Next.js | Ã­â„¢â€¢Ã¬Â â€¢ | Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| PostgreSQL | PostgreSQL | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬Â Å“Ã­â€™Ë†Ã«Âªâ€¦ Ã¬Å“Â Ã¬Â§â‚¬ |
| RLS (Row Level Security) | RLS(Ã­â€“â€° Ã¬Ë†ËœÃ¬Â¤â‚¬ Ã«Â³Â´Ã¬â€¢Ë†) | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ÂµÅ“Ã¬Â´Ë† Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“ Ã¬Â â€žÃªÂ°Å“ |
| OWASP | OWASP | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| XSS | XSS | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| SQL Injection | SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| CSRF | CSRF | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Refactor | Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Dead Code | Ã«ÂÂ°Ã«â€œÅ“ Ã¬Â½â€Ã«â€œÅ“ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Lint/Linter | Lint | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Code Review | Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â° | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Security Review | Ã«Â³Â´Ã¬â€¢Ë† Ã«Â¦Â¬Ã«Â·Â° | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Best Practices | Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Edge Case | Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Happy Path | Ã­â€¢Â´Ã­â€Â¼ Ã­Å’Â¨Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Fallback | Ã­ÂÂ´Ã«Â°Â± | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Cache | Ã¬ÂºÂÃ¬â€¹Å“ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Queue | Ã­ÂÂ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Pagination | Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬Ã«â€žÂ¤Ã¬ÂÂ´Ã¬â€¦Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Cursor | Ã¬Â»Â¤Ã¬â€žÅ“ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Index | Ã¬ÂÂ¸Ã«ÂÂ±Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Schema | Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë† | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Migration | Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Transaction | Ã­Å Â¸Ã«Å¾Å“Ã¬Å¾Â­Ã¬â€¦Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Concurrency | Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€žÂ± | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Goroutine | Goroutine | Ã­â„¢â€¢Ã¬Â â€¢ | Go Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Å“Â Ã¬Â§â‚¬ |
| Channel | Channel | Ã­â„¢â€¢Ã¬Â â€¢ | Go Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸Ã¬â€”ÂÃ¬â€žÅ“ Ã¬Å“Â Ã¬Â§â‚¬ |
| Mutex | Mutex | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Interface | Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Struct | Struct | Ã­â„¢â€¢Ã¬Â â€¢ | Go Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Å“Â Ã¬Â§â‚¬ |
| Mock | Mock | Ã­â„¢â€¢Ã¬Â â€¢ | Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Å“Â Ã¬Â§â‚¬ |
| Stub | Stub | Ã­â„¢â€¢Ã¬Â â€¢ | Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Å“Â Ã¬Â§â‚¬ |
| Fixture | Fixture | Ã­â„¢â€¢Ã¬Â â€¢ | Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Å“Â Ã¬Â§â‚¬ |
| Assertion | Ã¬â€“Â´Ã¬â€žÂ¤Ã¬â€¦Ëœ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Snapshot | Ã¬Å Â¤Ã«Æ’â€¦Ã¬Æ’Â· | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Trace | Ã­Å Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| Artifact | Ã¬â€¢â€žÃ­â€¹Â°Ã­Å’Â©Ã­Å Â¸ | Ã­â„¢â€¢Ã¬Â â€¢ | |
| CI/CD | CI/CD | Ã­â„¢â€¢Ã¬Â â€¢ | Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ |
| Pipeline | Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸ | Ã­â„¢â€¢Ã¬Â â€¢ | |

---

## Ã«Â²Ë†Ã¬â€”Â­ Ã¬â€ºÂÃ¬Â¹â„¢

1. **Ã¬Â Å“Ã­â€™Ë†Ã«Âªâ€¦**: Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ (Supabase, Redis, Playwright)
2. **Ã­â€â€žÃ«Â¡Å“ÃªÂ·Â¸Ã«Å¾ËœÃ«Â°Â Ã¬â€“Â¸Ã¬â€“Â´**: Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ (TypeScript, Go, JavaScript)
3. **Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬Ã«Âªâ€¦**: Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ (React, Next.js, Vue)
4. **ÃªÂ¸Â°Ã¬Ë†Â  Ã¬â€¢Â½Ã¬â€“Â´**: Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ (API, CLI, IDE, MCP, TDD, E2E)
5. **Git Ã¬Å¡Â©Ã¬â€“Â´**: Ã«Å’â‚¬Ã«Â¶â‚¬Ã«Â¶â€ž Ã¬ËœÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬ (commit, PR, fork)
6. **Ã¬Â½â€Ã«â€œÅ“ Ã«â€šÂ´Ã¬Å¡Â©**: Ã«Â²Ë†Ã¬â€”Â­Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’ (Ã«Â³â‚¬Ã¬Ë†ËœÃ«Âªâ€¦, Ã­â€¢Â¨Ã¬Ë†ËœÃ«Âªâ€¦Ã¬Ââ‚¬ Ã¬â€ºÂÃ«Â¬Â¸ Ã¬Å“Â Ã¬Â§â‚¬, Ã¬â€žÂ¤Ã«Âªâ€¦ Ã¬Â£Â¼Ã¬â€žÂÃ¬Ââ‚¬ Ã«Â²Ë†Ã¬â€”Â­)
7. **Ã¬ÂµÅ“Ã¬Â´Ë† Ã«â€œÂ±Ã¬Å¾Â¥**: Ã¬â€¢Â½Ã¬â€“Â´ Ã¬ÂµÅ“Ã¬Â´Ë† Ã«â€œÂ±Ã¬Å¾Â¥ Ã¬â€¹Å“ Ã¬Â â€žÃªÂ°Å“ Ã¬â€žÂ¤Ã«Âªâ€¦

---

## Ã¬â€”â€¦Ã«ÂÂ°Ã¬ÂÂ´Ã­Å Â¸ ÃªÂ¸Â°Ã«Â¡Â

- 2026-03-10: Ã¬Â´Ë†Ã­Å’Â Ã¬Å¾â€˜Ã¬â€žÂ±, Ã¬Â â€žÃ¬Â²Â´ Ã«Â²Ë†Ã¬â€”Â­ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€šÂ¬Ã¬Å¡Â©Ã«ÂÅ“ Ã¬Å¡Â©Ã¬â€“Â´ Ã¬Â â€¢Ã«Â¦Â¬
