---
description: Ã¤Â½Â¿Ã§â€Â¨ Playwright Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¹Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€šÃ¥Ë†â€ºÃ¥Â»ÂºÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€”â€¦Ã§Â¨â€¹Ã£â‚¬ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¦Ââ€¢Ã¨Å½Â·Ã¦Ë†ÂªÃ¥â€ºÂ¾/Ã¨Â§â€ Ã©Â¢â€˜/Ã¨Â·Å¸Ã¨Â¸ÂªÃ¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸Å Ã¤Â¼Â Ã¥Â·Â¥Ã¤Â»Â¶Ã£â‚¬â€š
---

# E2E Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **e2e-runner** Ã¤Â»Â£Ã§Ââ€ Ã¦ÂÂ¥Ã¤Â½Â¿Ã§â€Â¨ Playwright Ã§â€Å¸Ã¦Ë†ÂÃ£â‚¬ÂÃ§Â»Â´Ã¦Å Â¤Ã¥â€™Å’Ã¦â€°Â§Ã¨Â¡Å’Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€”â€¦Ã§Â¨â€¹** - Ã¤Â¸ÂºÃ§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹Ã¥Ë†â€ºÃ¥Â»Âº Playwright Ã¦Âµâ€¹Ã¨Â¯â€¢
2. **Ã¨Â¿ÂÃ¨Â¡Å’ E2E Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã¨Â·Â¨Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
3. **Ã¦Ââ€¢Ã¨Å½Â·Ã¥Â·Â¥Ã¤Â»Â¶** - Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã§Å¡â€žÃ¦Ë†ÂªÃ¥â€ºÂ¾Ã£â‚¬ÂÃ¨Â§â€ Ã©Â¢â€˜Ã£â‚¬ÂÃ¨Â·Å¸Ã¨Â¸Âª
4. **Ã¤Â¸Å Ã¤Â¼Â Ã§Â»â€œÃ¦Å¾Å“** - HTML Ã¦Å Â¥Ã¥â€˜Å Ã¥â€™Å’ JUnit XML
5. **Ã¨Â¯â€ Ã¥Ë†Â«Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã©Å¡â€Ã§Â¦Â»Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/e2e`Ã¯Â¼Å¡

* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦â€”â€¦Ã§Â¨â€¹Ã¯Â¼Ë†Ã§â„¢Â»Ã¥Â½â€¢Ã£â‚¬ÂÃ¤ÂºÂ¤Ã¦Ëœâ€œÃ£â‚¬ÂÃ¦â€Â¯Ã¤Â»ËœÃ¯Â¼â€°
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤Å¡Ã¦Â­Â¥Ã©ÂªÂ¤Ã¦ÂµÂÃ§Â¨â€¹Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¥Â·Â¥Ã¤Â½Å“
* Ã¦Âµâ€¹Ã¨Â¯â€¢ UI Ã¤ÂºÂ¤Ã¤Âºâ€™Ã¥â€™Å’Ã¥Â¯Â¼Ã¨Ë†Âª
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€°ÂÃ§Â«Â¯Ã¥â€™Å’Ã¥ÂÅ½Ã§Â«Â¯Ã¤Â¹â€¹Ã©â€”Â´Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â
* Ã¤Â¸ÂºÃ§â€Å¸Ã¤ÂºÂ§Ã©Æ’Â¨Ã§Â½Â²Ã¥ÂÅ¡Ã¥â€¡â€ Ã¥Â¤â€¡

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

e2e-runner Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¯Â¼Å¡

1. **Ã¥Ë†â€ Ã¦Å¾ÂÃ§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹**Ã¥Â¹Â¶Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å“ÂºÃ¦â„¢Â¯
2. **Ã¤Â½Â¿Ã§â€Â¨Ã©Â¡ÂµÃ©ÂÂ¢Ã¥Â¯Â¹Ã¨Â±Â¡Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦Â¨Â¡Ã¥Â¼ÂÃ§â€Å¸Ã¦Ë†Â Playwright Ã¦Âµâ€¹Ã¨Â¯â€¢**
3. **Ã¨Â·Â¨Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¯Â¼Ë†ChromeÃ£â‚¬ÂFirefoxÃ£â‚¬ÂSafariÃ¯Â¼â€°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**
4. **Ã¦Ââ€¢Ã¨Å½Â·Ã¥Â¤Â±Ã¨Â´Â¥**Ã¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬Ã¦Ë†ÂªÃ¥â€ºÂ¾Ã£â‚¬ÂÃ¨Â§â€ Ã©Â¢â€˜Ã¥â€™Å’Ã¨Â·Å¸Ã¨Â¸Âª
5. **Ã§â€Å¸Ã¦Ë†ÂÃ¥Å’â€¦Ã¥ÂÂ«Ã§Â»â€œÃ¦Å¾Å“Ã¥â€™Å’Ã¥Â·Â¥Ã¤Â»Â¶Ã§Å¡â€žÃ¦Å Â¥Ã¥â€˜Å **
6. **Ã¨Â¯â€ Ã¥Ë†Â«Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¥Â¹Â¶Ã¦Å½Â¨Ã¨ÂÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````
Ã§â€Â¨Ã¦Ë†Â·Ã¯Â¼Å¡/e2e Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¸â€šÃ¥Å“ÂºÃ¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã¦Å¸Â¥Ã§Å“â€¹Ã¦ÂµÂÃ§Â¨â€¹

Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Ë†e2e-runnerÃ¯Â¼â€°Ã¯Â¼Å¡
# E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼Å¡Ã¥Â¸â€šÃ¥Å“ÂºÃ¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã¦Å¸Â¥Ã§Å“â€¹Ã¦ÂµÂÃ§Â¨â€¹

## Ã¥Â·Â²Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å“ÂºÃ¦â„¢Â¯

**Ã§â€Â¨Ã¦Ë†Â·Ã¦â€”â€¦Ã§Â¨â€¹Ã¯Â¼Å¡** Ã¥Â¸â€šÃ¥Å“ÂºÃ¦ÂÅ“Ã§Â´Â¢ Ã¢â€ â€™ Ã¦Å¸Â¥Ã§Å“â€¹Ã§Â»â€œÃ¦Å¾Å“ Ã¢â€ â€™ Ã§â€šÂ¹Ã¥â€¡Â»Ã¥Â¸â€šÃ¥Å“Âº Ã¢â€ â€™ Ã¦Å¸Â¥Ã§Å“â€¹Ã¨Â¯Â¦Ã¦Æ’â€¦

**Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Å¡**
1. Ã¥Â¯Â¼Ã¨Ë†ÂªÃ¨â€¡Â³Ã¥Â¸â€šÃ¥Å“ÂºÃ©Â¡ÂµÃ©ÂÂ¢
2. Ã¦â€°Â§Ã¨Â¡Å’Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢
3. Ã©ÂªÅ’Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“
4. Ã§â€šÂ¹Ã¥â€¡Â»Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§Â»â€œÃ¦Å¾Å“
5. Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¸â€šÃ¥Å“ÂºÃ¨Â¯Â¦Ã¦Æ’â€¦Ã©Â¡ÂµÃ©ÂÂ¢Ã¥Å Â Ã¨Â½Â½
6. Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€ºÂ¾Ã¨Â¡Â¨Ã¦Â¸Â²Ã¦Å¸â€œ

## Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â»Â£Ã§Â Â

```typescript
// tests/e2e/markets/search-and-view.spec.ts
import { test, expect } from '@playwright/test'
import { MarketsPage } from '../../pages/MarketsPage'
import { MarketDetailsPage } from '../../pages/MarketDetailsPage'

