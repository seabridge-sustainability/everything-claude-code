---
name: coding-standards
description: TypeScript, JavaScript, React ve Node.js geliştirme için evrensel kodlama standartları, en iyi uygulamalar ve kalıplar.
origin: ECC
---

# Kodlama Standartları ve En İyi Uygulamalar

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Tüm projelerde uygulanabilir evrensel kodlama standartları.

## Ne Zaman Aktifleştirmelisiniz

- Yeni bir proje veya modül başlatırken
- Kod kalitesi ve sürdürülebilirlik için kod incelerken
- Mevcut kodu kurallara uygun hale getirmek için refactor ederken
- İsimlendirme, biçimlendirme veya yapısal tutarlılığı zorunlu kılarken
- Linting, biçimlendirme veya tür kontrolü kuralları ayarlarken
- Yeni katkıda bulunanları kodlama kurallarına alıştırırken

## Kod Kalitesi İlkeleri

### 1. Önce Okunabilirlik
- Kod yazılmaktan çok okunur
- Net değişken ve fonksiyon isimleri
- Yorumlardan çok kendi kendini belgeleyen kod tercih edilir
- Tutarlı biçimlendirme

### 2. KISS (Keep It Simple, Stupid - Basit Tut)
- Çalışan en basit çözüm
- Aşırı mühendislikten kaçının
- Erken optimizasyon yapmayın
- Anlaşılır kod > akıllıca kod

### 3. DRY (Don't Repeat Yourself - Kendini Tekrar Etme)
- Ortak mantığı fonksiyonlara çıkarın
- Yeniden kullanılabilir bileşenler oluşturun
- Yardımcı araçları modüller arasında paylaşın
- Kopyala-yapıştır programlamadan kaçının

### 4. YAGNI (You Aren't Gonna Need It - İhtiyacın Olmayacak)
- İhtiyaç duyulmadan özellikler oluşturmayın
- Spekülatif genellemeden kaçının
- Karmaşıklığı sadece gerektiğinde ekleyin
- Basit başlayın, gerektiğinde refactor edin

## TypeScript/JavaScript Standartları

### Değişken İsimlendirme

```typescript
// PASS: İYİ: Açıklayıcı isimler
const marketSearchQuery = 'election'
const isUserAuthenticated = true
const totalRevenue = 1000

// FAIL: KÖTÜ: Belirsiz isimler
const q = 'election'
const flag = true
const x = 1000
```

### Fonksiyon İsimlendirme

```typescript
// PASS: İYİ: Fiil-isim kalıbı
async function fetchMarketData(marketId: string) { }
function calculateSimilarity(a: number[], b: number[]) { }
function isValidEmail(email: string): boolean { }

// FAIL: KÖTÜ: Belirsiz veya sadece isim
async function market(id: string) { }
function similarity(a, b) { }
function email(e) { }
```

### Değişmezlik Kalıbı (KRİTİK)

```typescript
// PASS: HER ZAMAN spread operatörü kullanın
const updatedUser = {
  ...user,
  name: 'New Name'
}

const updatedArray = [...items, newItem]

// FAIL: ASLA doğrudan mutasyon yapmayın
user.name = 'New Name'  // KÖTÜ
items.push(newItem)     // KÖTÜ
```

### Hata Yönetimi

```typescript
// PASS: İYİ: Kapsamlı hata yönetimi
async function fetchData(url: string) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw new Error('Failed to fetch data')
  }
}

// FAIL: KÖTÜ: Hata yönetimi yok
async function fetchData(url) {
  const response = await fetch(url)
  return response.json()
}
```

### Async/Await En İyi Uygulamaları

```typescript
// PASS: İYİ: Mümkün olduğunda paralel yürütme
const [users, markets, stats] = await Promise.all([
  fetchUsers(),
  fetchMarkets(),
  fetchStats()
])

// FAIL: KÖTÜ: Gereksiz yere sıralı
const users = await fetchUsers()
const markets = await fetchMarkets()
const stats = await fetchStats()
```

### Tür Güvenliği

