---
name: golang-patterns
description: Ã„Â°diomatic Go desenler, en iyi uygulamalar ve saÃ„Å¸lam, verimli ve bakÃ„Â±mÃ„Â± kolay Go uygulamalarÃ„Â± oluÃ…Å¸turmak iÃƒÂ§in konvansiyonlar.
origin: ECC
---

# Go GeliÃ…Å¸tirme Desenleri

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


SaÃ„Å¸lam, verimli ve bakÃ„Â±mÃ„Â± kolay uygulamalar oluÃ…Å¸turmak iÃƒÂ§in idiomatic Go desenleri ve en iyi uygulamalar.

## Ne Zaman EtkinleÃ…Å¸tirmeli

- Yeni Go kodu yazarken
- Go kodunu gÃƒÂ¶zden geÃƒÂ§irirken
- Mevcut Go kodunu refactor ederken
- Go paketleri/modÃƒÂ¼lleri tasarlarken

## Temel Prensipler

### 1. Basitlik ve AÃƒÂ§Ã„Â±klÃ„Â±k

Go, zekiceden ziyade basitliÃ„Å¸i tercih eder. Kod aÃƒÂ§Ã„Â±k ve okunmasÃ„Â± kolay olmalÃ„Â±dÃ„Â±r.

```go
// Ã„Â°yi: AÃƒÂ§Ã„Â±k ve doÃ„Å¸rudan
func GetUser(id string) (*User, error) {
    user, err := db.FindUser(id)
    if err != nil {
        return nil, fmt.Errorf("get user %s: %w", id, err)
    }
    return user, nil
}

// KÃƒÂ¶tÃƒÂ¼: AÃ…Å¸Ã„Â±rÃ„Â± zeki
func GetUser(id string) (*User, error) {
    return func() (*User, error) {
        if u, e := db.FindUser(id); e == nil {
            return u, nil
        } else {
            return nil, e
        }
    }()
}
```

### 2. SÃ„Â±fÃ„Â±r DeÃ„Å¸eri KullanÃ„Â±Ã…Å¸lÃ„Â± YapÃ„Â±n

TÃƒÂ¼rleri, sÃ„Â±fÃ„Â±r deÃ„Å¸erinin baÃ…Å¸latma olmadan hemen kullanÃ„Â±labilir olacaÃ„Å¸Ã„Â± Ã…Å¸ekilde tasarlayÃ„Â±n.

```go
// Ã„Â°yi: SÃ„Â±fÃ„Â±r deÃ„Å¸er kullanÃ„Â±Ã…Å¸lÃ„Â±dÃ„Â±r
type Counter struct {
    mu    sync.Mutex
    count int // sÃ„Â±fÃ„Â±r deÃ„Å¸er 0'dÃ„Â±r, kullanÃ„Â±ma hazÃ„Â±rdÃ„Â±r
}

func (c *Counter) Inc() {
    c.mu.Lock()
    c.count++
    c.mu.Unlock()
}

// Ã„Â°yi: bytes.Buffer sÃ„Â±fÃ„Â±r deÃ„Å¸erle ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
var buf bytes.Buffer
buf.WriteString("hello")

// KÃƒÂ¶tÃƒÂ¼: BaÃ…Å¸latma gerektirir
type BadCounter struct {
    counts map[string]int // nil map panic verir
}
```

### 3. Interface Kabul Et, Struct DÃƒÂ¶ndÃƒÂ¼r

Fonksiyonlar interface parametreleri kabul etmeli ve somut tipler dÃƒÂ¶ndÃƒÂ¼rmelidir.

```go
// Ã„Â°yi: Interface kabul eder, somut tip dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r
func ProcessData(r io.Reader) (*Result, error) {
    data, err := io.ReadAll(r)
    if err != nil {
        return nil, err
    }
    return &Result{Data: data}, nil
}

// KÃƒÂ¶tÃƒÂ¼: Interface dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r (implementasyon detaylarÃ„Â±nÃ„Â± gereksiz yere gizler)
func ProcessData(r io.Reader) (io.Reader, error) {
    // ...
}
```

