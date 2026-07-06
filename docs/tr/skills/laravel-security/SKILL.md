---
name: laravel-security
description: Laravel security best practices for authn/authz, validation, CSRF, mass assignment, file uploads, secrets, rate limiting, and secure deployment.
origin: ECC
---

# Laravel GÃƒÂ¼venlik En Ã„Â°yi UygulamalarÃ„Â±

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


Laravel uygulamalarÃ„Â±nÃ„Â± yaygÃ„Â±n gÃƒÂ¼venlik aÃƒÂ§Ã„Â±klarÃ„Â±na karÃ…Å¸Ã„Â± korumak iÃƒÂ§in kapsamlÃ„Â± gÃƒÂ¼venlik rehberi.

## Ne Zaman Aktif Edilir

- Kimlik doÃ„Å¸rulama veya yetkilendirme ekleme
- KullanÃ„Â±cÃ„Â± giriÃ…Å¸i ve dosya yÃƒÂ¼klemelerini iÃ…Å¸leme
- Yeni API endpoint'leri oluÃ…Å¸turma
- Gizli bilgileri ve ortam ayarlarÃ„Â±nÃ„Â± yÃƒÂ¶netme
- Production deployment'larÃ„Â± sertleÃ…Å¸tirme

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

- Middleware temel korumalar saÃ„Å¸lar (CSRF iÃƒÂ§in `VerifyCsrfToken`, gÃƒÂ¼venlik baÃ…Å¸lÃ„Â±klarÃ„Â± iÃƒÂ§in `SecurityHeaders`).
- Guard'lar ve policy'ler eriÃ…Å¸im kontrolÃƒÂ¼nÃƒÂ¼ zorlar (`auth:sanctum`, `$this->authorize`, policy middleware).
- Form Request'ler servislere ulaÃ…Å¸madan ÃƒÂ¶nce giriÃ…Å¸i doÃ„Å¸rular ve Ã…Å¸ekillendirir (`UploadInvoiceRequest`).
- Rate limiting, auth kontrolleri ile birlikte kÃƒÂ¶tÃƒÂ¼ye kullanÃ„Â±m korumasÃ„Â± ekler (`RateLimiter::for('login')`).
- Veri gÃƒÂ¼venliÃ„Å¸i encrypted cast'lerden, mass-assignment korumalarÃ„Â±ndan ve signed route'lardan gelir (`URL::temporarySignedRoute` + `signed` middleware).

## Temel GÃƒÂ¼venlik AyarlarÃ„Â±

- Production'da `APP_DEBUG=false`
- `APP_KEY` ayarlanmalÃ„Â± ve tehlikeye girdiÃ„Å¸inde dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼lmelidir
- `SESSION_SECURE_COOKIE=true` ve `SESSION_SAME_SITE=lax` ayarlayÃ„Â±n (veya hassas uygulamalar iÃƒÂ§in `strict`)
- DoÃ„Å¸ru HTTPS algÃ„Â±lama iÃƒÂ§in gÃƒÂ¼venilir proxy'leri yapÃ„Â±landÃ„Â±rÃ„Â±n

## Session ve Cookie SertleÃ…Å¸tirme

- JavaScript eriÃ…Å¸imini ÃƒÂ¶nlemek iÃƒÂ§in `SESSION_HTTP_ONLY=true` ayarlayÃ„Â±n
- YÃƒÂ¼ksek riskli akÃ„Â±Ã…Å¸lar iÃƒÂ§in `SESSION_SAME_SITE=strict` kullanÃ„Â±n
- Login ve ayrÃ„Â±calÃ„Â±k deÃ„Å¸iÃ…Å¸ikliklerinde session'larÃ„Â± yeniden oluÃ…Å¸turun

## Kimlik DoÃ„Å¸rulama ve Token'lar

- API kimlik doÃ„Å¸rulama iÃƒÂ§in Laravel Sanctum veya Passport kullanÃ„Â±n
- Hassas veriler iÃƒÂ§in yenileme akÃ„Â±Ã…Å¸larÃ„Â± ile kÃ„Â±sa ÃƒÂ¶mÃƒÂ¼rlÃƒÂ¼ token'larÃ„Â± tercih edin
- Logout ve tehlikeye girmiÃ…Å¸ hesaplarda token'larÃ„Â± iptal edin

Ãƒâ€“rnek route korumasÃ„Â±:

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
```

## Parola GÃƒÂ¼venliÃ„Å¸i

- `Hash::make()` ile parolalarÃ„Â± hash'leyin ve asla dÃƒÂ¼z metin saklamayÃ„Â±n
- SÃ„Â±fÃ„Â±rlama akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in Laravel'in password broker'Ã„Â±nÃ„Â± kullanÃ„Â±n

```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

$validated = $request->validate([
    'password' => ['required', 'string', Password::min(12)->letters()->mixedCase()->numbers()->symbols()],
]);

