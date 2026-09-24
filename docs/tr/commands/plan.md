---
description: Gereksinimleri yeniden ifade et, riskleri deÃ„Å¸erlendir ve adÃ„Â±m adÃ„Â±m uygulama planÃ„Â± oluÃ…Å¸tur. Herhangi bir koda dokunmadan ÃƒÂ¶nce kullanÃ„Â±cÃ„Â± ONAYINI BEKLE.
---

# Plan Komutu

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


Bu komut, herhangi bir kod yazmadan ÃƒÂ¶nce kapsamlÃ„Â± bir uygulama planÃ„Â± oluÃ…Å¸turmak iÃƒÂ§in **planner** agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

## Bu Komut Ne Yapar

1. **Gereksinimleri Yeniden Ã„Â°fade Et** - Neyin inÃ…Å¸a edilmesi gerektiÃ„Å¸ini netleÃ…Å¸tir
2. **Riskleri TanÃ„Â±mla** - Potansiyel sorunlarÃ„Â± ve engelleri ortaya ÃƒÂ§Ã„Â±kar
3. **AdÃ„Â±m PlanÃ„Â± OluÃ…Å¸tur** - UygulamayÃ„Â± fazlara ayÃ„Â±r
4. **Onay Bekle** - Ã„Â°lerlemeden ÃƒÂ¶nce kullanÃ„Â±cÃ„Â± onayÃ„Â± alÃ„Â±nmalÃ„Â±dÃ„Â±r

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/plan` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- Yeni bir ÃƒÂ¶zelliÃ„Å¸e baÃ…Å¸larken
- Ãƒâ€“nemli mimari deÃ„Å¸iÃ…Å¸iklikler yaparken
- KarmaÃ…Å¸Ã„Â±k refactoring ÃƒÂ¼zerinde ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken
- Birden fazla dosya/component etkilenecekken
- Gereksinimler belirsiz veya muÃ„Å¸lak olduÃ„Å¸unda

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

Planner agent'Ã„Â± Ã…Å¸unlarÃ„Â± yapacaktÃ„Â±r:

1. Ã„Â°steÃ„Å¸i **analiz edecek** ve gereksinimleri net Ã…Å¸ekilde yeniden ifade edecek
2. Belirli, uygulanabilir adÃ„Â±mlarla **fazlara ayÃ„Â±racak**
3. Componentler arasÃ„Â± **baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± tanÃ„Â±mlayacak**
4. **Riskleri deÃ„Å¸erlendirecek** ve potansiyel engelleri belirleyecek
5. **KarmaÃ…Å¸Ã„Â±klÃ„Â±Ã„Å¸Ã„Â± tahmin edecek** (YÃƒÂ¼ksek/Orta/DÃƒÂ¼Ã…Å¸ÃƒÂ¼k)
6. **PlanÃ„Â± sunacak** ve aÃƒÂ§Ã„Â±k onayÃ„Â±nÃ„Â±zÃ„Â± bekleyecek

## Ãƒâ€“rnek KullanÃ„Â±m

```
KullanÃ„Â±cÃ„Â±: /plan Piyasalar ÃƒÂ§ÃƒÂ¶zÃƒÂ¼ldÃƒÂ¼Ã„Å¸ÃƒÂ¼nde gerÃƒÂ§ek zamanlÃ„Â± bildirimler eklemeye ihtiyacÃ„Â±m var

Agent (planner):
# Uygulama PlanÃ„Â±: GerÃƒÂ§ek ZamanlÃ„Â± Piyasa Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m Bildirimleri

## Gereksinim Yeniden Ã„Â°fadesi
- KullanÃ„Â±cÃ„Â±lar takip ettikleri piyasalar ÃƒÂ§ÃƒÂ¶zÃƒÂ¼ldÃƒÂ¼Ã„Å¸ÃƒÂ¼nde bildirim alsÃ„Â±n
- Birden fazla bildirim kanalÃ„Â±nÃ„Â± destekle (uygulama iÃƒÂ§i, e-posta, webhook)
- Bildirimlerin gÃƒÂ¼venilir bir Ã…Å¸ekilde iletilmesini saÃ„Å¸la
- Piyasa sonucunu ve kullanÃ„Â±cÃ„Â±nÃ„Â±n pozisyon sonucunu iÃƒÂ§er

## Uygulama FazlarÃ„Â±

