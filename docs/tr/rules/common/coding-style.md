# Kodlama Stili

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


## Immutability (KRÃ„Â°TÃ„Â°K)

DAIMA yeni nesneler oluÃ…Å¸tur, mevcut olanlarÃ„Â± ASLA deÃ„Å¸iÃ…Å¸tirme:

```
// Pseudocode
YANLIÃ…Å¾:  modify(original, field, value) Ã¢â€ â€™ original'i yerinde deÃ„Å¸iÃ…Å¸tirir
DOÃ„Å¾RU: update(original, field, value) Ã¢â€ â€™ deÃ„Å¸iÃ…Å¸iklikle birlikte yeni kopya dÃƒÂ¶ner
```

GerekÃƒÂ§e: Immutable veri gizli yan etkileri ÃƒÂ¶nler, debug'Ã„Â± kolaylaÃ…Å¸tÃ„Â±rÃ„Â±r ve gÃƒÂ¼venli eÃ…Å¸zamanlÃ„Â±lÃ„Â±k saÃ„Å¸lar.

## Dosya Organizasyonu

Ãƒâ€¡OK KÃƒÅ“Ãƒâ€¡ÃƒÅ“K DOSYA > AZ BÃƒÅ“YÃƒÅ“K DOSYA:
- YÃƒÂ¼ksek kohezyon, dÃƒÂ¼Ã…Å¸ÃƒÂ¼k coupling
- Tipik 200-400 satÃ„Â±r, maksimum 800
- BÃƒÂ¼yÃƒÂ¼k modÃƒÂ¼llerden utility'leri ÃƒÂ§Ã„Â±kar
- Type'a gÃƒÂ¶re deÃ„Å¸il, feature/domain'e gÃƒÂ¶re organize et

## Hata YÃƒÂ¶netimi

HatalarÃ„Â± DAIMA kapsamlÃ„Â± bir Ã…Å¸ekilde yÃƒÂ¶net:
- Her seviyede hatalarÃ„Â± aÃƒÂ§Ã„Â±kÃƒÂ§a ele al
- UI'ye yÃƒÂ¶nelik kodda kullanÃ„Â±cÃ„Â± dostu hata mesajlarÃ„Â± ver
- Server tarafÃ„Â±nda detaylÃ„Â± hata baÃ„Å¸lamÃ„Â± logla
- HatalarÃ„Â± asla sessizce yutma

## Input Validasyonu

Sistem sÃ„Â±nÃ„Â±rlarÃ„Â±nda DAIMA validate et:
- Ã„Â°Ã…Å¸lemeden ÃƒÂ¶nce tÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdilerini validate et
- MÃƒÂ¼mkÃƒÂ¼n olan yerlerde schema tabanlÃ„Â± validasyon kullan
- AÃƒÂ§Ã„Â±k hata mesajlarÃ„Â±yla hÃ„Â±zlÃ„Â±ca baÃ…Å¸arÃ„Â±sÃ„Â±z ol
- Harici verilere asla gÃƒÂ¼venme (API yanÃ„Â±tlarÃ„Â±, kullanÃ„Â±cÃ„Â± girdisi, dosya iÃƒÂ§eriÃ„Å¸i)

## Kod Kalitesi Kontrol Listesi

Ã„Â°Ã…Å¸i tamamlandÃ„Â± olarak iÃ…Å¸aretlemeden ÃƒÂ¶nce:
- [ ] Kod okunabilir ve iyi adlandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] Fonksiyonlar kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k (<50 satÃ„Â±r)
- [ ] Dosyalar odaklÃ„Â± (<800 satÃ„Â±r)
- [ ] Derin iÃƒÂ§ iÃƒÂ§e geÃƒÂ§me yok (>4 seviye)
- [ ] DÃƒÂ¼zgÃƒÂ¼n hata yÃƒÂ¶netimi
- [ ] Hardcoded deÃ„Å¸er yok (sabit veya config kullan)
- [ ] Mutasyon yok (immutable pattern'ler kullanÃ„Â±ldÃ„Â±)