## Hata Ã„Â°Ã…Å¸leme Desenleri

### BaÃ„Å¸lam ile Hata Sarmalama

```go
// Ã„Â°yi: HatalarÃ„Â± baÃ„Å¸lamla sarmalayÃ„Â±n
func LoadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("load config %s: %w", path, err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parse config %s: %w", path, err)
    }

    return &cfg, nil
}
```

### Ãƒâ€“zel Hata Tipleri

```go
// Domain'e ÃƒÂ¶zgÃƒÂ¼ hatalarÃ„Â± tanÃ„Â±mlayÃ„Â±n
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}

// YaygÃ„Â±n durumlar iÃƒÂ§in sentinel hatalar
var (
    ErrNotFound     = errors.New("resource not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrInvalidInput = errors.New("invalid input")
)
```

### errors.Is ve errors.As ile Hata KontrolÃƒÂ¼

```go
func HandleError(err error) {
    // Belirli bir hatayÃ„Â± kontrol et
    if errors.Is(err, sql.ErrNoRows) {
        log.Println("No records found")
        return
    }

    // Hata tipini kontrol et
    var validationErr *ValidationError
    if errors.As(err, &validationErr) {
        log.Printf("Validation error on field %s: %s",
            validationErr.Field, validationErr.Message)
        return
    }

    // Bilinmeyen hata
    log.Printf("Unexpected error: %v", err)
}
```

### HatalarÃ„Â± Asla GÃƒÂ¶z ArdÃ„Â± Etmeyin

```go
// KÃƒÂ¶tÃƒÂ¼: BoÃ…Å¸ tanÃ„Â±mlayÃ„Â±cÃ„Â± ile hatayÃ„Â± gÃƒÂ¶z ardÃ„Â± etmek
result, _ := doSomething()

// Ã„Â°yi: HatayÃ„Â± iÃ…Å¸leyin veya neden gÃƒÂ¶z ardÃ„Â± edildiÃ„Å¸ini aÃƒÂ§Ã„Â±kÃƒÂ§a belgelendirin
result, err := doSomething()
if err != nil {
    return err
}

// Kabul edilebilir: Hata gerÃƒÂ§ekten ÃƒÂ¶nemli olmadÃ„Â±Ã„Å¸Ã„Â±nda (nadir)
_ = writer.Close() // En iyi ÃƒÂ§aba temizliÃ„Å¸i, hata baÃ…Å¸ka yerde loglanÃ„Â±r
```

## EÃ…Å¸zamanlÃ„Â±lÃ„Â±k Desenleri

### Worker Pool

```go
func WorkerPool(jobs <-chan Job, results chan<- Result, numWorkers int) {
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                results <- process(job)
            }
        }()
    }

    wg.Wait()
    close(results)
}
```

### Ã„Â°ptal ve Zaman AÃ…Å¸Ã„Â±mlarÃ„Â± iÃƒÂ§in Context

```go
func FetchWithTimeout(ctx context.Context, url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, fmt.Errorf("create request: %w", err)
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("fetch %s: %w", url, err)
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}
```

### Zarif Kapatma

```go
func GracefulShutdown(server *http.Server) {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    <-quit
    log.Println("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := server.Shutdown(ctx); err != nil {
        log.Fatalf("Server forced to shutdown: %v", err)
    }

    log.Println("Server exited")
}
```

### Koordineli Goroutine'ler iÃƒÂ§in errgroup

```go
import "golang.org/x/sync/errgroup"

func FetchAll(ctx context.Context, urls []string) ([][]byte, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([][]byte, len(urls))

    for i, url := range urls {
        i, url := i, url // Loop deÃ„Å¸iÃ…Å¸kenlerini yakala
        g.Go(func() error {
            data, err := FetchWithTimeout(ctx, url)
            if err != nil {
                return err
            }
            results[i] = data
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}
```

### Goroutine SÃ„Â±zÃ„Â±ntÃ„Â±larÃ„Â±ndan KaÃƒÂ§Ã„Â±nma