test.describe('Market Search and View Flow', () => {
  test('user can search markets and view details', async ({ page }) => {
    // 1. Navigate to markets page
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Verify page loaded
    await expect(page).toHaveTitle(/Markets/)
    await expect(page.locator('h1')).toContainText('Markets')

    // 2. Perform semantic search
    await marketsPage.searchMarkets('election')

    // Wait for API response
    await page.waitForResponse(resp =>
      resp.url().includes('/api/markets/search') && resp.status() === 200
    )

    // 3. Verify search results
    const marketCards = marketsPage.marketCards
    await expect(marketCards.first()).toBeVisible()
    const resultCount = await marketCards.count()
    expect(resultCount).toBeGreaterThan(0)

    // Take screenshot of search results
    await page.screenshot({ path: 'artifacts/search-results.png' })

    // 4. Click on first result
    const firstMarketTitle = await marketCards.first().textContent()
    await marketCards.first().click()

    // 5. Verify market details page loads
    await expect(page).toHaveURL(/\/markets\/[a-z0-9-]+/)

    const detailsPage = new MarketDetailsPage(page)
    await expect(detailsPage.marketName).toBeVisible()
    await expect(detailsPage.marketDescription).toBeVisible()

    // 6. Verify chart renders
    await expect(detailsPage.priceChart).toBeVisible()

    // Verify market name matches
    const detailsTitle = await detailsPage.marketName.textContent()
    expect(detailsTitle?.toLowerCase()).toContain(
      firstMarketTitle?.toLowerCase().substring(0, 20) || ''
    )

    // Take screenshot of market details
    await page.screenshot({ path: 'artifacts/market-details.png' })
  })

  test('search with no results shows empty state', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Search for non-existent market
    await marketsPage.searchMarkets('xyznonexistentmarket123456')

    // Verify empty state
    await expect(page.locator('[data-testid="no-results"]')).toBeVisible()
    await expect(page.locator('[data-testid="no-results"]')).toContainText(
      /no.*results|no.*markets/i
    )

    const marketCount = await marketsPage.marketCards.count()
    expect(marketCount).toBe(0)
  })

  test('can clear search and see all markets again', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Initial market count
    const initialCount = await marketsPage.marketCards.count()

    // Perform search
    await marketsPage.searchMarkets('trump')
    await page.waitForLoadState('networkidle')

    // Verify filtered results
    const filteredCount = await marketsPage.marketCards.count()
    expect(filteredCount).toBeLessThan(initialCount)

    // Clear search
    await marketsPage.searchInput.clear()
    await page.waitForLoadState('networkidle')

    // Verify all markets shown again
    const finalCount = await marketsPage.marketCards.count()
    expect(finalCount).toBe(initialCount)
  })
})

