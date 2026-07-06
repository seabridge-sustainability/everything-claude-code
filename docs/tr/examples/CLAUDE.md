# Ãƒâ€“rnek Proje CLAUDE.md

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


Bu, ÃƒÂ¶rnek bir proje seviyesi CLAUDE.md dosyasÃ„Â±dÃ„Â±r. Bunu proje kÃƒÂ¶k dizininize yerleÃ…Å¸tirin.

## Proje Genel BakÃ„Â±Ã…Å¸

[Projenizin kÃ„Â±sa aÃƒÂ§Ã„Â±klamasÃ„Â± - ne yaptÃ„Â±Ã„Å¸Ã„Â±, teknoloji yÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±]

## Kritik Kurallar

### 1. Kod Organizasyonu

- BirkaÃƒÂ§ bÃƒÂ¼yÃƒÂ¼k dosya yerine ÃƒÂ§ok sayÃ„Â±da kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k dosya
- YÃƒÂ¼ksek baÃ„Å¸lÃ„Â±lÃ„Â±k, dÃƒÂ¼Ã…Å¸ÃƒÂ¼k baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k
- Tipik olarak 200-400 satÃ„Â±r, dosya baÃ…Å¸Ã„Â±na maksimum 800 satÃ„Â±r
- Tipe gÃƒÂ¶re deÃ„Å¸il, ÃƒÂ¶zellik/domain'e gÃƒÂ¶re organize edin

### 2. Kod Stili

- Kod, yorum veya dokÃƒÂ¼mantasyonda emoji kullanmayÃ„Â±n
- Her zaman deÃ„Å¸iÃ…Å¸mezlik - asla obje veya array'leri mutate etmeyin
- Production kodunda console.log kullanmayÃ„Â±n
- try/catch ile uygun hata yÃƒÂ¶netimi
- Zod veya benzeri ile input validasyonu

### 3. Test

- TDD: Ãƒâ€“nce testleri yazÃ„Â±n
- Minimum %80 kapsama
- Utility'ler iÃƒÂ§in unit testler
- API'ler iÃƒÂ§in integration testler
- Kritik akÃ„Â±Ã…Å¸lar iÃƒÂ§in E2E testler

### 4. GÃƒÂ¼venlik

- Hardcoded secret kullanmayÃ„Â±n
- Hassas veriler iÃƒÂ§in environment variable'lar
- TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdilerini validate edin
- Sadece parametreli sorgular
- CSRF korumasÃ„Â± aktif

## Dosya YapÃ„Â±sÃ„Â±

```
src/
|-- app/              # Next.js app router
|-- components/       # Tekrar kullanÃ„Â±labilir UI bileÃ…Å¸enleri
|-- hooks/            # Custom React hooks
|-- lib/              # Utility kÃƒÂ¼tÃƒÂ¼phaneleri
|-- types/            # TypeScript tanÃ„Â±mlamalarÃ„Â±
```

## Temel Desenler

### API Response FormatÃ„Â±

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Hata YÃƒÂ¶netimi

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'KullanÃ„Â±cÃ„Â± dostu mesaj' }
}
```

## Environment Variable'lar

```bash
# Gerekli
DATABASE_URL=
API_KEY=

# Opsiyonel
DEBUG=false
```

## KullanÃ„Â±labilir Komutlar

- `/tdd` - Test-driven development iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `/plan` - Uygulama planÃ„Â± oluÃ…Å¸tur
- `/code-review` - Kod kalitesini gÃƒÂ¶zden geÃƒÂ§ir
- `/build-fix` - Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zelt

## Git Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

- Conventional commit'ler: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Asla doÃ„Å¸rudan main'e commit yapmayÃ„Â±n
- PR'lar review gerektirir
- Merge'den ÃƒÂ¶nce tÃƒÂ¼m testler geÃƒÂ§meli
