---
description: "Oturumdan yeniden kullanılabilir desenleri çıkar, kaydetmeden önce kaliteyi kendinden değerlendir ve doğru kayıt konumunu belirle (Global vs Proje)."
---

# /learn-eval - Çıkar, Değerlendir, Sonra Kaydet

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
