# SaaS Ã¬â€¢Â Ã­â€Å’Ã«Â¦Â¬Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬â€¦Ëœ Ã¢â‚¬â€ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ CLAUDE.md

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Next.js + Supabase + Stripe SaaS Ã¬â€¢Â Ã­â€Å’Ã«Â¦Â¬Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬â€¦ËœÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ Ã¬â€¹Â¤Ã¬Â Å“ Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬ËœË†Ã¬Â Å“Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤.
> Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«Â£Â¨Ã­Å Â¸Ã¬â€”Â Ã«Â³ÂµÃ¬â€šÂ¬Ã­â€¢Å“ Ã­â€ºâ€ž ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’ÂÃ¬â€”Â Ã«Â§Å¾ÃªÂ²Å’ Ã¬Â»Â¤Ã¬Å Â¤Ã­â€žÂ°Ã«Â§Ë†Ã¬ÂÂ´Ã¬Â¦Ë†Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.

## Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂ°Å“Ã¬Å¡â€

**ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’Â:** Next.js 15 (App Router), TypeScript, Supabase (Ã¬ÂÂ¸Ã¬Â¦Â + DB), Stripe (ÃªÂ²Â°Ã¬Â Å“), Tailwind CSS, Playwright (E2E)

**Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ:** ÃªÂ¸Â°Ã«Â³Â¸Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Server Components Ã¬â€šÂ¬Ã¬Å¡Â©. Client ComponentsÃ«Å â€ Ã¬Æ’ÂÃ­ËœÂ¸Ã¬Å¾â€˜Ã¬Å¡Â©Ã¬ÂÂ´ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ ÃªÂ²Â½Ã¬Å¡Â°Ã¬â€”ÂÃ«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â©. API routeÃ«Å â€ webhookÃ¬Å¡Â©, Server ActionÃ¬Ââ‚¬ mutationÃ¬Å¡Â©.

## Ã­â€¢ÂµÃ¬â€¹Â¬ ÃªÂ·Å“Ã¬Â¹â„¢

### Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤

- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã«Å â€ RLSÃªÂ°â‚¬ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÅ“ Supabase client Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ RLSÃ«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬Å¡Â°Ã­Å¡Å’Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’
- Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦ËœÃ¬Ââ‚¬ `supabase/migrations/`Ã¬â€”Â Ã¬Â â‚¬Ã¬Å¾Â¥ Ã¢â‚¬â€ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã¬Â§ÂÃ¬Â â€˜ Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’
- `select('*')` Ã«Å’â‚¬Ã¬â€¹Â  Ã«Âªâ€¦Ã¬â€¹Å“Ã¬Â Â Ã¬Â»Â¬Ã«Å¸Â¼ Ã«ÂªÂ©Ã«Â¡ÂÃ¬ÂÂ´ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ `select()` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã«Å’â‚¬Ã¬Æ’Â Ã¬Â¿Â¼Ã«Â¦Â¬Ã¬â€”ÂÃ«Å â€ Ã«Â¬Â´Ã¬Â Å“Ã­â€¢Å“ ÃªÂ²Â°ÃªÂ³Â¼Ã«Â¥Â¼ Ã«Â°Â©Ã¬Â§â‚¬Ã­â€¢ËœÃªÂ¸Â° Ã¬Å“â€žÃ­â€¢Â´ `.limit()` Ã­ÂÂ¬Ã­â€¢Â¨ Ã­â€¢â€žÃ¬Ë†Ëœ

### Ã¬ÂÂ¸Ã¬Â¦Â

- Server ComponentsÃ¬â€”ÂÃ¬â€žÅ“Ã«Å â€ `@supabase/ssr`Ã¬ÂËœ `createServerClient()` Ã¬â€šÂ¬Ã¬Å¡Â©
- Client ComponentsÃ¬â€”ÂÃ¬â€žÅ“Ã«Å â€ `@supabase/ssr`Ã¬ÂËœ `createBrowserClient()` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«Â³Â´Ã­ËœÂ¸Ã«ÂÅ“ Ã«ÂÂ¼Ã¬Å¡Â°Ã­Å Â¸Ã«Å â€ `getUser()`Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸ Ã¢â‚¬â€ Ã¬ÂÂ¸Ã¬Â¦ÂÃ¬â€”Â `getSession()`Ã«Â§Å’ Ã«â€¹Â¨Ã«Ââ€¦Ã¬Å“Â¼Ã«Â¡Å“ Ã¬â€¹Â Ã«Â¢Â°Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’
- `middleware.ts`Ã¬ÂËœ MiddlewareÃªÂ°â‚¬ Ã«Â§Â¤ Ã¬Å¡â€Ã¬Â²Â­Ã«Â§Ë†Ã«â€¹Â¤ Ã¬ÂÂ¸Ã¬Â¦Â Ã­â€ Â Ã­ÂÂ° ÃªÂ°Â±Ã¬â€¹Â 

### ÃªÂ²Â°Ã¬Â Å“

