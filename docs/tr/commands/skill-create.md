---
name: skill-create
description: Kodlama desenlerini çıkarmak ve SKILL.md dosyaları oluşturmak için yerel git geçmişini analiz et. Skill Creator GitHub App'ın yerel versiyonu.
allowed-tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /skill-create - Yerel Skill OluÃ…Å¸turma

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


Repository'nizin git geÃƒÂ§miÃ…Å¸ini analiz ederek kodlama desenlerini ÃƒÂ§Ã„Â±karÃ„Â±n ve Claude'a ekibinizin uygulamalarÃ„Â±nÃ„Â± ÃƒÂ¶Ã„Å¸reten SKILL.md dosyalarÃ„Â± oluÃ…Å¸turun.

## KullanÃ„Â±m

```bash
/skill-create                    # Mevcut repo'yu analiz et
/skill-create --commits 100      # Son 100 commit'i analiz et
/skill-create --output ./skills  # Ãƒâ€“zel ÃƒÂ§Ã„Â±ktÃ„Â± dizini
/skill-create --instincts        # continuous-learning-v2 iÃƒÂ§in instinct'ler de oluÃ…Å¸tur
```

## Ne Yapar

1. **Git GeÃƒÂ§miÃ…Å¸ini Parse Eder** - Commit'leri, dosya deÃ„Å¸iÃ…Å¸ikliklerini ve desenleri analiz eder
2. **Desenleri Tespit Eder** - Tekrarlayan iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±nÃ„Â± ve kurallarÃ„Â± tanÃ„Â±mlar
3. **SKILL.md OluÃ…Å¸turur** - GeÃƒÂ§erli Claude Code skill dosyalarÃ„Â± oluÃ…Å¸turur
4. **Ã„Â°steÃ„Å¸e BaÃ„Å¸lÃ„Â± Instinct'ler OluÃ…Å¸turur** - continuous-learning-v2 sistemi iÃƒÂ§in

## Analiz AdÃ„Â±mlarÃ„Â±

### AdÃ„Â±m 1: Git Verilerini Topla

```bash
# Dosya deÃ„Å¸iÃ…Å¸iklikleriyle son commit'leri al
git log --oneline -n ${COMMITS:-200} --name-only --pretty=format:"%H|%s|%ad" --date=short

# Dosyaya gÃƒÂ¶re commit sÃ„Â±klÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± al
git log --oneline -n 200 --name-only | grep -v "^$" | grep -v "^[a-f0-9]" | sort | uniq -c | sort -rn | head -20

# Commit mesaj desenlerini al
git log --oneline -n 200 | cut -d' ' -f2- | head -50
```

### AdÃ„Â±m 2: Desenleri Tespit Et

Bu desen tÃƒÂ¼rlerini ara:

| Desen | Tespit YÃƒÂ¶ntemi |
|---------|-----------------|
| **Commit kurallarÃ„Â±** | Commit mesajlarÃ„Â±nda regex (feat:, fix:, chore:) |
| **Dosya birlikte deÃ„Å¸iÃ…Å¸imleri** | Her zaman birlikte deÃ„Å¸iÃ…Å¸en dosyalar |
| **Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â± dizileri** | Tekrarlanan dosya deÃ„Å¸iÃ…Å¸im desenleri |
| **Mimari** | KlasÃƒÂ¶r yapÃ„Â±sÃ„Â± ve isimlendirme kurallarÃ„Â± |
| **Test desenleri** | Test dosya konumlarÃ„Â±, isimlendirme, kapsama |

### AdÃ„Â±m 3: SKILL.md OluÃ…Å¸tur

Ãƒâ€¡Ã„Â±ktÃ„Â± formatÃ„Â±:

```markdown
---
name: {repo-name}-patterns
description: {repo-name}'den ÃƒÂ§Ã„Â±karÃ„Â±lan kodlama desenleri
version: 1.0.0
source: local-git-analysis
analyzed_commits: {count}
---

# {Repo Name} Desenleri

## Commit KurallarÃ„Â±
{tespit edilen commit mesaj desenleri}

## Kod Mimarisi
{tespit edilen klasÃƒÂ¶r yapÃ„Â±sÃ„Â± ve organizasyon}

## Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸larÃ„Â±
{tespit edilen tekrarlayan dosya deÃ„Å¸iÃ…Å¸im desenleri}

## Test Desenleri
{tespit edilen test kurallarÃ„Â±}
```

