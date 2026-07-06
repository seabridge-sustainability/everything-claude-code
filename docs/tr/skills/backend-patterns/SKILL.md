---
name: backend-patterns
description: Node.js, Express ve Next.js API routes iÃƒÂ§in backend mimari kalÃ„Â±plarÃ„Â±, API tasarÃ„Â±mÃ„Â±, veritabanÃ„Â± optimizasyonu ve sunucu tarafÃ„Â± en iyi uygulamalar.
origin: ECC
---

# Backend GeliÃ…Å¸tirme KalÃ„Â±plarÃ„Â±

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


Ãƒâ€“lÃƒÂ§eklenebilir sunucu tarafÃ„Â± uygulamalar iÃƒÂ§in backend mimari kalÃ„Â±plarÃ„Â± ve en iyi uygulamalar.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- REST veya GraphQL API endpoint'leri tasarlarken
- Repository, service veya controller katmanlarÃ„Â± uygularken
- VeritabanÃ„Â± sorgularÃ„Â±nÃ„Â± optimize ederken (N+1, indeksleme, baÃ„Å¸lantÃ„Â± havuzu)
- Ãƒâ€“nbellekleme eklerken (Redis, in-memory, HTTP cache baÃ…Å¸lÃ„Â±klarÃ„Â±)
- Arka plan iÃ…Å¸leri veya async iÃ…Å¸leme ayarlarken
- API'ler iÃƒÂ§in hata yÃƒÂ¶netimi ve doÃ„Å¸rulama yapÃ„Â±landÃ„Â±rÃ„Â±rken
- Middleware oluÃ…Å¸tururken (auth, logging, rate limiting)

## API TasarÃ„Â±m KalÃ„Â±plarÃ„Â±

### RESTful API YapÃ„Â±sÃ„Â±

```typescript
// PASS: Kaynak tabanlÃ„Â± URL'ler
GET    /api/markets                 # KaynaklarÃ„Â± listele
GET    /api/markets/:id             # Tek kaynak getir
POST   /api/markets                 # Kaynak oluÃ…Å¸tur
PUT    /api/markets/:id             # KaynaÃ„Å¸Ã„Â± deÃ„Å¸iÃ…Å¸tir (tam)
PATCH  /api/markets/:id             # KaynaÃ„Å¸Ã„Â± gÃƒÂ¼ncelle (kÃ„Â±smi)
DELETE /api/markets/:id             # KaynaÃ„Å¸Ã„Â± sil

// PASS: Filtreleme, sÃ„Â±ralama, sayfalama iÃƒÂ§in query parametreleri
GET /api/markets?status=active&sort=volume&limit=20&offset=0
```

### Repository KalÃ„Â±bÃ„Â±

```typescript
// Veri eriÃ…Å¸im mantÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± soyutla
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

  // DiÃ„Å¸er metodlar...
}
```

### Service KatmanÃ„Â± KalÃ„Â±bÃ„Â±

```typescript
// Ã„Â°Ã…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± veri eriÃ…Å¸iminden ayrÃ„Â±lmÃ„Â±Ã…Å¸
class MarketService {
  constructor(private marketRepo: MarketRepository) {}

  async searchMarkets(query: string, limit: number = 10): Promise<Market[]> {
    // Ã„Â°Ã…Å¸ mantÃ„Â±Ã„Å¸Ã„Â±
    const embedding = await generateEmbedding(query)
    const results = await this.vectorSearch(embedding, limit)

    // Tam veriyi getir
    const markets = await this.marketRepo.findByIds(results.map(r => r.id))

    // BenzerliÃ„Å¸e gÃƒÂ¶re sÃ„Â±rala
    return markets.sort((a, b) => {
      const scoreA = results.find(r => r.id === a.id)?.score || 0
      const scoreB = results.find(r => r.id === b.id)?.score || 0
      return scoreA - scoreB
    })
  }

  private async vectorSearch(embedding: number[], limit: number) {
    // Vector arama implementasyonu
  }
}
```

### Middleware KalÃ„Â±bÃ„Â±

```typescript
// Request/response iÃ…Å¸leme hattÃ„Â±
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

// KullanÃ„Â±m
export default withAuth(async (req, res) => {
  // Handler req.user'a eriÃ…Å¸ebilir
})
```

## VeritabanÃ„Â± KalÃ„Â±plarÃ„Â±

### Sorgu Optimizasyonu

```typescript
// PASS: Ã„Â°YÃ„Â°: Sadece gerekli sÃƒÂ¼tunlarÃ„Â± seÃƒÂ§
const { data } = await supabase
  .from('markets')
  .select('id, name, status, volume')
  .eq('status', 'active')
  .order('volume', { ascending: false })
  .limit(10)

// FAIL: KÃƒâ€“TÃƒÅ“: Her Ã…Å¸eyi seÃƒÂ§
const { data } = await supabase
  .from('markets')
  .select('*')
```

### N+1 Sorgu Ãƒâ€“nleme

```typescript
// FAIL: KÃƒâ€“TÃƒÅ“: N+1 sorgu problemi
const markets = await getMarkets()
for (const market of markets) {
  market.creator = await getUser(market.creator_id)  // N sorgu
}

// PASS: Ã„Â°YÃ„Â°: Toplu getirme
const markets = await getMarkets()
const creatorIds = markets.map(m => m.creator_id)
const creators = await getUsers(creatorIds)  // 1 sorgu
const creatorMap = new Map(creators.map(c => [c.id, c]))

markets.forEach(market => {
  market.creator = creatorMap.get(market.creator_id)
})
```

### Transaction KalÃ„Â±bÃ„Â±

