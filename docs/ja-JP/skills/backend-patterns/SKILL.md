---
name: backend-patterns
description: Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.
---

# Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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


Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂªÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂµÃ£â€šÂ¤Ã£Æ’â€°Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ¨Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â‚¬â€š

## APIÃ¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### RESTful APIÃ¦Â§â€¹Ã©â‚¬Â 

```typescript
// PASS: Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®URL
GET    /api/markets                 # Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†
GET    /api/markets/:id             # Ã¥ÂËœÃ¤Â¸â‚¬Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¥Ââ€“Ã¥Â¾â€”
POST   /api/markets                 # Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†Â
PUT    /api/markets/:id             # Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã§Â½Â®Ã¦Ââ€º
PATCH  /api/markets/:id             # Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¦â€ºÂ´Ã¦â€“Â°
DELETE /api/markets/:id             # Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¥â€°Å Ã©â„¢Â¤

// PASS: Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ£â€šÂ½Ã£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿
GET /api/markets?status=active&sort=volume&limit=20&offset=0
```

### Ã£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
// Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã¦Å Â½Ã¨Â±Â¡Ã¥Å’â€“
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

  // Ã£ÂÂÃ£ÂÂ®Ã¤Â»â€“Ã£ÂÂ®Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°...
}
```

### Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
// Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£Ââ€¹Ã£â€šâ€°Ã¥Ë†â€ Ã©â€ºÂ¢
class MarketService {
  constructor(private marketRepo: MarketRepository) {}

  async searchMarkets(query: string, limit: number = 10): Promise<Market[]> {
    // Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯
    const embedding = await generateEmbedding(query)
    const results = await this.vectorSearch(embedding, limit)

    // Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¥Ââ€“Ã¥Â¾â€”
    const markets = await this.marketRepo.findByIds(results.map(r => r.id))

    // Ã©Â¡Å¾Ã¤Â¼Â¼Ã¥ÂºÂ¦Ã£ÂÂ§Ã£â€šÂ½Ã£Æ’Â¼Ã£Æ’Ë†
    return markets.sort((a, b) => {
      const scoreA = results.find(r => r.id === a.id)?.score || 0
      const scoreB = results.find(r => r.id === b.id)?.score || 0
      return scoreA - scoreB
    })
  }

  private async vectorSearch(embedding: number[], limit: number) {
    // Ã£Æ’â„¢Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â«Ã¦Â¤Å“Ã§Â´Â¢Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦
  }
}
```

### Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
// Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†/Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã¥â€¡Â¦Ã§Ââ€ Ã£Æ’â€˜Ã£â€šÂ¤Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³
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

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
export default withAuth(async (req, res) => {
  // Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¯req.userÃ£ÂÂ«Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã¥ÂÂ¯Ã¨Æ’Â½
})
```

## Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“

```typescript
// PASS: Ã¨â€°Â¯Ã£Ââ€ž: Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ¥Ë†â€”Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾
const { data } = await supabase
  .from('markets')
  .select('id, name, status, volume')
  .eq('status', 'active')
  .order('volume', { ascending: false })
  .limit(10)

// FAIL: Ã¦â€šÂªÃ£Ââ€ž: Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾
const { data } = await supabase
  .from('markets')
  .select('*')
```

### N+1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ©ËœÂ²Ã¦Â­Â¢

```typescript
// FAIL: Ã¦â€šÂªÃ£Ââ€ž: N+1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¥â€¢ÂÃ©Â¡Å’
const markets = await getMarkets()
for (const market of markets) {
  market.creator = await getUser(market.creator_id)  // NÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
}

// PASS: Ã¨â€°Â¯Ã£Ââ€ž: Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’ÂÃ£Æ’â€¢Ã£â€šÂ§Ã£Æ’Æ’Ã£Æ’Â
const markets = await getMarkets()
const creatorIds = markets.map(m => m.creator_id)
const creators = await getUsers(creatorIds)  // 1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
const creatorMap = new Map(creators.map(c => [c.id, c]))

markets.forEach(market => {
  market.creator = creatorMap.get(market.creator_id)
})
```

### Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
async function createMarketWithPosition(
  marketData: CreateMarketDto,
  positionData: CreatePositionDto
) {
  // SupabaseÃ£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
  const { data, error } = await supabase.rpc('create_market_with_position', {
    market_data: marketData,
    position_data: positionData
  })

  if (error) throw new Error('Transaction failed')
  return data
}

// SupabaseÃ£ÂÂ®SQLÃ©â€“Â¢Ã¦â€¢Â°
CREATE OR REPLACE FUNCTION create_market_with_position(
  market_data jsonb,
  position_data jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
  -- Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¯Ã¨â€¡ÂªÃ¥â€¹â€¢Ã§Å¡â€žÃ£ÂÂ«Ã©â€“â€¹Ã¥Â§â€¹
  INSERT INTO markets VALUES (market_data);
  INSERT INTO positions VALUES (position_data);
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    -- Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ¯Ã¨â€¡ÂªÃ¥â€¹â€¢Ã§Å¡â€žÃ£ÂÂ«Ã§â„¢ÂºÃ§â€Å¸
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
```

## Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°Ã¦Ë†Â¦Ã§â€¢Â¥

### RedisÃ£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼

