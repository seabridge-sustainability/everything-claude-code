---
description: Go build hatalarÃ„Â±nÃ„Â±, go vet uyarÃ„Â±larÃ„Â±nÃ„Â± ve linter sorunlarÃ„Â±nÃ„Â± aÃ…Å¸amalÃ„Â± olarak dÃƒÂ¼zelt. Minimal, cerrahi dÃƒÂ¼zeltmeler iÃƒÂ§in go-build-resolver agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.
---

# Go Build and Fix

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


Bu komut, minimal deÃ„Å¸iÃ…Å¸ikliklerle Go build hatalarÃ„Â±nÃ„Â± aÃ…Å¸amalÃ„Â± olarak dÃƒÂ¼zeltmek iÃƒÂ§in **go-build-resolver** agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

## Bu Komut Ne Yapar

1. **Diagnostics Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r**: `go build`, `go vet`, `staticcheck` yÃƒÂ¼rÃƒÂ¼t
2. **HatalarÃ„Â± Parse Et**: Dosyaya gÃƒÂ¶re grupla ve ÃƒÂ¶nem derecesine gÃƒÂ¶re sÃ„Â±rala
3. **AÃ…Å¸amalÃ„Â± DÃƒÂ¼zelt**: Bir seferde bir hata
4. **Her DÃƒÂ¼zeltmeyi DoÃ„Å¸rula**: Her deÃ„Å¸iÃ…Å¸iklikten sonra build'i yeniden ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
5. **Ãƒâ€“zet Raporla**: Neyin dÃƒÂ¼zeltildiÃ„Å¸ini ve neyin kaldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± gÃƒÂ¶ster

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/go-build` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- `go build ./...` hatalarla baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unda
- `go vet ./...` sorunlar raporladÃ„Â±Ã„Å¸Ã„Â±nda
- `golangci-lint run` uyarÃ„Â±lar gÃƒÂ¶sterdiÃ„Å¸inde
- ModÃƒÂ¼l baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± bozulduÃ„Å¸unda
- Build'i bozan deÃ„Å¸iÃ…Å¸iklikleri pull ettikten sonra

## Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lan Diagnostic KomutlarÃ„Â±

```bash
# Birincil build kontrolÃƒÂ¼
go build ./...

# Static analiz
go vet ./...

# GeniÃ…Å¸letilmiÃ…Å¸ linting (mevcutsa)
staticcheck ./...
golangci-lint run

# ModÃƒÂ¼l sorunlarÃ„Â±
go mod verify
go mod tidy -v
```

## Ãƒâ€“rnek Oturum

```text
KullanÃ„Â±cÃ„Â±: /go-build

Agent:
# Go Build Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mÃƒÂ¼

## Ã„Â°lk Diagnostics

```bash
$ go build ./...
internal/service/user.go:25:15: undefined: UserRepository
internal/handler/api.go:42:9: cannot use x (type string) as type int
internal/handler/api.go:58:2: missing return at end of function
```

Bulunan hatalar: 3

## DÃƒÂ¼zeltme 1: TanÃ„Â±msÃ„Â±z TanÃ„Â±mlayÃ„Â±cÃ„Â±

Dosya: internal/service/user.go:25
Hata: undefined: UserRepository
Neden: Eksik import

```go
// Import eklendi
import "project/internal/repository"

// DeÃ„Å¸iÃ…Å¸tirildi
var repo UserRepository
// Ã…Å¾una
var repo repository.UserRepository
```

```bash
$ go build ./...
# 2 hata kaldÃ„Â±
```

## DÃƒÂ¼zeltme 2: Tip UyuÃ…Å¸mazlÃ„Â±Ã„Å¸Ã„Â±

Dosya: internal/handler/api.go:42
Hata: cannot use x (type string) as type int

```go
// DeÃ„Å¸iÃ…Å¸tirildi
count := params.Get("count")
// Ã…Å¾una
countStr := params.Get("count")
count, _ := strconv.Atoi(countStr)
```

```bash
$ go build ./...
# 1 hata kaldÃ„Â±
```

## DÃƒÂ¼zeltme 3: Eksik Return

Dosya: internal/handler/api.go:58
Hata: missing return at end of function

```go
func GetUser(id string) (*User, error) {
    if id == "" {
        return nil, ErrInvalidID
    }
    user := findUser(id)
    // Eksik return eklendi
    return user, nil
}
```

```bash
$ go build ./...
# Build baÃ…Å¸arÃ„Â±lÃ„Â±!
```

## Son DoÃ„Å¸rulama

```bash
$ go vet ./...
# Sorun yok

$ go test ./...
ok      project/internal/service   0.015s
ok      project/internal/handler   0.023s
```

## Ãƒâ€“zet

| Metrik | SayÃ„Â± |
|--------|-------|
| DÃƒÂ¼zeltilen build hatalarÃ„Â± | 3 |
| DÃƒÂ¼zeltilen vet uyarÃ„Â±larÃ„Â± | 0 |
| DeÃ„Å¸iÃ…Å¸tirilen dosyalar | 2 |
| Kalan sorunlar | 0 |

Build Durumu: PASS: BAÃ…Å¾ARILI
```

## DÃƒÂ¼zeltilen YaygÃ„Â±n Hatalar

| Hata | Tipik DÃƒÂ¼zeltme |
|-------|-------------|
| `undefined: X` | Import ekle veya yazÃ„Â±m hatasÃ„Â±nÃ„Â± dÃƒÂ¼zelt |
| `cannot use X as Y` | Tip dÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼mÃƒÂ¼ veya atamayÃ„Â± dÃƒÂ¼zelt |
| `missing return` | Return ifadesi ekle |
| `X does not implement Y` | Eksik metod ekle |
| `import cycle` | Paketleri yeniden yapÃ„Â±landÃ„Â±r |
| `declared but not used` | DeÃ„Å¸iÃ…Å¸keni kaldÃ„Â±r veya kullan |
| `cannot find package` | `go get` veya `go mod tidy` |

## DÃƒÂ¼zeltme Stratejisi

1. **Ãƒâ€“nce build hatalarÃ„Â±** - Kodun compile edilmesi gerekli
2. **Ã„Â°kinci olarak vet uyarÃ„Â±larÃ„Â±** - Ã…Å¾ÃƒÂ¼pheli yapÃ„Â±larÃ„Â± dÃƒÂ¼zelt
3. **ÃƒÅ“ÃƒÂ§ÃƒÂ¼ncÃƒÂ¼ olarak lint uyarÃ„Â±larÃ„Â±** - Stil ve en iyi uygulamalar
4. **Bir seferde bir dÃƒÂ¼zeltme** - Her deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i doÃ„Å¸rula
5. **Minimal deÃ„Å¸iÃ…Å¸iklikler** - Refactor etme, sadece dÃƒÂ¼zelt

## Durdurma KoÃ…Å¸ullarÃ„Â±

Agent Ã…Å¸u durumlarda durur ve raporlar:
- AynÃ„Â± hata 3 denemeden sonra devam ederse
- DÃƒÂ¼zeltme daha fazla hata oluÃ…Å¸turursa
- Mimari deÃ„Å¸iÃ…Å¸iklikler gerektirirse
- Harici baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar eksikse

## Ã„Â°lgili Komutlar

- `/go-test` - Build baÃ…Å¸arÃ„Â±lÃ„Â± olduktan sonra testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- `/go-review` - Kod kalitesini incele
- `/verify` - Tam doÃ„Å¸rulama dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

## Ã„Â°lgili

- Agent: `agents/go-build-resolver.md`
- Skill: `skills/golang-patterns/`
