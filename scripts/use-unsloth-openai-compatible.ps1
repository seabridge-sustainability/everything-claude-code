#!/usr/bin/env pwsh
# use-unsloth-openai-compatible.ps1 - Configure Codex, OpenCode, Cursor, Continue.dev, or any
# OpenAI-compatible client to use Unsloth Studio as a local LLM backend.
# Run in your terminal (dot-source) BEFORE launching your coding tool.
#
# Usage:
#   . .\use-unsloth-openai-compatible.ps1
#   . .\use-unsloth-openai-compatible.ps1 -ModelId qwen
#   . .\use-unsloth-openai-compatible.ps1 -Reset

param(
    [string]$ModelId = "",
    [int]$Port = 8888,
    [switch]$Reset
)

$STUDIO_URL  = "http://127.0.0.1:${Port}"
$MODELS_URL  = "$STUDIO_URL/v1/models"
$KEY_ENV_VAR = "UNSLOTH_API_KEY"

if ($Reset) {
    Remove-Item Env:OPENAI_BASE_URL -ErrorAction SilentlyContinue
    Remove-Item Env:OPENAI_API_KEY  -ErrorAction SilentlyContinue
    Remove-Item Env:OPENAI_MODEL    -ErrorAction SilentlyContinue
    Write-Host "use-unsloth-oa: Cleared - clients will use their default endpoint."
    return
}

# 1. Validate Studio is running
try {
    $resp = Invoke-RestMethod -Uri $MODELS_URL -TimeoutSec 5 -ErrorAction Stop
} catch {
    $msg = "use-unsloth-oa: Unsloth Studio is not responding at ${STUDIO_URL}." +
           "`n`nStart it first:`n    unsloth studio -p 8888" +
           "`n`nOr launch a model directly:`n    unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888"
    Write-Error $msg
    return
}

# 2. Pick model — wrap in @() so a single result stays an array, not a bare string
$models = @($resp.data | Select-Object -ExpandProperty id)
if (-not $models) {
    Write-Error "use-unsloth-oa: No models loaded."
    return
}
if ($ModelId) {
    $chosen = $models | Where-Object { $_ -like "*$ModelId*" } | Select-Object -First 1
    if ($null -eq $chosen) { $chosen = $models[0] }
} else {
    $chosen = $models[0]
}

# 3. Get API key
$apiKey = [System.Environment]::GetEnvironmentVariable($KEY_ENV_VAR, "User")
if (-not $apiKey) {
    $msg = "use-unsloth-oa: No API key found in user env var '$KEY_ENV_VAR'." +
           "`nSet it once:`n    [System.Environment]::SetEnvironmentVariable('UNSLOTH_API_KEY', 'sk-unsloth-XXXX', 'User')"
    Write-Error $msg
    return
}

# 4. Set OpenAI-compatible env vars
$env:OPENAI_BASE_URL = "$STUDIO_URL/v1"
$env:OPENAI_API_KEY  = $apiKey
$env:OPENAI_MODEL    = $chosen

Write-Host "use-unsloth-oa: OpenAI-compatible clients configured:"
Write-Host "  OPENAI_BASE_URL : $STUDIO_URL/v1"
Write-Host "  OPENAI_MODEL    : $chosen"
Write-Host "  OPENAI_API_KEY  : $($apiKey.Substring(0, [Math]::Min(12, $apiKey.Length)))... (masked)"
Write-Host ""
Write-Host "Client-specific configs:"
Write-Host "  Codex     : codex (auto-picks OPENAI_BASE_URL + OPENAI_API_KEY)"
Write-Host "  Cursor    : Settings -> Models -> Base URL: $STUDIO_URL/v1"
Write-Host "  Continue  : config.json -> provider: openai, baseUrl: $STUDIO_URL/v1"
Write-Host "  OpenCode  : Set env vars above; launch with: opencode"
