# Kodlama Stili

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
