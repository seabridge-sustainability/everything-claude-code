# SaaS Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂ Ã¢â‚¬â€ Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

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


> Ã¤Â¸â‚¬Ã¤Â¸Âª Next.js + Supabase + Stripe SaaS Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ§Å¡â€žÃ§Å“Å¸Ã¥Â®Å¾Ã§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬â€š
> Ã¥Â°â€ Ã¦Â­Â¤Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â°Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€šÂ¨Ã§Å¡â€žÃ¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â§Ë†

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†Ã¯Â¼Å¡** Next.js 15Ã¯Â¼Ë†App RouterÃ¯Â¼â€°Ã£â‚¬ÂTypeScriptÃ£â‚¬ÂSupabaseÃ¯Â¼Ë†Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â + Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼â€°Ã£â‚¬ÂStripeÃ¯Â¼Ë†Ã¨Â®Â¡Ã¨Â´Â¹Ã¯Â¼â€°Ã£â‚¬ÂTailwind CSSÃ£â‚¬ÂPlaywrightÃ¯Â¼Ë†Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°

**Ã¦Å¾Â¶Ã¦Å¾â€žÃ¯Â¼Å¡** Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â»â€žÃ¤Â»Â¶Ã£â‚¬â€šÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¤ÂºÂ¤Ã¤Âºâ€™Ã¦â‚¬Â§Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§Â»â€žÃ¤Â»Â¶Ã£â‚¬â€šAPI Ã¨Â·Â¯Ã§â€Â±Ã§â€Â¨Ã¤ÂºÅ½ WebhookÃ¯Â¼Å’Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¦â€œÂÃ¤Â½Å“Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€¢Â°Ã¦ÂÂ®Ã¥ÂËœÃ¦â€ºÂ´Ã£â‚¬â€š

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Ââ€¡Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÂ¯Ã§â€Â¨ RLS Ã§Å¡â€ž Supabase Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯ Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ§Â»â€¢Ã¨Â¿â€¡ RLS
* Ã¨Â¿ÂÃ§Â§Â»Ã¥Å“Â¨ `supabase/migrations/` Ã¤Â¸Â­ Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¤Â¿Â®Ã¦â€Â¹Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€°Ã¦ËœÅ½Ã§Â¡Â®Ã¥Ë†â€”Ã¥Ë†â€”Ã¨Â¡Â¨Ã§Å¡â€ž `select()`Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `select('*')`
* Ã¦â€°â‚¬Ã¦Å“â€°Ã©ÂÂ¢Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã§Å¡â€žÃ¦Å¸Â¥Ã¨Â¯Â¢Ã¥Â¿â€¦Ã©Â¡Â»Ã¥Å’â€¦Ã¥ÂÂ« `.limit()` Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã¨Â¿â€Ã¥â€ºÅ¾Ã¦â€”Â Ã©â„¢ÂÃ¥Ë†Â¶Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾Å“

### Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â»â€žÃ¤Â»Â¶Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂ¥Ã¨â€¡Âª `@supabase/ssr` Ã§Å¡â€ž `createServerClient()`
* Ã¥Å“Â¨Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§Â»â€žÃ¤Â»Â¶Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂ¥Ã¨â€¡Âª `@supabase/ssr` Ã§Å¡â€ž `createBrowserClient()`
* Ã¥Ââ€”Ã¤Â¿ÂÃ¦Å Â¤Ã§Å¡â€žÃ¨Â·Â¯Ã§â€Â±Ã¦Â£â‚¬Ã¦Å¸Â¥ `getUser()` Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ¤Â»â€¦Ã¤Â¾ÂÃ¨Âµâ€“ `getSession()` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â
* `middleware.ts` Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¤Â¼Å¡Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¯Â·Ã¦Â±â€šÃ¤Â¸Å Ã¥Ë†Â·Ã¦â€“Â°Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â»Â¤Ã§â€°Å’

### Ã¨Â®Â¡Ã¨Â´Â¹

* Stripe webhook Ã¥Â¤â€žÃ§Ââ€ Ã§Â¨â€¹Ã¥ÂºÂÃ¥Å“Â¨ `app/api/webhooks/stripe/route.ts` Ã¤Â¸Â­
* Ã§Â»ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ¤Â¿Â¡Ã¤Â»Â»Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§Å¡â€žÃ¥Â®Å¡Ã¤Â»Â·Ã¦â€¢Â°Ã¦ÂÂ® Ã¢â‚¬â€ Ã¥Â§â€¹Ã§Â»Ë†Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã¤Â»Å½ Stripe Ã¨Å½Â·Ã¥Ââ€“
* Ã©â‚¬Å¡Ã¨Â¿â€¡ `subscription_status` Ã¥Ë†â€”Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â®Â¢Ã©Ëœâ€¦Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å’Ã§â€Â± webhook Ã¥ÂÅ’Ã¦Â­Â¥
* Ã¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€šÃ§â€Â¨Ã¦Ë†Â·Ã¯Â¼Å¡3 Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Å’Ã¦Â¯ÂÃ¥Â¤Â© 100 Ã¦Â¬Â¡ API Ã¨Â°Æ’Ã§â€Â¨

### Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¤Â»Â£Ã§Â ÂÃ¦Ë†â€“Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¤Â»â€¦Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã¥Â¼â‚¬Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã¯Â¼Å’Ã¦Â°Â¸Ã¤Â¸ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¤Â¿Â®Ã¦â€Â¹
* Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â»â€žÃ¤Â»Â¶Ã¯Â¼Å¡Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `'use client'` Ã¦Å’â€¡Ã¤Â»Â¤Ã¯Â¼Å’Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `useState`/`useEffect`
* Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§Â»â€žÃ¤Â»Â¶Ã¯Â¼Å¡`'use client'` Ã¦â€Â¾Ã¥Å“Â¨Ã©Â¡Â¶Ã©Æ’Â¨Ã¯Â¼Å’Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“ Ã¢â‚¬â€ Ã¥Â°â€ Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦ÂÂÃ¥Ââ€“Ã¥Ë†Â°Ã©â€™Â©Ã¥Â­ÂÃ¤Â¸Â­
* Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Ë†API Ã¨Â·Â¯Ã§â€Â±Ã£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã£â‚¬ÂÃ§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¯Â¼â€°Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ Zod Ã¦Â¨Â¡Ã¥Â¼Â

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
src/
  app/
    (auth)/          # Ã¨Â®Â¤Ã¨Â¯ÂÃ©Â¡ÂµÃ©ÂÂ¢Ã¯Â¼Ë†Ã§â„¢Â»Ã¥Â½â€¢Ã£â‚¬ÂÃ¦Â³Â¨Ã¥â€ Å’Ã£â‚¬ÂÃ¥Â¿ËœÃ¨Â®Â°Ã¥Â¯â€ Ã§Â ÂÃ¯Â¼â€°
    (dashboard)/     # Ã¥Ââ€”Ã¤Â¿ÂÃ¦Å Â¤Ã§Å¡â€žÃ¤Â»ÂªÃ¨Â¡Â¨Ã¦ÂÂ¿Ã©Â¡ÂµÃ©ÂÂ¢
    api/
      webhooks/      # StripeÃ£â‚¬ÂSupabase webhooks
    layout.tsx       # Ã¦Â Â¹Ã¥Â¸Æ’Ã¥Â±â‚¬Ã¯Â¼Ë†Ã¥Å’â€¦Ã¥ÂÂ« providersÃ¯Â¼â€°
  components/
    ui/              # Shadcn/ui Ã§Â»â€žÃ¤Â»Â¶
    forms/           # Ã¥Â¸Â¦Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ¨Â¡Â¨Ã¥Ââ€¢Ã§Â»â€žÃ¤Â»Â¶
    dashboard/       # Ã¤Â»ÂªÃ¨Â¡Â¨Ã¦ÂÂ¿Ã¤Â¸â€œÃ§â€Â¨Ã§Â»â€žÃ¤Â»Â¶
  hooks/             # Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€° React hooks
  lib/
    supabase/        # Supabase Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¥Â·Â¥Ã¥Å½â€š
    stripe/          # Stripe Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¤Â¸Å½Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â·Â¥Ã¥â€¦Â·
    utils.ts         # Ã©â‚¬Å¡Ã§â€Â¨Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€¡Â½Ã¦â€¢Â°
  types/             # Ã¥â€¦Â±Ã¤ÂºÂ« TypeScript Ã§Â±Â»Ã¥Å¾â€¹
supabase/
  migrations/        # Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»
  seed.sql           # Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§â€Â¨Ã§Â§ÂÃ¥Â­ÂÃ¦â€¢Â°Ã¦ÂÂ®
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### API Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼Â

```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

### Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¦â€œÂÃ¤Â½Å“Ã¦Â¨Â¡Ã¥Â¼Â

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

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # Server-only, never expose to client

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥

```bash
/tdd                    # Unit + integration tests for new features
/e2e                    # Playwright tests for auth flow, billing, dashboard
/test-coverage          # Verify 80%+ coverage
```

### Ã¥â€¦Â³Ã©â€Â®Ã§Å¡â€žÃ§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¦Â³Â¨Ã¥â€ Å’ Ã¢â€ â€™ Ã©â€šÂ®Ã§Â®Â±Ã©ÂªÅ’Ã¨Â¯Â Ã¢â€ â€™ Ã¥Ë†â€ºÃ¥Â»ÂºÃ§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®
2. Ã§â„¢Â»Ã¥Â½â€¢ Ã¢â€ â€™ Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœ Ã¢â€ â€™ CRUD Ã¦â€œÂÃ¤Â½Å“
3. Ã¥Ââ€¡Ã§ÂºÂ§Ã¨Â®Â¡Ã¥Ë†â€™ Ã¢â€ â€™ Stripe Ã§Â»â€œÃ¨Â´Â¦ Ã¢â€ â€™ Ã¨Â®Â¢Ã©Ëœâ€¦Ã¦Â¿â‚¬Ã¦Â´Â»
4. WebhookÃ¯Â¼Å¡Ã¨Â®Â¢Ã©Ëœâ€¦Ã¥Ââ€“Ã¦Â¶Ë† Ã¢â€ â€™ Ã©â„¢ÂÃ§ÂºÂ§Ã¥Ë†Â°Ã¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€š

## ECC Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```bash
# Planning a feature
/plan "Add team invitations with email notifications"

# Developing with TDD
/tdd

# Before committing
/code-review
/security-scan

# Before release
/e2e
/test-coverage
```

## Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

* `feat:` Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’`fix:` Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å’`refactor:` Ã¤Â»Â£Ã§Â ÂÃ¥ÂËœÃ¦â€ºÂ´
* Ã¤Â»Å½ `main` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Å Å¸Ã¨Æ’Â½Ã¥Ë†â€ Ã¦â€Â¯Ã¯Â¼Å’Ã©Å“â‚¬Ã¨Â¦Â PR
* CI Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬ÂÃ¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å¡Ã¥Å“Â¨ PR Ã¤Â¸Å Ã©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â° Vercel Ã©Â¢â€žÃ¨Â§Ë†Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼Å’Ã¥Å“Â¨Ã¥ÂË†Ã¥Â¹Â¶Ã¥Ë†Â° `main` Ã¦â€”Â¶Ã©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â°Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’