```go
// KÃƒÂ¶tÃƒÂ¼: Context iptal edilirse goroutine sÃ„Â±zÃ„Â±ntÃ„Â±sÃ„Â±
func leakyFetch(ctx context.Context, url string) <-chan []byte {
    ch := make(chan []byte)
    go func() {
        data, _ := fetch(url)
        ch <- data // AlÃ„Â±cÃ„Â± yoksa sonsuza kadar bloklar
    }()
    return ch
}

// Ã„Â°yi: Ã„Â°ptali dÃƒÂ¼zgÃƒÂ¼n bir Ã…Å¸ekilde iÃ…Å¸ler
func safeFetch(ctx context.Context, url string) <-chan []byte {
    ch := make(chan []byte, 1) // Tamponlu kanal
    go func() {
        data, err := fetch(url)
        if err != nil {
            return
        }
        select {
        case ch <- data:
        case <-ctx.Done():
        }
    }()
    return ch
}
```

## Interface TasarÃ„Â±mÃ„Â±

### KÃƒÂ¼ÃƒÂ§ÃƒÂ¼k, OdaklanmÃ„Â±Ã…Å¸ Interface'ler

```go
// Ã„Â°yi: Tek metodlu interface'ler
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

// Interface'leri gerektiÃ„Å¸i gibi birleÃ…Å¸tirin
type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}
```

### Interface'leri KullanÃ„Â±ldÃ„Â±klarÃ„Â± Yerde TanÃ„Â±mlayÃ„Â±n

```go
// SaÃ„Å¸layÃ„Â±cÃ„Â± pakette deÃ„Å¸il, tÃƒÂ¼ketici pakette
package service

// UserStore bu servisin neye ihtiyacÃ„Â± olduÃ„Å¸unu tanÃ„Â±mlar
type UserStore interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

type Service struct {
    store UserStore
}

// Somut implementasyon baÃ…Å¸ka bir pakette olabilir
// Bu interface'i bilmesine gerek yoktur
```

### Type Assertion ile Opsiyonel DavranÃ„Â±Ã…Å¸

```go
type Flusher interface {
    Flush() error
}

func WriteAndFlush(w io.Writer, data []byte) error {
    if _, err := w.Write(data); err != nil {
        return err
    }

    // Destekleniyorsa flush et
    if f, ok := w.(Flusher); ok {
        return f.Flush()
    }
    return nil
}
```

## Paket Organizasyonu

### Standart Proje DÃƒÂ¼zeni

```text
myproject/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ cmd/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ myapp/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ main.go           # GiriÃ…Å¸ noktasÃ„Â±
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ internal/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ handler/              # HTTP handler'lar
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ service/              # Ã„Â°Ã…Å¸ mantÃ„Â±Ã„Å¸Ã„Â±
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ repository/           # Veri eriÃ…Å¸imi
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ config/               # YapÃ„Â±landÃ„Â±rma
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pkg/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ client/               # Public API client
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ v1/                   # API tanÃ„Â±mlarÃ„Â± (proto, OpenAPI)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ testdata/                 # Test fixture'larÃ„Â±
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ go.mod
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ go.sum
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Makefile
```

### Paket Ã„Â°simlendirme

```go
// Ã„Â°yi: KÃ„Â±sa, kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k harf, alt ÃƒÂ§izgi yok
package http
package json
package user

// KÃƒÂ¶tÃƒÂ¼: Verbose, karÃ„Â±Ã…Å¸Ã„Â±k bÃƒÂ¼yÃƒÂ¼k/kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k harf veya gereksiz
package httpHandler
package json_parser
package userService // Gereksiz 'Service' eki
```

### Paket Seviyesi State'ten KaÃƒÂ§Ã„Â±nÃ„Â±n

```go
// KÃƒÂ¶tÃƒÂ¼: Global deÃ„Å¸iÃ…Å¸ken state
var db *sql.DB

func init() {
    db, _ = sql.Open("postgres", os.Getenv("DATABASE_URL"))
}

// Ã„Â°yi: Dependency injection
type Server struct {
    db *sql.DB
}

func NewServer(db *sql.DB) *Server {
    return &Server{db: db}
}
```

## Struct TasarÃ„Â±mÃ„Â±

### Functional Options Deseni

