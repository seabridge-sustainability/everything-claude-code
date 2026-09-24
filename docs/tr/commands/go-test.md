---
description: Go iÃƒÂ§in TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± zorlar. Ãƒâ€“nce table-driven testler yaz, sonra uygula. go test -cover ile %80+ kapsama doÃ„Å¸rula.
---

# Go TDD Komutu

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


Bu komut, idiomatic Go test desenlerini kullanarak Go kodu iÃƒÂ§in test odaklÃ„Â± geliÃ…Å¸tirme metodolojisini zorlar.

## Bu Komut Ne Yapar

1. **Tipleri/Interface'leri TanÃ„Â±mla**: Ãƒâ€“nce fonksiyon imzalarÃ„Â±nÃ„Â± tasarla
2. **Table-Driven Testler Yaz**: KapsamlÃ„Â± test senaryolarÃ„Â± oluÃ…Å¸tur (RED)
3. **Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r**: Testlerin doÃ„Å¸ru sebepten baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unu doÃ„Å¸rula
4. **Kodu Uygula**: GeÃƒÂ§mek iÃƒÂ§in minimal kod yaz (GREEN)
5. **Refactor Et**: Testleri yeÃ…Å¸il tutarken iyileÃ…Å¸tir
6. **Kapsama Kontrol Et**: %80+ kapsama saÃ„Å¸la

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/go-test` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- Yeni Go fonksiyonlarÃ„Â± uygularken
- Mevcut koda test kapsama eklerken
- HatalarÃ„Â± dÃƒÂ¼zeltirken (ÃƒÂ¶nce baÃ…Å¸arÃ„Â±sÃ„Â±z test yaz)
- Kritik iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± oluÃ…Å¸tururken
- Go'da TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± ÃƒÂ¶Ã„Å¸renirken

## TDD DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

```
RED     Ã¢â€ â€™ BaÃ…Å¸arÃ„Â±sÃ„Â±z table-driven test yaz
GREEN   Ã¢â€ â€™ GeÃƒÂ§mek iÃƒÂ§in minimal kod uygula
REFACTOR Ã¢â€ â€™ Kodu iyileÃ…Å¸tir, testler yeÃ…Å¸il kalsÃ„Â±n
TEKRARLA Ã¢â€ â€™ Sonraki test senaryosu
```

## Ãƒâ€“rnek Oturum

````
KullanÃ„Â±cÃ„Â±: /go-test E-posta adreslerini doÃ„Å¸rulamak iÃƒÂ§in bir fonksiyona ihtiyacÃ„Â±m var

Agent:
# TDD Oturumu: E-posta DoÃ„Å¸rulayÃ„Â±cÃ„Â±

## AdÃ„Â±m 1: Interface TanÃ„Â±mla

```go
// validator/email.go
package validator

// ValidateEmail verilen string'in geÃƒÂ§erli bir e-posta adresi olup olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± kontrol eder.
// GeÃƒÂ§erliyse nil, aksi takdirde sorunu aÃƒÂ§Ã„Â±klayan hata dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r.
func ValidateEmail(email string) error {
    panic("not implemented")
}
```

## AdÃ„Â±m 2: Table-Driven Testler Yaz (RED)

```go
// validator/email_test.go
package validator

import (
    "testing"
)

func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        wantErr bool
    }{
        // GeÃƒÂ§erli e-postalar
        {"basit e-posta", "user@example.com", false},
        {"subdomain ile", "user@mail.example.com", false},
        {"artÃ„Â± ile", "user+tag@example.com", false},
        {"noktalar ile", "first.last@example.com", false},

        // GeÃƒÂ§ersiz e-postalar
        {"boÃ…Å¸ string", "", true},
        {"at iÃ…Å¸areti yok", "userexample.com", true},
        {"domain yok", "user@", true},
        {"local kÃ„Â±sÃ„Â±m yok", "@example.com", true},
        {"ÃƒÂ§ift at", "user@@example.com", true},
        {"boÃ…Å¸luklar", "user @example.com", true},
        {"tld yok", "user@example", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ValidateEmail(tt.email)
            if tt.wantErr && err == nil {
                t.Errorf("ValidateEmail(%q) = nil; hata bekleniyor", tt.email)
            }
            if !tt.wantErr && err != nil {
                t.Errorf("ValidateEmail(%q) = %v; nil bekleniyor", tt.email, err)
            }
        })
    }
}
```

## AdÃ„Â±m 3: Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r - BaÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±Ã„Å¸Ã„Â± DoÃ„Å¸rula

```bash
$ go test ./validator/...

