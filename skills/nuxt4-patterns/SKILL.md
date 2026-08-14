---
name: nuxt4-patterns
description: Nuxt 4 app patterns for hydration safety, performance, route rules, lazy loading, and SSR-safe data fetching with useFetch and useAsyncData. Use when building or reviewing a Nuxt 4 app, or debugging hydration mismatches and SSR-safe data fetching.
metadata:
  origin: ECC
---

# Nuxt 4 Patterns

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


Use when building or debugging Nuxt 4 apps with SSR, hybrid rendering, route rules, or page-level data fetching.

## When to Activate

- Hydration mismatches between server HTML and client state
- Route-level rendering decisions such as prerender, SWR, ISR, or client-only sections
- Performance work around lazy loading, lazy hydration, or payload size
- Page or component data fetching with `useFetch`, `useAsyncData`, or `$fetch`
- Nuxt routing issues tied to route params, middleware, or SSR/client differences

## Hydration Safety

- Keep the first render deterministic. Do not put `Date.now()`, `Math.random()`, browser-only APIs, or storage reads directly into SSR-rendered template state.
- Move browser-only logic behind `onMounted()`, `import.meta.client`, `ClientOnly`, or a `.client.vue` component when the server cannot produce the same markup.
- Use Nuxt's `useRoute()` composable, not the one from `vue-router`.
- Do not use `route.fullPath` to drive SSR-rendered markup. URL fragments are client-only, which can create hydration mismatches.
- Treat `ssr: false` as an escape hatch for truly browser-only areas, not a default fix for mismatches.

## Data Fetching

- Prefer `await useFetch()` for SSR-safe API reads in pages and components. It forwards server-fetched data into the Nuxt payload and avoids a second fetch on hydration.
- Use `useAsyncData()` when the fetcher is not a simple `$fetch()` call, when you need a custom key, or when you are composing multiple async sources.
- Give `useAsyncData()` a stable key for cache reuse and predictable refresh behavior.
- Keep `useAsyncData()` handlers side-effect free. They can run during SSR and hydration.
- Use `$fetch()` for user-triggered writes or client-only actions, not top-level page data that should be hydrated from SSR.
- Use `lazy: true`, `useLazyFetch()`, or `useLazyAsyncData()` for non-critical data that should not block navigation. Handle `status === 'pending'` in the UI.
- Use `server: false` only for data that is not needed for SEO or the first paint.
- Trim payload size with `pick` and prefer shallower payloads when deep reactivity is unnecessary.

```ts
const route = useRoute()

const { data: article, status, error, refresh } = await useAsyncData(
  () => `article:${route.params.slug}`,
  () => $fetch(`/api/articles/${route.params.slug}`),
)

const { data: comments } = await useFetch(`/api/articles/${route.params.slug}/comments`, {
  lazy: true,
  server: false,
})
```

## Route Rules

Prefer `routeRules` in `nuxt.config.ts` for rendering and caching strategy:

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/products/**': { swr: 3600 },
    '/blog/**': { isr: true },
    '/admin/**': { ssr: false },
    '/api/**': { cache: { maxAge: 60 * 60 } },
  },
})
```

- `prerender`: static HTML at build time
- `swr`: serve cached content and revalidate in the background
- `isr`: incremental static regeneration on supported platforms
- `ssr: false`: client-rendered route
- `cache` or `redirect`: Nitro-level response behavior

Pick route rules per route group, not globally. Marketing pages, catalogs, dashboards, and APIs usually need different strategies.

## Lazy Loading and Performance

- Nuxt already code-splits pages by route. Keep route boundaries meaningful before micro-optimizing component splits.
- Use the `Lazy` prefix to dynamically import non-critical components.
- Conditionally render lazy components with `v-if` so the chunk is not loaded until the UI actually needs it.
- Use lazy hydration for below-the-fold or non-critical interactive UI.

```vue
<template>
  <LazyRecommendations v-if="showRecommendations" />
  <LazyProductGallery hydrate-on-visible />
</template>
```

- For custom strategies, use `defineLazyHydrationComponent()` with a visibility or idle strategy.
- Nuxt lazy hydration works on single-file components. Passing new props to a lazily hydrated component will trigger hydration immediately.
- Use `NuxtLink` for internal navigation so Nuxt can prefetch route components and generated payloads.

## Review Checklist

- First SSR render and hydrated client render produce the same markup
- Page data uses `useFetch` or `useAsyncData`, not top-level `$fetch`
- Non-critical data is lazy and has explicit loading UI
- Route rules match the page's SEO and freshness requirements
- Heavy interactive islands are lazy-loaded or lazily hydrated
