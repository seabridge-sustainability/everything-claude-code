# PM2 Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“

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


Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¥Â¹Â¶Ã§â€Å¸Ã¦Ë†Â PM2 Ã¦Å“ÂÃ¥Å Â¡Ã¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š

**Ã¥â€˜Â½Ã¤Â»Â¤**: `$ARGUMENTS`

***

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¦Â£â‚¬Ã¦Å¸Â¥ PM2Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã§Â¼ÂºÃ¥Â¤Â±Ã¯Â¼Å’Ã©â‚¬Å¡Ã¨Â¿â€¡ `npm install -g pm2` Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°
2. Ã¦â€°Â«Ã¦ÂÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â»Â¥Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Å“ÂÃ¥Å Â¡Ã¯Â¼Ë†Ã¥â€°ÂÃ§Â«Â¯/Ã¥ÂÅ½Ã§Â«Â¯/Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼â€°
3. Ã§â€Å¸Ã¦Ë†ÂÃ©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¥â€™Å’Ã¥Ââ€žÃ¥â€˜Â½Ã¤Â»Â¤Ã¦â€“â€¡Ã¤Â»Â¶

***

## Ã¦Å“ÂÃ¥Å Â¡Ã¦Â£â‚¬Ã¦Âµâ€¹

| Ã§Â±Â»Ã¥Å¾â€¹ | Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦â€“Â¹Ã¥Â¼Â | Ã©Â»ËœÃ¨Â®Â¤Ã§Â«Â¯Ã¥ÂÂ£ |
|------|-----------|--------------|
| Vite | vite.config.\* | 5173 |
| Next.js | next.config.\* | 3000 |
| Nuxt | nuxt.config.\* | 3000 |
| CRA | package.json Ã¤Â¸Â­Ã§Å¡â€ž react-scripts | 3000 |
| Express/Node | server/backend/api Ã§â€ºÂ®Ã¥Â½â€¢ + package.json | 3000 |
| FastAPI/Flask | requirements.txt / pyproject.toml | 8000 |
| Go | go.mod / main.go | 8080 |

**Ã§Â«Â¯Ã¥ÂÂ£Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§**: Ã§â€Â¨Ã¦Ë†Â·Ã¦Å’â€¡Ã¥Â®Å¡ > .env Ã¦â€“â€¡Ã¤Â»Â¶ > Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶ > Ã¨â€žÅ¡Ã¦Å“Â¬Ã¥Ââ€šÃ¦â€¢Â° > Ã©Â»ËœÃ¨Â®Â¤Ã§Â«Â¯Ã¥ÂÂ£

***

## Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶

```
project/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ecosystem.config.cjs              # PM2 Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ {backend}/start.cjs               # Python Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã¯Â¼Ë†Ã¥Â¦â€šÃ©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .claude/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all.md                # Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€°â‚¬Ã¦Å“â€° + Ã§â€ºâ€˜Ã¦Å½Â§
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-stop.md           # Ã¥ÂÅ“Ã¦Â­Â¢Ã¦â€°â‚¬Ã¦Å“â€°
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-restart.md        # Ã©â€¡ÂÃ¥ÂÂ¯Ã¦â€°â‚¬Ã¦Å“â€°
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}.md             # Ã¥ÂÂ¯Ã¥Å Â¨Ã¥Ââ€¢Ã¤Â¸Âª + Ã¦â€”Â¥Ã¥Â¿â€”
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-stop.md        # Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Ââ€¢Ã¤Â¸Âª
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-restart.md     # Ã©â€¡ÂÃ¥ÂÂ¯Ã¥Ââ€¢Ã¤Â¸Âª
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs.md               # Ã¦Å¸Â¥Ã§Å“â€¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€”Â¥Ã¥Â¿â€”
    Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-status.md             # Ã¦Å¸Â¥Ã§Å“â€¹Ã§Å Â¶Ã¦â‚¬Â
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ scripts/
        Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs-{port}.ps1       # Ã¥Ââ€¢Ã¤Â¸ÂªÃ¦Å“ÂÃ¥Å Â¡Ã¦â€”Â¥Ã¥Â¿â€”
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-monit.ps1             # PM2 Ã§â€ºâ€˜Ã¦Å½Â§Ã¥â„¢Â¨
```

