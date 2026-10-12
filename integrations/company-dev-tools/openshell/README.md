# OpenShell for SeaBridgeAI

Pinned upstream: NVIDIA/OpenShell v0.1.3, source `e1f3c82caa3ed3b65de22889ae7ef32a774878ef`, Apache-2.0. The release CLI and gateway are installed under WSL Ubuntu at `/home/adelmar/.local/share/ecc-dev-suite/openshell/bin`; `installation.json` records verified archive SHA-256 values. Windows with WSL2 is experimental upstream.

Any coding agent with local execution can invoke the wrapper; this does not automatically move existing agent sessions into a sandbox:

```powershell
& 'C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/openshell/cli.ps1' --version
& 'C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/openshell/cli.ps1' --gateway-endpoint http://127.0.0.1:17770 status
```

`cli.ps1` sets task-local XDG configuration/state only for its child. It changes no system PATH, Docker configuration, model, provider, or credential settings. Telemetry is disabled. No AI provider has been registered.

The gateway is a trusted control plane with Docker socket access. Its Compose project and persistent volume are exclusively named `ecc-openshell` / `ecc-openshell-state`. Gateway memory is capped at 512 MiB and CPU at 1. It does not automatically restart. Images are pinned by digest. Its listener binds the private container interface, published only on host loopback ports 17770/17771; no LAN ports are exposed. This local-only control plane uses plaintext HTTP without user authentication; it is unsuitable for shared/remote access. The workload itself receives no Docker socket, host source mounts, or credentials.

The policies use required Landlock enforcement, read-only references, a writable output directory, and denied networking by default. `policy-smoke.yaml` grants only `/usr/bin/curl` read-only HTTPS access to `api.github.com` for the synthetic verification. Use `policy-readonly.yaml` for ordinary offline reference analysis. Do not weaken compatibility or widen policies to repair a failed launch.

`project-paths.json` prioritizes backend/frontend source snapshots. It does not upload entire repositories or private documents. Approve explicit source files, omit secrets, build their read-only reference snapshot into a workload image, and review outputs before applying them to a checkout. Additional project snapshots follow the same pattern. OpenShell does not replace ECC task ownership or owner approval gates.

Lifecycle commands from this directory:

```powershell
docker compose -f compose.yaml up -d
docker compose -f compose.yaml stop
```

Stop preserves the database, volumes, source, and runtime. Never use `down -v`, volume removal, or upstream examples' deletion cleanup. For proof after a gateway is running:

```powershell
wsl.exe -d Ubuntu --exec python3 /mnt/c/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/openshell/verify-runtime.py
```

The script creates one task-owned synthetic sandbox and preserves it. It checks allowed reference reads/output writes, denied private reads/reference writes, and allowed/denied HTTP requests with policy logs. `runtime-verification.json` records the successful actual run; `runtime-followup.json` records subsequent policy-log observations, resource samples and clean stops. The fixture `ecc-policy-20261011` already exists, stopped. Choose a fresh name using `--name` (maximum19 characters) for a new verification; the script never deletes or overwrites an existing sandbox.

Verified: required Landlock denied private reads and reference writes; allowed output writes and reference reads. The supervisor allowed the GitHub GET and denied both the GitHub POST at L7 and the unlisted `example.com` destination. Callback/policy loading worked through the Docker VM loopback endpoint. The observed combined memory sample was106.51 MiB, not a peak measurement. Gateway/workload caps were512/256 MiB; the upstream Docker driver initially launched its supervisor without a cap, and only the owned supervisor was capped at256 MiB before shutdown. The verification runner now applies that cap immediately after creation. No strict policy was widened.

After inspection, stop the task-owned sandbox before stopping its gateway:

```powershell
& './cli.ps1' --gateway-endpoint http://127.0.0.1:17770 sandbox stop ecc-policy-20261011
docker compose -f compose.yaml stop
```

Both are currently stopped; persistent state is retained. Starting the gateway alone does not start a coding agent or attach a model provider. Configure an approved agent image/provider separately when an actual sandboxed agent task requires it.

The optional `docker-stdio-proxy.py` exposes Docker Desktop's existing stdio transport as a task-local Unix socket mode 0600. It opens no TCP listener and does not change Docker Desktop WSL integration. Its PID/receipt live under the isolated runtime directory; stop only the recorded owned PID after checking process identity.