```typescript
class CachedMarketRepository implements MarketRepository {
  constructor(
    private baseRepo: MarketRepository,
    private redis: RedisClient
  ) {}

  async findById(id: string): Promise<Market | null> {
    // Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
    const cached = await this.redis.get(`market:${id}`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’Å¸Ã£â€šÂ¹ - Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Ââ€¹Ã£â€šâ€°Ã¥Ââ€“Ã¥Â¾â€”
    const market = await this.baseRepo.findById(id)

    if (market) {
      // 5Ã¥Ë†â€ Ã©â€“â€œÃ£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥
      await this.redis.setex(`market:${id}`, 300, JSON.stringify(market))
    }

    return market
  }

  async invalidateCache(id: string): Promise<void> {
    await this.redis.del(`market:${id}`)
  }
}
```

### Cache-AsideÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
async function getMarketWithCache(id: string): Promise<Market> {
  const cacheKey = `market:${id}`

  // Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šâ€™Ã¨Â©Â¦Ã£Ââ„¢
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’Å¸Ã£â€šÂ¹ - DBÃ£Ââ€¹Ã£â€šâ€°Ã¥Ââ€“Ã¥Â¾â€”
  const market = await db.markets.findUnique({ where: { id } })

  if (!market) throw new Error('Market not found')

  // Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°
  await redis.setex(cacheKey, 300, JSON.stringify(market))

  return market
}
```

## Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã©â€ºâ€ Ã¤Â¸Â­Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼

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

  // Ã¤ÂºË†Ã¦Å“Å¸Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°Ã£ÂÂ«Ã¨Â¨ËœÃ©Å’Â²
  console.error('Unexpected error:', error)

  return NextResponse.json({
    success: false,
    error: 'Internal server error'
  }, { status: 500 })
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
export async function GET(request: Request) {
  try {
    const data = await fetchData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return errorHandler(error, request)
  }
}
```

### Ã¦Å’â€¡Ã¦â€¢Â°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂªÃ£Æ’â€¢Ã£ÂÂ«Ã£â€šË†Ã£â€šâ€¹Ã£Æ’ÂªÃ£Æ’Ë†Ã£Æ’Â©Ã£â€šÂ¤

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
        // Ã¦Å’â€¡Ã¦â€¢Â°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂªÃ£Æ’â€¢: 1Ã§Â§â€™Ã£â‚¬Â2Ã§Â§â€™Ã£â‚¬Â4Ã§Â§â€™
        const delay = Math.pow(2, i) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError!
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
const data = await fetchWithRetry(() => fetchFromAPI())
```

## Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂ¨Ã¨ÂªÂÃ¥ÂÂ¯

### JWTÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã¦Â¤Å“Ã¨Â¨Â¼

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

// APIÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ§Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
export async function GET(request: Request) {
  const user = await requireAuth(request)

  const data = await getDataForUser(user.userId)

  return NextResponse.json({ success: true, data })
}
```

### Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã¥Ë†Â¶Ã¥Â¾Â¡

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

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢ - HOFÃ£ÂÅ’Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€”
export const DELETE = requirePermission('delete')(
  async (request: Request, user: User) => {
    // Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¯Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£ÂÂ®Ã¦Â¨Â©Ã©â„¢ÂÃ£â€šâ€™Ã¦Å’ÂÃ£ÂÂ¤Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¥Ââ€”Ã£Ââ€˜Ã¥Ââ€“Ã£â€šâ€¹
    return new Response('Deleted', { status: 200 })
  }
)
```

## Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â

### Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂªÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Â¡Ã£Æ’Â¢Ã£Æ’ÂªÃ£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ¿Ã£Æ’Â¼

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

    // Ã£â€šÂ¦Ã£â€šÂ£Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¦Ã¥Â¤â€“Ã£ÂÂ®Ã¥ÂÂ¤Ã£Ââ€žÃ£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
    const recentRequests = requests.filter(time => now - time < windowMs)

    if (recentRequests.length >= maxRequests) {
      return false  // Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢ÂÃ¨Â¶â€¦Ã©ÂÅ½
    }

    // Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
    recentRequests.push(now)
    this.requests.set(identifier, recentRequests)

    return true
  }
}

const limiter = new RateLimiter()

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  const allowed = await limiter.checkLimit(ip, 100, 60000)  // 100 req/Ã¥Ë†â€ 

  if (!allowed) {
    return NextResponse.json({
      error: 'Rate limit exceeded'
    }, { status: 429 })
  }

  // Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§Â¶Å¡Ã¨Â¡Å’
}
```

## Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ°Ã£Æ’Â©Ã£â€šÂ¦Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’â€“Ã£ÂÂ¨Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¼

### Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂªÃ£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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
    // Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’â€“Ã¥Â®Å¸Ã¨Â¡Å’Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯
  }
}

// Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã¤Â½Å“Ã¦Ë†ÂÃ§â€Â¨Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
interface IndexJob {
  marketId: string
}

const indexQueue = new JobQueue<IndexJob>()

export async function POST(request: Request) {
  const { marketId } = await request.json()

  // Ã£Æ’â€“Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¼Ã£ÂÂ«Ã¨Â¿Â½Ã¥Å Â 
  await indexQueue.add({ marketId })

  return NextResponse.json({ success: true, message: 'Job queued' })
}
```

## Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ¨Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

### Ã¦Â§â€¹Ã©â‚¬Â Ã¥Å’â€“Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°

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

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢
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

**Ã¦Â³Â¨Ã¦â€žÂ**: Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ¯Ã£â‚¬ÂÃ£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂ§Ã¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂµÃ£â€šÂ¤Ã£Æ’â€°Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¥Â®Å¸Ã§ÂÂ¾Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¨Â¤â€¡Ã©â€ºâ€˜Ã£Ââ€¢Ã£ÂÂ®Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ«Ã©ÂÂ©Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
