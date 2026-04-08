---
description: Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€šÃ©Â¦â€“Ã¥â€¦Ë†Ã¦ÂÂ­Ã¥Â»ÂºÃ¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€šÃ§Â¡Â®Ã¤Â¿Â 80%+ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š
---

# TDD Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **tdd-guide** Ã¤Â»Â£Ã§Ââ€ Ã¦ÂÂ¥Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¦ÂÂ­Ã¥Â»ÂºÃ¦Å½Â¥Ã¥ÂÂ£** - Ã©Â¦â€“Ã¥â€¦Ë†Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â±Â»Ã¥Å¾â€¹/Ã¦Å½Â¥Ã¥ÂÂ£
2. **Ã©Â¦â€“Ã¥â€¦Ë†Ã§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢** - Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã§ÂºÂ¢Ã¯Â¼â€°
3. **Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â Â** - Ã§Â¼â€“Ã¥â€ â„¢Ã¥Ë†Å¡Ã¥Â¥Â½Ã¨Â¶Â³Ã¥Â¤Å¸Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã§Â»Â¿Ã¯Â¼â€°
4. **Ã©â€¡ÂÃ¦Å¾â€ž** - Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¥ÂÅ’Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Ë†Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼â€°
5. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡** - Ã§Â¡Â®Ã¤Â¿Â 80%+ Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/tdd`Ã¯Â¼Å¡

* Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦â€”Â¶
* Ã¦Â·Â»Ã¥Å Â Ã¦â€“Â°Ã¥â€¡Â½Ã¦â€¢Â°/Ã§Â»â€žÃ¤Â»Â¶Ã¦â€”Â¶
* Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¦â€”Â¶Ã¯Â¼Ë†Ã©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã©â€¡ÂÃ§Å½Â°Ã©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã©â€¡ÂÃ¦Å¾â€žÃ§Å½Â°Ã¦Å“â€°Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦â€”Â¶

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

tdd-guide Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¯Â¼Å¡

1. Ã¤Â¸ÂºÃ¨Â¾â€œÃ¥â€¦Â¥/Ã¨Â¾â€œÃ¥â€¡Âº**Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Å½Â¥Ã¥ÂÂ£**
2. **Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â°â€ Ã¤Â¼Å¡Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Ë†Ã¥â€ºÂ Ã¤Â¸ÂºÃ¤Â»Â£Ã§Â ÂÃ¥Â°Å¡Ã¤Â¸ÂÃ¥Â­ËœÃ¥Å“Â¨Ã¯Â¼â€°
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¥Â¹Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â®Æ’Ã¤Â»Â¬Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
4. **Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¥Â®Å¾Ã§Å½Â°**Ã¤Â»Â¥Ã¤Â½Â¿Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
5. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¥Â¹Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â®Æ’Ã¤Â»Â¬Ã©â‚¬Å¡Ã¨Â¿â€¡
6. **Ã©â€¡ÂÃ¦Å¾â€ž**Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¥ÂÅ’Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
7. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡**Ã¯Â¼Å’Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Å½Ã¤ÂºÅ½ 80% Ã¥Ë†â„¢Ã¦Â·Â»Ã¥Å Â Ã¦â€ºÂ´Ã¥Â¤Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢

## TDD Ã¥Â¾ÂªÃ§Å½Â¯

```
RED Ã¢â€ â€™ GREEN Ã¢â€ â€™ REFACTOR Ã¢â€ â€™ REPEAT

RED:      Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¤Â±Ã¨Â´Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢
GREEN:    Ã§Â¼â€“Ã¥â€ â„¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¦Å“â‚¬Ã§Â®â‚¬Ã¤Â»Â£Ã§Â Â
REFACTOR: Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
REPEAT:   Ã¥Â¼â‚¬Ã¥Â§â€¹Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Å Å¸Ã¨Æ’Â½/Ã¥Å“ÂºÃ¦â„¢Â¯
```

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````
User: /tdd I need a function to calculate market liquidity score

Agent (tdd-guide):
# TDD Session: Market Liquidity Score Calculator

## Step 1: Define Interface (SCAFFOLD)

```typescript
// lib/liquidity.ts
export interface MarketData {
  totalVolume: number
  bidAskSpread: number
  activeTraders: number
  lastTradeTime: Date
}

export function calculateLiquidityScore(market: MarketData): number {
  // TODO: Implementation
  throw new Error('Not implemented')
}
````

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã§ÂºÂ¢Ã¯Â¼â€°

```typescript
// lib/liquidity.test.ts
import { calculateLiquidityScore } from './liquidity'

describe('calculateLiquidityScore', () => {
  it('should return high score for liquid market', () => {
    const market = {
      totalVolume: 100000,
      bidAskSpread: 0.01,
      activeTraders: 500,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeGreaterThan(80)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('should return low score for illiquid market', () => {
    const market = {
      totalVolume: 100,
      bidAskSpread: 0.5,
      activeTraders: 2,
      lastTradeTime: new Date(Date.now() - 86400000) // 1 day ago
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeLessThan(30)
    expect(score).toBeGreaterThanOrEqual(0)
  })

  it('should handle edge case: zero volume', () => {
    const market = {
      totalVolume: 0,
      bidAskSpread: 0,
      activeTraders: 0,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBe(0)
  })
})
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤Â±Ã¨Â´Â¥

```bash
npm test lib/liquidity.test.ts

