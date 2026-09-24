# ECC'ye Sponsor Olma

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


ECC, Claude Code, Cursor, OpenCode ve Codex app/CLI genelinde aÃƒÂ§Ã„Â±k kaynaklÃ„Â± bir ajan performans sistemi olarak sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lmektedir.

## Neden Sponsor OlmalÃ„Â±

Sponsorluk doÃ„Å¸rudan Ã…Å¸unlarÃ„Â± destekler:

- Daha hÃ„Â±zlÃ„Â± hata dÃƒÂ¼zeltme ve sÃƒÂ¼rÃƒÂ¼m dÃƒÂ¶ngÃƒÂ¼leri
- Harness'lar arasÃ„Â±nda platformlar arasÃ„Â± eÃ…Å¸itlik ÃƒÂ§alÃ„Â±Ã…Å¸masÃ„Â±
- Topluluk iÃƒÂ§in ÃƒÂ¼cretsiz kalan genel dokÃƒÂ¼mantasyon, beceriler ve gÃƒÂ¼venilirlik araÃƒÂ§larÃ„Â±

## Sponsorluk Seviyeleri

Bunlar pratik baÃ…Å¸langÃ„Â±ÃƒÂ§ noktalarÃ„Â±dÃ„Â±r ve ortaklÃ„Â±k kapsamÃ„Â±na gÃƒÂ¶re ayarlanabilir.

| Seviye | Fiyat | En Uygun OlduÃ„Å¸u | Ã„Â°ÃƒÂ§erikler |
|------|-------|----------|----------|
| Pilot Partner | $200/ay | Ã„Â°lk sponsor katÃ„Â±lÃ„Â±mÃ„Â± | AylÃ„Â±k metrik gÃƒÂ¼ncelleme, yol haritasÃ„Â± ÃƒÂ¶nizlemesi, ÃƒÂ¶ncelikli bakÃ„Â±mcÃ„Â± geri bildirimi |
| Growth Partner | $500/ay | ECC'yi aktif olarak benimseyen ekipler | Pilot avantajlarÃ„Â± + aylÃ„Â±k ofis saatleri senkronizasyonu + iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± entegrasyon rehberliÃ„Å¸i |
| Strategic Partner | $1,000+/ay | Platform/ekosistem ortaklÃ„Â±klarÃ„Â± | Growth avantajlarÃ„Â± + koordineli baÃ…Å¸latma desteÃ„Å¸i + daha derin bakÃ„Â±mcÃ„Â± iÃ…Å¸birliÃ„Å¸i |

## Sponsor RaporlamasÃ„Â±

AylÃ„Â±k paylaÃ…Å¸Ã„Â±lan metrikler Ã…Å¸unlarÃ„Â± iÃƒÂ§erebilir:

- npm indirmeleri (`ecc-universal`, `ecc-agentshield`)
- Repository benimseme (yÃ„Â±ldÃ„Â±zlar, fork'lar, katkÃ„Â±da bulunanlar)
- GitHub App kurulum trendi
- SÃƒÂ¼rÃƒÂ¼m ritmi ve gÃƒÂ¼venilirlik kilometre taÃ…Å¸larÃ„Â±

Kesin komut parÃƒÂ§acÃ„Â±klarÃ„Â± ve tekrarlanabilir ÃƒÂ§ekme sÃƒÂ¼reci iÃƒÂ§in [`docs/business/metrics-and-sponsorship.md`](../business/metrics-and-sponsorship.md) dosyasÃ„Â±na bakÃ„Â±n.

## Beklentiler ve Kapsam

- Sponsorluk bakÃ„Â±m ve hÃ„Â±zlandÃ„Â±rmayÃ„Â± destekler; proje sahipliÃ„Å¸ini transfer etmez.
- Ãƒâ€“zellik istekleri sponsor seviyesi, ekosistem etkisi ve bakÃ„Â±m riskine gÃƒÂ¶re ÃƒÂ¶nceliklendirilir.
- GÃƒÂ¼venlik ve gÃƒÂ¼venilirlik dÃƒÂ¼zeltmeleri yepyeni ÃƒÂ¶zelliklerden ÃƒÂ¶nce gelir.

## Buradan Sponsor Olun

- GitHub Sponsors: [https://github.com/sponsors/affaan-m](https://github.com/sponsors/affaan-m)
- Proje sitesi: [https://ecc.tools](https://ecc.tools)
