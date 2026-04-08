# GeliÃ…Å¸tirme Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