````

## Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

```bash
# Run the generated test
npx playwright test tests/e2e/markets/search-and-view.spec.ts

Running 3 tests using 3 workers

  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:5:3 Ã¢â‚¬Âº user can search markets and view details (4.2s)
  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:52:3 Ã¢â‚¬Âº search with no results shows empty state (1.8s)
  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:67:3 Ã¢â‚¬Âº can clear search and see all markets again (2.9s)

  3 passed (9.1s)

Artifacts generated:
- artifacts/search-results.png
- artifacts/market-details.png
- playwright-report/index.html
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å Â¥Ã¥â€˜Å 

```
Ã¢â€¢â€Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢â€”
Ã¢â€¢â€˜                    E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€œÃ¦Å¾Å“                          Ã¢â€¢â€˜
Ã¢â€¢Â Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â£
Ã¢â€¢â€˜ Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡     PASS: Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡                              Ã¢â€¢â€˜
Ã¢â€¢â€˜ Ã¦â‚¬Â»Ã¨Â®Â¡Ã¯Â¼Å¡      3 Ã©Â¡Â¹Ã¦Âµâ€¹Ã¨Â¯â€¢                                          Ã¢â€¢â€˜
Ã¢â€¢â€˜ Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å¡     3 (100%)                                         Ã¢â€¢â€˜
Ã¢â€¢â€˜ Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å¡     0                                                Ã¢â€¢â€˜
Ã¢â€¢â€˜ Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã¯Â¼Å¡    0                                                Ã¢â€¢â€˜
Ã¢â€¢â€˜ Ã¨â‚¬â€”Ã¦â€”Â¶Ã¯Â¼Å¡   9.1s                                             Ã¢â€¢â€˜
Ã¢â€¢Å¡Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

