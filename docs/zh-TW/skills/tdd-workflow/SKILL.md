---
name: tdd-workflow
description: Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.
---

# Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

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


Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã§Â¢ÂºÃ¤Â¿ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©â€“â€¹Ã§â„¢Â¼Ã©ÂÂµÃ¥Â¾Âª TDD Ã¥Å½Å¸Ã¥â€°â€¡Ã¯Â¼Å’Ã¤Â¸Â¦Ã¥â€¦Â·Ã¦Å“â€°Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¥â€¢Å¸Ã§â€Â¨

- Ã¦â€™Â°Ã¥Â¯Â«Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦Ë†â€“Ã¥Å Å¸Ã¨Æ’Â½Ã¦â‚¬Â§Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
- Ã¤Â¿Â®Ã¥Â¾Â© Bug Ã¦Ë†â€“Ã¥â€¢ÂÃ©Â¡Å’
- Ã©â€¡ÂÃ¦Â§â€¹Ã§ÂÂ¾Ã¦Å“â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
- Ã¦â€“Â°Ã¥Â¢Å¾ API Ã§Â«Â¯Ã©Â»Å¾
- Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã¥â€¦Æ’Ã¤Â»Â¶

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Å½Å¸Ã¥â€°â€¡

### 1. Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€¦Ë†Ã¦â€“Â¼Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
Ã§Â¸Â½Ã¦ËœÂ¯Ã¥â€¦Ë†Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â½Â¿Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã£â‚¬â€š

### 2. Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¨Â¦ÂÃ¦Â±â€š
- Ã¦Å“â‚¬Ã¤Â½Å½ 80% Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Ë†Ã¥â€“Â®Ã¥â€¦Æ’ + Ã¦â€¢Â´Ã¥ÂË† + E2EÃ¯Â¼â€°
- Ã¦Â¶ÂµÃ¨â€œâ€¹Ã¦â€°â‚¬Ã¦Å“â€°Ã©â€šÅ Ã§â€¢Å’Ã¦Â¡Ë†Ã¤Â¾â€¹
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å’Â¯Ã¨ÂªÂ¤Ã¦Æ’â€¦Ã¥Â¢Æ’
- Ã©Â©â€”Ã¨Â­â€°Ã©â€šÅ Ã§â€¢Å’Ã¦Â¢ÂÃ¤Â»Â¶

### 3. Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â¡Å¾Ã¥Å¾â€¹

#### Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã¥â€¡Â½Ã¥Â¼ÂÃ¥â€™Å’Ã¥Â·Â¥Ã¥â€¦Â·
- Ã¥â€¦Æ’Ã¤Â»Â¶Ã©â€šÂÃ¨Â¼Â¯
- Ã§Â´â€Ã¥â€¡Â½Ã¥Â¼Â
- Ã¨Â¼â€Ã¥Å Â©Ã¥â€¡Â½Ã¥Â¼ÂÃ¥â€™Å’Ã¥Â·Â¥Ã¥â€¦Â·

#### Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦
- API Ã§Â«Â¯Ã©Â»Å¾
- Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€œÂÃ¤Â½Å“
- Ã¦Å“ÂÃ¥â€¹â„¢Ã¤Âºâ€™Ã¥â€¹â€¢
- Ã¥Â¤â€“Ã©Æ’Â¨ API Ã¥â€˜Â¼Ã¥ÂÂ«

#### E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†PlaywrightÃ¯Â¼â€°
- Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹
- Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å’â€“
- UI Ã¤Âºâ€™Ã¥â€¹â€¢

## TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¦Â­Â¥Ã©Â©Å¸

