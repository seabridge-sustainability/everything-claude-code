# GlossÃƒÂ¡rio de Terminologia (TERMINOLOGY)

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