```typescript
// PASS: İYİ: Doğru tipler
interface Market {
  id: string
  name: string
  status: 'active' | 'resolved' | 'closed'
  created_at: Date
}

function getMarket(id: string): Promise<Market> {
  // Implementation
}

// FAIL: KÖTÜ: 'any' kullanımı
function getMarket(id: any): Promise<any> {
  // Implementation
}
```

## React En İyi Uygulamaları

### Bileşen Yapısı

```typescript
// PASS: İYİ: Tiplerle fonksiyonel bileşen
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}

// FAIL: KÖTÜ: Tip yok, belirsiz yapı
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

### Özel Hook'lar

```typescript
// PASS: İYİ: Yeniden kullanılabilir özel hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Kullanım
const debouncedQuery = useDebounce(searchQuery, 500)
```

### State Yönetimi

```typescript
// PASS: İYİ: Doğru state güncellemeleri
const [count, setCount] = useState(0)

// Önceki state'e dayalı fonksiyonel güncelleme
setCount(prev => prev + 1)

// FAIL: KÖTÜ: Doğrudan state referansı
setCount(count + 1)  // Async senaryolarda eski olabilir
```

### Koşullu Render

```typescript
// PASS: İYİ: Açık koşullu render
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}

// FAIL: KÖTÜ: Ternary cehennemi
{isLoading ? <Spinner /> : error ? <ErrorMessage error={error} /> : data ? <DataDisplay data={data} /> : null}
```

## API Tasarım Standartları

### REST API Kuralları

```
GET    /api/markets              # Tüm marketleri listele
GET    /api/markets/:id          # Belirli marketi getir
POST   /api/markets              # Yeni market oluştur
PUT    /api/markets/:id          # Marketi güncelle (tam)
PATCH  /api/markets/:id          # Marketi güncelle (kısmi)
DELETE /api/markets/:id          # Marketi sil

# Filtreleme için query parametreleri
GET /api/markets?status=active&limit=10&offset=0
```

### Response Formatı

```typescript
// PASS: İYİ: Tutarlı response yapısı
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

// Başarılı response
return NextResponse.json({
  success: true,
  data: markets,
  meta: { total: 100, page: 1, limit: 10 }
})

// Hata response
return NextResponse.json({
  success: false,
  error: 'Invalid request'
}, { status: 400 })
```

### Input Doğrulama

```typescript
import { z } from 'zod'

// PASS: İYİ: Schema doğrulama
const CreateMarketSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  endDate: z.string().datetime(),
  categories: z.array(z.string()).min(1)
})

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const validated = CreateMarketSchema.parse(body)
    // Doğrulanmış veriyle devam et
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 })
    }
  }
}
```

## Dosya Organizasyonu

### Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── markets/           # Market sayfaları
│   └── (auth)/           # Auth sayfaları (route groups)
├── components/            # React bileşenleri
│   ├── ui/               # Genel UI bileşenleri
│   ├── forms/            # Form bileşenleri
│   └── layouts/          # Layout bileşenleri
├── hooks/                # Özel React hooks
├── lib/                  # Yardımcı araçlar ve konfigürasyonlar
│   ├── api/             # API istemcileri
│   ├── utils/           # Yardımcı fonksiyonlar
│   └── constants/       # Sabitler
├── types/                # TypeScript tipleri
└── styles/              # Global stiller
```

### Dosya İsimlendirme

```
components/Button.tsx          # Bileşenler için PascalCase
hooks/useAuth.ts              # 'use' öneki ile camelCase
lib/formatDate.ts             # Yardımcı araçlar için camelCase
types/market.types.ts         # .types soneki ile camelCase
```

## Yorumlar ve Dokümantasyon

### Ne Zaman Yorum Yapmalı

```typescript
// PASS: İYİ: NİÇİN'i açıklayın, NE'yi değil
// Kesintiler sırasında API'yi aşırı yüklemekten kaçınmak için exponential backoff kullan
const delay = Math.min(1000 * Math.pow(2, retryCount), 30000)

// Büyük dizilerle performans için burada kasıtlı olarak mutasyon kullanılıyor
items.push(newItem)

// FAIL: KÖTÜ: Açık olanı belirtmek
// Sayacı 1 artır
count++

// İsmi kullanıcının ismine ayarla
name = user.name
```

