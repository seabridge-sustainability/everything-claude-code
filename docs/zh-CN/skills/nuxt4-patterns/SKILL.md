---
name: nuxt4-patterns
description: Nuxt 4 应用模式，涵盖水合安全、性能优化、路由规则、懒加载，以及使用 useFetch 和 useAsyncData 进行 SSR 安全的数据获取。
origin: ECC
---

# Nuxt 4 模式

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


在构建或调试具有 SSR、混合渲染、路由规则或页面级数据获取的 Nuxt 4 应用时使用。

## 何时激活

* 服务器 HTML 与客户端状态之间的水合不匹配
* 路由级别的渲染决策，例如预渲染、SWR、ISR 或仅客户端部分
* 围绕懒加载、延迟水合或有效负载大小的性能工作
* 使用 `useFetch`、`useAsyncData` 或 `$fetch` 进行页面或组件数据获取
* 与路由参数、中间件或 SSR/客户端差异相关的 Nuxt 路由问题

## 水合安全性

* 保持首次渲染是确定性的。不要将 `Date.now()`、`Math.random()`、仅限浏览器的 API 或存储读取直接放入 SSR 渲染的模板状态中。
* 当服务器无法生成相同标记时，将仅限浏览器的逻辑移到 `onMounted()`、`import.meta.client`、`ClientOnly` 或 `.client.vue` 组件后面。
* 使用 Nuxt 的 `useRoute()` 组合式函数，而不是来自 `vue-router` 的那个。
* 不要使用 `route.fullPath` 来驱动 SSR 渲染的标记。URL 片段是仅客户端的，这可能导致水合不匹配。
* 将 `ssr: false` 视为真正仅限浏览器区域的逃生舱口，而不是解决不匹配的默认修复方法。

## 数据获取

* 在页面和组件中，优先使用 `await useFetch()` 进行 SSR 安全的 API 读取。它将服务器获取的数据转发到 Nuxt 有效负载中，并避免在水合时进行第二次获取。
* 当数据获取器不是简单的 `$fetch()` 调用，或者需要自定义键，或者正在组合多个异步源时，使用 `useAsyncData()`。
* 为 `useAsyncData()` 提供一个稳定的键以重用缓存并实现可预测的刷新行为。
* 保持 `useAsyncData()` 处理程序无副作用。它们可能在 SSR 和水合期间运行。
* 将 `$fetch()` 用于用户触发的写入或仅客户端操作，而不是应该从 SSR 水合而来的顶级页面数据。
* 对于不应阻塞导航的非关键数据，使用 `lazy: true`、`useLazyFetch()` 或 `useLazyAsyncData()`。在 UI 中处理 `status === 'pending'`。
* 仅对 SEO 或首次绘制不需要的数据使用 `server: false`。
* 使用 `pick` 修剪有效负载大小，并在不需要深层响应性时优先使用较浅的有效负载。

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

## 路由规则

在 `nuxt.config.ts` 中优先使用 `routeRules` 来定义渲染和缓存策略：

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

* `prerender`：在构建时生成静态 HTML
* `swr`：提供缓存内容并在后台重新验证
* `isr`：在支持的平台上进行增量静态再生
* `ssr: false`：客户端渲染的路由
* `cache` 或 `redirect`：Nitro 级别的响应行为

按路由组选择路由规则，而非全局设置。营销页面、产品目录、仪表板和 API 通常需要不同的策略。

## 懒加载与性能

* Nuxt 已经按路由进行代码分割。在微优化组件分割之前，保持路由边界的意义。
* 使用 `Lazy` 前缀来动态导入非关键组件。
* 使用 `v-if` 有条件地渲染懒加载组件，以便在 UI 实际需要时才加载该代码块。
* 对首屏下方或非关键的交互式 UI 使用延迟水合。

```vue
<template>
  <LazyRecommendations v-if="showRecommendations" />
  <LazyProductGallery hydrate-on-visible />
</template>
```

* 对于自定义策略，使用 `defineLazyHydrationComponent()` 配合可见性或空闲策略。
* Nuxt 延迟水合适用于单文件组件。向延迟水合的组件传递新 props 将立即触发水合。
* 在内部导航中使用 `NuxtLink`，以便 Nuxt 可以预取路由组件和生成的有效负载。

## 检查清单

* 首次 SSR 渲染和水合后的客户端渲染产生相同的标记
* 页面数据使用 `useFetch` 或 `useAsyncData`，而非顶层的 `$fetch`
* 非关键数据是懒加载的，并具有明确的加载 UI
* 路由规则符合页面的 SEO 和新鲜度要求
* 重量级交互式组件是懒加载或延迟水合的
