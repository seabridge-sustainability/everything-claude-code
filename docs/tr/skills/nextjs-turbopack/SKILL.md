---
name: nextjs-turbopack
description: Next.js 16+ and Turbopack Ã¢â‚¬â€ incremental bundling, FS caching, dev speed, and when to use Turbopack vs webpack.
origin: ECC
---

# Next.js ve Turbopack

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


Next.js 16+ yerel geliÃ…Å¸tirme iÃƒÂ§in varsayÃ„Â±lan olarak Turbopack kullanÃ„Â±r: geliÃ…Å¸tirme baÃ…Å¸latma ve hot update'leri ÃƒÂ¶nemli ÃƒÂ¶lÃƒÂ§ÃƒÂ¼de hÃ„Â±zlandÃ„Â±ran Rust ile yazÃ„Â±lmÃ„Â±Ã…Å¸ artÃ„Â±mlÃ„Â± bir bundler.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- **Turbopack (varsayÃ„Â±lan dev)**: GÃƒÂ¼nlÃƒÂ¼k geliÃ…Å¸tirme iÃƒÂ§in kullanÃ„Â±n. Ãƒâ€“zellikle bÃƒÂ¼yÃƒÂ¼k uygulamalarda daha hÃ„Â±zlÃ„Â± soÃ„Å¸uk baÃ…Å¸latma ve HMR.
- **Webpack (legacy dev)**: Sadece bir Turbopack bug'Ã„Â±na denk gelirseniz veya dev'de webpack'e ÃƒÂ¶zgÃƒÂ¼ bir plugin'e gÃƒÂ¼veniyorsanÃ„Â±z kullanÃ„Â±n. `--webpack` ile devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±n (veya Next.js sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nÃƒÂ¼ze baÃ„Å¸lÃ„Â± olarak `--no-turbopack`; sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nÃƒÂ¼z iÃƒÂ§in dokÃƒÂ¼manlara bakÃ„Â±n).
- **Production**: Production build davranÃ„Â±Ã…Å¸Ã„Â± (`next build`) Next.js sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼ne baÃ„Å¸lÃ„Â± olarak Turbopack veya webpack kullanabilir; sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nÃƒÂ¼z iÃƒÂ§in resmi Next.js dokÃƒÂ¼mantasyonunu kontrol edin.

Ã…Å¾u durumlarda kullanÃ„Â±n: Next.js 16+ uygulamalarÃ„Â±nÃ„Â± geliÃ…Å¸tirme veya debug etme, yavaÃ…Å¸ dev baÃ…Å¸latma veya HMR'yi teÃ…Å¸his etme veya production bundle'larÃ„Â±nÃ„Â± optimize etme.

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

- **Turbopack**: Next.js dev iÃƒÂ§in artÃ„Â±mlÃ„Â± bundler. Dosya sistemi ÃƒÂ¶nbelleÃ„Å¸i kullanÃ„Â±r, bÃƒÂ¶ylece yeniden baÃ…Å¸latmalar ÃƒÂ§ok daha hÃ„Â±zlÃ„Â±dÃ„Â±r (ÃƒÂ¶rn. bÃƒÂ¼yÃƒÂ¼k projelerde 5-14x).
- **Dev'de varsayÃ„Â±lan**: Next.js 16'dan itibaren, `next dev` devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±lmadÃ„Â±kÃƒÂ§a Turbopack ile ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r.
- **Dosya sistemi ÃƒÂ¶nbelleÃ„Å¸i**: Yeniden baÃ…Å¸latmalar ÃƒÂ¶nceki ÃƒÂ§alÃ„Â±Ã…Å¸mayÃ„Â± yeniden kullanÃ„Â±r; ÃƒÂ¶nbellek genellikle `.next` altÃ„Â±ndadÃ„Â±r; temel kullanÃ„Â±m iÃƒÂ§in ekstra yapÃ„Â±landÃ„Â±rma gerekmez.
- **Bundle Analyzer (Next.js 16.1+)**: Ãƒâ€¡Ã„Â±ktÃ„Â±yÃ„Â± incelemek ve aÃ„Å¸Ã„Â±r baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± bulmak iÃƒÂ§in deneysel Bundle Analyzer; config veya deneysel bayrak ile etkinleÃ…Å¸tirin (sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nÃƒÂ¼z iÃƒÂ§in Next.js dokÃƒÂ¼mantasyonuna bakÃ„Â±n).

## Ãƒâ€“rnekler

### Komutlar

```bash
next dev
next build
next start
```

### KullanÃ„Â±m

Turbopack ile yerel geliÃ…Å¸tirme iÃƒÂ§in `next dev` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n. Code-splitting'i optimize etmek ve bÃƒÂ¼yÃƒÂ¼k baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± kÃ„Â±rpmak iÃƒÂ§in Bundle Analyzer'Ã„Â± kullanÃ„Â±n (Next.js dokÃƒÂ¼mantasyonuna bakÃ„Â±n). MÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda App Router ve server component'leri tercih edin.

## En Ã„Â°yi Uygulamalar

- KararlÃ„Â± Turbopack ve ÃƒÂ¶nbellekleme davranÃ„Â±Ã…Å¸Ã„Â± iÃƒÂ§in gÃƒÂ¼ncel bir Next.js 16.x sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nde kalÃ„Â±n.
- Dev yavaÃ…Å¸sa, Turbopack'te (varsayÃ„Â±lan) olduÃ„Å¸unuzdan ve ÃƒÂ¶nbelleÃ„Å¸in gereksiz yere temizlenmediÃ„Å¸inden emin olun.
- Production bundle boyutu sorunlarÃ„Â± iÃƒÂ§in, sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nÃƒÂ¼z iÃƒÂ§in resmi Next.js bundle analiz araÃƒÂ§larÃ„Â±nÃ„Â± kullanÃ„Â±n.
