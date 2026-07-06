# PM2 Init

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


Projeyi otomatik analiz et ve PM2 servis komutlarÃ„Â± oluÃ…Å¸tur.

**Komut**: `$ARGUMENTS`

---

## Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

1. PM2'yi kontrol et (yoksa `npm install -g pm2` ile yÃƒÂ¼kle)
2. Servisleri (frontend/backend/database) tanÃ„Â±mlamak iÃƒÂ§in projeyi tara
3. Config dosyalarÃ„Â± ve bireysel komut dosyalarÃ„Â± oluÃ…Å¸tur

---

## Servis Tespiti

| Tip | Tespit | VarsayÃ„Â±lan Port |
|------|-----------|--------------|
| Vite | vite.config.* | 5173 |
| Next.js | next.config.* | 3000 |
| Nuxt | nuxt.config.* | 3000 |
| CRA | package.json'da react-scripts | 3000 |
| Express/Node | server/backend/api dizini + package.json | 3000 |
| FastAPI/Flask | requirements.txt / pyproject.toml | 8000 |
| Go | go.mod / main.go | 8080 |

**Port Tespit Ãƒâ€“nceliÃ„Å¸i**: KullanÃ„Â±cÃ„Â± belirtimi > .env > config dosyasÃ„Â± > script argÃƒÂ¼manlarÃ„Â± > varsayÃ„Â±lan port

---

## OluÃ…Å¸turulan Dosyalar

```
project/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ecosystem.config.cjs              # PM2 config
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ {backend}/start.cjs               # Python wrapper (geÃƒÂ§erliyse)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .claude/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all.md                # Hepsini baÃ…Å¸lat + monit
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-stop.md           # Hepsini durdur
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-restart.md        # Hepsini yeniden baÃ…Å¸lat
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}.md             # Tekli baÃ…Å¸lat + logs
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-stop.md        # Tekli durdur
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-restart.md     # Tekli yeniden baÃ…Å¸lat
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs.md               # TÃƒÂ¼m loglarÃ„Â± gÃƒÂ¶ster
    Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-status.md             # Durumu gÃƒÂ¶ster
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ scripts/
        Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs-{port}.ps1       # Tekli servis loglarÃ„Â±
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-monit.ps1             # PM2 monitor
```

---

## Windows KonfigÃƒÂ¼rasyonu (Ãƒâ€“NEMLÃ„Â°)

### ecosystem.config.cjs

**`.cjs` uzantÃ„Â±sÃ„Â± kullanmalÃ„Â±**

```javascript
module.exports = {
  apps: [
    // Node.js (Vite/Next/Nuxt)
    {
      name: 'project-3000',
      cwd: './packages/web',
      script: 'node_modules/vite/bin/vite.js',
      args: '--port 3000',
      interpreter: 'C:/Program Files/nodejs/node.exe',
      env: { NODE_ENV: 'development' }
    },
    // Python
    {
      name: 'project-8000',
      cwd: './backend',
      script: 'start.cjs',
      interpreter: 'C:/Program Files/nodejs/node.exe',
      env: { PYTHONUNBUFFERED: '1' }
    }
  ]
}
```

**Framework script yollarÃ„Â±:**

| Framework | script | args |
|-----------|--------|------|
| Vite | `node_modules/vite/bin/vite.js` | `--port {port}` |
| Next.js | `node_modules/next/dist/bin/next` | `dev -p {port}` |
| Nuxt | `node_modules/nuxt/bin/nuxt.mjs` | `dev --port {port}` |
| Express | `src/index.js` veya `server.js` | - |

### Python Wrapper Script (start.cjs)

```javascript
const { spawn } = require('child_process');
const proc = spawn('python', ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'], {
  cwd: __dirname, stdio: 'inherit', windowsHide: true
});
proc.on('close', (code) => process.exit(code));
```

---

## Komut DosyasÃ„Â± Ã…Å¾ablonlarÃ„Â± (Minimal Ã„Â°ÃƒÂ§erik)

### pm2-all.md (Hepsini baÃ…Å¸lat + monit)
````markdown
TÃƒÂ¼m servisleri baÃ…Å¸lat ve PM2 monitÃƒÂ¶r aÃƒÂ§.
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 monit"
```
````

### pm2-all-stop.md
````markdown
TÃƒÂ¼m servisleri durdur.
```bash
cd "{PROJECT_ROOT}" && pm2 stop all
```
````

### pm2-all-restart.md
````markdown
TÃƒÂ¼m servisleri yeniden baÃ…Å¸lat.
```bash
cd "{PROJECT_ROOT}" && pm2 restart all
```
````

### pm2-{port}.md (Tekli baÃ…Å¸lat + logs)
````markdown
{name} ({port}) baÃ…Å¸lat ve loglarÃ„Â± aÃƒÂ§.
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs --only {name} && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 logs {name}"
```
````

### pm2-{port}-stop.md
````markdown
{name} ({port}) durdur.
```bash
cd "{PROJECT_ROOT}" && pm2 stop {name}
```
````

### pm2-{port}-restart.md
````markdown
{name} ({port}) yeniden baÃ…Å¸lat.
```bash
cd "{PROJECT_ROOT}" && pm2 restart {name}
```
````

