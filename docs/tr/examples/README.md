# Ãƒâ€“rnek KonfigÃƒÂ¼rasyon DosyalarÃ„Â±

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


Bu dizin, Claude Code iÃƒÂ§in ÃƒÂ¶rnek konfigÃƒÂ¼rasyon dosyalarÃ„Â±nÃ„Â± iÃƒÂ§erir.

## Dosyalar

### CLAUDE.md
Proje seviyesi konfigÃƒÂ¼rasyon dosyasÃ„Â± ÃƒÂ¶rneÃ„Å¸i. Bu dosyayÃ„Â± proje kÃƒÂ¶k dizininize yerleÃ…Å¸tirin.

**Ã„Â°ÃƒÂ§erik:**
- Proje genel bakÃ„Â±Ã…Å¸
- Kritik kurallar (kod organizasyonu, stil, test, gÃƒÂ¼venlik)
- Dosya yapÃ„Â±sÃ„Â±
- Temel desenler
- Environment variable'lar
- KullanÃ„Â±labilir komutlar
- Git iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±

**Konum:** `<proje-kÃƒÂ¶k>/CLAUDE.md`

### user-CLAUDE.md
KullanÃ„Â±cÃ„Â± seviyesi konfigÃƒÂ¼rasyon dosyasÃ„Â± ÃƒÂ¶rneÃ„Å¸i. Bu, tÃƒÂ¼m projelerinizde geÃƒÂ§erli olan global ayarlarÃ„Â±nÃ„Â±zdÃ„Â±r.

**Ã„Â°ÃƒÂ§erik:**
- Temel felsefe ve prensipler
- ModÃƒÂ¼ler kurallar
- KullanÃ„Â±labilir agent'lar
- KiÃ…Å¸isel tercihler (gizlilik, kod stili, git, test)
- Bilgi yakalama stratejisi
- Editor entegrasyonu
- BaÃ…Å¸arÃ„Â± metrikleri

**Konum:** `~/.claude/CLAUDE.md`

### statusline.json
Ãƒâ€“zel durum satÃ„Â±rÃ„Â± konfigÃƒÂ¼rasyonu. Claude Code'un terminal arayÃƒÂ¼zÃƒÂ¼nde gÃƒÂ¶sterilen durum satÃ„Â±rÃ„Â±nÃ„Â± ÃƒÂ¶zelleÃ…Å¸tirir.

**Ãƒâ€“zellikler:**
- KullanÃ„Â±cÃ„Â± adÃ„Â± ve ÃƒÂ§alÃ„Â±Ã…Å¸ma dizini
- Git branch ve dirty status
- Kalan context yÃƒÂ¼zdesi
- Model adÃ„Â±
- Saat
- Todo sayÃ„Â±sÃ„Â±

**Konum:** `~/.claude/settings.json` iÃƒÂ§ine ekleyin

## KullanÃ„Â±m

### Proje Seviyesi KonfigÃƒÂ¼rasyon
```bash
# Proje kÃƒÂ¶k dizininize kopyalayÃ„Â±n
cp docs/tr/examples/CLAUDE.md ./CLAUDE.md
# Ã„Â°ÃƒÂ§eriÃ„Å¸i projenize gÃƒÂ¶re dÃƒÂ¼zenleyin
```

### KullanÃ„Â±cÃ„Â± Seviyesi KonfigÃƒÂ¼rasyon
```bash
# Ana dizininize kopyalayÃ„Â±n
mkdir -p ~/.claude
cp docs/tr/examples/user-CLAUDE.md ~/.claude/CLAUDE.md
# KiÃ…Å¸isel tercihlerinize gÃƒÂ¶re dÃƒÂ¼zenleyin
```

### Status Line KonfigÃƒÂ¼rasyonu
```bash
# settings.json dosyanÃ„Â±za ekleyin
cat docs/tr/examples/statusline.json >> ~/.claude/settings.json
```

## Notlar

- KonfigÃƒÂ¼rasyon dosyalarÃ„Â± Markdown formatÃ„Â±ndadÃ„Â±r
- Teknik terimler Ã„Â°ngilizce bÃ„Â±rakÃ„Â±lmÃ„Â±Ã…Å¸tÃ„Â±r
- KonfigÃƒÂ¼rasyon syntax'Ã„Â± deÃ„Å¸iÃ…Å¸memiÃ…Å¸tir
- Sadece aÃƒÂ§Ã„Â±klamalar ve yorumlar TÃƒÂ¼rkÃƒÂ§e'ye ÃƒÂ§evrilmiÃ…Å¸tir

## Ã„Â°lgili Kaynaklar

- [Ana DokÃƒÂ¼mantasyon](../README.md)