### Faz 1: Database Ã…Å¾emasÃ„Â±
- Kolonlarla bildirimler tablosu ekle: id, user_id, market_id, type, status, created_at
- Kanal tercihleri iÃƒÂ§in user_notification_preferences tablosu ekle
- Performans iÃƒÂ§in user_id ve market_id ÃƒÂ¼zerinde indexler oluÃ…Å¸tur

### Faz 2: Bildirim Servisi
- lib/notifications.ts'de bildirim servisi oluÃ…Å¸tur
- BullMQ/Redis kullanarak bildirim kuyruÃ„Å¸u uygula
- BaÃ…Å¸arÃ„Â±sÃ„Â±z teslimatlar iÃƒÂ§in yeniden deneme mantÃ„Â±Ã„Å¸Ã„Â± ekle
- Bildirim Ã…Å¸ablonlarÃ„Â± oluÃ…Å¸tur

### Faz 3: Entegrasyon NoktalarÃ„Â±
- Piyasa ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m mantÃ„Â±Ã„Å¸Ã„Â±na baÃ„Å¸lan (durum "resolved" olduÃ„Å¸unda)
- Piyasada pozisyonu olan tÃƒÂ¼m kullanÃ„Â±cÃ„Â±larÃ„Â± sorgula
- Her kullanÃ„Â±cÃ„Â± iÃƒÂ§in bildirimleri kuyruÃ„Å¸a ekle

### Faz 4: Frontend Componentleri
- Header'da NotificationBell componenti oluÃ…Å¸tur
- NotificationList modal'Ã„Â± ekle
- Supabase subscriptions ile gerÃƒÂ§ek zamanlÃ„Â± gÃƒÂ¼ncellemeler uygula
- Bildirim tercihleri sayfasÃ„Â± ekle

## BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar
- Redis (kuyruk iÃƒÂ§in)
- E-posta servisi (SendGrid/Resend)
- Supabase real-time subscriptions

## Riskler
- YÃƒÅ“KSEK: E-posta teslimatÃ„Â± (SPF/DKIM gerekli)
- ORTA: Piyasa baÃ…Å¸Ã„Â±na 1000+ kullanÃ„Â±cÃ„Â± ile performans
- ORTA: Piyasalar sÃ„Â±k ÃƒÂ§ÃƒÂ¶zÃƒÂ¼lÃƒÂ¼rse bildirim spam'i
- DÃƒÅ“Ã…Å¾ÃƒÅ“K: Real-time subscription yÃƒÂ¼kÃƒÂ¼

## Tahmini KarmaÃ…Å¸Ã„Â±klÃ„Â±k: ORTA
- Backend: 4-6 saat
- Frontend: 3-4 saat
- Test: 2-3 saat
- Toplam: 9-13 saat

**ONAY BEKLENÃ„Â°YOR**: Bu planla ilerleyelim mi? (evet/hayÃ„Â±r/deÃ„Å¸iÃ…Å¸tir)
```

## Ãƒâ€“nemli Notlar

**KRÃ„Â°TÃ„Â°K**: Planner agent, planÃ„Â± "evet" veya "ilerle" veya benzeri olumlu bir yanÃ„Â±tla aÃƒÂ§Ã„Â±kÃƒÂ§a onaylayana kadar herhangi bir kod **YAZMAYACAK**.

DeÃ„Å¸iÃ…Å¸iklik istiyorsanÃ„Â±z, Ã…Å¸u Ã…Å¸ekilde yanÃ„Â±t verin:
- "deÃ„Å¸iÃ…Å¸tir: [deÃ„Å¸iÃ…Å¸iklikleriniz]"
- "farklÃ„Â± yaklaÃ…Å¸Ã„Â±m: [alternatif]"
- "faz 2'yi atla ve ÃƒÂ¶nce faz 3'ÃƒÂ¼ yap"

## DiÃ„Å¸er Komutlarla Entegrasyon

Planlamadan sonra:
- Test odaklÃ„Â± geliÃ…Å¸tirme ile uygulamak iÃƒÂ§in `/tdd` kullanÃ„Â±n
- Build hatalarÃ„Â± oluÃ…Å¸ursa `/build-fix` kullanÃ„Â±n
- Tamamlanan uygulamayÃ„Â± gÃƒÂ¶zden geÃƒÂ§irmek iÃƒÂ§in `/code-review` kullanÃ„Â±n

## Ã„Â°lgili Agent'lar

Bu komut, ECC tarafÃ„Â±ndan saÃ„Å¸lanan `planner` agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

Manuel kurulumlar iÃƒÂ§in, kaynak dosya Ã…Å¸urada bulunur:
`agents/planner.md`
