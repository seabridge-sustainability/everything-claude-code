# ECC'ye Sponsor Olma

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
