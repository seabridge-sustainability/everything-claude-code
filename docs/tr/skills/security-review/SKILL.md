---
name: security-review
description: Kimlik doÃ„Å¸rulama eklerken, kullanÃ„Â±cÃ„Â± girdisi iÃ…Å¸lerken, secret'larla ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken, API endpoint'leri oluÃ…Å¸tururken veya ÃƒÂ¶deme/hassas ÃƒÂ¶zellikler uygularken bu skill'i kullanÃ„Â±n. KapsamlÃ„Â± gÃƒÂ¼venlik kontrol listesi ve kalÃ„Â±plar saÃ„Å¸lar.
origin: ECC
---

# GÃƒÂ¼venlik Ã„Â°nceleme Skill'i

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Bu skill tÃƒÂ¼m kodun gÃƒÂ¼venlik en iyi uygulamalarÃ„Â±nÃ„Â± takip etmesini saÃ„Å¸lar ve potansiyel gÃƒÂ¼venlik aÃƒÂ§Ã„Â±klarÃ„Â±nÃ„Â± tanÃ„Â±mlar.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- Kimlik doÃ„Å¸rulama veya yetkilendirme uygularken
- KullanÃ„Â±cÃ„Â± girdisi veya dosya yÃƒÂ¼klemeleri iÃ…Å¸lerken
- Yeni API endpoint'leri oluÃ…Å¸tururken
- Secret'lar veya kimlik bilgileriyle ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken
- Ãƒâ€“deme ÃƒÂ¶zellikleri uygularken
- Hassas veri saklarken veya iletirken
- ÃƒÅ“ÃƒÂ§ÃƒÂ¼ncÃƒÂ¼ taraf API'leri entegre ederken

## GÃƒÂ¼venlik Kontrol Listesi

### 1. Secret YÃƒÂ¶netimi

#### FAIL: ASLA Bunu YapmayÃ„Â±n
```typescript
const apiKey = "sk-proj-xxxxx"  // Hardcoded secret
const dbPassword = "password123" // Kaynak kodda
```

#### PASS: HER ZAMAN Bunu YapÃ„Â±n
```typescript
const apiKey = process.env.OPENAI_API_KEY
const dbUrl = process.env.DATABASE_URL

// Secret'larÃ„Â±n var olduÃ„Å¸unu doÃ„Å¸rula
if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] Hardcoded API key, token veya Ã…Å¸ifre yok
- [ ] TÃƒÂ¼m secret'lar environment variable'larda
- [ ] `.env.local` .gitignore'da
- [ ] Git history'de secret yok
- [ ] Production secret'larÃ„Â± hosting platformunda (Vercel, Railway)

### 2. Input DoÃ„Å¸rulama

#### Her Zaman KullanÃ„Â±cÃ„Â± Girdisini DoÃ„Å¸rulayÃ„Â±n
```typescript
import { z } from 'zod'

// DoÃ„Å¸rulama Ã…Å¸emasÃ„Â± tanÃ„Â±mla
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150)
})

// Ã„Â°Ã…Å¸lemeden ÃƒÂ¶nce doÃ„Å¸rula
export async function createUser(input: unknown) {
  try {
    const validated = CreateUserSchema.parse(input)
    return await db.users.create(validated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    throw error
  }
}
```

#### Dosya YÃƒÂ¼kleme DoÃ„Å¸rulama
```typescript
function validateFileUpload(file: File) {
  // Boyut kontrolÃƒÂ¼ (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error('Dosya ÃƒÂ§ok bÃƒÂ¼yÃƒÂ¼k (max 5MB)')
  }

  // Tip kontrolÃƒÂ¼
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('GeÃƒÂ§ersiz dosya tipi')
  }

  // UzantÃ„Â± kontrolÃƒÂ¼
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error('GeÃƒÂ§ersiz dosya uzantÃ„Â±sÃ„Â±')
  }

  return true
}
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdileri Ã…Å¸ema ile doÃ„Å¸rulanmÃ„Â±Ã…Å¸
- [ ] Dosya yÃƒÂ¼klemeleri kÃ„Â±sÃ„Â±tlanmÃ„Â±Ã…Å¸ (boyut, tip, uzantÃ„Â±)
- [ ] KullanÃ„Â±cÃ„Â± girdisi doÃ„Å¸rudan sorgularda kullanÃ„Â±lmÃ„Â±yor
- [ ] Whitelist doÃ„Å¸rulama (blacklist deÃ„Å¸il)
- [ ] Hata mesajlarÃ„Â± hassas bilgi sÃ„Â±zdÃ„Â±rmÃ„Â±yor