Ã¤ÂºÂ§Ã§â€°Â©Ã¯Â¼Å¡
 Ã¦Ë†ÂªÃ¥â€ºÂ¾Ã¯Â¼Å¡ 2 Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶
 Ã¨Â§â€ Ã©Â¢â€˜Ã¯Â¼Å¡ 0 Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¤Â»â€¦Ã¥Å“Â¨Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼â€°
 Ã¨Â¿Â½Ã¨Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡ 0 Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¤Â»â€¦Ã¥Å“Â¨Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼â€°
 HTML Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡ playwright-report/index.html

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡ npx playwright show-report
```

PASS: E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶Ã¥Â·Â²Ã¥â€¡â€ Ã¥Â¤â€¡Ã¥Â¥Â½Ã¨Â¿â€ºÃ¨Â¡Å’ CI/CD Ã©â€ºâ€ Ã¦Ë†ÂÃ¯Â¼Â

````
## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤ÂºÂ§Ã§â€°Â©

Ã¥Â½â€œÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â¼Å¡Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â»Â¥Ã¤Â¸â€¹Ã¤ÂºÂ§Ã§â€°Â©Ã¯Â¼Å¡

**Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡**
- Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã¥â€™Å’Ã§Â»â€œÃ¦Å¾Å“Ã§Å¡â€ž HTML Ã¦Å Â¥Ã¥â€˜Å 
- Ã§â€Â¨Ã¤ÂºÅ½ CI Ã©â€ºâ€ Ã¦Ë†ÂÃ§Å¡â€ž JUnit XML Ã¦â€“â€¡Ã¤Â»Â¶

**Ã¤Â»â€¦Ã¥Å“Â¨Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã¯Â¼Å¡**
- Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å Â¶Ã¦â‚¬ÂÃ§Å¡â€žÃ¦Ë†ÂªÃ¥â€ºÂ¾
- Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¨Â§â€ Ã©Â¢â€˜Ã¥Â½â€¢Ã¥Ë†Â¶
- Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â°Æ’Ã¨Â¯â€¢Ã§Å¡â€žÃ¨Â¿Â½Ã¨Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã©â‚¬ÂÃ¦Â­Â¥Ã©â€¡ÂÃ¦â€Â¾Ã¯Â¼â€°
- Ã§Â½â€˜Ã§Â»Å“Ã¦â€”Â¥Ã¥Â¿â€”
- Ã¦Å½Â§Ã¥Ë†Â¶Ã¥ÂÂ°Ã¦â€”Â¥Ã¥Â¿â€”

## Ã¦Å¸Â¥Ã§Å“â€¹Ã¤ÂºÂ§Ã§â€°Â©

```bash
# Ã¥Å“Â¨Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¤Â¸Â­Ã¦Å¸Â¥Ã§Å“â€¹ HTML Ã¦Å Â¥Ã¥â€˜Å 
npx playwright show-report

# Ã¦Å¸Â¥Ã§Å“â€¹Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¨Â¿Â½Ã¨Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶
npx playwright show-trace artifacts/trace-abc123.zip

# Ã¦Ë†ÂªÃ¥â€ºÂ¾Ã¤Â¿ÂÃ¥Â­ËœÃ¥Å“Â¨ artifacts/ Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­
open artifacts/search-results.png

````

## Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â£â‚¬Ã¦Âµâ€¹

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â€”Â´Ã¦Â­â€¡Ã¦â‚¬Â§Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å¡

```
WARNING:  FLAKY TEST DETECTED: tests/e2e/markets/trade.spec.ts

Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¤Âºâ€  7/10 Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’ (70% Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å½â€¡)

Ã¥Â¸Â¸Ã¨Â§ÂÃ¥Â¤Â±Ã¨Â´Â¥Ã¥Å½Å¸Ã¥â€ºÂ :
"Ã§Â­â€°Ã¥Â¾â€¦Ã¥â€¦Æ’Ã§Â´Â  '[data-testid="confirm-btn"]' Ã¨Â¶â€¦Ã¦â€”Â¶"

Ã¦Å½Â¨Ã¨ÂÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢:
1. Ã¦Â·Â»Ã¥Å Â Ã¦ËœÂ¾Ã¥Â¼ÂÃ§Â­â€°Ã¥Â¾â€¦: await page.waitForSelector('[data-testid="confirm-btn"]')
2. Ã¥Â¢Å¾Ã¥Å Â Ã¨Â¶â€¦Ã¦â€”Â¶Ã¦â€”Â¶Ã©â€”Â´: { timeout: 10000 }
3. Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Â»â€žÃ¤Â»Â¶Ã¤Â¸Â­Ã§Å¡â€žÃ§Â«Å¾Ã¤Âºâ€°Ã¦ÂÂ¡Ã¤Â»Â¶
4. Ã§Â¡Â®Ã¨Â®Â¤Ã¥â€¦Æ’Ã§Â´Â Ã¦Å“ÂªÃ¨Â¢Â«Ã¥Å Â¨Ã§â€Â»Ã©ÂÂ®Ã¦Å’Â¡

Ã©Å¡â€Ã§Â¦Â»Ã¥Â»ÂºÃ¨Â®Â®: Ã¥Å“Â¨Ã¤Â¿Â®Ã¥Â¤ÂÃ¥â€°ÂÃ¦Â â€¡Ã¨Â®Â°Ã¤Â¸Âº test.fixme()
```

## Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã©â€¦ÂÃ§Â½Â®

Ã©Â»ËœÃ¨Â®Â¤Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å“Â¨Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¤Â¸Å Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

* PASS: ChromiumÃ¯Â¼Ë†Ã¦Â¡Å’Ã©ÂÂ¢Ã§â€°Ë† ChromeÃ¯Â¼â€°
* PASS: FirefoxÃ¯Â¼Ë†Ã¦Â¡Å’Ã©ÂÂ¢Ã§â€°Ë†Ã¯Â¼â€°
* PASS: WebKitÃ¯Â¼Ë†Ã¦Â¡Å’Ã©ÂÂ¢Ã§â€°Ë† SafariÃ¯Â¼â€°
* PASS: Ã§Â§Â»Ã¥Å Â¨Ã§â€°Ë† ChromeÃ¯Â¼Ë†Ã¥ÂÂ¯Ã©â‚¬â€°Ã¯Â¼â€°

Ã¥Å“Â¨ `playwright.config.ts` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¤Â»Â¥Ã¨Â°Æ’Ã¦â€¢Â´Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã£â‚¬â€š

## CI/CD Ã©â€ºâ€ Ã¦Ë†Â

Ã¦Â·Â»Ã¥Å Â Ã¥Ë†Â°Ã¦â€šÂ¨Ã§Å¡â€ž CI Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¯Â¼Å¡