$user->update(['password' => Hash::make($validated['password'])]);
```

## Yetkilendirme: Policy'ler ve Gate'ler

- Model seviyesi yetkilendirme iÃƒÂ§in policy'leri kullanÃ„Â±n
- Controller'larda ve servislerde yetkilendirmeyi zorlayÃ„Â±n

```php
$this->authorize('update', $project);
```

Route seviyesi zorlama iÃƒÂ§in policy middleware kullanÃ„Â±n:

```php
use Illuminate\Support\Facades\Route;

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware(['auth:sanctum', 'can:update,project']);
```

## Validation ve Veri Temizleme

- Her zaman Form Request'ler ile giriÃ…Å¸leri doÃ„Å¸rulayÃ„Â±n
- SÃ„Â±kÃ„Â± validation kurallarÃ„Â± ve tip kontrolleri kullanÃ„Â±n
- TÃƒÂ¼retilmiÃ…Å¸ alanlar iÃƒÂ§in request payload'larÃ„Â±na asla gÃƒÂ¼venmeyin

## Mass Assignment KorumasÃ„Â±

- `$fillable` veya `$guarded` kullanÃ„Â±n ve `Model::unguard()` kullanmaktan kaÃƒÂ§Ã„Â±nÃ„Â±n
- DTO'larÃ„Â± veya aÃƒÂ§Ã„Â±k attribute mapping'i tercih edin

## SQL Injection Ãƒâ€“nleme

- Eloquent veya query builder parametre binding kullanÃ„Â±n
- Kesinlikle gerekli olmadÃ„Â±kÃƒÂ§a raw SQL kullanmaktan kaÃƒÂ§Ã„Â±nÃ„Â±n

```php
DB::select('select * from users where email = ?', [$email]);
```

## XSS Ãƒâ€“nleme

- Blade varsayÃ„Â±lan olarak ÃƒÂ§Ã„Â±ktÃ„Â±yÃ„Â± escape eder (`{{ }}`)
- `{!! !!}` sadece gÃƒÂ¼venilir, temizlenmiÃ…Å¸ HTML iÃƒÂ§in kullanÃ„Â±n
- Zengin metni ÃƒÂ¶zel bir kÃƒÂ¼tÃƒÂ¼phane ile temizleyin

## CSRF KorumasÃ„Â±

- `VerifyCsrfToken` middleware'ini etkin tutun
- Formlara `@csrf` ekleyin ve SPA istekleri iÃƒÂ§in XSRF token'larÃ„Â± gÃƒÂ¶nderin

Sanctum ile SPA kimlik doÃ„Å¸rulamasÃ„Â± iÃƒÂ§in, stateful isteklerin yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±ndan emin olun:

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost')),
```

## Dosya YÃƒÂ¼kleme GÃƒÂ¼venliÃ„Å¸i

- Dosya boyutunu, MIME tipini ve uzantÃ„Â±sÃ„Â±nÃ„Â± doÃ„Å¸rulayÃ„Â±n
- MÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda yÃƒÂ¼klemeleri public path dÃ„Â±Ã…Å¸Ã„Â±nda saklayÃ„Â±n
- Gerekirse dosyalarÃ„Â± malware iÃƒÂ§in tarayÃ„Â±n

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
    config('filesystems.private_disk', 'local') // bunu public olmayan bir disk'e ayarlayÃ„Â±n
);
```

## Rate Limiting

- Auth ve yazma endpoint'lerinde `throttle` middleware'i uygulayÃ„Â±n
- Login, password reset ve OTP iÃƒÂ§in daha sÃ„Â±kÃ„Â± limitler kullanÃ„Â±n

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

- Gizli bilgileri asla kaynak kontrolÃƒÂ¼ne commit etmeyin
- Ortam deÃ„Å¸iÃ…Å¸kenlerini ve gizli yÃƒÂ¶neticileri kullanÃ„Â±n
- Maruz kalma sonrasÃ„Â± anahtarlarÃ„Â± dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼n ve session'larÃ„Â± geÃƒÂ§ersiz kÃ„Â±lÃ„Â±n

## Ã…Å¾ifreli Attribute'lar

Bekleyen hassas sÃƒÂ¼tunlar iÃƒÂ§in encrypted cast'leri kullanÃ„Â±n.

```php
protected $casts = [
    'api_token' => 'encrypted',
];
```

## GÃƒÂ¼venlik BaÃ…Å¸lÃ„Â±klarÃ„Â±

- Uygun yerlerde CSP, HSTS ve frame korumasÃ„Â± ekleyin
- HTTPS yÃƒÂ¶nlendirmelerini zorlamak iÃƒÂ§in gÃƒÂ¼venilir proxy yapÃ„Â±landÃ„Â±rmasÃ„Â± kullanÃ„Â±n

BaÃ…Å¸lÃ„Â±klarÃ„Â± ayarlamak iÃƒÂ§in ÃƒÂ¶rnek middleware:

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
            'Strict-Transport-Security' => 'max-age=31536000', // tÃƒÂ¼m subdomain'ler HTTPS olduÃ„Å¸unda includeSubDomains/preload ekleyin
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer',
        ]);

        return $response;
    }
}
```

## CORS ve API EriÃ…Å¸imi

- `config/cors.php`'de origin'leri kÃ„Â±sÃ„Â±tlayÃ„Â±n
- Kimlik doÃ„Å¸rulamalÃ„Â± route'lar iÃƒÂ§in wildcard origin'lerden kaÃƒÂ§Ã„Â±nÃ„Â±n

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

- ParolalarÃ„Â±, token'larÃ„Â± veya tam kart verilerini asla loglamayÃ„Â±n
- YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ loglarda hassas alanlarÃ„Â± redakte edin

```php
use Illuminate\Support\Facades\Log;

Log::info('User updated profile', [
    'user_id' => $user->id,
    'email' => '[REDACTED]',
    'token' => '[REDACTED]',
]);
```

## BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k GÃƒÂ¼venliÃ„Å¸i

- DÃƒÂ¼zenli olarak `composer audit` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
- BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± dikkatle sabitleyin ve CVE'lerde hÃ„Â±zlÃ„Â±ca gÃƒÂ¼ncelleyin

## Signed URL'ler

GeÃƒÂ§ici, kurcalamaya dayanÃ„Â±klÃ„Â± baÃ„Å¸lantÃ„Â±lar iÃƒÂ§in signed route'larÃ„Â± kullanÃ„Â±n.

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
