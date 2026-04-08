---
description: Go build Ã¬â€”ÂÃ«Å¸Â¬, go vet ÃªÂ²Â½ÃªÂ³Â , Ã«Â¦Â°Ã­â€žÂ° Ã¬ÂÂ´Ã¬Å Ë†Ã«Â¥Â¼ Ã¬Â ÂÃ¬Â§â€žÃ¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤. Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â â€¢Ã«Â°â‚¬Ã­â€¢Å“ Ã¬Ë†ËœÃ¬Â â€¢Ã¬Ââ€ž Ã¬Å“â€žÃ­â€¢Â´ go-build-resolver Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
---

# Go Build and Fix

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã«Å â€ **go-build-resolver** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬â€”Â¬ Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã«Â³â‚¬ÃªÂ²Â½Ã¬Å“Â¼Ã«Â¡Å“ Go build Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã¬Â ÂÃ¬Â§â€žÃ¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ÃªÂ°â‚¬ Ã­â€¢ËœÃ«Å â€ ÃªÂ²Æ’

1. **Ã¬Â§â€žÃ«â€¹Â¨ Ã¬â€¹Â¤Ã­â€“â€°**: `go build`, `go vet`, `staticcheck` Ã¬â€¹Â¤Ã­â€“â€°
2. **Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â¶â€žÃ¬â€žÂ**: Ã­Å’Å’Ã¬ÂÂ¼Ã«Â³â€žÃ«Â¡Å“ ÃªÂ·Â¸Ã«Â£Â¹Ã­â„¢â€Ã­â€¢ËœÃªÂ³Â  Ã¬â€¹Â¬ÃªÂ°ÂÃ«Ââ€žÃ¬Ë†Å“ Ã¬Â â€¢Ã«Â Â¬
3. **Ã¬Â ÂÃ¬Â§â€žÃ¬Â Â Ã¬Ë†ËœÃ¬Â â€¢**: Ã­â€¢Å“ Ã«Â²Ë†Ã¬â€”Â Ã­â€¢ËœÃ«â€šËœÃ¬ÂËœ Ã¬â€”ÂÃ«Å¸Â¬Ã¬â€Â©
4. **ÃªÂ°Â Ã¬Ë†ËœÃ¬Â â€¢ ÃªÂ²â‚¬Ã¬Â¦Â**: ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½ Ã­â€ºâ€ž build Ã¬Å¾Â¬Ã¬â€¹Â¤Ã­â€“â€°
5. **Ã¬Å¡â€Ã¬â€¢Â½ Ã«Â³Â´ÃªÂ³Â **: Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ ÃªÂ²Æ’ÃªÂ³Â¼ Ã«â€šÂ¨Ã¬Ââ‚¬ ÃªÂ²Æ’ Ã­â€˜Å“Ã¬â€¹Å“

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â

`/go-build`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â  Ã«â€¢Å’:
- `go build ./...`ÃªÂ°â‚¬ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¡Å“ Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢Â  Ã«â€¢Å’
- `go vet ./...`ÃªÂ°â‚¬ Ã¬ÂÂ´Ã¬Å Ë†Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢Â  Ã«â€¢Å’
- `golangci-lint run`Ã¬ÂÂ´ ÃªÂ²Â½ÃªÂ³Â Ã«Â¥Â¼ Ã«Â³Â´Ã¬â€”Â¬Ã¬Â¤â€ž Ã«â€¢Å’
- Ã«ÂªÂ¨Ã«â€œË† Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ±Ã¬ÂÂ´ ÃªÂ¹Â¨Ã¬Â¡Å’Ã¬Ââ€ž Ã«â€¢Å’
- Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­Ã¬Ââ€ž pullÃ­â€¢Å“ Ã­â€ºâ€ž buildÃªÂ°â‚¬ ÃªÂ¹Â¨Ã¬Â¡Å’Ã¬Ââ€ž Ã«â€¢Å’

## Ã¬â€¹Â¤Ã­â€“â€°Ã«ÂËœÃ«Å â€ Ã¬Â§â€žÃ«â€¹Â¨ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

```bash
# ÃªÂ¸Â°Ã«Â³Â¸ build Ã­â„¢â€¢Ã¬ÂÂ¸
go build ./...

# Ã¬Â â€¢Ã¬Â Â Ã«Â¶â€žÃ¬â€žÂ
go vet ./...

# Ã­â„¢â€¢Ã¬Å¾Â¥ Ã«Â¦Â°Ã­Å’â€¦ (Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ ÃªÂ²Â½Ã¬Å¡Â°)
staticcheck ./...
golangci-lint run

# Ã«ÂªÂ¨Ã«â€œË† Ã¬ÂÂ´Ã¬Å Ë†
go mod verify
go mod tidy -v
```

