---
name: e2e-testing
description: Playwright E2E test kalÃ„Â±plarÃ„Â±, Page Object Model, yapÃ„Â±landÃ„Â±rma, CI/CD entegrasyonu, artifact yÃƒÂ¶netimi ve kararsÃ„Â±z test stratejileri.
origin: ECC
---

# E2E Test KalÃ„Â±plarÃ„Â±

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


KararlÃ„Â±, hÃ„Â±zlÃ„Â± ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir E2E test paketleri oluÃ…Å¸turmak iÃƒÂ§in kapsamlÃ„Â± Playwright kalÃ„Â±plarÃ„Â±.

## Test DosyasÃ„Â± Organizasyonu

```
tests/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ e2e/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ login.spec.ts
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ logout.spec.ts
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ register.spec.ts
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ features/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ browse.spec.ts
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ search.spec.ts
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ create.spec.ts
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ endpoints.spec.ts
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ fixtures/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth.ts
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ data.ts
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ playwright.config.ts
```

## Page Object Model (POM)

```typescript
import { Page, Locator } from '@playwright/test'

export class ItemsPage {
  readonly page: Page
  readonly searchInput: Locator
  readonly itemCards: Locator
  readonly createButton: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.locator('[data-testid="search-input"]')
    this.itemCards = page.locator('[data-testid="item-card"]')
    this.createButton = page.locator('[data-testid="create-btn"]')
  }

  async goto() {
    await this.page.goto('/items')
    await this.page.waitForLoadState('networkidle')
  }

  async search(query: string) {
    await this.searchInput.fill(query)
    await this.page.waitForResponse(resp => resp.url().includes('/api/search'))
    await this.page.waitForLoadState('networkidle')
  }

  async getItemCount() {
    return await this.itemCards.count()
  }
}
```

## Test YapÃ„Â±sÃ„Â±

```typescript
import { test, expect } from '@playwright/test'
import { ItemsPage } from '../../pages/ItemsPage'

test.describe('Item Search', () => {
  let itemsPage: ItemsPage

  test.beforeEach(async ({ page }) => {
    itemsPage = new ItemsPage(page)
    await itemsPage.goto()
  })

  test('should search by keyword', async ({ page }) => {
    await itemsPage.search('test')

    const count = await itemsPage.getItemCount()
    expect(count).toBeGreaterThan(0)

    await expect(itemsPage.itemCards.first()).toContainText(/test/i)
    await page.screenshot({ path: 'artifacts/search-results.png' })
  })

  test('should handle no results', async ({ page }) => {
    await itemsPage.search('xyznonexistent123')

    await expect(page.locator('[data-testid="no-results"]')).toBeVisible()
    expect(await itemsPage.getItemCount()).toBe(0)
  })
})
```