### Ã¦Â­Â¥Ã©Â©Å¸ 1Ã¯Â¼Å¡Ã¦â€™Â°Ã¥Â¯Â«Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”â€¦Ã§Â¨â€¹
```
Ã¨ÂºÂ«Ã§â€šÂº [Ã¨Â§â€™Ã¨â€°Â²]Ã¯Â¼Å’Ã¦Ë†â€˜Ã¦Æ’Â³Ã¨Â¦Â [Ã¥â€¹â€¢Ã¤Â½Å“]Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿ [Ã¥Â¥Â½Ã¨â„¢â€¢]

Ã§Â¯â€žÃ¤Â¾â€¹Ã¯Â¼Å¡
Ã¨ÂºÂ«Ã§â€šÂºÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¯Â¼Å’Ã¦Ë†â€˜Ã¦Æ’Â³Ã¨Â¦ÂÃ¨ÂªÅ¾Ã¦â€žÂÃ¦ÂÅ“Ã¥Â°â€¹Ã¥Â¸â€šÃ¥Â Â´Ã¯Â¼Å’
Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥ÂÂ³Ã¤Â½Â¿Ã¦Â²â€™Ã¦Å“â€°Ã§Â²Â¾Ã§Â¢ÂºÃ©â€”Å“Ã©ÂÂµÃ¥Â­â€”Ã¤Â¹Å¸Ã¨Æ’Â½Ã¦â€°Â¾Ã¥Ë†Â°Ã§â€ºÂ¸Ã©â€”Å“Ã¥Â¸â€šÃ¥Â Â´Ã£â‚¬â€š
```

### Ã¦Â­Â¥Ã©Â©Å¸ 2Ã¯Â¼Å¡Ã§â€Â¢Ã§â€Å¸Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¡Ë†Ã¤Â¾â€¹
Ã§â€šÂºÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”â€¦Ã§Â¨â€¹Ã¥Â»ÂºÃ§Â«â€¹Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¡Ë†Ã¤Â¾â€¹Ã¯Â¼Å¡

```typescript
describe('Semantic Search', () => {
  it('returns relevant markets for query', async () => {
    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¯Â¦Ã¤Â½Å“
  })

  it('handles empty query gracefully', async () => {
    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â€šÅ Ã§â€¢Å’Ã¦Â¡Ë†Ã¤Â¾â€¹
  })

  it('falls back to substring search when Redis unavailable', async () => {
    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€ºÅ¾Ã©â‚¬â‚¬Ã¨Â¡Å’Ã§â€šÂº
  })

  it('sorts results by similarity score', async () => {
    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Å½â€™Ã¥ÂºÂÃ©â€šÂÃ¨Â¼Â¯
  })
})
```

### Ã¦Â­Â¥Ã©Â©Å¸ 3Ã¯Â¼Å¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Ã¦â€¡â€°Ã¨Â©Â²Ã¥Â¤Â±Ã¦â€¢â€”Ã¯Â¼â€°
```bash
npm test
# Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦â€¡â€°Ã¨Â©Â²Ã¥Â¤Â±Ã¦â€¢â€” - Ã¦Ë†â€˜Ã¥â‚¬â€˜Ã©â€šâ€žÃ¦Â²â€™Ã¥Â¯Â¦Ã¤Â½Å“
```

### Ã¦Â­Â¥Ã©Â©Å¸ 4Ã¯Â¼Å¡Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
Ã¦â€™Â°Ã¥Â¯Â«Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â½Â¿Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Å¡

```typescript
// Ã§â€Â±Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¼â€¢Ã¥Â°Å½Ã§Å¡â€žÃ¥Â¯Â¦Ã¤Â½Å“
export async function searchMarkets(query: string) {
  // Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Å“Â¨Ã¦Â­Â¤
}
```

### Ã¦Â­Â¥Ã©Â©Å¸ 5Ã¯Â¼Å¡Ã¥â€ ÂÃ¦Â¬Â¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
```bash
npm test
# Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂÂ¾Ã¥Å“Â¨Ã¦â€¡â€°Ã¨Â©Â²Ã©â‚¬Å¡Ã©ÂÅ½
```

### Ã¦Â­Â¥Ã©Â©Å¸ 6Ã¯Â¼Å¡Ã©â€¡ÂÃ¦Â§â€¹
Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã§Å¡â€žÃ¥ÂÅ’Ã¦â„¢â€šÃ¦â€Â¹Ã¥â€“â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¯Â¼Å¡
- Ã§Â§Â»Ã©â„¢Â¤Ã©â€¡ÂÃ¨Â¤â€¡
- Ã¦â€Â¹Ã¥â€“â€žÃ¥â€˜Â½Ã¥ÂÂ
- Ã¥â€žÂªÃ¥Å’â€“Ã¦â€¢Ë†Ã¨Æ’Â½
- Ã¥Â¢Å¾Ã¥Â¼Â·Ã¥ÂÂ¯Ã¨Â®â‚¬Ã¦â‚¬Â§

