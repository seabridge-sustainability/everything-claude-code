---
name: backend-patterns
description: Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.
---

# Ã¥Â¾Å’Ã§Â«Â¯Ã©â€“â€¹Ã§â„¢Â¼Ã¦Â¨Â¡Ã¥Â¼Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã§â€Â¨Ã¦â€“Â¼Ã¥ÂÂ¯Ã¦â€œÂ´Ã¥Â±â€¢Ã¤Â¼ÂºÃ¦Å“ÂÃ¥â„¢Â¨Ã§Â«Â¯Ã¦â€¡â€°Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Å¡â€žÃ¥Â¾Å’Ã§Â«Â¯Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã£â‚¬â€š

## API Ã¨Â¨Â­Ã¨Â¨Ë†Ã¦Â¨Â¡Ã¥Â¼Â

### RESTful API Ã§ÂµÂÃ¦Â§â€¹

```typescript
// PASS: Ã¥Å¸ÂºÃ¦â€“Â¼Ã¨Â³â€¡Ã¦ÂºÂÃ§Å¡â€ž URL
GET    /api/markets                 # Ã¥Ë†â€”Ã¥â€¡ÂºÃ¨Â³â€¡Ã¦ÂºÂ
GET    /api/markets/:id             # Ã¥Ââ€“Ã¥Â¾â€”Ã¥â€“Â®Ã¤Â¸â‚¬Ã¨Â³â€¡Ã¦ÂºÂ
POST   /api/markets                 # Ã¥Â»ÂºÃ§Â«â€¹Ã¨Â³â€¡Ã¦ÂºÂ
PUT    /api/markets/:id             # Ã¦â€ºÂ¿Ã¦Ââ€ºÃ¨Â³â€¡Ã¦ÂºÂ
PATCH  /api/markets/:id             # Ã¦â€ºÂ´Ã¦â€“Â°Ã¨Â³â€¡Ã¦ÂºÂ
DELETE /api/markets/:id             # Ã¥Ë†ÂªÃ©â„¢Â¤Ã¨Â³â€¡Ã¦ÂºÂ

// PASS: Ã§â€Â¨Ã¦â€“Â¼Ã©ÂÅ½Ã¦Â¿Â¾Ã£â‚¬ÂÃ¦Å½â€™Ã¥ÂºÂÃ£â‚¬ÂÃ¥Ë†â€ Ã©Â ÂÃ§Å¡â€žÃ¦Å¸Â¥Ã¨Â©Â¢Ã¥ÂÆ’Ã¦â€¢Â¸
GET /api/markets?status=active&sort=volume&limit=20&offset=0
```

### Repository Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
// Ã¦Å Â½Ã¨Â±Â¡Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Â­ËœÃ¥Ââ€“Ã©â€šÂÃ¨Â¼Â¯
interface MarketRepository {
  findAll(filters?: MarketFilters): Promise<Market[]>
  findById(id: string): Promise<Market | null>
  create(data: CreateMarketDto): Promise<Market>
  update(id: string, data: UpdateMarketDto): Promise<Market>
  delete(id: string): Promise<void>
}

class SupabaseMarketRepository implements MarketRepository {
  async findAll(filters?: MarketFilters): Promise<Market[]> {
    let query = supabase.from('markets').select('*')

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw new Error(error.message)
    return data
  }

  // Ã¥â€¦Â¶Ã¤Â»â€“Ã¦â€“Â¹Ã¦Â³â€¢...
}
```

### Service Ã¥Â±Â¤Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
// Ã¦Â¥Â­Ã¥â€¹â„¢Ã©â€šÂÃ¨Â¼Â¯Ã¨Ë†â€¡Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Â­ËœÃ¥Ââ€“Ã¥Ë†â€ Ã©â€ºÂ¢
class MarketService {
  constructor(private marketRepo: MarketRepository) {}

  async searchMarkets(query: string, limit: number = 10): Promise<Market[]> {
    // Ã¦Â¥Â­Ã¥â€¹â„¢Ã©â€šÂÃ¨Â¼Â¯
    const embedding = await generateEmbedding(query)
    const results = await this.vectorSearch(embedding, limit)

    // Ã¥Ââ€“Ã¥Â¾â€”Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â³â€¡Ã¦â€“â„¢
    const markets = await this.marketRepo.findByIds(results.map(r => r.id))

    // Ã¤Â¾ÂÃ§â€ºÂ¸Ã¤Â¼Â¼Ã¥ÂºÂ¦Ã¦Å½â€™Ã¥ÂºÂ
    return markets.sort((a, b) => {
      const scoreA = results.find(r => r.id === a.id)?.score || 0
      const scoreB = results.find(r => r.id === b.id)?.score || 0
      return scoreA - scoreB
    })
  }

  private async vectorSearch(embedding: number[], limit: number) {
    // Ã¥Ââ€˜Ã©â€¡ÂÃ¦ÂÅ“Ã¥Â°â€¹Ã¥Â¯Â¦Ã¤Â½Å“
  }
}
```