### Public API'ler için JSDoc

```typescript
/**
 * Semantik benzerlik kullanarak market arar.
 *
 * @param query - Doğal dil arama sorgusu
 * @param limit - Maksimum sonuç sayısı (varsayılan: 10)
 * @returns Benzerlik skoruna göre sıralanmış market dizisi
 * @throws {Error} OpenAI API başarısız olursa veya Redis kullanılamazsa
 *
 * @example
 * ```typescript
 * const results = await searchMarkets('election', 5)
 * console.log(results[0].name) // "Trump vs Biden"
 * ```
 */
export async function searchMarkets(
  query: string,
  limit: number = 10
): Promise<Market[]> {
  // Implementation
}
```

## Performans En İyi Uygulamaları

### Memoization

```typescript
import { useMemo, useCallback } from 'react'

// PASS: İYİ: Pahalı hesaplamaları memoize et
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// PASS: İYİ: Callback'leri memoize et
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])
```

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

// PASS: İYİ: Ağır bileşenleri lazy yükle
const HeavyChart = lazy(() => import('./HeavyChart'))

export function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Veritabanı Sorguları

```typescript
// PASS: İYİ: Sadece gerekli sütunları seç
const { data } = await supabase
  .from('markets')
  .select('id, name, status')
  .limit(10)

// FAIL: KÖTÜ: Her şeyi seç
const { data } = await supabase
  .from('markets')
  .select('*')
```

## Test Standartları

### Test Yapısı (AAA Kalıbı)

```typescript
test('benzerliği doğru hesaplar', () => {
  // Arrange (Hazırla)
  const vector1 = [1, 0, 0]
  const vector2 = [0, 1, 0]

  // Act (İşle)
  const similarity = calculateCosineSimilarity(vector1, vector2)

  // Assert (Doğrula)
  expect(similarity).toBe(0)
})
```

### Test İsimlendirme

```typescript
// PASS: İYİ: Açıklayıcı test isimleri
test('sorguya uygun market bulunamadığında boş dizi döndürür', () => { })
test('OpenAI API anahtarı eksikse hata fırlatır', () => { })
test('Redis kullanılamazsa substring aramaya geri döner', () => { })

// FAIL: KÖTÜ: Belirsiz test isimleri
test('çalışır', () => { })
test('arama testi', () => { })
```

## Kod Kokusu Tespiti

Bu anti-kalıplara dikkat edin:

### 1. Uzun Fonksiyonlar
```typescript
// FAIL: KÖTÜ: 50 satırdan uzun fonksiyon
function processMarketData() {
  // 100 satır kod
}

// PASS: İYİ: Küçük fonksiyonlara böl
function processMarketData() {
  const validated = validateData()
  const transformed = transformData(validated)
  return saveData(transformed)
}
```

### 2. Derin İç İçe Geçme
```typescript
// FAIL: KÖTÜ: 5+ seviye iç içe geçme
if (user) {
  if (user.isAdmin) {
    if (market) {
      if (market.isActive) {
        if (hasPermission) {
          // Bir şeyler yap
        }
      }
    }
  }
}

// PASS: İYİ: Erken dönüşler
if (!user) return
if (!user.isAdmin) return
if (!market) return
if (!market.isActive) return
if (!hasPermission) return

// Bir şeyler yap
```

### 3. Sihirli Sayılar
```typescript
// FAIL: KÖTÜ: Açıklanmamış sayılar
if (retryCount > 3) { }
setTimeout(callback, 500)

// PASS: İYİ: İsimlendirilmiş sabitler
const MAX_RETRIES = 3
const DEBOUNCE_DELAY_MS = 500

if (retryCount > MAX_RETRIES) { }
setTimeout(callback, DEBOUNCE_DELAY_MS)
```

**Unutmayın**: Kod kalitesi pazarlık konusu değildir. Açık, sürdürülebilir kod hızlı geliştirme ve güvenli refactoring sağlar.
