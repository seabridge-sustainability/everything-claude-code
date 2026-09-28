# Performans Optimizasyonu

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