## Playwright YapÃ„Â±landÃ„Â±rmasÃ„Â±

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'playwright-results.xml' }],
    ['json', { outputFile: 'playwright-results.json' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

## KararsÃ„Â±z Test KalÃ„Â±plarÃ„Â±

### Karantina

```typescript
test('flaky: complex search', async ({ page }) => {
  test.fixme(true, 'Flaky - Issue #123')
  // test kodu...
})

test('conditional skip', async ({ page }) => {
  test.skip(process.env.CI, 'Flaky in CI - Issue #123')
  // test kodu...
})
```

### KararsÃ„Â±zlÃ„Â±Ã„Å¸Ã„Â± Belirleme

```bash
npx playwright test tests/search.spec.ts --repeat-each=10
npx playwright test tests/search.spec.ts --retries=3
```

### YaygÃ„Â±n Nedenler ve Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mler

**YarÃ„Â±Ã…Å¸ koÃ…Å¸ullarÃ„Â±:**
```typescript
// KÃƒÂ¶tÃƒÂ¼: element'in hazÃ„Â±r olduÃ„Å¸unu varsayar
await page.click('[data-testid="button"]')

// Ã„Â°yi: otomatik bekleme locator
await page.locator('[data-testid="button"]').click()
```

**AÃ„Å¸ zamanlamasÃ„Â±:**
```typescript
// KÃƒÂ¶tÃƒÂ¼: keyfi timeout
await page.waitForTimeout(5000)

// Ã„Â°yi: belirli koÃ…Å¸ulu bekle
await page.waitForResponse(resp => resp.url().includes('/api/data'))
```

**Animasyon zamanlamasÃ„Â±:**
```typescript
// KÃƒÂ¶tÃƒÂ¼: animasyon sÃ„Â±rasÃ„Â±nda tÃ„Â±kla
await page.click('[data-testid="menu-item"]')

// Ã„Â°yi: kararlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± bekle
await page.locator('[data-testid="menu-item"]').waitFor({ state: 'visible' })
await page.waitForLoadState('networkidle')
await page.locator('[data-testid="menu-item"]').click()
```

## Artifact YÃƒÂ¶netimi

### Ekran GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri

```typescript
await page.screenshot({ path: 'artifacts/after-login.png' })
await page.screenshot({ path: 'artifacts/full-page.png', fullPage: true })
await page.locator('[data-testid="chart"]').screenshot({ path: 'artifacts/chart.png' })
```

### Trace'ler

```typescript
await browser.startTracing(page, {
  path: 'artifacts/trace.json',
  screenshots: true,
  snapshots: true,
})
// ... test aksiyonlarÃ„Â± ...
await browser.stopTracing()
```

### Video

```typescript
// playwright.config.ts'de
use: {
  video: 'retain-on-failure',
  videosPath: 'artifacts/videos/'
}
```

## CI/CD Entegrasyonu

```yaml
# .github/workflows/e2e.yml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          BASE_URL: ${{ vars.STAGING_URL }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Test Raporu Ã…Å¾ablonu

```markdown
# E2E Test Raporu

**Tarih:** YYYY-MM-DD HH:MM
**SÃƒÂ¼re:** Xd Ys
**Durum:** GEÃƒâ€¡TÃ„Â° / BAÃ…Å¾ARISIZ

## Ãƒâ€“zet
- Toplam: X | GeÃƒÂ§ti: Y (Z%) | BaÃ…Å¸arÃ„Â±sÃ„Â±z: A | KararsÃ„Â±z: B | AtlandÃ„Â±: C

## BaÃ…Å¸arÃ„Â±sÃ„Â±z Testler

### test-adÃ„Â±
**Dosya:** `tests/e2e/feature.spec.ts:45`
**Hata:** Element'in gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼r olmasÃ„Â± bekleniyordu
**Ekran GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼:** artifacts/failed.png
**Ãƒâ€“nerilen Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m:** [aÃƒÂ§Ã„Â±klama]

## Artifact'lar
- HTML Raporu: playwright-report/index.html
- Ekran GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri: artifacts/*.png
- Videolar: artifacts/videos/*.webm
- Trace'ler: artifacts/*.zip
```

## Wallet / Web3 Testi

```typescript
test('wallet connection', async ({ page, context }) => {
  // Wallet provider'Ã„Â± mock'la
  await context.addInitScript(() => {
    window.ethereum = {
      isMetaMask: true,
      request: async ({ method }) => {
        if (method === 'eth_requestAccounts')
          return ['0x1234567890123456789012345678901234567890']
        if (method === 'eth_chainId') return '0x1'
      }
    }
  })

  await page.goto('/')
  await page.locator('[data-testid="connect-wallet"]').click()
  await expect(page.locator('[data-testid="wallet-address"]')).toContainText('0x1234')
})
```

## Finansal / Kritik AkÃ„Â±Ã…Å¸ Testi

```typescript
test('trade execution', async ({ page }) => {
  // ÃƒÅ“retimde atla Ã¢â‚¬â€ gerÃƒÂ§ek para
  test.skip(process.env.NODE_ENV === 'production', 'Skip on production')

  await page.goto('/markets/test-market')
  await page.locator('[data-testid="position-yes"]').click()
  await page.locator('[data-testid="trade-amount"]').fill('1.0')

  // Ãƒâ€“nizlemeyi doÃ„Å¸rula
  const preview = page.locator('[data-testid="trade-preview"]')
  await expect(preview).toContainText('1.0')

  // Onayla ve blockchain'i bekle
  await page.locator('[data-testid="confirm-trade"]').click()
  await page.waitForResponse(
    resp => resp.url().includes('/api/trade') && resp.status() === 200,
    { timeout: 30000 }
  )

  await expect(page.locator('[data-testid="trade-success"]')).toBeVisible()
})
```
