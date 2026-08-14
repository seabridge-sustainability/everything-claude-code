# Everything Claude Code (ECC) — Agent Talimatları

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

Bu, yazılım geliştirme için 68 özel agent, 284 skill, 94 command ve otomatik hook iş akışları sağlayan **üretime hazır bir AI kodlama eklentisidir**.

**Sürüm:** 2.2.0

## Temel İlkeler

1. **Agent-Öncelikli** — Alan görevleri için özel agentlara delege edin
2. **Test-Odaklı** — Uygulamadan önce testler yazın, %80+ kapsama gereklidir
3. **Güvenlik-Öncelikli** — Güvenlikten asla taviz vermeyin; tüm girdileri doğrulayın
4. **Değişmezlik** — Her zaman yeni nesneler oluşturun, mevcut olanları asla değiştirmeyin
5. **Çalıştırmadan Önce Planlayın** — Karmaşık özellikleri kod yazmadan önce planlayın

## Mevcut Agentlar

| Agent | Amaç | Ne Zaman Kullanılır |
|-------|---------|-------------|
| planner | Uygulama planlaması | Karmaşık özellikler, yeniden düzenleme |
| architect | Sistem tasarımı ve ölçeklenebilirlik | Mimari kararlar |
| tdd-guide | Test-odaklı geliştirme | Yeni özellikler, hata düzeltmeleri |
| code-reviewer | Kod kalitesi ve sürdürülebilirlik | Kod yazma/değiştirme sonrası |
| security-reviewer | Güvenlik açığı tespiti | Commitlerden önce, hassas kod |
| build-error-resolver | Build/tip hatalarını düzeltme | Build başarısız olduğunda |
| e2e-runner | Uçtan uca Playwright testi | Kritik kullanıcı akışları |
| refactor-cleaner | Ölü kod temizleme | Kod bakımı |
| doc-updater | Dokümantasyon ve codemaps | Dokümanları güncelleme |
| docs-lookup | Dokümantasyon ve API referans araştırması | Kütüphane/API dokümantasyon soruları |
| cpp-reviewer | C++ kod incelemesi | C++ projeleri |
| cpp-build-resolver | C++ build hataları | C++ build başarısızlıkları |
| go-reviewer | Go kod incelemesi | Go projeleri |
| go-build-resolver | Go build hataları | Go build başarısızlıkları |
| kotlin-reviewer | Kotlin kod incelemesi | Kotlin/Android/KMP projeleri |
| kotlin-build-resolver | Kotlin/Gradle build hataları | Kotlin build başarısızlıkları |
| database-reviewer | PostgreSQL/Supabase uzmanı | Şema tasarımı, sorgu optimizasyonu |
| python-reviewer | Python kod incelemesi | Python projeleri |
| java-reviewer | Java ve Spring Boot kod incelemesi | Java/Spring Boot projeleri |
| java-build-resolver | Java/Maven/Gradle build hataları | Java build başarısızlıkları |
| chief-of-staff | İletişim önceliklendirme ve taslaklar | Çok kanallı email, Slack, LINE, Messenger |
| loop-operator | Otonom döngü yürütme | Döngüleri güvenli çalıştırma, takılmaları izleme, müdahale |
| harness-optimizer | Harness yapılandırma ayarlama | Güvenilirlik, maliyet, verimlilik |
| rust-reviewer | Rust kod incelemesi | Rust projeleri |
| rust-build-resolver | Rust build hataları | Rust build başarısızlıkları |
| pytorch-build-resolver | PyTorch runtime/CUDA/eğitim hataları | PyTorch build/eğitim başarısızlıkları |
| typescript-reviewer | TypeScript/JavaScript kod incelemesi | TypeScript/JavaScript projeleri |

## Agent Orkestrasyonu

Agentları kullanıcı istemi olmadan proaktif olarak kullanın:
- Karmaşık özellik istekleri → **planner**
- Yeni yazılan/değiştirilen kod → **code-reviewer**
- Hata düzeltme veya yeni özellik → **tdd-guide**
- Mimari karar → **architect**
- Güvenlik açısından hassas kod → **security-reviewer**
- Çok kanallı iletişim önceliklendirme → **chief-of-staff**
- Otonom döngüler / döngü izleme → **loop-operator**
- Harness yapılandırma güvenilirliği ve maliyeti → **harness-optimizer**

Bağımsız işlemler için paralel yürütme kullanın — birden fazla agenti aynı anda başlatın.

## Güvenlik Kuralları

**HERHANGİ BİR committen önce:**
- Sabit kodlanmış sırlar yok (API anahtarları, şifreler, tokenlar)
- Tüm kullanıcı girdileri doğrulanmış
- SQL injection koruması (parametreli sorgular)
- XSS koruması (sanitize edilmiş HTML)
- CSRF koruması etkin
- Kimlik doğrulama/yetkilendirme doğrulanmış
- Tüm endpointlerde hız sınırlama
- Hata mesajları hassas veri sızdırmıyor

**Sır yönetimi:** Sırları asla sabit kodlamayın. Ortam değişkenlerini veya bir sır yöneticisini kullanın. Başlangıçta gerekli sırları doğrulayın. İfşa edilen sırları hemen döndürün.

**Güvenlik sorunu bulunursa:** DUR → security-reviewer agentini kullan → KRİTİK sorunları düzelt → ifşa edilen sırları döndür → kod tabanını benzer sorunlar için incele.

