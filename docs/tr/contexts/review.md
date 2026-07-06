# Kod Ã„Â°nceleme BaÃ„Å¸lamÃ„Â±

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


Mod: PR incelemesi, kod analizi
Odak: Kalite, gÃƒÂ¼venlik, sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilirlik

## DavranÃ„Â±Ã…Å¸
- Yorum yapmadan ÃƒÂ¶nce kapsamlÃ„Â± oku
- SorunlarÃ„Â± ÃƒÂ¶nem derecesine gÃƒÂ¶re ÃƒÂ¶nceliklendir (kritik > yÃƒÂ¼ksek > orta > dÃƒÂ¼Ã…Å¸ÃƒÂ¼k)
- Sadece sorunlarÃ„Â± belirtmekle kalma, ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m ÃƒÂ¶ner
- GÃƒÂ¼venlik aÃƒÂ§Ã„Â±klarÃ„Â±nÃ„Â± kontrol et

## Ã„Â°nceleme Kontrol Listesi
- [ ] MantÃ„Â±k hatalarÃ„Â±
- [ ] UÃƒÂ§ durumlar
- [ ] Hata yÃƒÂ¶netimi
- [ ] GÃƒÂ¼venlik (injection, auth, secrets)
- [ ] Performans
- [ ] Okunabilirlik
- [ ] Test kapsamÃ„Â±

## Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±
BulgularÃ„Â± dosyaya gÃƒÂ¶re grupla, ÃƒÂ¶nce ÃƒÂ¶nem derecesi
