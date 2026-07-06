---
description: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â° ÃªÂ°â€¢Ã¬Â Å“. Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã¬Å Â¤Ã¬ÂºÂÃ­ÂÂ´Ã«â€Â©Ã­â€¢ËœÃªÂ³Â , Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Å“ Ã­â€ºâ€ž Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢Â  Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â½â€Ã«â€œÅ“Ã«Â¥Â¼ ÃªÂµÂ¬Ã­Ëœâ€žÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤. 80% Ã¬ÂÂ´Ã¬Æ’Â Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬Ã«Â¥Â¼ Ã«Â³Â´Ã¬Å¾Â¥Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
---

# TDD Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

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


Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã«Å â€ **tdd-guide** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬â€”Â¬ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“ Ã«Â°Â©Ã«Â²â€¢Ã«Â¡Â Ã¬Ââ€ž ÃªÂ°â€¢Ã¬Â Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ÃªÂ°â‚¬ Ã­â€¢ËœÃ«Å â€ ÃªÂ²Æ’

1. **Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã¬Å Â¤Ã¬ÂºÂÃ­ÂÂ´Ã«â€Â©** - Ã­Æ’â‚¬Ã¬Å¾â€¦/Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Â â€¢Ã¬ÂËœ
2. **Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Æ’ÂÃ¬â€žÂ±** - Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¾â€˜Ã¬â€žÂ± (RED)
3. **Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â½â€Ã«â€œÅ“ ÃªÂµÂ¬Ã­Ëœâ€ž** - Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃªÂ¸Â°Ã¬â€”Â Ã¬Â¶Â©Ã«Â¶â€žÃ­â€¢Å“ Ã¬Â½â€Ã«â€œÅ“Ã«Â§Å’ Ã¬Å¾â€˜Ã¬â€žÂ± (GREEN)
4. **Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â** - Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã­â€ ÂµÃªÂ³Â¼Ã¬â€¹Å“Ã­â€šÂ¤Ã«Â©Â´Ã¬â€žÅ“ Ã¬Â½â€Ã«â€œÅ“ ÃªÂ°Å“Ã¬â€žÂ  (REFACTOR)
5. **Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸** - 80% Ã¬ÂÂ´Ã¬Æ’Â Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã«Â³Â´Ã¬Å¾Â¥

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â

`/tdd`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â  Ã«â€¢Å’:
- Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥ ÃªÂµÂ¬Ã­Ëœâ€ž
- Ã¬Æ’Ë† Ã­â€¢Â¨Ã¬Ë†Ëœ/Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸ Ã¬Â¶â€ÃªÂ°â‚¬
- Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢ (Ã«Â²â€žÃªÂ·Â¸Ã«Â¥Â¼ Ã¬Å¾Â¬Ã­Ëœâ€žÃ­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±)
- ÃªÂ¸Â°Ã¬Â¡Â´ Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â
- Ã­â€¢ÂµÃ¬â€¹Â¬ Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â ÃªÂµÂ¬Ã­Ëœâ€ž

## Ã¬Å¾â€˜Ã«Ââ„¢ Ã«Â°Â©Ã¬â€¹Â

tdd-guide Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ÃªÂ°â‚¬ Ã¬Ë†ËœÃ­â€“â€°Ã­â€¢ËœÃ«Å â€ Ã¬Å¾â€˜Ã¬â€”â€¦:

1. Ã¬Å¾â€¦Ã¬Â¶Å“Ã«Â Â¥Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ **Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã¬Â â€¢Ã¬ÂËœ**
2. (Ã¬Â½â€Ã«â€œÅ“ÃªÂ°â‚¬ Ã¬â€¢â€žÃ¬Â§Â Ã¬Â¡Â´Ã¬Å¾Â¬Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Å“Â¼Ã«Â¯â‚¬Ã«Â¡Å“) **Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¾â€˜Ã¬â€žÂ±**
3. Ã¬ËœÂ¬Ã«Â°â€Ã«Â¥Â¸ Ã¬ÂÂ´Ã¬Å“Â Ã«Â¡Å“ Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ **Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°** Ã«Â°Â Ã­â„¢â€¢Ã¬ÂÂ¸
4. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Ââ€žÃ«Â¡Â **Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Å¾â€˜Ã¬â€žÂ±**
5. Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ **Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°** Ã«Â°Â Ã­â„¢â€¢Ã¬ÂÂ¸
6. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã­â€ ÂµÃªÂ³Â¼Ã¬â€¹Å“Ã­â€šÂ¤Ã«Â©Â´Ã¬â€žÅ“ Ã¬Â½â€Ã«â€œÅ“ **Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â**
7. **Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸** Ã«Â°Â 80% Ã«Â¯Â¸Ã«Â§Å’Ã¬ÂÂ´Ã«Â©Â´ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â¶â€ÃªÂ°â‚¬

