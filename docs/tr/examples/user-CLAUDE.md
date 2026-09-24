# KullanÃ„Â±cÃ„Â± Seviyesi CLAUDE.md Ãƒâ€“rneÃ„Å¸i

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


Bu, ÃƒÂ¶rnek bir kullanÃ„Â±cÃ„Â± seviyesi CLAUDE.md dosyasÃ„Â±dÃ„Â±r. `~/.claude/CLAUDE.md` konumuna yerleÃ…Å¸tirin.

KullanÃ„Â±cÃ„Â± seviyesi konfigÃƒÂ¼rasyonlar tÃƒÂ¼m projeler genelinde global olarak uygulanÃ„Â±r. Ã…Å¾unlar iÃƒÂ§in kullanÃ„Â±n:
- KiÃ…Å¸isel kodlama tercihleri
- Her zaman uygulanmasÃ„Â±nÃ„Â± istediÃ„Å¸iniz evrensel kurallar
- ModÃƒÂ¼ler kurallarÃ„Â±nÃ„Â±za linkler

---

## Temel Felsefe

Sen Claude Code'sun. KarmaÃ…Å¸Ã„Â±k gÃƒÂ¶revler iÃƒÂ§in ÃƒÂ¶zelleÃ…Å¸miÃ…Å¸ agent'lar ve skill'ler kullanÃ„Â±yorum.

**Temel Prensipler:**
1. **Agent-First**: KarmaÃ…Å¸Ã„Â±k iÃ…Å¸ler iÃƒÂ§in ÃƒÂ¶zelleÃ…Å¸miÃ…Å¸ agent'lara delege et
2. **Paralel YÃƒÂ¼rÃƒÂ¼tme**: MÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda Task tool ile birden fazla agent kullan
3. **PlanlayÃ„Â±p Uygula**: KarmaÃ…Å¸Ã„Â±k operasyonlar iÃƒÂ§in Plan Mode kullan
4. **Test-Driven**: Uygulamadan ÃƒÂ¶nce testleri yaz
5. **Security-First**: GÃƒÂ¼venlikten asla taviz verme

---

## ModÃƒÂ¼ler Kurallar

DetaylÃ„Â± yÃƒÂ¶nergeler `~/.claude/rules/` iÃƒÂ§inde:

| Kural DosyasÃ„Â± | Ã„Â°ÃƒÂ§erik |
|---------------|--------|
| security.md | GÃƒÂ¼venlik kontrolleri, secret yÃƒÂ¶netimi |
| coding-style.md | DeÃ„Å¸iÃ…Å¸mezlik, dosya organizasyonu, hata yÃƒÂ¶netimi |
| testing.md | TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±, %80 kapsama gereksinimi |
| git-workflow.md | Commit formatÃ„Â±, PR iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± |
| agents.md | Agent orkestrayonu, hangi agent'Ã„Â±n ne zaman kullanÃ„Â±lacaÃ„Å¸Ã„Â± |
| patterns.md | API response, repository desenleri |
| performance.md | Model seÃƒÂ§imi, context yÃƒÂ¶netimi |
| hooks.md | Hooks Sistemi |

---

## KullanÃ„Â±labilir Agent'lar

`~/.claude/agents/` konumunda bulunur:

| Agent | AmaÃƒÂ§ |
|-------|------|
| planner | Ãƒâ€“zellik uygulama planlamasÃ„Â± |
| architect | Sistem tasarÃ„Â±mÃ„Â± ve mimari |
| tdd-guide | Test-driven development |
| code-reviewer | Kalite/gÃƒÂ¼venlik iÃƒÂ§in kod incelemesi |
| security-reviewer | GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± analizi |
| build-error-resolver | Build hatasÃ„Â± ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼ |
| e2e-runner | Playwright E2E testi |
| refactor-cleaner | Ãƒâ€“lÃƒÂ¼ kod temizliÃ„Å¸i |
| doc-updater | DokÃƒÂ¼mantasyon gÃƒÂ¼ncellemeleri |

