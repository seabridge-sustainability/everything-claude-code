# Test Gereksinimleri

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


## Minimum Test Coverage: %80

Test Tipleri (HEPSÃ„Â° gerekli):
1. **Unit Tests** - Bireysel fonksiyonlar, utility'ler, component'ler
2. **Integration Tests** - API endpoint'leri, database iÃ…Å¸lemleri
3. **E2E Tests** - Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â± (framework dile gÃƒÂ¶re seÃƒÂ§ilir)

## Test OdaklÃ„Â± GeliÃ…Å¸tirme

ZORUNLU iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±:
1. Ãƒâ€“nce test yaz (RED)
2. Testi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r - BAÃ…Å¾ARISIZ olmalÃ„Â±
3. Minimum implementasyon yaz (GREEN)
4. Testi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r - BAÃ…Å¾ARILI olmalÃ„Â±
5. Refactor et (IMPROVE)
6. Coverage'Ã„Â± doÃ„Å¸rula (%80+)

## Test HatalarÃ„Â±nda Sorun Giderme

1. **tdd-guide** agent kullan
2. Test izolasyonunu kontrol et
3. Mock'larÃ„Â±n doÃ„Å¸ru olduÃ„Å¸unu doÃ„Å¸rula
4. Testleri deÃ„Å¸il implementasyonu dÃƒÂ¼zelt (testler yanlÃ„Â±Ã…Å¸ olmadÃ„Â±kÃƒÂ§a)

## Agent DesteÃ„Å¸i

- **tdd-guide** - Yeni ÃƒÂ¶zellikler iÃƒÂ§in PROAKTÃ„Â°F olarak kullan, test-ÃƒÂ¶nce-yaz'Ã„Â± zorlar
