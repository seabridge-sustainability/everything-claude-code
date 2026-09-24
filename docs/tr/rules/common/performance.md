# Performans Optimizasyonu

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

## Model Seçim Stratejisi

**Haiku 4.5** (Sonnet kapasitesinin %90'ı, 3x maliyet tasarrufu):
- Sık çağrılan hafif agent'lar
- Pair programming ve kod üretimi
- Multi-agent sistemlerinde worker agent'lar

**Sonnet 5** (En iyi kodlama modeli):
- Ana geliştirme çalışması
- Multi-agent iş akışlarını orkestrasyon
- Karmaşık kodlama görevleri

**Opus 5** (En derin akıl yürütme):
- Karmaşık mimari kararlar
- Maksimum akıl yürütme gereksinimleri
- Araştırma ve analiz görevleri

## Context Window Yönetimi

Context window'un son %20'sinden kaçın:
- Büyük ölçekli refactoring
- Birden fazla dosyaya yayılan özellik implementasyonu
- Karmaşık etkileşimleri debug etme

Daha düşük context hassasiyeti olan görevler:
- Tek dosya düzenlemeleri
- Bağımsız utility oluşturma
- Dokümantasyon güncellemeleri
- Basit hata düzeltmeleri

## Extended Thinking + Plan Mode

Extended thinking varsayılan olarak etkindir ve dahili akıl yürütme için 31,999 token'a kadar ayırır.

Extended thinking kontrolü:
- **Toggle**: Option+T (macOS) / Alt+T (Windows/Linux)
- **Config**: `~/.claude/settings.json` içinde `alwaysThinkingEnabled` ayarla
- **Budget cap**: `export MAX_THINKING_TOKENS=10000` (bash) veya `$env:MAX_THINKING_TOKENS = "10000"` (PowerShell)
- **Verbose mode**: Thinking çıktısını görmek için Ctrl+O

Derin akıl yürütme gerektiren karmaşık görevler için:
1. Extended thinking'in etkin olduğundan emin ol (varsayılan olarak açık)
2. Yapılandırılmış yaklaşım için **Plan Mode**'u etkinleştir
3. Kapsamlı analiz için birden fazla kritik tur kullan
4. Çeşitli perspektifler için split role sub-agent'lar kullan

## Build Sorun Giderme

Build başarısız olursa:
1. **build-error-resolver** agent kullan
2. Hata mesajlarını analiz et
3. Aşamalı olarak düzelt
4. Her düzeltmeden sonra doğrula
