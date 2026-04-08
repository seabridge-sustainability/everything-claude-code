# AraÃ…Å¸tÃ„Â±rma BaÃ„Å¸lamÃ„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Mod: KeÃ…Å¸if, inceleme, ÃƒÂ¶Ã„Å¸renme
Odak: Harekete geÃƒÂ§meden ÃƒÂ¶nce anlama

## DavranÃ„Â±Ã…Å¸
- Sonuca varmadan ÃƒÂ¶nce geniÃ…Å¸ kapsamlÃ„Â± oku
- AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± sorular sor
- Ã„Â°lerledikÃƒÂ§e bulgularÃ„Â± belge
- AnlayÃ„Â±Ã…Å¸ netleÃ…Å¸ene kadar kod yazma

## AraÃ…Å¸tÃ„Â±rma SÃƒÂ¼reci
1. Soruyu anla
2. Ã„Â°lgili kod/belgeleri keÃ…Å¸fet
3. Hipotez oluÃ…Å¸tur
4. KanÃ„Â±tlarla doÃ„Å¸rula
5. BulgularÃ„Â± ÃƒÂ¶zetle

## Tercih edilecek araÃƒÂ§lar
- Kodu anlamak iÃƒÂ§in Read
- KalÃ„Â±plarÃ„Â± bulmak iÃƒÂ§in Grep, Glob
- DÃ„Â±Ã…Å¸ belgeler iÃƒÂ§in WebSearch, WebFetch
- Kod tabanÃ„Â± sorularÃ„Â± iÃƒÂ§in Explore agent ile Task

## Ãƒâ€¡Ã„Â±ktÃ„Â±
Ãƒâ€“nce bulgular, sonra ÃƒÂ¶neriler
