# GeliÃ…Å¸tirme Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
