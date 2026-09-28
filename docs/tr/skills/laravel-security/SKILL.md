---
name: laravel-security
description: Laravel security best practices for authn/authz, validation, CSRF, mass assignment, file uploads, secrets, rate limiting, and secure deployment.
origin: ECC
---

# Laravel Güvenlik En İyi Uygulamaları

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


Laravel uygulamalarını yaygın güvenlik açıklarına karşı korumak için kapsamlı güvenlik rehberi.

## Ne Zaman Aktif Edilir

- Kimlik doğrulama veya yetkilendirme ekleme
- Kullanıcı girişi ve dosya yüklemelerini işleme
- Yeni API endpoint'leri oluşturma
- Gizli bilgileri ve ortam ayarlarını yönetme
- Production deployment'ları sertleştirme

## Nasıl Çalışır

- Middleware temel korumalar sağlar (CSRF için `VerifyCsrfToken`, güvenlik başlıkları için `SecurityHeaders`).
- Guard'lar ve policy'ler erişim kontrolünü zorlar (`auth:sanctum`, `$this->authorize`, policy middleware).
- Form Request'ler servislere ulaşmadan önce girişi doğrular ve şekillendirir (`UploadInvoiceRequest`).
- Rate limiting, auth kontrolleri ile birlikte kötüye kullanım koruması ekler (`RateLimiter::for('login')`).
- Veri güvenliği encrypted cast'lerden, mass-assignment korumalarından ve signed route'lardan gelir (`URL::temporarySignedRoute` + `signed` middleware).

## Temel Güvenlik Ayarları

- Production'da `APP_DEBUG=false`
- `APP_KEY` ayarlanmalı ve tehlikeye girdiğinde döndürülmelidir
- `SESSION_SECURE_COOKIE=true` ve `SESSION_SAME_SITE=lax` ayarlayın (veya hassas uygulamalar için `strict`)
- Doğru HTTPS algılama için güvenilir proxy'leri yapılandırın

## Session ve Cookie Sertleştirme

- JavaScript erişimini önlemek için `SESSION_HTTP_ONLY=true` ayarlayın
- Yüksek riskli akışlar için `SESSION_SAME_SITE=strict` kullanın
- Login ve ayrıcalık değişikliklerinde session'ları yeniden oluşturun

## Kimlik Doğrulama ve Token'lar

- API kimlik doğrulama için Laravel Sanctum veya Passport kullanın
- Hassas veriler için yenileme akışları ile kısa ömürlü token'ları tercih edin
- Logout ve tehlikeye girmiş hesaplarda token'ları iptal edin

Örnek route koruması:

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
```

## Parola Güvenliği

- `Hash::make()` ile parolaları hash'leyin ve asla düz metin saklamayın
- Sıfırlama akışları için Laravel'in password broker'ını kullanın

```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

$validated = $request->validate([
    'password' => ['required', 'string', Password::min(12)->letters()->mixedCase()->numbers()->symbols()],
]);

$user->update(['password' => Hash::make($validated['password'])]);
```

## Yetkilendirme: Policy'ler ve Gate'ler

- Model seviyesi yetkilendirme için policy'leri kullanın
- Controller'larda ve servislerde yetkilendirmeyi zorlayın

```php
$this->authorize('update', $project);
```

Route seviyesi zorlama için policy middleware kullanın:

```php
use Illuminate\Support\Facades\Route;

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware(['auth:sanctum', 'can:update,project']);
```

## Validation ve Veri Temizleme

- Her zaman Form Request'ler ile girişleri doğrulayın
- Sıkı validation kuralları ve tip kontrolleri kullanın
- Türetilmiş alanlar için request payload'larına asla güvenmeyin

## Mass Assignment Koruması

- `$fillable` veya `$guarded` kullanın ve `Model::unguard()` kullanmaktan kaçının
- DTO'ları veya açık attribute mapping'i tercih edin

## SQL Injection Önleme

- Eloquent veya query builder parametre binding kullanın
- Kesinlikle gerekli olmadıkça raw SQL kullanmaktan kaçının

```php
DB::select('select * from users where email = ?', [$email]);
```

## XSS Önleme

- Blade varsayılan olarak çıktıyı escape eder (`{{ }}`)
- `{!! !!}` sadece güvenilir, temizlenmiş HTML için kullanın
- Zengin metni özel bir kütüphane ile temizleyin

## CSRF Koruması

- `VerifyCsrfToken` middleware'ini etkin tutun
- Formlara `@csrf` ekleyin ve SPA istekleri için XSRF token'ları gönderin

Sanctum ile SPA kimlik doğrulaması için, stateful isteklerin yapılandırıldığından emin olun:

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost')),
```

## Dosya Yükleme Güvenliği

- Dosya boyutunu, MIME tipini ve uzantısını doğrulayın
- Mümkün olduğunda yüklemeleri public path dışında saklayın
- Gerekirse dosyaları malware için tarayın

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
    config('filesystems.private_disk', 'local') // bunu public olmayan bir disk'e ayarlayın
);
```

## Rate Limiting

- Auth ve yazma endpoint'lerinde `throttle` middleware'i uygulayın
- Login, password reset ve OTP için daha sıkı limitler kullanın

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

## Gizli Bilgiler ve Kimlik Bilgileri

- Gizli bilgileri asla kaynak kontrolüne commit etmeyin
- Ortam değişkenlerini ve gizli yöneticileri kullanın
- Maruz kalma sonrası anahtarları döndürün ve session'ları geçersiz kılın

## Şifreli Attribute'lar

Bekleyen hassas sütunlar için encrypted cast'leri kullanın.

```php
protected $casts = [
    'api_token' => 'encrypted',
];
```

## Güvenlik Başlıkları

- Uygun yerlerde CSP, HSTS ve frame koruması ekleyin
- HTTPS yönlendirmelerini zorlamak için güvenilir proxy yapılandırması kullanın

Başlıkları ayarlamak için örnek middleware:

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
            'Strict-Transport-Security' => 'max-age=31536000', // tüm subdomain'ler HTTPS olduğunda includeSubDomains/preload ekleyin
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer',
        ]);

        return $response;
    }
}
```

## CORS ve API Erişimi

- `config/cors.php`'de origin'leri kısıtlayın
- Kimlik doğrulamalı route'lar için wildcard origin'lerden kaçının

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

## Loglama ve PII

- Parolaları, token'ları veya tam kart verilerini asla loglamayın
- Yapılandırılmış loglarda hassas alanları redakte edin

```php
use Illuminate\Support\Facades\Log;

Log::info('User updated profile', [
    'user_id' => $user->id,
    'email' => '[REDACTED]',
    'token' => '[REDACTED]',
]);
```

## Bağımlılık Güvenliği

- Düzenli olarak `composer audit` çalıştırın
- Bağımlılıkları dikkatle sabitleyin ve CVE'lerde hızlıca güncelleyin

## Signed URL'ler

Geçici, kurcalamaya dayanıklı bağlantılar için signed route'ları kullanın.

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