***

## Windows Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Ë†Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼â€°

### ecosystem.config.cjs

**Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â½Â¿Ã§â€Â¨ `.cjs` Ã¦â€°Â©Ã¥Â±â€¢Ã¥ÂÂ**

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

**Ã¦Â¡â€ Ã¦Å¾Â¶Ã¨â€žÅ¡Ã¦Å“Â¬Ã¨Â·Â¯Ã¥Â¾â€ž:**

| Ã¦Â¡â€ Ã¦Å¾Â¶ | script | args |
|-----------|--------|------|
| Vite | `node_modules/vite/bin/vite.js` | `--port {port}` |
| Next.js | `node_modules/next/dist/bin/next` | `dev -p {port}` |
| Nuxt | `node_modules/nuxt/bin/nuxt.mjs` | `dev --port {port}` |
| Express | `src/index.js` Ã¦Ë†â€“ `server.js` | - |

### Python Ã¥Å’â€¦Ã¨Â£â€¦Ã¨â€žÅ¡Ã¦Å“Â¬ (start.cjs)

```javascript
const { spawn } = require('child_process');
const proc = spawn('python', ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'], {
  cwd: __dirname, stdio: 'inherit', windowsHide: true
});
proc.on('close', (code) => process.exit(code));
```

***

## Ã¥â€˜Â½Ã¤Â»Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¯Â¼Ë†Ã¦Å“â‚¬Ã§Â®â‚¬Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼â€°

### pm2-all.md (Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€°â‚¬Ã¦Å“â€° + Ã§â€ºâ€˜Ã¦Å½Â§)

````markdown
Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã¥Â¹Â¶Ã¦â€°â€œÃ¥Â¼â‚¬ PM2 Ã§â€ºâ€˜Ã¦Å½Â§Ã¥â„¢Â¨Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 monit"
```
````

### pm2-all-stop.md

````markdown
Ã¥ÂÅ“Ã¦Â­Â¢Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 stop all
```
````

### pm2-all-restart.md

````markdown
Ã©â€¡ÂÃ¥ÂÂ¯Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 restart all
```
````

### pm2-{port}.md (Ã¥ÂÂ¯Ã¥Å Â¨Ã¥Ââ€¢Ã¤Â¸Âª + Ã¦â€”Â¥Ã¥Â¿â€”)

````markdown
Ã¥ÂÂ¯Ã¥Å Â¨ {name} ({port}) Ã¥Â¹Â¶Ã¦â€°â€œÃ¥Â¼â‚¬Ã¦â€”Â¥Ã¥Â¿â€”Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs --only {name} && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 logs {name}"
```
````

### pm2-{port}-stop.md

````markdown
Ã¥ÂÅ“Ã¦Â­Â¢ {name} ({port})Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 stop {name}
```
````

### pm2-{port}-restart.md

````markdown
Ã©â€¡ÂÃ¥ÂÂ¯ {name} ({port})Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 restart {name}
```
````

### pm2-logs.md

````markdown
Ã¦Å¸Â¥Ã§Å“â€¹Ã¦â€°â‚¬Ã¦Å“â€° PM2 Ã¦â€”Â¥Ã¥Â¿â€”Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 logs
```
````

### pm2-status.md

````markdown
Ã¦Å¸Â¥Ã§Å“â€¹ PM2 Ã§Å Â¶Ã¦â‚¬ÂÃ£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 status
```
````

### PowerShell Ã¨â€žÅ¡Ã¦Å“Â¬ (pm2-logs-{port}.ps1)

```powershell
Set-Location "{PROJECT_ROOT}"
pm2 logs {name}
```

### PowerShell Ã¨â€žÅ¡Ã¦Å“Â¬ (pm2-monit.ps1)

```powershell
Set-Location "{PROJECT_ROOT}"
pm2 monit
```

***

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