---

## KiÃ…Å¸isel Tercihler

### Gizlilik
- LoglarÃ„Â± her zaman redact et; asla secret'larÃ„Â± yapÃ„Â±Ã…Å¸tÃ„Â±rma (API key'ler/token'lar/Ã…Å¸ifreler/JWT'ler)
- PaylaÃ…Å¸madan ÃƒÂ¶nce ÃƒÂ§Ã„Â±ktÃ„Â±yÃ„Â± gÃƒÂ¶zden geÃƒÂ§ir - hassas verileri kaldÃ„Â±r

### Kod Stili
- Kod, yorum veya dokÃƒÂ¼mantasyonda emoji kullanma
- DeÃ„Å¸iÃ…Å¸mezliÃ„Å¸i tercih et - asla obje veya array'leri mutate etme
- BirkaÃƒÂ§ bÃƒÂ¼yÃƒÂ¼k dosya yerine ÃƒÂ§ok sayÃ„Â±da kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k dosya
- Tipik olarak 200-400 satÃ„Â±r, dosya baÃ…Å¸Ã„Â±na maksimum 800 satÃ„Â±r

### Git
- Conventional commit'ler: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Commit'lemeden ÃƒÂ¶nce her zaman yerel olarak test et
- KÃƒÂ¼ÃƒÂ§ÃƒÂ¼k, odaklanmÃ„Â±Ã…Å¸ commit'ler

### Test
- TDD: Ãƒâ€“nce testleri yaz
- Minimum %80 kapsama
- Kritik akÃ„Â±Ã…Å¸lar iÃƒÂ§in unit + integration + E2E

### Bilgi Yakalama
- KiÃ…Å¸isel debugging notlarÃ„Â±, tercihler ve geÃƒÂ§ici baÃ„Å¸lam Ã¢â€ â€™ otomatik bellek
- Ekip/proje bilgisi (mimari kararlar, API deÃ„Å¸iÃ…Å¸iklikleri, uygulama runbook'larÃ„Â±) Ã¢â€ â€™ projenin mevcut dokÃƒÂ¼man yapÃ„Â±sÃ„Â±nÃ„Â± takip et
- Mevcut gÃƒÂ¶rev zaten ilgili dokÃƒÂ¼manlarÃ„Â±, yorumlarÃ„Â± veya ÃƒÂ¶rnekleri ÃƒÂ¼retiyorsa, aynÃ„Â± bilgiyi baÃ…Å¸ka yerde ÃƒÂ§oÃ„Å¸altma
- AÃƒÂ§Ã„Â±k bir proje dokÃƒÂ¼man konumu yoksa, yeni bir ÃƒÂ¼st seviye dokÃƒÂ¼man oluÃ…Å¸turmadan ÃƒÂ¶nce sor

---

## Editor Entegrasyonu

Birincil editÃƒÂ¶r olarak Zed kullanÃ„Â±yorum:
- Dosya takibi iÃƒÂ§in Agent Panel
- Komut paleti iÃƒÂ§in CMD+Shift+R
- Vim modu aktif

---

## BaÃ…Å¸arÃ„Â± Metrikleri

Ã…Å¾u durumlarda baÃ…Å¸arÃ„Â±lÃ„Â±sÃ„Â±n:
- TÃƒÂ¼m testler geÃƒÂ§iyor (%80+ kapsama)
- GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± yok
- Kod okunabilir ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir
- KullanÃ„Â±cÃ„Â± gereksinimleri karÃ…Å¸Ã„Â±lanÃ„Â±yor

---

**Felsefe**: Agent-first tasarÃ„Â±m, paralel yÃƒÂ¼rÃƒÂ¼tme, eylemden ÃƒÂ¶nce plan, koddan ÃƒÂ¶nce test, her zaman gÃƒÂ¼venlik.
