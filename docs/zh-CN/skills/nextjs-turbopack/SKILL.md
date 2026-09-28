---
name: nextjs-turbopack
description: Next.js 16+ 和 Turbopack — 增量打包、文件系统缓存、开发速度，以及何时使用 Turbopack 与 webpack。
origin: ECC
---

# Next.js 与 Turbopack

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Next.js 16+ 在本地开发中默认使用 Turbopack：这是一个用 Rust 编写的增量捆绑器，能显著加快开发启动和热更新的速度。

## 何时使用

* **Turbopack (默认开发模式)**：用于日常开发。冷启动和热模块替换速度更快，尤其是在大型应用中。
* **Webpack (旧版开发模式)**：仅当遇到 Turbopack 错误或依赖仅在开发中可用的 webpack 插件时使用。可通过 `--webpack`（或 `--no-turbopack`，具体取决于你的 Next.js 版本；请查阅你所用版本的文档）来禁用。
* **生产环境**：生产构建行为 (`next build`) 可能使用 Turbopack 或 webpack，这取决于 Next.js 版本；请查阅你所用版本的官方 Next.js 文档。

适用场景：开发或调试 Next.js 16+ 应用，诊断开发启动或热模块替换速度慢的问题，或优化生产环境捆绑包。

## 工作原理

* **Turbopack**：用于 Next.js 开发的增量捆绑器。利用文件系统缓存，因此重启速度要快得多（例如，在大型项目中快 5–14 倍）。
* **开发环境默认启用**：从 Next.js 16 开始，`next dev` 默认使用 Turbopack，除非被禁用。
* **文件系统缓存**：重启时会复用之前的工作成果；缓存通常位于 `.next` 下；基本使用无需额外配置。
* **捆绑包分析器 (Next.js 16.1+)**：实验性的捆绑包分析器，用于检查输出并发现重型依赖；可通过配置或实验性标志启用（请查阅你所用版本的 Next.js 文档）。

## 示例

### 命令

```bash
next dev
next build
next start
```

### 使用

运行 `next dev` 以使用 Turbopack 进行本地开发。使用捆绑包分析器（参见 Next.js 文档）来优化代码分割并剔除大型依赖。尽可能优先使用 App Router 和服务器组件。

## 最佳实践

* 保持使用较新的 Next.js 16.x 版本，以获得稳定的 Turbopack 和缓存行为。
* 如果开发速度慢，请确保你正在使用 Turbopack（默认），并且缓存没有被不必要地清除。
* 对于生产环境捆绑包大小问题，请使用你所用版本的官方 Next.js 捆绑包分析工具。