### 3. SQL Injection Ãƒâ€“nleme

#### FAIL: ASLA SQL Concatenation YapmayÃ„Â±n
```typescript
// TEHLÃ„Â°KELÃ„Â° - SQL Injection aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â±
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
await db.query(query)
```

#### PASS: HER ZAMAN Parametreli Sorgular KullanÃ„Â±n
```typescript
// GÃƒÂ¼venli - parametreli sorgu
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

// Veya raw SQL ile
await db.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
)
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] TÃƒÂ¼m veritabanÃ„Â± sorgularÃ„Â± parametreli
- [ ] SQL'de string concatenation yok
- [ ] ORM/query builder doÃ„Å¸ru kullanÃ„Â±lÃ„Â±yor
- [ ] Supabase sorgularÃ„Â± dÃƒÂ¼zgÃƒÂ¼n sanitize edilmiÃ…Å¸

### 4. Kimlik DoÃ„Å¸rulama ve Yetkilendirme

#### JWT Token Ã„Â°Ã…Å¸leme
```typescript
// FAIL: YANLIÃ…Å¾: localStorage (XSS'e karÃ…Å¸Ã„Â± savunmasÃ„Â±z)
localStorage.setItem('token', token)

// PASS: DOÃ„Å¾RU: httpOnly cookies
res.setHeader('Set-Cookie',
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`)
```

#### Yetkilendirme Kontrolleri
```typescript
export async function deleteUser(userId: string, requesterId: string) {
  // HER ZAMAN ÃƒÂ¶nce yetkilendirmeyi doÃ„Å¸rula
  const requester = await db.users.findUnique({
    where: { id: requesterId }
  })

  if (requester.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  // Silme iÃ…Å¸lemine devam et
  await db.users.delete({ where: { id: userId } })
}
```

#### Row Level Security (Supabase)
```sql
-- TÃƒÂ¼m tablolarda RLS'yi aktifleÃ…Å¸tir
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- KullanÃ„Â±cÃ„Â±lar sadece kendi verilerini gÃƒÂ¶rebilir
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- KullanÃ„Â±cÃ„Â±lar sadece kendi verilerini gÃƒÂ¼ncelleyebilir
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] Token'lar httpOnly cookie'lerde (localStorage'da deÃ„Å¸il)
- [ ] Hassas operasyonlardan ÃƒÂ¶nce yetkilendirme kontrolleri
- [ ] Supabase'de Row Level Security aktif
- [ ] Rol tabanlÃ„Â± eriÃ…Å¸im kontrolÃƒÂ¼ uygulanmÃ„Â±Ã…Å¸
- [ ] Session yÃƒÂ¶netimi gÃƒÂ¼venli

### 5. XSS Ãƒâ€“nleme

#### HTML'i Sanitize Et
```typescript
import DOMPurify from 'isomorphic-dompurify'

// HER ZAMAN kullanÃ„Â±cÃ„Â± tarafÃ„Â±ndan saÃ„Å¸lanan HTML'i sanitize et
function renderUserContent(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

#### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://api.example.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] KullanÃ„Â±cÃ„Â± tarafÃ„Â±ndan saÃ„Å¸lanan HTML sanitize edilmiÃ…Å¸
- [ ] CSP baÃ…Å¸lÃ„Â±klarÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] DoÃ„Å¸rulanmamÃ„Â±Ã…Å¸ dinamik iÃƒÂ§erik render'Ã„Â± yok
- [ ] React'in yerleÃ…Å¸ik XSS korumasÃ„Â± kullanÃ„Â±lÃ„Â±yor

### 6. CSRF KorumasÃ„Â±

#### CSRF Token'larÃ„Â±
```typescript
import { csrf } from '@/lib/csrf'

export async function POST(request: Request) {
  const token = request.headers.get('X-CSRF-Token')

  if (!csrf.verify(token)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    )
  }

  // Ã„Â°steÃ„Å¸i iÃ…Å¸le
}
```

#### SameSite Cookie'ler
```typescript
res.setHeader('Set-Cookie',
  `session=${sessionId}; HttpOnly; Secure; SameSite=Strict`)
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] State deÃ„Å¸iÃ…Å¸tiren operasyonlarda CSRF token'larÃ„Â±
- [ ] TÃƒÂ¼m cookie'lerde SameSite=Strict
- [ ] Double-submit cookie pattern uygulanmÃ„Â±Ã…Å¸

### 7. Rate Limiting

#### API Rate Limiting
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Pencere baÃ…Å¸Ã„Â±na 100 istek
  message: 'Ãƒâ€¡ok fazla istek'
})

// Route'lara uygula
app.use('/api/', limiter)
```

#### PahalÃ„Â± Operasyonlar
```typescript
// Aramalar iÃƒÂ§in agresif rate limiting
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 10, // Dakikada 10 istek
  message: 'Ãƒâ€¡ok fazla arama isteÃ„Å¸i'
})

app.use('/api/search', searchLimiter)
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] TÃƒÂ¼m API endpoint'lerinde rate limiting
- [ ] PahalÃ„Â± operasyonlarda daha sÃ„Â±kÃ„Â± limitler
- [ ] IP tabanlÃ„Â± rate limiting
- [ ] KullanÃ„Â±cÃ„Â± tabanlÃ„Â± rate limiting (authenticated)

### 8. Hassas Veri Ã„Â°fÃ…Å¸asÃ„Â±

#### Loglama
```typescript
// FAIL: YANLIÃ…Å¾: Hassas veri loglama
console.log('User login:', { email, password })
console.log('Payment:', { cardNumber, cvv })

// PASS: DOÃ„Å¾RU: Hassas veriyi gizle
console.log('User login:', { email, userId })
console.log('Payment:', { last4: card.last4, userId })
```

#### Hata MesajlarÃ„Â±
```typescript
// FAIL: YANLIÃ…Å¾: Ã„Â°ÃƒÂ§ detaylarÃ„Â± aÃƒÂ§Ã„Â±Ã„Å¸a ÃƒÂ§Ã„Â±karma
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}

