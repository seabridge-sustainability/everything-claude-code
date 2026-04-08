# YaygÃ„Â±n Pattern'ler

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Skeleton Projeler

Yeni fonksiyonellik uygulanÃ„Â±rken:
1. Test edilmiÃ…Å¸ skeleton projeler ara
2. SeÃƒÂ§enekleri deÃ„Å¸erlendirmek iÃƒÂ§in paralel agent'lar kullan:
   - GÃƒÂ¼venlik deÃ„Å¸erlendirmesi
   - GeniÃ…Å¸letilebilirlik analizi
   - Ã„Â°lgililik puanlamasÃ„Â±
   - Uygulama planlamasÃ„Â±
3. En iyi eÃ…Å¸leÃ…Å¸meyi temel olarak klonla
4. KanÃ„Â±tlanmÃ„Â±Ã…Å¸ yapÃ„Â± iÃƒÂ§inde iterate et

## TasarÃ„Â±m Pattern'leri

### Repository Pattern

Veri eriÃ…Å¸imini tutarlÃ„Â± bir arayÃƒÂ¼z arkasÃ„Â±nda kapsÃƒÂ¼lle:
- Standart iÃ…Å¸lemleri tanÃ„Â±mla: findAll, findById, create, update, delete
- Concrete implementasyonlar storage detaylarÃ„Â±nÃ„Â± ele alÃ„Â±r (database, API, file, vb.)
- Business logic storage mekanizmasÃ„Â± yerine abstract interface'e baÃ„Å¸lÃ„Â±dÃ„Â±r
- Veri kaynaklarÃ„Â±nÃ„Â±n kolay deÃ„Å¸iÃ…Å¸tirilmesini saÃ„Å¸lar ve mock'larla testi basitleÃ…Å¸tirir

### API Response FormatÃ„Â±

TÃƒÂ¼m API yanÃ„Â±tlarÃ„Â± iÃƒÂ§in tutarlÃ„Â± bir zarf kullan:
- Success/status gÃƒÂ¶stergesi ekle
- Data payload ekle (hata durumunda nullable)
- Hata mesajÃ„Â± alanÃ„Â± ekle (baÃ…Å¸arÃ„Â± durumunda nullable)
- SayfalandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ yanÃ„Â±tlar iÃƒÂ§in metadata ekle (total, page, limit)
