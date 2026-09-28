---
name: database-migrations
description: Şema değişiklikleri, veri migration'ları, rollback'ler ve PostgreSQL, MySQL ve yaygın ORM'ler (Prisma, Drizzle, Django, TypeORM, golang-migrate) arasında sıfır kesinti deployment'ları için veritabanı migration en iyi uygulamaları.
origin: ECC
---

# Veritabanı Migration Kalıpları

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


Üretim sistemleri için güvenli, geri alınabilir veritabanı şema değişiklikleri.

## Ne Zaman Aktifleştirmeli

- Veritabanı tabloları oluştururken veya değiştirirken
- Sütun veya indeks eklerken/kaldırırken
- Veri migration'ları çalıştırırken (backfill, dönüştürme)
- Sıfır kesinti şema değişiklikleri planlarken
- Yeni bir proje için migration araçları kurarken

## Temel İlkeler

1. **Her değişiklik bir migration'dır** — üretim veritabanlarını asla manuel olarak değiştirmeyin
2. **Migration'lar üretimde sadece ileri** — rollback'ler yeni forward migration'lar kullanır
3. **Şema ve veri migration'ları ayrıdır** — tek migration'da DDL ve DML'yi asla karıştırmayın
4. **Migration'ları üretim boyutundaki veriye karşı test edin** — 100 satırda çalışan migration 10M'de kilitlenebilir
5. **Migration'lar üretimde çalıştıktan sonra değişmezdir** — üretimde çalışan migration'ı asla düzenlemeyin

## Migration Güvenlik Kontrol Listesi

Herhangi bir migration uygulamadan önce:

- [ ] Migration UP ve DOWN'a sahip (veya açıkça geri alınamaz olarak işaretlenmiş)
- [ ] Büyük tablolarda tam tablo kilitleri yok (concurrent operasyonlar kullan)
- [ ] Yeni sütunlar varsayılanlara sahip veya nullable (varsayılan olmadan NOT NULL asla ekleme)
- [ ] İndeksler concurrent oluşturuluyor (mevcut tablolar için CREATE TABLE ile inline değil)
- [ ] Veri backfill şema değişikliğinden ayrı bir migration
- [ ] Üretim verisinin kopyasına karşı test edilmiş
- [ ] Rollback planı dokümante edilmiş

## PostgreSQL Kalıpları

### Güvenli Sütun Ekleme

```sql
-- İYİ: Nullable sütun, kilit yok
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- İYİ: Varsayılanlı sütun (Postgres 11+ anlık, yeniden yazma yok)
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- KÖTÜ: Mevcut tabloda varsayılansız NOT NULL (tam yeniden yazma gerektirir)
ALTER TABLE users ADD COLUMN role TEXT NOT NULL;
-- Bu tabloyu kilitler ve her satırı yeniden yazar
```

### Kesinti Olmadan İndeks Ekleme

```sql
-- KÖTÜ: Büyük tablolarda yazmaları engeller
CREATE INDEX idx_users_email ON users (email);

-- İYİ: Engellemez, concurrent yazmalara izin verir
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);

-- Not: CONCURRENTLY transaction bloğu içinde çalıştırılamaz
-- Çoğu migration aracı bunun için özel işleme ihtiyaç duyar
```

### Sütun Yeniden Adlandırma (Sıfır Kesinti)

Üretimde asla doğrudan yeniden adlandırmayın. Expand-contract kalıbını kullanın:

```sql
-- Adım 1: Yeni sütun ekle (migration 001)
ALTER TABLE users ADD COLUMN display_name TEXT;

-- Adım 2: Veriyi backfill et (migration 002, veri migration'ı)
UPDATE users SET display_name = username WHERE display_name IS NULL;

-- Adım 3: Uygulama kodunu her iki sütunu okuma/yazma için güncelle
-- Uygulama değişikliklerini deploy et

-- Adım 4: Eski sütuna yazmayı durdur, kaldır (migration 003)
ALTER TABLE users DROP COLUMN username;
```

### Güvenli Sütun Kaldırma

```sql
-- Adım 1: Sütuna tüm uygulama referanslarını kaldır
-- Adım 2: Sütun referansı olmadan uygulamayı deploy et
-- Adım 3: Sonraki migration'da sütunu kaldır
ALTER TABLE orders DROP COLUMN legacy_status;

-- Django için: SeparateDatabaseAndState kullanarak modelden kaldır
-- DROP COLUMN oluşturmadan (sonra sonraki migration'da kaldır)
```

### Büyük Veri Migration'ları

```sql
-- KÖTÜ: Tüm satırları tek transaction'da günceller (tabloyu kilitler)
UPDATE users SET normalized_email = LOWER(email);

-- İYİ: İlerleme ile batch güncelleme
DO $$
DECLARE
  batch_size INT := 10000;
  rows_updated INT;
BEGIN
  LOOP
    UPDATE users
    SET normalized_email = LOWER(email)
    WHERE id IN (
      SELECT id FROM users
      WHERE normalized_email IS NULL
      LIMIT batch_size
      FOR UPDATE SKIP LOCKED
    );
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    RAISE NOTICE 'Updated % rows', rows_updated;
    EXIT WHEN rows_updated = 0;
    COMMIT;
  END LOOP;
END $$;
```

## Prisma (TypeScript/Node.js)

### İş Akışı

