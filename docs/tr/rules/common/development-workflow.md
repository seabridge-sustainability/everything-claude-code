# GeliÃ…Å¸tirme Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

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


> Bu dosya [common/git-workflow.md](./git-workflow.md) dosyasÃ„Â±nÃ„Â± git iÃ…Å¸lemlerinden ÃƒÂ¶nce gerÃƒÂ§ekleÃ…Å¸en tam ÃƒÂ¶zellik geliÃ…Å¸tirme sÃƒÂ¼reci ile geniÃ…Å¸letir.

Feature Implementation Workflow geliÃ…Å¸tirme pipeline'Ã„Â±nÃ„Â± tanÃ„Â±mlar: araÃ…Å¸tÃ„Â±rma, planlama, TDD, kod incelemesi ve ardÃ„Â±ndan git'e commit.

## Feature Uygulama Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

0. **AraÃ…Å¸tÃ„Â±rma & Yeniden KullanÃ„Â±m** _(her yeni implementasyondan ÃƒÂ¶nce zorunlu)_
   - **Ãƒâ€“nce GitHub kod aramasÃ„Â±:** Yeni bir Ã…Å¸ey yazmadan ÃƒÂ¶nce mevcut implementasyonlarÃ„Â±, Ã…Å¸ablonlarÃ„Â± ve pattern'leri bulmak iÃƒÂ§in `gh search repos` ve `gh search code` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r.
   - **Ã„Â°kinci olarak kÃƒÂ¼tÃƒÂ¼phane dokÃƒÂ¼manlarÃ„Â±:** Uygulamadan ÃƒÂ¶nce API davranÃ„Â±Ã…Å¸Ã„Â±nÃ„Â±, paket kullanÃ„Â±mÃ„Â±nÃ„Â± ve versiyona ÃƒÂ¶zgÃƒÂ¼ detaylarÃ„Â± doÃ„Å¸rulamak iÃƒÂ§in Context7 veya birincil vendor dokÃƒÂ¼manlarÃ„Â±nÃ„Â± kullan.
   - **Ã„Â°lk ikisi yetersiz olduÃ„Å¸unda Exa:** GitHub aramasÃ„Â± ve birincil dokÃƒÂ¼manlardan sonra daha geniÃ…Å¸ web araÃ…Å¸tÃ„Â±rmasÃ„Â± veya keÃ…Å¸if iÃƒÂ§in Exa kullan.
   - **Paket kayÃ„Â±tlarÃ„Â±nÃ„Â± kontrol et:** Utility kodu yazmadan ÃƒÂ¶nce npm, PyPI, crates.io ve diÃ„Å¸er kayÃ„Â±tlarÃ„Â± ara. Kendi ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlerinden ziyade test edilmiÃ…Å¸ kÃƒÂ¼tÃƒÂ¼phaneleri tercih et.
   - **Adapte edilebilir implementasyonlar ara:** Problemin %80+'sÃ„Â±nÃ„Â± ÃƒÂ§ÃƒÂ¶zen ve fork'lanabilir, port edilebilir veya wrap edilebilir aÃƒÂ§Ã„Â±k kaynak projeler ara.
   - Gereksinimi karÃ…Å¸Ã„Â±ladÃ„Â±Ã„Å¸Ã„Â±nda sÃ„Â±fÃ„Â±rdan yeni kod yazmak yerine kanÃ„Â±tlanmÃ„Â±Ã…Å¸ bir yaklaÃ…Å¸Ã„Â±mÃ„Â± benimsemeyi veya port etmeyi tercih et.

1. **Ãƒâ€“nce Planla**
   - Uygulama planÃ„Â± oluÃ…Å¸turmak iÃƒÂ§in **planner** agent kullan
   - Kodlamadan ÃƒÂ¶nce planlama dokÃƒÂ¼manlarÃ„Â± oluÃ…Å¸tur: PRD, architecture, system_design, tech_doc, task_list
   - BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± ve riskleri belirle
   - Fazlara ayÃ„Â±r

2. **TDD YaklaÃ…Å¸Ã„Â±mÃ„Â±**
   - **tdd-guide** agent kullan
   - Ãƒâ€“nce testleri yaz (RED)
   - Testleri geÃƒÂ§mek iÃƒÂ§in uygula (GREEN)
   - Refactor et (IMPROVE)
   - %80+ coverage'Ã„Â± doÃ„Å¸rula

3. **Kod Ã„Â°ncelemesi**
   - Kod yazdÃ„Â±ktan hemen sonra **code-reviewer** agent kullan
   - CRITICAL ve HIGH sorunlarÃ„Â± ele al
   - MÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda MEDIUM sorunlarÃ„Â± dÃƒÂ¼zelt

4. **Commit & Push**
   - DetaylÃ„Â± commit mesajlarÃ„Â±
   - Conventional commits formatÃ„Â±nÃ„Â± takip et
   - Commit mesaj formatÃ„Â± ve PR sÃƒÂ¼reci iÃƒÂ§in [git-workflow.md](./git-workflow.md) dosyasÃ„Â±na bak