--- FAIL: TestValidateEmail (0.00s)
    --- FAIL: TestValidateEmail/basit_e-posta (0.00s)
        panic: not implemented

FAIL
```

Ã¢Å“â€œ Testler beklendiÃ„Å¸i gibi baÃ…Å¸arÃ„Â±sÃ„Â±z (panic).

## AdÃ„Â±m 4: Minimal Kod Uygula (GREEN)

```go
// validator/email.go
package validator

import (
    "errors"
    "regexp"
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)

var (
    ErrEmailEmpty   = errors.New("e-posta boÃ…Å¸ olamaz")
    ErrEmailInvalid = errors.New("e-posta formatÃ„Â± geÃƒÂ§ersiz")
)

func ValidateEmail(email string) error {
    if email == "" {
        return ErrEmailEmpty
    }
    if !emailRegex.MatchString(email) {
        return ErrEmailInvalid
    }
    return nil
}
```

## AdÃ„Â±m 5: Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r - BaÃ…Å¸arÃ„Â±yÃ„Â± DoÃ„Å¸rula

```bash
$ go test ./validator/...

PASS
ok      project/validator    0.003s
```

Ã¢Å“â€œ TÃƒÂ¼m testler geÃƒÂ§iyor!

## AdÃ„Â±m 6: Kapsama Kontrol Et

```bash
$ go test -cover ./validator/...

PASS
coverage: 100.0% of statements
ok      project/validator    0.003s
```

Ã¢Å“â€œ Kapsama: 100%

## TDD TamamlandÃ„Â±!
````

## Test Desenleri

### Table-Driven Testler
```go
tests := []struct {
    name     string
    input    InputType
    want     OutputType
    wantErr  bool
}{
    {"senaryo 1", input1, want1, false},
    {"senaryo 2", input2, want2, true},
}

for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        got, err := Function(tt.input)
        // assertion'lar
    })
}
```

### Paralel Testler
```go
for _, tt := range tests {
    tt := tt // Yakala
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // test gÃƒÂ¶vdesi
    })
}
```

### Test YardÃ„Â±mcÃ„Â±larÃ„Â±
```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db := createDB()
    t.Cleanup(func() { db.Close() })
    return db
}
```

## Kapsama KomutlarÃ„Â±

```bash
# Basit kapsama
go test -cover ./...

# Kapsama profili
go test -coverprofile=coverage.out ./...

# TarayÃ„Â±cÃ„Â±da gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
go tool cover -html=coverage.out

# Fonksiyona gÃƒÂ¶re kapsama
go tool cover -func=coverage.out

# Race tespiti ile
go test -race -cover ./...
```

## Kapsama Hedefleri

| Kod TÃƒÂ¼rÃƒÂ¼ | Hedef |
|-----------|--------|
| Kritik iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± | 100% |
| Public API'ler | 90%+ |
| Genel kod | 80%+ |
| OluÃ…Å¸turulan kod | HariÃƒÂ§ tut |

## TDD En Ã„Â°yi UygulamalarÃ„Â±

**YAPIN:**
- Herhangi bir uygulamadan Ãƒâ€“NCE test yaz
- Her deÃ„Å¸iÃ…Å¸iklikten sonra testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- KapsamlÃ„Â± kapsama iÃƒÂ§in table-driven testler kullan
- Uygulama detaylarÃ„Â±nÃ„Â± deÃ„Å¸il, davranÃ„Â±Ã…Å¸Ã„Â± test et
- Edge case'leri dahil et (boÃ…Å¸, nil, maksimum deÃ„Å¸erler)

**YAPMAYIN:**
- Testlerden ÃƒÂ¶nce uygulama yazma
- RED aÃ…Å¸amasÃ„Â±nÃ„Â± atlama
- Private fonksiyonlarÃ„Â± doÃ„Å¸rudan test etme
- Testlerde `time.Sleep` kullanma
- Dengesiz testleri gÃƒÂ¶rmezden gelme

## Ã„Â°lgili Komutlar

- `/go-build` - Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zelt
- `/go-review` - Uygulamadan sonra kodu incele
- `/verify` - Tam doÃ„Å¸rulama dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r

## Ã„Â°lgili

- Skill: `skills/golang-testing/`
- Skill: `skills/tdd-workflow/`
