# GlossÃƒÂ¡rio de Terminologia (TERMINOLOGY)

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


Este documento registra a correspondÃƒÂªncia de termos utilizados nas traduÃƒÂ§ÃƒÂµes para portuguÃƒÂªs brasileiro (pt-BR), garantindo consistÃƒÂªncia.

## Status

- **Confirmado**: TraduÃƒÂ§ÃƒÂ£o confirmada
- **Pendente**: Aguardando revisÃƒÂ£o

---

## Tabela de Termos

| English | pt-BR | Status | ObservaÃƒÂ§ÃƒÂµes |
|---------|-------|--------|-------------|
| Agent | Agent | Confirmado | Manter em inglÃƒÂªs |
| Hook | Hook | Confirmado | Manter em inglÃƒÂªs |
| Plugin | Plugin | Confirmado | Manter em inglÃƒÂªs |
| Token | Token | Confirmado | Manter em inglÃƒÂªs |
| Skill | Skill | Confirmado | Manter em inglÃƒÂªs |
| Command | Comando | Confirmado | |
| Rule | Regra | Confirmado | |
| TDD (Test-Driven Development) | TDD (Desenvolvimento Orientado a Testes) | Confirmado | Expandir na primeira ocorrÃƒÂªncia |
| E2E (End-to-End) | E2E (ponta a ponta) | Confirmado | Expandir na primeira ocorrÃƒÂªncia |
| API | API | Confirmado | Manter em inglÃƒÂªs |
| CLI | CLI | Confirmado | Manter em inglÃƒÂªs |
| IDE | IDE | Confirmado | Manter em inglÃƒÂªs |
| MCP (Model Context Protocol) | MCP | Confirmado | Manter em inglÃƒÂªs |
| Workflow | Fluxo de trabalho | Confirmado | |
| Codebase | Base de cÃƒÂ³digo | Confirmado | |
| Coverage | Cobertura | Confirmado | |
| Build | Build | Confirmado | Manter em inglÃƒÂªs |
| Debug | Debug / DepuraÃƒÂ§ÃƒÂ£o | Confirmado | |
| Deploy | ImplantaÃƒÂ§ÃƒÂ£o | Confirmado | |
| Commit | Commit | Confirmado | Manter em inglÃƒÂªs |
| PR (Pull Request) | PR | Confirmado | Manter em inglÃƒÂªs |
| Branch | Branch | Confirmado | Manter em inglÃƒÂªs |
| Merge | Merge | Confirmado | Manter em inglÃƒÂªs |
| Repository | RepositÃƒÂ³rio | Confirmado | |
| Fork | Fork | Confirmado | Manter em inglÃƒÂªs |
| Supabase | Supabase | Confirmado | Nome de produto |
| Redis | Redis | Confirmado | Nome de produto |
| Playwright | Playwright | Confirmado | Nome de produto |
| TypeScript | TypeScript | Confirmado | Nome de linguagem |
| JavaScript | JavaScript | Confirmado | Nome de linguagem |
| Go/Golang | Go | Confirmado | Nome de linguagem |
| React | React | Confirmado | Nome de framework |
| Next.js | Next.js | Confirmado | Nome de framework |
| PostgreSQL | PostgreSQL | Confirmado | Nome de produto |
| RLS (Row Level Security) | RLS (SeguranÃƒÂ§a em NÃƒÂ­vel de Linha) | Confirmado | Expandir na primeira ocorrÃƒÂªncia |
| OWASP | OWASP | Confirmado | Manter em inglÃƒÂªs |
| XSS | XSS | Confirmado | Manter em inglÃƒÂªs |
| SQL Injection | InjeÃƒÂ§ÃƒÂ£o SQL | Confirmado | |
| CSRF | CSRF | Confirmado | Manter em inglÃƒÂªs |
| Refactor | RefatoraÃƒÂ§ÃƒÂ£o | Confirmado | |
| Dead Code | CÃƒÂ³digo morto | Confirmado | |
| Lint/Linter | Lint | Confirmado | Manter em inglÃƒÂªs |
| Code Review | RevisÃƒÂ£o de cÃƒÂ³digo | Confirmado | |
| Security Review | RevisÃƒÂ£o de seguranÃƒÂ§a | Confirmado | |
| Best Practices | Melhores prÃƒÂ¡ticas | Confirmado | |
| Edge Case | Caso extremo | Confirmado | |
| Happy Path | Caminho feliz | Confirmado | |
| Fallback | Fallback | Confirmado | Manter em inglÃƒÂªs |
| Cache | Cache | Confirmado | Manter em inglÃƒÂªs |
| Queue | Fila | Confirmado | |
| Pagination | PaginaÃƒÂ§ÃƒÂ£o | Confirmado | |
| Cursor | Cursor | Confirmado | |
| Index | ÃƒÂndice | Confirmado | |
| Schema | Schema | Confirmado | Manter em inglÃƒÂªs |
| Migration | MigraÃƒÂ§ÃƒÂ£o | Confirmado | |
| Transaction | TransaÃƒÂ§ÃƒÂ£o | Confirmado | |
| Concurrency | ConcorrÃƒÂªncia | Confirmado | |
| Goroutine | Goroutine | Confirmado | Termo Go |
| Channel | Channel | Confirmado | No contexto Go |
| Mutex | Mutex | Confirmado | Manter em inglÃƒÂªs |
| Interface | Interface | Confirmado | |
| Struct | Struct | Confirmado | Termo Go |
| Mock | Mock | Confirmado | Termo de teste |
| Stub | Stub | Confirmado | Termo de teste |
| Fixture | Fixture | Confirmado | Termo de teste |
| Assertion | AsserÃƒÂ§ÃƒÂ£o | Confirmado | |
| Snapshot | Snapshot | Confirmado | Manter em inglÃƒÂªs |
| Trace | Trace | Confirmado | Manter em inglÃƒÂªs |
| Artifact | Artefato | Confirmado | |
| CI/CD | CI/CD | Confirmado | Manter em inglÃƒÂªs |
| Pipeline | Pipeline | Confirmado | Manter em inglÃƒÂªs |
| Harness | Harness | Confirmado | Manter em inglÃƒÂªs (contexto especÃƒÂ­fico) |
| Instinct | Instinct | Confirmado | Manter em inglÃƒÂªs (contexto ECC) |

---

## PrincÃƒÂ­pios de TraduÃƒÂ§ÃƒÂ£o

1. **Nomes de produto**: Manter em inglÃƒÂªs (Supabase, Redis, Playwright)
2. **Linguagens de programaÃƒÂ§ÃƒÂ£o**: Manter em inglÃƒÂªs (TypeScript, Go, JavaScript)
3. **Nomes de frameworks**: Manter em inglÃƒÂªs (React, Next.js, Vue)
4. **Siglas tÃƒÂ©cnicas**: Manter em inglÃƒÂªs (API, CLI, IDE, MCP, TDD, E2E)
5. **Termos Git**: Manter em inglÃƒÂªs na maioria (commit, PR, fork)
6. **ConteÃƒÂºdo de cÃƒÂ³digo**: NÃƒÂ£o traduzir (nomes de variÃƒÂ¡veis, funÃƒÂ§ÃƒÂµes mantidos no original; comentÃƒÂ¡rios explicativos traduzidos)
7. **Primeira apariÃƒÂ§ÃƒÂ£o**: Siglas devem ser expandidas na primeira ocorrÃƒÂªncia

---
