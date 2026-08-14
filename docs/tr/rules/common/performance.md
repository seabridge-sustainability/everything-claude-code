# Performans Optimizasyonu

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
