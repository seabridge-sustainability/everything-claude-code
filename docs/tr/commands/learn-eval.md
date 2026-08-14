---
description: "Oturumdan yeniden kullanılabilir desenleri çıkar, kaydetmeden önce kaliteyi kendinden değerlendir ve doğru kayıt konumunu belirle (Global vs Proje)."
---

# /learn-eval - Çıkar, Değerlendir, Sonra Kaydet

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

Herhangi bir skill dosyası yazmadan önce kalite kontrolü, kayıt konumu kararı ve bilgi yerleşimi farkındalığı ile `/learn`'ü genişletir.

## Ne Çıkarılmalı

Şunları arayın:

1. **Hata Çözüm Desenleri** — kök neden + düzeltme + yeniden kullanılabilirlik
2. **Hata Ayıklama Teknikleri** — bariz olmayan adımlar, araç kombinasyonları
3. **Geçici Çözümler** — kütüphane gariplikleri, API sınırlamaları, versiyona özel düzeltmeler
4. **Projeye Özgü Desenler** — kurallar, mimari kararlar, entegrasyon desenleri

## Süreç

1. Çıkarılabilir desenler için oturumu incele
2. En değerli/yeniden kullanılabilir içgörüyü tanımla

3. **Kayıt konumunu belirle:**
   - Sor: "Bu desen farklı bir projede faydalı olur mu?"
   - **Global** (`~/.claude/skills/learned/`): 2+ projede kullanılabilir genel desenler (bash uyumluluğu, LLM API davranışı, hata ayıklama teknikleri, vb.)
   - **Proje** (mevcut projedeki `.claude/skills/learned/`): Projeye özel bilgi (belirli bir config dosyasının gariplikleri, projeye özel mimari kararlar, vb.)
   - Emin değilseniz, Global seçin (Global → Proje taşımak tersinden daha kolay)

4. Bu formatı kullanarak skill dosyasını taslak olarak hazırla:

```markdown
---
name: desen-adi
description: "130 karakterin altında"
user-invocable: false
origin: auto-extracted
---

# [Açıklayıcı Desen Adı]

**Çıkarıldı:** [Tarih]
**Bağlam:** [Bunun ne zaman geçerli olduğunun kısa açıklaması]

## Sorun
[Bunun çözdüğü sorun - spesifik olun]

## Çözüm
[Desen/teknik/geçici çözüm - kod örnekleriyle]

## Ne Zaman Kullanılır
[Tetikleyici koşullar]
```

5. **Kalite kontrolü — Kontrol listesi + Bütünsel karar**

   ### 5a. Gerekli kontrol listesi (dosyaları gerçekten okuyarak doğrula)

   Taslağı değerlendirmeden önce **tümünü** yürüt:

   - [ ] İçerik örtüşmesini kontrol etmek için anahtar kelimeyle `~/.claude/skills/` ve ilgili proje `.claude/skills/` dosyalarını Grep ile ara
   - [ ] Örtüşme için MEMORY.md'yi kontrol et (hem proje hem de global)
   - [ ] Mevcut bir skill'e eklemenin yeterli olup olmayacağını düşün
   - [ ] Bunun yeniden kullanılabilir bir desen olduğunu, tek seferlik bir düzeltme olmadığını onayla

   ### 5b. Bütünsel karar

   Kontrol listesi sonuçlarını ve taslak kalitesini sentezle, sonra şunlardan **birini** seç:

   | Karar | Anlam | Sonraki Aksiyon |
   |---------|---------|-------------|
   | **Kaydet** | Benzersiz, spesifik, iyi kapsamlı | Adım 6'ya geç |
   | **İyileştir sonra Kaydet** | Değerli ama iyileştirme gerekiyor | İyileştirmeleri listele → revize et → yeniden değerlendir (bir kez) |
   | **[X]'e Ekle** | Mevcut bir skill'e eklenmelidir | Hedef skill'i ve eklemeleri göster → Adım 6 |
   | **Düşür** | Önemsiz, gereksiz veya çok soyut | Gerekçeyi açıkla ve dur |

**Yönlendirici boyutlar** (karar verirken, puanlanmaz):

- **Spesifiklik ve Uygulanabilirlik**: Hemen kullanılabilir kod örnekleri veya komutlar içerir
- **Kapsam Uyumu**: Ad, tetikleyici koşullar ve içerik hizalanmış ve tek bir desene odaklanmış
- **Benzersizlik**: Mevcut skill'lerin kapsamadığı değer sağlar (kontrol listesi sonuçlarına göre)
- **Yeniden Kullanılabilirlik**: Gelecekteki oturumlarda gerçekçi tetikleyici senaryolar mevcut

6. **Karara özel onay akışı**

   - **İyileştir sonra Kaydet**: Gerekli iyileştirmeleri + revize edilmiş taslağı + bir yeniden değerlendirmeden sonra güncellenmiş kontrol listesi/kararı sun; revize karar **Kaydet** ise kullanıcı onayından sonra kaydet, aksi takdirde yeni kararı takip et
   - **Kaydet**: Kayıt yolunu + kontrol listesi sonuçlarını + 1 satırlık karar gerekçesini + tam taslağı sun → kullanıcı onayından sonra kaydet
   - **[X]'e Ekle**: Hedef yolu + eklemeleri (diff formatında) + kontrol listesi sonuçlarını + karar gerekçesini sun → kullanıcı onayından sonra ekle
   - **Düşür**: Sadece kontrol listesi sonuçlarını + gerekçeyi göster (onay gerekmiyor)

7. Belirlenen konuma Kaydet / Ekle

## Adım 5 için Çıktı Formatı

```
### Kontrol Listesi
- [x] skills/ grep: örtüşme yok (veya: örtüşme bulundu → detaylar)
- [x] MEMORY.md: örtüşme yok (veya: örtüşme bulundu → detaylar)
- [x] Mevcut skill'e ekleme: yeni dosya uygun (veya: [X]'e eklenmeli)
- [x] Yeniden kullanılabilirlik: onaylandı (veya: tek seferlik → Düşür)

### Karar: Kaydet / İyileştir sonra Kaydet / [X]'e Ekle / Düşür

**Gerekçe:** (Kararı açıklayan 1-2 cümle)
```

## Tasarım Gerekçesi

Bu versiyon, önceki 5 boyutlu sayısal puanlama rubriğini (Spesifiklik, Uygulanabilirlik, Kapsam Uyumu, Gereksizlik Olmama, Kapsama 1-5 arası puanlanıyor) kontrol listesi tabanlı bütünsel karar sistemiyle değiştirir. Modern frontier modeller (Opus 4.6+) güçlü bağlamsal yargıya sahiptir — zengin niteliksel sinyalleri sayısal skorlara zorlamak nüans kaybettirir ve yanıltıcı toplamlar üretebilir. Bütünsel yaklaşım, modelin tüm faktörleri doğal olarak tartmasına izin vererek daha doğru kaydet/düşür kararları üretirken, açık kontrol listesi kritik hiçbir kontrolün atlanmamasını sağlar.

## Notlar

- Önemsiz düzeltmeleri çıkarmayın (yazım hataları, basit sözdizimi hataları)
- Tek seferlik sorunları çıkarmayın (belirli API kesintileri, vb.)
- Gelecekteki oturumlarda zaman kazandıracak desenlere odaklanın
- Skill'leri odaklı tutun — skill başına bir desen
- Karar Ekle olduğunda, yeni dosya oluşturmak yerine mevcut skill'e ekleyin
