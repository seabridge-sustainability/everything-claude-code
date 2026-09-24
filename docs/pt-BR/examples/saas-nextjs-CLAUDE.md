# AplicaÃƒÂ§ÃƒÂ£o SaaS Ã¢â‚¬â€ CLAUDE.md de Projeto

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> Exemplo real para uma aplicaÃƒÂ§ÃƒÂ£o SaaS com Next.js + Supabase + Stripe.
> Copie para a raiz do seu projeto e customize para sua stack.

## VisÃƒÂ£o Geral do Projeto

**Stack:** Next.js 15 (App Router), TypeScript, Supabase (auth + DB), Stripe (billing), Tailwind CSS, Playwright (E2E)

**Arquitetura:** Server Components por padrÃƒÂ£o. Client Components apenas para interatividade. API routes para webhooks e server actions para mutaÃƒÂ§ÃƒÂµes.

## Regras CrÃƒÂ­ticas

### Banco de Dados

- Todas as queries usam cliente Supabase com RLS habilitado Ã¢â‚¬â€ nunca bypass de RLS
- Migrations em `supabase/migrations/` Ã¢â‚¬â€ nunca modificar banco diretamente
- Use `select()` com lista explÃƒÂ­cita de colunas, nÃƒÂ£o `select('*')`
- Todas as queries user-facing devem incluir `.limit()` para evitar resultados sem limite

### AutenticaÃƒÂ§ÃƒÂ£o

- Use `createServerClient()` de `@supabase/ssr` em Server Components
- Use `createBrowserClient()` de `@supabase/ssr` em Client Components
- Rotas protegidas checam `getUser()` Ã¢â‚¬â€ nunca confiar sÃƒÂ³ em `getSession()` para auth
- Middleware em `middleware.ts` renova tokens de auth em toda requisiÃƒÂ§ÃƒÂ£o

### Billing

- Handler de webhook Stripe em `app/api/webhooks/stripe/route.ts`
- Nunca confiar em preÃƒÂ§o do cliente Ã¢â‚¬â€ sempre buscar do Stripe server-side
- Status da assinatura checado via coluna `subscription_status`, sincronizada por webhook
- UsuÃƒÂ¡rios free tier: 3 projetos, 100 chamadas de API/dia

### Estilo de CÃƒÂ³digo

- Sem emojis em cÃƒÂ³digo ou comentÃƒÂ¡rios
- Apenas padrÃƒÂµes imutÃƒÂ¡veis Ã¢â‚¬â€ spread operator, nunca mutar
- Server Components: sem diretiva `'use client'`, sem `useState`/`useEffect`
- Client Components: `'use client'` no topo, mÃƒÂ­nimo possÃƒÂ­vel Ã¢â‚¬â€ extraia lÃƒÂ³gica para hooks
- Prefira schemas Zod para toda validaÃƒÂ§ÃƒÂ£o de entrada (API routes, formulÃƒÂ¡rios, env vars)

## Estrutura de Arquivos

```
src/
  app/
    (auth)/          # Auth pages (login, signup, forgot-password)
    (dashboard)/     # Protected dashboard pages
    api/
      webhooks/      # Stripe, Supabase webhooks
    layout.tsx       # Root layout with providers
  components/
    ui/              # Shadcn/ui components
    forms/           # Form components with validation
    dashboard/       # Dashboard-specific components
  hooks/             # Custom React hooks
  lib/
    supabase/        # Supabase client factories
    stripe/          # Stripe client and helpers
    utils.ts         # General utilities
  types/             # Shared TypeScript types
supabase/
  migrations/        # Database migrations
  seed.sql           # Development seed data
```

## PadrÃƒÂµes-Chave

### Formato de Resposta de API

```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

### PadrÃƒÂ£o de Server Action

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

## VariÃƒÂ¡veis de Ambiente

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

## EstratÃƒÂ©gia de Teste

```bash
/tdd                    # Unit + integration tests for new features
/e2e                    # Playwright tests for auth flow, billing, dashboard
/test-coverage          # Verify 80%+ coverage
```

### Fluxos E2E CrÃƒÂ­ticos

1. Sign up Ã¢â€ â€™ verificaÃƒÂ§ÃƒÂ£o de e-mail Ã¢â€ â€™ criaÃƒÂ§ÃƒÂ£o do primeiro projeto
2. Login Ã¢â€ â€™ dashboard Ã¢â€ â€™ operaÃƒÂ§ÃƒÂµes CRUD
3. Upgrade de plano Ã¢â€ â€™ Stripe checkout Ã¢â€ â€™ assinatura ativa
4. Webhook: assinatura cancelada Ã¢â€ â€™ downgrade para free tier

## Workflow ECC

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

## Fluxo Git

- `feat:` novas features, `fix:` correÃƒÂ§ÃƒÂµes de bug, `refactor:` mudanÃƒÂ§as de cÃƒÂ³digo
- Branches de feature a partir da `main`, PRs obrigatÃƒÂ³rios
- CI roda: lint, type-check, unit tests, E2E tests
- Deploy: preview da Vercel em PR, produÃƒÂ§ÃƒÂ£o no merge para `main`