```typescript
async function createMarketWithPosition(
  marketData: CreateMarketDto,
  positionData: CreatePositionDto
) {
  // Supabase transaction kullan
  const { data, error } = await supabase.rpc('create_market_with_position', {
    market_data: marketData,
    position_data: positionData
  })

  if (error) throw new Error('Transaction failed')
  return data
}

// Supabase'de SQL fonksiyonu
CREATE OR REPLACE FUNCTION create_market_with_position(
  market_data jsonb,
  position_data jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
  -- Transaction otomatik baÃ…Å¸lar
  INSERT INTO markets VALUES (market_data);
  INSERT INTO positions VALUES (position_data);
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    -- Rollback otomatik olur
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
```

## Ãƒâ€“nbellekleme Stratejileri

### Redis Ãƒâ€“nbellekleme KatmanÃ„Â±

```typescript
class CachedMarketRepository implements MarketRepository {
  constructor(
    private baseRepo: MarketRepository,
    private redis: RedisClient
  ) {}

  async findById(id: string): Promise<Market | null> {
    // Ãƒâ€“nce ÃƒÂ¶nbelleÃ„Å¸i kontrol et
    const cached = await this.redis.get(`market:${id}`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Cache miss - veritabanÃ„Â±ndan getir
    const market = await this.baseRepo.findById(id)

    if (market) {
      // 5 dakika ÃƒÂ¶nbellekle
      await this.redis.setex(`market:${id}`, 300, JSON.stringify(market))
    }

    return market
  }

  async invalidateCache(id: string): Promise<void> {
    await this.redis.del(`market:${id}`)
  }
}
```

### Cache-Aside KalÃ„Â±bÃ„Â±

```typescript
async function getMarketWithCache(id: string): Promise<Market> {
  const cacheKey = `market:${id}`

  // Ãƒâ€“nbelleÃ„Å¸i dene
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // Cache miss - DB'den getir
  const market = await db.markets.findUnique({ where: { id } })

  if (!market) throw new Error('Market not found')

  // Ãƒâ€“nbelleÃ„Å¸i gÃƒÂ¼ncelle
  await redis.setex(cacheKey, 300, JSON.stringify(market))

  return market
}
```

## Hata YÃƒÂ¶netimi KalÃ„Â±plarÃ„Â±

### Merkezi Hata YÃƒÂ¶neticisi

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

  // Beklenmeyen hatalarÃ„Â± logla
  console.error('Unexpected error:', error)

  return NextResponse.json({
    success: false,
    error: 'Internal server error'
  }, { status: 500 })
}

// KullanÃ„Â±m
export async function GET(request: Request) {
  try {
    const data = await fetchData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return errorHandler(error, request)
  }
}
```

### Exponential Backoff ile Tekrar Deneme

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
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, i) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError!
}

// KullanÃ„Â±m
const data = await fetchWithRetry(() => fetchFromAPI())
```

## Kimlik DoÃ„Å¸rulama ve Yetkilendirme

### JWT Token DoÃ„Å¸rulama

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

// API route'unda kullanÃ„Â±m
export async function GET(request: Request) {
  const user = await requireAuth(request)

  const data = await getDataForUser(user.userId)

  return NextResponse.json({ success: true, data })
}
```

### Rol TabanlÃ„Â± EriÃ…Å¸im KontrolÃƒÂ¼

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

// KullanÃ„Â±m - HOF handler'Ã„Â± sarar
export const DELETE = requirePermission('delete')(
  async (request: Request, user: User) => {
    // Handler doÃ„Å¸rulanmÃ„Â±Ã…Å¸ yetki ile kullanÃ„Â±cÃ„Â± alÃ„Â±r
    return new Response('Deleted', { status: 200 })
  }
)
```

## Rate Limiting

### Basit In-Memory Rate Limiter

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

    // Pencere dÃ„Â±Ã…Å¸Ã„Â±ndaki eski istekleri kaldÃ„Â±r
    const recentRequests = requests.filter(time => now - time < windowMs)

    if (recentRequests.length >= maxRequests) {
      return false  // Rate limit aÃ…Å¸Ã„Â±ldÃ„Â±
    }

    // Mevcut isteÃ„Å¸i ekle
    recentRequests.push(now)
    this.requests.set(identifier, recentRequests)

    return true
  }
}

const limiter = new RateLimiter()

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  const allowed = await limiter.checkLimit(ip, 100, 60000)  // 100 req/dak

  if (!allowed) {
    return NextResponse.json({
      error: 'Rate limit exceeded'
    }, { status: 429 })
  }

  // Ã„Â°stekle devam et
}
```

## Arka Plan Ã„Â°Ã…Å¸leri ve Kuyruklar

### Basit Kuyruk KalÃ„Â±bÃ„Â±

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
    // Ã„Â°Ã…Å¸ yÃƒÂ¼rÃƒÂ¼tme mantÃ„Â±Ã„Å¸Ã„Â±
  }
}

// Market indeksleme iÃƒÂ§in kullanÃ„Â±m
interface IndexJob {
  marketId: string
}

const indexQueue = new JobQueue<IndexJob>()

export async function POST(request: Request) {
  const { marketId } = await request.json()

  // Bloke etmek yerine kuyruÃ„Å¸a ekle
  await indexQueue.add({ marketId })

  return NextResponse.json({ success: true, message: 'Job queued' })
}
```

## Loglama ve Ã„Â°zleme

### YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ Loglama

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

// KullanÃ„Â±m
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

**UnutmayÃ„Â±n**: Backend kalÃ„Â±plarÃ„Â± ÃƒÂ¶lÃƒÂ§eklenebilir, sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir sunucu tarafÃ„Â± uygulamalar saÃ„Å¸lar. KarmaÃ…Å¸Ã„Â±klÃ„Â±k seviyenize uyan kalÃ„Â±plarÃ„Â± seÃƒÂ§in.
