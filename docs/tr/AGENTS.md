# Everything Claude Code (ECC) Ã¢â‚¬â€ Agent TalimatlarÃ„Â±

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


Bu, yazÃ„Â±lÃ„Â±m geliÃ…Å¸tirme iÃƒÂ§in 28 ÃƒÂ¶zel agent, 116 skill, 59 command ve otomatik hook iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± saÃ„Å¸layan **ÃƒÂ¼retime hazÃ„Â±r bir AI kodlama eklentisidir**.

**SÃƒÂ¼rÃƒÂ¼m:** 1.9.0

## Temel Ã„Â°lkeler

1. **Agent-Ãƒâ€“ncelikli** Ã¢â‚¬â€ Alan gÃƒÂ¶revleri iÃƒÂ§in ÃƒÂ¶zel agentlara delege edin
2. **Test-OdaklÃ„Â±** Ã¢â‚¬â€ Uygulamadan ÃƒÂ¶nce testler yazÃ„Â±n, %80+ kapsama gereklidir
3. **GÃƒÂ¼venlik-Ãƒâ€“ncelikli** Ã¢â‚¬â€ GÃƒÂ¼venlikten asla taviz vermeyin; tÃƒÂ¼m girdileri doÃ„Å¸rulayÃ„Â±n
4. **DeÃ„Å¸iÃ…Å¸mezlik** Ã¢â‚¬â€ Her zaman yeni nesneler oluÃ…Å¸turun, mevcut olanlarÃ„Â± asla deÃ„Å¸iÃ…Å¸tirmeyin
5. **Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rmadan Ãƒâ€“nce PlanlayÃ„Â±n** Ã¢â‚¬â€ KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellikleri kod yazmadan ÃƒÂ¶nce planlayÃ„Â±n

## Mevcut Agentlar

| Agent | AmaÃƒÂ§ | Ne Zaman KullanÃ„Â±lÃ„Â±r |
|-------|---------|-------------|
| planner | Uygulama planlamasÃ„Â± | KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellikler, yeniden dÃƒÂ¼zenleme |
| architect | Sistem tasarÃ„Â±mÃ„Â± ve ÃƒÂ¶lÃƒÂ§eklenebilirlik | Mimari kararlar |
| tdd-guide | Test-odaklÃ„Â± geliÃ…Å¸tirme | Yeni ÃƒÂ¶zellikler, hata dÃƒÂ¼zeltmeleri |
| code-reviewer | Kod kalitesi ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilirlik | Kod yazma/deÃ„Å¸iÃ…Å¸tirme sonrasÃ„Â± |
| security-reviewer | GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± tespiti | Commitlerden ÃƒÂ¶nce, hassas kod |
| build-error-resolver | Build/tip hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zeltme | Build baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unda |
| e2e-runner | UÃƒÂ§tan uca Playwright testi | Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â± |
| refactor-cleaner | Ãƒâ€“lÃƒÂ¼ kod temizleme | Kod bakÃ„Â±mÃ„Â± |
| doc-updater | DokÃƒÂ¼mantasyon ve codemaps | DokÃƒÂ¼manlarÃ„Â± gÃƒÂ¼ncelleme |
| docs-lookup | DokÃƒÂ¼mantasyon ve API referans araÃ…Å¸tÃ„Â±rmasÃ„Â± | KÃƒÂ¼tÃƒÂ¼phane/API dokÃƒÂ¼mantasyon sorularÃ„Â± |
| cpp-reviewer | C++ kod incelemesi | C++ projeleri |
| cpp-build-resolver | C++ build hatalarÃ„Â± | C++ build baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| go-reviewer | Go kod incelemesi | Go projeleri |
| go-build-resolver | Go build hatalarÃ„Â± | Go build baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| kotlin-reviewer | Kotlin kod incelemesi | Kotlin/Android/KMP projeleri |
| kotlin-build-resolver | Kotlin/Gradle build hatalarÃ„Â± | Kotlin build baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| database-reviewer | PostgreSQL/Supabase uzmanÃ„Â± | Ã…Å¾ema tasarÃ„Â±mÃ„Â±, sorgu optimizasyonu |
| python-reviewer | Python kod incelemesi | Python projeleri |
| java-reviewer | Java ve Spring Boot kod incelemesi | Java/Spring Boot projeleri |
| java-build-resolver | Java/Maven/Gradle build hatalarÃ„Â± | Java build baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| chief-of-staff | Ã„Â°letiÃ…Å¸im ÃƒÂ¶nceliklendirme ve taslaklar | Ãƒâ€¡ok kanallÃ„Â± email, Slack, LINE, Messenger |
| loop-operator | Otonom dÃƒÂ¶ngÃƒÂ¼ yÃƒÂ¼rÃƒÂ¼tme | DÃƒÂ¶ngÃƒÂ¼leri gÃƒÂ¼venli ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma, takÃ„Â±lmalarÃ„Â± izleme, mÃƒÂ¼dahale |
| harness-optimizer | Harness yapÃ„Â±landÃ„Â±rma ayarlama | GÃƒÂ¼venilirlik, maliyet, verimlilik |
| rust-reviewer | Rust kod incelemesi | Rust projeleri |
| rust-build-resolver | Rust build hatalarÃ„Â± | Rust build baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| pytorch-build-resolver | PyTorch runtime/CUDA/eÃ„Å¸itim hatalarÃ„Â± | PyTorch build/eÃ„Å¸itim baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarÃ„Â± |
| typescript-reviewer | TypeScript/JavaScript kod incelemesi | TypeScript/JavaScript projeleri |

