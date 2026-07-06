---
description: Test odaklÃ„Â± geliÃ…Å¸tirme (TDD) iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± zorlar. Interface'leri tasarla, Ãƒâ€“NCE testleri oluÃ…Å¸tur, sonra minimal kodu uygula. %80+ kod kapsama oranÃ„Â± saÃ„Å¸la.
---

# TDD Komutu

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


Bu komut, test odaklÃ„Â± geliÃ…Å¸tirme metodolojisini zorlamak iÃƒÂ§in **tdd-guide** agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

## Bu Komut Ne Yapar

1. **Interface'leri Tasarla** - Ãƒâ€“nce tip/interface'leri tanÃ„Â±mla
2. **Ãƒâ€“nce Testleri OluÃ…Å¸tur** - BaÃ…Å¸arÃ„Â±sÃ„Â±z testler yaz (RED)
3. **Minimal Kod Uygula** - GeÃƒÂ§mek iÃƒÂ§in yeterli kodu yaz (GREEN)
4. **Refactor Et** - Testleri yeÃ…Å¸il tutarken kodu iyileÃ…Å¸tir (REFACTOR)
5. **Kapsama OranÃ„Â±nÃ„Â± DoÃ„Å¸rula** - %80+ test kapsama oranÃ„Â± saÃ„Å¸la

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/tdd` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- Yeni ÃƒÂ¶zellikler uygularken
- Yeni fonksiyonlar/componentler eklerken
- HatalarÃ„Â± dÃƒÂ¼zeltirken (ÃƒÂ¶nce hatayÃ„Â± tekrar eden test yaz)
- Mevcut kodu refactor ederken
- Kritik iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± oluÃ…Å¸tururken

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

tdd-guide agent'Ã„Â± Ã…Å¸unlarÃ„Â± yapacaktÃ„Â±r:

1. GiriÃ…Å¸/ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸lar iÃƒÂ§in **interface'leri tanÃ„Â±mla**
2. **BAÃ…Å¾ARISIZ olacak testleri yaz** (ÃƒÂ§ÃƒÂ¼nkÃƒÂ¼ kod henÃƒÂ¼z yok)
3. **Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r** ve doÃ„Å¸ru sebepten baÃ…Å¸arÃ„Â±sÃ„Â±z olduklarÃ„Â±nÃ„Â± doÃ„Å¸rula
4. Testleri geÃƒÂ§irmek iÃƒÂ§in **minimal uygulama yaz**
5. **Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r** ve geÃƒÂ§tiklerini doÃ„Å¸rula
6. Testleri yeÃ…Å¸il tutarken kodu **refactor et**
7. **Kapsama oranÃ„Â±nÃ„Â± kontrol et** ve %80'in altÃ„Â±ndaysa daha fazla test ekle

## TDD DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

```
RED Ã¢â€ â€™ GREEN Ã¢â€ â€™ REFACTOR Ã¢â€ â€™ TEKRARLA

RED:      BaÃ…Å¸arÃ„Â±sÃ„Â±z bir test yaz
GREEN:    GeÃƒÂ§mek iÃƒÂ§in minimal kod yaz
REFACTOR: Kodu iyileÃ…Å¸tir, testleri geÃƒÂ§meye devam et
TEKRARLA: Bir sonraki ÃƒÂ¶zellik/senaryo
```

## Ãƒâ€“rnek KullanÃ„Â±m

```
KullanÃ„Â±cÃ„Â±: /tdd Piyasa likidite skorunu hesaplamak iÃƒÂ§in bir fonksiyona ihtiyacÃ„Â±m var

Agent (tdd-guide):
# TDD Oturumu: Piyasa Likidite Skoru HesaplayÃ„Â±cÃ„Â±

## AdÃ„Â±m 1: Interface TanÃ„Â±mla (SCAFFOLD)

```typescript
// lib/liquidity.ts
export interface MarketData {
  totalVolume: number
  bidAskSpread: number
  activeTraders: number
  lastTradeTime: Date
}

export function calculateLiquidityScore(market: MarketData): number {
  // TODO: Uygulama
  throw new Error('Not implemented')
}
```

## AdÃ„Â±m 2: BaÃ…Å¸arÃ„Â±sÃ„Â±z Test Yaz (RED)