```bash
# Şema değişikliklerinden migration oluştur
npx prisma migrate dev --name add_user_avatar

# Üretimde bekleyen migration'ları uygula
npx prisma migrate deploy

# Veritabanını sıfırla (sadece dev)
npx prisma migrate reset

# Şema değişikliklerinden sonra client oluştur
npx prisma generate
```

### Şema Örneği

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatarUrl String?  @map("avatar_url")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  orders    Order[]

  @@map("users")
  @@index([email])
}
```

### Özel SQL Migration

Prisma'nın ifade edemediği operasyonlar için (concurrent indeksler, veri backfill'leri):

```bash
# Boş migration oluştur, sonra SQL'i manuel düzenle
npx prisma migrate dev --create-only --name add_email_index
```

```sql
-- migrations/20240115_add_email_index/migration.sql
-- Prisma CONCURRENTLY oluşturamaz, bu yüzden manuel yazıyoruz
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users (email);
```

## Drizzle (TypeScript/Node.js)

### İş Akışı

```bash
# Şema değişikliklerinden migration oluştur
npx drizzle-kit generate

# Migration'ları uygula
npx drizzle-kit migrate

# Şemayı doğrudan push et (sadece dev, migration dosyası yok)
npx drizzle-kit push
```

### Şema Örneği

```typescript
import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

## Django (Python)

### İş Akışı

```bash
# Model değişikliklerinden migration oluştur
python manage.py makemigrations

# Migration'ları uygula
python manage.py migrate

# Migration durumunu göster
python manage.py showmigrations

# Özel SQL için boş migration oluştur
python manage.py makemigrations --empty app_name -n description
```

### Veri Migration

```python
from django.db import migrations

def backfill_display_names(apps, schema_editor):
    User = apps.get_model("accounts", "User")
    batch_size = 5000
    users = User.objects.filter(display_name="")
    while users.exists():
        batch = list(users[:batch_size])
        for user in batch:
            user.display_name = user.username
        User.objects.bulk_update(batch, ["display_name"], batch_size=batch_size)

def reverse_backfill(apps, schema_editor):
    pass  # Veri migration'ı, geri alma gerekmez

class Migration(migrations.Migration):
    dependencies = [("accounts", "0015_add_display_name")]

    operations = [
        migrations.RunPython(backfill_display_names, reverse_backfill),
    ]
```

## golang-migrate (Go)

### İş Akışı

```bash
# Migration çifti oluştur
migrate create -ext sql -dir migrations -seq add_user_avatar

# Tüm bekleyen migration'ları uygula
migrate -path migrations -database "$DATABASE_URL" up

# Son migration'ı rollback et
migrate -path migrations -database "$DATABASE_URL" down 1

# Versiyonu zorla (dirty durumu düzelt)
migrate -path migrations -database "$DATABASE_URL" force VERSION
```

### Migration Dosyaları

```sql
-- migrations/000003_add_user_avatar.up.sql
ALTER TABLE users ADD COLUMN avatar_url TEXT;
CREATE INDEX CONCURRENTLY idx_users_avatar ON users (avatar_url) WHERE avatar_url IS NOT NULL;

-- migrations/000003_add_user_avatar.down.sql
DROP INDEX IF EXISTS idx_users_avatar;
ALTER TABLE users DROP COLUMN IF EXISTS avatar_url;
```

## Sıfır Kesinti Migration Stratejisi

Kritik üretim değişiklikleri için expand-contract kalıbını takip edin:

```
Faz 1: EXPAND
  - Yeni sütun/tablo ekle (nullable veya varsayılanlı)
  - Deploy: uygulama hem ESKİ hem YENİ'ye yazar
  - Mevcut veriyi backfill et

Faz 2: MIGRATE
  - Deploy: uygulama YENİ'den okur, her İKİSİNE yazar
  - Veri tutarlılığını doğrula

Faz 3: CONTRACT
  - Deploy: uygulama sadece YENİ'yi kullanır
  - Eski sütun/tabloyu ayrı migration'da kaldır
```

### Zaman Çizelgesi Örneği

```
Gün 1: Migration new_status sütunu ekler (nullable)
Gün 1: App v2 deploy et — hem status hem new_status'a yaz
Gün 2: Mevcut satırlar için backfill migration'ı çalıştır
Gün 3: App v3 deploy et — sadece new_status'tan okur
Gün 7: Migration eski status sütununu kaldırır
```

## Anti-Kalıplar

| Anti-Kalıp | Neden Başarısız Olur | Daha İyi Yaklaşım |
|-------------|-------------|-----------------|
| Üretimde manuel SQL | Denetim izi yok, tekrarlanamaz | Her zaman migration dosyaları kullan |
| Deploy edilmiş migration'ları düzenleme | Ortamlar arası sapma yaratır | Bunun yerine yeni migration oluştur |
| Varsayılansız NOT NULL | Tabloyu kilitler, tüm satırları yeniden yazar | Nullable ekle, backfill et, sonra kısıt ekle |
| Büyük tabloda inline indeks | Build sırasında yazmaları engeller | CREATE INDEX CONCURRENTLY |
| Tek migration'da şema + veri | Rollback zor, uzun transaction'lar | Ayrı migration'lar |
| Kodu kaldırmadan önce sütun kaldırma | Eksik sütunda uygulama hataları | Önce kodu kaldır, sonra sütunu sonraki deploy'da kaldır |
