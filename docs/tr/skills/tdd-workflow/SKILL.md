---
name: tdd-workflow
description: Yeni ÃƒÂ¶zellikler yazarken, hata dÃƒÂ¼zeltirken veya kod refactor ederken bu skill'i kullanÃ„Â±n. Unit, integration ve E2E testlerini iÃƒÂ§eren %80+ kapsam ile test gÃƒÂ¼dÃƒÂ¼mlÃƒÂ¼ geliÃ…Å¸tirmeyi zorlar.
origin: ECC
---

# Test GÃƒÂ¼dÃƒÂ¼mlÃƒÂ¼ GeliÃ…Å¸tirme Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

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


Bu skill tÃƒÂ¼m kod geliÃ…Å¸tirmenin kapsamlÃ„Â± test kapsamÃ„Â± ile TDD ilkelerini takip etmesini saÃ„Å¸lar.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- Yeni ÃƒÂ¶zellikler veya fonksiyonellik yazarken
- HatalarÃ„Â± veya sorunlarÃ„Â± dÃƒÂ¼zeltirken
- Mevcut kodu refactor ederken
- API endpoint'leri eklerken
- Yeni bileÃ…Å¸enler oluÃ…Å¸tururken

## Temel Ã„Â°lkeler

### 1. Koddan Ãƒâ€“NCE Testler
HER ZAMAN ÃƒÂ¶nce testleri yazÃ„Â±n, sonra testleri geÃƒÂ§mesi iÃƒÂ§in kod uygulayÃ„Â±n.

### 2. Kapsam Gereksinimleri
- Minimum %80 kapsam (unit + integration + E2E)
- TÃƒÂ¼m uÃƒÂ§ durumlar kapsanmÃ„Â±Ã…Å¸
- Hata senaryolarÃ„Â± test edilmiÃ…Å¸
- SÃ„Â±nÃ„Â±r koÃ…Å¸ullarÃ„Â± doÃ„Å¸rulanmÃ„Â±Ã…Å¸

### 3. Test Tipleri

#### Unit Testler
- Bireysel fonksiyonlar ve yardÃ„Â±mcÃ„Â± araÃƒÂ§lar
- BileÃ…Å¸en mantÃ„Â±Ã„Å¸Ã„Â±
- Pure fonksiyonlar
- YardÃ„Â±mcÃ„Â±lar ve utilities

#### Integration Testler
- API endpoint'leri
- VeritabanÃ„Â± operasyonlarÃ„Â±
- Service etkileÃ…Å¸imleri
- Harici API ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â±

#### E2E Testler (Playwright)
- Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â±
- Tam iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±
- TarayÃ„Â±cÃ„Â± otomasyonu
- UI etkileÃ…Å¸imleri

## TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â± AdÃ„Â±mlarÃ„Â±

### AdÃ„Â±m 1: KullanÃ„Â±cÃ„Â± Hikayeleri YazÃ„Â±n
```
[Rol] olarak, [eylem] yapmak istiyorum, bÃƒÂ¶ylece [fayda] elde ederim

Ãƒâ€“rnek:
KullanÃ„Â±cÃ„Â± olarak, marketleri semantik olarak aramak istiyorum,
bÃƒÂ¶ylece tam anahtar kelimeler olmasa bile ilgili marketleri bulabilirim.
```

### AdÃ„Â±m 2: Test SenaryolarÃ„Â± OluÃ…Å¸turun
Her kullanÃ„Â±cÃ„Â± hikayesi iÃƒÂ§in kapsamlÃ„Â± test senaryolarÃ„Â± oluÃ…Å¸turun:

```typescript
describe('Semantik Arama', () => {
  it('sorgu iÃƒÂ§in ilgili marketleri dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r', async () => {
    // Test implementasyonu
  })

  it('boÃ…Å¸ sorguyu zarif Ã…Å¸ekilde iÃ…Å¸ler', async () => {
    // UÃƒÂ§ durumu test et
  })

  it('Redis kullanÃ„Â±lamazsa substring aramaya geri dÃƒÂ¶ner', async () => {
    // Fallback davranÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± test et
  })

  it('sonuÃƒÂ§larÃ„Â± benzerlik skoruna gÃƒÂ¶re sÃ„Â±ralar', async () => {
    // SÃ„Â±ralama mantÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± test et
  })
})
```

