# YaygÃ„Â±n Pattern'ler

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