## Ã¬ËœË†Ã¬â€¹Å“ Ã¬â€žÂ¸Ã¬â€¦Ëœ

````text
User: /go-build

Agent:
# Go Build Ã­â€¢Â´ÃªÂ²Â°

## Ã¬Â´Ë†ÃªÂ¸Â° Ã¬Â§â€žÃ«â€¹Â¨

```bash
$ go build ./...
internal/service/user.go:25:15: undefined: UserRepository
internal/handler/api.go:42:9: cannot use x (type string) as type int
internal/handler/api.go:58:2: missing return at end of function
```

Ã«Â°Å“ÃªÂ²Â¬Ã«ÂÅ“ Ã¬â€”ÂÃ«Å¸Â¬: 3ÃªÂ°Å“

## Ã¬Ë†ËœÃ¬Â â€¢ 1: Ã¬Â â€¢Ã¬ÂËœÃ«ÂËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã¬â€¹ÂÃ«Â³â€žÃ¬Å¾Â

Ã­Å’Å’Ã¬ÂÂ¼: internal/service/user.go:25
Ã¬â€”ÂÃ«Å¸Â¬: undefined: UserRepository
Ã¬â€ºÂÃ¬ÂÂ¸: import Ã«Ë†â€žÃ«ÂÂ½

```go
// import Ã¬Â¶â€ÃªÂ°â‚¬
import "project/internal/repository"

// Ã«Â³â‚¬ÃªÂ²Â½ Ã¬Â â€ž
var repo UserRepository
// Ã«Â³â‚¬ÃªÂ²Â½ Ã­â€ºâ€ž
var repo repository.UserRepository
```

```bash
$ go build ./...
# 2ÃªÂ°Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã«â€šÂ¨Ã¬ÂÅ’
```

## Ã¬Ë†ËœÃ¬Â â€¢ 2: Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã«Â¶Ë†Ã¬ÂÂ¼Ã¬Â¹Ëœ

Ã­Å’Å’Ã¬ÂÂ¼: internal/handler/api.go:42
Ã¬â€”ÂÃ«Å¸Â¬: cannot use x (type string) as type int

```go
// Ã«Â³â‚¬ÃªÂ²Â½ Ã¬Â â€ž
count := params.Get("count")
// Ã«Â³â‚¬ÃªÂ²Â½ Ã­â€ºâ€ž
countStr := params.Get("count")
count, _ := strconv.Atoi(countStr)
```

```bash
$ go build ./...
# 1ÃªÂ°Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã«â€šÂ¨Ã¬ÂÅ’
```

## Ã¬Ë†ËœÃ¬Â â€¢ 3: Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ return

Ã­Å’Å’Ã¬ÂÂ¼: internal/handler/api.go:58
Ã¬â€”ÂÃ«Å¸Â¬: missing return at end of function

```go
func GetUser(id string) (*User, error) {
    if id == "" {
        return nil, ErrInvalidID
    }
    user := findUser(id)
    // Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ return Ã¬Â¶â€ÃªÂ°â‚¬
    return user, nil
}
```

```bash
$ go build ./...
# Build Ã¬â€žÂ±ÃªÂ³Âµ!
```

## Ã¬ÂµÅ“Ã¬Â¢â€¦ ÃªÂ²â‚¬Ã¬Â¦Â

```bash
$ go vet ./...
# Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€”â€ Ã¬ÂÅ’

$ go test ./...
ok      project/internal/service   0.015s
ok      project/internal/handler   0.023s
```

## Ã¬Å¡â€Ã¬â€¢Â½

| Ã­â€¢Â­Ã«ÂªÂ© | Ã¬Ë†ËœÃ«Å¸â€° |
|------|------|
| Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Build Ã¬â€”ÂÃ«Å¸Â¬ | 3 |
| Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Vet ÃªÂ²Â½ÃªÂ³Â  | 0 |
| Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ | 2 |
| Ã«â€šÂ¨Ã¬Ââ‚¬ Ã¬ÂÂ´Ã¬Å Ë† | 0 |

Build Ã¬Æ’ÂÃ­Æ’Å“: PASS: Ã¬â€žÂ±ÃªÂ³Âµ
````

## Ã¬Å¾ÂÃ¬Â£Â¼ Ã«Â°Å“Ã¬Æ’ÂÃ­â€¢ËœÃ«Å â€ Ã¬â€”ÂÃ«Å¸Â¬

