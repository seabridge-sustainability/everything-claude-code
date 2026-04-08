---
name: coding-standards
description: Universal coding standards, best practices, and patterns for TypeScript, JavaScript, React, and Node.js development.
---

# Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¨â„¢Ã¦Âºâ€“Ã¨Ë†â€¡Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã©ÂÂ©Ã§â€Â¨Ã¦â€“Â¼Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â°Ë†Ã¦Â¡Ë†Ã§Å¡â€žÃ©â‚¬Å¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¨â„¢Ã¦Âºâ€“Ã£â‚¬â€š

## Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¥Å½Å¸Ã¥â€°â€¡

### 1. Ã¥ÂÂ¯Ã¨Â®â‚¬Ã¦â‚¬Â§Ã¥â€žÂªÃ¥â€¦Ë†
- Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Â¢Â«Ã©â€“Â±Ã¨Â®â‚¬Ã§Å¡â€žÃ¦Â¬Â¡Ã¦â€¢Â¸Ã©ÂÂ Ã¥Â¤Å¡Ã¦â€“Â¼Ã¨Â¢Â«Ã¦â€™Â°Ã¥Â¯Â«Ã§Å¡â€žÃ¦Â¬Â¡Ã¦â€¢Â¸
- Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ¨Â®Å Ã¦â€¢Â¸Ã¥â€™Å’Ã¥â€¡Â½Ã¥Â¼ÂÃ¥ÂÂÃ§Â¨Â±
- Ã¥â€žÂªÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨â€¡ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¥Å’â€“Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨â‚¬Å’Ã©ÂÅ¾Ã¨Â¨Â»Ã¨Â§Â£
- Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

### 2. KISSÃ¯Â¼Ë†Ã¤Â¿ÂÃ¦Å’ÂÃ§Â°Â¡Ã¥â€“Â®Ã¯Â¼â€°
- Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“â‚¬Ã§Â°Â¡Ã¥â€“Â®Ã§Å¡â€žÃ¨Â§Â£Ã¦Â±ÂºÃ¦â€“Â¹Ã¦Â¡Ë†
- Ã©ÂÂ¿Ã¥â€¦ÂÃ©ÂÅ½Ã¥ÂºÂ¦Ã¥Â·Â¥Ã§Â¨â€¹
- Ã¤Â¸ÂÃ¥ÂÅ¡Ã©ÂÅ½Ã¦â€”Â©Ã¥â€žÂªÃ¥Å’â€“
- Ã¦Ëœâ€œÃ¦â€“Â¼Ã§Ââ€ Ã¨Â§Â£ > Ã¨ÂÂ°Ã¦ËœÅ½Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼

### 3. DRYÃ¯Â¼Ë†Ã¤Â¸ÂÃ©â€¡ÂÃ¨Â¤â€¡Ã¨â€¡ÂªÃ¥Â·Â±Ã¯Â¼â€°
- Ã¥Â°â€¡Ã¥â€¦Â±Ã§â€Â¨Ã©â€šÂÃ¨Â¼Â¯Ã¦ÂÂÃ¥Ââ€“Ã§â€šÂºÃ¥â€¡Â½Ã¥Â¼Â
- Ã¥Â»ÂºÃ§Â«â€¹Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¥â€¦Æ’Ã¤Â»Â¶
- Ã¥Å“Â¨Ã¦Â¨Â¡Ã§Âµâ€žÃ©â€“â€œÃ¥â€¦Â±Ã¤ÂºÂ«Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€¡Â½Ã¥Â¼Â
- Ã©ÂÂ¿Ã¥â€¦ÂÃ¨Â¤â€¡Ã¨Â£Â½Ã¨Â²Â¼Ã¤Â¸Å Ã§Â¨â€¹Ã¥Â¼ÂÃ¨Â¨Â­Ã¨Â¨Ë†

