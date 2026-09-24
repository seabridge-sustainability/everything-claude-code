# PM2 Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£â‚¬ÂPM2Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

**Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°**: `$ARGUMENTS`

---

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

1. PM2Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯(Ã¦Â¬Â Ã¨ÂÂ½Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯`npm install -g pm2`Ã£ÂÂ§Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«)
2. Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã¨Â­ËœÃ¥Ë†Â¥(Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°/Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°/Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹)
3. Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ¨Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â

---

## Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã¦Â¤Å“Ã¥â€¡Âº

| Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” | Ã¦Â¤Å“Ã¥â€¡Âº | Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë† |
|------|-----------|--------------|
| Vite | vite.config.* | 5173 |
| Next.js | next.config.* | 3000 |
| Nuxt | nuxt.config.* | 3000 |
| CRA | package.jsonÃ£ÂÂ«react-scripts | 3000 |
| Express/Node | server/backend/apiÃ£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Âª + package.json | 3000 |
| FastAPI/Flask | requirements.txt / pyproject.toml | 8000 |
| Go | go.mod / main.go | 8080 |

**Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã¦Â¤Å“Ã¥â€¡ÂºÃ¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½Â**: Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¦Å’â€¡Ã¥Â®Å¡ > .env > Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â« > Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†Ã¥Â¼â€¢Ã¦â€¢Â° > Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†

---

## Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«

```
project/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ecosystem.config.cjs              # PM2Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ {backend}/start.cjs               # PythonÃ£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€˜Ã£Æ’Â¼(Ã¨Â©Â²Ã¥Â½â€œÃ£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .claude/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all.md                # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¨ÂµÂ·Ã¥â€¹â€¢ + monit
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-stop.md           # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥ÂÅ“Ã¦Â­Â¢
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-all-restart.md        # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥â€ ÂÃ¨ÂµÂ·Ã¥â€¹â€¢
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}.md             # Ã¥ÂËœÃ¤Â¸â‚¬Ã¨ÂµÂ·Ã¥â€¹â€¢ + Ã£Æ’Â­Ã£â€šÂ°
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-stop.md        # Ã¥ÂËœÃ¤Â¸â‚¬Ã¥ÂÅ“Ã¦Â­Â¢
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-{port}-restart.md     # Ã¥ÂËœÃ¤Â¸â‚¬Ã¥â€ ÂÃ¨ÂµÂ·Ã¥â€¹â€¢
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs.md               # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
    Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-status.md             # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ scripts/
        Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pm2-logs-{port}.ps1       # Ã¥ÂËœÃ¤Â¸â‚¬Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ°
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pm2-monit.ps1             # PM2Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’Â¼
```

---

## WindowsÃ¨Â¨Â­Ã¥Â®Å¡(Ã©â€¡ÂÃ¨Â¦Â)

### ecosystem.config.cjs

**`.cjs`Ã¦â€¹Â¡Ã¥Â¼ÂµÃ¥Â­ÂÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢**

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

**Ã£Æ’â€¢Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†Ã£Æ’â€˜Ã£â€šÂ¹:**

| Ã£Æ’â€¢Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯ | script | args |
|-----------|--------|------|
| Vite | `node_modules/vite/bin/vite.js` | `--port {port}` |
| Next.js | `node_modules/next/dist/bin/next` | `dev -p {port}` |
| Nuxt | `node_modules/nuxt/bin/nuxt.mjs` | `dev --port {port}` |
| Express | `src/index.js`Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯`server.js` | - |

### PythonÃ£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†(start.cjs)

```javascript
const { spawn } = require('child_process');
const proc = spawn('python', ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'], {
  cwd: __dirname, stdio: 'inherit', windowsHide: true
});
proc.on('close', (code) => process.exit(code));
```

---

## Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†(Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã¥â€ â€¦Ã¥Â®Â¹)

### pm2-all.md(Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¨ÂµÂ·Ã¥â€¹â€¢ + monit)
````markdown
Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã¨ÂµÂ·Ã¥â€¹â€¢Ã£Ââ€”Ã£â‚¬ÂPM2Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’Â¼Ã£â€šâ€™Ã©â€“â€¹Ã£ÂÂÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 monit"
```
````

### pm2-all-stop.md
````markdown
Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã¥ÂÅ“Ã¦Â­Â¢Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 stop all
```
````