## TDD Ã¬â€šÂ¬Ã¬ÂÂ´Ã­ÂÂ´

```
RED Ã¢â€ â€™ GREEN Ã¢â€ â€™ REFACTOR Ã¢â€ â€™ REPEAT

RED:      Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¾â€˜Ã¬â€žÂ±
GREEN:    Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢Â  Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ±
REFACTOR: Ã¬Â½â€Ã«â€œÅ“ ÃªÂ°Å“Ã¬â€žÂ , Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ ÃªÂ³â€žÃ¬â€ Â Ã­â€ ÂµÃªÂ³Â¼ Ã¬Å“Â Ã¬Â§â‚¬
REPEAT:   Ã«â€¹Â¤Ã¬ÂÅ’ ÃªÂ¸Â°Ã«Å Â¥/Ã¬â€¹Å“Ã«â€šËœÃ«Â¦Â¬Ã¬ËœÂ¤
```

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬ËœË†Ã¬â€¹Å“

````
User: /tdd Ã«Â§Ë†Ã¬Â¼â€œ Ã¬Å“Â Ã«Ââ„¢Ã¬â€žÂ± Ã¬Â ÂÃ¬Ë†ËœÃ«Â¥Â¼ ÃªÂ³â€žÃ¬â€šÂ°Ã­â€¢ËœÃ«Å â€ Ã­â€¢Â¨Ã¬Ë†ËœÃªÂ°â‚¬ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤

Agent (tdd-guide):
# TDD Ã¬â€žÂ¸Ã¬â€¦Ëœ: Ã«Â§Ë†Ã¬Â¼â€œ Ã¬Å“Â Ã«Ââ„¢Ã¬â€žÂ± Ã¬Â ÂÃ¬Ë†Ëœ ÃªÂ³â€žÃ¬â€šÂ°ÃªÂ¸Â°

## 1Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã¬Â â€¢Ã¬ÂËœ (SCAFFOLD)

```typescript
// lib/liquidity.ts
export interface MarketData {
  totalVolume: number
  bidAskSpread: number
  activeTraders: number
  lastTradeTime: Date
}

export function calculateLiquidityScore(market: MarketData): number {
  // TODO: ÃªÂµÂ¬Ã­Ëœâ€ž
  throw new Error('Not implemented')
}
```

## 2Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¾â€˜Ã¬â€žÂ± (RED)

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
      lastTradeTime: new Date(Date.now() - 86400000) // 1Ã¬ÂÂ¼ Ã¬Â â€ž
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

## 3Ã«â€¹Â¨ÃªÂ³â€ž: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã¬â€¹Â¤Ã­Å’Â¨ Ã­â„¢â€¢Ã¬ÂÂ¸

```bash
npm test lib/liquidity.test.ts

FAIL lib/liquidity.test.ts
  Ã¢Å“â€¢ should return high score for liquid market (2 ms)
    Error: Not implemented

1 test failed, 0 passed
```

PASS: Ã¬ËœË†Ã¬Æ’ÂÃ«Å’â‚¬Ã«Â¡Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­Å’Â¨. ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Â¤â‚¬Ã«Â¹â€ž Ã¬â„¢â€žÃ«Â£Å’.

## 4Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â½â€Ã«â€œÅ“ ÃªÂµÂ¬Ã­Ëœâ€ž (GREEN)

```typescript
// lib/liquidity.ts
export function calculateLiquidityScore(market: MarketData): number {
  // ÃªÂ±Â°Ã«Å¾ËœÃ«Å¸â€° 0Ã¬ÂÂ¸ Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â²ËœÃ«Â¦Â¬
  if (market.totalVolume === 0) {
    return 0
  }

  // ÃªÂµÂ¬Ã¬â€žÂ± Ã¬Å¡â€Ã¬â€ Å’Ã«Â³â€ž Ã¬Â ÂÃ¬Ë†Ëœ ÃªÂ³â€žÃ¬â€šÂ° (0-100 Ã¬Å Â¤Ã¬Â¼â‚¬Ã¬ÂÂ¼)
  const volumeScore = Math.min(market.totalVolume / 1000, 100)
  const spreadScore = Math.max(100 - (market.bidAskSpread * 1000), 0)
  const traderScore = Math.min(market.activeTraders / 10, 100)

  // Ã¬ÂµÅ“ÃªÂ·Â¼ Ã­â„¢Å“Ã«Ââ„¢ Ã«Â³Â´Ã«â€žË†Ã¬Å Â¤
  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(100 - (hoursSinceLastTrade * 10), 0)

  // ÃªÂ°â‚¬Ã¬Â¤â€˜ Ã­Ââ€°ÃªÂ·Â 
  const score = (
    volumeScore * 0.4 +
    spreadScore * 0.3 +
    traderScore * 0.2 +
    recencyScore * 0.1
  )

  return Math.min(Math.max(score, 0), 100) // 0-100Ã¬Å“Â¼Ã«Â¡Å“ Ã­ÂÂ´Ã«Å¾Â¨Ã­â€¢â€˜
}
```