// PASS: DOÃ„Å¾RU: Genel hata mesajlarÃ„Â±
catch (error) {
  console.error('Internal error:', error)
  return NextResponse.json(
    { error: 'Bir hata oluÃ…Å¸tu. LÃƒÂ¼tfen tekrar deneyin.' },
    { status: 500 }
  )
}
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] Loglarda Ã…Å¸ifre, token veya secret yok
- [ ] KullanÃ„Â±cÃ„Â±lar iÃƒÂ§in genel hata mesajlarÃ„Â±
- [ ] DetaylÃ„Â± hatalar sadece sunucu loglarÃ„Â±nda
- [ ] KullanÃ„Â±cÃ„Â±lara stack trace gÃƒÂ¶sterilmiyor

### 9. Blockchain GÃƒÂ¼venliÃ„Å¸i (Solana)

#### Wallet DoÃ„Å¸rulama
```typescript
import { verify } from '@solana/web3.js'

async function verifyWalletOwnership(
  publicKey: string,
  signature: string,
  message: string
) {
  try {
    const isValid = verify(
      Buffer.from(message),
      Buffer.from(signature, 'base64'),
      Buffer.from(publicKey, 'base64')
    )
    return isValid
  } catch (error) {
    return false
  }
}
```

#### Transaction DoÃ„Å¸rulama
```typescript
async function verifyTransaction(transaction: Transaction) {
  // AlÃ„Â±cÃ„Â±yÃ„Â± doÃ„Å¸rula
  if (transaction.to !== expectedRecipient) {
    throw new Error('GeÃƒÂ§ersiz alÃ„Â±cÃ„Â±')
  }

  // MiktarÃ„Â± doÃ„Å¸rula
  if (transaction.amount > maxAmount) {
    throw new Error('Miktar limiti aÃ…Å¸Ã„Â±yor')
  }

  // KullanÃ„Â±cÃ„Â±nÃ„Â±n yeterli bakiyesi olduÃ„Å¸unu doÃ„Å¸rula
  const balance = await getBalance(transaction.from)
  if (balance < transaction.amount) {
    throw new Error('Yetersiz bakiye')
  }

  return true
}
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] Wallet imzalarÃ„Â± doÃ„Å¸rulanmÃ„Â±Ã…Å¸
- [ ] Transaction detaylarÃ„Â± validate edilmiÃ…Å¸
- [ ] Transaction'lardan ÃƒÂ¶nce bakiye kontrolleri
- [ ] KÃƒÂ¶r transaction imzalama yok

### 10. BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k GÃƒÂ¼venliÃ„Å¸i

#### DÃƒÂ¼zenli GÃƒÂ¼ncellemeler
```bash
# GÃƒÂ¼venlik aÃƒÂ§Ã„Â±klarÃ„Â±nÃ„Â± kontrol et
npm audit