FAIL lib/liquidity.test.ts
  Ã¢Å“â€¢ should return high score for liquid market (2 ms)
    Error: Not implemented

1 test failed, 0 passed
```

PASS: Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å’â€°Ã©Â¢â€žÃ¦Å“Å¸Ã¥Â¤Â±Ã¨Â´Â¥Ã£â‚¬â€šÃ¥â€¡â€ Ã¥Â¤â€¡Ã¥Â®Å¾Ã¦â€“Â½Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 4Ã¯Â¼Å¡Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Ë†Ã§Â»Â¿Ã¯Â¼â€°

```typescript
// lib/liquidity.ts
export function calculateLiquidityScore(market: MarketData): number {
  // Handle zero volume edge case
  if (market.totalVolume === 0) {
    return 0
  }

  // Calculate component scores (0-100 scale)
  const volumeScore = Math.min(market.totalVolume / 1000, 100)
  const spreadScore = Math.max(100 - (market.bidAskSpread * 1000), 0)
  const traderScore = Math.min(market.activeTraders / 10, 100)

  // Recent activity bonus
  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(100 - (hoursSinceLastTrade * 10), 0)

  // Weighted average
  const score = (
    volumeScore * 0.4 +
    spreadScore * 0.3 +
    traderScore * 0.2 +
    recencyScore * 0.1
  )

  return Math.min(Math.max(score, 0), 100) // Clamp to 0-100
}
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 5Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ©â‚¬Å¡Ã¨Â¿â€¡

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Â

## Ã¦Â­Â¥Ã©ÂªÂ¤ 6Ã¯Â¼Å¡Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Ë†Ã¦â€Â¹Ã¨Â¿â€ºÃ¯Â¼â€°

```typescript
// lib/liquidity.ts - Refactored with constants and better readability
const WEIGHTS = {
  VOLUME: 0.4,
  SPREAD: 0.3,
  TRADERS: 0.2,
  RECENCY: 0.1,
} as const

const SCALE_FACTORS = {
  VOLUME: 1000,
  SPREAD: 1000,
  TRADERS: 10,
  RECENCY_PENALTY: 10,
} as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function calculateLiquidityScore(market: MarketData): number {
  if (market.totalVolume === 0) return 0

  const volumeScore = Math.min(market.totalVolume / SCALE_FACTORS.VOLUME, 100)
  const spreadScore = clamp(100 - (market.bidAskSpread * SCALE_FACTORS.SPREAD), 0, 100)
  const traderScore = Math.min(market.activeTraders / SCALE_FACTORS.TRADERS, 100)

  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = clamp(100 - (hoursSinceLastTrade * SCALE_FACTORS.RECENCY_PENALTY), 0, 100)

  const weightedScore =
    volumeScore * WEIGHTS.VOLUME +
    spreadScore * WEIGHTS.SPREAD +
    traderScore * WEIGHTS.TRADERS +
    recencyScore * WEIGHTS.RECENCY

  return clamp(weightedScore, 0, 100)
}
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 7Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â»ÂÃ§â€žÂ¶Ã©â‚¬Å¡Ã¨Â¿â€¡

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Ã©â€¡ÂÃ¦Å¾â€žÃ¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â»ÂÃ§â€žÂ¶Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Â

## Ã¦Â­Â¥Ã©ÂªÂ¤ 8Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
npm test -- --coverage lib/liquidity.test.ts

File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
liquidity.ts   |   100   |   100    |   100   |   100

Coverage: 100% PASS: (Target: 80%)
```

PASS: TDD Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Â

