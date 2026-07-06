---
name: coding-standards
description: TypeScriptÃ£â‚¬ÂJavaScriptÃ£â‚¬ÂReactÃ£â‚¬ÂNode.jsÃ©â€“â€¹Ã§â„¢ÂºÃ£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Â±Å½Ã§â€Â¨Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã¦Â¨â„¢Ã¦Âºâ€“Ã£â‚¬ÂÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â‚¬ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬â€š
---

# Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã¦Â¨â„¢Ã¦Âºâ€“Ã£ÂÂ¨Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

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


Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ«Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¦Â±Å½Ã§â€Â¨Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã¦Â¨â„¢Ã¦Âºâ€“Ã£â‚¬â€š

## Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³ÂªÃ£ÂÂ®Ã¥Å½Å¸Ã¥â€°â€¡

### 1. Ã¥ÂÂ¯Ã¨ÂªÂ­Ã¦â‚¬Â§Ã¥â€žÂªÃ¥â€¦Ë†

* Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ¯Ã¦â€ºÂ¸Ã£ÂÂÃ£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¨ÂªÂ­Ã£ÂÂ¾Ã£â€šÅ’Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£ÂÅ’Ã¥Â¤Å¡Ã£Ââ€ž
* Ã¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂªÃ¥Â¤â€°Ã¦â€¢Â°Ã¥ÂÂÃ£ÂÂ¨Ã©â€“Â¢Ã¦â€¢Â°Ã¥ÂÂ
* Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¨â€¡ÂªÃ¥Â·Â±Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
* Ã¤Â¸â‚¬Ã¨Â²Â«Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†

### 2. KISS (Keep It Simple, Stupid)

* Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£â€šâ€¹Ã¦Å“â‚¬Ã£â€šâ€šÃ£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂªÃ£â€šÂ½Ã£Æ’ÂªÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦Å½Â¡Ã§â€Â¨
* Ã©ÂÅ½Ã¥â€°Â°Ã¨Â¨Â­Ã¨Â¨Ë†Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹
* Ã¦â€”Â©Ã£Ââ„¢Ã£ÂÅ½Ã£â€šâ€¹Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹
* Ã§Ââ€ Ã¨Â§Â£Ã£Ââ€”Ã£â€šâ€žÃ£Ââ„¢Ã£Ââ€¢ > Ã¥Â·Â§Ã¥Â¦â„¢Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°

### 3. DRY (Don't Repeat Yourself)

* Ã¥â€¦Â±Ã©â‚¬Å¡Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ«Ã¦Å Â½Ã¥â€¡Âº
* Ã¥â€ ÂÃ¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
* Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã©â€“Â¢Ã¦â€¢Â°Ã£â€šâ€™Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã©â€“â€œÃ£ÂÂ§Ã¥â€¦Â±Ã¦Å“â€°
* Ã£â€šÂ³Ã£Æ’â€Ã£Æ’Â¼&Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ°Ã£Æ’Â©Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹

### 4. YAGNI (You Aren't Gonna Need It)

* Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£Ââ€žÃ¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã¤Âºâ€¹Ã¥â€°ÂÃ£ÂÂ«Ã¦Â§â€¹Ã§Â¯â€°Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
* Ã¦Å½Â¨Ã¦Â¸Â¬Ã§Å¡â€žÃ£ÂÂªÃ¤Â¸â‚¬Ã¨Ë†Â¬Ã¥Å’â€“Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹
* Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£ÂÂ¨Ã£ÂÂÃ£ÂÂ®Ã£ÂÂ¿Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£Ââ€¢Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
* Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ«Ã¥Â§â€¹Ã£â€šÂÃ£ÂÂ¦Ã£â‚¬ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

## TypeScript/JavaScriptÃ¦Â¨â„¢Ã¦Âºâ€“

### Ã¥Â¤â€°Ã¦â€¢Â°Ã£ÂÂ®Ã¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: GOOD: Descriptive names
const marketSearchQuery = 'election'
const isUserAuthenticated = true
const totalRevenue = 1000

// FAIL: BAD: Unclear names
const q = 'election'
const flag = true
const x = 1000
```

### Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: GOOD: Verb-noun pattern
async function fetchMarketData(marketId: string) { }
function calculateSimilarity(a: number[], b: number[]) { }
function isValidEmail(email: string): boolean { }

// FAIL: BAD: Unclear or noun-only
async function market(id: string) { }
function similarity(a, b) { }
function email(e) { }
```

### Ã¤Â¸ÂÃ¥Â¤â€°Ã¦â‚¬Â§Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¯Â¼Ë†Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼â€°

```typescript
// PASS: ALWAYS use spread operator
const updatedUser = {
  ...user,
  name: 'New Name'
}

const updatedArray = [...items, newItem]

// FAIL: NEVER mutate directly
user.name = 'New Name'  // BAD
items.push(newItem)     // BAD
```

### Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

```typescript
// PASS: GOOD: Comprehensive error handling
async function fetchData(url: string) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw new Error('Failed to fetch data')
  }
}

// FAIL: BAD: No error handling
async function fetchData(url) {
  const response = await fetch(url)
  return response.json()
}
```

