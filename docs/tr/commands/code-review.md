# Code Review

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


Commit edilmemiÃ…Å¸ deÃ„Å¸iÃ…Å¸ikliklerin kapsamlÃ„Â± gÃƒÂ¼venlik ve kalite incelemesi:

1. DeÃ„Å¸iÃ…Å¸en dosyalarÃ„Â± al: git diff --name-only HEAD

2. Her deÃ„Å¸iÃ…Å¸en dosya iÃƒÂ§in Ã…Å¸unlarÃ„Â± kontrol et:

**GÃƒÂ¼venlik SorunlarÃ„Â± (KRÃ„Â°TÃ„Â°K):**
- Hardcode edilmiÃ…Å¸ kimlik bilgileri, API anahtarlarÃ„Â±, token'lar
- SQL injection aÃƒÂ§Ã„Â±klÃ„Â±klarÃ„Â±
- XSS aÃƒÂ§Ã„Â±klÃ„Â±klarÃ„Â±
- Eksik input validasyonu
- GÃƒÂ¼venli olmayan baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar
- Path traversal riskleri

**Kod Kalitesi (YÃƒÅ“KSEK):**
- 50 satÃ„Â±rdan uzun fonksiyonlar
- 800 satÃ„Â±rdan uzun dosyalar
- 4 seviyeden fazla iÃƒÂ§ iÃƒÂ§e geÃƒÂ§me derinliÃ„Å¸i
- Eksik hata yÃƒÂ¶netimi
- console.log ifadeleri
- TODO/FIXME yorumlarÃ„Â±
- Public API'ler iÃƒÂ§in eksik JSDoc

**En Ã„Â°yi Uygulamalar (ORTA):**
- Mutation desenleri (immutable kullanÃ„Â±n)
- Kod/yorumlarda emoji kullanÃ„Â±mÃ„Â±
- Yeni kod iÃƒÂ§in eksik testler
- EriÃ…Å¸ilebilirlik sorunlarÃ„Â± (a11y)

3. Ã…Å¾unlarÃ„Â± iÃƒÂ§eren rapor oluÃ…Å¸tur:
   - Ãƒâ€“nem derecesi: KRÃ„Â°TÃ„Â°K, YÃƒÅ“KSEK, ORTA, DÃƒÅ“Ã…Å¾ÃƒÅ“K
   - Dosya konumu ve satÃ„Â±r numaralarÃ„Â±
   - Sorun aÃƒÂ§Ã„Â±klamasÃ„Â±
   - Ãƒâ€“nerilen dÃƒÂ¼zeltme

4. KRÃ„Â°TÃ„Â°K veya YÃƒÅ“KSEK sorunlar bulunursa commit'i engelle

GÃƒÂ¼venlik aÃƒÂ§Ã„Â±klÃ„Â±klarÃ„Â± olan kodu asla onaylamayÃ„Â±n!
