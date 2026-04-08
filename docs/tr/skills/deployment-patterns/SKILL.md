---
name: deployment-patterns
description: Deployment iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±, CI/CD pipeline kalÃ„Â±plarÃ„Â±, Docker konteynerizasyonu, saÃ„Å¸lÃ„Â±k kontrolleri, rollback stratejileri ve web uygulamalarÃ„Â± iÃƒÂ§in ÃƒÂ¼retim hazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â± kontrol listeleri.
origin: ECC
---

# Deployment KalÃ„Â±plarÃ„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


ÃƒÅ“retim deployment iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± ve CI/CD en iyi uygulamalarÃ„Â±.

## Ne Zaman AktifleÃ…Å¸tirmeli

- CI/CD pipeline'larÃ„Â± kurarken
- Bir uygulamayÃ„Â± Docker'ize ederken
- Deployment stratejisi planlarken (blue-green, canary, rolling)
- SaÃ„Å¸lÃ„Â±k kontrolleri ve hazÃ„Â±rlÃ„Â±k probe'larÃ„Â± uygularken
- ÃƒÅ“retim yayÃ„Â±nÃ„Â±na hazÃ„Â±rlanÃ„Â±rken
- Ortama ÃƒÂ¶zgÃƒÂ¼ ayarlarÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±rken

## Deployment Stratejileri

### Rolling Deployment (VarsayÃ„Â±lan)

Instance'larÃ„Â± kademeli olarak deÃ„Å¸iÃ…Å¸tir Ã¢â‚¬â€ rollout sÃ„Â±rasÃ„Â±nda eski ve yeni versiyonlar birlikte ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r.

```
Instance 1: v1 Ã¢â€ â€™ v2  (ÃƒÂ¶nce gÃƒÂ¼ncelle)
Instance 2: v1        (hala v1 ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor)
Instance 3: v1        (hala v1 ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor)

Instance 1: v2
Instance 2: v1 Ã¢â€ â€™ v2  (ikinci olarak gÃƒÂ¼ncelle)
Instance 3: v1

Instance 1: v2
Instance 2: v2
Instance 3: v1 Ã¢â€ â€™ v2  (son olarak gÃƒÂ¼ncelle)
```

**ArtÃ„Â±larÃ„Â±:** SÃ„Â±fÃ„Â±r kesinti, kademeli rollout
**Eksileri:** Ã„Â°ki versiyon aynÃ„Â± anda ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r Ã¢â‚¬â€ geriye uyumlu deÃ„Å¸iÃ…Å¸iklikler gerektirir
**Ne zaman kullanÃ„Â±lÃ„Â±r:** Standart deployment'lar, geriye uyumlu deÃ„Å¸iÃ…Å¸iklikler

### Blue-Green Deployment

Ã„Â°ki ÃƒÂ¶zdeÃ…Å¸ ortam ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r. TrafiÃ„Å¸i atomik olarak deÃ„Å¸iÃ…Å¸tir.

```
Blue  (v1) Ã¢â€ Â trafik
Green (v2)   boÃ…Å¸ta, yeni versiyon ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor

# DoÃ„Å¸rulamadan sonra:
Blue  (v1)   boÃ…Å¸ta (yedek haline gelir)
Green (v2) Ã¢â€ Â trafik
```