## Kodlama Stili

**Değişmezlik (KRİTİK):** Her zaman yeni nesneler oluşturun, asla değiştirmeyin. Değişiklikler uygulanmış yeni kopyalar döndürün.

**Dosya organizasyonu:** Az sayıda büyük dosya yerine çok sayıda küçük dosya. Tipik 200-400 satır, maksimum 800. Tipe göre değil, özelliğe/alana göre düzenleyin. Yüksek bağlılık, düşük bağımlılık.

**Hata yönetimi:** Her seviyede hataları ele alın. UI kodunda kullanıcı dostu mesajlar sağlayın. Sunucu tarafında detaylı bağlamı loglayın. Hataları asla sessizce yutmayın.

**Girdi doğrulama:** Sistem sınırlarında tüm kullanıcı girdilerini doğrulayın. Şema tabanlı doğrulama kullanın. Net mesajlarla hızlı başarısız olun. Harici verilere asla güvenmeyin.

**Kod kalite kontrol listesi:**
- Fonksiyonlar küçük (<50 satır), dosyalar odaklı (<800 satır)
- Derin iç içe geçme yok (>4 seviye)
- Düzgün hata yönetimi, sabit kodlanmış değerler yok
- Okunabilir, iyi adlandırılmış tanımlayıcılar

## Test Gereksinimleri

**Minimum kapsama: %80**

Test tipleri (hepsi gereklidir):
1. **Unit testler** — Bireysel fonksiyonlar, yardımcı programlar, bileşenler
2. **Integration testler** — API endpointleri, veritabanı işlemleri
3. **E2E testler** — Kritik kullanıcı akışları

**TDD iş akışı (zorunlu):**
1. Önce test yaz (KIRMIZI) — test BAŞARISIZ olmalı
2. Minimal uygulama yaz (YEŞİL) — test BAŞARILI olmalı
3. Yeniden düzenle (İYİLEŞTİR) — %80+ kapsama doğrula

Başarısızlık sorunlarını giderin: test izolasyonunu kontrol edin → mocklarını doğrulayın → uygulamayı düzeltin (testleri değil, testler yanlış olmadıkça).

## Geliştirme İş Akışı

1. **Planlama** — Planner agentini kullanın, bağımlılıkları ve riskleri belirleyin, aşamalara bölün
2. **TDD** — tdd-guide agentini kullanın, önce testleri yazın, uygulayın, yeniden düzenleyin
3. **İnceleme** — code-reviewer agentini hemen kullanın, KRİTİK/YÜKSEK sorunları ele alın
4. **Bilgiyi doğru yerde yakalayın**
   - Kişisel hata ayıklama notları, tercihler ve geçici bağlam → otomatik bellek
   - Takım/proje bilgisi (mimari kararlar, API değişiklikleri, runbook'lar) → projenin mevcut doküman yapısı
   - Mevcut görev zaten ilgili dokümanları veya kod yorumlarını üretiyorsa, aynı bilgiyi başka yerde çoğaltmayın
   - Açık bir proje doküman konumu yoksa, yeni bir üst düzey dosya oluşturmadan önce sorun
5. **Commit** — Conventional commits formatı, kapsamlı PR özetleri

## Git İş Akışı

**Commit formatı:** `<type>: <description>` — Tipler: feat, fix, refactor, docs, test, chore, perf, ci

**PR iş akışı:** Tam commit geçmişini analiz edin → kapsamlı özet taslağı oluşturun → test planı ekleyin → `-u` bayrağıyla pushlayın.

## Mimari Desenler

**API yanıt formatı:** Başarı göstergesi, veri yükü, hata mesajı ve sayfalandırma metadatası içeren tutarlı zarf.

**Repository deseni:** Veri erişimini standart arayüz arkasında kapsülleyin (findAll, findById, create, update, delete). İş mantığı depolama mekanizmasına değil, soyut arayüze bağlıdır.

**Skeleton projeleri:** Savaş testinden geçmiş şablonları arayın, paralel agentlarla değerlendirin (güvenlik, genişletilebilirlik, uygunluk), en iyi eşleşmeyi klonlayın, kanıtlanmış yapı içinde yineleyin.

## Performans

**Bağlam yönetimi:** Büyük yeniden düzenlemeler ve çok dosyalı özellikler için bağlam penceresinin son %20'sinden kaçının. Daha düşük hassasiyet gerektiren görevler (tekli düzenlemeler, dokümanlar, basit düzeltmeler) daha yüksek kullanımı tolere eder.

**Build sorun giderme:** build-error-resolver agentini kullanın → hataları analiz edin → artımlı olarak düzeltin → her düzeltmeden sonra doğrulayın.

## Proje Yapısı

```
agents/          — 68 özel subagent
skills/          — 284 iş akışı skillleri ve alan bilgisi
commands/        — 94 slash command
hooks/           — Tetikleyici tabanlı otomasyonlar
rules/           — Her zaman uyulması gereken kurallar (ortak + dile özel)
scripts/         — Platformlar arası Node.js yardımcı programları
mcp-configs/     — 14 MCP sunucu yapılandırması
tests/           — Test paketi
```

## Başarı Metrikleri

- Tüm testler %80+ kapsama ile geçer
- Güvenlik açığı yoktur
- Kod okunabilir ve sürdürülebilirdir
- Performans kabul edilebilirdir
- Kullanıcı gereksinimleri karşılanmıştır