## 5Ã«â€¹Â¨ÃªÂ³â€ž: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã­â€ ÂµÃªÂ³Â¼ Ã­â„¢â€¢Ã¬ÂÂ¸

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€ ÂµÃªÂ³Â¼!

## 6Ã«â€¹Â¨ÃªÂ³â€ž: Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â (IMPROVE)

```typescript
// lib/liquidity.ts - Ã¬Æ’ÂÃ¬Ë†ËœÃ¬â„¢â‚¬ ÃªÂ°â‚¬Ã«Ââ€¦Ã¬â€žÂ± Ã­â€“Â¥Ã¬Æ’ÂÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â
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

## 7Ã«â€¹Â¨ÃªÂ³â€ž: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã¬â€”Â¬Ã¬Â â€žÃ­Å¾Ë† Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â Ã¬â„¢â€žÃ«Â£Å’, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€”Â¬Ã¬Â â€žÃ­Å¾Ë† Ã­â€ ÂµÃªÂ³Â¼!

## 8Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸

```bash
npm test -- --coverage lib/liquidity.test.ts

File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
liquidity.ts   |   100   |   100    |   100   |   100

Coverage: 100% PASS: (Ã«ÂªÂ©Ã­â€˜Å“: 80%)
```

PASS: TDD Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã¬â„¢â€žÃ«Â£Å’!
````

## TDD Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬

**Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â  ÃªÂ²Æ’:**
- ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Â â€žÃ¬â€”Â Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±
- ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Â â€žÃ¬â€”Â Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€”Â¬ Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸
- Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃªÂ¸Â° Ã¬Å“â€žÃ­â€¢Å“ Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ±
- Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢Å“ Ã­â€ºâ€žÃ¬â€”ÂÃ«Â§Å’ Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â
- Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤Ã¬â„¢â‚¬ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬â€¹Å“Ã«â€šËœÃ«Â¦Â¬Ã¬ËœÂ¤ Ã¬Â¶â€ÃªÂ°â‚¬
- 80% Ã¬ÂÂ´Ã¬Æ’Â Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã«ÂªÂ©Ã­â€˜Å“ (Ã­â€¢ÂµÃ¬â€¹Â¬ Ã¬Â½â€Ã«â€œÅ“Ã«Å â€ 100%)

**Ã­â€¢ËœÃ¬Â§â‚¬ Ã«Â§ÂÃ¬â€¢â€žÃ¬â€¢Â¼ Ã­â€¢Â  ÃªÂ²Æ’:**
- Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ¬â€”Â ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Å¾â€˜Ã¬â€žÂ±
- ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½ Ã­â€ºâ€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° ÃªÂ±Â´Ã«â€žË†Ã«â€ºÂ°ÃªÂ¸Â°
- Ã­â€¢Å“ Ã«Â²Ë†Ã¬â€”Â Ã«â€žË†Ã«Â¬Â´ Ã«Â§Å½Ã¬Ââ‚¬ Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ±
- Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¬Â´Ã¬â€¹Å“
- ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€žÂ¸Ã«Â¶â‚¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ (Ã«Ââ„¢Ã¬Å¾â€˜Ã¬Ââ€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸)
- Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ²Æ’Ã¬Ââ€ž mock (Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€žÂ Ã­ËœÂ¸)

## Ã­ÂÂ¬Ã­â€¢Â¨Ã­â€¢Â  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å“Â Ã­Ëœâ€¢

**Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** (Ã­â€¢Â¨Ã¬Ë†Ëœ Ã¬Ë†ËœÃ¬Â¤â‚¬):
- Ã¬Â â€¢Ã¬Æ’Â ÃªÂ²Â½Ã«Â¡Å“ Ã¬â€¹Å“Ã«â€šËœÃ«Â¦Â¬Ã¬ËœÂ¤
- Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤ (Ã«Â¹Ë† ÃªÂ°â€™, null, Ã¬ÂµÅ“Ã«Å’â‚¬ÃªÂ°â€™)
- Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â¡Â°ÃªÂ±Â´
- ÃªÂ²Â½ÃªÂ³â€žÃªÂ°â€™

**Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** (Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸ Ã¬Ë†ËœÃ¬Â¤â‚¬):
- API Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å¾â€˜Ã¬â€”â€¦
- Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤ Ã­ËœÂ¸Ã¬Â¶Å“
- hooksÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ React Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸

**E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** (`/e2e` Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ Ã¬â€šÂ¬Ã¬Å¡Â©):
- Ã­â€¢ÂµÃ¬â€¹Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­ÂÂÃ«Â¦â€ž
- Ã«â€¹Â¤Ã«â€¹Â¨ÃªÂ³â€ž Ã­â€â€žÃ«Â¡Å“Ã¬â€žÂ¸Ã¬Å Â¤
- Ã­â€™â‚¬ Ã¬Å Â¤Ã­Æ’Â Ã­â€ ÂµÃ­â€¢Â©

## Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­

- **80% Ã¬ÂµÅ“Ã¬â€ Å’** - Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´
- **100% Ã­â€¢â€žÃ¬Ë†Ëœ** - Ã«â€¹Â¤Ã¬ÂÅ’ Ã­â€¢Â­Ã«ÂªÂ©Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´:
  - ÃªÂ¸Ë†Ã¬Å“Âµ ÃªÂ³â€žÃ¬â€šÂ°
  - Ã¬ÂÂ¸Ã¬Â¦Â Ã«Â¡Å“Ã¬Â§Â
  - Ã«Â³Â´Ã¬â€¢Ë†Ã¬â€”Â Ã¬Â¤â€˜Ã¬Å¡â€Ã­â€¢Å“ Ã¬Â½â€Ã«â€œÅ“
  - Ã­â€¢ÂµÃ¬â€¹Â¬ Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â

## Ã¬Â¤â€˜Ã¬Å¡â€ Ã¬â€šÂ¬Ã­â€¢Â­

**Ã­â€¢â€žÃ¬Ë†Ëœ**: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Å â€ Ã«Â°ËœÃ«â€œÅ“Ã¬â€¹Å“ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Â â€žÃ¬â€”Â Ã¬Å¾â€˜Ã¬â€žÂ±Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤. TDD Ã¬â€šÂ¬Ã¬ÂÂ´Ã­ÂÂ´Ã¬Ââ‚¬ Ã«â€¹Â¤Ã¬ÂÅ’ÃªÂ³Â¼ ÃªÂ°â„¢Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤:

1. **RED** - Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Å â€ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å¾â€˜Ã¬â€žÂ±
2. **GREEN** - Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Ââ€žÃ«Â¡Â ÃªÂµÂ¬Ã­Ëœâ€ž
3. **REFACTOR** - Ã¬Â½â€Ã«â€œÅ“ ÃªÂ°Å“Ã¬â€žÂ 

Ã¬Â Ë†Ã«Å’â‚¬ RED Ã«â€¹Â¨ÃªÂ³â€žÃ«Â¥Â¼ ÃªÂ±Â´Ã«â€žË†Ã«â€ºÂ°Ã¬Â§â‚¬ Ã«Â§Ë†Ã¬â€žÂ¸Ã¬Å¡â€. Ã¬Â Ë†Ã«Å’â‚¬ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ¬â€”Â Ã¬Â½â€Ã«â€œÅ“Ã«Â¥Â¼ Ã¬Å¾â€˜Ã¬â€žÂ±Ã­â€¢ËœÃ¬Â§â‚¬ Ã«Â§Ë†Ã¬â€žÂ¸Ã¬Å¡â€.

## Ã«â€¹Â¤Ã«Â¥Â¸ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã¬â„¢â‚¬Ã¬ÂËœ Ã¬â€”Â°Ã«Ââ„¢

- `/plan`Ã¬Ââ€ž Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Ã«Â¬Â´Ã¬â€”â€¡Ã¬Ââ€ž Ã«Â§Å’Ã«â€œÂ¤Ã¬Â§â‚¬ Ã¬ÂÂ´Ã­â€¢Â´
- `/tdd`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ ÃªÂµÂ¬Ã­Ëœâ€ž
- `/build-fix`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Ã«Â¹Å’Ã«â€œÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â°Å“Ã¬Æ’Â Ã¬â€¹Å“ Ã¬Ë†ËœÃ¬Â â€¢
- `/code-review`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ ÃªÂµÂ¬Ã­Ëœâ€ž Ã«Â¦Â¬Ã«Â·Â°
- `/test-coverage`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ ÃªÂ²â‚¬Ã¬Â¦Â

## ÃªÂ´â‚¬Ã«Â Â¨ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸

Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã«Å â€ `tdd-guide` Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
`~/.claude/agents/tdd-guide.md`

ÃªÂ·Â¸Ã«Â¦Â¬ÃªÂ³Â  `tdd-workflow` Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ€ž Ã¬Â°Â¸Ã¬Â¡Â°Ã­â€¢Â  Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤:
`~/.claude/skills/tdd-workflow/`