## Agent Orkestrasyonu

AgentlarÃ„Â± kullanÃ„Â±cÃ„Â± istemi olmadan proaktif olarak kullanÃ„Â±n:
- KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellik istekleri Ã¢â€ â€™ **planner**
- Yeni yazÃ„Â±lan/deÃ„Å¸iÃ…Å¸tirilen kod Ã¢â€ â€™ **code-reviewer**
- Hata dÃƒÂ¼zeltme veya yeni ÃƒÂ¶zellik Ã¢â€ â€™ **tdd-guide**
- Mimari karar Ã¢â€ â€™ **architect**
- GÃƒÂ¼venlik aÃƒÂ§Ã„Â±sÃ„Â±ndan hassas kod Ã¢â€ â€™ **security-reviewer**
- Ãƒâ€¡ok kanallÃ„Â± iletiÃ…Å¸im ÃƒÂ¶nceliklendirme Ã¢â€ â€™ **chief-of-staff**
- Otonom dÃƒÂ¶ngÃƒÂ¼ler / dÃƒÂ¶ngÃƒÂ¼ izleme Ã¢â€ â€™ **loop-operator**
- Harness yapÃ„Â±landÃ„Â±rma gÃƒÂ¼venilirliÃ„Å¸i ve maliyeti Ã¢â€ â€™ **harness-optimizer**

BaÃ„Å¸Ã„Â±msÃ„Â±z iÃ…Å¸lemler iÃƒÂ§in paralel yÃƒÂ¼rÃƒÂ¼tme kullanÃ„Â±n Ã¢â‚¬â€ birden fazla agenti aynÃ„Â± anda baÃ…Å¸latÃ„Â±n.

## GÃƒÂ¼venlik KurallarÃ„Â±

**HERHANGÃ„Â° BÃ„Â°R committen ÃƒÂ¶nce:**
- Sabit kodlanmÃ„Â±Ã…Å¸ sÃ„Â±rlar yok (API anahtarlarÃ„Â±, Ã…Å¸ifreler, tokenlar)
- TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdileri doÃ„Å¸rulanmÃ„Â±Ã…Å¸
- SQL injection korumasÃ„Â± (parametreli sorgular)
- XSS korumasÃ„Â± (sanitize edilmiÃ…Å¸ HTML)
- CSRF korumasÃ„Â± etkin
- Kimlik doÃ„Å¸rulama/yetkilendirme doÃ„Å¸rulanmÃ„Â±Ã…Å¸
- TÃƒÂ¼m endpointlerde hÃ„Â±z sÃ„Â±nÃ„Â±rlama
- Hata mesajlarÃ„Â± hassas veri sÃ„Â±zdÃ„Â±rmÃ„Â±yor

