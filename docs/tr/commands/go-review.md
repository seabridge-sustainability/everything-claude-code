---
description: Ã„Â°diomatic desenler, eÃ…Å¸zamanlÃ„Â±lÃ„Â±k gÃƒÂ¼venliÃ„Å¸i, hata yÃƒÂ¶netimi ve gÃƒÂ¼venlik iÃƒÂ§in kapsamlÃ„Â± Go kod incelemesi. go-reviewer agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.
---

# Go Code Review

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


Bu komut, Go'ya ÃƒÂ¶zel kapsamlÃ„Â± kod incelemesi iÃƒÂ§in **go-reviewer** agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

## Bu Komut Ne Yapar

1. **Go DeÃ„Å¸iÃ…Å¸ikliklerini TanÃ„Â±mla**: `git diff` ile deÃ„Å¸iÃ…Å¸tirilmiÃ…Å¸ `.go` dosyalarÃ„Â±nÃ„Â± bul
2. **Static Analiz Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r**: `go vet`, `staticcheck` ve `golangci-lint` yÃƒÂ¼rÃƒÂ¼t
3. **GÃƒÂ¼venlik TaramasÃ„Â±**: SQL injection, command injection, race condition'larÃ„Â± kontrol et
4. **EÃ…Å¸zamanlÃ„Â±lÃ„Â±k Ã„Â°ncelemesi**: Goroutine gÃƒÂ¼venliÃ„Å¸ini, channel kullanÃ„Â±mÃ„Â±nÃ„Â±, mutex desenlerini analiz et
5. **Ã„Â°diomatic Go KontrolÃƒÂ¼**: Kodun Go kurallarÃ„Â±na ve en iyi uygulamalara uyduÃ„Å¸unu doÃ„Å¸rula
6. **Rapor OluÃ…Å¸tur**: SorunlarÃ„Â± ÃƒÂ¶nem derecesine gÃƒÂ¶re kategorize et

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/go-review` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- Go kodu yazdÃ„Â±ktan veya deÃ„Å¸iÃ…Å¸tirdikten sonra
- Go deÃ„Å¸iÃ…Å¸ikliklerini commit etmeden ÃƒÂ¶nce
- Go kodu iÃƒÂ§eren pull request'leri incelerken
- Yeni bir Go kod tabanÃ„Â±na adapte olurken
- Ã„Â°diomatic Go desenlerini ÃƒÂ¶Ã„Å¸renirken

## Ã„Â°nceleme Kategorileri

### KRÃ„Â°TÃ„Â°K (DÃƒÂ¼zeltilmeli)
- SQL/Command injection aÃƒÂ§Ã„Â±klÃ„Â±klarÃ„Â±
- Senkronizasyon olmadan race condition'lar
- Goroutine sÃ„Â±zÃ„Â±ntÃ„Â±larÃ„Â±
- Hardcode edilmiÃ…Å¸ kimlik bilgileri
- GÃƒÂ¼venli olmayan pointer kullanÃ„Â±mÃ„Â±
- Kritik yollarda gÃƒÂ¶z ardÃ„Â± edilen hatalar

### YÃƒÅ“KSEK (DÃƒÂ¼zeltilmeli)
- BaÃ„Å¸lamlÃ„Â± hata sarmalama eksikliÃ„Å¸i
- Hata dÃƒÂ¶nÃƒÂ¼Ã…Å¸leri yerine panic
- Context yayÃ„Â±lmÃ„Â±yor
- Deadlock'a neden olan buffersÃ„Â±z channel'lar
- Interface yerine getirilmeme hatalarÃ„Â±
- Eksik mutex korumasÃ„Â±

### ORTA (DÃƒÂ¼Ã…Å¸ÃƒÂ¼nÃƒÂ¼n)
- Ã„Â°diomatic olmayan kod desenleri
- Export edilen elementlerde eksik godoc yorumlarÃ„Â±
- Verimsiz string birleÃ…Å¸tirme
- Preallocate edilmemiÃ…Å¸ slice
- Table-driven testler kullanÃ„Â±lmamÃ„Â±Ã…Å¸

## Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lan Otomatik Kontroller

```bash
# Static analiz
go vet ./...