### 4. YAGNIÃ¯Â¼Ë†Ã¤Â½Â Ã¤Â¸ÂÃ¦Å“Æ’Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â®Æ’Ã¯Â¼â€°
- Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ¥Â»ÂºÃ§Â½Â®Ã¥Å Å¸Ã¨Æ’Â½
- Ã©ÂÂ¿Ã¥â€¦ÂÃ¦Å½Â¨Ã¦Â¸Â¬Ã¦â‚¬Â§Ã§Å¡â€žÃ©â‚¬Å¡Ã§â€Â¨Ã¥Å’â€“
- Ã¥ÂÂªÃ¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â„¢â€šÃ¥Â¢Å¾Ã¥Å Â Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥ÂºÂ¦
- Ã¥Â¾Å¾Ã§Â°Â¡Ã¥â€“Â®Ã©â€“â€¹Ã¥Â§â€¹Ã¯Â¼Å’Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â„¢â€šÃ¥â€ ÂÃ©â€¡ÂÃ¦Â§â€¹

## TypeScript/JavaScript Ã¦Â¨â„¢Ã¦Âºâ€“

### Ã¨Â®Å Ã¦â€¢Â¸Ã¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¥ÂÂÃ§Â¨Â±
const marketSearchQuery = 'election'
const isUserAuthenticated = true
const totalRevenue = 1000

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â¸ÂÃ¦Â¸â€¦Ã¦Â¥Å¡Ã§Å¡â€žÃ¥ÂÂÃ§Â¨Â±
const q = 'election'
const flag = true
const x = 1000
```

### Ã¥â€¡Â½Ã¥Â¼ÂÃ¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥â€¹â€¢Ã¨Â©Å¾-Ã¥ÂÂÃ¨Â©Å¾Ã¦Â¨Â¡Ã¥Â¼Â
async function fetchMarketData(marketId: string) { }
function calculateSimilarity(a: number[], b: number[]) { }
function isValidEmail(email: string): boolean { }

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â¸ÂÃ¦Â¸â€¦Ã¦Â¥Å¡Ã¦Ë†â€“Ã¥ÂÂªÃ¦Å“â€°Ã¥ÂÂÃ¨Â©Å¾
async function market(id: string) { }
function similarity(a, b) { }
function email(e) { }
```

### Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¦â‚¬Â§Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã©â€”Å“Ã©ÂÂµÃ¯Â¼â€°

```typescript
// PASS: Ã§Â¸Â½Ã¦ËœÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã©â€“â€¹Ã©Ââ€¹Ã§Â®â€”Ã§Â¬Â¦
const updatedUser = {
  ...user,
  name: 'New Name'
}

const updatedArray = [...items, newItem]

// FAIL: Ã¦Â°Â¸Ã©ÂÂ Ã¤Â¸ÂÃ¨Â¦ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¤Â¿Â®Ã¦â€Â¹
user.name = 'New Name'  // Ã¤Â¸ÂÃ¨â€°Â¯
items.push(newItem)     // Ã¤Â¸ÂÃ¨â€°Â¯
```

### Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
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

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã§â€žÂ¡Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
async function fetchData(url) {
  const response = await fetch(url)
  return response.json()
}
```

### Async/Await Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â„¢â€šÃ¤Â¸Â¦Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’
const [users, markets, stats] = await Promise.all([
  fetchUsers(),
  fetchMarkets(),
  fetchStats()
])

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ©Â â€ Ã¥ÂºÂÃ¥Å¸Â·Ã¨Â¡Å’
const users = await fetchUsers()
const markets = await fetchMarkets()
const stats = await fetchStats()
```

### Ã¥Å¾â€¹Ã¥Ë†Â¥Ã¥Â®â€°Ã¥â€¦Â¨

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦Â­Â£Ã§Â¢ÂºÃ§Å¡â€žÃ¥Å¾â€¹Ã¥Ë†Â¥
interface Market {
  id: string
  name: string
  status: 'active' | 'resolved' | 'closed'
  created_at: Date
}

function getMarket(id: string): Promise<Market> {
  // Ã¥Â¯Â¦Ã¤Â½Å“
}

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ 'any'
function getMarket(id: any): Promise<any> {
  // Ã¥Â¯Â¦Ã¤Â½Å“
}
```

## React Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

### Ã¥â€¦Æ’Ã¤Â»Â¶Ã§ÂµÂÃ¦Â§â€¹

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥â€¦Â·Ã¦Å“â€°Ã¥Å¾â€¹Ã¥Ë†Â¥Ã§Å¡â€žÃ¥â€¡Â½Ã¥Â¼ÂÃ¥â€¦Æ’Ã¤Â»Â¶
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

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã§â€žÂ¡Ã¥Å¾â€¹Ã¥Ë†Â¥Ã£â‚¬ÂÃ§ÂµÂÃ¦Â§â€¹Ã¤Â¸ÂÃ¦Â¸â€¦Ã¦Â¥Å¡
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

### Ã¨â€¡ÂªÃ¨Â¨â€š Hooks

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨â€¡ÂªÃ¨Â¨â€š hook
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

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
const debouncedQuery = useDebounce(searchQuery, 500)
```

