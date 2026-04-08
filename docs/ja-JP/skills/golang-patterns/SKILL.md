---
name: golang-patterns
description: Ã¥Â â€¦Ã§â€°Â¢Ã£ÂÂ§Ã¥Å Â¹Ã§Å½â€¡Ã§Å¡â€žÃ£Ââ€¹Ã£ÂÂ¤Ã¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªGoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦Â§â€¹Ã§Â¯â€°Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦â€¦Â£Ã§â€Â¨Ã§Å¡â€žÃ£ÂÂªGoÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬ÂÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â‚¬ÂÃ¨Â¦ÂÃ§Â´â€žÃ£â‚¬â€š
---

# GoÃ©â€“â€¹Ã§â„¢ÂºÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Â â€¦Ã§â€°Â¢Ã£ÂÂ§Ã¥Å Â¹Ã§Å½â€¡Ã§Å¡â€žÃ£Ââ€¹Ã£ÂÂ¤Ã¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦Â§â€¹Ã§Â¯â€°Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦â€¦Â£Ã§â€Â¨Ã§Å¡â€žÃ£ÂÂªGoÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ¨Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žGoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£ÂÂ¨Ã£ÂÂ
- GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã¦â€”Â¢Ã¥Â­ËœÃ£ÂÂ®GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- GoÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸/Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ

## Ã¦Â Â¸Ã£ÂÂ¨Ã£ÂÂªÃ£â€šâ€¹Ã¥Å½Å¸Ã¥â€°â€¡

### 1. Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£Ââ€¢Ã£ÂÂ¨Ã¦ËœÅ½Ã§Â¢ÂºÃ£Ââ€¢

GoÃ£ÂÂ¯Ã¥Â·Â§Ã¥Â¦â„¢Ã£Ââ€¢Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£Ââ€¢Ã£â€šâ€™Ã¥Â¥Â½Ã£ÂÂ¿Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ¯Ã¦ËœÅ½Ã§â„¢Â½Ã£ÂÂ§Ã¨ÂªÂ­Ã£ÂÂ¿Ã£â€šâ€žÃ£Ââ„¢Ã£Ââ€žÃ£â€šâ€šÃ£ÂÂ®Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

```go
// Good: Clear and direct
func GetUser(id string) (*User, error) {
    user, err := db.FindUser(id)
    if err != nil {
        return nil, fmt.Errorf("get user %s: %w", id, err)
    }
    return user, nil
}

// Bad: Overly clever
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

### 2. Ã£â€šÂ¼Ã£Æ’Â­Ã¥â‚¬Â¤Ã£â€šâ€™Ã¦Å“â€°Ã§â€Â¨Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹

Ã¥Å¾â€¹Ã£â€šâ€™Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã©Å¡â€ºÃ£â‚¬ÂÃ£ÂÂÃ£ÂÂ®Ã£â€šÂ¼Ã£Æ’Â­Ã¥â‚¬Â¤Ã£ÂÅ’Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ§Ã£Ââ„¢Ã£ÂÂÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```go
// Good: Zero value is useful
type Counter struct {
    mu    sync.Mutex
    count int // zero value is 0, ready to use
}

func (c *Counter) Inc() {
    c.mu.Lock()
    c.count++
    c.mu.Unlock()
}

// Good: bytes.Buffer works with zero value
var buf bytes.Buffer
buf.WriteString("hello")

// Bad: Requires initialization
type BadCounter struct {
    counts map[string]int // nil map will panic
}
```

### 3. Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¥Ââ€”Ã£Ââ€˜Ã¥Ââ€“Ã£â€šÅ Ã£â‚¬ÂÃ¦Â§â€¹Ã©â‚¬Â Ã¤Â½â€œÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢

Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ¯Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¥Ââ€”Ã£Ââ€˜Ã¥Ââ€“Ã£â€šÅ Ã£â‚¬ÂÃ¥â€¦Â·Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ¥Å¾â€¹Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

```go
// Good: Accepts interface, returns concrete type
func ProcessData(r io.Reader) (*Result, error) {
    data, err := io.ReadAll(r)
    if err != nil {
        return nil, err
    }
    return &Result{Data: data}, nil
}

// Bad: Returns interface (hides implementation details unnecessarily)
func ProcessData(r io.Reader) (io.Reader, error) {
    // ...
}
```

## Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã¤Â»ËœÃ£ÂÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€Ã£Æ’Â³Ã£â€šÂ°

```go
// Good: Wrap errors with context
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

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¥Å¾â€¹

```go
// Define domain-specific errors
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}

// Sentinel errors for common cases
var (
    ErrNotFound     = errors.New("resource not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrInvalidInput = errors.New("invalid input")
)
```

