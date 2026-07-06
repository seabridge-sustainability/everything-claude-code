# DeÃ„Å¸iÃ…Å¸iklik GÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼

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


## 1.9.0 - 2026-03-20

### Ãƒâ€“ne Ãƒâ€¡Ã„Â±kanlar

- Manifest tabanlÃ„Â± pipeline ve SQLite state store ile seÃƒÂ§ici kurulum mimarisi.
- 6 yeni ajan ve dile ÃƒÂ¶zgÃƒÂ¼ kurallarla 10+ ekosisteme geniÃ…Å¸letilmiÃ…Å¸ dil kapsamÃ„Â±.
- Bellek azaltma, sandbox dÃƒÂ¼zeltmeleri ve 5 katmanlÃ„Â± dÃƒÂ¶ngÃƒÂ¼ korumasÃ„Â± ile saÃ„Å¸lamlaÃ…Å¸tÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ Observer gÃƒÂ¼venilirliÃ„Å¸i.
- Beceri evrimi ve session adaptÃƒÂ¶rleri ile kendini geliÃ…Å¸tiren beceriler temeli.

### Yeni Ajanlar

- `typescript-reviewer` Ã¢â‚¬â€ TypeScript/JavaScript kod inceleme uzmanÃ„Â± (#647)
- `pytorch-build-resolver` Ã¢â‚¬â€ PyTorch runtime, CUDA ve eÃ„Å¸itim hatasÃ„Â± ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼ (#549)
- `java-build-resolver` Ã¢â‚¬â€ Maven/Gradle build hatasÃ„Â± ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼ (#538)
- `java-reviewer` Ã¢â‚¬â€ Java ve Spring Boot kod incelemesi (#528)
- `kotlin-reviewer` Ã¢â‚¬â€ Kotlin/Android/KMP kod incelemesi (#309)
- `kotlin-build-resolver` Ã¢â‚¬â€ Kotlin/Gradle build hatalarÃ„Â± (#309)
- `rust-reviewer` Ã¢â‚¬â€ Rust kod incelemesi (#523)
- `rust-build-resolver` Ã¢â‚¬â€ Rust build hatasÃ„Â± ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼ (#523)
- `docs-lookup` Ã¢â‚¬â€ DokÃƒÂ¼mantasyon ve API referans araÃ…Å¸tÃ„Â±rmasÃ„Â± (#529)

### Yeni Beceriler

- `pytorch-patterns` Ã¢â‚¬â€ PyTorch derin ÃƒÂ¶Ã„Å¸renme iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± (#550)
- `documentation-lookup` Ã¢â‚¬â€ API referans ve kÃƒÂ¼tÃƒÂ¼phane dokÃƒÂ¼manÃ„Â± araÃ…Å¸tÃ„Â±rmasÃ„Â± (#529)
- `bun-runtime` Ã¢â‚¬â€ Bun runtime kalÃ„Â±plarÃ„Â± (#529)
- `nextjs-turbopack` Ã¢â‚¬â€ Next.js Turbopack iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± (#529)
- `mcp-server-patterns` Ã¢â‚¬â€ MCP sunucu tasarÃ„Â±m kalÃ„Â±plarÃ„Â± (#531)
- `data-scraper-agent` Ã¢â‚¬â€ AI destekli genel veri toplama (#503)
- `team-builder` Ã¢â‚¬â€ TakÃ„Â±m kompozisyon becerisi (#501)
- `ai-regression-testing` Ã¢â‚¬â€ AI regresyon test iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± (#433)
- `claude-devfleet` Ã¢â‚¬â€ Ãƒâ€¡ok ajanlÃ„Â± orkestrasyon (#505)
- `blueprint` Ã¢â‚¬â€ Ãƒâ€¡ok oturumlu yapÃ„Â± planlamasÃ„Â±
- `everything-claude-code` Ã¢â‚¬â€ Ãƒâ€“z-referansiyel ECC becerisi (#335)
- `prompt-optimizer` Ã¢â‚¬â€ Prompt optimizasyon becerisi (#418)
- 8 Evos operasyonel alan becerisi (#290)
- 3 Laravel becerisi (#420)
- VideoDB becerileri (#301)

### Yeni Komutlar

- `/docs` Ã¢â‚¬â€ DokÃƒÂ¼mantasyon arama (#530)
- `/aside` Ã¢â‚¬â€ Yan konuÃ…Å¸ma (#407)
- `/prompt-optimize` Ã¢â‚¬â€ Prompt optimizasyonu (#418)
- `/resume-session`, `/save-session` Ã¢â‚¬â€ Oturum yÃƒÂ¶netimi
- Kontrol listesi tabanlÃ„Â± holistik karar ile `learn-eval` iyileÃ…Å¸tirmeleri

### Yeni Kurallar

- Java dil kurallarÃ„Â± (#645)
- PHP kural paketi (#389)
- Perl dil kurallarÃ„Â± ve becerileri (kalÃ„Â±plar, gÃƒÂ¼venlik, test)
- Kotlin/Android/KMP kurallarÃ„Â± (#309)
- C++ dil desteÃ„Å¸i (#539)
- Rust dil desteÃ„Å¸i (#523)

### AltyapÃ„Â±

- Manifest ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlemesi ile seÃƒÂ§ici kurulum mimarisi (`install-plan.js`, `install-apply.js`) (#509, #512)
- Kurulu bileÃ…Å¸enleri izlemek iÃƒÂ§in sorgu CLI'si ile SQLite state store (#510)
- YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ oturum kaydÃ„Â± iÃƒÂ§in session adaptÃƒÂ¶rleri (#511)
- Kendini geliÃ…Å¸tiren beceriler iÃƒÂ§in beceri evrimi temeli (#514)
- Deterministik puanlama ile orkestrasyon harness (#524)
- CI'da katalog sayÃ„Â±sÃ„Â± kontrolÃƒÂ¼ (#525)
- TÃƒÂ¼m 109 beceri iÃƒÂ§in install manifest doÃ„Å¸rulamasÃ„Â± (#537)
- PowerShell installer wrapper (#532)
- `--target antigravity` bayraÃ„Å¸Ã„Â± ile Antigravity IDE desteÃ„Å¸i (#332)
- Codex CLI ÃƒÂ¶zelleÃ…Å¸tirme scriptleri (#336)

### Hata DÃƒÂ¼zeltmeleri

- 6 dosyada 19 CI test hatasÃ„Â±nÃ„Â±n ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼ (#519)
- Install pipeline, orchestrator ve repair'da 8 test hatasÃ„Â±nÃ„Â±n dÃƒÂ¼zeltmesi (#564)
- Azaltma, yeniden giriÃ…Å¸ korumasÃ„Â± ve tail ÃƒÂ¶rneklemesi ile Observer bellek patlamasÃ„Â± (#536)
- Haiku ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± iÃƒÂ§in Observer sandbox eriÃ…Å¸im dÃƒÂ¼zeltmesi (#661)
- Worktree proje ID uyumsuzluÃ„Å¸u dÃƒÂ¼zeltmesi (#665)
- Observer lazy-start mantÃ„Â±Ã„Å¸Ã„Â± (#508)
- Observer 5 katmanlÃ„Â± dÃƒÂ¶ngÃƒÂ¼ ÃƒÂ¶nleme korumasÃ„Â± (#399)
- Hook taÃ…Å¸Ã„Â±nabilirliÃ„Å¸i ve Windows .cmd desteÃ„Å¸i
- Biome hook optimizasyonu Ã¢â‚¬â€ npx yÃƒÂ¼kÃƒÂ¼ elimine edildi (#359)
- InsAIts gÃƒÂ¼venlik hook'u opt-in yapÃ„Â±ldÃ„Â± (#370)
- Windows spawnSync export dÃƒÂ¼zeltmesi (#431)
- instinct CLI iÃƒÂ§in UTF-8 kodlama dÃƒÂ¼zeltmesi (#353)
- Hook'larda secret scrubbing (#348)

### Ãƒâ€¡eviriler

- Korece (ko-KR) ÃƒÂ§eviri Ã¢â‚¬â€ README, ajanlar, komutlar, beceriler, kurallar (#392)
- Ãƒâ€¡ince (zh-CN) dokÃƒÂ¼mantasyon senkronizasyonu (#428)

### KatkÃ„Â±da Bulunanlar

- @ymdvsymd Ã¢â‚¬â€ observer sandbox ve worktree dÃƒÂ¼zeltmeleri
- @pythonstrup Ã¢â‚¬â€ biome hook optimizasyonu
- @Nomadu27 Ã¢â‚¬â€ InsAIts gÃƒÂ¼venlik hook'u
- @hahmee Ã¢â‚¬â€ Korece ÃƒÂ§eviri
- @zdocapp Ã¢â‚¬â€ Ãƒâ€¡ince ÃƒÂ§eviri senkronizasyonu
- @cookiee339 Ã¢â‚¬â€ Kotlin ekosistemi
- @pangerlkr Ã¢â‚¬â€ CI iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± dÃƒÂ¼zeltmeleri
- @0xrohitgarg Ã¢â‚¬â€ VideoDB becerileri
- @nocodemf Ã¢â‚¬â€ Evos operasyonel becerileri
- @swarnika-cmd Ã¢â‚¬â€ topluluk katkÃ„Â±larÃ„Â±

## 1.8.0 - 2026-03-04

### Ãƒâ€“ne Ãƒâ€¡Ã„Â±kanlar

- GÃƒÂ¼venilirlik, eval disiplini ve otonom dÃƒÂ¶ngÃƒÂ¼ operasyonlarÃ„Â±na odaklanan harness-first sÃƒÂ¼rÃƒÂ¼m.
- Hook runtime artÃ„Â±k profil tabanlÃ„Â± kontrol ve hedefli hook devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakmayÃ„Â± destekliyor.
- NanoClaw v2, model yÃƒÂ¶nlendirme, beceri hot-load, dallanma, arama, sÃ„Â±kÃ„Â±Ã…Å¸tÃ„Â±rma, dÃ„Â±Ã…Å¸a aktarma ve metrikler ekliyor.

### Ãƒâ€¡ekirdek

- Yeni komutlar eklendi: `/harness-audit`, `/loop-start`, `/loop-status`, `/quality-gate`, `/model-route`.
- Yeni beceriler eklendi:
  - `agent-harness-construction`
  - `agentic-engineering`
  - `ralphinho-rfc-pipeline`
  - `ai-first-engineering`
  - `enterprise-agent-ops`
  - `nanoclaw-repl`
  - `continuous-agent-loop`
- Yeni ajanlar eklendi:
  - `harness-optimizer`
  - `loop-operator`

### Hook GÃƒÂ¼venilirliÃ„Å¸i

- SaÃ„Å¸lam yedek arama ile SessionStart root ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlemesi dÃƒÂ¼zeltildi.
- Oturum ÃƒÂ¶zet kalÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±, transcript payload'Ã„Â±n mevcut olduÃ„Å¸u `Stop`'a taÃ…Å¸Ã„Â±ndÃ„Â±.
- Quality-gate ve cost-tracker hook'larÃ„Â± eklendi.
- KÃ„Â±rÃ„Â±lgan inline hook tek satÃ„Â±rlÃ„Â±klarÃ„Â± ÃƒÂ¶zel script dosyalarÃ„Â±yla deÃ„Å¸iÃ…Å¸tirildi.
- `ECC_HOOK_PROFILE` ve `ECC_DISABLED_HOOKS` kontrolleri eklendi.

### Platformlar ArasÃ„Â±

- DokÃƒÂ¼man uyarÃ„Â± mantÃ„Â±Ã„Å¸Ã„Â±nda Windows-safe yol iÃ…Å¸leme iyileÃ…Å¸tirildi.
- EtkileÃ…Å¸imsiz takÃ„Â±lmalarÃ„Â± ÃƒÂ¶nlemek iÃƒÂ§in Observer dÃƒÂ¶ngÃƒÂ¼ davranÃ„Â±Ã…Å¸Ã„Â± saÃ„Å¸lamlaÃ…Å¸tÃ„Â±rÃ„Â±ldÃ„Â±.

### Notlar

- `autonomous-loops`, bir sÃƒÂ¼rÃƒÂ¼m iÃƒÂ§in uyumluluk takma adÃ„Â± olarak tutuldu; `continuous-agent-loop` kanonik isimdir.

### KatkÃ„Â±da Bulunanlar

- [zarazhangrui](https://github.com/zarazhangrui) tarafÃ„Â±ndan ilham alÃ„Â±ndÃ„Â±
- [humanplane](https://github.com/humanplane) tarafÃ„Â±ndan homunculus-ilhamlÃ„Â±
