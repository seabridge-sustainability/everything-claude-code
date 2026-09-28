---
description: Gereksinimleri yeniden ifade et, riskleri deÃ„Å¸erlendir ve adÃ„Â±m adÃ„Â±m uygulama planÃ„Â± oluÃ…Å¸tur. Herhangi bir koda dokunmadan ÃƒÂ¶nce kullanÃ„Â±cÃ„Â± ONAYINI BEKLE.
---

# Plan Komutu

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
