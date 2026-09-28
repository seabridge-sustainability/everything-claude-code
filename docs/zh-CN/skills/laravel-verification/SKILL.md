---
name: laravel-verification
description: "Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness."
origin: ECC
---

# Laravel 验证循环

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


在发起 PR 前、进行重大更改后以及部署前运行。

## 使用时机

* 在为一个 Laravel 项目开启拉取请求之前
* 在重大重构或依赖升级之后
* 为预生产或生产环境进行部署前验证
* 运行完整的 代码检查 -> 测试 -> 安全检查 -> 部署就绪 流水线

## 工作原理

* 按顺序运行从环境检查到部署就绪的各个阶段，每一层都建立在前一层的基础上。
* 环境和 Composer 检查是所有其他步骤的关卡；如果它们失败，立即停止。
* 代码检查/静态分析应在运行完整测试和覆盖率检查前确保通过。
* 安全性和迁移审查在测试之后进行，以便在涉及数据或发布步骤之前验证行为。
* 构建/部署就绪以及队列/调度器检查是最后的关卡；任何失败都会阻止发布。

## 第一阶段：环境检查

```bash
php -v
composer --version
php artisan --version
```

* 验证 `.env` 文件存在且包含必需的键
* 确认生产环境已设置 `APP_DEBUG=false`
* 确认 `APP_ENV` 与目标部署环境匹配（`production`、`staging`）

如果在本地使用 Laravel Sail：

```bash
./vendor/bin/sail php -v
./vendor/bin/sail artisan --version
```

## 第一阶段补充：Composer 和自动加载

```bash
composer validate
composer dump-autoload -o
```

## 第二阶段：代码检查和静态分析

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
```

如果你的项目使用 Psalm 而不是 PHPStan：

```bash
vendor/bin/psalm
```

## 第三阶段：测试和覆盖率

```bash
php artisan test
```

覆盖率（CI 环境）：

```bash
XDEBUG_MODE=coverage php artisan test --coverage
```

CI 示例（格式化 -> 静态分析 -> 测试）：

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
```

## 第四阶段：安全和依赖项检查

```bash
composer audit
```

## 第五阶段：数据库和迁移

```bash
php artisan migrate --pretend
php artisan migrate:status
```

* 仔细审查破坏性迁移
* 确保迁移文件名遵循 `Y_m_d_His_*` 格式（例如，`2025_03_14_154210_create_orders_table.php`）并清晰地描述变更
* 确保可以执行回滚
* 验证 `down()` 方法，避免在没有明确备份的情况下造成不可逆的数据丢失

## 第六阶段：构建和部署就绪

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

* 确保在生产配置下缓存预热成功
* 验证队列工作者和调度器已配置
* 确认在目标环境中 `storage/` 和 `bootstrap/cache/` 目录可写

## 第七阶段：队列和调度器检查

```bash
php artisan schedule:list
php artisan queue:failed
```

如果使用了 Horizon：

```bash
php artisan horizon:status
```

如果 `queue:monitor` 命令可用，可以用它来检查积压作业而无需处理它们：

```bash
php artisan queue:monitor default --max=100
```

主动验证（仅限预生产环境）：向一个专用队列分发一个无操作作业，并运行一个单独的工作者来处理它（确保配置了一个非 `sync` 的队列连接）。

```bash
php artisan tinker --execute="dispatch((new App\\Jobs\\QueueHealthcheck())->onQueue('healthcheck'))"
php artisan queue:work --once --queue=healthcheck
```

验证该作业产生了预期的副作用（日志条目、健康检查表行或指标）。

仅在处理测试作业是安全的非生产环境中运行此检查。

## 示例

最小流程：

```bash
php -v
composer --version
php artisan --version
composer validate
vendor/bin/pint --test
vendor/bin/phpstan analyse
php artisan test
composer audit
php artisan migrate --pretend
php artisan config:cache
php artisan queue:failed
```

CI 风格流水线：

```bash
composer validate
composer dump-autoload -o
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
composer audit
php artisan migrate --pretend
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan schedule:list
```