### errors.IsÃ£ÂÂ¨Errors.AsÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

```go
func HandleError(err error) {
    // Check for specific error
    if errors.Is(err, sql.ErrNoRows) {
        log.Println("No records found")
        return
    }

    // Check for error type
    var validationErr *ValidationError
    if errors.As(err, &validationErr) {
        log.Printf("Validation error on field %s: %s",
            validationErr.Field, validationErr.Message)
        return
    }

    // Unknown error
    log.Printf("Unexpected error: %v", err)
}
```

### Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â±ÂºÃ£Ââ€”Ã£ÂÂ¦Ã§â€žÂ¡Ã¨Â¦â€“Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž

```go
// Bad: Ignoring error with blank identifier
result, _ := doSomething()

// Good: Handle or explicitly document why it's safe to ignore
result, err := doSomething()
if err != nil {
    return err
}

// Acceptable: When error truly doesn't matter (rare)
_ = writer.Close() // Best-effort cleanup, error logged elsewhere
```

## Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥â€¡Â¦Ã§Ââ€ Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’â€”Ã£Æ’Â¼Ã£Æ’Â«

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

### Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£â€šÂ»Ã£Æ’Â«Ã£ÂÂ¨Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†Ã§â€Â¨Ã£ÂÂ®Context

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

### Ã£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€¢Ã£Æ’Â«Ã£â€šÂ·Ã£Æ’Â£Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â‚¬Ã£â€šÂ¦Ã£Æ’Â³

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

### Ã¥Ââ€Ã¨ÂªÂ¿Ã§Å¡â€žÃ£ÂÂªGoroutineÃ§â€Â¨Ã£ÂÂ®errgroup

```go
import "golang.org/x/sync/errgroup"

func FetchAll(ctx context.Context, urls []string) ([][]byte, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([][]byte, len(urls))

    for i, url := range urls {
        i, url := i, url // Capture loop variables
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

### GoroutineÃ£Æ’ÂªÃ£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ®Ã¥â€ºÅ¾Ã©ÂÂ¿

```go
// Bad: Goroutine leak if context is cancelled
func leakyFetch(ctx context.Context, url string) <-chan []byte {
    ch := make(chan []byte)
    go func() {
        data, _ := fetch(url)
        ch <- data // Blocks forever if no receiver
    }()
    return ch
}