```typescript
// lib/liquidity.test.ts
import { calculateLiquidityScore } from './liquidity'

describe('calculateLiquidityScore', () => {
  it('likit piyasa iÃƒÂ§in yÃƒÂ¼ksek skor dÃƒÂ¶ndÃƒÂ¼rmeli', () => {
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

  it('az likit piyasa iÃƒÂ§in dÃƒÂ¼Ã…Å¸ÃƒÂ¼k skor dÃƒÂ¶ndÃƒÂ¼rmeli', () => {
    const market = {
      totalVolume: 100,
      bidAskSpread: 0.5,
      activeTraders: 2,
      lastTradeTime: new Date(Date.now() - 86400000) // 1 gÃƒÂ¼n ÃƒÂ¶nce
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeLessThan(30)
    expect(score).toBeGreaterThanOrEqual(0)
  })

  it('edge case\'i idare etmeli: sÃ„Â±fÃ„Â±r hacim', () => {
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

## AdÃ„Â±m 3: Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r - BaÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±Ã„Å¸Ã„Â± DoÃ„Å¸rula

```bash
npm test lib/liquidity.test.ts

FAIL lib/liquidity.test.ts
  Ã¢Å“â€¢ should return high score for liquid market (2 ms)
    Error: Not implemented

1 test failed, 0 passed
```

PASS: Testler beklendiÃ„Å¸i gibi baÃ…Å¸arÃ„Â±sÃ„Â±z. Uygulamaya hazÃ„Â±r.

## AdÃ„Â±m 4: Minimal Kod Uygula (GREEN)

```typescript
// lib/liquidity.ts
export function calculateLiquidityScore(market: MarketData): number {
  // SÃ„Â±fÃ„Â±r hacim edge case'ini idare et
  if (market.totalVolume === 0) {
    return 0
  }

  // BileÃ…Å¸en skorlarÃ„Â±nÃ„Â± hesapla (0-100 ÃƒÂ¶lÃƒÂ§eÃ„Å¸i)
  const volumeScore = Math.min(market.totalVolume / 1000, 100)
  const spreadScore = Math.max(100 - (market.bidAskSpread * 1000), 0)
  const traderScore = Math.min(market.activeTraders / 10, 100)

  // Son aktivite bonusu
  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(100 - (hoursSinceLastTrade * 10), 0)

  // AÃ„Å¸Ã„Â±rlÃ„Â±klÃ„Â± ortalama
  const score = (
    volumeScore * 0.4 +
    spreadScore * 0.3 +
    traderScore * 0.2 +
    recencyScore * 0.1
  )

  return Math.min(Math.max(score, 0), 100) // 0-100 arasÃ„Â± sÃ„Â±nÃ„Â±rla
}
```

## AdÃ„Â±m 5: Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r - BaÃ…Å¸arÃ„Â±yÃ„Â± DoÃ„Å¸rula

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: TÃƒÂ¼m testler geÃƒÂ§iyor!

## AdÃ„Â±m 6: Refactor Et (IYILEÃ…Å¾TIR)

```typescript
// lib/liquidity.ts - Sabitler ve daha iyi okunabilirlik ile refactor edildi
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

## AdÃ„Â±m 7: Testlerin Hala GeÃƒÂ§tiÃ„Å¸ini DoÃ„Å¸rula

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Refactoring tamamlandÃ„Â±, testler hala geÃƒÂ§iyor!

## AdÃ„Â±m 8: Kapsama OranÃ„Â±nÃ„Â± Kontrol Et

```bash
npm test -- --coverage lib/liquidity.test.ts

File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
liquidity.ts   |   100   |   100    |   100   |   100

Coverage: 100% PASS: (Hedef: 80%)
```

