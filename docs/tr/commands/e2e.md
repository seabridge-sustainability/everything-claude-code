---
description: Playwright ile end-to-end testler oluÃ…Å¸tur ve ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r. Test yolculuklarÃ„Â± oluÃ…Å¸turur, testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r, ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri/videolar/izlemeler yakalar ve artifact'larÃ„Â± yÃƒÂ¼kler.
---

# E2E Komutu

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Bu komut, Playwright kullanarak end-to-end testleri oluÃ…Å¸turmak, sÃƒÂ¼rdÃƒÂ¼rmek ve yÃƒÂ¼rÃƒÂ¼tmek iÃƒÂ§in **e2e-runner** agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

## Bu Komut Ne Yapar

1. **Test YolculuklarÃ„Â± OluÃ…Å¸tur** - KullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in Playwright testleri oluÃ…Å¸tur
2. **E2E Testlerini Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r** - Testleri tarayÃ„Â±cÃ„Â±lar arasÃ„Â±nda yÃƒÂ¼rÃƒÂ¼t
3. **Artifact'larÃ„Â± Yakala** - Hatalarda ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri, videolar, izlemeler
4. **SonuÃƒÂ§larÃ„Â± YÃƒÂ¼kle** - HTML raporlarÃ„Â± ve JUnit XML
5. **Dengesiz Testleri TanÃ„Â±mla** - KararsÃ„Â±z testleri karantinaya al

## Ne Zaman KullanÃ„Â±lÃ„Â±r

`/e2e` komutunu Ã…Å¸u durumlarda kullanÃ„Â±n:
- Kritik kullanÃ„Â±cÃ„Â± yolculuklarÃ„Â±nÃ„Â± test ederken (giriÃ…Å¸, ticaret, ÃƒÂ¶demeler)
- Ãƒâ€¡ok adÃ„Â±mlÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â±n uÃƒÂ§tan uca ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rularken
- UI etkileÃ…Å¸imlerini ve navigasyonu test ederken
- Frontend ve backend arasÃ„Â±ndaki entegrasyonu doÃ„Å¸rularken
- ÃƒÅ“retime daÃ„Å¸Ã„Â±tÃ„Â±m iÃƒÂ§in hazÃ„Â±rlanÃ„Â±rken

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

e2e-runner agent'Ã„Â± Ã…Å¸unlarÃ„Â± yapacaktÃ„Â±r:

1. **KullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± analiz edecek** ve test senaryolarÃ„Â±nÃ„Â± tanÃ„Â±mlayacak
2. Page Object Model deseni kullanarak **Playwright testi oluÃ…Å¸turacak**
3. **Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±racak** (Chrome, Firefox, Safari)
4. Ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri, videolar ve izlemelerle **hatalarÃ„Â± yakalayacak**
5. SonuÃƒÂ§lar ve artifact'larla **rapor oluÃ…Å¸turacak**
6. **Dengesiz testleri tanÃ„Â±mlayacak** ve dÃƒÂ¼zeltme ÃƒÂ¶nerilerinde bulunacak

## Ãƒâ€“rnek KullanÃ„Â±m

```
KullanÃ„Â±cÃ„Â±: /e2e Piyasa arama ve gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leme akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± test et

Agent (e2e-runner):
# E2E Test OluÃ…Å¸turma: Piyasa Arama ve GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leme AkÃ„Â±Ã…Å¸Ã„Â±

## TanÃ„Â±mlanan Test Senaryosu

**KullanÃ„Â±cÃ„Â± YolculuÃ„Å¸u:** Piyasa Arama Ã¢â€ â€™ SonuÃƒÂ§larÃ„Â± GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le Ã¢â€ â€™ Piyasaya TÃ„Â±kla Ã¢â€ â€™ DetaylarÃ„Â± GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le

**Test KapsamÃ„Â±:**
1. Piyasalar sayfasÃ„Â±na git
2. Semantik arama yap
3. Arama sonuÃƒÂ§larÃ„Â±nÃ„Â± doÃ„Å¸rula
4. Ã„Â°lk sonuca tÃ„Â±kla
5. Piyasa detay sayfasÃ„Â±nÃ„Â±n yÃƒÂ¼klendiÃ„Å¸ini doÃ„Å¸rula
6. GrafiÃ„Å¸in render olduÃ„Å¸unu doÃ„Å¸rula

## OluÃ…Å¸turulan Test Kodu

```typescript
// tests/e2e/markets/search-and-view.spec.ts
import { test, expect } from '@playwright/test'
import { MarketsPage } from '../../pages/MarketsPage'
import { MarketDetailsPage } from '../../pages/MarketDetailsPage'