### AdÃ„Â±m 3: Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n (BaÃ…Å¸arÃ„Â±sÃ„Â±z OlmalÃ„Â±)
```bash
npm test
# Testler baÃ…Å¸arÃ„Â±sÃ„Â±z olmalÃ„Â± - henÃƒÂ¼z implement etmedik
```

### AdÃ„Â±m 4: Kod UygulayÃ„Â±n
Testleri geÃƒÂ§mesi iÃƒÂ§in minimal kod yazÃ„Â±n:

```typescript
// Testler tarafÃ„Â±ndan yÃƒÂ¶nlendirilen implementasyon
export async function searchMarkets(query: string) {
  // Implementasyon buraya
}
```

### AdÃ„Â±m 5: Testleri Tekrar Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
```bash
npm test
# Testler artÃ„Â±k geÃƒÂ§meli
```

### AdÃ„Â±m 6: Refactor Edin
Testleri yeÃ…Å¸il tutarken kod kalitesini iyileÃ…Å¸tirin:
- TekrarÃ„Â± kaldÃ„Â±rÃ„Â±n
- Ã„Â°simlendirmeyi iyileÃ…Å¸tirin
- PerformansÃ„Â± optimize edin
- OkunabilirliÃ„Å¸i artÃ„Â±rÃ„Â±n

### AdÃ„Â±m 7: KapsamÃ„Â± DoÃ„Å¸rulayÃ„Â±n
```bash
npm run test:coverage
# %80+ kapsam saÃ„Å¸landÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula
```

## Test KalÃ„Â±plarÃ„Â±