```go
type Server struct {
    addr    string
    timeout time.Duration
    logger  *log.Logger
}

type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) {
        s.timeout = d
    }
}

func WithLogger(l *log.Logger) Option {
    return func(s *Server) {
        s.logger = l
    }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{
        addr:    addr,
        timeout: 30 * time.Second, // varsayÃ„Â±lan
        logger:  log.Default(),    // varsayÃ„Â±lan
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// KullanÃ„Â±m
server := NewServer(":8080",
    WithTimeout(60*time.Second),
    WithLogger(customLogger),
)
```

### Kompozisyon iÃƒÂ§in Embedding

```go
type Logger struct {
    prefix string
}

func (l *Logger) Log(msg string) {
    fmt.Printf("[%s] %s\n", l.prefix, msg)
}

type Server struct {
    *Logger // Embedding - Server Log metodunu alÃ„Â±r
    addr    string
}

func NewServer(addr string) *Server {
    return &Server{
        Logger: &Logger{prefix: "SERVER"},
        addr:   addr,
    }
}

// KullanÃ„Â±m
s := NewServer(":8080")
s.Log("Starting...") // GÃƒÂ¶mÃƒÂ¼lÃƒÂ¼ Logger.Log'u ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r
```

## Bellek ve Performans

### Boyut BilindiÃ„Å¸inde Slice'larÃ„Â± Ãƒâ€“nceden Tahsis Edin

```go
// KÃƒÂ¶tÃƒÂ¼: Slice'Ã„Â± birden ÃƒÂ§ok kez bÃƒÂ¼yÃƒÂ¼tÃƒÂ¼r
func processItems(items []Item) []Result {
    var results []Result
    for _, item := range items {
        results = append(results, process(item))
    }
    return results
}

// Ã„Â°yi: Tek tahsis
func processItems(items []Item) []Result {
    results := make([]Result, 0, len(items))
    for _, item := range items {
        results = append(results, process(item))
    }
    return results
}
```

### SÃ„Â±k Tahsisler iÃƒÂ§in sync.Pool KullanÃ„Â±n

```go
var bufferPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func ProcessRequest(data []byte) []byte {
    buf := bufferPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufferPool.Put(buf)
    }()

    buf.Write(data)
    // Ã„Â°Ã…Å¸le...
    return buf.Bytes()
}
```

### DÃƒÂ¶ngÃƒÂ¼lerde String BirleÃ…Å¸tirmekten KaÃƒÂ§Ã„Â±nÃ„Â±n

```go
// KÃƒÂ¶tÃƒÂ¼: BirÃƒÂ§ok string tahsisi oluÃ…Å¸turur
func join(parts []string) string {
    var result string
    for _, p := range parts {
        result += p + ","
    }
    return result
}

// Ã„Â°yi: strings.Builder ile tek tahsis
func join(parts []string) string {
    var sb strings.Builder
    for i, p := range parts {
        if i > 0 {
            sb.WriteString(",")
        }
        sb.WriteString(p)
    }
    return sb.String()
}

// En iyi: Standart kÃƒÂ¼tÃƒÂ¼phaneyi kullanÃ„Â±n
func join(parts []string) string {
    return strings.Join(parts, ",")
}
```

## Go Tooling Entegrasyonu

### Temel Komutlar

```bash
# Build ve ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
go build ./...
go run ./cmd/myapp

# Test
go test ./...
go test -race ./...
go test -cover ./...

# Statik analiz
go vet ./...
staticcheck ./...
golangci-lint run

# ModÃƒÂ¼l yÃƒÂ¶netimi
go mod tidy
go mod verify

# Formatlama
gofmt -w .
goimports -w .
```

### Ãƒâ€“nerilen Linter YapÃ„Â±landÃ„Â±rmasÃ„Â± (.golangci.yml)

```yaml
linters:
  enable:
    - errcheck
    - gosimple
    - govet
    - ineffassign
    - staticcheck
    - unused
    - gofmt
    - goimports
    - misspell
    - unconvert
    - unparam

linters-settings:
  errcheck:
    check-type-assertions: true
  govet:
    enable:
      - shadow

issues:
  exclude-use-default: false
```