test.describe('Market Search and View Flow', () => {
  test('kullanÃ„Â±cÃ„Â± piyasalarÃ„Â± arayabilir ve detaylarÃ„Â± gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leyebilir', async ({ page }) => {
    // 1. Piyasalar sayfasÃ„Â±na git
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // SayfanÃ„Â±n yÃƒÂ¼klendiÃ„Å¸ini doÃ„Å¸rula
    await expect(page).toHaveTitle(/Markets/)
    await expect(page.locator('h1')).toContainText('Markets')

    // 2. Semantik arama yap
    await marketsPage.searchMarkets('election')

    // API yanÃ„Â±tÃ„Â±nÃ„Â± bekle
    await page.waitForResponse(resp =>
      resp.url().includes('/api/markets/search') && resp.status() === 200
    )

    // 3. Arama sonuÃƒÂ§larÃ„Â±nÃ„Â± doÃ„Å¸rula
    const marketCards = marketsPage.marketCards
    await expect(marketCards.first()).toBeVisible()
    const resultCount = await marketCards.count()
    expect(resultCount).toBeGreaterThan(0)

    // Arama sonuÃƒÂ§larÃ„Â±nÃ„Â±n ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ al
    await page.screenshot({ path: 'artifacts/search-results.png' })

    // 4. Ã„Â°lk sonuca tÃ„Â±kla
    const firstMarketTitle = await marketCards.first().textContent()
    await marketCards.first().click()

    // 5. Piyasa detay sayfasÃ„Â±nÃ„Â±n yÃƒÂ¼klendiÃ„Å¸ini doÃ„Å¸rula
    await expect(page).toHaveURL(/\/markets\/[a-z0-9-]+/)

    const detailsPage = new MarketDetailsPage(page)
    await expect(detailsPage.marketName).toBeVisible()
    await expect(detailsPage.marketDescription).toBeVisible()

    // 6. GrafiÃ„Å¸in render olduÃ„Å¸unu doÃ„Å¸rula
    await expect(detailsPage.priceChart).toBeVisible()

    // Piyasa adÃ„Â±nÃ„Â±n eÃ…Å¸leÃ…Å¸tiÃ„Å¸ini doÃ„Å¸rula
    const detailsTitle = await detailsPage.marketName.textContent()
    expect(detailsTitle?.toLowerCase()).toContain(
      firstMarketTitle?.toLowerCase().substring(0, 20) || ''
    )

    // Piyasa detaylarÃ„Â±nÃ„Â±n ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ al
    await page.screenshot({ path: 'artifacts/market-details.png' })
  })

  test('sonuÃƒÂ§ olmayan arama boÃ…Å¸ durumu gÃƒÂ¶stermeli', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Var olmayan piyasayÃ„Â± ara
    await marketsPage.searchMarkets('xyznonexistentmarket123456')

    // BoÃ…Å¸ durumu doÃ„Å¸rula
    await expect(page.locator('[data-testid="no-results"]')).toBeVisible()
    await expect(page.locator('[data-testid="no-results"]')).toContainText(
      /no.*results|no.*markets/i
    )

    const marketCount = await marketsPage.marketCards.count()
    expect(marketCount).toBe(0)
  })

  test('aramayÃ„Â± temizleyebilir ve tÃƒÂ¼m piyasalarÃ„Â± tekrar gÃƒÂ¶rebilir', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Ã„Â°lk piyasa sayÃ„Â±sÃ„Â±
    const initialCount = await marketsPage.marketCards.count()

    // Arama yap
    await marketsPage.searchMarkets('trump')
    await page.waitForLoadState('networkidle')

    // FiltrelenmiÃ…Å¸ sonuÃƒÂ§larÃ„Â± doÃ„Å¸rula
    const filteredCount = await marketsPage.marketCards.count()
    expect(filteredCount).toBeLessThan(initialCount)

    // AramayÃ„Â± temizle
    await marketsPage.searchInput.clear()
    await page.waitForLoadState('networkidle')

    // TÃƒÂ¼m piyasalarÃ„Â±n tekrar gÃƒÂ¶sterildiÃ„Å¸ini doÃ„Å¸rula
    const finalCount = await marketsPage.marketCards.count()
    expect(finalCount).toBe(initialCount)
  })
})
```

## Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

```bash
# OluÃ…Å¸turulan testi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
npx playwright test tests/e2e/markets/search-and-view.spec.ts