// Good: Properly handles cancellation
func safeFetch(ctx context.Context, url string) <-chan []byte {
    ch := make(chan []byte, 1) // Buffered channel
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

## Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã¨Â¨Â­Ã¨Â¨Ë†

### Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂÃ§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã§ÂµÅ¾Ã£ÂÂ£Ã£ÂÅ¸Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹

```go
// Good: Single-method interfaces
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

// Compose interfaces as needed
type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}
```

### Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¦â€°â‚¬Ã£ÂÂ§Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¥Â®Å¡Ã§Â¾Â©

```go
// In the consumer package, not the provider
package service

// UserStore defines what this service needs
type UserStore interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

type Service struct {
    store UserStore
}

// Concrete implementation can be in another package
// It doesn't need to know about this interface
```

### Ã¥Å¾â€¹Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¥â€¹â€¢Ã¤Â½Å“Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦

```go
type Flusher interface {
    Flush() error
}

func WriteAndFlush(w io.Writer, data []byte) error {
    if _, err := w.Write(data); err != nil {
        return err
    }

    // Flush if supported
    if f, ok := w.(Flusher); ok {
        return f.Flush()
    }
    return nil
}
```

## Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã¦Â§â€¹Ã¦Ë†Â

### Ã¦Â¨â„¢Ã¦Âºâ€“Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†

```text
myproject/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ cmd/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ myapp/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ main.go           # Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ internal/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ handler/              # HTTP Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ service/              # Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ repository/           # Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ config/               # Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pkg/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ client/               # Ã¥â€¦Â¬Ã©â€“â€¹ API Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ v1/                   # API Ã¥Â®Å¡Ã§Â¾Â©Ã¯Â¼Ë†protoÃ£â‚¬ÂOpenAPIÃ¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ testdata/                 # Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ go.mod
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ go.sum
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Makefile
```

### Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã¥â€˜Â½Ã¥ÂÂ

```go
// Good: Short, lowercase, no underscores
package http
package json
package user

// Bad: Verbose, mixed case, or redundant
package httpHandler
package json_parser
package userService // Redundant 'Service' suffix
```

### Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹

```go
// Bad: Global mutable state
var db *sql.DB

func init() {
    db, _ = sql.Open("postgres", os.Getenv("DATABASE_URL"))
}

// Good: Dependency injection
type Server struct {
    db *sql.DB
}

func NewServer(db *sql.DB) *Server {
    return &Server{db: db}
}
```

## Ã¦Â§â€¹Ã©â‚¬Â Ã¤Â½â€œÃ¨Â¨Â­Ã¨Â¨Ë†

### Ã©â€“Â¢Ã¦â€¢Â°Ã¥Å¾â€¹Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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
        timeout: 30 * time.Second, // default
        logger:  log.Default(),    // default
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Usage
server := NewServer(":8080",
    WithTimeout(60*time.Second),
    WithLogger(customLogger),
)
```

### Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£â€šÂ¸Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§â€Â¨Ã£ÂÂ®Ã¥Å¸â€¹Ã£â€šÂÃ¨Â¾Â¼Ã£ÂÂ¿

```go
type Logger struct {
    prefix string
}

func (l *Logger) Log(msg string) {
    fmt.Printf("[%s] %s\n", l.prefix, msg)
}

type Server struct {
    *Logger // Embedding - Server gets Log method
    addr    string
}

func NewServer(addr string) *Server {
    return &Server{
        Logger: &Logger{prefix: "SERVER"},
        addr:   addr,
    }
}

// Usage
s := NewServer(":8080")
s.Log("Starting...") // Calls embedded Logger.Log
```

## Ã£Æ’Â¡Ã£Æ’Â¢Ã£Æ’ÂªÃ£ÂÂ¨Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹

### Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£ÂÅ’Ã£â€šÂÃ£Ââ€¹Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â€šÂ¹Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¹Ã£â€šâ€™Ã¤Âºâ€¹Ã¥â€°ÂÃ¥â€°Â²Ã£â€šÅ Ã¥Â½â€œÃ£ÂÂ¦

```go
// Bad: Grows slice multiple times
func processItems(items []Item) []Result {
    var results []Result
    for _, item := range items {
        results = append(results, process(item))
    }
    return results
}

// Good: Single allocation
func processItems(items []Item) []Result {
    results := make([]Result, 0, len(items))
    for _, item := range items {
        results = append(results, process(item))
    }
    return results
}
```

### Ã©Â Â»Ã§Â¹ÂÃ£ÂÂªÃ¥â€°Â²Ã£â€šÅ Ã¥Â½â€œÃ£ÂÂ¦Ã§â€Â¨Ã£ÂÂ®sync.PoolÃ¤Â½Â¿Ã§â€Â¨

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
    // Process...
    return buf.Bytes()
}
```

### Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥â€ â€¦Ã£ÂÂ§Ã£ÂÂ®Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã©â‚¬Â£Ã§ÂµÂÃ£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹

```go
// Bad: Creates many string allocations
func join(parts []string) string {
    var result string
    for _, p := range parts {
        result += p + ","
    }
    return result
}

// Good: Single allocation with strings.Builder
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

// Best: Use standard library
func join(parts []string) string {
    return strings.Join(parts, ",")
}
```

## GoÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã§ÂµÂ±Ã¥ÂË†

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

```bash
# Build and run
go build ./...
go run ./cmd/myapp

# Testing
go test ./...
go test -race ./...
go test -cover ./...

# Static analysis
go vet ./...
staticcheck ./...
golangci-lint run

# Module management
go mod tidy
go mod verify

# Formatting
gofmt -w .
goimports -w .
```

### Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã¨Â¨Â­Ã¥Â®Å¡Ã¯Â¼Ë†.golangci.ymlÃ¯Â¼â€°

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
    check-shadowing: true

issues:
  exclude-use-default: false
```

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹Ã¯Â¼Å¡GoÃ£â€šÂ¤Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂªÃ£Æ’Â 

| Ã£â€šÂ¤Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂªÃ£Æ’Â  | Ã¨ÂªÂ¬Ã¦ËœÅ½ |
|-------|-------------|
| Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¥Ââ€”Ã£Ââ€˜Ã¥Ââ€“Ã£â€šÅ Ã£â‚¬ÂÃ¦Â§â€¹Ã©â‚¬Â Ã¤Â½â€œÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢ | Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ¯Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¥Ââ€”Ã£Ââ€˜Ã¥Ââ€“Ã£â€šÅ Ã£â‚¬ÂÃ¥â€¦Â·Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ¥Å¾â€¹Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢ |
| Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¯Ã¥â‚¬Â¤Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹ | Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¾â€¹Ã¥Â¤â€“Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ¤Â¸â‚¬Ã§Â´Å¡Ã¥â‚¬Â¤Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã¦â€°Â±Ã£Ââ€  |
| Ã£Æ’Â¡Ã£Æ’Â¢Ã£Æ’ÂªÃ¥â€¦Â±Ã¦Å“â€°Ã£ÂÂ§Ã©â‚¬Å¡Ã¤Â¿Â¡Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž | goroutineÃ©â€“â€œÃ£ÂÂ®Ã¨ÂªÂ¿Ã¦â€¢Â´Ã£ÂÂ«Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’ÂÃ£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨ |
| Ã£â€šÂ¼Ã£Æ’Â­Ã¥â‚¬Â¤Ã£â€šâ€™Ã¦Å“â€°Ã§â€Â¨Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹ | Ã¥Å¾â€¹Ã£ÂÂ¯Ã¦ËœÅ½Ã§Â¤ÂºÃ§Å¡â€žÃ£ÂÂªÃ¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ§Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ |
| Ã¥Â°â€˜Ã£Ââ€”Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’â€Ã£Æ’Â¼Ã£ÂÂ¯Ã¥Â°â€˜Ã£Ââ€”Ã£ÂÂ®Ã¤Â¾ÂÃ¥Â­ËœÃ£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¨â€°Â¯Ã£Ââ€ž | Ã¤Â¸ÂÃ¨Â¦ÂÃ£ÂÂªÃ¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¥Â­ËœÃ£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹ |
| Ã¦ËœÅ½Ã§Â¢ÂºÃ£Ââ€¢Ã£ÂÂ¯Ã¥Â·Â§Ã¥Â¦â„¢Ã£Ââ€¢Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¨â€°Â¯Ã£Ââ€ž | Ã¥Â·Â§Ã¥Â¦â„¢Ã£Ââ€¢Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¥ÂÂ¯Ã¨ÂªÂ­Ã¦â‚¬Â§Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë† |
| gofmtÃ£ÂÂ¯Ã¨ÂªÂ°Ã£ÂÂ®Ã¥Â¥Â½Ã£ÂÂ¿Ã£ÂÂ§Ã£â€šâ€šÃ£ÂÂªÃ£Ââ€žÃ£ÂÅ’Ã§Å¡â€ Ã£ÂÂ®Ã¥Ââ€¹Ã©Ââ€ | Ã¥Â¸Â¸Ã£ÂÂ«gofmt/goimportsÃ£ÂÂ§Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë† |
| Ã¦â€”Â©Ã¦Å“Å¸Ã£Æ’ÂªÃ£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¥â€¡Â¦Ã§Ââ€ Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’ÂÃ£Æ’Æ’Ã£Æ’â€Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¹Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦Âµâ€¦Ã£ÂÂÃ¤Â¿ÂÃ£ÂÂ¤ |

## Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂÃ£â€šÂ¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```go
// Bad: Naked returns in long functions
func process() (result int, err error) {
    // ... 50 lines ...
    return // What is being returned?
}

// Bad: Using panic for control flow
func GetUser(id string) *User {
    user, err := db.Find(id)
    if err != nil {
        panic(err) // Don't do this
    }
    return user
}

// Bad: Passing context in struct
type Request struct {
    ctx context.Context // Context should be first param
    ID  string
}

// Good: Context as first parameter
func ProcessRequest(ctx context.Context, id string) error {
    // ...
}

// Bad: Mixing value and pointer receivers
type Counter struct{ n int }
func (c Counter) Value() int { return c.n }    // Value receiver
func (c *Counter) Increment() { c.n++ }        // Pointer receiver
// Pick one style and be consistent
```

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: GoÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ¯Ã¦Å“â‚¬Ã¨â€°Â¯Ã£ÂÂ®Ã¦â€žÂÃ¥â€˜Â³Ã£ÂÂ§Ã©â‚¬â‚¬Ã¥Â±Ë†Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂÃ£ÂÂ§Ã£Ââ„¢ - Ã¤ÂºË†Ã¦Â¸Â¬Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ§Ã£â‚¬ÂÃ¤Â¸â‚¬Ã¨Â²Â«Ã¦â‚¬Â§Ã£ÂÅ’Ã£Ââ€šÃ£â€šÅ Ã£â‚¬ÂÃ§Ââ€ Ã¨Â§Â£Ã£Ââ€”Ã£â€šâ€žÃ£Ââ„¢Ã£Ââ€žÃ£â‚¬â€šÃ¨Â¿Â·Ã£ÂÂ£Ã£ÂÅ¸Ã£ÂÂ¨Ã£ÂÂÃ£ÂÂ¯Ã£â‚¬ÂÃ£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ£Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
