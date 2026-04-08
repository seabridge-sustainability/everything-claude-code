# Hooks Sistemi

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Hook Tipleri

- **PreToolUse**: Tool yÃƒÂ¼rÃƒÂ¼tmeden ÃƒÂ¶nce (validasyon, parametre deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i)
- **PostToolUse**: Tool yÃƒÂ¼rÃƒÂ¼tmeden sonra (auto-format, kontroller)
- **Stop**: Session bittiÃ„Å¸inde (final doÃ„Å¸rulama)

## Auto-Accept Ã„Â°zinleri

Dikkatli kullan:
- GÃƒÂ¼venilir, iyi tanÃ„Â±mlanmÃ„Â±Ã…Å¸ planlar iÃƒÂ§in etkinleÃ…Å¸tir
- KeÃ…Å¸ifsel ÃƒÂ§alÃ„Â±Ã…Å¸malar iÃƒÂ§in devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rak
- Asla dangerously-skip-permissions flag'i kullanma
- Bunun yerine `~/.claude.json` iÃƒÂ§inde `allowedTools` yapÃ„Â±landÃ„Â±r

## TodoWrite En Ã„Â°yi Uygulamalar

TodoWrite tool'unu Ã…Å¸unlar iÃƒÂ§in kullan:
- Ãƒâ€¡ok adÃ„Â±mlÃ„Â± gÃƒÂ¶revlerdeki ilerlemeyi takip et
- TalimatlarÃ„Â±n anlaÃ…Å¸Ã„Â±ldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula
- GerÃƒÂ§ek zamanlÃ„Â± yÃƒÂ¶nlendirmeyi etkinleÃ…Å¸tir
- DetaylÃ„Â± implementasyon adÃ„Â±mlarÃ„Â±nÃ„Â± gÃƒÂ¶ster

Todo listesi Ã…Å¸unlarÃ„Â± ortaya ÃƒÂ§Ã„Â±karÃ„Â±r:
- SÃ„Â±ra dÃ„Â±Ã…Å¸Ã„Â± adÃ„Â±mlar
- Eksik ÃƒÂ¶Ã„Å¸eler
- Fazladan gereksiz ÃƒÂ¶Ã„Å¸eler
- YanlÃ„Â±Ã…Å¸ detay dÃƒÂ¼zeyi
- YanlÃ„Â±Ã…Å¸ yorumlanmÃ„Â±Ã…Å¸ gereksinimler
