# GeliÃ…Å¸tirme BaÃ„Å¸lamÃ„Â±

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


Mod: Aktif geliÃ…Å¸tirme
Odak: Uygulama, kodlama, ÃƒÂ¶zellik geliÃ…Å¸tirme

## DavranÃ„Â±Ã…Å¸
- Ãƒâ€“nce kod yaz, sonra aÃƒÂ§Ã„Â±kla
- MÃƒÂ¼kemmel ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler yerine ÃƒÂ§alÃ„Â±Ã…Å¸an ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mleri tercih et
- DeÃ„Å¸iÃ…Å¸ikliklerden sonra testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- Commit'leri atomik tut

## Ãƒâ€“ncelikler
1. Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r hale getir
2. DoÃ„Å¸ru hale getir
3. Temiz hale getir

## Tercih edilecek araÃƒÂ§lar
- Kod deÃ„Å¸iÃ…Å¸iklikleri iÃƒÂ§in Edit, Write
- Test/build ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmak iÃƒÂ§in Bash
- Kod bulmak iÃƒÂ§in Grep, Glob
