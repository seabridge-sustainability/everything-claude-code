# GÃƒÂ¼venlik KurallarÃ„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Zorunlu GÃƒÂ¼venlik Kontrolleri

HERHANGÃ„Â° bir commit'ten ÃƒÂ¶nce:
- [ ] Hardcoded secret yok (API anahtarlarÃ„Â±, Ã…Å¸ifreler, token'lar)
- [ ] TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdileri validate edildi
- [ ] SQL injection ÃƒÂ¶nleme (parametreli sorgular)
- [ ] XSS ÃƒÂ¶nleme (sanitize edilmiÃ…Å¸ HTML)
- [ ] CSRF korumasÃ„Â± etkin
- [ ] Authentication/authorization doÃ„Å¸rulandÃ„Â±
- [ ] TÃƒÂ¼m endpoint'lerde rate limiting
- [ ] Hata mesajlarÃ„Â± hassas veri sÃ„Â±zdÃ„Â±rmÃ„Â±yor

## Secret YÃƒÂ¶netimi

- Kaynak kodda ASLA secret'larÃ„Â± hardcode etme
- DAIMA environment variable'lar veya secret manager kullan
- BaÃ…Å¸langÃ„Â±ÃƒÂ§ta gerekli secret'larÃ„Â±n mevcut olduÃ„Å¸unu validate et
- Ã„Â°fÃ…Å¸a olmuÃ…Å¸ olabilecek secret'larÃ„Â± rotate et

## GÃƒÂ¼venlik YanÃ„Â±t ProtokolÃƒÂ¼

GÃƒÂ¼venlik sorunu bulunursa:
1. HEMEN DUR
2. **security-reviewer** agent kullan
3. Devam etmeden ÃƒÂ¶nce CRITICAL sorunlarÃ„Â± dÃƒÂ¼zelt
4. Ã„Â°fÃ…Å¸a olmuÃ…Å¸ secret'larÃ„Â± rotate et
5. Benzer sorunlar iÃƒÂ§in tÃƒÂ¼m kod tabanÃ„Â±nÃ„Â± incele
