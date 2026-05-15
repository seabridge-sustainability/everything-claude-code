#!/usr/bin/env pwsh
# use-unsloth-claude-code.ps1 - Configure Claude Code to use Unsloth Studio as local LLM backend.
# Run in your terminal BEFORE launching Claude Code (dot-source to export env vars).
#
# Usage:
#   . .\use-unsloth-claude-code.ps1                   # dot-source to set env in current shell
#   . .\use-unsloth-claude-code.ps1 -ModelId gemma4   # override model
#   . .\use-unsloth-claude-code.ps1 -Port 8889        # if Studio started on a different port
#   . .\use-unsloth-claude-code.ps1 -Reset            # clear overrides, revert to Anthropic API

param(
    [string]$ModelId = "",
    [int]$Port = 8888,
    [switch]$Reset
)

$STUDIO_URL  = "http://127.0.0.1:${Port}"
$MODELS_URL  = "$STUDIO_URL/v1/models"
$KEY_ENV_VAR = "UNSLOTH_API_KEY"

if ($Reset) {
    Remove-Item Env:ANTHROPIC_BASE_URL   -ErrorAction SilentlyContinue
    Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    Remove-Item Env:ANTHROPIC_MODEL      -ErrorAction SilentlyContinue
    Write-Host "use-unsloth: Cleared - Claude Code will use the default Anthropic API."
    return
}

# 1. Resolve API key early so the probe can authenticate
$apiKey = [System.Environment]::GetEnvironmentVariable($KEY_ENV_VAR, "User")
if (-not $apiKey) {
    $msg = "use-unsloth: No API key found in user env var '$KEY_ENV_VAR'." +
           "`n`nSet it once (run in a terminal, not here):" +
           "`n    [System.Environment]::SetEnvironmentVariable('UNSLOTH_API_KEY', 'sk-unsloth-XXXX', 'User')" +
           "`n`nGet your key from: ${STUDIO_URL} (Studio UI -> API Keys)"
    Write-Error $msg
    return
}

# 2. Validate Studio is running (authenticated probe)
$probeHeaders = @{ Authorization = "Bearer $apiKey" }
try {
    $resp = Invoke-RestMethod -Uri $MODELS_URL -Headers $probeHeaders -TimeoutSec 5 -ErrorAction Stop
} catch {
    $msg = "use-unsloth: Unsloth Studio is not responding at ${STUDIO_URL}." +
           "`n`nStart it first:`n    unsloth studio -p ${Port}" +
           "`n`nOr launch a model directly:`n    unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p ${Port}" +
           "`n`nError: $_"
    Write-Error $msg
    return
}

# 3. Pick model — wrap in @() so a single result stays an array, not a bare string
$models = @($resp.data | Select-Object -ExpandProperty id)
if (-not $models) {
    Write-Error "use-unsloth: No models loaded. Load one in the Studio UI first."
    return
}
if ($ModelId) {
    $chosen = $models | Where-Object { $_ -like "*$ModelId*" } | Select-Object -First 1
    if (-not $chosen) {
        Write-Warning "use-unsloth: Model matching '$ModelId' not found. Available: $($models -join ', ')"
        $chosen = $models[0]
    }
} else {
    $chosen = $models[0]
}

# 4. Set environment for current shell session
$env:ANTHROPIC_BASE_URL   = $STUDIO_URL
$env:ANTHROPIC_AUTH_TOKEN = $apiKey
$env:ANTHROPIC_MODEL      = $chosen

Write-Host "use-unsloth: Claude Code will use:"
Write-Host "  Base URL  : $STUDIO_URL"
Write-Host "  Model     : $chosen"
Write-Host "  API key   : $($apiKey.Substring(0, [Math]::Min(12, $apiKey.Length)))... (masked)"
Write-Host ""
Write-Host "Launch Claude Code now:"
Write-Host "  claude"
Write-Host ""
Write-Host "To reset back to Anthropic API:"
Write-Host "  . .\use-unsloth-claude-code.ps1 -Reset"