### Ã§â€¹â‚¬Ã¦â€¦â€¹Ã§Â®Â¡Ã§Ââ€ 

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦Â­Â£Ã§Â¢ÂºÃ§Å¡â€žÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¦â€ºÂ´Ã¦â€“Â°
const [count, setCount] = useState(0)

// Ã¥Å¸ÂºÃ¦â€“Â¼Ã¥â€¦Ë†Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã§Å¡â€žÃ¥â€¡Â½Ã¥Â¼ÂÃ¦â€ºÂ´Ã¦â€“Â°
setCount(prev => prev + 1)

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¼â€¢Ã§â€Â¨Ã§â€¹â‚¬Ã¦â€¦â€¹
setCount(count + 1)  // Ã¥Å“Â¨Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Â­Â¥Ã¦Æ’â€¦Ã¥Â¢Æ’Ã¤Â¸Â­Ã¥ÂÂ¯Ã¨Æ’Â½Ã©ÂÅ½Ã¦â„¢â€š
```

### Ã¦Â¢ÂÃ¤Â»Â¶Ã¦Â¸Â²Ã¦Å¸â€œ

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ¦Â¢ÂÃ¤Â»Â¶Ã¦Â¸Â²Ã¦Å¸â€œ
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â¸â€°Ã¥â€¦Æ’Ã¥Å“Â°Ã§Ââ€ž
{isLoading ? <Spinner /> : error ? <ErrorMessage error={error} /> : data ? <DataDisplay data={data} /> : null}
```

## API Ã¨Â¨Â­Ã¨Â¨Ë†Ã¦Â¨â„¢Ã¦Âºâ€“

### REST API Ã¦â€¦Â£Ã¤Â¾â€¹

```
GET    /api/markets              # Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Â¸â€šÃ¥Â Â´
GET    /api/markets/:id          # Ã¥Ââ€“Ã¥Â¾â€”Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â¸â€šÃ¥Â Â´
POST   /api/markets              # Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã¥Â¸â€šÃ¥Â Â´
PUT    /api/markets/:id          # Ã¦â€ºÂ´Ã¦â€“Â°Ã¥Â¸â€šÃ¥Â Â´Ã¯Â¼Ë†Ã¥Â®Å’Ã¦â€¢Â´Ã¯Â¼â€°
PATCH  /api/markets/:id          # Ã¦â€ºÂ´Ã¦â€“Â°Ã¥Â¸â€šÃ¥Â Â´Ã¯Â¼Ë†Ã©Æ’Â¨Ã¥Ë†â€ Ã¯Â¼â€°
DELETE /api/markets/:id          # Ã¥Ë†ÂªÃ©â„¢Â¤Ã¥Â¸â€šÃ¥Â Â´

# Ã©ÂÅ½Ã¦Â¿Â¾Ã§â€Â¨Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥ÂÆ’Ã¦â€¢Â¸
GET /api/markets?status=active&limit=10&offset=0
```

### Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¦Â Â¼Ã¥Â¼Â

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¥â€ºÅ¾Ã¦â€¡â€°Ã§ÂµÂÃ¦Â§â€¹
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

// Ã¦Ë†ÂÃ¥Å Å¸Ã¥â€ºÅ¾Ã¦â€¡â€°
return NextResponse.json({
  success: true,
  data: markets,
  meta: { total: 100, page: 1, limit: 10 }
})

// Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥â€ºÅ¾Ã¦â€¡â€°
return NextResponse.json({
  success: false,
  error: 'Invalid request'
}, { status: 400 })
```

### Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°

```typescript
import { z } from 'zod'

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Schema Ã©Â©â€”Ã¨Â­â€°
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
    // Ã¤Â½Â¿Ã§â€Â¨Ã©Â©â€”Ã¨Â­â€°Ã©ÂÅ½Ã§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢Ã§Â¹Â¼Ã§ÂºÅ’Ã¨â„¢â€¢Ã§Ââ€ 
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

