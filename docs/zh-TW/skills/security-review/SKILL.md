---
name: security-review
description: Use this skill when adding authentication, handling user input, working with secrets, creating API endpoints, or implementing payment/sensitive features. Provides comprehensive security checklist and patterns.
---

# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Â¯Â©Ã¦Å¸Â¥Ã¦Å â‚¬Ã¨Æ’Â½

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


Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã§Â¢ÂºÃ¤Â¿ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©ÂÂµÃ¥Â¾ÂªÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã¤Â¸Â¦Ã¨Â­ËœÃ¥Ë†Â¥Ã¦Â½â€ºÃ¥Å“Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¥â€¢Å¸Ã§â€Â¨

- Ã¥Â¯Â¦Ã¤Â½Å“Ã¨ÂªÂÃ¨Â­â€°Ã¦Ë†â€“Ã¦Å½Ë†Ã¦Â¬Å 
- Ã¨â„¢â€¢Ã§Ââ€ Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¦Ë†â€“Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Å Ã¥â€šÂ³
- Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§Å¡â€ž API Ã§Â«Â¯Ã©Â»Å¾
- Ã¨â„¢â€¢Ã§Ââ€ Ã¥Â¯â€ Ã©â€˜Â°Ã¦Ë†â€“Ã¦â€ â€˜Ã¨Â­â€°
- Ã¥Â¯Â¦Ã¤Â½Å“Ã¦â€Â¯Ã¤Â»ËœÃ¥Å Å¸Ã¨Æ’Â½
- Ã¥â€žÂ²Ã¥Â­ËœÃ¦Ë†â€“Ã¥â€šÂ³Ã¨Â¼Â¸Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢
- Ã¦â€¢Â´Ã¥ÂË†Ã§Â¬Â¬Ã¤Â¸â€°Ã¦â€“Â¹ API

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

### 1. Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ 

#### FAIL: Ã§Âµâ€¢Ã¤Â¸ÂÃ©â‚¬â„¢Ã¦Â¨Â£Ã¥ÂÅ¡
```typescript
const apiKey = "sk-proj-xxxxx"  // Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°
const dbPassword = "password123" // Ã¥Å“Â¨Ã¥Å½Å¸Ã¥Â§â€¹Ã§Â¢Â¼Ã¤Â¸Â­
```

#### PASS: Ã§Â¸Â½Ã¦ËœÂ¯Ã©â‚¬â„¢Ã¦Â¨Â£Ã¥ÂÅ¡
```typescript
const apiKey = process.env.OPENAI_API_KEY
const dbUrl = process.env.DATABASE_URL

// Ã©Â©â€”Ã¨Â­â€°Ã¥Â¯â€ Ã©â€˜Â°Ã¥Â­ËœÃ¥Å“Â¨
if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã§â€žÂ¡Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€ž API Ã©â€¡â€˜Ã©â€˜Â°Ã£â‚¬ÂToken Ã¦Ë†â€“Ã¥Â¯â€ Ã§Â¢Â¼
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¯â€ Ã©â€˜Â°Ã¥Å“Â¨Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸Ã¤Â¸Â­
- [ ] `.env.local` Ã¥Å“Â¨ .gitignore Ã¤Â¸Â­
- [ ] git Ã¦Â­Â·Ã¥ÂÂ²Ã¤Â¸Â­Ã§â€žÂ¡Ã¥Â¯â€ Ã©â€˜Â°
- [ ] Ã§â€Å¸Ã§â€Â¢Ã¥Â¯â€ Ã©â€˜Â°Ã¥Å“Â¨Ã¨Â¨â€”Ã§Â®Â¡Ã¥Â¹Â³Ã¥ÂÂ°Ã¯Â¼Ë†VercelÃ£â‚¬ÂRailwayÃ¯Â¼â€°Ã¤Â¸Â­

### 2. Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°

#### Ã§Â¸Â½Ã¦ËœÂ¯Ã©Â©â€”Ã¨Â­â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥
```typescript
import { z } from 'zod'

// Ã¥Â®Å¡Ã§Â¾Â©Ã©Â©â€”Ã¨Â­â€° schema
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150)
})

// Ã¨â„¢â€¢Ã§Ââ€ Ã¥â€°ÂÃ©Â©â€”Ã¨Â­â€°
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

#### Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Å Ã¥â€šÂ³Ã©Â©â€”Ã¨Â­â€°
```typescript
function validateFileUpload(file: File) {
  // Ã¥Â¤Â§Ã¥Â°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Â§ 5MBÃ¯Â¼â€°
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error('File too large (max 5MB)')
  }

  // Ã©Â¡Å¾Ã¥Å¾â€¹Ã¦ÂªÂ¢Ã¦Å¸Â¥
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  // Ã¥â€°Â¯Ã¦Âªâ€Ã¥ÂÂÃ¦ÂªÂ¢Ã¦Å¸Â¥
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error('Invalid file extension')
  }

  return true
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¤Â»Â¥ schema Ã©Â©â€”Ã¨Â­â€°
- [ ] Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Å Ã¥â€šÂ³Ã¥Ââ€”Ã©â„¢ÂÃ¯Â¼Ë†Ã¥Â¤Â§Ã¥Â°ÂÃ£â‚¬ÂÃ©Â¡Å¾Ã¥Å¾â€¹Ã£â‚¬ÂÃ¥â€°Â¯Ã¦Âªâ€Ã¥ÂÂÃ¯Â¼â€°
- [ ] Ã¦Å¸Â¥Ã¨Â©Â¢Ã¤Â¸Â­Ã¤Â¸ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¤Â½Â¿Ã§â€Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥
- [ ] Ã§â„¢Â½Ã¥ÂÂÃ¥â€“Â®Ã©Â©â€”Ã¨Â­â€°Ã¯Â¼Ë†Ã©ÂÅ¾Ã©Â»â€˜Ã¥ÂÂÃ¥â€“Â®Ã¯Â¼â€°
- [ ] Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯Ã¤Â¸ÂÃ¦Â´Â©Ã©Å“Â²Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¨Â¨Å 

### 3. SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©Â ÂÃ©ËœÂ²

#### FAIL: Ã§Âµâ€¢Ã¤Â¸ÂÃ¤Â¸Â²Ã¦Å½Â¥ SQL
```typescript
// Ã¥ÂÂ±Ã©Å¡Âª - SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
await db.query(query)
```

#### PASS: Ã§Â¸Â½Ã¦ËœÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â©Â¢
```typescript
// Ã¥Â®â€°Ã¥â€¦Â¨ - Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â©Â¢
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

// Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨Ã¥Å½Å¸Ã¥Â§â€¹ SQL
await db.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
)
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦Å¸Â¥Ã¨Â©Â¢Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â©Â¢
- [ ] SQL Ã¤Â¸Â­Ã§â€žÂ¡Ã¥Â­â€”Ã¤Â¸Â²Ã¤Â¸Â²Ã¦Å½Â¥
- [ ] ORM/Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥Â»ÂºÃ¦Â§â€¹Ã¥â„¢Â¨Ã¦Â­Â£Ã§Â¢ÂºÃ¤Â½Â¿Ã§â€Â¨
- [ ] Supabase Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦Â­Â£Ã§Â¢ÂºÃ¦Â·Â¨Ã¥Å’â€“

### 4. Ã¨ÂªÂÃ¨Â­â€°Ã¨Ë†â€¡Ã¦Å½Ë†Ã¦Â¬Å 