1. **Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶**: `ecosystem.config.cjs` (Ã¤Â¸ÂÃ¦ËœÂ¯ .js)
2. **Node.js**: Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Å’â€¡Ã¥Â®Å¡ bin Ã¨Â·Â¯Ã¥Â¾â€ž + Ã¨Â§Â£Ã©â€¡Å Ã¥â„¢Â¨
3. **Python**: Node.js Ã¥Å’â€¦Ã¨Â£â€¦Ã¨â€žÅ¡Ã¦Å“Â¬ + `windowsHide: true`
4. **Ã¦â€°â€œÃ¥Â¼â‚¬Ã¦â€“Â°Ã§Âªâ€”Ã¥ÂÂ£**: `start wt.exe -d "{path}" pwsh -NoExit -c "command"`
5. **Ã¦Å“â‚¬Ã§Â®â‚¬Ã¥â€ â€¦Ã¥Â®Â¹**: Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥â€˜Â½Ã¤Â»Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÂªÃ¦Å“â€° 1-2 Ã¨Â¡Å’Ã¦ÂÂÃ¨Â¿Â° + bash Ã¤Â»Â£Ã§Â ÂÃ¥Ââ€”
6. **Ã§â€ºÂ´Ã¦Å½Â¥Ã¦â€°Â§Ã¨Â¡Å’**: Ã¦â€”Â Ã©Å“â‚¬ AI Ã¨Â§Â£Ã¦Å¾ÂÃ¯Â¼Å’Ã§â€ºÂ´Ã¦Å½Â¥Ã¨Â¿ÂÃ¨Â¡Å’ bash Ã¥â€˜Â½Ã¤Â»Â¤

***

## Ã¦â€°Â§Ã¨Â¡Å’

Ã¥Å¸ÂºÃ¤ÂºÅ½ `$ARGUMENTS`Ã¯Â¼Å’Ã¦â€°Â§Ã¨Â¡Å’Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¯Â¼Å¡

1. Ã¦â€°Â«Ã¦ÂÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Å“ÂÃ¥Å Â¡
2. Ã§â€Å¸Ã¦Ë†Â `ecosystem.config.cjs`
3. Ã¤Â¸Âº Python Ã¦Å“ÂÃ¥Å Â¡Ã§â€Å¸Ã¦Ë†Â `{backend}/start.cjs`Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
4. Ã¥Å“Â¨ `.claude/commands/` Ã¤Â¸Â­Ã§â€Å¸Ã¦Ë†ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦â€“â€¡Ã¤Â»Â¶
5. Ã¥Å“Â¨ `.claude/scripts/` Ã¤Â¸Â­Ã§â€Å¸Ã¦Ë†ÂÃ¨â€žÅ¡Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶
6. **Ã¦â€ºÂ´Ã¦â€“Â°Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md**Ã¯Â¼Å’Ã¦Â·Â»Ã¥Å Â  PM2 Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Ë†Ã¨Â§ÂÃ¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼â€°
7. **Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â®Å’Ã¦Ë†ÂÃ¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã§Â»Ë†Ã§Â«Â¯Ã¥â€˜Â½Ã¤Â»Â¤

***

## Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¥ÂÅ½Ã¯Â¼Å¡Ã¦â€ºÂ´Ã¦â€“Â° CLAUDE.md

Ã§â€Å¸Ã¦Ë†ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÅ½Ã¯Â¼Å’Ã¥Â°â€  PM2 Ã©Æ’Â¨Ã¥Ë†â€ Ã¨Â¿Â½Ã¥Å Â Ã¥Ë†Â°Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž `CLAUDE.md`Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â¸ÂÃ¥Â­ËœÃ¥Å“Â¨Ã¥Ë†â„¢Ã¥Ë†â€ºÃ¥Â»ÂºÃ¯Â¼â€°Ã¯Â¼Å¡

````markdown
## PM2 Ã¦Å“ÂÃ¥Å Â¡

| Ã§Â«Â¯Ã¥ÂÂ£ | Ã¥ÂÂÃ§Â§Â° | Ã§Â±Â»Ã¥Å¾â€¹ |
|------|------|------|
| {port} | {name} | {type} |

