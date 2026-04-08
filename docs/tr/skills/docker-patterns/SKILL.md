---
name: docker-patterns
description: Yerel geliÃ…Å¸tirme, konteyner gÃƒÂ¼venliÃ„Å¸i, aÃ„Å¸, volume stratejileri ve multi-servis orkestrasyon iÃƒÂ§in Docker ve Docker Compose kalÃ„Â±plarÃ„Â±.
origin: ECC
---

# Docker KalÃ„Â±plarÃ„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Konteynerize edilmiÃ…Å¸ geliÃ…Å¸tirme iÃƒÂ§in Docker ve Docker Compose en iyi uygulamalarÃ„Â±.

## Ne Zaman AktifleÃ…Å¸tirmeli

- Yerel geliÃ…Å¸tirme iÃƒÂ§in Docker Compose kurarken
- Ãƒâ€¡ok konteynerli mimariler tasarlarken
- Konteyner aÃ„Å¸ veya volume sorunlarÃ„Â±nÃ„Â± giderirken
- Dockerfile'larÃ„Â± gÃƒÂ¼venlik ve boyut iÃƒÂ§in incelerken
- Yerel geliÃ…Å¸tirmeden konteynerize iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±na geÃƒÂ§erken

## Yerel GeliÃ…Å¸tirme iÃƒÂ§in Docker Compose

### Standart Web UygulamasÃ„Â± Stack'i

```yaml
# docker-compose.yml
services:
  app:
    build:
      context: .
      target: dev                     # Multi-stage Dockerfile'Ã„Â±n dev aÃ…Å¸amasÃ„Â±nÃ„Â± kullan
    ports:
      - "3000:3000"
    volumes:
      - .:/app                        # Hot reload iÃƒÂ§in bind mount
      - /app/node_modules             # Anonim volume -- konteyner baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â±nÃ„Â± korur
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/app_dev
      - REDIS_URL=redis://redis:6379/0
      - NODE_ENV=development
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    command: npm run dev

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app_dev
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  mailpit:                            # Yerel email testi
    image: axllent/mailpit
    ports:
      - "8025:8025"                   # Web UI
      - "1025:1025"                   # SMTP

volumes:
  pgdata:
  redisdata:
```

### GeliÃ…Å¸tirme vs ÃƒÅ“retim Dockerfile

```dockerfile
# AÃ…Å¸ama: baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# AÃ…Å¸ama: dev (hot reload, debug araÃƒÂ§larÃ„Â±)
FROM node:22-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# AÃ…Å¸ama: build
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

# AÃ…Å¸ama: production (minimal image)
FROM node:22-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
COPY --from=build --chown=appuser:appgroup /app/dist ./dist
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

### Override DosyalarÃ„Â±

```yaml
# docker-compose.override.yml (otomatik yÃƒÂ¼klenir, sadece dev ayarlarÃ„Â±)
services:
  app:
    environment:
      - DEBUG=app:*
      - LOG_LEVEL=debug
    ports:
      - "9229:9229"                   # Node.js debugger

# docker-compose.prod.yml (ÃƒÂ¼retim iÃƒÂ§in aÃƒÂ§Ã„Â±kÃƒÂ§a)
services:
  app:
    build:
      target: production
    restart: always
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
```

```bash
# GeliÃ…Å¸tirme (override'Ã„Â± otomatik yÃƒÂ¼kler)
docker compose up

# ÃƒÅ“retim
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## AÃ„Å¸ (Networking)

### Servis KeÃ…Å¸fi

AynÃ„Â± Compose aÃ„Å¸Ã„Â±ndaki servisler servis adÃ„Â±yla ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlenir:
```
# "app" konteynerinden:
postgres://postgres:postgres@db:5432/app_dev    # "db" db konteynerine ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlenir
redis://redis:6379/0                             # "redis" redis konteynerine ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlenir
```

### Ãƒâ€“zel AÃ„Å¸lar

```yaml
services:
  frontend:
    networks:
      - frontend-net

  api:
    networks:
      - frontend-net
      - backend-net

  db:
    networks:
      - backend-net              # Sadece api'den eriÃ…Å¸ilebilir, frontend'den deÃ„Å¸il

networks:
  frontend-net:
  backend-net:
```

### Sadece Gereklileri AÃƒÂ§Ã„Â±Ã„Å¸a Ãƒâ€¡Ã„Â±karma

```yaml
services:
  db:
    ports:
      - "127.0.0.1:5432:5432"   # Sadece host'tan eriÃ…Å¸ilebilir, aÃ„Å¸dan deÃ„Å¸il
    # ÃƒÅ“retimde port'larÃ„Â± tamamen ÃƒÂ§Ã„Â±kar -- sadece Docker aÃ„Å¸Ã„Â± iÃƒÂ§inden eriÃ…Å¸ilebilir
```

## Volume Stratejileri

```yaml
volumes:
  # Ã„Â°simli volume: konteyner yeniden baÃ…Å¸latmalarÃ„Â±nda kalÃ„Â±cÃ„Â±, Docker tarafÃ„Â±ndan yÃƒÂ¶netilir
  pgdata:

  # Bind mount: host dizinini konteynere eÃ…Å¸ler (geliÃ…Å¸tirme iÃƒÂ§in)
  # - ./src:/app/src

  # Anonim volume: bind mount override'Ã„Â±ndan konteyner tarafÃ„Â±ndan oluÃ…Å¸turulan iÃƒÂ§eriÃ„Å¸i korur
  # - /app/node_modules
```

### YaygÃ„Â±n KalÃ„Â±plar