### AdÃ„Â±m 4: Instinct'ler OluÃ…Å¸tur (--instincts varsa)

continuous-learning-v2 entegrasyonu iÃƒÂ§in:

```yaml
---
id: {repo}-commit-convention
trigger: "bir commit mesajÃ„Â± yazarken"
confidence: 0.8
domain: git
source: local-repo-analysis
---

# Conventional Commits Kullan

## Aksiyon
Commit'leri Ã…Å¸u ÃƒÂ¶neklerle baÃ…Å¸lat: feat:, fix:, chore:, docs:, test:, refactor:

## KanÃ„Â±t
- {n} commit analiz edildi
- {percentage}% conventional commit formatÃ„Â±nÃ„Â± takip ediyor
```

## Ãƒâ€“rnek Ãƒâ€¡Ã„Â±ktÃ„Â±

Bir TypeScript projesinde `/skill-create` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmak Ã…Å¸unlarÃ„Â± ÃƒÂ¼retebilir:

```markdown
---
name: my-app-patterns
description: my-app repository'sinden kodlama desenleri
version: 1.0.0
source: local-git-analysis
analyzed_commits: 150
---

# My App Desenleri

## Commit KurallarÃ„Â±

Bu proje **conventional commits** kullanÃ„Â±yor:
- `feat:` - Yeni ÃƒÂ¶zellikler
- `fix:` - Hata dÃƒÂ¼zeltmeleri
- `chore:` - BakÃ„Â±m gÃƒÂ¶revleri
- `docs:` - DokÃƒÂ¼mantasyon gÃƒÂ¼ncellemeleri

## Kod Mimarisi

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/     # React componentleri (PascalCase.tsx)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/          # Ãƒâ€“zel hook'lar (use*.ts)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/          # YardÃ„Â±mcÃ„Â± fonksiyonlar
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ types/          # TypeScript tip tanÃ„Â±mlarÃ„Â±
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ services/       # API ve harici servisler
```

## Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸larÃ„Â±

### Yeni Bir Component Ekleme
1. `src/components/ComponentName.tsx` oluÃ…Å¸tur
2. `src/components/__tests__/ComponentName.test.tsx`'de testler ekle
3. `src/components/index.ts`'den export et

### Database Migration
1. `src/db/schema.ts`'yi deÃ„Å¸iÃ…Å¸tir
2. `pnpm db:generate` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
3. `pnpm db:migrate` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r

## Test Desenleri

- Test dosyalarÃ„Â±: `__tests__/` dizinleri veya `.test.ts` eki
- Kapsama hedefi: 80%+
- Framework: Vitest
```

## GitHub App Entegrasyonu

GeliÃ…Å¸miÃ…Å¸ ÃƒÂ¶zellikler iÃƒÂ§in (10k+ commit, ekip paylaÃ…Å¸Ã„Â±mÃ„Â±, otomatik PR'lar), [Skill Creator GitHub App](https://github.com/apps/skill-creator) kullanÃ„Â±n:

- YÃƒÂ¼kle: [github.com/apps/skill-creator](https://github.com/apps/skill-creator)
- Herhangi bir issue'da `/skill-creator analyze` yorumu yap
- OluÃ…Å¸turulan skill'lerle PR alÃ„Â±n

## Ã„Â°lgili Komutlar

- `/instinct-import` - OluÃ…Å¸turulan instinct'leri import et
- `/instinct-status` - Ãƒâ€“Ã„Å¸renilen instinct'leri gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
- `/evolve` - Instinct'leri skill'ler/agent'lara kÃƒÂ¼melendir

---

*[Everything Claude Code](https://github.com/affaan-m/everything-claude-code)'un bir parÃƒÂ§asÃ„Â±*