# Otomatik dÃƒÂ¼zeltilebilir sorunlarÃ„Â± dÃƒÂ¼zelt
npm audit fix

# BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± gÃƒÂ¼ncelle
npm update

# Eski paketleri kontrol et
npm outdated
```

#### Lock DosyalarÃ„Â±
```bash
# HER ZAMAN lock dosyalarÃ„Â±nÃ„Â± commit et
git add package-lock.json

# CI/CD'de tekrarlanabilir build'ler iÃƒÂ§in kullan
npm ci  # npm install yerine
```

#### DoÃ„Å¸rulama AdÃ„Â±mlarÃ„Â±
- [ ] BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar gÃƒÂ¼ncel
- [ ] Bilinen gÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± yok (npm audit clean)
- [ ] Lock dosyalarÃ„Â± commit edilmiÃ…Å¸
- [ ] GitHub'da Dependabot aktif
- [ ] DÃƒÂ¼zenli gÃƒÂ¼venlik gÃƒÂ¼ncellemeleri

## GÃƒÂ¼venlik Testi

### Otomatik GÃƒÂ¼venlik Testleri
```typescript
// Kimlik doÃ„Å¸rulama testi
test('kimlik doÃ„Å¸rulama gerektirir', async () => {
  const response = await fetch('/api/protected')
  expect(response.status).toBe(401)
})

// Yetkilendirme testi
test('admin rolÃƒÂ¼ gerektirir', async () => {
  const response = await fetch('/api/admin', {
    headers: { Authorization: `Bearer ${userToken}` }
  })
  expect(response.status).toBe(403)
})

// Input doÃ„Å¸rulama testi
test('geÃƒÂ§ersiz input'u reddeder', async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email: 'not-an-email' })
  })
  expect(response.status).toBe(400)
})

// Rate limiting testi
test('rate limit'leri zorlar', async () => {
  const requests = Array(101).fill(null).map(() =>
    fetch('/api/endpoint')
  )

  const responses = await Promise.all(requests)
  const tooManyRequests = responses.filter(r => r.status === 429)

  expect(tooManyRequests.length).toBeGreaterThan(0)
})
```

## Deployment Ãƒâ€“ncesi GÃƒÂ¼venlik Kontrol Listesi

HERHANGÃ„Â° bir production deployment'Ã„Â±ndan ÃƒÂ¶nce:

- [ ] **Secret'lar**: Hardcoded secret yok, hepsi env var'larda
- [ ] **Input DoÃ„Å¸rulama**: TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdileri validate edilmiÃ…Å¸
- [ ] **SQL Injection**: TÃƒÂ¼m sorgular parametreli
- [ ] **XSS**: KullanÃ„Â±cÃ„Â± iÃƒÂ§eriÃ„Å¸i sanitize edilmiÃ…Å¸
- [ ] **CSRF**: Koruma aktif
- [ ] **Kimlik DoÃ„Å¸rulama**: DoÃ„Å¸ru token iÃ…Å¸leme
- [ ] **Yetkilendirme**: Rol kontrolleri yerinde
- [ ] **Rate Limiting**: TÃƒÂ¼m endpoint'lerde aktif
- [ ] **HTTPS**: Production'da zorunlu
- [ ] **GÃƒÂ¼venlik BaÃ…Å¸lÃ„Â±klarÃ„Â±**: CSP, X-Frame-Options yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] **Hata Ã„Â°Ã…Å¸leme**: Hatalarda hassas veri yok
- [ ] **Loglama**: Hassas veri loglanmÃ„Â±yor
- [ ] **BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar**: GÃƒÂ¼ncel, gÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± yok
- [ ] **Row Level Security**: Supabase'de aktif
- [ ] **CORS**: DÃƒÂ¼zgÃƒÂ¼n yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] **Dosya YÃƒÂ¼klemeleri**: Validate edilmiÃ…Å¸ (boyut, tip)
- [ ] **Wallet Ã„Â°mzalarÃ„Â±**: DoÃ„Å¸rulanmÃ„Â±Ã…Å¸ (blockchain varsa)

## Kaynaklar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Web Security Academy](https://portswigger.net/web-security)

---

**UnutmayÃ„Â±n**: GÃƒÂ¼venlik opsiyonel deÃ„Å¸ildir. Bir gÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± tÃƒÂ¼m platformu tehlikeye atabilir. Ã…Å¾ÃƒÂ¼phe duyduÃ„Å¸unuzda ihtiyatlÃ„Â± olun.
