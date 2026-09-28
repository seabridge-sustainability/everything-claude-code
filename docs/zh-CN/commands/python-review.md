---
description: 全面的Python代码审查，确保符合PEP 8标准、类型提示、安全性以及Pythonic惯用法。调用python-reviewer代理。
---

# Python 代码审查

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

此命令调用 **python-reviewer** 代理进行全面的 Python 专项代码审查。

## 此命令的功能

1. **识别 Python 变更**：通过 `git diff` 查找修改过的 `.py` 文件
2. **运行静态分析**：执行 `ruff`、`mypy`、`pylint`、`black --check`
3. **安全扫描**：检查 SQL 注入、命令注入、不安全的反序列化
4. **类型安全审查**：分析类型提示和 mypy 错误
5. **Pythonic 代码检查**：验证代码是否遵循 PEP 8 和 Python 最佳实践
6. **生成报告**：按严重程度对问题进行归类

## 使用时机

在以下情况使用 `/python-review`：

* 编写或修改 Python 代码后
* 提交 Python 变更前
* 审查包含 Python 代码的拉取请求时
* 接手新的 Python 代码库时
* 学习 Pythonic 模式和惯用法时

## 审查类别

### 关键 (必须修复)

* SQL/命令注入漏洞
* 不安全的 eval/exec 使用
* Pickle 不安全反序列化
* 硬编码的凭证
* YAML 不安全加载
* 隐藏错误的裸 except 子句

### 高 (应该修复)

* 公共函数缺少类型提示
* 可变默认参数
* 静默吞掉异常
* 未对资源使用上下文管理器
* 使用 C 风格循环而非推导式
* 使用 type() 而非 isinstance()
* 无锁的竞态条件

### 中 (考虑)

* 违反 PEP 8 格式规范
* 公共函数缺少文档字符串
* 使用 print 语句而非 logging
* 低效的字符串操作
* 未使用命名常量的魔法数字
* 未使用 f-strings 进行格式化
* 不必要的列表创建

## 运行的自动化检查

```bash
# Type checking
mypy .

# Linting and formatting
ruff check .
black --check .
isort --check-only .

# Security scanning
bandit -r .

# Dependency audit
pip-audit
safety check

# Testing
pytest --cov=app --cov-report=term-missing
```

## 使用示例

````text
User: /python-review

Agent:
# Python Code Review Report

## Files Reviewed
- app/routes/user.py (modified)
- app/services/auth.py (modified)

## Static Analysis Results
✓ ruff: No issues
✓ mypy: No errors
WARNING: black: 2 files need reformatting
✓ bandit: No security issues

## Issues Found

[CRITICAL] SQL Injection vulnerability
File: app/routes/user.py:42
Issue: User input directly interpolated into SQL query
```python
query = f"SELECT * FROM users WHERE id = {user_id}"  # Bad
````

修复：使用参数化查询

```python
query = "SELECT * FROM users WHERE id = %s"  # Good
cursor.execute(query, (user_id,))
```

\[高] 可变默认参数
文件：app/services/auth.py:18
问题：可变默认参数导致共享状态

```python
def process_items(items=[]):  # Bad
    items.append("new")
    return items
```

修复：使用 None 作为默认值

```python
def process_items(items=None):  # Good
    if items is None:
        items = []
    items.append("new")
    return items
```

\[中] 缺少类型提示
文件：app/services/auth.py:25
问题：公共函数缺少类型注解

```python
def get_user(user_id):  # Bad
    return db.find(user_id)
```

修复：添加类型提示

```python
def get_user(user_id: str) -> Optional[User]:  # Good
    return db.find(user_id)
```

\[中] 未使用上下文管理器
文件：app/routes/user.py:55
问题：异常时文件未关闭

```python
f = open("config.json")  # Bad
data = f.read()
f.close()
```

修复：使用上下文管理器

```python
with open("config.json") as f:  # Good
    data = f.read()
```

## 摘要

* 关键：1
* 高：1
* 中：2

建议：FAIL: 在关键问题修复前阻止合并

## 所需的格式化

运行：`black app/routes/user.py app/services/auth.py`

````
## 审批标准

| 状态 | 条件 |
|--------|-----------|
| PASS: 批准 | 无 CRITICAL 或 HIGH 级别问题 |
| WARNING: 警告 | 仅存在 MEDIUM 级别问题（谨慎合并） |
| FAIL: 阻止 | 发现 CRITICAL 或 HIGH 级别问题 |

## 与其他命令的集成

- 首先使用 `/tdd` 确保测试通过
- 使用 `/code-review` 处理非 Python 特定问题
- 在提交前使用 `/python-review`
- 如果静态分析工具失败，请使用 `/build-fix`

## 框架特定审查

### Django 项目
审查员检查：
- N+1 查询问题（使用 `select_related` 和 `prefetch_related`）
- 模型更改缺少迁移
- 在 ORM 可用时使用原始 SQL
- 多步骤操作缺少 `transaction.atomic()`

### FastAPI 项目
审查员检查：
- CORS 配置错误
- 用于请求验证的 Pydantic 模型
- 响应模型的正确性
- 正确的 async/await 使用
- 依赖注入模式

### Flask 项目
审查员检查：
- 上下文管理（应用上下文、请求上下文）
- 正确的错误处理
- Blueprint 组织
- 配置管理

## 相关

- Agent: `agents/python-reviewer.md`
- Skills: `skills/python-patterns/`, `skills/python-testing/`

## 常见修复

### 添加类型提示
```python
# Before
def calculate(x, y):
    return x + y

# After
from typing import Union

def calculate(x: Union[int, float], y: Union[int, float]) -> Union[int, float]:
    return x + y
````

### 使用上下文管理器

```python
# Before
f = open("file.txt")
data = f.read()
f.close()

# After
with open("file.txt") as f:
    data = f.read()
```

### 使用列表推导式

```python
# Before
result = []
for item in items:
    if item.active:
        result.append(item.name)

# After
result = [item.name for item in items if item.active]
```

### 修复可变默认参数

```python
# Before
def append(value, items=[]):
    items.append(value)
    return items

# After
def append(value, items=None):
    if items is None:
        items = []
    items.append(value)
    return items
```

### 使用 f-strings (Python 3.6+)

```python
# Before
name = "Alice"
greeting = "Hello, " + name + "!"
greeting2 = "Hello, {}".format(name)

# After
greeting = f"Hello, {name}!"
```

### 修复循环中的字符串连接

```python
# Before
result = ""
for item in items:
    result += str(item)

# After
result = "".join(str(item) for item in items)
```

## Python 版本兼容性

审查者会指出代码何时使用了新 Python 版本的功能：

| 功能 | 最低 Python 版本 |
|---------|----------------|
| 类型提示 | 3.5+ |
| f-strings | 3.6+ |
| 海象运算符 (`:=`) | 3.8+ |
| 仅限位置参数 | 3.8+ |
| Match 语句 | 3.10+ |
| 类型联合 (`x \| None`) | 3.10+ |

确保你的项目 `pyproject.toml` 或 `setup.py` 指定了正确的最低 Python 版本。
