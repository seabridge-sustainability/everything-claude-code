# KullanÃ„Â±cÃ„Â± Seviyesi CLAUDE.md Ãƒâ€“rneÃ„Å¸i

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
