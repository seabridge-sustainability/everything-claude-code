---
name: laravel-security
description: Laravel 安全最佳实践，涵盖认证/授权、验证、CSRF、批量赋值、文件上传、密钥管理、速率限制和安全部署。
origin: ECC
---

# Laravel 安全最佳实践

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


针对 Laravel 应用程序的全面安全指导，以防范常见漏洞。

## 何时启用

* 添加身份验证或授权时
* 处理用户输入和文件上传时
* 构建新的 API 端点时
* 管理密钥和环境设置时
* 强化生产环境部署时

## 工作原理

* 中间件提供基础保护（通过 `VerifyCsrfToken` 实现 CSRF，通过 `SecurityHeaders` 实现安全标头）。
* 守卫和策略强制执行访问控制（`auth:sanctum`、`$this->authorize`、策略中间件）。
* 表单请求在输入到达服务之前进行验证和整形（`UploadInvoiceRequest`）。
* 速率限制在身份验证控制之外增加滥用保护（`RateLimiter::for('login')`）。
* 数据安全来自加密转换、批量赋值保护以及签名路由（`URL::temporarySignedRoute` + `signed` 中间件）。

## 核心安全设置

* 生产环境中设置 `APP_DEBUG=false`
* `APP_KEY` 必须设置，并在泄露时轮换
* 设置 `SESSION_SECURE_COOKIE=true` 和 `SESSION_SAME_SITE=lax`（对于敏感应用，使用 `strict`）
* 配置受信任的代理以正确检测 HTTPS

## 会话和 Cookie 强化

* 设置 `SESSION_HTTP_ONLY=true` 以防止 JavaScript 访问
* 对高风险流程使用 `SESSION_SAME_SITE=strict`
* 在登录和权限变更时重新生成会话

## 身份验证与令牌

* 使用 Laravel Sanctum 或 Passport 进行 API 身份验证
* 对于敏感数据，优先使用带有刷新流程的短期令牌
* 在注销和账户泄露时撤销令牌

路由保护示例：

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
```

## 密码安全

* 使用 `Hash::make()` 哈希密码，切勿存储明文
* 使用 Laravel 的密码代理进行重置流程

```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

$validated = $request->validate([
    'password' => ['required', 'string', Password::min(12)->letters()->mixedCase()->numbers()->symbols()],
]);

$user->update(['password' => Hash::make($validated['password'])]);
```

## 授权：策略与门面

* 使用策略进行模型级授权
* 在控制器和服务中强制执行授权

```php
$this->authorize('update', $project);
```

使用策略中间件进行路由级强制执行：

```php
use Illuminate\Support\Facades\Route;

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware(['auth:sanctum', 'can:update,project']);
```

## 验证与数据清理

* 始终使用表单请求验证输入
* 使用严格的验证规则和类型检查
* 切勿信任请求负载中的派生字段

## 批量赋值保护

* 使用 `$fillable` 或 `$guarded`，避免使用 `Model::unguard()`
* 优先使用 DTO 或显式的属性映射

## SQL 注入防范

* 使用 Eloquent 或查询构建器的参数绑定
* 除非绝对必要，避免使用原生 SQL

```php
DB::select('select * from users where email = ?', [$email]);
```

## XSS 防范

* Blade 默认转义输出（`{{ }}`）
* 仅对可信的、已清理的 HTML 使用 `{!! !!}`
* 使用专用库清理富文本

## CSRF 保护

* 保持 `VerifyCsrfToken` 中间件启用
* 在表单中包含 `@csrf`，并为 SPA 请求发送 XSRF 令牌

对于使用 Sanctum 的 SPA 身份验证，确保配置了有状态请求：

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost')),
```

## 文件上传安全

* 验证文件大小、MIME 类型和扩展名
* 尽可能将上传文件存储在公开路径之外
* 如果需要，扫描文件以查找恶意软件

```php
final class UploadInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('upload-invoice');
    }

    public function rules(): array
    {
        return [
            'invoice' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }
}
```

```php
$path = $request->file('invoice')->store(
    'invoices',
    config('filesystems.private_disk', 'local') // set this to a non-public disk
);
```

## 速率限制

* 在身份验证和写入端点应用 `throttle` 中间件
* 对登录、密码重置和 OTP 使用更严格的限制

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('login', function (Request $request) {
    return [
        Limit::perMinute(5)->by($request->ip()),
        Limit::perMinute(5)->by(strtolower((string) $request->input('email'))),
    ];
});
```

## 密钥与凭据

* 切勿将密钥提交到源代码管理
* 使用环境变量和密钥管理器
* 密钥暴露后及时轮换，并使会话失效

## 加密属性

对静态的敏感列使用加密转换。

```php
protected $casts = [
    'api_token' => 'encrypted',
];
```

## 安全标头

* 在适当的地方添加 CSP、HSTS 和框架保护
* 使用受信任的代理配置来强制执行 HTTPS 重定向

设置标头的中间件示例：

```php
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class SecurityHeaders
{
    public function handle(Request $request, \Closure $next): Response
    {
        $response = $next($request);

        $response->headers->add([
            'Content-Security-Policy' => "default-src 'self'",
            'Strict-Transport-Security' => 'max-age=31536000', // add includeSubDomains/preload only when all subdomains are HTTPS
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer',
        ]);

        return $response;
    }
}
```

## CORS 与 API 暴露

* 在 `config/cors.php` 中限制来源
* 对于经过身份验证的路由，避免使用通配符来源

```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    'allowed_origins' => ['https://app.example.com'],
    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-XSRF-TOKEN',
        'X-CSRF-TOKEN',
    ],
    'supports_credentials' => true,
];
```

## 日志记录与 PII

* 切勿记录密码、令牌或完整的卡片数据
* 在结构化日志中编辑敏感字段

```php
use Illuminate\Support\Facades\Log;

Log::info('User updated profile', [
    'user_id' => $user->id,
    'email' => '[REDACTED]',
    'token' => '[REDACTED]',
]);
```

## 依赖项安全

* 定期运行 `composer audit`
* 谨慎固定依赖项版本，并在出现 CVE 时及时更新

## 签名 URL

使用签名路由生成临时的、防篡改的链接。

```php
use Illuminate\Support\Facades\URL;

$url = URL::temporarySignedRoute(
    'downloads.invoice',
    now()->addMinutes(15),
    ['invoice' => $invoice->id]
);
```

```php
use Illuminate\Support\Facades\Route;

Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'download'])
    ->name('downloads.invoice')
    ->middleware('signed');
```