### Unit Test KalÃ„Â±bÃ„Â± (Jest/Vitest)
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button BileÃ…Å¸eni', () => {
  it('doÃ„Å¸ru metinle render eder', () => {
    render(<Button>TÃ„Â±kla</Button>)
    expect(screen.getByText('TÃ„Â±kla')).toBeInTheDocument()
  })

  it('tÃ„Â±klandÃ„Â±Ã„Å¸Ã„Â±nda onClick\'i ÃƒÂ§aÃ„Å¸Ã„Â±rÃ„Â±r', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>TÃ„Â±kla</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled prop true olduÃ„Å¸unda devre dÃ„Â±Ã…Å¸Ã„Â± kalÃ„Â±r', () => {
    render(<Button disabled>TÃ„Â±kla</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### API Integration Test KalÃ„Â±bÃ„Â±
```typescript
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('GET /api/markets', () => {
  it('marketleri baÃ…Å¸arÃ„Â±yla dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r', async () => {
    const request = new NextRequest('http://localhost/api/markets')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('query parametrelerini validate eder', async () => {
    const request = new NextRequest('http://localhost/api/markets?limit=invalid')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  it('veritabanÃ„Â± hatalarÃ„Â±nÃ„Â± zarif Ã…Å¸ekilde iÃ…Å¸ler', async () => {
    // VeritabanÃ„Â± baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± mock'la
    const request = new NextRequest('http://localhost/api/markets')
    // Hata iÃ…Å¸lemeyi test et
  })
})
```

### E2E Test KalÃ„Â±bÃ„Â± (Playwright)
```typescript
import { test, expect } from '@playwright/test'

test('kullanÃ„Â±cÃ„Â± marketleri arayabilir ve filtreleyebilir', async ({ page }) => {
  // Markets sayfasÃ„Â±na git
  await page.goto('/')
  await page.click('a[href="/markets"]')

  // SayfanÃ„Â±n yÃƒÂ¼klendiÃ„Å¸ini doÃ„Å¸rula
  await expect(page.locator('h1')).toContainText('Markets')

  // Marketleri ara
  await page.fill('input[placeholder="Marketleri ara"]', 'election')

  // Debounce ve sonuÃƒÂ§larÃ„Â± bekle
  await page.waitForTimeout(600)

  // Arama sonuÃƒÂ§larÃ„Â±nÃ„Â±n gÃƒÂ¶sterildiÃ„Å¸ini doÃ„Å¸rula
  const results = page.locator('[data-testid="market-card"]')
  await expect(results).toHaveCount(5, { timeout: 5000 })

  // SonuÃƒÂ§larÃ„Â±n arama terimini iÃƒÂ§erdiÃ„Å¸ini doÃ„Å¸rula
  const firstResult = results.first()
  await expect(firstResult).toContainText('election', { ignoreCase: true })

  // Duruma gÃƒÂ¶re filtrele
  await page.click('button:has-text("Aktif")')

  // FiltrelenmiÃ…Å¸ sonuÃƒÂ§larÃ„Â± doÃ„Å¸rula
  await expect(results).toHaveCount(3)
})

test('kullanÃ„Â±cÃ„Â± yeni market oluÃ…Å¸turabilir', async ({ page }) => {
  // Ãƒâ€“nce login ol
  await page.goto('/creator-dashboard')

  // Market oluÃ…Å¸turma formunu doldur
  await page.fill('input[name="name"]', 'Test Market')
  await page.fill('textarea[name="description"]', 'Test aÃƒÂ§Ã„Â±klama')
  await page.fill('input[name="endDate"]', '2025-12-31')

  // Formu gÃƒÂ¶nder
  await page.click('button[type="submit"]')

  // BaÃ…Å¸arÃ„Â± mesajÃ„Â±nÃ„Â± doÃ„Å¸rula
  await expect(page.locator('text=Market baÃ…Å¸arÃ„Â±yla oluÃ…Å¸turuldu')).toBeVisible()

  // Market sayfasÃ„Â±na yÃƒÂ¶nlendirmeyi doÃ„Å¸rula
  await expect(page).toHaveURL(/\/markets\/test-market/)
})
```

## Test Dosya Organizasyonu

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button.tsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button.test.tsx          # Unit testler
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Button.stories.tsx       # Storybook
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard.tsx
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ MarketCard.test.tsx
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ markets/
Ã¢â€â€š           Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ route.ts
Ã¢â€â€š           Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ route.test.ts         # Integration testler
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ e2e/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ markets.spec.ts               # E2E testler
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ trading.spec.ts
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ auth.spec.ts
```

## Harici Servisleri Mock'lama

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
    new Array(1536).fill(0.1) // Mock 1536-boyutlu embedding
  ))
}))
```

## Test KapsamÃ„Â± DoÃ„Å¸rulama

### Kapsam Raporu Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r
```bash
npm run test:coverage
```

### Kapsam EÃ…Å¸ikleri
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

## KaÃƒÂ§Ã„Â±nÃ„Â±lmasÃ„Â± Gereken YaygÃ„Â±n Test HatalarÃ„Â±

### FAIL: YANLIÃ…Å¾: Implementasyon DetaylarÃ„Â±nÃ„Â± Test Etme
```typescript
// Ã„Â°ÃƒÂ§ state'i test etme
expect(component.state.count).toBe(5)
```

### PASS: DOÃ„Å¾RU: KullanÃ„Â±cÃ„Â± TarafÃ„Â±ndan GÃƒÂ¶rÃƒÂ¼nen DavranÃ„Â±Ã…Å¸Ã„Â± Test Et
```typescript
// KullanÃ„Â±cÃ„Â±larÃ„Â±n gÃƒÂ¶rdÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼ test et
expect(screen.getByText('SayÃ„Â±: 5')).toBeInTheDocument()
```

### FAIL: YANLIÃ…Å¾: KÃ„Â±rÃ„Â±lgan Selector'lar
```typescript
// Kolayca bozulur
await page.click('.css-class-xyz')
```

### PASS: DOÃ„Å¾RU: Semantik Selector'lar
```typescript
// DeÃ„Å¸iÃ…Å¸ikliklere karÃ…Å¸Ã„Â± dayanÃ„Â±klÃ„Â±
await page.click('button:has-text("GÃƒÂ¶nder")')
await page.click('[data-testid="submit-button"]')
```

### FAIL: YANLIÃ…Å¾: Test Ã„Â°zolasyonu Yok
```typescript
// Testler birbirine baÃ„Å¸Ã„Â±mlÃ„Â±
test('kullanÃ„Â±cÃ„Â± oluÃ…Å¸turur', () => { /* ... */ })
test('aynÃ„Â± kullanÃ„Â±cÃ„Â±yÃ„Â± gÃƒÂ¼nceller', () => { /* ÃƒÂ¶nceki teste baÃ„Å¸Ã„Â±mlÃ„Â± */ })
```

### PASS: DOÃ„Å¾RU: BaÃ„Å¸Ã„Â±msÃ„Â±z Testler
```typescript
// Her test kendi verisini hazÃ„Â±rlar
test('kullanÃ„Â±cÃ„Â± oluÃ…Å¸turur', () => {
  const user = createTestUser()
  // Test mantÃ„Â±Ã„Å¸Ã„Â±
})

test('kullanÃ„Â±cÃ„Â± gÃƒÂ¼nceller', () => {
  const user = createTestUser()
  // GÃƒÂ¼ncelleme mantÃ„Â±Ã„Å¸Ã„Â±
})
```

## SÃƒÂ¼rekli Test

### GeliÃ…Å¸tirme SÃ„Â±rasÃ„Â±nda Watch Modu
```bash
npm test -- --watch
# Dosya deÃ„Å¸iÃ…Å¸ikliklerinde testler otomatik ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
```

### Pre-Commit Hook
```bash
# Her commit ÃƒÂ¶ncesi ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
npm test && npm run lint
```

### CI/CD Entegrasyonu
```yaml
# GitHub Actions
- name: Run Tests
  run: npm test -- --coverage
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## En Ã„Â°yi Uygulamalar

1. **Ãƒâ€“nce Testleri Yaz** - Her zaman TDD
2. **Test BaÃ…Å¸Ã„Â±na Bir Assert** - Tek davranÃ„Â±Ã…Å¸a odaklan
3. **AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± Test Ã„Â°simleri** - Neyin test edildiÃ„Å¸ini aÃƒÂ§Ã„Â±kla
4. **Arrange-Act-Assert** - Net test yapÃ„Â±sÃ„Â±
5. **Harici BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± Mock'la** - Unit testleri izole et
6. **UÃƒÂ§ DurumlarÃ„Â± Test Et** - Null, undefined, boÃ…Å¸, bÃƒÂ¼yÃƒÂ¼k
7. **Hata YollarÃ„Â±nÃ„Â± Test Et** - Sadece happy path deÃ„Å¸il
8. **Testleri HÃ„Â±zlÃ„Â± Tut** - Unit testler < 50ms her biri
9. **Testlerden Sonra Temizle** - Yan etki yok
10. **Kapsam RaporlarÃ„Â±nÃ„Â± Ã„Â°ncele** - BoÃ…Å¸luklarÃ„Â± tespit et

## BaÃ…Å¸arÃ„Â± Metrikleri

- %80+ kod kapsamÃ„Â± saÃ„Å¸lanmÃ„Â±Ã…Å¸
- TÃƒÂ¼m testler geÃƒÂ§iyor (yeÃ…Å¸il)
- AtlanmÃ„Â±Ã…Å¸ veya devre dÃ„Â±Ã…Å¸Ã„Â± test yok
- HÃ„Â±zlÃ„Â± test yÃƒÂ¼rÃƒÂ¼tme (< 30s unit testler iÃƒÂ§in)
- E2E testler kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â±nÃ„Â± kapsÃ„Â±yor
- Testler production'dan ÃƒÂ¶nce hatalarÃ„Â± yakalar

---

**UnutmayÃ„Â±n**: Testler opsiyonel deÃ„Å¸ildir. GÃƒÂ¼venli refactoring, hÃ„Â±zlÃ„Â± geliÃ…Å¸tirme ve production gÃƒÂ¼venilirliÃ„Å¸i saÃ„Å¸layan gÃƒÂ¼venlik aÃ„Å¸Ã„Â±dÃ„Â±rlar.
