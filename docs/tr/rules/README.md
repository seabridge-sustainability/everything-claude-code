# Kurallar (Rules)

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


Claude Code iÃƒÂ§in kodlama kurallarÃ„Â± ve en iyi uygulamalar.

## Dizin YapÃ„Â±sÃ„Â±

### Common (Dile BaÃ„Å¸Ã„Â±msÃ„Â±z Kurallar)

TÃƒÂ¼m programlama dillerine uygulanan temel kurallar:

- **agents.md** - Agent orkestrasyonu ve kullanÃ„Â±mÃ„Â±
- **coding-style.md** - Genel kodlama stili kurallarÃ„Â± (immutability, dosya organizasyonu, hata yÃƒÂ¶netimi)
- **development-workflow.md** - Ãƒâ€“zellik geliÃ…Å¸tirme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± (araÃ…Å¸tÃ„Â±rma, planlama, TDD, kod incelemesi)
- **git-workflow.md** - Git commit ve PR iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- **hooks.md** - Hook sistemi (PreToolUse, PostToolUse, Stop)
- **patterns.md** - YaygÃ„Â±n tasarÃ„Â±m pattern'leri (Repository, API Response Format)
- **performance.md** - Performans optimizasyonu (model seÃƒÂ§imi, context window yÃƒÂ¶netimi)
- **security.md** - GÃƒÂ¼venlik kurallarÃ„Â± (secret yÃƒÂ¶netimi, gÃƒÂ¼venlik kontrolleri)
- **testing.md** - Test gereksinimleri (TDD, minimum %80 coverage)

### TypeScript/JavaScript

TypeScript ve JavaScript projeleri iÃƒÂ§in ÃƒÂ¶zel kurallar:

- **coding-style.md** - Tip sistemleri, immutability, hata yÃƒÂ¶netimi, input validasyonu
- **hooks.md** - Prettier, TypeScript check, console.log uyarÃ„Â±larÃ„Â±
- **patterns.md** - API response format, custom hooks, repository pattern
- **security.md** - Secret yÃƒÂ¶netimi, environment variable'lar
- **testing.md** - Playwright E2E testing

### Python

Python projeleri iÃƒÂ§in ÃƒÂ¶zel kurallar:

- **coding-style.md** - PEP 8, type annotation'lar, immutability, formatlama araÃƒÂ§larÃ„Â±
- **hooks.md** - black/ruff formatlama, mypy/pyright tip kontrolÃƒÂ¼
- **patterns.md** - Protocol (duck typing), dataclass'lar, context manager'lar
- **security.md** - Secret yÃƒÂ¶netimi, bandit gÃƒÂ¼venlik taramasÃ„Â±
- **testing.md** - pytest framework, coverage, test organizasyonu

### Golang

Go projeleri iÃƒÂ§in ÃƒÂ¶zel kurallar:

- **coding-style.md** - gofmt/goimports, tasarÃ„Â±m ilkeleri, hata yÃƒÂ¶netimi
- **hooks.md** - gofmt/goimports formatlama, go vet, staticcheck
- **patterns.md** - Functional options, kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k interface'ler, dependency injection
- **security.md** - Secret yÃƒÂ¶netimi, gosec gÃƒÂ¼venlik taramasÃ„Â±, context & timeout'lar
- **testing.md** - Table-driven testler, race detection, coverage

## KullanÃ„Â±m

Bu kurallar Claude Code tarafÃ„Â±ndan otomatik olarak yÃƒÂ¼klenir ve uygulanÃ„Â±r. Kurallar:

1. **Dile baÃ„Å¸Ã„Â±msÃ„Â±z** - `common/` dizinindeki kurallar tÃƒÂ¼m projeler iÃƒÂ§in geÃƒÂ§erlidir
2. **Dile ÃƒÂ¶zgÃƒÂ¼** - Ã„Â°lgili dil dizinindeki kurallar (typescript/, python/, golang/) common kurallarÃ„Â± geniÃ…Å¸letir
3. **Path tabanlÃ„Â±** - Kurallar YAML frontmatter'daki path pattern'leri ile eÃ…Å¸leÃ…Å¸en dosyalara uygulanÃ„Â±r

## Orijinal DokÃƒÂ¼mantasyon

Bu dokÃƒÂ¼mantasyonun Ã„Â°ngilizce orijinali `rules/` dizininde bulunmaktadÃ„Â±r.