# GeliÃ…Å¸miÃ…Å¸ kontroller (kuruluysa)
staticcheck ./...
golangci-lint run

# Race tespiti
go build -race ./...

# GÃƒÂ¼venlik aÃƒÂ§Ã„Â±klÃ„Â±klarÃ„Â±
govulncheck ./...
```

## Ãƒâ€“rnek KullanÃ„Â±m

```text
KullanÃ„Â±cÃ„Â±: /go-review

Agent:
# Go Kod Ã„Â°nceleme Raporu

## Ã„Â°ncelenen Dosyalar
- internal/handler/user.go (deÃ„Å¸iÃ…Å¸tirildi)
- internal/service/auth.go (deÃ„Å¸iÃ…Å¸tirildi)

## Static Analiz SonuÃƒÂ§larÃ„Â±
Ã¢Å“â€œ go vet: Sorun yok
Ã¢Å“â€œ staticcheck: Sorun yok

## Bulunan Sorunlar

[KRÃ„Â°TÃ„Â°K] Race Condition
Dosya: internal/service/auth.go:45
Sorun: PaylaÃ…Å¸Ã„Â±lan map senkronizasyon olmadan eriÃ…Å¸iliyor
```go
var cache = map[string]*Session{}  // EÃ…Å¸zamanlÃ„Â± eriÃ…Å¸im!

func GetSession(id string) *Session {
    return cache[id]  // Race condition
}
```
DÃƒÂ¼zeltme: sync.RWMutex veya sync.Map kullan
```go
var (
    cache   = map[string]*Session{}
    cacheMu sync.RWMutex
)

func GetSession(id string) *Session {
    cacheMu.RLock()
    defer cacheMu.RUnlock()
    return cache[id]
}
```

[YÃƒÅ“KSEK] Eksik Hata BaÃ„Å¸lamÃ„Â±
Dosya: internal/handler/user.go:28
Sorun: Hata baÃ„Å¸lam olmadan dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼lÃƒÂ¼yor
```go
return err  // BaÃ„Å¸lam yok
```
DÃƒÂ¼zeltme: BaÃ„Å¸lamla sarmala
```go
return fmt.Errorf("get user %s: %w", userID, err)
```

## Ãƒâ€“zet
- KRÃ„Â°TÃ„Â°K: 1
- YÃƒÅ“KSEK: 1
- ORTA: 0

Ãƒâ€“neri: FAIL: KRÃ„Â°TÃ„Â°K sorun dÃƒÂ¼zeltilene kadar merge'i engelle
```

## Onay Kriterleri

| Durum | KoÃ…Å¸ul |
|--------|-----------|
| PASS: Onayla | KRÃ„Â°TÃ„Â°K veya YÃƒÅ“KSEK sorun yok |
| WARNING: UyarÃ„Â± | Sadece ORTA sorunlar (dikkatle merge et) |
| FAIL: Engelle | KRÃ„Â°TÃ„Â°K veya YÃƒÅ“KSEK sorun bulundu |

## DiÃ„Å¸er Komutlarla Entegrasyon

- Testlerin geÃƒÂ§tiÃ„Å¸inden emin olmak iÃƒÂ§in ÃƒÂ¶nce `/go-test` kullanÃ„Â±n
- Build hatalarÃ„Â± oluÃ…Å¸ursa `/go-build` kullanÃ„Â±n
- Commit etmeden ÃƒÂ¶nce `/go-review` kullanÃ„Â±n
- Go'ya ÃƒÂ¶zel olmayan endiÃ…Å¸eler iÃƒÂ§in `/code-review` kullanÃ„Â±n

## Ã„Â°lgili

- Agent: `agents/go-reviewer.md`
- Skills: `skills/golang-patterns/`, `skills/golang-testing/`