#### JWT Token Ã¨â„¢â€¢Ã§Ââ€ 
```typescript
// FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡localStorageÃ¯Â¼Ë†Ã¦Ëœâ€œÃ¥Ââ€” XSS Ã¦â€Â»Ã¦â€œÅ Ã¯Â¼â€°
localStorage.setItem('token', token)

// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡httpOnly cookies
res.setHeader('Set-Cookie',
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`)
```

#### Ã¦Å½Ë†Ã¦Â¬Å Ã¦ÂªÂ¢Ã¦Å¸Â¥
```typescript
export async function deleteUser(userId: string, requesterId: string) {
  // Ã§Â¸Â½Ã¦ËœÂ¯Ã¥â€¦Ë†Ã©Â©â€”Ã¨Â­â€°Ã¦Å½Ë†Ã¦Â¬Å 
  const requester = await db.users.findUnique({
    where: { id: requesterId }
  })

  if (requester.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  // Ã§Â¹Â¼Ã§ÂºÅ’Ã¥Ë†ÂªÃ©â„¢Â¤
  await db.users.delete({ where: { id: userId } })
}
```

#### Row Level SecurityÃ¯Â¼Ë†SupabaseÃ¯Â¼â€°
```sql
-- Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â¡Â¨Ã¦Â Â¼Ã¤Â¸Å Ã¥â€¢Å¸Ã§â€Â¨ RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥ÂÂªÃ¨Æ’Â½Ã¦Å¸Â¥Ã§Å“â€¹Ã¨â€¡ÂªÃ¥Â·Â±Ã§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥ÂÂªÃ¨Æ’Â½Ã¦â€ºÂ´Ã¦â€“Â°Ã¨â€¡ÂªÃ¥Â·Â±Ã§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Token Ã¥â€žÂ²Ã¥Â­ËœÃ¥Å“Â¨ httpOnly cookiesÃ¯Â¼Ë†Ã©ÂÅ¾ localStorageÃ¯Â¼â€°
- [ ] Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€œÂÃ¤Â½Å“Ã¥â€°ÂÃ¦Å“â€°Ã¦Å½Ë†Ã¦Â¬Å Ã¦ÂªÂ¢Ã¦Å¸Â¥
- [ ] Supabase Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨ Row Level Security
- [ ] Ã¥Â·Â²Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Å¸ÂºÃ¦â€“Â¼Ã¨Â§â€™Ã¨â€°Â²Ã§Å¡â€žÃ¥Â­ËœÃ¥Ââ€“Ã¦Å½Â§Ã¥Ë†Â¶
- [ ] Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§Â®Â¡Ã§Ââ€ Ã¥Â®â€°Ã¥â€¦Â¨

### 5. XSS Ã©Â ÂÃ©ËœÂ²

#### Ã¦Â·Â¨Ã¥Å’â€“ HTML
```typescript
import DOMPurify from 'isomorphic-dompurify'

// Ã§Â¸Â½Ã¦ËœÂ¯Ã¦Â·Â¨Ã¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€ž HTML
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

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€ž HTML Ã¥Â·Â²Ã¦Â·Â¨Ã¥Å’â€“
- [ ] CSP headers Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡
- [ ] Ã§â€žÂ¡Ã¦Å“ÂªÃ©Â©â€”Ã¨Â­â€°Ã§Å¡â€žÃ¥â€¹â€¢Ã¦â€¦â€¹Ã¥â€¦Â§Ã¥Â®Â¹Ã¦Â¸Â²Ã¦Å¸â€œ
- [ ] Ã¤Â½Â¿Ã§â€Â¨ React Ã¥â€¦Â§Ã¥Â»Âº XSS Ã¤Â¿ÂÃ¨Â­Â·

### 6. CSRF Ã¤Â¿ÂÃ¨Â­Â·

#### CSRF Tokens
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

  // Ã¨â„¢â€¢Ã§Ââ€ Ã¨Â«â€¹Ã¦Â±â€š
}
```

#### SameSite Cookies
```typescript
res.setHeader('Set-Cookie',
  `session=${sessionId}; HttpOnly; Secure; SameSite=Strict`)
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¨Â®Å Ã¦â€ºÂ´Ã¦â€œÂÃ¤Â½Å“Ã¦Å“â€° CSRF tokens
- [ ] Ã¦â€°â‚¬Ã¦Å“â€° cookies Ã¨Â¨Â­Ã¥Â®Å¡ SameSite=Strict
- [ ] Ã¥Â·Â²Ã¥Â¯Â¦Ã¤Â½Å“ Double-submit cookie Ã¦Â¨Â¡Ã¥Â¼Â

### 7. Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶

#### API Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Ã¥Ë†â€ Ã©ÂËœ
  max: 100, // Ã¦Â¯ÂÃ¨Â¦â€“Ã§Âªâ€” 100 Ã¥â‚¬â€¹Ã¨Â«â€¹Ã¦Â±â€š
  message: 'Too many requests'
})

// Ã¥Â¥â€”Ã§â€Â¨Ã¥Ë†Â°Ã¨Â·Â¯Ã§â€Â±
app.use('/api/', limiter)
```

#### Ã¦Ëœâ€šÃ¨Â²Â´Ã¦â€œÂÃ¤Â½Å“
```typescript
// Ã¦ÂÅ“Ã¥Â°â€¹Ã§Å¡â€žÃ§Â©ÂÃ¦Â¥ÂµÃ©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Ã¥Ë†â€ Ã©ÂËœ
  max: 10, // Ã¦Â¯ÂÃ¥Ë†â€ Ã©ÂËœ 10 Ã¥â‚¬â€¹Ã¨Â«â€¹Ã¦Â±â€š
  message: 'Too many search requests'
})

app.use('/api/search', searchLimiter)
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¦â€°â‚¬Ã¦Å“â€° API Ã§Â«Â¯Ã©Â»Å¾Ã¦Å“â€°Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã¦Ëœâ€šÃ¨Â²Â´Ã¦â€œÂÃ¤Â½Å“Ã¦Å“â€°Ã¦â€ºÂ´Ã¥Å¡Â´Ã¦Â Â¼Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã¥Å¸ÂºÃ¦â€“Â¼ IP Ã§Å¡â€žÃ©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã¥Å¸ÂºÃ¦â€“Â¼Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã§Å¡â€žÃ©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¯Â¼Ë†Ã¥Â·Â²Ã¨ÂªÂÃ¨Â­â€°Ã¯Â¼â€°

### 8. Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢Ã¦Å¡Â´Ã©Å“Â²

#### Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â¨ËœÃ©Å’â€ž
```typescript
// FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¨Â¨ËœÃ©Å’â€žÃ¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢
console.log('User login:', { email, password })
console.log('Payment:', { cardNumber, cvv })

// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã©ÂÂ®Ã¨â€Â½Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢
console.log('User login:', { email, userId })
console.log('Payment:', { last4: card.last4, userId })
```

#### Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯
```typescript
// FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¦Å¡Â´Ã©Å“Â²Ã¥â€¦Â§Ã©Æ’Â¨Ã§Â´Â°Ã§Â¯â‚¬
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}

// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã©â‚¬Å¡Ã§â€Â¨Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯
catch (error) {
  console.error('Internal error:', error)
  return NextResponse.json(
    { error: 'An error occurred. Please try again.' },
    { status: 500 }
  )
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¦â€”Â¥Ã¨ÂªÅ’Ã¤Â¸Â­Ã§â€žÂ¡Ã¥Â¯â€ Ã§Â¢Â¼Ã£â‚¬Âtoken Ã¦Ë†â€“Ã¥Â¯â€ Ã©â€˜Â°
- [ ] Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€Â¶Ã¥Ë†Â°Ã©â‚¬Å¡Ã§â€Â¨Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯
- [ ] Ã¨Â©Â³Ã§Â´Â°Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥ÂÂªÃ¥Å“Â¨Ã¤Â¼ÂºÃ¦Å“ÂÃ¥â„¢Â¨Ã¦â€”Â¥Ã¨ÂªÅ’
- [ ] Ã¤Â¸ÂÃ¥Ââ€˜Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦Å¡Â´Ã©Å“Â²Ã¥Â â€ Ã§â€“Å Ã¨Â¿Â½Ã¨Â¹Â¤

### 9. Ã¥Ââ‚¬Ã¥Â¡Å Ã©ÂË†Ã¥Â®â€°Ã¥â€¦Â¨Ã¯Â¼Ë†SolanaÃ¯Â¼â€°

#### Ã©Å’Â¢Ã¥Å’â€¦Ã©Â©â€”Ã¨Â­â€°
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

#### Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ©Â©â€”Ã¨Â­â€°
```typescript
async function verifyTransaction(transaction: Transaction) {
  // Ã©Â©â€”Ã¨Â­â€°Ã¦â€Â¶Ã¦Â¬Â¾Ã¤ÂºÂº
  if (transaction.to !== expectedRecipient) {
    throw new Error('Invalid recipient')
  }

  // Ã©Â©â€”Ã¨Â­â€°Ã©â€¡â€˜Ã©Â¡Â
  if (transaction.amount > maxAmount) {
    throw new Error('Amount exceeds limit')
  }

  // Ã©Â©â€”Ã¨Â­â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦Å“â€°Ã¨Â¶Â³Ã¥Â¤Â Ã©Â¤ËœÃ©Â¡Â
  const balance = await getBalance(transaction.from)
  if (balance < transaction.amount) {
    throw new Error('Insufficient balance')
  }

  return true
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã©Å’Â¢Ã¥Å’â€¦Ã§Â°Â½Ã§Â«Â Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°
- [ ] Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ¨Â©Â³Ã¦Æ’â€¦Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°
- [ ] Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ¥â€°ÂÃ¦Å“â€°Ã©Â¤ËœÃ©Â¡ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥
- [ ] Ã§â€žÂ¡Ã§â€ºÂ²Ã§â€ºÂ®Ã¤ÂºÂ¤Ã¦Ëœâ€œÃ§Â°Â½Ã§Â½Â²

### 10. Ã¤Â¾ÂÃ¨Â³Â´Ã¥Â®â€°Ã¥â€¦Â¨

#### Ã¥Â®Å¡Ã¦Å“Å¸Ã¦â€ºÂ´Ã¦â€“Â°
```bash
# Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¼ÂÃ¦Â´Å¾
npm audit

# Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¤Â¿Â®Ã¥Â¾Â©Ã¥ÂÂ¯Ã¤Â¿Â®Ã¥Â¾Â©Ã§Å¡â€žÃ¥â€¢ÂÃ©Â¡Å’
npm audit fix

# Ã¦â€ºÂ´Ã¦â€“Â°Ã¤Â¾ÂÃ¨Â³Â´
npm update

# Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©ÂÅ½Ã¦â„¢â€šÃ¥Â¥â€”Ã¤Â»Â¶
npm outdated
```

#### Lock Ã¦Âªâ€Ã¦Â¡Ë†
```bash
# Ã§Â¸Â½Ã¦ËœÂ¯ commit lock Ã¦Âªâ€Ã¦Â¡Ë†
git add package-lock.json

# Ã¥Å“Â¨ CI/CD Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»Â¥Ã§ÂÂ²Ã¥Â¾â€”Ã¥ÂÂ¯Ã©â€¡ÂÃ§ÂÂ¾Ã§Å¡â€žÃ¥Â»ÂºÃ§Â½Â®
npm ci  # Ã¨â‚¬Å’Ã©ÂÅ¾ npm install
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸
- [ ] Ã¤Â¾ÂÃ¨Â³Â´Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å“â‚¬Ã¦â€“Â°
- [ ] Ã§â€žÂ¡Ã¥Â·Â²Ã§Å¸Â¥Ã¦Â¼ÂÃ¦Â´Å¾Ã¯Â¼Ë†npm audit Ã¤Â¹Â¾Ã¦Â·Â¨Ã¯Â¼â€°
- [ ] Lock Ã¦Âªâ€Ã¦Â¡Ë†Ã¥Â·Â² commit
- [ ] GitHub Ã¤Â¸Å Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨ Dependabot
- [ ] Ã¥Â®Å¡Ã¦Å“Å¸Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€ºÂ´Ã¦â€“Â°

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¸Â¬Ã¨Â©Â¦

### Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å’â€“Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¸Â¬Ã¨Â©Â¦
```typescript
// Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨ÂªÂÃ¨Â­â€°
test('requires authentication', async () => {
  const response = await fetch('/api/protected')
  expect(response.status).toBe(401)
})

// Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Å½Ë†Ã¦Â¬Å 
test('requires admin role', async () => {
  const response = await fetch('/api/admin', {
    headers: { Authorization: `Bearer ${userToken}` }
  })
  expect(response.status).toBe(403)
})

// Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°
test('rejects invalid input', async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email: 'not-an-email' })
  })
  expect(response.status).toBe(400)
})

// Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
test('enforces rate limits', async () => {
  const requests = Array(101).fill(null).map(() =>
    fetch('/api/endpoint')
  )

  const responses = await Promise.all(requests)
  const tooManyRequests = responses.filter(r => r.status === 429)

  expect(tooManyRequests.length).toBeGreaterThan(0)
})
```

## Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

Ã¤Â»Â»Ã¤Â½â€¢Ã§â€Å¸Ã§â€Â¢Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¯Â¼Å¡

- [ ] **Ã¥Â¯â€ Ã©â€˜Â°**Ã¯Â¼Å¡Ã§â€žÂ¡Ã¥Â¯Â«Ã¦Â­Â»Ã¥Â¯â€ Ã©â€˜Â°Ã¯Â¼Å’Ã¥â€¦Â¨Ã¥Å“Â¨Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸Ã¤Â¸Â­
- [ ] **Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°**Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°
- [ ] **SQL Ã¦Â³Â¨Ã¥â€¦Â¥**Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥Â·Â²Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“
- [ ] **XSS**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥â€¦Â§Ã¥Â®Â¹Ã¥Â·Â²Ã¦Â·Â¨Ã¥Å’â€“
- [ ] **CSRF**Ã¯Â¼Å¡Ã¤Â¿ÂÃ¨Â­Â·Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨
- [ ] **Ã¨ÂªÂÃ¨Â­â€°**Ã¯Â¼Å¡Ã¦Â­Â£Ã§Â¢ÂºÃ§Å¡â€ž token Ã¨â„¢â€¢Ã§Ââ€ 
- [ ] **Ã¦Å½Ë†Ã¦Â¬Å **Ã¯Â¼Å¡Ã¨Â§â€™Ã¨â€°Â²Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥Â·Â²Ã¥Â°Â±Ã¤Â½Â
- [ ] **Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶**Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã©Â»Å¾Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨
- [ ] **HTTPS**Ã¯Â¼Å¡Ã§â€Å¸Ã§â€Â¢Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¼Â·Ã¥Ë†Â¶Ã¤Â½Â¿Ã§â€Â¨
- [ ] **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¨â„¢Ã©Â Â­**Ã¯Â¼Å¡CSPÃ£â‚¬ÂX-Frame-Options Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡
- [ ] **Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ **Ã¯Â¼Å¡Ã©Å’Â¯Ã¨ÂªÂ¤Ã¤Â¸Â­Ã§â€žÂ¡Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢
- [ ] **Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â¨ËœÃ©Å’â€ž**Ã¯Â¼Å¡Ã§â€žÂ¡Ã¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢Ã¨Â¢Â«Ã¨Â¨ËœÃ©Å’â€ž
- [ ] **Ã¤Â¾ÂÃ¨Â³Â´**Ã¯Â¼Å¡Ã¦Å“â‚¬Ã¦â€“Â°Ã¯Â¼Å’Ã§â€žÂ¡Ã¦Â¼ÂÃ¦Â´Å¾
- [ ] **Row Level Security**Ã¯Â¼Å¡Supabase Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨
- [ ] **CORS**Ã¯Â¼Å¡Ã¦Â­Â£Ã§Â¢ÂºÃ¨Â¨Â­Ã¥Â®Å¡
- [ ] **Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Å Ã¥â€šÂ³**Ã¯Â¼Å¡Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã¯Â¼Ë†Ã¥Â¤Â§Ã¥Â°ÂÃ£â‚¬ÂÃ©Â¡Å¾Ã¥Å¾â€¹Ã¯Â¼â€°
- [ ] **Ã©Å’Â¢Ã¥Å’â€¦Ã§Â°Â½Ã§Â«Â **Ã¯Â¼Å¡Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¦ËœÂ¯Ã¥Ââ‚¬Ã¥Â¡Å Ã©ÂË†Ã¯Â¼â€°

## Ã¨Â³â€¡Ã¦ÂºÂ

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Web Security Academy](https://portswigger.net/web-security)

---

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥ÂÂ¯Ã©ÂÂ¸Ã§Å¡â€žÃ£â‚¬â€šÃ¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¼ÂÃ¦Â´Å¾Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥ÂÂ±Ã¥ÂÅ Ã¦â€¢Â´Ã¥â‚¬â€¹Ã¥Â¹Â³Ã¥ÂÂ°Ã£â‚¬â€šÃ¦Å“â€°Ã§â€“â€˜Ã¦â€¦Â®Ã¦â„¢â€šÃ¯Â¼Å’Ã©ÂÂ¸Ã¦â€œâ€¡Ã¨Â¬Â¹Ã¦â€¦Å½Ã§Å¡â€žÃ¥ÂÅ¡Ã¦Â³â€¢Ã£â‚¬â€š
