---
name: nextjs-turbopack
description: Next.js 16+ and Turbopack — incremental bundling, FS caching, dev speed, and when to use Turbopack vs webpack.
origin: ECC
---

# Next.js ve Turbopack

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Next.js 16+ yerel geliştirme için varsayılan olarak Turbopack kullanır: geliştirme başlatma ve hot update'leri önemli ölçüde hızlandıran Rust ile yazılmış artımlı bir bundler.

## Ne Zaman Kullanılır

- **Turbopack (varsayılan dev)**: Günlük geliştirme için kullanın. Özellikle büyük uygulamalarda daha hızlı soğuk başlatma ve HMR.
- **Webpack (legacy dev)**: Sadece bir Turbopack bug'ına denk gelirseniz veya dev'de webpack'e özgü bir plugin'e güveniyorsanız kullanın. `--webpack` ile devre dışı bırakın (veya Next.js sürümünüze bağlı olarak `--no-turbopack`; sürümünüz için dokümanlara bakın).
- **Production**: Production build davranışı (`next build`) Next.js sürümüne bağlı olarak Turbopack veya webpack kullanabilir; sürümünüz için resmi Next.js dokümantasyonunu kontrol edin.

Şu durumlarda kullanın: Next.js 16+ uygulamalarını geliştirme veya debug etme, yavaş dev başlatma veya HMR'yi teşhis etme veya production bundle'larını optimize etme.

## Nasıl Çalışır

- **Turbopack**: Next.js dev için artımlı bundler. Dosya sistemi önbelleği kullanır, böylece yeniden başlatmalar çok daha hızlıdır (örn. büyük projelerde 5-14x).
- **Dev'de varsayılan**: Next.js 16'dan itibaren, `next dev` devre dışı bırakılmadıkça Turbopack ile çalışır.
- **Dosya sistemi önbelleği**: Yeniden başlatmalar önceki çalışmayı yeniden kullanır; önbellek genellikle `.next` altındadır; temel kullanım için ekstra yapılandırma gerekmez.
- **Bundle Analyzer (Next.js 16.1+)**: Çıktıyı incelemek ve ağır bağımlılıkları bulmak için deneysel Bundle Analyzer; config veya deneysel bayrak ile etkinleştirin (sürümünüz için Next.js dokümantasyonuna bakın).

## Örnekler

### Komutlar

```bash
next dev
next build
next start
```

### Kullanım

Turbopack ile yerel geliştirme için `next dev` çalıştırın. Code-splitting'i optimize etmek ve büyük bağımlılıkları kırpmak için Bundle Analyzer'ı kullanın (Next.js dokümantasyonuna bakın). Mümkün olduğunda App Router ve server component'leri tercih edin.

## En İyi Uygulamalar

- Kararlı Turbopack ve önbellekleme davranışı için güncel bir Next.js 16.x sürümünde kalın.
- Dev yavaşsa, Turbopack'te (varsayılan) olduğunuzdan ve önbelleğin gereksiz yere temizlenmediğinden emin olun.
- Production bundle boyutu sorunları için, sürümünüz için resmi Next.js bundle analiz araçlarını kullanın.