**ArtÃ„Â±larÃ„Â±:** AnÃ„Â±nda rollback (blue'ya geri dÃƒÂ¶n), temiz geÃƒÂ§iÃ…Å¸
**Eksileri:** Deployment sÃ„Â±rasÃ„Â±nda 2x altyapÃ„Â± gerektirir
**Ne zaman kullanÃ„Â±lÃ„Â±r:** Kritik servisler, sorunlara sÃ„Â±fÃ„Â±r tolerans

### Canary Deployment

Ãƒâ€“nce trafiÃ„Å¸in kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k bir yÃƒÂ¼zdesini yeni versiyona yÃƒÂ¶nlendir.

```
v1: %95 trafik
v2:  %5 trafik  (canary)

# Metrikler iyi gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼yorsa:
v1: %50 trafik
v2: %50 trafik

# Final:
v2: %100 trafik
```

**ArtÃ„Â±larÃ„Â±:** Tam rollout'tan ÃƒÂ¶nce gerÃƒÂ§ek trafikle sorunlarÃ„Â± yakalar
**Eksileri:** Trafik bÃƒÂ¶lme altyapÃ„Â±sÃ„Â±, izleme gerektirir
**Ne zaman kullanÃ„Â±lÃ„Â±r:** YÃƒÂ¼ksek trafikli servisler, riskli deÃ„Å¸iÃ…Å¸iklikler, feature flag'ler

## Docker

### Multi-Stage Dockerfile (Node.js)

```dockerfile
# Stage 1: BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± yÃƒÂ¼kle
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 3: Production image
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
```

### Multi-Stage Dockerfile (Go)

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /server ./cmd/server

FROM alpine:3.19 AS runner
RUN apk --no-cache add ca-certificates
RUN adduser -D -u 1001 appuser
USER appuser

COPY --from=builder /server /server

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["/server"]
```

### Multi-Stage Dockerfile (Python/Django)

```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir uv
COPY requirements.txt .
RUN uv pip install --system --no-cache -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app

RUN useradd -r -u 1001 appuser
USER appuser

COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health/')" || exit 1
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

### Docker En Ã„Â°yi UygulamalarÃ„Â±

```
# Ã„Â°YÃ„Â° uygulamalar
- Belirli versiyon tag'leri kullanÃ„Â±n (node:22-alpine, node:latest deÃ„Å¸il)
- Image boyutunu minimize etmek iÃƒÂ§in multi-stage build'ler
- Root olmayan kullanÃ„Â±cÃ„Â± olarak ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- Ãƒâ€“nce baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k dosyalarÃ„Â±nÃ„Â± kopyalayÃ„Â±n (layer caching)
- node_modules, .git, test'leri hariÃƒÂ§ tutmak iÃƒÂ§in .dockerignore kullanÃ„Â±n
- HEALTHCHECK talimatÃ„Â± ekleyin
- docker-compose veya k8s'te kaynak limitleri ayarlayÃ„Â±n

# KÃƒâ€“TÃƒÅ“ uygulamalar
- Root olarak ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmak
- :latest tag'lerini kullanmak
- TÃƒÂ¼m repo'yu tek COPY layer'da kopyalamak
- Production image'de dev baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â±nÃ„Â± yÃƒÂ¼klemek
- Image'de secret'larÃ„Â± saklamak (env var veya secrets manager kullanÃ„Â±n)
```

## CI/CD Pipeline

### GitHub Actions (Standart Pipeline)

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage
          path: coverage/

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to production
        run: |
          # Platforma ÃƒÂ¶zgÃƒÂ¼ deployment komutu
          # Railway: railway up
          # Vercel: vercel --prod
          # K8s: kubectl set image deployment/app app=ghcr.io/${{ github.repository }}:${{ github.sha }}
          echo "Deploying ${{ github.sha }}"
```

### Pipeline AÃ…Å¸amalarÃ„Â±

```
PR aÃƒÂ§Ã„Â±ldÃ„Â±Ã„Å¸Ã„Â±nda:
  lint Ã¢â€ â€™ typecheck Ã¢â€ â€™ unit tests Ã¢â€ â€™ integration tests Ã¢â€ â€™ preview deploy

Main'e merge edildiÃ„Å¸inde:
  lint Ã¢â€ â€™ typecheck Ã¢â€ â€™ unit tests Ã¢â€ â€™ integration tests Ã¢â€ â€™ build image Ã¢â€ â€™ deploy staging Ã¢â€ â€™ smoke tests Ã¢â€ â€™ deploy production
```

## SaÃ„Å¸lÃ„Â±k Kontrolleri

### SaÃ„Å¸lÃ„Â±k KontrolÃƒÂ¼ Endpoint'i

```typescript
// Basit saÃ„Å¸lÃ„Â±k kontrolÃƒÂ¼
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// DetaylÃ„Â± saÃ„Å¸lÃ„Â±k kontrolÃƒÂ¼ (dahili izleme iÃƒÂ§in)
app.get("/health/detailed", async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    externalApi: await checkExternalApi(),
  };

  const allHealthy = Object.values(checks).every(c => c.status === "ok");

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || "unknown",
    uptime: process.uptime(),
    checks,
  });
});

async function checkDatabase(): Promise<HealthCheck> {
  try {
    await db.query("SELECT 1");
    return { status: "ok", latency_ms: 2 };
  } catch (err) {
    return { status: "error", message: "Database unreachable" };
  }
}
```

### Kubernetes Probe'larÃ„Â±

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 30
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 2

startupProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 0
  periodSeconds: 5
  failureThreshold: 30    # 30 * 5s = 150s max baÃ…Å¸latma sÃƒÂ¼resi
```

## Ortam YapÃ„Â±landÃ„Â±rmasÃ„Â±

### Twelve-Factor App KalÃ„Â±bÃ„Â±

```bash
# TÃƒÂ¼m yapÃ„Â±landÃ„Â±rma ortam deÃ„Å¸iÃ…Å¸kenleri ile Ã¢â‚¬â€ asla kodda deÃ„Å¸il
DATABASE_URL=postgres://user:pass@host:5432/db
REDIS_URL=redis://host:6379/0
API_KEY=${API_KEY}           # secrets manager tarafÃ„Â±ndan enjekte edilir
LOG_LEVEL=info
PORT=3000

# Ortama ÃƒÂ¶zgÃƒÂ¼ davranÃ„Â±Ã…Å¸
NODE_ENV=production          # veya staging, development
APP_ENV=production           # aÃƒÂ§Ã„Â±k uygulama ortamÃ„Â±
```

### YapÃ„Â±landÃ„Â±rma Validasyonu