3 worker kullanarak 3 test ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lÃ„Â±yor

  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:5:3 Ã¢â‚¬Âº user can search markets and view details (4.2s)
  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:52:3 Ã¢â‚¬Âº search with no results shows empty state (1.8s)
  Ã¢Å“â€œ  [chromium] Ã¢â‚¬Âº search-and-view.spec.ts:67:3 Ã¢â‚¬Âº can clear search and see all markets again (2.9s)

  3 passed (9.1s)

OluÃ…Å¸turulan artifact'lar:
- artifacts/search-results.png
- artifacts/market-details.png
- playwright-report/index.html
```

## Test Raporu

```
Ã¢â€¢â€Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢â€”
Ã¢â€¢â€˜                    E2E Test SonuÃƒÂ§larÃ„Â±                        Ã¢â€¢â€˜
Ã¢â€¢Â Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â£
Ã¢â€¢â€˜ Durum:      PASS: TÃƒÅ“M TESTLER GEÃƒâ€¡TÃ„Â°                             Ã¢â€¢â€˜
Ã¢â€¢â€˜ Toplam:     3 test                                           Ã¢â€¢â€˜
Ã¢â€¢â€˜ GeÃƒÂ§ti:      3 (%100)                                         Ã¢â€¢â€˜
Ã¢â€¢â€˜ BaÃ…Å¸arÃ„Â±sÃ„Â±z:  0                                                Ã¢â€¢â€˜
Ã¢â€¢â€˜ Dengesiz:   0                                                Ã¢â€¢â€˜
Ã¢â€¢â€˜ SÃƒÂ¼re:       9.1s                                             Ã¢â€¢â€˜
Ã¢â€¢Å¡Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

Artifact'lar:
 Ekran GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri: 2 dosya
 Videolar: 0 dosya (sadece hatada)
 Ã„Â°zlemeler: 0 dosya (sadece hatada)
 HTML Rapor: playwright-report/index.html

Raporu gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le: npx playwright show-report
```

PASS: E2E test paketi CI/CD entegrasyonuna hazÃ„Â±r!
```

## Test Artifact'larÃ„Â±

Testler ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â±nda, Ã…Å¸u artifact'lar yakalanÃ„Â±r:

**TÃƒÂ¼m Testlerde:**
- Zaman ÃƒÂ§izelgesi ve sonuÃƒÂ§larla HTML Rapor
- CI entegrasyonu iÃƒÂ§in JUnit XML

**Sadece Hatada:**
- BaÃ…Å¸arÃ„Â±sÃ„Â±z durumun ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼
- Testin video kaydÃ„Â±
- Hata ayÃ„Â±klama iÃƒÂ§in izleme dosyasÃ„Â± (adÃ„Â±m adÃ„Â±m tekrar)
- Network loglarÃ„Â±
- Console loglarÃ„Â±

## Artifact'larÃ„Â± GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leme

