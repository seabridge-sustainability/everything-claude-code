# Performans Optimizasyonu

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Model SeÃƒÂ§im Stratejisi

**Haiku 4.5** (Sonnet kapasitesinin %90'Ã„Â±, 3x maliyet tasarrufu):
- SÃ„Â±k ÃƒÂ§aÃ„Å¸rÃ„Â±lan hafif agent'lar
- Pair programming ve kod ÃƒÂ¼retimi
- Multi-agent sistemlerinde worker agent'lar

**Sonnet 4.6** (En iyi kodlama modeli):
- Ana geliÃ…Å¸tirme ÃƒÂ§alÃ„Â±Ã…Å¸masÃ„Â±
- Multi-agent iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±nÃ„Â± orkestrasyon
- KarmaÃ…Å¸Ã„Â±k kodlama gÃƒÂ¶revleri

**Opus 4.5** (En derin akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme):
- KarmaÃ…Å¸Ã„Â±k mimari kararlar
- Maksimum akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme gereksinimleri
- AraÃ…Å¸tÃ„Â±rma ve analiz gÃƒÂ¶revleri

## Context Window YÃƒÂ¶netimi

Context window'un son %20'sinden kaÃƒÂ§Ã„Â±n:
- BÃƒÂ¼yÃƒÂ¼k ÃƒÂ¶lÃƒÂ§ekli refactoring
- Birden fazla dosyaya yayÃ„Â±lan ÃƒÂ¶zellik implementasyonu
- KarmaÃ…Å¸Ã„Â±k etkileÃ…Å¸imleri debug etme

Daha dÃƒÂ¼Ã…Å¸ÃƒÂ¼k context hassasiyeti olan gÃƒÂ¶revler:
- Tek dosya dÃƒÂ¼zenlemeleri
- BaÃ„Å¸Ã„Â±msÃ„Â±z utility oluÃ…Å¸turma
- DokÃƒÂ¼mantasyon gÃƒÂ¼ncellemeleri
- Basit hata dÃƒÂ¼zeltmeleri

## Extended Thinking + Plan Mode

Extended thinking varsayÃ„Â±lan olarak etkindir ve dahili akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme iÃƒÂ§in 31,999 token'a kadar ayÃ„Â±rÃ„Â±r.

Extended thinking kontrolÃƒÂ¼:
- **Toggle**: Option+T (macOS) / Alt+T (Windows/Linux)
- **Config**: `~/.claude/settings.json` iÃƒÂ§inde `alwaysThinkingEnabled` ayarla
- **Budget cap**: `export MAX_THINKING_TOKENS=10000`
- **Verbose mode**: Thinking ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â±nÃ„Â± gÃƒÂ¶rmek iÃƒÂ§in Ctrl+O

Derin akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme gerektiren karmaÃ…Å¸Ã„Â±k gÃƒÂ¶revler iÃƒÂ§in:
1. Extended thinking'in etkin olduÃ„Å¸undan emin ol (varsayÃ„Â±lan olarak aÃƒÂ§Ã„Â±k)
2. YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ yaklaÃ…Å¸Ã„Â±m iÃƒÂ§in **Plan Mode**'u etkinleÃ…Å¸tir
3. KapsamlÃ„Â± analiz iÃƒÂ§in birden fazla kritik tur kullan
4. Ãƒâ€¡eÃ…Å¸itli perspektifler iÃƒÂ§in split role sub-agent'lar kullan

## Build Sorun Giderme

Build baÃ…Å¸arÃ„Â±sÃ„Â±z olursa:
1. **build-error-resolver** agent kullan
2. Hata mesajlarÃ„Â±nÃ„Â± analiz et
3. AÃ…Å¸amalÃ„Â± olarak dÃƒÂ¼zelt
4. Her dÃƒÂ¼zeltmeden sonra doÃ„Å¸rula
