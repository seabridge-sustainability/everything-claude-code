# Everything Claude Code

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


[![Stars](https://img.shields.io/github/stars/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/stargazers)
[![Forks](https://img.shields.io/github/forks/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/network/members)
[![Contributors](https://img.shields.io/github/contributors/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/graphs/contributors)
[![npm ecc-universal](https://img.shields.io/npm/dw/ecc-universal?label=ecc-universal%20haftalÃ„Â±k%20indirme&logo=npm)](https://www.npmjs.com/package/ecc-universal)
[![npm ecc-agentshield](https://img.shields.io/npm/dw/ecc-agentshield?label=ecc-agentshield%20haftalÃ„Â±k%20indirme&logo=npm)](https://www.npmjs.com/package/ecc-agentshield)
[![GitHub App Install](https://img.shields.io/badge/GitHub%20App-150%20kurulum-2ea44f?logo=github)](https://github.com/marketplace/ecc-tools)
[![License](https://img.shields.io/badge/lisans-MIT-blue.svg)](../../LICENSE)
![Shell](https://img.shields.io/badge/-Shell-4EAA25?logo=gnu-bash&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
![Go](https://img.shields.io/badge/-Go-00ADD8?logo=go&logoColor=white)
![Java](https://img.shields.io/badge/-Java-ED8B00?logo=openjdk&logoColor=white)
![Perl](https://img.shields.io/badge/-Perl-39457E?logo=perl&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white)

> **50K+ yÃ„Â±ldÃ„Â±z** | **6K+ fork** | **30 katkÃ„Â±da bulunan** | **6 dil desteÃ„Å¸i** | **Anthropic Hackathon KazananÃ„Â±**

---

<div align="center">

**Dil / Language / Ã¨Â¯Â­Ã¨Â¨â‚¬ / Ã¨ÂªÅ¾Ã¨Â¨â‚¬**

[**English**](../../README.md) | [Ã§Â®â‚¬Ã¤Â½â€œÃ¤Â¸Â­Ã¦â€“â€¡](../../README.zh-CN.md) | [Ã§Â¹ÂÃ©Â«â€Ã¤Â¸Â­Ã¦â€“â€¡](../zh-TW/README.md) | [Ã¦â€”Â¥Ã¦Å“Â¬Ã¨ÂªÅ¾](../ja-JP/README.md) | [Ã­â€¢Å“ÃªÂµÂ­Ã¬â€“Â´](../ko-KR/README.md) | [**TÃƒÂ¼rkÃƒÂ§e**](README.md)

</div>

---

**AI agent harness'larÃ„Â± iÃƒÂ§in performans optimizasyon sistemi. Anthropic hackathon kazananÃ„Â±ndan.**

Sadece konfigÃƒÂ¼rasyon dosyalarÃ„Â± deÃ„Å¸il. Tam bir sistem: skill'ler, instinct'ler, memory optimizasyonu, sÃƒÂ¼rekli ÃƒÂ¶Ã„Å¸renme, gÃƒÂ¼venlik taramasÃ„Â± ve araÃ…Å¸tÃ„Â±rma odaklÃ„Â± geliÃ…Å¸tirme. 10+ ay boyunca gerÃƒÂ§ek ÃƒÂ¼rÃƒÂ¼nler inÃ…Å¸a ederken yoÃ„Å¸un gÃƒÂ¼nlÃƒÂ¼k kullanÃ„Â±mla evrimleÃ…Å¸miÃ…Å¸ production-ready agent'lar, hook'lar, command'lar, rule'lar ve MCP konfigÃƒÂ¼rasyonlarÃ„Â±.

**Claude Code**, **Codex**, **Cowork** ve diÃ„Å¸er AI agent harness'larÃ„Â±nda ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r.

---

## Rehberler

Bu repository yalnÃ„Â±zca ham kodu iÃƒÂ§erir. Rehberler her Ã…Å¸eyi aÃƒÂ§Ã„Â±klÃ„Â±yor.

<table>
<tr>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2012378465664745795">
<img src="../../assets/images/guides/shorthand-guide.png" alt="Everything Claude Code KÃ„Â±sa Rehberi" />
</a>
</td>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2014040193557471352">
<img src="../../assets/images/guides/longform-guide.png" alt="Everything Claude Code Uzun Rehberi" />
</a>
</td>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2033263813387223421">
<img src="../../assets/images/security/security-guide-header.png" alt="Agentic GÃƒÂ¼venlik KÃ„Â±sa Rehberi" />
</a>
</td>
</tr>
<tr>
<td align="center"><b>KÃ„Â±sa Rehber</b><br/>Kurulum, temeller, felsefe. <b>Ã„Â°lk ÃƒÂ¶nce bunu okuyun.</b></td>
<td align="center"><b>Uzun Rehber</b><br/>Token optimizasyonu, memory kalÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±, eval'ler, paralelleÃ…Å¸tirme.</td>
<td align="center"><b>GÃƒÂ¼venlik Rehberi</b><br/>SaldÃ„Â±rÃ„Â± vektÃƒÂ¶rleri, sandboxing, sanitizasyon, CVE'ler, AgentShield.</td>
</tr>
</table>

| Konu | Ãƒâ€“Ã„Å¸renecekleriniz |
|------|------------------|
| Token Optimizasyonu | Model seÃƒÂ§imi, system prompt daraltma, background process'ler |
| Memory KalÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± | Oturumlar arasÃ„Â± baÃ„Å¸lamÃ„Â± otomatik kaydet/yÃƒÂ¼kle hook'larÃ„Â± |
| SÃƒÂ¼rekli Ãƒâ€“Ã„Å¸renme | Oturumlardan otomatik pattern ÃƒÂ§Ã„Â±karma ve yeniden kullanÃ„Â±labilir skill'lere dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rme |
| Verification Loop'larÃ„Â± | Checkpoint vs sÃƒÂ¼rekli eval'ler, grader tipleri, pass@k metrikleri |
| ParalelleÃ…Å¸tirme | Git worktree'ler, cascade metodu, instance'larÃ„Â± ne zaman ÃƒÂ¶lÃƒÂ§eklendirmeli |
| Subagent Orkestrasyonu | Context problemi, iterative retrieval pattern |

---

## Yenilikler

### v1.9.0 Ã¢â‚¬â€ SeÃƒÂ§ici Kurulum & Dil GeniÃ…Å¸lemesi (Mar 2026)

- **SeÃƒÂ§ici kurulum mimarisi** Ã¢â‚¬â€ `install-plan.js` ve `install-apply.js` ile manifest-tabanlÃ„Â± kurulum pipeline'Ã„Â±, hedefli component kurulumu iÃƒÂ§in. State store neyin kurulu olduÃ„Å¸unu takip eder ve artÃ„Â±mlÃ„Â± gÃƒÂ¼ncellemelere olanak saÃ„Å¸lar.
- **6 yeni agent** Ã¢â‚¬â€ `typescript-reviewer`, `pytorch-build-resolver`, `java-build-resolver`, `java-reviewer`, `kotlin-reviewer`, `kotlin-build-resolver` dil desteÃ„Å¸ini 10 dile ÃƒÂ§Ã„Â±karÃ„Â±yor.
- **Yeni skill'ler** Ã¢â‚¬â€ Deep learning iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in `pytorch-patterns`, API referans araÃ…Å¸tÃ„Â±rmasÃ„Â± iÃƒÂ§in `documentation-lookup`, modern JS toolchain'leri iÃƒÂ§in `bun-runtime` ve `nextjs-turbopack`, artÃ„Â± 8 operasyonel domain skill ve `mcp-server-patterns`.
- **Session & state altyapÃ„Â±sÃ„Â±** Ã¢â‚¬â€ Query CLI ile SQLite state store, yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ kayÃ„Â±t iÃƒÂ§in session adapter'larÃ„Â±, kendini geliÃ…Å¸tiren skill'ler iÃƒÂ§in skill evolution foundation.
- **Orkestrasyon iyileÃ…Å¸tirmesi** Ã¢â‚¬â€ Harness audit skorlamasÃ„Â± deterministik hale getirildi, orkestrasyon durumu ve launcher uyumluluÃ„Å¸u saÃ„Å¸lamlaÃ…Å¸tÃ„Â±rÃ„Â±ldÃ„Â±, 5 katmanlÃ„Â± koruma ile observer loop ÃƒÂ¶nleme.
- **Observer gÃƒÂ¼venilirliÃ„Å¸i** Ã¢â‚¬â€ Throttling ve tail sampling ile memory patlamasÃ„Â± dÃƒÂ¼zeltmesi, sandbox eriÃ…Å¸im dÃƒÂ¼zeltmesi, lazy-start mantÃ„Â±Ã„Å¸Ã„Â± ve re-entrancy korumasÃ„Â±.
- **12 dil ekosistemi** Ã¢â‚¬â€ Mevcut TypeScript, Python, Go ve genel rule'lara Java, PHP, Perl, Kotlin/Android/KMP, C++ ve Rust iÃƒÂ§in yeni rule'lar eklendi.
- **Topluluk katkÃ„Â±larÃ„Â±** Ã¢â‚¬â€ Korece ve Ãƒâ€¡ince ÃƒÂ§eviriler, security hook, biome hook optimizasyonu, video iÃ…Å¸leme skill'leri, operasyonel skill'ler, PowerShell installer, Antigravity IDE desteÃ„Å¸i.
- **CI saÃ„Å¸lamlaÃ…Å¸tÃ„Â±rma** Ã¢â‚¬â€ 19 test hatasÃ„Â± dÃƒÂ¼zeltmesi, katalog sayÃ„Â±sÃ„Â± zorunluluÃ„Å¸u, kurulum manifest validasyonu ve tam test suite yeÃ…Å¸il.

### v1.8.0 Ã¢â‚¬â€ Harness Performans Sistemi (Mar 2026)

- **Harness-first release** Ã¢â‚¬â€ ECC artÃ„Â±k aÃƒÂ§Ã„Â±kÃƒÂ§a bir agent harness performans sistemi olarak ÃƒÂ§erÃƒÂ§evelendi, sadece bir config paketi deÃ„Å¸il.
- **Hook gÃƒÂ¼venilirlik iyileÃ…Å¸tirmesi** Ã¢â‚¬â€ SessionStart root fallback, Stop-phase session ÃƒÂ¶zetleri ve kÃ„Â±rÃ„Â±lgan inline one-liner'lar yerine script-tabanlÃ„Â± hook'lar.
- **Hook runtime kontrolleri** Ã¢â‚¬â€ `ECC_HOOK_PROFILE=minimal|standard|strict` ve `ECC_DISABLED_HOOKS=...` hook dosyalarÃ„Â±nÃ„Â± dÃƒÂ¼zenlemeden runtime gating iÃƒÂ§in.
- **Yeni harness command'larÃ„Â±** Ã¢â‚¬â€ `/harness-audit`, `/loop-start`, `/loop-status`, `/quality-gate`, `/model-route`.
- **NanoClaw v2** Ã¢â‚¬â€ Model routing, skill hot-load, session branch/search/export/compact/metrics.
- **Ãƒâ€¡apraz harness paritesi** Ã¢â‚¬â€ Claude Code, Cursor, OpenCode ve Codex app/CLI arasÃ„Â±nda davranÃ„Â±Ã…Å¸ sÃ„Â±kÃ„Â±laÃ…Å¸tÃ„Â±rÃ„Â±ldÃ„Â±.
- **997 internal test geÃƒÂ§iyor** Ã¢â‚¬â€ Hook/runtime refactor ve uyumluluk gÃƒÂ¼ncellemelerinden sonra tam suite yeÃ…Å¸il.

[Tam deÃ„Å¸iÃ…Å¸iklik gÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼ iÃƒÂ§in Releases bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼ne bakÃ„Â±n](https://github.com/affaan-m/everything-claude-code/releases).

---

## HÃ„Â±zlÃ„Â± BaÃ…Å¸langÃ„Â±ÃƒÂ§

2 dakikadan kÃ„Â±sa sÃƒÂ¼rede baÃ…Å¸layÃ„Â±n:

### AdÃ„Â±m 1: Plugin'i Kurun

```bash
# Marketplace ekle
/plugin marketplace add affaan-m/everything-claude-code

# Plugin'i kur
/plugin install everything-claude-code@everything-claude-code
```

### AdÃ„Â±m 2: Rule'larÃ„Â± Kurun (Gerekli)

> WARNING: **Ãƒâ€“nemli:** Claude Code plugin'leri `rule`'larÃ„Â± otomatik olarak daÃ„Å¸Ã„Â±tamaz. Manuel olarak kurmalÃ„Â±sÃ„Â±nÃ„Â±z:

```bash
# Ãƒâ€“nce repo'yu klonlayÃ„Â±n
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± kurun (paket yÃƒÂ¶neticinizi seÃƒÂ§in)
npm install        # veya: pnpm install | yarn install | bun install

# macOS/Linux
./install.sh typescript    # veya python veya golang veya swift veya php
# ./install.sh typescript python golang swift php
# ./install.sh --target cursor typescript
# ./install.sh --target antigravity typescript
```

```powershell
# Windows PowerShell
.\install.ps1 typescript   # veya python veya golang veya swift veya php
# .\install.ps1 typescript python golang swift php
# .\install.ps1 --target cursor typescript
# .\install.ps1 --target antigravity typescript

# npm-installed uyumluluk entry point'i de ÃƒÂ§apraz platform ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
npx ecc-install typescript
```

Manuel kurulum talimatlarÃ„Â± iÃƒÂ§in `rules/` klasÃƒÂ¶rÃƒÂ¼ndeki README'ye bakÃ„Â±n.

### AdÃ„Â±m 3: Kullanmaya BaÃ…Å¸layÃ„Â±n

```bash
# Bir command deneyin (plugin kurulumu namespace'li form kullanÃ„Â±r)
/everything-claude-code:plan "KullanÃ„Â±cÃ„Â± kimlik doÃ„Å¸rulamasÃ„Â± ekle"

# Manuel kurulum (SeÃƒÂ§enek 2) daha kÃ„Â±sa formu kullanÃ„Â±r:
# /plan "KullanÃ„Â±cÃ„Â± kimlik doÃ„Å¸rulamasÃ„Â± ekle"

# Mevcut command'larÃ„Â± kontrol edin
/plugin list everything-claude-code@everything-claude-code
```

**Bu kadar!** ArtÃ„Â±k 28 agent, 116 skill ve 59 command'a eriÃ…Å¸iminiz var.

---

## Ãƒâ€¡apraz Platform DesteÃ„Å¸i

Bu plugin artÃ„Â±k **Windows, macOS ve Linux**'u tam olarak destekliyor, ana IDE'ler (Cursor, OpenCode, Antigravity) ve CLI harness'lar arasÃ„Â±nda sÃ„Â±kÃ„Â± entegrasyon ile birlikte. TÃƒÂ¼m hook'lar ve script'ler maksimum uyumluluk iÃƒÂ§in Node.js ile yeniden yazÃ„Â±ldÃ„Â±.

### Paket YÃƒÂ¶neticisi AlgÃ„Â±lama

Plugin, tercih ettiÃ„Å¸iniz paket yÃƒÂ¶neticisini (npm, pnpm, yarn veya bun) otomatik olarak algÃ„Â±lar, aÃ…Å¸aÃ„Å¸Ã„Â±daki ÃƒÂ¶ncelik sÃ„Â±rasÃ„Â±yla:

1. **Ortam deÃ„Å¸iÃ…Å¸keni**: `CLAUDE_PACKAGE_MANAGER`
2. **Proje config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` alanÃ„Â±
4. **Lock dosyasÃ„Â±**: package-lock.json, yarn.lock, pnpm-lock.yaml veya bun.lockb'den algÃ„Â±lama
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: Ã„Â°lk mevcut paket yÃƒÂ¶neticisi

Tercih ettiÃ„Å¸iniz paket yÃƒÂ¶neticisini ayarlamak iÃƒÂ§in:

```bash
# Ortam deÃ„Å¸iÃ…Å¸keni ile
export CLAUDE_PACKAGE_MANAGER=pnpm

# Global config ile
node scripts/setup-package-manager.js --global pnpm

# Proje config ile
node scripts/setup-package-manager.js --project bun

# Mevcut ayarÃ„Â± algÃ„Â±la
node scripts/setup-package-manager.js --detect
```

Veya Claude Code'da `/setup-pm` command'Ã„Â±nÃ„Â± kullanÃ„Â±n.

### Hook Runtime Kontrolleri

SÃ„Â±kÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± ayarlamak veya belirli hook'larÃ„Â± geÃƒÂ§ici olarak devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakmak iÃƒÂ§in runtime flag'lerini kullanÃ„Â±n:

```bash
# Hook sÃ„Â±kÃ„Â±lÃ„Â±k profili (varsayÃ„Â±lan: standard)
export ECC_HOOK_PROFILE=standard

# Devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±lacak hook ID'leri (virgÃƒÂ¼lle ayrÃ„Â±lmÃ„Â±Ã…Å¸)
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

---

## Ã„Â°ÃƒÂ§indekiler

Bu repo bir **Claude Code plugin'i** - doÃ„Å¸rudan kurun veya component'leri manuel olarak kopyalayÃ„Â±n.

```
everything-claude-code/
|-- .claude-plugin/   # Plugin ve marketplace manifest'leri
|   |-- plugin.json         # Plugin metadata ve component path'leri
|   |-- marketplace.json    # /plugin marketplace add iÃƒÂ§in marketplace kataloÃ„Å¸u
|
|-- agents/           # Delegation iÃƒÂ§in 28 ÃƒÂ¶zel subagent
|   |-- planner.md           # Feature implementasyon planlama
|   |-- architect.md         # Sistem tasarÃ„Â±m kararlarÃ„Â±
|   |-- tdd-guide.md         # Test-driven development
|   |-- code-reviewer.md     # Kalite ve gÃƒÂ¼venlik incelemesi
|   |-- security-reviewer.md # GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± analizi
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # Playwright E2E testing
|   |-- refactor-cleaner.md  # Ãƒâ€“lÃƒÂ¼ kod temizleme
|   |-- doc-updater.md       # DokÃƒÂ¼mantasyon senkronizasyonu
|   |-- docs-lookup.md       # DokÃƒÂ¼mantasyon/API arama
|   |-- chief-of-staff.md    # Ã„Â°letiÃ…Å¸im triajÃ„Â± ve taslaklar
|   |-- loop-operator.md     # Otonom loop ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma
|   |-- harness-optimizer.md # Harness config ayarlama
|   |-- ve daha fazlasÃ„Â±...
|
|-- skills/           # Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â± tanÃ„Â±mlarÃ„Â± ve domain bilgisi
|   |-- coding-standards/           # Dil en iyi uygulamalarÃ„Â±
|   |-- backend-patterns/           # API, veritabanÃ„Â±, caching pattern'leri
|   |-- frontend-patterns/          # React, Next.js pattern'leri
|   |-- security-review/            # GÃƒÂ¼venlik kontrol listesi
|   |-- tdd-workflow/               # TDD metodolojisi
|   |-- continuous-learning/        # Oturumlardan otomatik pattern ÃƒÂ§Ã„Â±karma
|   |-- django-patterns/            # Django pattern'leri
|   |-- golang-patterns/            # Go deyimleri ve en iyi uygulamalar
|   |-- ve 100+ daha fazla skill...
|
|-- commands/         # HÃ„Â±zlÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma iÃƒÂ§in slash command'lar
|   |-- tdd.md              # /tdd - Test-driven development
|   |-- plan.md             # /plan - Implementasyon planlama
|   |-- e2e.md              # /e2e - E2E test oluÃ…Å¸turma
|   |-- code-review.md      # /code-review - Kalite incelemesi
|   |-- build-fix.md        # /build-fix - Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zelt
|   |-- ve 50+ daha fazla command...
|
|-- rules/            # Her zaman uyulmasÃ„Â± gereken kurallar (~/.claude/rules/ iÃƒÂ§ine kopyalayÃ„Â±n)
|   |-- README.md            # YapÃ„Â± genel bakÃ„Â±Ã…Å¸Ã„Â± ve kurulum rehberi
|   |-- common/              # Dilden baÃ„Å¸Ã„Â±msÃ„Â±z prensipler
|   |   |-- coding-style.md    # Immutability, dosya organizasyonu
|   |   |-- git-workflow.md    # Commit formatÃ„Â±, PR sÃƒÂ¼reci
|   |   |-- testing.md         # TDD, %80 coverage gereksinimi
|   |   |-- performance.md     # Model seÃƒÂ§imi, context yÃƒÂ¶netimi
|   |   |-- patterns.md        # TasarÃ„Â±m pattern'leri
|   |   |-- hooks.md           # Hook mimarisi
|   |   |-- agents.md          # Ne zaman subagent'lara delege edilmeli
|   |   |-- security.md        # Zorunlu gÃƒÂ¼venlik kontrolleri
|   |-- typescript/          # TypeScript/JavaScript ÃƒÂ¶zel
|   |-- python/              # Python ÃƒÂ¶zel
|   |-- golang/              # Go ÃƒÂ¶zel
|   |-- swift/               # Swift ÃƒÂ¶zel
|   |-- php/                 # PHP ÃƒÂ¶zel
|
|-- hooks/            # Trigger-tabanlÃ„Â± otomasyonlar
|   |-- hooks.json                # TÃƒÂ¼m hook'larÃ„Â±n config'i
|   |-- memory-persistence/       # Session lifecycle hook'larÃ„Â±
|   |-- strategic-compact/        # Compaction ÃƒÂ¶nerileri
|
|-- scripts/          # Ãƒâ€¡apraz platform Node.js script'leri
|   |-- lib/                     # PaylaÃ…Å¸Ã„Â±lan yardÃ„Â±mcÃ„Â±lar
|   |-- hooks/                   # Hook implementasyonlarÃ„Â±
|   |-- setup-package-manager.js # Interaktif PM kurulumu
|
|-- mcp-configs/      # MCP server konfigÃƒÂ¼rasyonlarÃ„Â±
|   |-- mcp-servers.json    # GitHub, Supabase, Vercel, Railway, vb.
```

---

## Hangi Agent'Ã„Â± KullanmalÃ„Â±yÃ„Â±m?

Nereden baÃ…Å¸layacaÃ„Å¸Ã„Â±nÃ„Â±zdan emin deÃ„Å¸il misiniz? Bu hÃ„Â±zlÃ„Â± referansÃ„Â± kullanÃ„Â±n:

| Yapmak istediÃ„Å¸im... | Bu command'Ã„Â± kullan | KullanÃ„Â±lan agent |
|---------------------|---------------------|------------------|
| Yeni bir feature planla | `/everything-claude-code:plan "Auth ekle"` | planner |
| Sistem mimarisi tasarla | `/everything-claude-code:plan` + architect agent | architect |
| Ãƒâ€“nce testlerle kod yaz | `/tdd` | tdd-guide |
| YazdÃ„Â±Ã„Å¸Ã„Â±m kodu incele | `/code-review` | code-reviewer |
| BaÃ…Å¸arÃ„Â±sÃ„Â±z bir build'i dÃƒÂ¼zelt | `/build-fix` | build-error-resolver |
| End-to-end testler ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r | `/e2e` | e2e-runner |
| GÃƒÂ¼venlik aÃƒÂ§Ã„Â±klarÃ„Â±nÃ„Â± bul | `/security-scan` | security-reviewer |
| Ãƒâ€“lÃƒÂ¼ kodu kaldÃ„Â±r | `/refactor-clean` | refactor-cleaner |
| DokÃƒÂ¼mantasyonu gÃƒÂ¼ncelle | `/update-docs` | doc-updater |
| Go kodu incele | `/go-review` | go-reviewer |
| Python kodu incele | `/python-review` | python-reviewer |

### YaygÃ„Â±n Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸larÃ„Â±

**Yeni bir feature baÃ…Å¸latma:**
```
/everything-claude-code:plan "OAuth ile kullanÃ„Â±cÃ„Â± kimlik doÃ„Å¸rulamasÃ„Â± ekle"
                                              Ã¢â€ â€™ planner implementasyon planÃ„Â± oluÃ…Å¸turur
/tdd                                          Ã¢â€ â€™ tdd-guide ÃƒÂ¶nce-test-yaz'Ã„Â± zorunlu kÃ„Â±lar
/code-review                                  Ã¢â€ â€™ code-reviewer ÃƒÂ§alÃ„Â±Ã…Å¸manÃ„Â±zÃ„Â± kontrol eder
```

**Bir hatayÃ„Â± dÃƒÂ¼zeltme:**
```
/tdd                                          Ã¢â€ â€™ tdd-guide: hatayÃ„Â± yeniden ÃƒÂ¼reten baÃ…Å¸arÃ„Â±sÃ„Â±z bir test yaz
                                              Ã¢â€ â€™ dÃƒÂ¼zeltmeyi uygula, testin geÃƒÂ§tiÃ„Å¸ini doÃ„Å¸rula
/code-review                                  Ã¢â€ â€™ code-reviewer: regresyonlarÃ„Â± yakala
```

**Production'a hazÃ„Â±rlanma:**
```
/security-scan                                Ã¢â€ â€™ security-reviewer: OWASP Top 10 denetimi
/e2e                                          Ã¢â€ â€™ e2e-runner: kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸Ã„Â± testleri
/test-coverage                                Ã¢â€ â€™ %80+ coverage doÃ„Å¸rula
```

---

## SSS

<details>
<summary><b>Hangi agent/command'larÃ„Â±n kurulu olduÃ„Å¸unu nasÃ„Â±l kontrol ederim?</b></summary>

```bash
/plugin list everything-claude-code@everything-claude-code
```

Bu, plugin'den mevcut tÃƒÂ¼m agent'larÃ„Â±, command'larÃ„Â± ve skill'leri gÃƒÂ¶sterir.
</details>

<details>
<summary><b>Hook'larÃ„Â±m ÃƒÂ§alÃ„Â±Ã…Å¸mÃ„Â±yor / "Duplicate hooks file" hatasÃ„Â± alÃ„Â±yorum</b></summary>

Bu en yaygÃ„Â±n sorundur. `.claude-plugin/plugin.json`'a bir `"hooks"` alanÃ„Â± **EKLEMEYÃ„Â°N**. Claude Code v2.1+ kurulu plugin'lerden `hooks/hooks.json`'Ã„Â± otomatik olarak yÃƒÂ¼kler. AÃƒÂ§Ã„Â±kÃƒÂ§a belirtmek duplicate algÃ„Â±lama hatalarÃ„Â±na neden olur. Bkz. [#29](https://github.com/affaan-m/everything-claude-code/issues/29), [#52](https://github.com/affaan-m/everything-claude-code/issues/52), [#103](https://github.com/affaan-m/everything-claude-code/issues/103).
</details>

<details>
<summary><b>Context window'um kÃƒÂ¼ÃƒÂ§ÃƒÂ¼lÃƒÂ¼yor / Claude context'ten tÃƒÂ¼keniyor</b></summary>

Ãƒâ€¡ok fazla MCP server context'inizi tÃƒÂ¼ketiyor. Her MCP tool aÃƒÂ§Ã„Â±klamasÃ„Â± 200k window'unuzdan token tÃƒÂ¼ketir, potansiyel olarak ~70k'ya dÃƒÂ¼Ã…Å¸ÃƒÂ¼rÃƒÂ¼r.

**DÃƒÂ¼zeltme:** KullanÃ„Â±lmayan MCP'leri proje baÃ…Å¸Ã„Â±na devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±n:
```json
// Projenizin .claude/settings.json dosyasÃ„Â±nda
{
  "disabledMcpServers": ["supabase", "railway", "vercel"]
}
```

10'dan az MCP etkin ve 80'den az aktif tool tutun.
</details>

<details>
<summary><b>Sadece bazÃ„Â± component'leri kullanabilir miyim (ÃƒÂ¶rn. sadece agent'lar)?</b></summary>

Evet. SeÃƒÂ§enek 2'yi (manuel kurulum) kullanÃ„Â±n ve yalnÃ„Â±zca ihtiyacÃ„Â±nÃ„Â±z olanÃ„Â± kopyalayÃ„Â±n:

```bash
# Sadece agent'lar
cp everything-claude-code/agents/*.md ~/.claude/agents/

# Sadece rule'lar
cp -r everything-claude-code/rules/common/* ~/.claude/rules/
```

Her component tamamen baÃ„Å¸Ã„Â±msÃ„Â±zdÃ„Â±r.
</details>

<details>
<summary><b>Bu Cursor / OpenCode / Codex / Antigravity ile ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r mÃ„Â±?</b></summary>

Evet. ECC ÃƒÂ§apraz platformdur:
- **Cursor**: `.cursor/` iÃƒÂ§inde ÃƒÂ¶nceden ÃƒÂ§evrilmiÃ…Å¸ config'ler. [Cursor IDE DesteÃ„Å¸i](#cursor-ide-desteÃ„Å¸i) bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼ne bakÃ„Â±n.
- **OpenCode**: `.opencode/` iÃƒÂ§inde tam plugin desteÃ„Å¸i. [OpenCode DesteÃ„Å¸i](#-opencode-desteÃ„Å¸i) bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼ne bakÃ„Â±n.
- **Codex**: macOS app ve CLI iÃƒÂ§in birinci sÃ„Â±nÃ„Â±f destek. PR [#257](https://github.com/affaan-m/everything-claude-code/pull/257)'ye bakÃ„Â±n.
- **Antigravity**: Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±, skill'ler ve `.agent/` iÃƒÂ§inde dÃƒÂ¼zleÃ…Å¸tirilmiÃ…Å¸ rule'lar iÃƒÂ§in sÃ„Â±kÃ„Â± entegre kurulum.
- **Claude Code**: Native Ã¢â‚¬â€ bu birincil hedeftir.
</details>

<details>
<summary><b>Yeni bir skill veya agent'a nasÃ„Â±l katkÃ„Â±da bulunurum?</b></summary>

[CONTRIBUTING.md](../../CONTRIBUTING.md)'ye bakÃ„Â±n. KÃ„Â±sa versiyon:
1. Repo'yu fork'layÃ„Â±n
2. `skills/your-skill-name/SKILL.md` iÃƒÂ§inde skill'inizi oluÃ…Å¸turun (YAML frontmatter ile)
3. Veya `agents/your-agent.md` iÃƒÂ§inde bir agent oluÃ…Å¸turun
4. Ne yaptÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± ve ne zaman kullanÃ„Â±lacaÃ„Å¸Ã„Â±nÃ„Â± aÃƒÂ§Ã„Â±klayan net bir aÃƒÂ§Ã„Â±klamayla PR gÃƒÂ¶nderin
</details>

---

## Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

Plugin kapsamlÃ„Â± bir test suite iÃƒÂ§erir:

```bash
# TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
node tests/run-all.js

# Bireysel test dosyalarÃ„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

---

## KatkÃ„Â±da Bulunma

**KatkÃ„Â±lar beklenir ve teÃ…Å¸vik edilir.**

Bu repo bir topluluk kaynaÃ„Å¸Ã„Â± olmayÃ„Â± amaÃƒÂ§lar. EÃ„Å¸er Ã…Å¸unlara sahipseniz:
- YararlÃ„Â± agent'lar veya skill'ler
- AkÃ„Â±llÃ„Â± hook'lar
- Daha iyi MCP konfigÃƒÂ¼rasyonlarÃ„Â±
- Ã„Â°yileÃ…Å¸tirilmiÃ…Å¸ rule'lar

LÃƒÂ¼tfen katkÃ„Â±da bulunun! Rehber iÃƒÂ§in [CONTRIBUTING.md](../../CONTRIBUTING.md)'ye bakÃ„Â±n.

### KatkÃ„Â± Fikirleri

- Dile ÃƒÂ¶zel skill'ler (Rust, C#, Kotlin, Java) Ã¢â‚¬â€ Go, Python, Perl, Swift ve TypeScript zaten dahil
- Framework'e ÃƒÂ¶zel config'ler (Rails, FastAPI, NestJS) Ã¢â‚¬â€ Django, Spring Boot, Laravel zaten dahil
- DevOps agent'larÃ„Â± (Kubernetes, Terraform, AWS, Docker)
- Test stratejileri (farklÃ„Â± framework'ler, gÃƒÂ¶rsel regresyon)
- Domain'e ÃƒÂ¶zel bilgi (ML, data engineering, mobile)

---

## Lisans

MIT - Ãƒâ€“zgÃƒÂ¼rce kullanÃ„Â±n, ihtiyaÃƒÂ§ duyduÃ„Å¸unuz gibi deÃ„Å¸iÃ…Å¸tirin, yapabiliyorsanÃ„Â±z geri katkÃ„Â±da bulunun.

---

**Bu repo size yardÃ„Â±mcÃ„Â± olduysa yÃ„Â±ldÃ„Â±zlayÃ„Â±n. Her iki rehberi de okuyun. Harika bir Ã…Å¸ey yapÃ„Â±n.**