**SÃ„Â±r yÃƒÂ¶netimi:** SÃ„Â±rlarÃ„Â± asla sabit kodlamayÃ„Â±n. Ortam deÃ„Å¸iÃ…Å¸kenlerini veya bir sÃ„Â±r yÃƒÂ¶neticisini kullanÃ„Â±n. BaÃ…Å¸langÃ„Â±ÃƒÂ§ta gerekli sÃ„Â±rlarÃ„Â± doÃ„Å¸rulayÃ„Â±n. Ã„Â°fÃ…Å¸a edilen sÃ„Â±rlarÃ„Â± hemen dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼n.

**GÃƒÂ¼venlik sorunu bulunursa:** DUR Ã¢â€ â€™ security-reviewer agentini kullan Ã¢â€ â€™ KRÃ„Â°TÃ„Â°K sorunlarÃ„Â± dÃƒÂ¼zelt Ã¢â€ â€™ ifÃ…Å¸a edilen sÃ„Â±rlarÃ„Â± dÃƒÂ¶ndÃƒÂ¼r Ã¢â€ â€™ kod tabanÃ„Â±nÃ„Â± benzer sorunlar iÃƒÂ§in incele.

## Kodlama Stili

**DeÃ„Å¸iÃ…Å¸mezlik (KRÃ„Â°TÃ„Â°K):** Her zaman yeni nesneler oluÃ…Å¸turun, asla deÃ„Å¸iÃ…Å¸tirmeyin. DeÃ„Å¸iÃ…Å¸iklikler uygulanmÃ„Â±Ã…Å¸ yeni kopyalar dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼n.

**Dosya organizasyonu:** Az sayÃ„Â±da bÃƒÂ¼yÃƒÂ¼k dosya yerine ÃƒÂ§ok sayÃ„Â±da kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k dosya. Tipik 200-400 satÃ„Â±r, maksimum 800. Tipe gÃƒÂ¶re deÃ„Å¸il, ÃƒÂ¶zelliÃ„Å¸e/alana gÃƒÂ¶re dÃƒÂ¼zenleyin. YÃƒÂ¼ksek baÃ„Å¸lÃ„Â±lÃ„Â±k, dÃƒÂ¼Ã…Å¸ÃƒÂ¼k baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k.

**Hata yÃƒÂ¶netimi:** Her seviyede hatalarÃ„Â± ele alÃ„Â±n. UI kodunda kullanÃ„Â±cÃ„Â± dostu mesajlar saÃ„Å¸layÃ„Â±n. Sunucu tarafÃ„Â±nda detaylÃ„Â± baÃ„Å¸lamÃ„Â± loglayÃ„Â±n. HatalarÃ„Â± asla sessizce yutmayÃ„Â±n.

**Girdi doÃ„Å¸rulama:** Sistem sÃ„Â±nÃ„Â±rlarÃ„Â±nda tÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdilerini doÃ„Å¸rulayÃ„Â±n. Ã…Å¾ema tabanlÃ„Â± doÃ„Å¸rulama kullanÃ„Â±n. Net mesajlarla hÃ„Â±zlÃ„Â± baÃ…Å¸arÃ„Â±sÃ„Â±z olun. Harici verilere asla gÃƒÂ¼venmeyin.

**Kod kalite kontrol listesi:**
- Fonksiyonlar kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k (<50 satÃ„Â±r), dosyalar odaklÃ„Â± (<800 satÃ„Â±r)
- Derin iÃƒÂ§ iÃƒÂ§e geÃƒÂ§me yok (>4 seviye)
- DÃƒÂ¼zgÃƒÂ¼n hata yÃƒÂ¶netimi, sabit kodlanmÃ„Â±Ã…Å¸ deÃ„Å¸erler yok
- Okunabilir, iyi adlandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ tanÃ„Â±mlayÃ„Â±cÃ„Â±lar

## Test Gereksinimleri

**Minimum kapsama: %80**