## Ã¦Âªâ€Ã¦Â¡Ë†Ã§Âµâ€žÃ§Â¹â€

### Ã¥Â°Ë†Ã¦Â¡Ë†Ã§ÂµÂÃ¦Â§â€¹

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/                    # Next.js App Router
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/               # API Ã¨Â·Â¯Ã§â€Â±
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ markets/           # Ã¥Â¸â€šÃ¥Â Â´Ã©Â ÂÃ©ÂÂ¢
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ (auth)/           # Ã¨ÂªÂÃ¨Â­â€°Ã©Â ÂÃ©ÂÂ¢Ã¯Â¼Ë†Ã¨Â·Â¯Ã§â€Â±Ã§Â¾Â¤Ã§Âµâ€žÃ¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/            # React Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ui/               # Ã©â‚¬Å¡Ã§â€Â¨ UI Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ forms/            # Ã¨Â¡Â¨Ã¥â€“Â®Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ layouts/          # Ã§â€°Ë†Ã©ÂÂ¢Ã©â€¦ÂÃ§Â½Â®Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/                # Ã¨â€¡ÂªÃ¨Â¨â€š React hooks
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib/                  # Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€™Å’Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/             # API Ã¥Â®Â¢Ã¦Ë†Â¶Ã§Â«Â¯
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/           # Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼Â
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ constants/       # Ã¥Â¸Â¸Ã¦â€¢Â¸
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ types/                # TypeScript Ã¥Å¾â€¹Ã¥Ë†Â¥
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ styles/              # Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¦Â¨Â£Ã¥Â¼Â
```

### Ã¦Âªâ€Ã¦Â¡Ë†Ã¥â€˜Â½Ã¥ÂÂ

```
components/Button.tsx          # Ã¥â€¦Æ’Ã¤Â»Â¶Ã§â€Â¨ PascalCase
hooks/useAuth.ts              # hooks Ã§â€Â¨ camelCase Ã¥Å Â  'use' Ã¥â€°ÂÃ§Â¶Â´
lib/formatDate.ts             # Ã¥Â·Â¥Ã¥â€¦Â·Ã§â€Â¨ camelCase
types/market.types.ts         # Ã¥Å¾â€¹Ã¥Ë†Â¥Ã§â€Â¨ camelCase Ã¥Å Â  .types Ã¥Â¾Å’Ã§Â¶Â´
```

## Ã¨Â¨Â»Ã¨Â§Â£Ã¨Ë†â€¡Ã¦â€“â€¡Ã¤Â»Â¶

### Ã¤Â½â€¢Ã¦â„¢â€šÃ¨Â¨Â»Ã¨Â§Â£

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¨Â§Â£Ã©â€¡â€¹Ã£â‚¬Å’Ã§â€šÂºÃ¤Â»â‚¬Ã©ÂºÂ¼Ã£â‚¬ÂÃ¨â‚¬Å’Ã©ÂÅ¾Ã£â‚¬Å’Ã¤Â»â‚¬Ã©ÂºÂ¼Ã£â‚¬Â
// Ã¤Â½Â¿Ã§â€Â¨Ã¦Å’â€¡Ã¦â€¢Â¸Ã©â‚¬â‚¬Ã©ÂÂ¿Ã¤Â»Â¥Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦Å“ÂÃ¥â€¹â„¢Ã¤Â¸Â­Ã¦â€“Â·Ã¦â„¢â€šÃ¥Â£â€œÃ¥Å¾Â® API
const delay = Math.min(1000 * Math.pow(2, retryCount), 30000)

// Ã§â€šÂºÃ¤Âºâ€ Ã¨â„¢â€¢Ã§Ââ€ Ã¥Â¤Â§Ã©â„¢Â£Ã¥Ë†â€”Ã§Å¡â€žÃ¦â€¢Ë†Ã¨Æ’Â½Ã¯Â¼Å’Ã¦Â­Â¤Ã¨â„¢â€¢Ã¥Ë†Â»Ã¦â€žÂÃ¤Â½Â¿Ã§â€Â¨Ã§ÂªÂÃ¨Â®Å 
items.push(newItem)

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã©â„¢Â³Ã¨Â¿Â°Ã©Â¡Â¯Ã¨â‚¬Å’Ã¦Ëœâ€œÃ¨Â¦â€¹Ã§Å¡â€žÃ¤Âºâ€¹Ã¥Â¯Â¦
// Ã¥Â°â€¡Ã¨Â¨Ë†Ã¦â€¢Â¸Ã¥â„¢Â¨Ã¥Å Â  1
count++

// Ã¥Â°â€¡Ã¥ÂÂÃ§Â¨Â±Ã¨Â¨Â­Ã§â€šÂºÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã§Å¡â€žÃ¥ÂÂÃ§Â¨Â±
name = user.name
```