### pm2-all-restart.md
````markdown
Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã¥â€ ÂÃ¨ÂµÂ·Ã¥â€¹â€¢Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 restart all
```
````

### pm2-{port}.md(Ã¥ÂËœÃ¤Â¸â‚¬Ã¨ÂµÂ·Ã¥â€¹â€¢ + Ã£Æ’Â­Ã£â€šÂ°)
````markdown
{name}({port})Ã£â€šâ€™Ã¨ÂµÂ·Ã¥â€¹â€¢Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã©â€“â€¹Ã£ÂÂÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 start ecosystem.config.cjs --only {name} && start wt.exe -d "{PROJECT_ROOT}" pwsh -NoExit -c "pm2 logs {name}"
```
````

### pm2-{port}-stop.md
````markdown
{name}({port})Ã£â€šâ€™Ã¥ÂÅ“Ã¦Â­Â¢Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 stop {name}
```
````

### pm2-{port}-restart.md
````markdown
{name}({port})Ã£â€šâ€™Ã¥â€ ÂÃ¨ÂµÂ·Ã¥â€¹â€¢Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 restart {name}
```
````

### pm2-logs.md
````markdown
Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®PM2Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 logs
```
````

### pm2-status.md
````markdown
PM2Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```bash
cd "{PROJECT_ROOT}" && pm2 status
```
````

### PowerShellÃ£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†(pm2-logs-{port}.ps1)
```powershell
Set-Location "{PROJECT_ROOT}"
pm2 logs {name}
```

### PowerShellÃ£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†(pm2-monit.ps1)
```powershell
Set-Location "{PROJECT_ROOT}"
pm2 monit
```

---

## Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«

1. **Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«**: `ecosystem.config.cjs`(.jsÃ£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£Ââ€ž)
2. **Node.js**: binÃ£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Å’â€¡Ã¥Â®Å¡ + Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ¿Ã£Æ’Â¼
3. **Python**: Node.jsÃ£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë† + `windowsHide: true`
4. **Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¦Ã£â€šÂ£Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¦Ã£â€šâ€™Ã©â€“â€¹Ã£ÂÂ**: `start wt.exe -d "{path}" pwsh -NoExit -c "command"`
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã¥â€ â€¦Ã¥Â®Â¹**: Ã¥Ââ€žÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã£ÂÂ¯1-2Ã¨Â¡Å’Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½ + bashÃ£Æ’â€“Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã£ÂÂ¿
6. **Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â®Å¸Ã¨Â¡Å’**: AIÃ¨Â§Â£Ã¦Å¾ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ£â‚¬ÂbashÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ Ã£Ââ€˜

---

## Ã¥Â®Å¸Ã¨Â¡Å’

`$ARGUMENTS`Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£Ââ€žÃ£ÂÂ¦Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’:

1. Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³
2. `ecosystem.config.cjs`Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
3. PythonÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã§â€Â¨Ã£ÂÂ®`{backend}/start.cjs`Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â(Ã¨Â©Â²Ã¥Â½â€œÃ£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†)
4. `.claude/commands/`Ã£ÂÂ«Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
5. `.claude/scripts/`Ã£ÂÂ«Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
6. **Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®CLAUDE.md**Ã£â€šâ€™PM2Ã¦Æ’â€¦Ã¥Â Â±Ã£ÂÂ§Ã¦â€ºÂ´Ã¦â€“Â°(Ã¤Â¸â€¹Ã¨Â¨ËœÃ¥Ââ€šÃ§â€¦Â§)
7. Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Å Ã£Æ’Â«Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šâ‚¬**Ã¥Â®Å’Ã¤Âºâ€ Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº**

---

## Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã¥Â¾Å’: CLAUDE.mdÃ£ÂÂ®Ã¦â€ºÂ´Ã¦â€“Â°

Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¾Å’Ã£â‚¬ÂÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®`CLAUDE.md`Ã£ÂÂ«PM2Ã£â€šÂ»Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â (Ã¥Â­ËœÃ¥Å“Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã¤Â½Å“Ã¦Ë†Â):

````markdown
## PM2Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹

| Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë† | Ã¥ÂÂÃ¥â€°Â | Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” |
|------|------|------|
| {port} | {name} | {type} |

**Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Å Ã£Æ’Â«Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°:**
```bash
pm2 start ecosystem.config.cjs   # Ã¥Ë†ÂÃ¥â€ºÅ¾
pm2 start all                    # Ã¥Ë†ÂÃ¥â€ºÅ¾Ã¤Â»Â¥Ã©â„¢Â
pm2 stop all / pm2 restart all
pm2 start {name} / pm2 stop {name}
pm2 logs / pm2 status / pm2 monit
pm2 save                         # Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ»Ã£â€šÂ¹Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¿ÂÃ¥Â­Ëœ
pm2 resurrect                    # Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€”Ã£ÂÅ¸Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â¾Â©Ã¥â€¦Æ’
```
````

**CLAUDE.mdÃ¦â€ºÂ´Ã¦â€“Â°Ã£ÂÂ®Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«:**
- PM2Ã£â€šÂ»Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÅ’Ã¥Â­ËœÃ¥Å“Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ§Â½Â®Ã£ÂÂÃ¦Ââ€ºÃ£ÂË†Ã£â€šâ€¹
- Ã¥Â­ËœÃ¥Å“Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ¦Å“Â«Ã¥Â°Â¾Ã£ÂÂ«Ã¨Â¿Â½Ã¥Å Â 
- Ã¥â€ â€¦Ã¥Â®Â¹Ã£ÂÂ¯Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£Ââ€¹Ã£ÂÂ¤Ã¥Â¿â€¦Ã©Â Ë†Ã£ÂÂ®Ã£â€šâ€šÃ£ÂÂ®Ã£ÂÂ®Ã£ÂÂ¿

---

## Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã¥Â¾Å’: Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£ÂÂ®Ã¨Â¡Â¨Ã§Â¤Âº

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¾Å’Ã£â‚¬ÂÃ¤Â»Â¥Ã¤Â¸â€¹Ã£â€šâ€™Ã¥â€¡ÂºÃ¥Å â€º:

```
## PM2Ã¥Ë†ÂÃ¦Å“Å¸Ã¥Å’â€“Ã¥Â®Å’Ã¤Âºâ€ 

**Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹:**

| Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë† | Ã¥ÂÂÃ¥â€°Â | Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” |
|------|------|------|
| {port} | {name} | {type} |

**ClaudeÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°:** /pm2-all, /pm2-all-stop, /pm2-{port}, /pm2-{port}-stop, /pm2-logs, /pm2-status

**Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Å Ã£Æ’Â«Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°:**
## Ã¥Ë†ÂÃ¥â€ºÅ¾(Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¤Â½Â¿Ã§â€Â¨)
pm2 start ecosystem.config.cjs && pm2 save

## Ã¥Ë†ÂÃ¥â€ºÅ¾Ã¤Â»Â¥Ã©â„¢Â(Ã§Â°Â¡Ã§â€¢Â¥Ã¥Å’â€“)
pm2 start all          # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¨ÂµÂ·Ã¥â€¹â€¢
pm2 stop all           # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥ÂÅ“Ã¦Â­Â¢
pm2 restart all        # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥â€ ÂÃ¨ÂµÂ·Ã¥â€¹â€¢
pm2 start {name}       # Ã¥ÂËœÃ¤Â¸â‚¬Ã¨ÂµÂ·Ã¥â€¹â€¢
pm2 stop {name}        # Ã¥ÂËœÃ¤Â¸â‚¬Ã¥ÂÅ“Ã¦Â­Â¢
pm2 logs               # Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
pm2 monit              # Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€˜Ã£Æ’ÂÃ£Æ’Â«
pm2 resurrect          # Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€”Ã£ÂÅ¸Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ»Ã£â€šÂ¹Ã£â€šâ€™Ã¥Â¾Â©Ã¥â€¦Æ’

**Ã£Æ’â€™Ã£Æ’Â³Ã£Æ’Ë†:** Ã¥Ë†ÂÃ¥â€ºÅ¾Ã¨ÂµÂ·Ã¥â€¹â€¢Ã¥Â¾Å’Ã£ÂÂ«`pm2 save`Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£â‚¬ÂÃ§Â°Â¡Ã§â€¢Â¥Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£ÂÅ’Ã¤Â½Â¿Ã§â€Â¨Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
```