PASS: TDD oturumu tamamlandÃ„Â±!
```

## TDD En Ã„Â°yi UygulamalarÃ„Â±

**YAPIN:**
- PASS: Herhangi bir uygulamadan Ãƒâ€“NCE testi yazÃ„Â±n
- PASS: Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n ve uygulamadan ÃƒÂ¶nce baÃ…Å¸arÃ„Â±sÃ„Â±z olduklarÃ„Â±nÃ„Â± doÃ„Å¸rulayÃ„Â±n
- PASS: Testleri geÃƒÂ§irmek iÃƒÂ§in minimal kod yazÃ„Â±n
- PASS: Testler yeÃ…Å¸il olduktan sonra refactor edin
- PASS: Edge case'leri ve hata senaryolarÃ„Â±nÃ„Â± ekleyin
- PASS: %80+ kapsama hedefleyin (kritik kod iÃƒÂ§in %100)

**YAPMAYIN:**
- FAIL: Testlerden ÃƒÂ¶nce uygulama yazmayÃ„Â±n
- FAIL: Her deÃ„Å¸iÃ…Å¸iklikten sonra testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmayÃ„Â± atlamayÃ„Â±n
- FAIL: AynÃ„Â± anda ÃƒÂ§ok fazla kod yazmayÃ„Â±n
- FAIL: BaÃ…Å¸arÃ„Â±sÃ„Â±z testleri gÃƒÂ¶rmezden gelmeyin
- FAIL: Uygulama detaylarÃ„Â±nÃ„Â± test etmeyin (davranÃ„Â±Ã…Å¸Ã„Â± test edin)
- FAIL: Her Ã…Å¸eyi mock'lamayÃ„Â±n (integration testleri tercih edin)

## Dahil Edilecek Test TÃƒÂ¼rleri

**Unit Tests** (Fonksiyon seviyesi):
- Happy path senaryolarÃ„Â±
- Edge case'ler (boÃ…Å¸, null, maksimum deÃ„Å¸erler)
- Hata koÃ…Å¸ullarÃ„Â±
- SÃ„Â±nÃ„Â±r deÃ„Å¸erleri

**Integration Tests** (Component seviyesi):
- API endpoint'leri
- Database operasyonlarÃ„Â±
- DÃ„Â±Ã…Å¸ servis ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â±
- Hook'lu React componentleri

**E2E Tests** (`/e2e` komutunu kullanÃ„Â±n):
- Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â±
- Ãƒâ€¡ok adÃ„Â±mlÃ„Â± sÃƒÂ¼reÃƒÂ§ler
- Full stack entegrasyon

## Kapsama Gereksinimleri

- **Minimum %80** tÃƒÂ¼m kod iÃƒÂ§in
- **%100 gerekli**:
  - Finansal hesaplamalar
  - Kimlik doÃ„Å¸rulama mantÃ„Â±Ã„Å¸Ã„Â±
  - GÃƒÂ¼venlik aÃƒÂ§Ã„Â±sÃ„Â±ndan kritik kod
  - Temel iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â±

## Ãƒâ€“nemli Notlar

**ZORUNLU**: Testler uygulamadan Ãƒâ€“NCE yazÃ„Â±lmalÃ„Â±dÃ„Â±r. TDD dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼:

1. **RED** - BaÃ…Å¸arÃ„Â±sÃ„Â±z test yaz
2. **GREEN** - GeÃƒÂ§mek iÃƒÂ§in uygula
3. **REFACTOR** - Kodu iyileÃ…Å¸tir

RED aÃ…Å¸amasÃ„Â±nÃ„Â± asla atlamayÃ„Â±n. Testlerden ÃƒÂ¶nce asla kod yazmayÃ„Â±n.

## DiÃ„Å¸er Komutlarla Entegrasyon

- Ne inÃ…Å¸a edileceÃ„Å¸ini anlamak iÃƒÂ§in ÃƒÂ¶nce `/plan` kullanÃ„Â±n
- Testlerle uygulamak iÃƒÂ§in `/tdd` kullanÃ„Â±n
- Build hatalarÃ„Â± oluÃ…Å¸ursa `/build-fix` kullanÃ„Â±n
- UygulamayÃ„Â± gÃƒÂ¶zden geÃƒÂ§irmek iÃƒÂ§in `/code-review` kullanÃ„Â±n
- Kapsama oranÃ„Â±nÃ„Â± doÃ„Å¸rulamak iÃƒÂ§in `/test-coverage` kullanÃ„Â±n

## Ã„Â°lgili Agent'lar

Bu komut, ECC tarafÃ„Â±ndan saÃ„Å¸lanan `tdd-guide` agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

Ã„Â°lgili `tdd-workflow` skill'i de ECC ile birlikte gelir.

Manuel kurulumlar iÃƒÂ§in, kaynak dosyalar Ã…Å¸urada bulunur:
- `agents/tdd-guide.md`
- `skills/tdd-workflow/SKILL.md`