- Stripe webhook Ã­â€¢Â¸Ã«â€œÂ¤Ã«Å¸Â¬Ã«Å â€ `app/api/webhooks/stripe/route.ts`Ã¬â€”Â Ã¬Å“â€žÃ¬Â¹Ëœ
- Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸ Ã¬Â¸Â¡ ÃªÂ°â‚¬ÃªÂ²Â© Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬â€¹Â Ã«Â¢Â°Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’ Ã¢â‚¬â€ Ã­â€¢Â­Ã¬Æ’Â Ã¬â€žÅ“Ã«Â²â€ž Ã¬Â¸Â¡Ã¬â€”ÂÃ¬â€žÅ“ StripeÃ«Â¡Å“Ã«Â¶â‚¬Ã­â€žÂ° Ã¬Â¡Â°Ã­Å¡Å’
- ÃªÂµÂ¬Ã«Ââ€¦ Ã¬Æ’ÂÃ­Æ’Å“Ã«Å â€ webhookÃ¬â€”Â Ã¬ÂËœÃ­â€¢Â´ Ã«Ââ„¢ÃªÂ¸Â°Ã­â„¢â€Ã«ÂËœÃ«Å â€ `subscription_status` Ã¬Â»Â¬Ã«Å¸Â¼Ã¬Å“Â¼Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸
- Ã«Â¬Â´Ã«Â£Å’ Ã­â€Å’Ã«Å¾Å“ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â: Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ 3ÃªÂ°Å“, Ã¬ÂÂ¼Ã¬ÂÂ¼ API Ã­ËœÂ¸Ã¬Â¶Å“ 100Ã­Å¡Å’

### Ã¬Â½â€Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

- Ã¬Â½â€Ã«â€œÅ“Ã«â€šËœ Ã¬Â£Â¼Ã¬â€žÂÃ¬â€”Â Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã«Â¶Ë†Ã«Â³â‚¬ Ã­Å’Â¨Ã­â€žÂ´Ã«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ spread Ã¬â€”Â°Ã¬â€šÂ°Ã¬Å¾Â Ã¬â€šÂ¬Ã¬Å¡Â©, Ã¬Â§ÂÃ¬Â â€˜ Ã«Â³â‚¬ÃªÂ²Â½ ÃªÂ¸Ë†Ã¬Â§â‚¬
- Server Components: `'use client'` Ã«â€â€Ã«Â â€°Ã­â€¹Â°Ã«Â¸Å’ Ã¬â€”â€ Ã¬ÂÅ’, `useState`/`useEffect` Ã¬â€”â€ Ã¬ÂÅ’
- Client Components: Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Æ’ÂÃ«â€¹Â¨Ã¬â€”Â `'use client'` Ã¬Å¾â€˜Ã¬â€žÂ±, Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬Å“Â¼Ã«Â¡Å“ Ã¬Å“Â Ã¬Â§â‚¬ Ã¢â‚¬â€ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ‚¬ hooksÃ«Â¡Å“ Ã«Â¶â€žÃ«Â¦Â¬
- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬Ã¬â€”Â Zod Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë† Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€žÂ Ã­ËœÂ¸ (API route, Ã­ÂÂ¼, Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ)

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬Â¡Â°

```
src/
  app/
    (auth)/          # Ã¬ÂÂ¸Ã¬Â¦Â Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬ (Ã«Â¡Å“ÃªÂ·Â¸Ã¬ÂÂ¸, Ã­Å¡Å’Ã¬â€ºÂÃªÂ°â‚¬Ã¬Å¾â€¦, Ã«Â¹â€žÃ«Â°â‚¬Ã«Â²Ë†Ã­ËœÂ¸ Ã¬Â°Â¾ÃªÂ¸Â°)
    (dashboard)/     # Ã«Â³Â´Ã­ËœÂ¸Ã«ÂÅ“ Ã«Å’â‚¬Ã¬â€¹Å“Ã«Â³Â´Ã«â€œÅ“ Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬
    api/
      webhooks/      # Stripe, Supabase webhooks
    layout.tsx       # ProviderÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ Ã«Â£Â¨Ã­Å Â¸ Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¢â€žÃ¬â€ºÆ’
  components/
    ui/              # Shadcn/ui Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
    forms/           # Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬ÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ Ã­ÂÂ¼ Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
    dashboard/       # Ã«Å’â‚¬Ã¬â€¹Å“Ã«Â³Â´Ã«â€œÅ“ Ã¬Â â€žÃ¬Å¡Â© Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
  hooks/             # Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ React hooks
  lib/
    supabase/        # Supabase client Ã­Å’Â©Ã­â€ Â Ã«Â¦Â¬
    stripe/          # Stripe client Ã«Â°Â Ã­â€”Â¬Ã­ÂÂ¼
    utils.ts         # Ã«Â²â€Ã¬Å¡Â© Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â°
  types/             # ÃªÂ³ÂµÃ¬Å“Â  TypeScript Ã­Æ’â‚¬Ã¬Å¾â€¦
supabase/
  migrations/        # Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦Ëœ
  seed.sql           # ÃªÂ°Å“Ã«Â°Å“Ã¬Å¡Â© Ã¬â€¹Å“Ã«â€œÅ“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°
```

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Â¨Ã­â€žÂ´

