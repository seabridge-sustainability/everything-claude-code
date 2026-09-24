# Sponsorlar

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


Bu projeye sponsor olan herkese teÃ…Å¸ekkÃƒÂ¼rler! DesteÃ„Å¸iniz ECC ekosisteminin bÃƒÂ¼yÃƒÂ¼mesini saÃ„Å¸lÃ„Â±yor.

## Kurumsal Sponsorlar

*Burada yer almak iÃƒÂ§in [Kurumsal sponsor](https://github.com/sponsors/affaan-m) olun*

## Ã„Â°Ã…Å¸letme SponsorlarÃ„Â±

*Burada yer almak iÃƒÂ§in [Ã„Â°Ã…Å¸letme sponsoru](https://github.com/sponsors/affaan-m) olun*

## TakÃ„Â±m SponsorlarÃ„Â±

*Burada yer almak iÃƒÂ§in [TakÃ„Â±m sponsoru](https://github.com/sponsors/affaan-m) olun*

## Bireysel Sponsorlar

*Burada listelenmek iÃƒÂ§in [sponsor](https://github.com/sponsors/affaan-m) olun*

---

## Neden Sponsor OlmalÃ„Â±?

SponsorluÃ„Å¸unuz Ã…Å¸unlara yardÃ„Â±mcÃ„Â± olur:

- **Daha hÃ„Â±zlÃ„Â± teslimat** Ã¢â‚¬â€ AraÃƒÂ§lar ve ÃƒÂ¶zellikler geliÃ…Å¸tirmeye daha fazla zaman ayrÃ„Â±lmasÃ„Â±
- **ÃƒÅ“cretsiz kalmasÃ„Â±nÃ„Â± saÃ„Å¸lama** Ã¢â‚¬â€ Premium ÃƒÂ¶zellikler herkes iÃƒÂ§in ÃƒÂ¼cretsiz katmanÃ„Â± finanse eder
- **Daha iyi destek** Ã¢â‚¬â€ Sponsorlar ÃƒÂ¶ncelikli yanÃ„Â±tlar alÃ„Â±r
- **Yol haritasÃ„Â±nÃ„Â± Ã…Å¸ekillendirme** Ã¢â‚¬â€ Pro+ sponsorlar ÃƒÂ¶zelliklere oy verir

## Sponsor HazÃ„Â±rlÃ„Â±k Sinyalleri

Sponsor konuÃ…Å¸malarÃ„Â±nda bu kanÃ„Â±t noktalarÃ„Â±nÃ„Â± kullanÃ„Â±n:

- `ecc-universal` ve `ecc-agentshield` iÃƒÂ§in canlÃ„Â± npm kurulum/indirme metrikleri
- Marketplace kurulumlarÃ„Â± aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla GitHub App daÃ„Å¸Ã„Â±tÃ„Â±mÃ„Â±
- Genel benimseme sinyalleri: yÃ„Â±ldÃ„Â±zlar, fork'lar, katkÃ„Â±da bulunanlar, sÃƒÂ¼rÃƒÂ¼m ritmi
- Harness'lar arasÃ„Â± destek: Claude Code, Cursor, OpenCode, Codex app/CLI

Kopyala/yapÃ„Â±Ã…Å¸tÃ„Â±r metrik ÃƒÂ§ekme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± iÃƒÂ§in [`docs/business/metrics-and-sponsorship.md`](../business/metrics-and-sponsorship.md) dosyasÃ„Â±na bakÃ„Â±n.

## Sponsor Seviyeleri

| Seviye | Fiyat | Avantajlar |
|------|-------|----------|
| Supporter | $5/ay | README'de isim, erken eriÃ…Å¸im |
| Builder | $10/ay | Premium araÃƒÂ§ eriÃ…Å¸imi |
| Pro | $25/ay | Ãƒâ€“ncelikli destek, ofis saatleri |
| Team | $100/ay | 5 koltuk, takÃ„Â±m yapÃ„Â±landÃ„Â±rmalarÃ„Â± |
| Harness Partner | $200/ay | AylÃ„Â±k yol haritasÃ„Â± senkronizasyonu, ÃƒÂ¶ncelikli bakÃ„Â±mcÃ„Â± geri bildirimi, sÃƒÂ¼rÃƒÂ¼m notlarÃ„Â±nda bahis |
| Business | $500/ay | 25 koltuk, danÃ„Â±Ã…Å¸manlÃ„Â±k kredisi |
| Enterprise | $2K/ay | SÃ„Â±nÃ„Â±rsÃ„Â±z koltuk, ÃƒÂ¶zel araÃƒÂ§lar |

[**Sponsor Olun Ã¢â€ â€™**](https://github.com/sponsors/affaan-m)

---

*Otomatik gÃƒÂ¼ncellenir. Son senkronizasyon: Ã…Å¾ubat 2026*
