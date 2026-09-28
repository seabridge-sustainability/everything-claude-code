---
name: eval-harness
description: 克劳德代码会话的正式评估框架，实施评估驱动开发（EDD）原则
origin: ECC
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Eval Harness 技能

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


一个用于 Claude Code 会话的正式评估框架，实现了评估驱动开发 (EDD) 原则。

## 何时激活

* 为 AI 辅助工作流程设置评估驱动开发 (EDD)
* 定义 Claude Code 任务完成的标准（通过/失败）
* 使用 pass@k 指标衡量代理可靠性
* 为提示或代理变更创建回归测试套件
* 跨模型版本对代理性能进行基准测试

## 理念

评估驱动开发将评估视为 "AI 开发的单元测试"：

* 在实现 **之前** 定义预期行为
* 在开发过程中持续运行评估
* 跟踪每次更改的回归情况
* 使用 pass@k 指标来衡量可靠性

## 评估类型

### 能力评估

测试 Claude 是否能完成之前无法完成的事情：

```markdown
[能力评估：功能名称]
任务：描述 Claude 应完成的工作
成功标准：
  - [ ] 标准 1
  - [ ] 标准 2
  - [ ] 标准 标准 3
预期输出：对预期结果的描述

```

### 回归评估

确保更改不会破坏现有功能：

```markdown
[回归评估：功能名称]
基线：SHA 或检查点名称
测试：
  - 现有测试-1：通过/失败
  - 现有测试-2：通过/失败
  - 现有测试-3：通过/失败
结果：X/Y 通过（之前为 Y/Y）

```

## 评分器类型

### 1. 基于代码的评分器

使用代码进行确定性检查：

```bash
# Check if file contains expected pattern
grep -q "export function handleAuth" src/auth.ts && echo "PASS" || echo "FAIL"

# Check if tests pass
npm test -- --testPathPattern="auth" && echo "PASS" || echo "FAIL"

# Check if build succeeds
npm run build && echo "PASS" || echo "FAIL"
```

### 2. 基于模型的评分器

使用 Claude 来评估开放式输出：

```markdown
[MODEL GRADER PROMPT]
评估以下代码变更：
1. 它是否解决了所述问题？
2. 它的结构是否良好？
3. 是否处理了边界情况？
4. 错误处理是否恰当？

评分：1-5 (1=差，5=优秀)
推理：[解释]

```

### 3. 人工评分器

标记为需要手动审查：

```markdown
[HUMAN REVIEW REQUIRED]
变更：对更改内容的描述
原因：为何需要人工审核
风险等级：低/中/高

```

## 指标

### pass@k

"k 次尝试中至少成功一次"

* pass@1：首次尝试成功率
* pass@3：3 次尝试内成功率
* 典型目标：pass@3 > 90%

### pass^k

"所有 k 次试验都成功"

* 更高的可靠性门槛
* pass^3：连续 3 次成功
* 用于关键路径

## 评估工作流程

### 1. 定义（编码前）

```markdown
## 评估定义：功能-xyz

### 能力评估
1. 可以创建新用户账户
2. 可以验证电子邮件格式
3. 可以安全地哈希密码

### 回归评估
1. 现有登录功能仍然有效
2. 会话管理未改变
3. 注销流程完整

### 成功指标
- 能力评估的 pass@3 > 90%
- 回归评估的 pass^3 = 100%

```

### 2. 实现

编写代码以通过已定义的评估。

### 3. 评估

```bash
# Run capability evals
[Run each capability eval, record PASS/FAIL]

# Run regression evals
npm test -- --testPathPattern="existing"

# Generate report
```

### 4. 报告

```markdown
评估报告：功能-xyz
========================

能力评估：
  创建用户：    通过（通过@1）
  验证邮箱：    通过（通过@2）
  哈希密码：    通过（通过@1）
  总计：         3/3 通过

回归评估：
  登录流程：     通过
  会话管理：     通过
  登出流程：     通过
  总计：         3/3 通过

指标：
  通过@1： 67% (2/3)
  通过@3： 100% (3/3)

状态：准备就绪，待审核

```

## 集成模式

### 实施前

```
/eval define feature-name
```

在 `.claude/evals/feature-name.md` 处创建评估定义文件

### 实施过程中

```
/eval check feature-name
```

运行当前评估并报告状态

### 实施后

```
/eval 报告 功能名称
```

生成完整的评估报告

## 评估存储

将评估存储在项目中：

```
.claude/
  evals/
    feature-xyz.md      # Eval定义
    feature-xyz.log     # Eval运行历史
    baseline.json       # 回归基线
```

## 最佳实践

1. **在编码前定义评估** - 强制清晰地思考成功标准
2. **频繁运行评估** - 及早发现回归问题
3. **随时间跟踪 pass@k** - 监控可靠性趋势
4. **尽可能使用代码评分器** - 确定性 > 概率性
5. **对安全性进行人工审查** - 永远不要完全自动化安全检查
6. **保持评估快速** - 缓慢的评估不会被运行
7. **评估与代码版本化** - 评估是一等工件

## 示例：添加身份验证

```markdown
## EVAL：添加身份验证

### 第 1 阶段：定义 (10 分钟)
能力评估：
- [ ] 用户可以使用邮箱/密码注册
- [ ] 用户可以使用有效凭证登录
- [ ] 无效凭证被拒绝并显示适当的错误
- [ ] 会话在页面重新加载后保持
- [ ] 登出操作清除会话

回归评估：
- [ ] 公共路由仍可访问
- [ ] API 响应未改变
- [ ] 数据库模式兼容

### 第 2 阶段：实施 (时间不定)
[编写代码]

### 第 3 阶段：评估
运行：/eval check add-authentication

### 第 4 阶段：报告
评估报告：添加身份验证
==============================
能力：5/5 通过 (pass@3: 100%)
回归：3/3 通过 (pass^3: 100%)
状态：可以发布

```

## 产品评估 (v1.8)

当单元测试无法单独捕获行为质量时，使用产品评估。

### 评分器类型

1. 代码评分器（确定性断言）
2. 规则评分器（正则表达式/模式约束）
3. 模型评分器（LLM 作为评判者的评估准则）
4. 人工评分器（针对模糊输出的人工裁定）

### pass@k 指南

* `pass@1`：直接可靠性
* `pass@3`：受控重试下的实际可靠性
* `pass^3`：稳定性测试（所有 3 次运行必须通过）

推荐阈值：

* 能力评估：pass@3 >= 0.90
* 回归评估：对于发布关键路径，pass^3 = 1.00

### 评估反模式

* 将提示过度拟合到已知的评估示例
* 仅测量正常路径输出
* 在追求通过率时忽略成本和延迟漂移
* 在发布关卡中允许不稳定的评分器

### 最小评估工件布局

* `.claude/evals/<feature>.md` 定义
* `.claude/evals/<feature>.log` 运行历史
* `docs/releases/<version>/eval-summary.md` 发布快照
