---
name: nextjs-turbopack
description: Next.js 16+ and Turbopack Ã¢â‚¬â€ incremental bundling, FS caching, dev speed, and when to use Turbopack vs webpack.
origin: ECC
---

# Next.js ve Turbopack

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