```yaml
services:
  app:
    volumes:
      - .:/app                   # Kaynak kodu (hot reload iÃƒÂ§in bind mount)
      - /app/node_modules        # Konteyner'Ã„Â±n node_modules'ÃƒÂ¼nÃƒÂ¼ host'tan koru
      - /app/.next               # Build cache'ini koru

  db:
    volumes:
      - pgdata:/var/lib/postgresql/data          # KalÃ„Â±cÃ„Â± veri
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql  # Init scriptleri
```

## Konteyner GÃƒÂ¼venliÃ„Å¸i

### Dockerfile SÃ„Â±kÃ„Â±laÃ…Å¸tÃ„Â±rma

```dockerfile
# 1. Belirli tag'ler kullanÃ„Â±n (:latest asla)
FROM node:22.12-alpine3.20

# 2. Root olmayan kullanÃ„Â±cÃ„Â± olarak ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
RUN addgroup -g 1001 -S app && adduser -S app -u 1001
USER app

# 3. Capability'leri dÃƒÂ¼Ã…Å¸ÃƒÂ¼r (compose'da)
# 4. MÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda salt okunur kÃƒÂ¶k dosya sistemi
# 5. Image layer'larÃ„Â±nda secret yok
```

### Compose GÃƒÂ¼venliÃ„Å¸i

```yaml
services:
  app:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /app/.cache
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE          # Sadece < 1024 port'lara bind iÃƒÂ§in
```

### Secret YÃƒÂ¶netimi

```yaml
# Ã„Â°YÃ„Â°: Ortam deÃ„Å¸iÃ…Å¸kenleri kullanÃ„Â±n (runtime'da enjekte edilir)
services:
  app:
    env_file:
      - .env                     # .env'i asla git'e commit etmeyin
    environment:
      - API_KEY                  # Host ortamÃ„Â±ndan miras alÃ„Â±r

# Ã„Â°YÃ„Â°: Docker secrets (Swarm modu)
secrets:
  db_password:
    file: ./secrets/db_password.txt

services:
  db:
    secrets:
      - db_password

# KÃƒâ€“TÃƒÅ“: Image'de hardcode
# ENV API_KEY=sk-proj-xxxxx      # ASLA BUNU YAPMAYIN
```

## .dockerignore

```
node_modules
.git
.env
.env.*
dist
coverage
*.log
.next
.cache
docker-compose*.yml
Dockerfile*
README.md
tests/
```

## Hata AyÃ„Â±klama

### YaygÃ„Â±n Komutlar

```bash
# LoglarÃ„Â± gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le
docker compose logs -f app           # App loglarÃ„Â±nÃ„Â± takip et
docker compose logs --tail=50 db     # db'den son 50 satÃ„Â±r

# Ãƒâ€¡alÃ„Â±Ã…Å¸an konteynerde komut ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
docker compose exec app sh           # app'e shell ile gir
docker compose exec db psql -U postgres  # postgres'e baÃ„Å¸lan

# Ã„Â°ncele
docker compose ps                     # Ãƒâ€¡alÃ„Â±Ã…Å¸an servisler
docker compose top                    # Her konteynerdeki iÃ…Å¸lemler
docker stats                          # Kaynak kullanÃ„Â±mÃ„Â±

# Yeniden build et
docker compose up --build             # Image'leri yeniden build et
docker compose build --no-cache app   # Tam rebuild'i zorla

# Temizle
docker compose down                   # Konteynerleri durdur ve kaldÃ„Â±r
docker compose down -v                # Volume'leri de kaldÃ„Â±r (YIKÃ„Â±CÃ„Â±)
docker system prune                   # KullanÃ„Â±lmayan image/konteynerleri kaldÃ„Â±r
```

### AÃ„Å¸ SorunlarÃ„Â±nÃ„Â± Hata AyÃ„Â±klama

```bash
# Konteyner iÃƒÂ§inde DNS ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlemesini kontrol et
docker compose exec app nslookup db

# BaÃ„Å¸lantÃ„Â±yÃ„Â± kontrol et
docker compose exec app wget -qO- http://api:3000/health

# AÃ„Å¸Ã„Â± incele
docker network ls
docker network inspect <project>_default
```

## Anti-KalÃ„Â±plar

```
# KÃƒâ€“TÃƒÅ“: ÃƒÅ“retimde orkestrasyon olmadan docker compose kullanma
# ÃƒÅ“retim ÃƒÂ§ok konteynerli iÃ…Å¸ yÃƒÂ¼kleri iÃƒÂ§in Kubernetes, ECS veya Docker Swarm kullanÃ„Â±n

# KÃƒâ€“TÃƒÅ“: Volume olmadan konteynerlerde veri depolama
# Konteynerler geÃƒÂ§icidir -- volume olmadan yeniden baÃ…Å¸latmada tÃƒÂ¼m veri kaybolur

# KÃƒâ€“TÃƒÅ“: Root olarak ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma
# Daima root olmayan bir kullanÃ„Â±cÃ„Â± oluÃ…Å¸turun ve kullanÃ„Â±n

# KÃƒâ€“TÃƒÅ“: :latest tag kullanma
# Yeniden ÃƒÂ¼retilebilir build'ler iÃƒÂ§in belirli versiyonlara sabitle

# KÃƒâ€“TÃƒÅ“: TÃƒÂ¼m servisleri iÃƒÂ§eren tek dev konteyner
# EndiÃ…Å¸eleri ayÃ„Â±rÃ„Â±n: konteyner baÃ…Å¸Ã„Â±na bir iÃ…Å¸lem

# KÃƒâ€“TÃƒÅ“: Secret'larÃ„Â± docker-compose.yml'e koymak
# .env dosyalarÃ„Â± (gitignore'lanmÃ„Â±Ã…Å¸) veya Docker secrets kullanÃ„Â±n
```