### Ã¥â€¦Â¬Ã©â€“â€¹ API Ã§Å¡â€ž JSDoc

```typescript
/**
 * Ã¤Â½Â¿Ã§â€Â¨Ã¨ÂªÅ¾Ã¦â€žÂÃ§â€ºÂ¸Ã¤Â¼Â¼Ã¥ÂºÂ¦Ã¦ÂÅ“Ã¥Â°â€¹Ã¥Â¸â€šÃ¥Â Â´Ã£â‚¬â€š
 *
 * @param query - Ã¨â€¡ÂªÃ§â€žÂ¶Ã¨ÂªÅ¾Ã¨Â¨â‚¬Ã¦ÂÅ“Ã¥Â°â€¹Ã¦Å¸Â¥Ã¨Â©Â¢
 * @param limit - Ã¦Å“â‚¬Ã¥Â¤Â§Ã§ÂµÂÃ¦Å¾Å“Ã¦â€¢Â¸Ã©â€¡ÂÃ¯Â¼Ë†Ã©Â ÂÃ¨Â¨Â­Ã¯Â¼Å¡10Ã¯Â¼â€°
 * @returns Ã¦Å’â€°Ã§â€ºÂ¸Ã¤Â¼Â¼Ã¥ÂºÂ¦Ã¥Ë†â€ Ã¦â€¢Â¸Ã¦Å½â€™Ã¥ÂºÂÃ§Å¡â€žÃ¥Â¸â€šÃ¥Â Â´Ã©â„¢Â£Ã¥Ë†â€”
 * @throws {Error} Ã¥Â¦â€šÃ¦Å¾Å“ OpenAI API Ã¥Â¤Â±Ã¦â€¢â€”Ã¦Ë†â€“ Redis Ã¤Â¸ÂÃ¥ÂÂ¯Ã§â€Â¨
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
  // Ã¥Â¯Â¦Ã¤Â½Å“
}
```

## Ã¦â€¢Ë†Ã¨Æ’Â½Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

### Ã¨Â¨ËœÃ¦â€ Â¶Ã¥Å’â€“

```typescript
import { useMemo, useCallback } from 'react'

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¨Â¨ËœÃ¦â€ Â¶Ã¥Å’â€“Ã¦Ëœâ€šÃ¨Â²Â´Ã§Å¡â€žÃ¨Â¨Ë†Ã§Â®â€”
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¨Â¨ËœÃ¦â€ Â¶Ã¥Å’â€“Ã¥â€ºÅ¾Ã¥â€˜Â¼Ã¥â€¡Â½Ã¥Â¼Â
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])
```

### Ã¥Â»Â¶Ã©ÂÂ²Ã¨Â¼â€°Ã¥â€¦Â¥

