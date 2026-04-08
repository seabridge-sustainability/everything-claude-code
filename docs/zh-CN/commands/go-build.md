---
description: Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤ÂGoÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬Âgo vetÃ¨Â­Â¦Ã¥â€˜Å Ã¥â€™Å’linterÃ©â€”Â®Ã©Â¢ËœÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨go-build-resolverÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â²Â¾Ã§Â¡Â®Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š
---

# Go Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã¤Â¿Â®Ã¥Â¤Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **go-build-resolver** Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â Go Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯Å Ã¦â€“Â­**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `go build`Ã£â‚¬Â`go vet`Ã£â‚¬Â`staticcheck`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Â¹Â¶Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ
3. **Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯
4. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»Âº
5. **Ã¦Å Â¥Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¥â€™Å’Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/go-build`Ã¯Â¼Å¡

* `go build ./...` Ã¥â€ºÂ Ã©â€â„¢Ã¨Â¯Â¯Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
* `go vet ./...` Ã¦Å Â¥Ã¥â€˜Å Ã©â€”Â®Ã©Â¢Ëœ
* `golangci-lint run` Ã¦ËœÂ¾Ã§Â¤ÂºÃ¨Â­Â¦Ã¥â€˜Å 
* Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â³Ã§Â³Â»Ã¦ÂÅ¸Ã¥ÂÂ
* Ã¦â€¹â€°Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨Â¯Å Ã¦â€“Â­Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Primary build check
go build ./...

# Static analysis
go vet ./...

# Extended linting (if available)
staticcheck ./...
golangci-lint run

# Module issues
go mod verify
go mod tidy -v
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
# Go Build Ã¨Â§Â£Ã¦Å¾Â

## Ã¥Ë†ÂÃ¥Â§â€¹Ã¨Â¯Å Ã¦â€“Â­

```bash
$ go build ./...
internal/service/user.go:25:15: undefined: UserRepository
internal/handler/api.go:42:9: cannot use x (type string) as type int
internal/handler/api.go:58:2: missing return at end of function

````

Ã¥Ââ€˜Ã§Å½Â°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡3

## Ã¤Â¿Â®Ã¥Â¤Â 1Ã¯Â¼Å¡Ã¦Å“ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/service/user.go:25
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡undefined: UserRepository
Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¯Â¼Ã¥â€¦Â¥

```go
// Added import
import "project/internal/repository"

// Changed
var repo UserRepository
// To
var repo repository.UserRepository
```

```bash
$ go build ./...
# 2 errors remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 2Ã¯Â¼Å¡Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/handler/api.go:42
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡cannot use x (type string) as type int

```go
// Changed
count := params.Get("count")
// To
countStr := params.Get("count")
count, _ := strconv.Atoi(countStr)
```

```bash
$ go build ./...
# 1 error remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 3Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¿â€Ã¥â€ºÅ¾

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/handler/api.go:58
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡missing return at end of function

```go
func GetUser(id string) (*User, error) {
    if id == "" {
        return nil, ErrInvalidID
    }
    user := findUser(id)
    // Added missing return
    return user, nil
}
```

```bash
$ go build ./...
# Build successful!
```

## Ã¦Å“â‚¬Ã§Â»Ë†Ã©ÂªÅ’Ã¨Â¯Â

```bash
$ go vet ./...
# No issues

$ go test ./...
ok      project/internal/service   0.015s
ok      project/internal/handler   0.023s
```

## Ã¦â€˜ËœÃ¨Â¦Â

| Ã¦Å’â€¡Ã¦Â â€¡ | Ã¦â€¢Â°Ã©â€¡Â |
|--------|-------|
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯ | 3 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€ž Vet Ã¨Â­Â¦Ã¥â€˜Å  | 0 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶ | 2 |
| Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ | 0 |

Ã¦Å¾â€žÃ¥Â»ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡PASS: Ã¦Ë†ÂÃ¥Å Å¸

```
## Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤Â

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¤Â |
|-------|-------------|
| `undefined: X` | Ã¦Â·Â»Ã¥Å Â Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯ |
| `cannot use X as Y` | Ã§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¨Âµâ€¹Ã¥â‚¬Â¼ |
| `missing return` | Ã¦Â·Â»Ã¥Å Â Ã¨Â¿â€Ã¥â€ºÅ¾Ã¨Â¯Â­Ã¥ÂÂ¥ |
| `X does not implement Y` | Ã¦Â·Â»Ã¥Å Â Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢ |
| `import cycle` | Ã©â€¡ÂÃ¦Å¾â€žÃ¥Å’â€¦Ã§Â»â€œÃ¦Å¾â€ž |
| `declared but not used` | Ã§Â§Â»Ã©â„¢Â¤Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂËœÃ©â€¡Â |
| `cannot find package` | `go get` Ã¦Ë†â€“ `go mod tidy` |

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â­â€“Ã§â€¢Â¥

1. **Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥Â¤â€žÃ§Ââ€ Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯** - Ã¤Â»Â£Ã§Â ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Æ’Â½Ã¥Â¤Å¸Ã§Â¼â€“Ã¨Â¯â€˜
2. **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€  vet Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¤Â¿Â®Ã¥Â¤ÂÃ¥ÂÂ¯Ã§â€“â€˜Ã§Â»â€œÃ¦Å¾â€ž
3. **Ã¥â€ ÂÃ¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€  lint Ã¨Â­Â¦Ã¥â€˜Å ** - Ã©Â£Å½Ã¦Â Â¼Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢Ëœ** - Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦â€ºÂ´Ã¦â€Â¹** - Ã¤Â¸ÂÃ¨Â¦ÂÃ©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Å’Ã¥ÂÂªÃ¤Â¿Â®Ã¥Â¤Â

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡
- Ã§â€ºÂ¸Ã¥ÂÅ’Ã©â€â„¢Ã¨Â¯Â¯Ã§Â»ÂÃ¨Â¿â€¡ 3 Ã¦Â¬Â¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
- Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©â€â„¢Ã¨Â¯Â¯
- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦â‚¬Â§Ã¦â€ºÂ´Ã¦â€Â¹
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

- `/go-test` - Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
- `/go-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
- `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Ã¤Â»Â£Ã§Ââ€ : `agents/go-build-resolver.md`
- Ã¦Å â‚¬Ã¨Æ’Â½: `skills/golang-patterns/`
```