**Ã§Â»Ë†Ã§Â«Â¯Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡**
```bash
pm2 start ecosystem.config.cjs   # First time
pm2 start all                    # After first time
pm2 stop all / pm2 restart all
pm2 start {name} / pm2 stop {name}
pm2 logs / pm2 status / pm2 monit
pm2 save                         # Save process list
pm2 resurrect                    # Restore saved list
```
````

**Ã¦â€ºÂ´Ã¦â€“Â° CLAUDE.md Ã§Å¡â€žÃ¨Â§â€žÃ¥Ë†â„¢Ã¯Â¼Å¡**

* Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â­ËœÃ¥Å“Â¨ PM2 Ã©Æ’Â¨Ã¥Ë†â€ Ã¯Â¼Å’Ã¦â€ºÂ¿Ã¦ÂÂ¢Ã¥Â®Æ’
* Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â¸ÂÃ¥Â­ËœÃ¥Å“Â¨Ã¯Â¼Å’Ã¨Â¿Â½Ã¥Å Â Ã¥Ë†Â°Ã¦Å“Â«Ã¥Â°Â¾
* Ã¤Â¿ÂÃ¦Å’ÂÃ¥â€ â€¦Ã¥Â®Â¹Ã§Â²Â¾Ã§Â®â‚¬Ã¤Â¸â€Ã¥Â¿â€¦Ã¨Â¦Â

***

## Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¥ÂÅ½Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€˜ËœÃ¨Â¦Â

Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã§â€Å¸Ã¦Ë†ÂÃ¥ÂÅ½Ã¯Â¼Å’Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼Å¡

```
## PM2 Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¥Â®Å’Ã¦Ë†Â

**Ã¦Å“ÂÃ¥Å Â¡Ã¥Ë†â€”Ã¨Â¡Â¨Ã¯Â¼Å¡**

| Ã§Â«Â¯Ã¥ÂÂ£ | Ã¥ÂÂÃ§Â§Â° | Ã§Â±Â»Ã¥Å¾â€¹ |
|------|------|------|
| {port} | {name} | {type} |

**Claude Ã¦Å’â€¡Ã¤Â»Â¤Ã¯Â¼Å¡** /pm2-all, /pm2-all-stop, /pm2-{port}, /pm2-{port}-stop, /pm2-logs, /pm2-status

**Ã§Â»Ë†Ã§Â«Â¯Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡**
## Ã©Â¦â€“Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼â€°
pm2 start ecosystem.config.cjs && pm2 save

## Ã©Â¦â€“Ã¦Â¬Â¡Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Ë†Ã§Â®â‚¬Ã¥Å’â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼â€°
pm2 start all          # Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€¦Â¨Ã©Æ’Â¨
pm2 stop all           # Ã¥ÂÅ“Ã¦Â­Â¢Ã¥â€¦Â¨Ã©Æ’Â¨
pm2 restart all        # Ã©â€¡ÂÃ¥ÂÂ¯Ã¥â€¦Â¨Ã©Æ’Â¨
pm2 start {name}       # Ã¥ÂÂ¯Ã¥Å Â¨Ã¥Ââ€¢Ã¤Â¸Âª
pm2 stop {name}        # Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Ââ€¢Ã¤Â¸Âª
pm2 logs               # Ã¦Å¸Â¥Ã§Å“â€¹Ã¦â€”Â¥Ã¥Â¿â€”
pm2 monit              # Ã§â€ºâ€˜Ã¦Å½Â§Ã©ÂÂ¢Ã¦ÂÂ¿
pm2 resurrect          # Ã¦ÂÂ¢Ã¥Â¤ÂÃ¥Â·Â²Ã¤Â¿ÂÃ¥Â­ËœÃ¨Â¿â€ºÃ§Â¨â€¹

**Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡** Ã©Â¦â€“Ã¦Â¬Â¡Ã¥ÂÂ¯Ã¥Å Â¨Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’ `pm2 save` Ã¤Â»Â¥Ã¥ÂÂ¯Ã§â€Â¨Ã§Â®â‚¬Ã¥Å’â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š
```