```typescript
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

// BaÃ…Å¸langÃ„Â±ÃƒÂ§ta validasyon yap Ã¢â‚¬â€ yapÃ„Â±landÃ„Â±rma yanlÃ„Â±Ã…Å¸sa hÃ„Â±zlÃ„Â± baÃ…Å¸arÃ„Â±sÃ„Â±z ol
export const env = envSchema.parse(process.env);
```

## Rollback Stratejisi

### AnÃ„Â±nda Rollback

```bash
# Docker/Kubernetes: ÃƒÂ¶nceki image'a iÃ…Å¸aret et
kubectl rollout undo deployment/app

# Vercel: ÃƒÂ¶nceki deployment'Ã„Â± yÃƒÂ¼kselt
vercel rollback

# Railway: ÃƒÂ¶nceki commit'i tekrar deploy et
railway up --commit <previous-sha>

# VeritabanÃ„Â±: migration'Ã„Â± rollback et (geri alÃ„Â±nabilirse)
npx prisma migrate resolve --rolled-back <migration-name>
```

### Rollback Kontrol Listesi

- [ ] Ãƒâ€“nceki image/artifact mevcut ve tag'lenmiÃ…Å¸
- [ ] VeritabanÃ„Â± migration'larÃ„Â± geriye uyumlu (yÃ„Â±kÃ„Â±cÃ„Â± deÃ„Å¸iÃ…Å¸iklik yok)
- [ ] Feature flag'ler deploy olmadan yeni ÃƒÂ¶zellikleri devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakabilir
- [ ] Hata oranÃ„Â± artÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in izleme alarmlarÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] Rollback ÃƒÂ¼retim yayÃ„Â±nÃ„Â±ndan ÃƒÂ¶nce staging'de test edilmiÃ…Å¸

## ÃƒÅ“retim HazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â± Kontrol Listesi

Herhangi bir ÃƒÂ¼retim deployment'Ã„Â±ndan ÃƒÂ¶nce:

### Uygulama
- [ ] TÃƒÂ¼m testler geÃƒÂ§iyor (unit, integration, E2E)
- [ ] Kodda veya yapÃ„Â±landÃ„Â±rma dosyalarÃ„Â±nda hardcode edilmiÃ…Å¸ secret yok
- [ ] Hata iÃ…Å¸leme tÃƒÂ¼m edge case'leri kapsÃ„Â±yor
- [ ] Loglama yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ (JSON) ve PII iÃƒÂ§ermiyor
- [ ] SaÃ„Å¸lÃ„Â±k kontrolÃƒÂ¼ endpoint'i anlamlÃ„Â± durum dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼yor

### AltyapÃ„Â±
- [ ] Docker image yeniden ÃƒÂ¼retilebilir Ã…Å¸ekilde build oluyor (sabitlenmiÃ…Å¸ versiyonlar)
- [ ] Ortam deÃ„Å¸iÃ…Å¸kenleri dokÃƒÂ¼mante edilmiÃ…Å¸ ve baÃ…Å¸langÃ„Â±ÃƒÂ§ta validate ediliyor
- [ ] Kaynak limitleri ayarlanmÃ„Â±Ã…Å¸ (CPU, bellek)
- [ ] Horizontal scaling yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ (min/max instance'lar)
- [ ] TÃƒÂ¼m endpoint'lerde SSL/TLS etkin

### Ã„Â°zleme
- [ ] Uygulama metrikleri export ediliyor (istek oranÃ„Â±, gecikme, hatalar)
- [ ] Hata oranÃ„Â± > eÃ…Å¸ik iÃƒÂ§in alarmlar yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] Log toplama kurulmuÃ…Å¸ (yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ loglar, aranabilir)
- [ ] SaÃ„Å¸lÃ„Â±k endpoint'inde uptime izleme

### GÃƒÂ¼venlik
- [ ] BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar CVE'ler iÃƒÂ§in taranmÃ„Â±Ã…Å¸
- [ ] CORS sadece izin verilen origin'ler iÃƒÂ§in yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] Halka aÃƒÂ§Ã„Â±k endpoint'lerde hÃ„Â±z sÃ„Â±nÃ„Â±rlama etkin
- [ ] Kimlik doÃ„Å¸rulama ve yetkilendirme doÃ„Å¸rulanmÃ„Â±Ã…Å¸
- [ ] GÃƒÂ¼venlik header'larÃ„Â± ayarlanmÃ„Â±Ã…Å¸ (CSP, HSTS, X-Frame-Options)

### Operasyonlar
- [ ] Rollback planÃ„Â± dokÃƒÂ¼mante edilmiÃ…Å¸ ve test edilmiÃ…Å¸
- [ ] VeritabanÃ„Â± migration'Ã„Â± ÃƒÂ¼retim boyutundaki veriye karÃ…Å¸Ã„Â± test edilmiÃ…Å¸
- [ ] YaygÃ„Â±n hata senaryolarÃ„Â± iÃƒÂ§in runbook
- [ ] NÃƒÂ¶bet rotasyonu ve yÃƒÂ¼kseltme yolu tanÃ„Â±mlanmÃ„Â±Ã…Å¸