### pm2-logs.md
````markdown
TÃƒÂ¼m PM2 loglarÃ„Â±nÃ„Â± gÃƒÂ¶ster.
```bash
cd "{PROJECT_ROOT}" && pm2 logs
```
````

### pm2-status.md
````markdown
PM2 durumunu gÃƒÂ¶ster.
```bash
cd "{PROJECT_ROOT}" && pm2 status
```
````

### PowerShell Scripts (pm2-logs-{port}.ps1)
```powershell
Set-Location "{PROJECT_ROOT}"
pm2 logs {name}
```

### PowerShell Scripts (pm2-monit.ps1)
```powershell
Set-Location "{PROJECT_ROOT}"
pm2 monit
```

---

## Ana Kurallar

1. **Config dosyasÃ„Â±**: `ecosystem.config.cjs` (.js deÃ„Å¸il)
2. **Node.js**: Bin yolunu doÃ„Å¸rudan belirt + interpreter
3. **Python**: Node.js wrapper script + `windowsHide: true`
4. **Yeni pencere aÃƒÂ§**: `start wt.exe -d "{path}" pwsh -NoExit -c "command"`
5. **Minimal iÃƒÂ§erik**: Her komut dosyasÃ„Â± sadece 1-2 satÃ„Â±r aÃƒÂ§Ã„Â±klama + bash bloÃ„Å¸u
6. **DoÃ„Å¸rudan ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma**: AI ayrÃ„Â±Ã…Å¸tÃ„Â±rmasÃ„Â± gerekmez, sadece bash komutunu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r

---

## Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r

`$ARGUMENTS`'a gÃƒÂ¶re init'i ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

1. Servisleri taramak iÃƒÂ§in projeyi tara
2. `ecosystem.config.cjs` oluÃ…Å¸tur
3. Python servisleri iÃƒÂ§in `{backend}/start.cjs` oluÃ…Å¸tur (geÃƒÂ§erliyse)
4. `.claude/commands/` dizininde komut dosyalarÃ„Â± oluÃ…Å¸tur
5. `.claude/scripts/` dizininde script dosyalarÃ„Â± oluÃ…Å¸tur
6. **Proje CLAUDE.md'yi PM2 bilgisiyle gÃƒÂ¼ncelle** (aÃ…Å¸aÃ„Å¸Ã„Â±ya bakÃ„Â±n)
7. **Terminal komutlarÃ„Â±yla tamamlama ÃƒÂ¶zetini gÃƒÂ¶ster**

---

## Post-Init: CLAUDE.md'yi GÃƒÂ¼ncelle

Dosyalar oluÃ…Å¸turulduktan sonra, projenin `CLAUDE.md` dosyasÃ„Â±na PM2 bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼nÃƒÂ¼ ekle (yoksa oluÃ…Å¸tur):

````markdown
## PM2 Services

| Port | Name | Type |
|------|------|------|
| {port} | {name} | {type} |

**Terminal Commands:**
```bash
pm2 start ecosystem.config.cjs   # Ã„Â°lk seferinde
pm2 start all                    # Ã„Â°lk seferinden sonra
pm2 stop all / pm2 restart all
pm2 start {name} / pm2 stop {name}
pm2 logs / pm2 status / pm2 monit
pm2 save                         # Process listesini kaydet
pm2 resurrect                    # Kaydedilen listeyi geri yÃƒÂ¼kle
```
````

**CLAUDE.md gÃƒÂ¼ncelleme kurallarÃ„Â±:**
- PM2 bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼ varsa, deÃ„Å¸iÃ…Å¸tir
- Yoksa, sona ekle
- Ã„Â°ÃƒÂ§eriÃ„Å¸i minimal ve temel tut

---

## Post-Init: Ãƒâ€“zet GÃƒÂ¶ster

TÃƒÂ¼m dosyalar oluÃ…Å¸turulduktan sonra, ÃƒÂ§Ã„Â±ktÃ„Â±:

```
## PM2 Init Complete

**Services:**

| Port | Name | Type |
|------|------|------|
| {port} | {name} | {type} |

**Claude Commands:** /pm2-all, /pm2-all-stop, /pm2-{port}, /pm2-{port}-stop, /pm2-logs, /pm2-status

**Terminal Commands:**
## Ã„Â°lk seferinde (config dosyasÃ„Â±yla)
pm2 start ecosystem.config.cjs && pm2 save

## Ã„Â°lk seferinden sonra (basitleÃ…Å¸tirilmiÃ…Å¸)
pm2 start all          # Hepsini baÃ…Å¸lat
pm2 stop all           # Hepsini durdur
pm2 restart all        # Hepsini yeniden baÃ…Å¸lat
pm2 start {name}       # Tekli baÃ…Å¸lat
pm2 stop {name}        # Tekli durdur
pm2 logs               # LoglarÃ„Â± gÃƒÂ¶ster
pm2 monit              # Monitor paneli
pm2 resurrect          # Kaydedilen process'leri geri yÃƒÂ¼kle

**Ã„Â°pucu:** BasitleÃ…Å¸tirilmiÃ…Å¸ komutlarÃ„Â± etkinleÃ…Å¸tirmek iÃƒÂ§in ilk baÃ…Å¸latmadan sonra `pm2 save` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.
```