```bash
# HTML raporunu tarayÃ„Â±cÃ„Â±da gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
npx playwright show-report

# Belirli izleme dosyasÃ„Â±nÃ„Â± gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
npx playwright show-trace artifacts/trace-abc123.zip

# Ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leri artifacts/ dizinine kaydedilir
open artifacts/search-results.png
```

## Dengesiz Test Tespiti

Bir test aralÃ„Â±klÃ„Â± olarak baÃ…Å¸arÃ„Â±sÃ„Â±z olursa:

```
WARNING:  DENGESÃ„Â°Z TEST TESPÃ„Â°T EDÃ„Â°LDÃ„Â°: tests/e2e/markets/trade.spec.ts

Test 10 ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmadan 7'sinde geÃƒÂ§ti (%70 geÃƒÂ§me oranÃ„Â±)

YaygÃ„Â±n baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±k:
"'[data-testid="confirm-btn"]' elementi iÃƒÂ§in timeout"

Ãƒâ€“nerilen dÃƒÂ¼zeltmeler:
1. AÃƒÂ§Ã„Â±k bekleme ekle: await page.waitForSelector('[data-testid="confirm-btn"]')
2. Timeout'u artÃ„Â±r: { timeout: 10000 }
3. Component'te yarÃ„Â±Ã…Å¸ koÃ…Å¸ullarÃ„Â±nÃ„Â± kontrol et
4. Elementin animasyon tarafÃ„Â±ndan gizlenmediÃ„Å¸ini doÃ„Å¸rula

Karantina ÃƒÂ¶nerisi: DÃƒÂ¼zeltilene kadar test.fixme() olarak iÃ…Å¸aretle
```

## TarayÃ„Â±cÃ„Â± YapÃ„Â±landÃ„Â±rmasÃ„Â±

Testler varsayÃ„Â±lan olarak birden fazla tarayÃ„Â±cÃ„Â±da ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r:
- PASS: Chromium (Desktop Chrome)
- PASS: Firefox (Desktop)
- PASS: WebKit (Desktop Safari)
- PASS: Mobile Chrome (opsiyonel)

TarayÃ„Â±cÃ„Â±larÃ„Â± ayarlamak iÃƒÂ§in `playwright.config.ts`'yi yapÃ„Â±landÃ„Â±rÃ„Â±n.

## CI/CD Entegrasyonu

CI pipeline'Ã„Â±nÃ„Â±za ekleyin:

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

## PMX'e Ãƒâ€“zgÃƒÂ¼ Kritik AkÃ„Â±Ã…Å¸lar

PMX iÃƒÂ§in bu E2E testlerine ÃƒÂ¶ncelik verin:

**KRÃ„Â°TÃ„Â°K (Her Zaman GeÃƒÂ§meli):**
1. KullanÃ„Â±cÃ„Â± cÃƒÂ¼zdan baÃ„Å¸layabilir
2. KullanÃ„Â±cÃ„Â± piyasalara gÃƒÂ¶z atabilir
3. KullanÃ„Â±cÃ„Â± piyasa arayabilir (semantik arama)
4. KullanÃ„Â±cÃ„Â± piyasa detaylarÃ„Â±nÃ„Â± gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼leyebilir
5. KullanÃ„Â±cÃ„Â± iÃ…Å¸lem yapabilir (test fonlarÃ„Â±yla)
6. Piyasa doÃ„Å¸ru ÃƒÂ§ÃƒÂ¶zÃƒÂ¼lÃƒÂ¼r
7. KullanÃ„Â±cÃ„Â± fon ÃƒÂ§ekebilir

**Ãƒâ€“NEMLÃ„Â°:**
1. Piyasa oluÃ…Å¸turma akÃ„Â±Ã…Å¸Ã„Â±
2. KullanÃ„Â±cÃ„Â± profil gÃƒÂ¼ncellemeleri
3. GerÃƒÂ§ek zamanlÃ„Â± fiyat gÃƒÂ¼ncellemeleri
4. Grafik render'Ã„Â±
5. PiyasalarÃ„Â± filtreleme ve sÃ„Â±ralama
6. Mobil responsive layout

