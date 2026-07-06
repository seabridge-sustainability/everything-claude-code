# Ãƒâ€“rnek KonfigÃƒÂ¼rasyon DosyalarÃ„Â±

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