Test tipleri (hepsi gereklidir):
1. **Unit testler** Ã¢â‚¬â€ Bireysel fonksiyonlar, yardÃ„Â±mcÃ„Â± programlar, bileÃ…Å¸enler
2. **Integration testler** Ã¢â‚¬â€ API endpointleri, veritabanÃ„Â± iÃ…Å¸lemleri
3. **E2E testler** Ã¢â‚¬â€ Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â±

**TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± (zorunlu):**
1. Ãƒâ€“nce test yaz (KIRMIZI) Ã¢â‚¬â€ test BAÃ…Å¾ARISIZ olmalÃ„Â±
2. Minimal uygulama yaz (YEÃ…Å¾Ã„Â°L) Ã¢â‚¬â€ test BAÃ…Å¾ARILI olmalÃ„Â±
3. Yeniden dÃƒÂ¼zenle (Ã„Â°YÃ„Â°LEÃ…Å¾TÃ„Â°R) Ã¢â‚¬â€ %80+ kapsama doÃ„Å¸rula

BaÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±k sorunlarÃ„Â±nÃ„Â± giderin: test izolasyonunu kontrol edin Ã¢â€ â€™ mocklarÃ„Â±nÃ„Â± doÃ„Å¸rulayÃ„Â±n Ã¢â€ â€™ uygulamayÃ„Â± dÃƒÂ¼zeltin (testleri deÃ„Å¸il, testler yanlÃ„Â±Ã…Å¸ olmadÃ„Â±kÃƒÂ§a).

## GeliÃ…Å¸tirme Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