## HÃ„Â±zlÃ„Â± Referans: Go Ã„Â°fadeleri

| Ã„Â°fade | AÃƒÂ§Ã„Â±klama |
|-------|----------|
| Interface kabul et, struct dÃƒÂ¶ndÃƒÂ¼r | Fonksiyonlar interface parametreleri kabul eder, somut tipler dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r |
| Hatalar deÃ„Å¸erdir | HatalarÃ„Â± exception deÃ„Å¸il birinci sÃ„Â±nÃ„Â±f deÃ„Å¸erler olarak ele alÃ„Â±n |
| BelleÃ„Å¸i paylaÃ…Å¸arak iletiÃ…Å¸im kurmayÃ„Â±n | Goroutine'ler arasÃ„Â± koordinasyon iÃƒÂ§in kanallarÃ„Â± kullanÃ„Â±n |
| SÃ„Â±fÃ„Â±r deÃ„Å¸eri kullanÃ„Â±Ã…Å¸lÃ„Â± yapÃ„Â±n | Tipler aÃƒÂ§Ã„Â±k baÃ…Å¸latma olmadan ÃƒÂ§alÃ„Â±Ã…Å¸malÃ„Â±dÃ„Â±r |
| Biraz kopyalama biraz baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±ktan iyidir | Gereksiz dÃ„Â±Ã…Å¸ baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klardan kaÃƒÂ§Ã„Â±nÃ„Â±n |
| AÃƒÂ§Ã„Â±k zekiden iyidir | OkunabilirliÃ„Å¸i zekiceden ÃƒÂ¶ncelikli kÃ„Â±lÃ„Â±n |
| gofmt kimsenin favorisi deÃ„Å¸il ama herkesin arkadaÃ…Å¸Ã„Â± | Her zaman gofmt/goimports ile formatlayÃ„Â±n |
| Erken dÃƒÂ¶nÃƒÂ¼n | HatalarÃ„Â± ÃƒÂ¶nce iÃ…Å¸leyin, mutlu yolu girintilendirilmemiÃ…Å¸ tutun |

## KaÃƒÂ§Ã„Â±nÃ„Â±lmasÃ„Â± Gereken Anti-Desenler

```go
// KÃƒÂ¶tÃƒÂ¼: Uzun fonksiyonlarda naked return'ler
func process() (result int, err error) {
    // ... 50 satÃ„Â±r ...
    return // Ne dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼lÃƒÂ¼yor?
}

// KÃƒÂ¶tÃƒÂ¼: Kontrol akÃ„Â±Ã…Å¸Ã„Â± iÃƒÂ§in panic kullanmak
func GetUser(id string) *User {
    user, err := db.Find(id)
    if err != nil {
        panic(err) // Bunu yapmayÃ„Â±n
    }
    return user
}

// KÃƒÂ¶tÃƒÂ¼: Struct iÃƒÂ§inde context geÃƒÂ§mek
type Request struct {
    ctx context.Context // Context ilk parametre olmalÃ„Â±
    ID  string
}

// Ã„Â°yi: Context ilk parametre olarak
func ProcessRequest(ctx context.Context, id string) error {
    // ...
}

// KÃƒÂ¶tÃƒÂ¼: Value ve pointer receiver'larÃ„Â± karÃ„Â±Ã…Å¸tÃ„Â±rmak
type Counter struct{ n int }
func (c Counter) Value() int { return c.n }    // Value receiver
func (c *Counter) Increment() { c.n++ }        // Pointer receiver
// Bir stil seÃƒÂ§in ve tutarlÃ„Â± olun
```

**UnutmayÃ„Â±n**: Go kodu en iyi anlamda sÃ„Â±kÃ„Â±cÃ„Â± olmalÃ„Â±dÃ„Â±r - ÃƒÂ¶ngÃƒÂ¶rÃƒÂ¼lebilir, tutarlÃ„Â± ve anlaÃ…Å¸Ã„Â±lmasÃ„Â± kolay. Ã…Å¾ÃƒÂ¼phe duyduÃ„Å¸unuzda, basit tutun.
