# Agent Orkestrasyonu

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


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