## En Ã„Â°yi Uygulamalar

**YAPIN:**
- PASS: SÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilirlik iÃƒÂ§in Page Object Model kullanÃ„Â±n
- PASS: Selector'lar iÃƒÂ§in data-testid nitelikleri kullanÃ„Â±n
- PASS: Rastgele timeout'lar deÃ„Å¸il, API yanÃ„Â±tlarÃ„Â±nÃ„Â± bekleyin
- PASS: Kritik kullanÃ„Â±cÃ„Â± yolculuklarÃ„Â±nÃ„Â± uÃƒÂ§tan uca test edin
- PASS: Main'e merge etmeden ÃƒÂ¶nce testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
- PASS: Testler baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unda artifact'larÃ„Â± inceleyin

**YAPMAYIN:**
- FAIL: KÃ„Â±rÃ„Â±lgan selector'lar kullanmayÃ„Â±n (CSS sÃ„Â±nÃ„Â±flarÃ„Â± deÃ„Å¸iÃ…Å¸ebilir)
- FAIL: Uygulama detaylarÃ„Â±nÃ„Â± test etmeyin
- FAIL: Production'a karÃ…Å¸Ã„Â± testler ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmayÃ„Â±n
- FAIL: Dengesiz testleri gÃƒÂ¶rmezden gelmeyin
- FAIL: BaÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±klarda artifact incelemesini atlamayÃ„Â±n
- FAIL: Her edge case'i E2E ile test etmeyin (unit testler kullanÃ„Â±n)

## Ãƒâ€“nemli Notlar

**PMX iÃƒÂ§in KRÃ„Â°TÃ„Â°K:**
- GerÃƒÂ§ek para iÃƒÂ§eren E2E testleri SADECE testnet/staging'de ÃƒÂ§alÃ„Â±Ã…Å¸malÃ„Â±dÃ„Â±r
- Asla production'a karÃ…Å¸Ã„Â± ticaret testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmayÃ„Â±n
- Finansal testler iÃƒÂ§in `test.skip(process.env.NODE_ENV === 'production')` ayarlayÃ„Â±n
- Sadece kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k test fonlarÃ„Â±yla test cÃƒÂ¼zdanlarÃ„Â± kullanÃ„Â±n

## DiÃ„Å¸er Komutlarla Entegrasyon

- Test edilecek kritik yolculuklarÃ„Â± tanÃ„Â±mlamak iÃƒÂ§in `/plan` kullanÃ„Â±n
- Unit testler iÃƒÂ§in `/tdd` kullanÃ„Â±n (daha hÃ„Â±zlÃ„Â±, daha ayrÃ„Â±ntÃ„Â±lÃ„Â±)
- Entegrasyon ve kullanÃ„Â±cÃ„Â± yolculuk testleri iÃƒÂ§in `/e2e` kullanÃ„Â±n
- Test kalitesini doÃ„Å¸rulamak iÃƒÂ§in `/code-review` kullanÃ„Â±n

## Ã„Â°lgili Agent'lar

Bu komut, ECC tarafÃ„Â±ndan saÃ„Å¸lanan `e2e-runner` agent'Ã„Â±nÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r.

Manuel kurulumlar iÃƒÂ§in, kaynak dosya Ã…Å¸urada bulunur:
`agents/e2e-runner.md`

## HÃ„Â±zlÃ„Â± Komutlar

```bash
# TÃƒÂ¼m E2E testlerini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
npx playwright test

# Belirli test dosyasÃ„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
npx playwright test tests/e2e/markets/search.spec.ts

# Headed modda ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (tarayÃ„Â±cÃ„Â±yÃ„Â± gÃƒÂ¶r)
npx playwright test --headed

# Testi debug et
npx playwright test --debug

# Test kodu oluÃ…Å¸tur
npx playwright codegen http://localhost:3000

# Raporu gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
npx playwright show-report
```
