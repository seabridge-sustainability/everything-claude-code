#!/usr/bin/env pwsh
# check-unsloth.ps1 - Verify Unsloth central install, Studio status, GPU, and endpoint readiness.
# Usage: .\check-unsloth.ps1
# Compatible with Windows PowerShell 5.1

$ECC = "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
$CLONE = "$ECC\external\unsloth"
$STUDIO_DIR = "$env:USERPROFILE\.unsloth\studio"
$VENV_PIP = "$STUDIO_DIR\unsloth_studio\Scripts\pip.exe"

function Status($label, $value, $ok) {
    $symbol = if ($ok) { "[OK]" } else { "[!!]" }
    Write-Host ("  {0,-38} {1}  {2}" -f $label, $symbol, $value)
}

function NullCoalesce($a, $b) { if ($null -ne $a -and $a -ne '') { $a } else { $b } }

Write-Host ""
Write-Host "=== Unsloth Health Check ==="
Write-Host ""

# 1. Central clone
$cloneOk = Test-Path $CLONE
$cloneCommit = if ($cloneOk) { git -C $CLONE log -1 --oneline 2>$null } else { "missing" }
$cloneBranch = if ($cloneOk) { git -C $CLONE branch --show-current 2>$null } else { "n/a" }
Status "Central clone" "$CLONE" $cloneOk
if ($cloneOk) {
    Status "  branch / commit" "$cloneBranch | $cloneCommit" $true
}

# 2. autoresearch clone (duplicate - not authoritative)
$arClone = "C:\Users\adelm\SeaBridgeAI\autoresearch\unsloth"
$arOk = Test-Path $arClone
if ($arOk) {
    $arCommit = git -C $arClone log -1 --oneline 2>$null
    Status "autoresearch clone (duplicate)" $arCommit $false
    Write-Host "    NOTE: autoresearch\unsloth is a duplicate - central clone is authoritative"
}

# 3. Unsloth command on PATH
$unslothCmd = Get-Command unsloth -ErrorAction SilentlyContinue
$unslothPath = if ($null -ne $unslothCmd) { $unslothCmd.Source } else { $null }
Status "unsloth on PATH" (NullCoalesce $unslothPath "not found") ($null -ne $unslothPath)

# 4. Unsloth package version in studio venv (uv venvs have no pip.exe — use python -m pip)
$VENV_PYTHON = "$STUDIO_DIR\unsloth_studio\Scripts\python.exe"
$pkgVer = if (Test-Path $VENV_PYTHON) {
    $raw = & $VENV_PYTHON -m pip show unsloth 2>$null | Select-String "^Version:"
    if ($raw) { $raw.ToString().Split(":")[1].Trim() } else { "unknown" }
} else { "venv missing" }
Status "unsloth package (studio venv)" $pkgVer ($pkgVer -match "^\d")

# 5. Studio directory
Status "Studio data dir" $STUDIO_DIR (Test-Path $STUDIO_DIR)

# 6. Studio running (PID)
$pidFile = "$STUDIO_DIR\studio.pid"
$studioRunning = $false
if (Test-Path $pidFile) {
    $pid_val = (Get-Content $pidFile -ErrorAction SilentlyContinue)
    if ($pid_val) {
        $pid_val = $pid_val.Trim()
        $proc = Get-Process -Id $pid_val -ErrorAction SilentlyContinue
        $studioRunning = $null -ne $proc
        $procName = if ($null -ne $proc) { $proc.ProcessName } else { "not running" }
        Status "Studio process (PID $pid_val)" $procName $studioRunning
    }
} else {
    Status "Studio PID file" "missing" $false
}

# 7. Ports
foreach ($port in @(8888, 8000)) {
    $inUse = ($null -ne (netstat -an 2>$null | Select-String ":$port "))
    $portLabel = if ($inUse) { "in use" } else { "free" }
    $portOk = if ($port -eq 8888) { $inUse } else { $true }
    Status "Port $port" $portLabel $portOk
}

# 9. API key presence (user env) — resolve early so probe can use it
$unslothKey = [System.Environment]::GetEnvironmentVariable("UNSLOTH_API_KEY", "User")
$authToken  = [System.Environment]::GetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "User")
$apiKeyPresent = ($null -ne $unslothKey) -or ($null -ne $authToken)
$apiKeyLabel = if ($apiKeyPresent) { "yes (masked)" } else { "not set" }
Status "API key configured (env)" $apiKeyLabel $apiKeyPresent

# 8. Endpoint probe (if running)
if ($studioRunning) {
    $probeKey = NullCoalesce $unslothKey $authToken
    try {
        $probeHeaders = @{}
        if ($null -ne $probeKey) { $probeHeaders["Authorization"] = "Bearer $probeKey" }
        $resp = Invoke-RestMethod -Uri "http://127.0.0.1:8888/v1/models" -Headers $probeHeaders -TimeoutSec 5 -ErrorAction Stop
        $count = $resp.data.Count
        $modelNames = ($resp.data | ForEach-Object { $_.id }) -join ", "
        $modelLabel = if ($count -eq 0) { "OK (no model loaded)" } else { "OK - $count loaded: $modelNames" }
        Status "/v1/models endpoint" $modelLabel $true
    } catch {
        Status "/v1/models endpoint" "ERROR: $_" $false
    }
} else {
    Status "/v1/models endpoint" "Studio not running - skipped" $false
}

# 10. ANTHROPIC_BASE_URL — session-scoped ($env:) is correct; user env is not expected
$baseUrl = NullCoalesce $env:ANTHROPIC_BASE_URL ([System.Environment]::GetEnvironmentVariable("ANTHROPIC_BASE_URL", "User"))
$baseUrlOk = $null -ne $baseUrl
$baseUrlLabel = if ($baseUrlOk) { $baseUrl } else { "not set (dot-source use-unsloth-claude-code.ps1 before launching claude)" }
Status "ANTHROPIC_BASE_URL (session)" $baseUrlLabel $baseUrlOk

# 11. GPU
try {
    $smi = nvidia-smi --query-gpu=name,memory.total,driver_model.current --format=csv,noheader 2>$null
    if ($smi) { Status "GPU" $smi.Trim() $true } else { Status "GPU" "nvidia-smi failed" $false }
} catch { Status "GPU" "not detected" $false }

# 12. HF cache models
$hfCache = "$env:USERPROFILE\.cache\huggingface\hub"
if (Test-Path $hfCache) {
    $hfDirs = Get-ChildItem $hfCache -Directory | Where-Object { $_.Name -ne ".locks" }
    $modelList = ($hfDirs | Select-Object -ExpandProperty Name) -join ", "
    Status "HF cache models" $modelList $true
} else { Status "HF cache" "not found" $false }

# 13. Target repo access
Write-Host ""
Write-Host "--- Target Repo Access ---"
@(
    "manageesg-backend",
    "manageesg-frontend",
    "openseabri",
    "_upstream",
    "autoresearch"
) | ForEach-Object {
    $pointer = "C:\Users\adelm\SeaBridgeAI\$_\docs\local-llm\unsloth-local.md"
    $ok = Test-Path $pointer
    $pointerLabel = if ($ok) { "yes" } else { "missing" }
    Status "  $_ has unsloth pointer" $pointerLabel $ok
}

Write-Host ""
Write-Host "=== To start Studio ==="
Write-Host "  unsloth studio -p 8888"
Write-Host ""
Write-Host "=== To run a model directly ==="
Write-Host "  unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888"
Write-Host ""