### Middleware Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
// Ã¨Â«â€¹Ã¦Â±â€š/Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¨â„¢â€¢Ã§Ââ€ Ã¦ÂµÂÃ¦Â°Â´Ã§Â·Å¡
export function withAuth(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const user = await verifyToken(token)
      req.user = user
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
export default withAuth(async (req, res) => {
  // Handler Ã¥ÂÂ¯Ã¥Â­ËœÃ¥Ââ€“ req.user
})
```

## Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥â€žÂªÃ¥Å’â€“

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥ÂÂªÃ©ÂÂ¸Ã¦â€œâ€¡Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å¡â€žÃ¦Â¬â€žÃ¤Â½Â
const { data } = await supabase
  .from('markets')
  .select('id, name, status, volume')
  .eq('status', 'active')
  .order('volume', { ascending: false })
  .limit(10)

// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã©ÂÂ¸Ã¦â€œâ€¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¬â€žÃ¤Â½Â
const { data } = await supabase
  .from('markets')
  .select('*')
```

### N+1 Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥â€¢ÂÃ©Â¡Å’Ã©Â ÂÃ©ËœÂ²

```typescript
// FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡N+1 Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥â€¢ÂÃ©Â¡Å’
const markets = await getMarkets()
for (const market of markets) {
  market.creator = await getUser(market.creator_id)  // N Ã¦Â¬Â¡Ã¦Å¸Â¥Ã¨Â©Â¢
}

// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¦â€°Â¹Ã¦Â¬Â¡Ã¥Ââ€“Ã¥Â¾â€”
const markets = await getMarkets()
const creatorIds = markets.map(m => m.creator_id)
const creators = await getUsers(creatorIds)  // 1 Ã¦Â¬Â¡Ã¦Å¸Â¥Ã¨Â©Â¢
const creatorMap = new Map(creators.map(c => [c.id, c]))

markets.forEach(market => {
  market.creator = creatorMap.get(market.creator_id)
})
```

### Transaction Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
async function createMarketWithPosition(
  marketData: CreateMarketDto,
  positionData: CreatePositionDto
) {
  // Ã¤Â½Â¿Ã§â€Â¨ Supabase transaction
  const { data, error } = await supabase.rpc('create_market_with_position', {
    market_data: marketData,
    position_data: positionData
  })

  if (error) throw new Error('Transaction failed')
  return data
}

// Supabase Ã¤Â¸Â­Ã§Å¡â€ž SQL Ã¥â€¡Â½Ã¥Â¼Â
CREATE OR REPLACE FUNCTION create_market_with_position(
  market_data jsonb,
  position_data jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
  -- Ã¨â€¡ÂªÃ¥â€¹â€¢Ã©â€“â€¹Ã¥Â§â€¹ transaction
  INSERT INTO markets VALUES (market_data);
  INSERT INTO positions VALUES (position_data);
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    -- Ã¨â€¡ÂªÃ¥â€¹â€¢ rollback
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
```

## Ã¥Â¿Â«Ã¥Ââ€“Ã§Â­â€“Ã§â€¢Â¥

### Redis Ã¥Â¿Â«Ã¥Ââ€“Ã¥Â±Â¤

```typescript
class CachedMarketRepository implements MarketRepository {
  constructor(
    private baseRepo: MarketRepository,
    private redis: RedisClient
  ) {}

  async findById(id: string): Promise<Market | null> {
    // Ã¥â€¦Ë†Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥Â¿Â«Ã¥Ââ€“
    const cached = await this.redis.get(`market:${id}`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Ã¥Â¿Â«Ã¥Ââ€“Ã¦Å“ÂªÃ¥â€˜Â½Ã¤Â¸Â­ - Ã¥Â¾Å¾Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¥Ââ€“Ã¥Â¾â€”
    const market = await this.baseRepo.findById(id)

    if (market) {
      // Ã¥Â¿Â«Ã¥Ââ€“ 5 Ã¥Ë†â€ Ã©ÂËœ
      await this.redis.setex(`market:${id}`, 300, JSON.stringify(market))
    }

    return market
  }

  async invalidateCache(id: string): Promise<void> {
    await this.redis.del(`market:${id}`)
  }
}
```

### Cache-Aside Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
async function getMarketWithCache(id: string): Promise<Market> {
  const cacheKey = `market:${id}`

  // Ã¥Ëœâ€”Ã¨Â©Â¦Ã¥Â¿Â«Ã¥Ââ€“
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // Ã¥Â¿Â«Ã¥Ââ€“Ã¦Å“ÂªÃ¥â€˜Â½Ã¤Â¸Â­ - Ã¥Â¾Å¾Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¥Ââ€“Ã¥Â¾â€”
  const market = await db.markets.findUnique({ where: { id } })

  if (!market) throw new Error('Market not found')

  // Ã¦â€ºÂ´Ã¦â€“Â°Ã¥Â¿Â«Ã¥Ââ€“
  await redis.setex(cacheKey, 300, JSON.stringify(market))

  return market
}
```

## Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ Ã¦Â¨Â¡Ã¥Â¼Â

### Ã©â€ºâ€ Ã¤Â¸Â­Ã¥Â¼ÂÃ©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ Ã¥â„¢Â¨

```typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export function errorHandler(error: unknown, req: Request): Response {
  if (error instanceof ApiError) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: error.statusCode })
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json({
      success: false,
      error: 'Validation failed',
      details: error.errors
    }, { status: 400 })
  }

  // Ã¨Â¨ËœÃ©Å’â€žÃ©ÂÅ¾Ã©Â ÂÃ¦Å“Å¸Ã©Å’Â¯Ã¨ÂªÂ¤
  console.error('Unexpected error:', error)

  return NextResponse.json({
    success: false,
    error: 'Internal server error'
  }, { status: 500 })
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
export async function GET(request: Request) {
  try {
    const data = await fetchData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return errorHandler(error, request)
  }
}
```

### Ã¦Å’â€¡Ã¦â€¢Â¸Ã©â‚¬â‚¬Ã©ÂÂ¿Ã©â€¡ÂÃ¨Â©Â¦

```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (i < maxRetries - 1) {
        // Ã¦Å’â€¡Ã¦â€¢Â¸Ã©â‚¬â‚¬Ã©ÂÂ¿Ã¯Â¼Å¡1s, 2s, 4s
        const delay = Math.pow(2, i) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError!
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
const data = await fetchWithRetry(() => fetchFromAPI())
```

## Ã¨ÂªÂÃ¨Â­â€°Ã¨Ë†â€¡Ã¦Å½Ë†Ã¦Â¬Å 

### JWT Token Ã©Â©â€”Ã¨Â­â€°

```typescript
import jwt from 'jsonwebtoken'

interface JWTPayload {
  userId: string
  email: string
  role: 'admin' | 'user'
}

export function verifyToken(token: string): JWTPayload {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    return payload
  } catch (error) {
    throw new ApiError(401, 'Invalid token')
  }
}

export async function requireAuth(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new ApiError(401, 'Missing authorization token')
  }

  return verifyToken(token)
}

// Ã¥Å“Â¨ API Ã¨Â·Â¯Ã§â€Â±Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨
export async function GET(request: Request) {
  const user = await requireAuth(request)

  const data = await getDataForUser(user.userId)

  return NextResponse.json({ success: true, data })
}
```

### Ã¥Å¸ÂºÃ¦â€“Â¼Ã¨Â§â€™Ã¨â€°Â²Ã§Å¡â€žÃ¥Â­ËœÃ¥Ââ€“Ã¦Å½Â§Ã¥Ë†Â¶

```typescript
type Permission = 'read' | 'write' | 'delete' | 'admin'

interface User {
  id: string
  role: 'admin' | 'moderator' | 'user'
}

const rolePermissions: Record<User['role'], Permission[]> = {
  admin: ['read', 'write', 'delete', 'admin'],
  moderator: ['read', 'write', 'delete'],
  user: ['read', 'write']
}

export function hasPermission(user: User, permission: Permission): boolean {
  return rolePermissions[user.role].includes(permission)
}

export function requirePermission(permission: Permission) {
  return (handler: (request: Request, user: User) => Promise<Response>) => {
    return async (request: Request) => {
      const user = await requireAuth(request)

      if (!hasPermission(user, permission)) {
        throw new ApiError(403, 'Insufficient permissions')
      }

      return handler(request, user)
    }
  }
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â - HOF Ã¥Å’â€¦Ã¨Â£Â handler
export const DELETE = requirePermission('delete')(
  async (request: Request, user: User) => {
    // Handler Ã¦Å½Â¥Ã¦â€Â¶Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã¤Â¸â€Ã¥â€¦Â·Ã¦Å“â€°Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã¦Â¬Å Ã©â„¢ÂÃ§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦
    return new Response('Deleted', { status: 200 })
  }
)
```

## Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶

### Ã§Â°Â¡Ã¥â€“Â®Ã§Å¡â€žÃ¨Â¨ËœÃ¦â€ Â¶Ã©Â«â€Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¥â„¢Â¨

```typescript
class RateLimiter {
  private requests = new Map<string, number[]>()

  async checkLimit(
    identifier: string,
    maxRequests: number,
    windowMs: number
  ): Promise<boolean> {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []

    // Ã§Â§Â»Ã©â„¢Â¤Ã¨Â¦â€“Ã§Âªâ€”Ã¥Â¤â€“Ã§Å¡â€žÃ¨Ë†Å Ã¨Â«â€¹Ã¦Â±â€š
    const recentRequests = requests.filter(time => now - time < windowMs)

    if (recentRequests.length >= maxRequests) {
      return false  // Ã¨Â¶â€¦Ã©ÂÅ½Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
    }

    // Ã¦â€“Â°Ã¥Â¢Å¾Ã§â€¢Â¶Ã¥â€°ÂÃ¨Â«â€¹Ã¦Â±â€š
    recentRequests.push(now)
    this.requests.set(identifier, recentRequests)

    return true
  }
}

const limiter = new RateLimiter()

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  const allowed = await limiter.checkLimit(ip, 100, 60000)  // 100 Ã¨Â«â€¹Ã¦Â±â€š/Ã¥Ë†â€ Ã©ÂËœ

  if (!allowed) {
    return NextResponse.json({
      error: 'Rate limit exceeded'
    }, { status: 429 })
  }

  // Ã§Â¹Â¼Ã§ÂºÅ’Ã¨â„¢â€¢Ã§Ââ€ Ã¨Â«â€¹Ã¦Â±â€š
}
```

## Ã¨Æ’Å’Ã¦â„¢Â¯Ã¤Â»Â»Ã¥â€¹â„¢Ã¨Ë†â€¡Ã¤Â½â€¡Ã¥Ë†â€”

### Ã§Â°Â¡Ã¥â€“Â®Ã¤Â½â€¡Ã¥Ë†â€”Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
class JobQueue<T> {
  private queue: T[] = []
  private processing = false

  async add(job: T): Promise<void> {
    this.queue.push(job)

    if (!this.processing) {
      this.process()
    }
  }

  private async process(): Promise<void> {
    this.processing = true

    while (this.queue.length > 0) {
      const job = this.queue.shift()!

      try {
        await this.execute(job)
      } catch (error) {
        console.error('Job failed:', error)
      }
    }

    this.processing = false
  }

  private async execute(job: T): Promise<void> {
    // Ã¤Â»Â»Ã¥â€¹â„¢Ã¥Å¸Â·Ã¨Â¡Å’Ã©â€šÂÃ¨Â¼Â¯
  }
}

// Ã§â€Â¨Ã¦â€“Â¼Ã§Â´Â¢Ã¥Â¼â€¢Ã¥Â¸â€šÃ¥Â Â´Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã§Â¯â€žÃ¤Â¾â€¹
interface IndexJob {
  marketId: string
}

const indexQueue = new JobQueue<IndexJob>()

export async function POST(request: Request) {
  const { marketId } = await request.json()

  // Ã¥Å Â Ã¥â€¦Â¥Ã¤Â½â€¡Ã¥Ë†â€”Ã¨â‚¬Å’Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾
  await indexQueue.add({ marketId })

  return NextResponse.json({ success: true, message: 'Job queued' })
}
```

## Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Ë†â€¡Ã§â€ºÂ£Ã¦Å½Â§

### Ã§ÂµÂÃ¦Â§â€¹Ã¥Å’â€“Ã¦â€”Â¥Ã¨ÂªÅ’

```typescript
interface LogContext {
  userId?: string
  requestId?: string
  method?: string
  path?: string
  [key: string]: unknown
}

class Logger {
  log(level: 'info' | 'warn' | 'error', message: string, context?: LogContext) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context
    }

    console.log(JSON.stringify(entry))
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context)
  }

  error(message: string, error: Error, context?: LogContext) {
    this.log('error', message, {
      ...context,
      error: error.message,
      stack: error.stack
    })
  }
}

const logger = new Logger()

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
export async function GET(request: Request) {
  const requestId = crypto.randomUUID()

  logger.info('Fetching markets', {
    requestId,
    method: 'GET',
    path: '/api/markets'
  })

  try {
    const markets = await fetchMarkets()
    return NextResponse.json({ success: true, data: markets })
  } catch (error) {
    logger.error('Failed to fetch markets', error as Error, { requestId })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã¥Â¾Å’Ã§Â«Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Æ’Â½Ã¥Â¯Â¦Ã§ÂÂ¾Ã¥ÂÂ¯Ã¦â€œÂ´Ã¥Â±â€¢Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â¶Â­Ã¨Â­Â·Ã§Å¡â€žÃ¤Â¼ÂºÃ¦Å“ÂÃ¥â„¢Â¨Ã§Â«Â¯Ã¦â€¡â€°Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ£â‚¬â€šÃ©ÂÂ¸Ã¦â€œâ€¡Ã§Â¬Â¦Ã¥ÂË†Ã¤Â½Â Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥ÂºÂ¦Ã§Â­â€°Ã§Â´Å¡Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
