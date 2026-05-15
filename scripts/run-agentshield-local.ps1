#!/usr/bin/env pwsh
# run-agentshield-local.ps1 - Safe local Agent Shield runner for SeaBridgeAI.
# Read-only by default. No auto-fix, no Opus/deep/sandbox/injection, no global install.

param(
  [string]$Path = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [string]$OutputDir = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\reports\security\agentshield",
  [ValidateSet("json","markdown","html","terminal")]
  [string]$Format = "json",
  [string]$MinSeverity = "medium",
  [switch]$AllowNpxDownload,
  [switch]$FailOnFindings
)

$ErrorActionPreference = "Stop"
$ECCRoot = "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
$ClonePath = Join-Path $ECCRoot "external\agentshield"
$NodeModules = Join-Path $ClonePath "node_modules"
$DistIndex = Join-Path $ClonePath "dist\index.js"

function Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "[FAIL] $msg" -ForegroundColor Red }

if (-not (Test-Path $Path)) {
  Fail "Scan path does not exist: $Path"
  exit 2
}

if (-not (Test-Path $ClonePath)) {
  Fail "Agent Shield clone missing: $ClonePath"
  Info "Clone centrally first: git clone https://github.com/affaan-m/agentshield $ClonePath"
  exit 2
}

New-Item -ItemType Directory -Force $OutputDir | Out-Null
$safeName = ((Resolve-Path $Path).Path -replace '[:\\\/]+','_').Trim('_')
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$outFile = Join-Path $OutputDir "agentshield_${safeName}_${timestamp}.$Format"

$args = @("scan", "--path", $Path, "--format", $Format, "--min-severity", $MinSeverity)

$runner = $null
$runnerArgs = @()
if ((Test-Path $DistIndex) -and (Test-Path $NodeModules)) {
  $runner = "node"
  $runnerArgs = @($DistIndex) + $args
} elseif (Get-Command "agentshield" -ErrorAction SilentlyContinue) {
  $runner = "agentshield"
  $runnerArgs = $args
} elseif ($AllowNpxDownload) {
  $runner = "npx"
  $runnerArgs = @("--yes", "ecc-agentshield") + $args
} else {
  Warn "Agent Shield is cloned, but local dependencies are not installed and agentshield is not on PATH."
  Warn "No scan was run. This avoids implicit dependency installs."
  Info "Options:"
  Info "  1. Approve local dependency install in $ClonePath, then run this script again."
  Info "  2. Run with -AllowNpxDownload to use npx for a temporary package download."
  Info "  3. Install agentshield globally only if explicitly approved."
  exit 2
}

Info "Running Agent Shield read-only scan."
Info "Path: $Path"
Info "Output: $outFile"
Info "Runner: $runner"

$output = & $runner @runnerArgs 2>&1
$exitCode = $LASTEXITCODE
$output | Set-Content -LiteralPath $outFile -Encoding UTF8

if ($Format -eq "json" -and (Test-Path $outFile)) {
  try {
    $json = Get-Content -LiteralPath $outFile -Raw | ConvertFrom-Json
    $total = $json.summary.totalFindings
    if ($null -eq $total) { $total = $json.findings.Count }
    Info "Findings: $total"
    if ($json.score.grade) { Info "Grade: $($json.score.grade)" }
  } catch {
    Warn "Could not parse JSON summary. Raw output saved only."
  }
} else {
  Info "Raw scan output saved. Terminal output is intentionally not echoed to avoid exposing evidence."
}

if ($exitCode -ne 0) {
  Warn "Agent Shield exited with code $exitCode. See saved report."
  if ($FailOnFindings) { exit $exitCode }
}

exit 0
