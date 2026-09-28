---
name: bun-runtime
description: Bun 作为运行时、包管理器、打包器和测试运行器。何时选择 Bun 而非 Node、迁移注意事项以及 Vercel 支持。
origin: ECC
---

# Bun 运行时

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


Bun 是一个快速的全能 JavaScript 运行时和工具集：运行时、包管理器、打包器和测试运行器。

## 何时使用

* **优先选择 Bun** 用于：新的 JS/TS 项目、安装/运行速度很重要的脚本、使用 Bun 运行时的 Vercel 部署，以及当您想要单一工具链（运行 + 安装 + 测试 + 构建）时。
* **优先选择 Node** 用于：最大的生态系统兼容性、假定使用 Node 的遗留工具，或者当某个依赖项存在已知的 Bun 问题时。

在以下情况下使用：采用 Bun、从 Node 迁移、编写或调试 Bun 脚本/测试，或在 Vercel 或其他平台上配置 Bun。

## 工作原理

* **运行时**：开箱即用的 Node 兼容运行时（基于 JavaScriptCore，用 Zig 实现）。
* **包管理器**：`bun install` 比 npm/yarn 快得多。在当前 Bun 中，锁文件默认为 `bun.lock`（文本）；旧版本使用 `bun.lockb`（二进制）。
* **打包器**：用于应用程序和库的内置打包器和转译器。
* **测试运行器**：内置的 `bun test`，具有类似 Jest 的 API。

**从 Node 迁移**：将 `node script.js` 替换为 `bun run script.js` 或 `bun script.js`。运行 `bun install` 代替 `npm install`；大多数包都能工作。使用 `bun run` 来执行 npm 脚本；使用 `bun x` 进行 npx 风格的临时运行。支持 Node 内置模块；在存在 Bun API 的地方优先使用它们以获得更好的性能。

**Vercel**：在项目设置中将运行时设置为 Bun。构建命令：`bun run build` 或 `bun build ./src/index.ts --outdir=dist`。安装命令：`bun install --frozen-lockfile` 用于可重复的部署。

## 示例

### 运行和安装

```bash
# Install dependencies (creates/updates bun.lock or bun.lockb)
bun install

# Run a script or file
bun run dev
bun run src/index.ts
bun src/index.ts
```

### 脚本和环境变量

```bash
bun run --env-file=.env dev
FOO=bar bun run script.ts
```

### 测试

```bash
bun test
bun test --watch
```

```typescript
// test/example.test.ts
import { expect, test } from "bun:test";

test("add", () => {
  expect(1 + 2).toBe(3);
});
```

### 运行时 API

```typescript
const file = Bun.file("package.json");
const json = await file.json();

Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello");
  },
});
```

## 最佳实践

* 提交锁文件（`bun.lock` 或 `bun.lockb`）以实现可重复的安装。
* 在脚本中优先使用 `bun run`。对于 TypeScript，Bun 原生运行 `.ts`。
* 保持依赖项最新；Bun 和生态系统发展迅速。
