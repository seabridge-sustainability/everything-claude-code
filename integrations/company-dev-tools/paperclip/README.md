# Paperclip local agent coordination

Source is pinned in `upstream.json`; the installed npm release and every transitive dependency are pinned in `runtime/package-lock.json`. MIT upstream license stays in `vendor/paperclip/LICENSE`. Source checkout is reference material; the packaged release avoids a full monorepo build.

Start from PowerShell:

```powershell
& C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/paperclip/start.ps1
```

Dashboard and API use `http://127.0.0.1:3183`; health is `/api/health`. The isolated embedded PostgreSQL uses54339. Database, logs, storage and generated secrets stay in ignored `state/`; no existing SeaBridgeAI database is connected. This installation uses loopback-only upstream `local_trusted` mode: anyone already able to operate this local Windows account can access the dashboard. It must not be forwarded publicly.

All agents can inspect local management metadata through the upstream CLI:

```powershell
node integrations/company-dev-tools/paperclip/cli.mjs health --api-base http://127.0.0.1:3183 --json
node integrations/company-dev-tools/paperclip/cli.mjs company list --api-base http://127.0.0.1:3183 --json
node integrations/company-dev-tools/paperclip/cli.mjs adapter list --api-base http://127.0.0.1:3183 --json
```

`bootstrap.mjs` adds one isolated SeaBridgeAI coordination company, backend/frontend linked projects and paused Claude/Codex/Gemini/OpenCode agent records. It is idempotent and never creates work or invokes agents. Existing agent configurations and credentials remain outside Paperclip. Model selections are inherited; OpenCode is pinned to the owner's existing local Qwen choice.

Timer scheduler and demand wakeups remain disabled, agents paused, and telemetry disabled. No inference, token generation, cloud job or autonomous dispatch is part of setup. A zero monthly budget means unlimited in the upstream UI; it is not a spending cap. Claude/Codex permission-bypass settings are explicitly false. Gemini uses the generic process adapter and `gemini-safe.mjs`, which converts upstream yolo arguments to standard approval mode, rejects other bypass options, requires an explicit owner-approved prompt, and directly launches the existing Gemini CLI using argument arrays. It inherits the selected working directory. Automatic assigned-task prompt injection is not implemented for this generic adapter. Upstream environment tests can invoke real model probes and are not a read-only availability check. Keep all agents paused until a real task is authorized; live execution/authentication remain unverified.

Native Windows supports foreground `paperclipai run`; upstream background service management is unsupported on win32. `start.ps1` launches a hidden task-owned process through `server.mjs`, which exposes a bounded owned-file shutdown request. Stop it with `node .../paperclip/stop.mjs`; the wrapper calls upstream's orderly `shutdown` including embedded PostgreSQL teardown, preserves all state, and records the receipt. The service is on demand, not a login/startup service. Launchers discard unrelated inherited Paperclip/database connection overrides, so running from a project shell cannot select its shared database. Never retire the isolated database or its directory automatically. Windows POSIX mode diagnostics may warn even with an owner-only NTFS ACL; use Windows ACL verification for this environment.