| Ã¬â€”ÂÃ«Å¸Â¬ | Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â ÂÃ¬ÂÂ¸ Ã¬Ë†ËœÃ¬Â â€¢ Ã«Â°Â©Ã«Â²â€¢ |
|------|-------------------|
| `undefined: X` | import Ã¬Â¶â€ÃªÂ°â‚¬ Ã«ËœÂÃ«Å â€ Ã¬ËœÂ¤Ã­Æ’â‚¬ Ã¬Ë†ËœÃ¬Â â€¢ |
| `cannot use X as Y` | Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã«Â³â‚¬Ã­â„¢Ëœ Ã«ËœÂÃ«Å â€ Ã­â€¢Â Ã«â€¹Â¹ Ã¬Ë†ËœÃ¬Â â€¢ |
| `missing return` | return Ã«Â¬Â¸ Ã¬Â¶â€ÃªÂ°â‚¬ |
| `X does not implement Y` | Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã«Â©â€Ã¬â€žÅ“Ã«â€œÅ“ Ã¬Â¶â€ÃªÂ°â‚¬ |
| `import cycle` | Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ ÃªÂµÂ¬Ã¬Â¡Â° Ã¬Å¾Â¬ÃªÂµÂ¬Ã¬â€žÂ± |
| `declared but not used` | Ã«Â³â‚¬Ã¬Ë†Ëœ Ã¬Â Å“ÃªÂ±Â° Ã«ËœÂÃ«Å â€ Ã¬â€šÂ¬Ã¬Å¡Â© |
| `cannot find package` | `go get` Ã«ËœÂÃ«Å â€ `go mod tidy` |

## Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â â€žÃ«Å¾Âµ

1. **Build Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â¨Â¼Ã¬Â â‚¬** - Ã¬Â½â€Ã«â€œÅ“ÃªÂ°â‚¬ Ã¬Â»Â´Ã­Å’Å’Ã¬ÂÂ¼Ã«ÂËœÃ¬â€“Â´Ã¬â€¢Â¼ Ã­â€¢Â¨
2. **Vet ÃªÂ²Â½ÃªÂ³Â  Ã«â€˜Â Ã«Â²Ë†Ã¬Â§Â¸** - Ã¬ÂËœÃ¬â€¹Â¬Ã¬Å Â¤Ã«Å¸Â¬Ã¬Å¡Â´ ÃªÂµÂ¬Ã¬Â¡Â° Ã¬Ë†ËœÃ¬Â â€¢
3. **Lint ÃªÂ²Â½ÃªÂ³Â  Ã¬â€žÂ¸ Ã«Â²Ë†Ã¬Â§Â¸** - Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼ÃªÂ³Â¼ Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬
4. **Ã­â€¢Å“ Ã«Â²Ë†Ã¬â€”Â Ã­â€¢ËœÃ«â€šËœÃ¬â€Â©** - ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½ ÃªÂ²â‚¬Ã¬Â¦Â
5. **Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã«Â³â‚¬ÃªÂ²Â½** - Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§ÂÃ¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬Ë†ËœÃ¬Â â€¢Ã«Â§Å’

## Ã¬Â¤â€˜Ã«â€¹Â¨ Ã¬Â¡Â°ÃªÂ±Â´

Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ÃªÂ°â‚¬ Ã¬Â¤â€˜Ã«â€¹Â¨Ã­â€¢ËœÃªÂ³Â  Ã«Â³Â´ÃªÂ³Â Ã­â€¢ËœÃ«Å â€ ÃªÂ²Â½Ã¬Å¡Â°:
- 3Ã«Â²Ë† Ã¬â€¹Å“Ã«Ââ€ž Ã­â€ºâ€žÃ¬â€”ÂÃ«Ââ€ž ÃªÂ°â„¢Ã¬Ââ‚¬ Ã¬â€”ÂÃ«Å¸Â¬ÃªÂ°â‚¬ Ã¬Â§â‚¬Ã¬â€ Â
- Ã¬Ë†ËœÃ¬Â â€¢Ã¬ÂÂ´ Ã«Ââ€ Ã«Â§Å½Ã¬Ââ‚¬ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã«Â°Å“Ã¬Æ’ÂÃ¬â€¹Å“Ã­â€šÂ´
- Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ Ã«Â³â‚¬ÃªÂ²Â½Ã¬ÂÂ´ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ ÃªÂ²Â½Ã¬Å¡Â°
- Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ±Ã¬ÂÂ´ Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ ÃªÂ²Â½Ã¬Å¡Â°

## ÃªÂ´â‚¬Ã«Â Â¨ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

- `/go-test` - build Ã¬â€žÂ±ÃªÂ³Âµ Ã­â€ºâ€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
- `/go-review` - Ã¬Â½â€Ã«â€œÅ“ Ã­â€™Ë†Ã¬Â§Ë† Ã«Â¦Â¬Ã«Â·Â°
- `/verify` - Ã¬Â â€žÃ¬Â²Â´ ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â£Â¨Ã­â€â€ž

## ÃªÂ´â‚¬Ã«Â Â¨ Ã­â€¢Â­Ã«ÂªÂ©

- Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸: `agents/go-build-resolver.md`
- Ã¬Å Â¤Ã­â€šÂ¬: `skills/golang-patterns/`