```
## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**
- PASS: Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥â€ ÂÃ¥â€ â„¢Ã¥Â®Å¾Ã§Å½Â°
- PASS: Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¹Â¶Ã§Â¡Â®Ã¨Â®Â¤Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥â€ ÂÃ¥Â®Å¾Ã§Å½Â°Ã¥Å Å¸Ã¨Æ’Â½
- PASS: Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã¤Â»Â£Ã§Â ÂÃ¤Â½Â¿Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
- PASS: Ã¤Â»â€¦Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥ÂÅ½Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¦Å¾â€ž
- PASS: Ã¦Â·Â»Ã¥Å Â Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¥â€™Å’Ã©â€â„¢Ã¨Â¯Â¯Ã¥Å“ÂºÃ¦â„¢Â¯
- PASS: Ã§â€ºÂ®Ã¦Â â€¡Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ 80% Ã¤Â»Â¥Ã¤Â¸Å Ã¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â®Ã¤Â»Â£Ã§Â Â 100%Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**
- FAIL: Ã¥â€¦Ë†Ã¥â€ â„¢Ã¥Â®Å¾Ã§Å½Â°Ã¥â€ ÂÃ¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
- FAIL: Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â·Â³Ã¨Â¿â€¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
- FAIL: Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¿â€¡Ã¥Â¤Å¡Ã¤Â»Â£Ã§Â Â
- FAIL: Ã¥Â¿Â½Ã§â€¢Â¥Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
- FAIL: Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€šÃ¯Â¼Ë†Ã¥Âºâ€Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼â€°
- FAIL: Ã¨Â¿â€¡Ã¥ÂºÂ¦Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¯Â¼Ë†Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°

## Ã¥Âºâ€Ã¥Å’â€¦Ã¥ÂÂ«Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Â±Â»Ã¥Å¾â€¹

**Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Ë†Ã¥â€¡Â½Ã¦â€¢Â°Ã§ÂºÂ§Ã¥Ë†Â«Ã¯Â¼â€°Ã¯Â¼Å¡
- Ã¦Â­Â£Ã¥Â¸Â¸Ã¨Â·Â¯Ã¥Â¾â€žÃ¥Å“ÂºÃ¦â„¢Â¯
- Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂnullÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¼Ã¯Â¼â€°
- Ã©â€â„¢Ã¨Â¯Â¯Ã¦ÂÂ¡Ã¤Â»Â¶
- Ã¨Â¾Â¹Ã§â€¢Å’Ã¥â‚¬Â¼

**Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Ë†Ã§Â»â€žÃ¤Â»Â¶Ã§ÂºÂ§Ã¥Ë†Â«Ã¯Â¼â€°Ã¯Â¼Å¡
- API Ã§Â«Â¯Ã§â€šÂ¹
- Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦â€œÂÃ¤Â½Å“
- Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¨Â°Æ’Ã§â€Â¨
- Ã¥Å’â€¦Ã¥ÂÂ«Ã©â€™Â©Ã¥Â­ÂÃ§Å¡â€ž React Ã§Â»â€žÃ¤Â»Â¶

**Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨ `/e2e` Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼â€°Ã¯Â¼Å¡
- Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹
- Ã¥Â¤Å¡Ã¦Â­Â¥Ã©ÂªÂ¤Ã¦ÂµÂÃ§Â¨â€¹
- Ã¥â€¦Â¨Ã¦Â Ë†Ã©â€ºâ€ Ã¦Ë†Â

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¨Â¦ÂÃ¦Â±â€š

- Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â»Â£Ã§Â Â**Ã¦Å“â‚¬Ã¤Â½Å½ 80%**
- **Ã¥Â¿â€¦Ã©Â¡Â»Ã¨Â¾Â¾Ã¥Ë†Â° 100%** Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å¡
  - Ã¨Â´Â¢Ã¥Å Â¡Ã¨Â®Â¡Ã§Â®â€”
  - Ã¨Â®Â¤Ã¨Â¯ÂÃ©â‚¬Â»Ã¨Â¾â€˜
  - Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€¦Â³Ã©â€Â®Ã¤Â»Â£Ã§Â Â
  - Ã¦Â Â¸Ã¥Â¿Æ’Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜

## Ã©â€¡ÂÃ¨Â¦ÂÃ¨Â¯Â´Ã¦ËœÅ½

**Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¨Â¦ÂÃ¦Â±â€š**Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¿â€¦Ã©Â¡Â»Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¹â€¹Ã¥â€°ÂÃ§Â¼â€“Ã¥â€ â„¢Ã£â‚¬â€šTDD Ã¥Â¾ÂªÃ§Å½Â¯Ã¦ËœÂ¯Ã¯Â¼Å¡

1. **Ã§ÂºÂ¢** - Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
2. **Ã§Â»Â¿** - Ã¥Â®Å¾Ã§Å½Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¤Â½Â¿Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
3. **Ã©â€¡ÂÃ¦Å¾â€ž** - Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â Â

Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¨Â·Â³Ã¨Â¿â€¡Ã§ÂºÂ¢Ã©ËœÂ¶Ã¦Â®ÂµÃ£â‚¬â€šÃ¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥â€°ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ£â‚¬â€š

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

- Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/plan` Ã¦ÂÂ¥Ã¤Âºâ€ Ã¨Â§Â£Ã¨Â¦ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†
- Ã¤Â½Â¿Ã§â€Â¨ `/tdd` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¸Â¦Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°
- Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡ÂºÃ§Å½Â°Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/build-fix`
- Ã¤Â½Â¿Ã§â€Â¨ `/code-review` Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Â®Å¾Ã§Å½Â°
- Ã¤Â½Â¿Ã§â€Â¨ `/test-coverage` Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Ââ€ 

Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨Ã§â€Â± ECC Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€ž `tdd-guide` Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š

Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€ž `tdd-workflow` Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¹Å¸Ã©Å¡Â ECC Ã¦Ââ€ Ã§Â»â€˜Ã¦ÂÂÃ¤Â¾â€ºÃ£â‚¬â€š

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼Å’Ã¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â½ÂÃ¤ÂºÅ½Ã¯Â¼Å¡
- `agents/tdd-guide.md`
- `skills/tdd-workflow/SKILL.md`
```