```typescript
import { lazy, Suspense } from 'react'

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â»Â¶Ã©ÂÂ²Ã¨Â¼â€°Ã¥â€¦Â¥Ã©â€¡ÂÃ¥Å¾â€¹Ã¥â€¦Æ’Ã¤Â»Â¶
const HeavyChart = lazy(() => import('./HeavyChart'))

export function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦Å¸Â¥Ã¨Â©Â¢

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥ÂÂªÃ©ÂÂ¸Ã¦â€œâ€¡Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å¡â€žÃ¦Â¬â€žÃ¤Â½Â
const { data } = await supabase
  .from('markets')
  .select('id, name, status')
  .limit(10)

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã©ÂÂ¸Ã¦â€œâ€¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¬â€žÃ¤Â½Â
const { data } = await supabase
  .from('markets')
  .select('*')
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨â„¢Ã¦Âºâ€“

### Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦Â§â€¹Ã¯Â¼Ë†AAA Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°

```typescript
test('calculates similarity correctly', () => {
  // ArrangeÃ¯Â¼Ë†Ã¦Âºâ€“Ã¥â€šâ„¢Ã¯Â¼â€°
  const vector1 = [1, 0, 0]
  const vector2 = [0, 1, 0]

  // ActÃ¯Â¼Ë†Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼â€°
  const similarity = calculateCosineSimilarity(vector1, vector2)

  // AssertÃ¯Â¼Ë†Ã¦â€“Â·Ã¨Â¨â‚¬Ã¯Â¼â€°
  expect(similarity).toBe(0)
})
```

### Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€˜Â½Ã¥ÂÂ

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥ÂÂÃ§Â¨Â±
test('returns empty array when no markets match query', () => { })
test('throws error when OpenAI API key is missing', () => { })
test('falls back to substring search when Redis unavailable', () => { })

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¦Â¨Â¡Ã§Â³Å Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¥ÂÂÃ§Â¨Â±
test('works', () => { })
test('test search', () => { })
```

## Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§â€¢Â°Ã¥â€˜Â³Ã¥ÂÂµÃ¦Â¸Â¬

Ã¦Â³Â¨Ã¦â€žÂÃ©â‚¬â„¢Ã¤Âºâ€ºÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡

### 1. Ã©ÂÅ½Ã©â€¢Â·Ã¥â€¡Â½Ã¥Â¼Â
```typescript
// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¥â€¡Â½Ã¥Â¼ÂÃ¨Â¶â€¦Ã©ÂÅ½ 50 Ã¨Â¡Å’
function processMarketData() {
  // 100 Ã¨Â¡Å’Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
}

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦â€¹â€ Ã¥Ë†â€ Ã§â€šÂºÃ¨Â¼Æ’Ã¥Â°ÂÃ§Å¡â€žÃ¥â€¡Â½Ã¥Â¼Â
function processMarketData() {
  const validated = validateData()
  const transformed = transformData(validated)
  return saveData(transformed)
}
```

### 2. Ã©ÂÅ½Ã¦Â·Â±Ã¥Â·Â¢Ã§â€¹â‚¬
```typescript
// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡5 Ã¥Â±Â¤Ã¤Â»Â¥Ã¤Â¸Å Ã¥Â·Â¢Ã§â€¹â‚¬
if (user) {
  if (user.isAdmin) {
    if (market) {
      if (market.isActive) {
        if (hasPermission) {
          // Ã¥ÂÅ¡Ã¦Å¸ÂÃ¤Âºâ€¹
        }
      }
    }
  }
}

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦ÂÂÃ¥â€°ÂÃ¨Â¿â€Ã¥â€ºÅ¾
if (!user) return
if (!user.isAdmin) return
if (!market) return
if (!market.isActive) return
if (!hasPermission) return

// Ã¥ÂÅ¡Ã¦Å¸ÂÃ¤Âºâ€¹
```

### 3. Ã©Â­â€Ã¨Â¡â€œÃ¦â€¢Â¸Ã¥Â­â€”
```typescript
// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã§â€žÂ¡Ã¨Â§Â£Ã©â€¡â€¹Ã§Å¡â€žÃ¦â€¢Â¸Ã¥Â­â€”
if (retryCount > 3) { }
setTimeout(callback, 500)

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥â€˜Â½Ã¥ÂÂÃ¥Â¸Â¸Ã¦â€¢Â¸
const MAX_RETRIES = 3
const DEBOUNCE_DELAY_MS = 500

if (retryCount > MAX_RETRIES) { }
setTimeout(callback, DEBOUNCE_DELAY_MS)
```

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¦ËœÂ¯Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥Ââ€Ã¥â€¢â€ Ã§Å¡â€žÃ£â‚¬â€šÃ¦Â¸â€¦Ã¦â„¢Â°Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â¶Â­Ã¨Â­Â·Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Æ’Â½Ã¥Â¯Â¦Ã§ÂÂ¾Ã¥Â¿Â«Ã©â‚¬Å¸Ã©â€“â€¹Ã§â„¢Â¼Ã¥â€™Å’Ã¨â€¡ÂªÃ¤Â¿Â¡Ã§Å¡â€žÃ©â€¡ÂÃ¦Â§â€¹Ã£â‚¬â€š