1. **Planlama** Ã¢â‚¬â€ Planner agentini kullanÃ„Â±n, baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± ve riskleri belirleyin, aÃ…Å¸amalara bÃƒÂ¶lÃƒÂ¼n
2. **TDD** Ã¢â‚¬â€ tdd-guide agentini kullanÃ„Â±n, ÃƒÂ¶nce testleri yazÃ„Â±n, uygulayÃ„Â±n, yeniden dÃƒÂ¼zenleyin
3. **Ã„Â°nceleme** Ã¢â‚¬â€ code-reviewer agentini hemen kullanÃ„Â±n, KRÃ„Â°TÃ„Â°K/YÃƒÅ“KSEK sorunlarÃ„Â± ele alÃ„Â±n
4. **Bilgiyi doÃ„Å¸ru yerde yakalayÃ„Â±n**
   - KiÃ…Å¸isel hata ayÃ„Â±klama notlarÃ„Â±, tercihler ve geÃƒÂ§ici baÃ„Å¸lam Ã¢â€ â€™ otomatik bellek
   - TakÃ„Â±m/proje bilgisi (mimari kararlar, API deÃ„Å¸iÃ…Å¸iklikleri, runbook'lar) Ã¢â€ â€™ projenin mevcut dokÃƒÂ¼man yapÃ„Â±sÃ„Â±
   - Mevcut gÃƒÂ¶rev zaten ilgili dokÃƒÂ¼manlarÃ„Â± veya kod yorumlarÃ„Â±nÃ„Â± ÃƒÂ¼retiyorsa, aynÃ„Â± bilgiyi baÃ…Å¸ka yerde ÃƒÂ§oÃ„Å¸altmayÃ„Â±n
   - AÃƒÂ§Ã„Â±k bir proje dokÃƒÂ¼man konumu yoksa, yeni bir ÃƒÂ¼st dÃƒÂ¼zey dosya oluÃ…Å¸turmadan ÃƒÂ¶nce sorun
5. **Commit** Ã¢â‚¬â€ Conventional commits formatÃ„Â±, kapsamlÃ„Â± PR ÃƒÂ¶zetleri

## Git Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

**Commit formatÃ„Â±:** `<type>: <description>` Ã¢â‚¬â€ Tipler: feat, fix, refactor, docs, test, chore, perf, ci

**PR iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±:** Tam commit geÃƒÂ§miÃ…Å¸ini analiz edin Ã¢â€ â€™ kapsamlÃ„Â± ÃƒÂ¶zet taslaÃ„Å¸Ã„Â± oluÃ…Å¸turun Ã¢â€ â€™ test planÃ„Â± ekleyin Ã¢â€ â€™ `-u` bayraÃ„Å¸Ã„Â±yla pushlayÃ„Â±n.

## Mimari Desenler

**API yanÃ„Â±t formatÃ„Â±:** BaÃ…Å¸arÃ„Â± gÃƒÂ¶stergesi, veri yÃƒÂ¼kÃƒÂ¼, hata mesajÃ„Â± ve sayfalandÃ„Â±rma metadatasÃ„Â± iÃƒÂ§eren tutarlÃ„Â± zarf.

**Repository deseni:** Veri eriÃ…Å¸imini standart arayÃƒÂ¼z arkasÃ„Â±nda kapsÃƒÂ¼lleyin (findAll, findById, create, update, delete). Ã„Â°Ã…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± depolama mekanizmasÃ„Â±na deÃ„Å¸il, soyut arayÃƒÂ¼ze baÃ„Å¸lÃ„Â±dÃ„Â±r.

**Skeleton projeleri:** SavaÃ…Å¸ testinden geÃƒÂ§miÃ…Å¸ Ã…Å¸ablonlarÃ„Â± arayÃ„Â±n, paralel agentlarla deÃ„Å¸erlendirin (gÃƒÂ¼venlik, geniÃ…Å¸letilebilirlik, uygunluk), en iyi eÃ…Å¸leÃ…Å¸meyi klonlayÃ„Â±n, kanÃ„Â±tlanmÃ„Â±Ã…Å¸ yapÃ„Â± iÃƒÂ§inde yineleyin.

## Performans

**BaÃ„Å¸lam yÃƒÂ¶netimi:** BÃƒÂ¼yÃƒÂ¼k yeniden dÃƒÂ¼zenlemeler ve ÃƒÂ§ok dosyalÃ„Â± ÃƒÂ¶zellikler iÃƒÂ§in baÃ„Å¸lam penceresinin son %20'sinden kaÃƒÂ§Ã„Â±nÃ„Â±n. Daha dÃƒÂ¼Ã…Å¸ÃƒÂ¼k hassasiyet gerektiren gÃƒÂ¶revler (tekli dÃƒÂ¼zenlemeler, dokÃƒÂ¼manlar, basit dÃƒÂ¼zeltmeler) daha yÃƒÂ¼ksek kullanÃ„Â±mÃ„Â± tolere eder.

**Build sorun giderme:** build-error-resolver agentini kullanÃ„Â±n Ã¢â€ â€™ hatalarÃ„Â± analiz edin Ã¢â€ â€™ artÃ„Â±mlÃ„Â± olarak dÃƒÂ¼zeltin Ã¢â€ â€™ her dÃƒÂ¼zeltmeden sonra doÃ„Å¸rulayÃ„Â±n.

## Proje YapÃ„Â±sÃ„Â±

```
agents/          Ã¢â‚¬â€ 28 ÃƒÂ¶zel subagent
skills/          Ã¢â‚¬â€ 115 iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± skillleri ve alan bilgisi
commands/        Ã¢â‚¬â€ 59 slash command
hooks/           Ã¢â‚¬â€ Tetikleyici tabanlÃ„Â± otomasyonlar
rules/           Ã¢â‚¬â€ Her zaman uyulmasÃ„Â± gereken kurallar (ortak + dile ÃƒÂ¶zel)
scripts/         Ã¢â‚¬â€ Platformlar arasÃ„Â± Node.js yardÃ„Â±mcÃ„Â± programlarÃ„Â±
mcp-configs/     Ã¢â‚¬â€ 14 MCP sunucu yapÃ„Â±landÃ„Â±rmasÃ„Â±
tests/           Ã¢â‚¬â€ Test paketi
```

## BaÃ…Å¸arÃ„Â± Metrikleri

- TÃƒÂ¼m testler %80+ kapsama ile geÃƒÂ§er
- GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± yoktur
- Kod okunabilir ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilirdir
- Performans kabul edilebilirdir
- KullanÃ„Â±cÃ„Â± gereksinimleri karÃ…Å¸Ã„Â±lanmÃ„Â±Ã…Å¸tÃ„Â±r
