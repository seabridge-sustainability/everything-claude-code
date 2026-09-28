---
name: verification-loop
description: "Claude Code 会话的全面验证系统。"
origin: ECC
---

# 验证循环技能

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


一个全面的 Claude Code 会话验证系统。

## 何时使用

在以下情况下调用此技能：

* 完成功能或重大代码变更后
* 创建 PR 之前
* 当您希望确保质量门通过时
* 重构之后

## 验证阶段

### 阶段 1：构建验证

```bash
# Check if project builds
npm run build 2>&1 | tail -20
# OR
pnpm build 2>&1 | tail -20
```

如果构建失败，请停止并在继续之前修复。

### 阶段 2：类型检查

```bash
# TypeScript projects
npx tsc --noEmit 2>&1 | head -30

# Python projects
pyright . 2>&1 | head -30
```

报告所有类型错误。在继续之前修复关键错误。

### 阶段 3：代码规范检查

```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### 阶段 4：测试套件

```bash
# Run tests with coverage
npm run test -- --coverage 2>&1 | tail -50

# Check coverage threshold
# Target: 80% minimum
```

报告：

* 总测试数：X
* 通过：X
* 失败：X
* 覆盖率：X%

### 阶段 5：安全扫描

```bash
# Check for secrets
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# Check for console.log
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### 阶段 6：差异审查

```bash
# Show what changed
git diff --stat
git diff HEAD~1 --name-only
```

审查每个更改的文件，检查：

* 意外更改
* 缺失的错误处理
* 潜在的边界情况

## 输出格式

运行所有阶段后，生成验证报告：

```
验证报告
==================

构建:     [通过/失败]
类型:     [通过/失败] (X 处错误)
代码检查:  [通过/失败] (X 条警告)
测试:     [通过/失败] (X/Y 通过，覆盖率 Z%)
安全:     [通过/失败] (X 个问题)
差异:      [X 个文件被修改]

总体:     [就绪/未就绪] 提交 PR

待修复问题:
1. ...
2. ...
```

## 持续模式

对于长时间会话，每 15 分钟或在重大更改后运行验证：

```markdown
设置一个心理检查点：
- 完成每个函数后
- 完成一个组件后
- 在移动到下一个任务之前

运行: /verify

```

## 与钩子的集成

此技能补充 PostToolUse 钩子，但提供更深入的验证。
钩子会立即捕获问题；此技能提供全面的审查。
