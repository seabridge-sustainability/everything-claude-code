# Agent Orkestrasyonu

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Mevcut Agent'lar

`~/.claude/agents/` dizininde bulunur:

| Agent | AmaÃƒÂ§ | Ne Zaman KullanÃ„Â±lÃ„Â±r |
|-------|---------|-------------|
| planner | Uygulama planlamasÃ„Â± | KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellikler, refactoring |
| architect | Sistem tasarÃ„Â±mÃ„Â± | Mimari kararlar |
| tdd-guide | Test odaklÃ„Â± geliÃ…Å¸tirme | Yeni ÃƒÂ¶zellikler, hata dÃƒÂ¼zeltmeleri |
| code-reviewer | Kod incelemesi | Kod yazdÃ„Â±ktan sonra |
| security-reviewer | GÃƒÂ¼venlik analizi | Commit'lerden ÃƒÂ¶nce |
| build-error-resolver | Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zeltme | Build baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unda |
| e2e-runner | E2E testleri | Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â± |
| refactor-cleaner | Ãƒâ€“lÃƒÂ¼ kod temizliÃ„Å¸i | Kod bakÃ„Â±mÃ„Â± |
| doc-updater | DokÃƒÂ¼mantasyon | DokÃƒÂ¼manlarÃ„Â± gÃƒÂ¼ncelleme |
| rust-reviewer | Rust kod incelemesi | Rust projeleri |

## AnlÃ„Â±k Agent KullanÃ„Â±mÃ„Â±

KullanÃ„Â±cÃ„Â± istemi gerekmez:
1. KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellik istekleri - **planner** agent kullan
2. Kod yeni yazÃ„Â±ldÃ„Â±/deÃ„Å¸iÃ…Å¸tirildi - **code-reviewer** agent kullan
3. Hata dÃƒÂ¼zeltmesi veya yeni ÃƒÂ¶zellik - **tdd-guide** agent kullan
4. Mimari karar - **architect** agent kullan

## Paralel GÃƒÂ¶rev YÃƒÂ¼rÃƒÂ¼tme

BaÃ„Å¸Ã„Â±msÃ„Â±z iÃ…Å¸lemler iÃƒÂ§in DAIMA paralel Task yÃƒÂ¼rÃƒÂ¼tme kullan:

```markdown
# Ã„Â°YÃ„Â°: Paralel yÃƒÂ¼rÃƒÂ¼tme
3 agent'Ã„Â± paralel baÃ…Å¸lat:
1. Agent 1: Auth modÃƒÂ¼lÃƒÂ¼ gÃƒÂ¼venlik analizi
2. Agent 2: Cache sistemi performans incelemesi
3. Agent 3: Utilities tip kontrolÃƒÂ¼

# KÃƒâ€“TÃƒÅ“: Gereksiz sÃ„Â±ralÃ„Â± yÃƒÂ¼rÃƒÂ¼tme
Ãƒâ€“nce agent 1, sonra agent 2, sonra agent 3
```

## Ãƒâ€¡ok Perspektifli Analiz

KarmaÃ…Å¸Ã„Â±k problemler iÃƒÂ§in split role sub-agent'lar kullan:
- Factual reviewer
- Senior engineer
- Security expert
- Consistency reviewer
- Redundancy checker