```yaml
# .github/workflows/e2e.yml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npx playwright test

- name: Upload artifacts
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## PMX Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€¦Â³Ã©â€Â®Ã¦ÂµÂÃ§Â¨â€¹

Ã¥Â¯Â¹Ã¤ÂºÅ½ PMXÃ¯Â¼Å’Ã¨Â¯Â·Ã¤Â¼ËœÃ¥â€¦Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¤Â»Â¥Ã¤Â¸â€¹ E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡

**Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼Ë†Ã¥Â¿â€¦Ã©Â¡Â»Ã¥Â§â€¹Ã§Â»Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼â€°Ã¯Â¼Å¡**

1. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¨Â¿Å¾Ã¦Å½Â¥Ã©â€™Â±Ã¥Å’â€¦
2. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦ÂµÂÃ¨Â§Ë†Ã¥Â¸â€šÃ¥Å“Âº
3. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦ÂÅ“Ã§Â´Â¢Ã¥Â¸â€šÃ¥Å“ÂºÃ¯Â¼Ë†Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¯Â¼â€°
4. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Å¸Â¥Ã§Å“â€¹Ã¥Â¸â€šÃ¥Å“ÂºÃ¨Â¯Â¦Ã¦Æ’â€¦
5. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â¸â€¹Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ¥Ââ€¢Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Âµâ€žÃ©â€¡â€˜Ã¯Â¼â€°
6. Ã¥Â¸â€šÃ¥Å“ÂºÃ¦Â­Â£Ã§Â¡Â®Ã§Â»â€œÃ§Â®â€”
7. Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦ÂÂÃ¥Ââ€“Ã¨Âµâ€žÃ©â€¡â€˜

**Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼Å¡**

1. Ã¥Â¸â€šÃ¥Å“ÂºÃ¥Ë†â€ºÃ¥Â»ÂºÃ¦ÂµÂÃ§Â¨â€¹
2. Ã§â€Â¨Ã¦Ë†Â·Ã¨Âµâ€žÃ¦â€“â„¢Ã¦â€ºÂ´Ã¦â€“Â°
3. Ã¥Â®Å¾Ã¦â€”Â¶Ã¤Â»Â·Ã¦Â Â¼Ã¦â€ºÂ´Ã¦â€“Â°
4. Ã¥â€ºÂ¾Ã¨Â¡Â¨Ã¦Â¸Â²Ã¦Å¸â€œ
5. Ã¨Â¿â€¡Ã¦Â»Â¤Ã¥â€™Å’Ã¦Å½â€™Ã¥ÂºÂÃ¥Â¸â€šÃ¥Å“Âº
6. Ã§Â§Â»Ã¥Å Â¨Ã§Â«Â¯Ã¥â€œÂÃ¥Âºâ€Ã¥Â¼ÂÃ¥Â¸Æ’Ã¥Â±â‚¬

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¨Â¯Â¥Ã¯Â¼Å¡**

* PASS: Ã¤Â½Â¿Ã§â€Â¨Ã©Â¡ÂµÃ©ÂÂ¢Ã¥Â¯Â¹Ã¨Â±Â¡Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¤Â»Â¥Ã¦ÂÂÃ©Â«ËœÃ¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§
* PASS: Ã¤Â½Â¿Ã§â€Â¨ data-testid Ã¥Â±Å¾Ã¦â‚¬Â§Ã¤Â½Å“Ã¤Â¸ÂºÃ©â‚¬â€°Ã¦â€¹Â©Ã¥â„¢Â¨
* PASS: Ã§Â­â€°Ã¥Â¾â€¦ API Ã¥â€œÂÃ¥Âºâ€Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»Â»Ã¦â€žÂÃ¨Â¶â€¦Ã¦â€”Â¶
* PASS: Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦â€”â€¦Ã§Â¨â€¹Ã§Å¡â€žÃ§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯
* PASS: Ã¥Å“Â¨Ã¥ÂË†Ã¥Â¹Â¶Ã¥Ë†Â°Ã¤Â¸Â»Ã¥Ë†â€ Ã¦â€Â¯Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* PASS: Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â»Â¶

**Ã¤Â¸ÂÃ¥Âºâ€Ã¨Â¯Â¥Ã¯Â¼Å¡**

* FAIL: Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ©â‚¬â€°Ã¦â€¹Â©Ã¥â„¢Â¨Ã¯Â¼Ë†CSS Ã§Â±Â»Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼Å¡Ã¦â€Â¹Ã¥ÂËœÃ¯Â¼â€°
* FAIL: Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* FAIL: Ã©â€™Ë†Ã¥Â¯Â¹Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* FAIL: Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢
* FAIL: Ã¥Å“Â¨Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã¨Â·Â³Ã¨Â¿â€¡Ã¥Â·Â¥Ã¤Â»Â¶Ã¥Â®Â¡Ã¦Å¸Â¥
* FAIL: Ã¤Â½Â¿Ã§â€Â¨ E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°

## Ã©â€¡ÂÃ¨Â¦ÂÃ¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹

**Ã¥Â¯Â¹ PMX Ã¨â€¡Â³Ã¥â€¦Â³Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼Å¡**

* Ã¦Â¶â€°Ã¥ÂÅ Ã§Å“Å¸Ã¥Â®Å¾Ã¨Âµâ€žÃ©â€¡â€˜Ã§Å¡â€ž E2E Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¥Â¿â€¦Ã©Â¡Â»**Ã¤Â»â€¦Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â½â€˜/Ã¦Å¡â€šÃ¥Â­ËœÃ§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã©â€™Ë†Ã¥Â¯Â¹Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â¿ÂÃ¨Â¡Å’Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â¸ÂºÃ©â€¡â€˜Ã¨Å¾ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â®Â¾Ã§Â½Â® `test.skip(process.env.NODE_ENV === 'production')`
* Ã¤Â»â€¦Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€°Ã¥Â°â€˜Ã©â€¡ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Âµâ€žÃ©â€¡â€˜Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â€™Â±Ã¥Å’â€¦

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

* Ã¤Â½Â¿Ã§â€Â¨ `/plan` Ã¦ÂÂ¥Ã¨Â¯â€ Ã¥Ë†Â«Ã¨Â¦ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€¦Â³Ã©â€Â®Ã¦â€”â€¦Ã§Â¨â€¹
* Ã¤Â½Â¿Ã§â€Â¨ `/tdd` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã¦â€ºÂ´Ã¥Â¿Â«Ã£â‚¬ÂÃ¦â€ºÂ´Ã§Â»â€ Ã§Â²â€™Ã¥ÂºÂ¦Ã¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨ `/e2e` Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€ºâ€ Ã¦Ë†ÂÃ¥â€™Å’Ã§â€Â¨Ã¦Ë†Â·Ã¦â€”â€¦Ã§Â¨â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â½Â¿Ã§â€Â¨ `/code-review` Ã¦ÂÂ¥Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â´Â¨Ã©â€¡Â

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Ââ€ 

Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨Ã§â€Â± ECC Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€ž `e2e-runner` Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼Å’Ã¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â½ÂÃ¤ÂºÅ½Ã¯Â¼Å¡
`agents/e2e-runner.md`

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e/markets/search.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Debug test
npx playwright test --debug

# Generate test code
npx playwright codegen http://localhost:3000

# View report
npx playwright show-report
```