### Async/AwaitÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

```typescript
// PASS: GOOD: Parallel execution when possible
const [users, markets, stats] = await Promise.all([
  fetchUsers(),
  fetchMarkets(),
  fetchStats()
])

// FAIL: BAD: Sequential when unnecessary
const users = await fetchUsers()
const markets = await fetchMarkets()
const stats = await fetchStats()
```

### Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§

```typescript
// PASS: GOOD: Proper types
interface Market {
  id: string
  name: string
  status: 'active' | 'resolved' | 'closed'
  created_at: Date
}

function getMarket(id: string): Promise<Market> {
  // Implementation
}

// FAIL: BAD: Using 'any'
function getMarket(id: any): Promise<any> {
  // Implementation
}
```

## ReactÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â 

```typescript
// PASS: GOOD: Functional component with types
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}

// FAIL: BAD: No types, unclear structure
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯

```typescript
// PASS: GOOD: Reusable custom hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Usage
const debouncedQuery = useDebounce(searchQuery, 500)
```

### Ã§Å Â¶Ã¦â€¦â€¹Ã§Â®Â¡Ã§Ââ€ 

```typescript
// PASS: GOOD: Proper state updates
const [count, setCount] = useState(0)

// Functional update for state based on previous state
setCount(prev => prev + 1)

// FAIL: BAD: Direct state reference
setCount(count + 1)  // Can be stale in async scenarios
```

### Ã¦ÂÂ¡Ã¤Â»Â¶Ã¤Â»ËœÃ£ÂÂÃ£Æ’Â¬Ã£Æ’Â³Ã£Æ’â‚¬Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

```typescript
// PASS: GOOD: Clear conditional rendering
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}

// FAIL: BAD: Ternary hell
{isLoading ? <Spinner /> : error ? <ErrorMessage error={error} /> : data ? <DataDisplay data={data} /> : null}
```

## APIÃ¨Â¨Â­Ã¨Â¨Ë†Ã¦Â¨â„¢Ã¦Âºâ€“

### REST APIÃ¨Â¦ÂÃ§Â´â€ž

```
GET    /api/markets              # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¸â‚¬Ã¨Â¦Â§
GET    /api/markets/:id          # Ã§â€°Â¹Ã¥Â®Å¡Ã£ÂÂ®Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¥Ââ€“Ã¥Â¾â€”
POST   /api/markets              # Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
PUT    /api/markets/:id          # Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°Ã¯Â¼Ë†Ã¥â€¦Â¨Ã¤Â½â€œÃ¯Â¼â€°
PATCH  /api/markets/:id          # Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°Ã¯Â¼Ë†Ã©Æ’Â¨Ã¥Ë†â€ Ã¯Â¼â€°
DELETE /api/markets/:id          # Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤

# Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã§â€Â¨Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿
GET /api/markets?status=active&limit=10&offset=0
```

### Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã¥Â½Â¢Ã¥Â¼Â

```typescript
// PASS: GOOD: Consistent response structure
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

// Success response
return NextResponse.json({
  success: true,
  data: markets,
  meta: { total: 100, page: 1, limit: 10 }
})

// Error response
return NextResponse.json({
  success: false,
  error: 'Invalid request'
}, { status: 400 })
```

### Ã¥â€¦Â¥Ã¥Å â€ºÃ¦Â¤Å“Ã¨Â¨Â¼

```typescript
import { z } from 'zod'

// PASS: GOOD: Schema validation
const CreateMarketSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  endDate: z.string().datetime(),
  categories: z.array(z.string()).min(1)
})

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const validated = CreateMarketSchema.parse(body)
    // Proceed with validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 })
    }
  }
}
```

## Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦Â§â€¹Ã¦Ë†Â

### Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â 

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/                    # Next.js App Router
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/               # API Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ markets/           # Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ (auth)/           # Ã¨ÂªÂÃ¨Â¨Â¼Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã¯Â¼Ë†Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/            # React Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ui/               # Ã¦Â±Å½Ã§â€Â¨ UI Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ forms/            # Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ layouts/          # Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/                # Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â  React Ã£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib/                  # Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ¨Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/             # API Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/           # Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€˜Ã£Æ’Â¼Ã©â€“Â¢Ã¦â€¢Â°
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ constants/       # Ã¥Â®Å¡Ã¦â€¢Â°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ types/                # TypeScript Ã¥Å¾â€¹Ã¥Â®Å¡Ã§Â¾Â©
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ styles/              # Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«
```

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¥â€˜Â½Ã¥ÂÂ

```
components/Button.tsx          # Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¯ PascalCase
hooks/useAuth.ts              # Ã£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ¯ 'use' Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã¤Â»ËœÃ£ÂÂ camelCase
lib/formatDate.ts             # Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ¯ camelCase
types/market.types.ts         # Ã¥Å¾â€¹Ã¥Â®Å¡Ã§Â¾Â©Ã£ÂÂ¯ .types Ã£â€šÂµÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã¤Â»ËœÃ£ÂÂ camelCase
```

## Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†

### Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°

```typescript
// PASS: GOOD: Explain WHY, not WHAT
// Use exponential backoff to avoid overwhelming the API during outages
const delay = Math.min(1000 * Math.pow(2, retryCount), 30000)

// Deliberately using mutation here for performance with large arrays
items.push(newItem)

// FAIL: BAD: Stating the obvious
// Increment counter by 1
count++

// Set name to user's name
name = user.name
```

### Ã£Æ’â€˜Ã£Æ’â€“Ã£Æ’ÂªÃ£Æ’Æ’Ã£â€šÂ¯APIÃ£ÂÂ®JSDoc

````typescript
/**
 * Searches markets using semantic similarity.
 *
 * @param query - Natural language search query
 * @param limit - Maximum number of results (default: 10)
 * @returns Array of markets sorted by similarity score
 * @throws {Error} If OpenAI API fails or Redis unavailable
 *
 * @example
 * ```typescript
 * const results = await searchMarkets('election', 5)
 * console.log(results[0].name) // "Trump vs Biden"
 * ```
 */
export async function searchMarkets(
  query: string,
  limit: number = 10
): Promise<Market[]> {
  // Implementation
}
````

## Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### Ã£Æ’Â¡Ã£Æ’Â¢Ã¥Å’â€“

```typescript
import { useMemo, useCallback } from 'react'

// PASS: GOOD: Memoize expensive computations
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// PASS: GOOD: Memoize callbacks
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])
```

### Ã©Ââ€¦Ã¥Â»Â¶Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¿

```typescript
import { lazy, Suspense } from 'react'

// PASS: GOOD: Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

export function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª

```typescript
// PASS: GOOD: Select only needed columns
const { data } = await supabase
  .from('markets')
  .select('id, name, status')
  .limit(10)

// FAIL: BAD: Select everything
const { data } = await supabase
  .from('markets')
  .select('*')
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â¨â„¢Ã¦Âºâ€“

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â Ã¯Â¼Ë†AAAÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¯Â¼â€°

```typescript
test('calculates similarity correctly', () => {
  // Arrange
  const vector1 = [1, 0, 0]
  const vector2 = [0, 1, 0]

  // Act
  const similarity = calculateCosineSimilarity(vector1, vector2)

  // Assert
  expect(similarity).toBe(0)
})
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: GOOD: Descriptive test names
test('returns empty array when no markets match query', () => { })
test('throws error when OpenAI API key is missing', () => { })
test('falls back to substring search when Redis unavailable', () => { })

// FAIL: BAD: Vague test names
test('works', () => { })
test('test search', () => { })
```

## Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¹Ã£Æ’Â¡Ã£Æ’Â«Ã£ÂÂ®Ã¦Â¤Å“Ã¥â€¡Âº

Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¦Â³Â¨Ã¦â€žÂÃ£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

### 1. Ã©â€¢Â·Ã£Ââ€žÃ©â€“Â¢Ã¦â€¢Â°

```typescript
// FAIL: BAD: Function > 50 lines
function processMarketData() {
  // 100 lines of code
}

// PASS: GOOD: Split into smaller functions
function processMarketData() {
  const validated = validateData()
  const transformed = transformData(validated)
  return saveData(transformed)
}
```

### 2. Ã¦Â·Â±Ã£Ââ€žÃ£Æ’ÂÃ£â€šÂ¹Ã£Æ’Ë†

```typescript
// FAIL: BAD: 5+ levels of nesting
if (user) {
  if (user.isAdmin) {
    if (market) {
      if (market.isActive) {
        if (hasPermission) {
          // Do something
        }
      }
    }
  }
}

// PASS: GOOD: Early returns
if (!user) return
if (!user.isAdmin) return
if (!market) return
if (!market.isActive) return
if (!hasPermission) return

// Do something
```

### 3. Ã£Æ’Å¾Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’Å Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼

```typescript
// FAIL: BAD: Unexplained numbers
if (retryCount > 3) { }
setTimeout(callback, 500)

// PASS: GOOD: Named constants
const MAX_RETRIES = 3
const DEBOUNCE_DELAY_MS = 500

if (retryCount > MAX_RETRIES) { }
setTimeout(callback, DEBOUNCE_DELAY_MS)
```

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³ÂªÃ£ÂÂ¯Ã¥Â¦Â¥Ã¥Ââ€Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ¾Ã£Ââ€ºÃ£â€šâ€œÃ£â‚¬â€šÃ¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ§Ã¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã£â€šË†Ã£â€šÅ Ã£â‚¬ÂÃ¨Â¿â€¦Ã©â‚¬Å¸Ã£ÂÂªÃ©â€“â€¹Ã§â„¢ÂºÃ£ÂÂ¨Ã¨â€¡ÂªÃ¤Â¿Â¡Ã£â€šâ€™Ã¦Å’ÂÃ£ÂÂ£Ã£ÂÅ¸Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£ÂÅ’Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã£ÂÂªÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
