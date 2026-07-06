---
description: Go build hatalarÃ„Â±nÃ„Â±, go vet uyarÃ„Â±larÃ„Â±nÃ„Â± ve linter sorunlarÃ„Â±nÃ„Â± aÃ…Å¸amalÃ„Â± olarak dÃƒÂ¼zelt. Minimal, cerrahi dÃƒÂ¼zeltmeler iÃƒÂ§in go-build-resolver agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.
---

# Go Build and Fix

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