### API Ã¬Ââ€˜Ã«â€¹Âµ Ã­Ëœâ€¢Ã¬â€¹Â

```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

### Server Action Ã­Å’Â¨Ã­â€žÂ´

```typescript
'use server'

import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'

const schema = z.object({
  name: z.string().min(1).max(100),
})

export async function createProject(formData: FormData) {
  const parsed = schema.safeParse({ name: formData.get('name') })
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() }
  }

  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('projects')
    .insert({ name: parsed.data.name, user_id: user.id })
    .select('id, name, created_at')
    .single()

  if (error) return { success: false, error: 'Failed to create project' }
  return { success: true, data }
}
```

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # Ã¬â€žÅ“Ã«Â²â€ž Ã¬Â â€žÃ¬Å¡Â©, Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸Ã¬â€”Â Ã¬Â Ë†Ã«Å’â‚¬ Ã«â€¦Â¸Ã¬Â¶Å“ ÃªÂ¸Ë†Ã¬Â§â‚¬

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Ã¬â€¢Â±
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ«Å¾Âµ

```bash
/tdd                    # Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã«â€¹Â¨Ã¬Å“â€ž + Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
/e2e                    # Ã¬ÂÂ¸Ã¬Â¦Â Ã­ÂÂÃ«Â¦â€ž, ÃªÂ²Â°Ã¬Â Å“, Ã«Å’â‚¬Ã¬â€¹Å“Ã«Â³Â´Ã«â€œÅ“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Playwright Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
/test-coverage          # 80% Ã¬ÂÂ´Ã¬Æ’Â Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸
```

### Ã­â€¢ÂµÃ¬â€¹Â¬ E2E Ã­ÂÂÃ«Â¦â€ž

1. Ã­Å¡Å’Ã¬â€ºÂÃªÂ°â‚¬Ã¬Å¾â€¦ Ã¢â€ â€™ Ã¬ÂÂ´Ã«Â©â€Ã¬ÂÂ¼ Ã¬ÂÂ¸Ã¬Â¦Â Ã¢â€ â€™ Ã¬Â²Â« Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬Æ’ÂÃ¬â€žÂ±
2. Ã«Â¡Å“ÃªÂ·Â¸Ã¬ÂÂ¸ Ã¢â€ â€™ Ã«Å’â‚¬Ã¬â€¹Å“Ã«Â³Â´Ã«â€œÅ“ Ã¢â€ â€™ CRUD Ã¬Å¾â€˜Ã¬â€”â€¦
3. Ã­â€Å’Ã«Å¾Å“ Ã¬â€”â€¦ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã«â€œÅ“ Ã¢â€ â€™ Stripe checkout Ã¢â€ â€™ ÃªÂµÂ¬Ã«Ââ€¦ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€
4. Webhook: ÃªÂµÂ¬Ã«Ââ€¦ Ã¬Â·Â¨Ã¬â€ Å’ Ã¢â€ â€™ Ã«Â¬Â´Ã«Â£Å’ Ã­â€Å’Ã«Å¾Å“Ã¬Å“Â¼Ã«Â¡Å“ Ã«â€¹Â¤Ã¬Å¡Â´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã«â€œÅ“

## ECC Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

```bash
# ÃªÂ¸Â°Ã«Å Â¥ ÃªÂ³â€žÃ­Å¡Â Ã¬Ë†ËœÃ«Â¦Â½
/plan "Add team invitations with email notifications"

# TDDÃ«Â¡Å“ ÃªÂ°Å“Ã«Â°Å“
/tdd

# Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â â€ž
/code-review
/security-scan

# Ã«Â¦Â´Ã«Â¦Â¬Ã¬Å Â¤ Ã¬Â â€ž
/e2e
/test-coverage
```

## Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

- `feat:` Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥, `fix:` Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢, `refactor:` Ã¬Â½â€Ã«â€œÅ“ Ã«Â³â‚¬ÃªÂ²Â½
- `main`Ã¬â€”ÂÃ¬â€žÅ“ ÃªÂ¸Â°Ã«Å Â¥ Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ Ã¬Æ’ÂÃ¬â€žÂ±, PR Ã­â€¢â€žÃ¬Ë†Ëœ
- CI Ã¬â€¹Â¤Ã­â€“â€° Ã­â€¢Â­Ã«ÂªÂ©: lint, Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬Â²Â´Ã­ÂÂ¬, Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸, E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
- Ã«Â°Â°Ã­ÂÂ¬: PR Ã¬â€¹Å“ Vercel Ã«Â¯Â¸Ã«Â¦Â¬Ã«Â³Â´ÃªÂ¸Â°, `main` Ã«Â³â€˜Ã­â€¢Â© Ã¬â€¹Å“ Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦Ëœ Ã«Â°Â°Ã­ÂÂ¬
