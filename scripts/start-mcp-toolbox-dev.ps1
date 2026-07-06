#!/usr/bin/env pwsh
# start-mcp-toolbox-dev.ps1 — Start MCP Toolbox for local development
#
# Usage:
#   .\scripts\start-mcp-toolbox-dev.ps1
#   .\scripts\start-mcp-toolbox-dev.ps1 -Toolset openseabri-qa
#   .\scripts\start-mcp-toolbox-dev.ps1 -Prebuilt mongodb
#   .\scripts\start-mcp-toolbox-dev.ps1 -AllowProduction  # requires explicit flag
#
# Refuses to start if:
#   - No DB credentials found in environment
#   - A production URL is detected without --AllowProduction flag

param(
    [string]  $Toolset         = "",
    [string]  $Prebuilt        = "",
    [string]  $ConfigFile      = "",
    [int]     $Port            = 5000,
    [switch]  $AllowProduction = $false,
    [string]  $OtlpEndpoint    = ""
)

$ConfigDir = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\configs\mcp-toolbox"
$DefaultConfig = "$ConfigDir\tools.dev.yaml"

# ---- Production URL detection ----
function Test-IsProductionUrl($url) {
    return $url -match "prod|production|atlas\.mongodb\.net" -and $url -notmatch "dev|staging|local|127\.0\.0\.1|localhost"
}

function Assert-NotProduction($envVarName) {
    $val = [System.Environment]::GetEnvironmentVariable($envVarName)
    if ($val -and (Test-IsProductionUrl $val)) {
        if (-not $AllowProduction) {
            Write-Host "[BLOCKED] $envVarName looks like a production URL." -ForegroundColor Red
            Write-Host "  Value prefix: $($val.Substring(0, [Math]::Min(30, $val.Length)))..."
            Write-Host "  To override: -AllowProduction flag (requires explicit approval)"
            exit 1
        } else {
            Write-Host "[WARN] Production URL detected in $envVarName — AllowProduction flag is set" -ForegroundColor Yellow
        }
    }
}

Write-Host "=== MCP Toolbox Dev Launcher ===" -ForegroundColor Cyan

# ---- Check credentials are present ----
$mongoUrl   = $env:MONGODB_DEV_URL
$pgUrl      = $env:SEABRI_DEV_DATABASE_URL
$redisHost  = $env:REDIS_DEV_HOST

if (-not $Prebuilt) {
    # Custom config mode — need at least one credential set
    if (-not $mongoUrl -and -not $pgUrl -and -not $redisHost) {
        Write-Host "[BLOCKED] No dev DB credentials found in environment." -ForegroundColor Red
        Write-Host "  Set at least one of:"
        Write-Host "    `$env:MONGODB_DEV_URL"
        Write-Host "    `$env:SEABRI_DEV_DATABASE_URL"
        Write-Host "    `$env:REDIS_DEV_HOST"
        Write-Host "  Copy from .env and set in your shell, or source your .env file."
        exit 1
    }
    Assert-NotProduction "MONGODB_DEV_URL"
    Assert-NotProduction "SEABRI_DEV_DATABASE_URL"
} else {
    # Prebuilt mode — check DB-specific credential
    switch ($Prebuilt.ToLower()) {
        "mongodb" {
            if (-not $mongoUrl -and -not $env:MONGODB_URI) {
                Write-Host "[BLOCKED] MONGODB_DEV_URL or MONGODB_URI not set." -ForegroundColor Red; exit 1
            }
            Assert-NotProduction "MONGODB_URI"
        }
        "postgres" {
            if (-not $pgUrl -and -not $env:DATABASE_URL) {
                Write-Host "[BLOCKED] SEABRI_DEV_DATABASE_URL or DATABASE_URL not set." -ForegroundColor Red; exit 1
            }
            Assert-NotProduction "DATABASE_URL"
        }
        "redis" {
            if (-not $redisHost -and -not $env:REDIS_URL) {
                Write-Host "[BLOCKED] REDIS_DEV_HOST or REDIS_URL not set." -ForegroundColor Red; exit 1
            }
        }
    }
}

# ---- Build npx command ----
$npxArgs = @("-y", "@toolbox-sdk/server")

if ($Prebuilt) {
    $npxArgs += "--prebuilt=$Prebuilt"
    $npxArgs += "--stdio"
    Write-Host "[INFO] Starting prebuilt mode: $Prebuilt (stdio)" -ForegroundColor Cyan
} else {
    $configToUse = if ($ConfigFile) { $ConfigFile } else { $DefaultConfig }
    if (-not (Test-Path $configToUse)) {
        Write-Host "[BLOCKED] Config file not found: $configToUse" -ForegroundColor Red
        Write-Host "  Copy tools.dev.example.yaml to tools.dev.yaml and fill in credentials."
        exit 1
    }
    $npxArgs += "--config"; $npxArgs += $configToUse
    $npxArgs += "--port"; $npxArgs += $Port
    if ($Toolset) { $npxArgs += "--toolset=$Toolset" }
    if ($OtlpEndpoint) { $npxArgs += "--telemetry-otlp=$OtlpEndpoint" }
    Write-Host "[INFO] Config: $configToUse" -ForegroundColor Cyan
    if ($Toolset) { Write-Host "[INFO] Toolset: $Toolset" -ForegroundColor Cyan }
}

Write-Host "[INFO] Port: $Port" -ForegroundColor Cyan
Write-Host "[INFO] MCP endpoint: http://127.0.0.1:$Port/mcp" -ForegroundColor Green
Write-Host "[INFO] Add to .mcp.json:" -ForegroundColor Green
Write-Host '  { "toolbox": { "type": "http", "url": "http://127.0.0.1:' + $Port + '/mcp" } }' -ForegroundColor Green
Write-Host ""
Write-Host "Starting toolbox (Ctrl+C to stop)..." -ForegroundColor Yellow

& npx @npxArgs
