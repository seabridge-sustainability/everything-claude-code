# Kurallar (Rules)

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