### Ã¦Â­Â¥Ã©Â©Å¸ 7Ã¯Â¼Å¡Ã©Â©â€”Ã¨Â­â€°Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
```bash
npm run test:coverage
# Ã©Â©â€”Ã¨Â­â€°Ã©Ââ€Ã¥Ë†Â° 80%+ Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Jest/VitestÃ¯Â¼â€°
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### API Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼Â
```typescript
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('GET /api/markets', () => {
  it('returns markets successfully', async () => {
    const request = new NextRequest('http://localhost/api/markets')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('validates query parameters', async () => {
    const request = new NextRequest('http://localhost/api/markets?limit=invalid')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  it('handles database errors gracefully', async () => {
    // Mock Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¥Â¤Â±Ã¦â€¢â€”
    const request = new NextRequest('http://localhost/api/markets')
    // Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
  })
})
```

### E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†PlaywrightÃ¯Â¼â€°
```typescript
import { test, expect } from '@playwright/test'

test('user can search and filter markets', async ({ page }) => {
  // Ã¥Â°Å½Ã¨Ë†ÂªÃ¥Ë†Â°Ã¥Â¸â€šÃ¥Â Â´Ã©Â ÂÃ©ÂÂ¢
  await page.goto('/')
  await page.click('a[href="/markets"]')

  // Ã©Â©â€”Ã¨Â­â€°Ã©Â ÂÃ©ÂÂ¢Ã¨Â¼â€°Ã¥â€¦Â¥
  await expect(page.locator('h1')).toContainText('Markets')

  // Ã¦ÂÅ“Ã¥Â°â€¹Ã¥Â¸â€šÃ¥Â Â´
  await page.fill('input[placeholder="Search markets"]', 'election')

  // Ã§Â­â€°Ã¥Â¾â€¦ debounce Ã¥â€™Å’Ã§ÂµÂÃ¦Å¾Å“
  await page.waitForTimeout(600)

  // Ã©Â©â€”Ã¨Â­â€°Ã¦ÂÅ“Ã¥Â°â€¹Ã§ÂµÂÃ¦Å¾Å“Ã©Â¡Â¯Ã§Â¤Âº
  const results = page.locator('[data-testid="market-card"]')
  await expect(results).toHaveCount(5, { timeout: 5000 })

  // Ã©Â©â€”Ã¨Â­â€°Ã§ÂµÂÃ¦Å¾Å“Ã¥Å’â€¦Ã¥ÂÂ«Ã¦ÂÅ“Ã¥Â°â€¹Ã¨Â©Å¾
  const firstResult = results.first()
  await expect(firstResult).toContainText('election', { ignoreCase: true })

  // Ã¤Â¾ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã§Â¯Â©Ã©ÂÂ¸
  await page.click('button:has-text("Active")')

  // Ã©Â©â€”Ã¨Â­â€°Ã§Â¯Â©Ã©ÂÂ¸Ã§ÂµÂÃ¦Å¾Å“
  await expect(results).toHaveCount(3)
})

test('user can create a new market', async ({ page }) => {
  // Ã¥â€¦Ë†Ã§â„¢Â»Ã¥â€¦Â¥
  await page.goto('/creator-dashboard')

  // Ã¥Â¡Â«Ã¥Â¯Â«Ã¥Â¸â€šÃ¥Â Â´Ã¥Â»ÂºÃ§Â«â€¹Ã¨Â¡Â¨Ã¥â€“Â®
  await page.fill('input[name="name"]', 'Test Market')
  await page.fill('textarea[name="description"]', 'Test description')
  await page.fill('input[name="endDate"]', '2025-12-31')

  // Ã¦ÂÂÃ¤ÂºÂ¤Ã¨Â¡Â¨Ã¥â€“Â®
  await page.click('button[type="submit"]')

  // Ã©Â©â€”Ã¨Â­â€°Ã¦Ë†ÂÃ¥Å Å¸Ã¨Â¨Å Ã¦ÂÂ¯
  await expect(page.locator('text=Market created successfully')).toBeVisible()

  // Ã©Â©â€”Ã¨Â­â€°Ã©â€¡ÂÃ¥Â°Å½Ã¥Ââ€˜Ã¥Ë†Â°Ã¥Â¸â€šÃ¥Â Â´Ã©Â ÂÃ©ÂÂ¢
  await expect(page).toHaveURL(/\/markets\/test-market/)
})
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†Ã§Âµâ€žÃ§Â¹â€

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button.tsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button.test.tsx          # Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Button.stories.tsx       # Storybook
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard.tsx
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard.test.tsx
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ markets/
Ã¢â€â€š           Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ route.ts
Ã¢â€â€š           Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ route.test.ts         # Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ e2e/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ markets.spec.ts               # E2E Ã¦Â¸Â¬Ã¨Â©Â¦
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ trading.spec.ts
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ auth.spec.ts
```

## Mock Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥â€¹â„¢

### Supabase Mock
```typescript
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({
          data: [{ id: 1, name: 'Test Market' }],
          error: null
        }))
      }))
    }))
  }
}))
```

### Redis Mock
```typescript
jest.mock('@/lib/redis', () => ({
  searchMarketsByVector: jest.fn(() => Promise.resolve([
    { slug: 'test-market', similarity_score: 0.95 }
  ])),
  checkRedisHealth: jest.fn(() => Promise.resolve({ connected: true }))
}))
```

### OpenAI Mock
```typescript
jest.mock('@/lib/openai', () => ({
  generateEmbedding: jest.fn(() => Promise.resolve(
    new Array(1536).fill(0.1) // Mock 1536 Ã§Â¶Â­Ã¥ÂµÅ’Ã¥â€¦Â¥Ã¥Ââ€˜Ã©â€¡Â
  ))
}))
```

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã©Â©â€”Ã¨Â­â€°

### Ã¥Å¸Â·Ã¨Â¡Å’Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¥Â Â±Ã¥â€˜Å 
```bash
npm run test:coverage
```

### Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã©â€“â‚¬Ã¦ÂªÂ»
```json
{
  "jest": {
    "coverageThresholds": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å’Â¯Ã¨ÂªÂ¤Ã©ÂÂ¿Ã¥â€¦Â

### FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â´Â°Ã§Â¯â‚¬
```typescript
// Ã¤Â¸ÂÃ¨Â¦ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã¥â€¦Â§Ã©Æ’Â¨Ã§â€¹â‚¬Ã¦â€¦â€¹
expect(component.state.count).toBe(5)
```

### PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥ÂÂ¯Ã¨Â¦â€¹Ã¨Â¡Å’Ã§â€šÂº
```typescript
// Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã§Å“â€¹Ã¥Ë†Â°Ã§Å¡â€žÃ¥â€¦Â§Ã¥Â®Â¹
expect(screen.getByText('Count: 5')).toBeInTheDocument()
```

### FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¨â€žâ€ Ã¥Â¼Â±Ã§Å¡â€žÃ©ÂÂ¸Ã¦â€œâ€¡Ã¥â„¢Â¨
```typescript
// Ã¥Â®Â¹Ã¦Ëœâ€œÃ¥Â£Å¾Ã¦Å½â€°
await page.click('.css-class-xyz')
```

### PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¨ÂªÅ¾Ã¦â€žÂÃ©ÂÂ¸Ã¦â€œâ€¡Ã¥â„¢Â¨
```typescript
// Ã¥Â°ÂÃ¨Â®Å Ã¦â€ºÂ´Ã¦Å“â€°Ã¥Â½Ë†Ã¦â‚¬Â§
await page.click('button:has-text("Submit")')
await page.click('[data-testid="submit-button"]')
```

### FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã§â€žÂ¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å¡â€Ã©â€ºÂ¢
```typescript
// Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Âºâ€™Ã§â€ºÂ¸Ã¤Â¾ÂÃ¨Â³Â´
test('creates user', () => { /* ... */ })
test('updates same user', () => { /* Ã¤Â¾ÂÃ¨Â³Â´Ã¥â€°ÂÃ¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¸Â¬Ã¨Â©Â¦ */ })
```

### PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã§ÂÂ¨Ã§Â«â€¹Ã¦Â¸Â¬Ã¨Â©Â¦
```typescript
// Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¨Â­Ã§Â½Â®Ã¨â€¡ÂªÃ¥Â·Â±Ã§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢
test('creates user', () => {
  const user = createTestUser()
  // Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â€šÂÃ¨Â¼Â¯
})

test('updates user', () => {
  const user = createTestUser()
  // Ã¦â€ºÂ´Ã¦â€“Â°Ã©â€šÂÃ¨Â¼Â¯
})
```

## Ã¦Å’ÂÃ§ÂºÅ’Ã¦Â¸Â¬Ã¨Â©Â¦

### Ã©â€“â€¹Ã§â„¢Â¼Ã¦Å“Å¸Ã©â€“â€œÃ§Å¡â€ž Watch Ã¦Â¨Â¡Ã¥Â¼Â
```bash
npm test -- --watch
# Ã¦Âªâ€Ã¦Â¡Ë†Ã¨Â®Å Ã¦â€ºÂ´Ã¦â„¢â€šÃ¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
```

### Pre-Commit Hook
```bash
# Ã¦Â¯ÂÃ¦Â¬Â¡ commit Ã¥â€°ÂÃ¥Å¸Â·Ã¨Â¡Å’
npm test && npm run lint
```

### CI/CD Ã¦â€¢Â´Ã¥ÂË†
```yaml
# GitHub Actions
- name: Run Tests
  run: npm test -- --coverage
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

1. **Ã¥â€¦Ë†Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã§Â¸Â½Ã¦ËœÂ¯ TDD
2. **Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦â€“Â·Ã¨Â¨â‚¬** - Ã¥Â°Ë†Ã¦Â³Â¨Ã¥â€“Â®Ã¤Â¸â‚¬Ã¨Â¡Å’Ã§â€šÂº
3. **Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥ÂÂÃ§Â¨Â±** - Ã¨Â§Â£Ã©â€¡â€¹Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€¦Â§Ã¥Â®Â¹
4. **Arrange-Act-Assert** - Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦Â§â€¹
5. **Mock Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Â³Â´** - Ã©Å¡â€Ã©â€ºÂ¢Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦
6. **Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â€šÅ Ã§â€¢Å’Ã¦Â¡Ë†Ã¤Â¾â€¹** - NullÃ£â‚¬ÂundefinedÃ£â‚¬ÂÃ§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂÃ¥Â¤Â§Ã¥â‚¬Â¼
7. **Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â·Â¯Ã¥Â¾â€˜** - Ã¤Â¸ÂÃ¥ÂÂªÃ¦ËœÂ¯Ã¥Â¿Â«Ã¦Â¨â€šÃ¨Â·Â¯Ã¥Â¾â€˜
8. **Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¿Â«Ã©â‚¬Å¸** - Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¯ÂÃ¥â‚¬â€¹ < 50ms
9. **Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¾Å’Ã¦Â¸â€¦Ã§Ââ€ ** - Ã§â€žÂ¡Ã¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨
10. **Ã¦ÂªÂ¢Ã¨Â¦â€“Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¥Â Â±Ã¥â€˜Å ** - Ã¨Â­ËœÃ¥Ë†Â¥Ã§Â¼ÂºÃ¥ÂÂ£

## Ã¦Ë†ÂÃ¥Å Å¸Ã¦Å’â€¡Ã¦Â¨â„¢

- Ã©Ââ€Ã¥Ë†Â° 80%+ Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡
- Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†Ã§Â¶Â Ã¨â€°Â²Ã¯Â¼â€°
- Ã§â€žÂ¡Ã¨Â·Â³Ã©ÂÅ½Ã¦Ë†â€“Ã¥ÂÅ“Ã§â€Â¨Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
- Ã¥Â¿Â«Ã©â‚¬Å¸Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Ë†Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦ < 30sÃ¯Â¼â€°
- E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¶ÂµÃ¨â€œâ€¹Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Å“Â¨Ã§â€Å¸Ã§â€Â¢Ã¥â€°ÂÃ¦Ââ€¢Ã¦Ââ€° Bug

---

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥ÂÂ¯Ã©ÂÂ¸Ã§Å¡â€žÃ£â‚¬â€šÃ¥Â®Æ’Ã¥â‚¬â€˜Ã¦ËœÂ¯Ã¥Â¯Â¦Ã§ÂÂ¾Ã¨â€¡ÂªÃ¤Â¿Â¡Ã©â€¡ÂÃ¦Â§â€¹Ã£â‚¬ÂÃ¥Â¿Â«Ã©â‚¬Å¸Ã©â€“â€¹Ã§â„¢Â¼Ã¥â€™Å’Ã§â€Å¸Ã§â€Â¢Ã¥ÂÂ¯Ã©ÂÂ Ã¦â‚¬Â§Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã§Â¶Â²Ã£â‚¬â€š
