#!/usr/bin/env pwsh
# check-mcp-toolbox.ps1 - Validate MCP Toolbox central installation for SeaBridgeAI
# Usage: .\scripts\check-mcp-toolbox.ps1
# No arguments required. Safe to run anytime. Read-only checks.

$ErrorCount = 0
$ECCRoot    = 'C:\Users\adelm\SeaBridgeAI\everything-claude-code'
$ClonePath  = "$ECCRoot\external\mcp-toolbox"
$ConfigDir  = "$ECCRoot\configs\mcp-toolbox"
$DocsPath   = "$ECCRoot\docs\mcp\mcp-toolbox.md"

function Pass($msg)    { Write-Host "  [PASS] $msg" -ForegroundColor Green }
function Fail($msg)    { Write-Host "  [FAIL] $msg" -ForegroundColor Red; $script:ErrorCount++ }
function Info($msg)    { Write-Host "  [INFO] $msg" -ForegroundColor Cyan }
function Warn($msg)    { Write-Host "  [WARN] $msg" -ForegroundColor Yellow }
function Section($ttl) { Write-Host "`n=== $ttl ===" -ForegroundColor White }

# Credential patterns - single-quoted to avoid PowerShell escape issues.
# Each pattern flags a real credential value (not a <PLACEHOLDER>).
# uri patterns: match mongodb+srv:// or postgres:// when the value does NOT start with "<"
# password patterns: match unquoted values or quoted values that do not start with "<"
$credPatterns = @(
    'uri\s*:\s*mongodb\+srv://[^<]',
    'uri\s*:\s*postgres://[^<]',
    'password\s*:\s*[^"<\s]',
    'password\s*:\s*"[^<]'
)

Section '1. Central Clone'
if (Test-Path $ClonePath) {
    Pass "Clone exists at $ClonePath"
    $status = git -C $ClonePath status --porcelain 2>&1
    if ($LASTEXITCODE -eq 0) {
        if ($status) { Warn "Local changes in clone: $status" }
        else { Pass 'Clone is clean' }
    } else { Warn 'Could not check git status' }
    $commit = git -C $ClonePath log -1 --format='%H %ai' 2>&1
    Info "Commit: $commit"
    $remote = git -C $ClonePath remote get-url origin 2>&1
    Info "Remote: $remote"
} else {
    Fail "Clone NOT found at $ClonePath"
    Info "Run: git clone https://github.com/googleapis/mcp-toolbox.git $ClonePath"
}

Section '2. NPM Runtime Availability'
$npxCheck = npx --yes @toolbox-sdk/server --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Pass "npx @toolbox-sdk/server available: $npxCheck"
} else {
    Warn 'npx @toolbox-sdk/server not cached locally (will download on first use)'
    Info 'Run once to cache: npx @toolbox-sdk/server --version'
}

Section '3. Config Examples'
$devExample     = "$ConfigDir\tools.dev.example.yaml"
$stagingExample = "$ConfigDir\tools.staging.example.yaml"
$configReadme   = "$ConfigDir\README.md"

if (Test-Path $devExample)     { Pass 'tools.dev.example.yaml exists' }     else { Fail 'tools.dev.example.yaml MISSING' }
if (Test-Path $stagingExample) { Pass 'tools.staging.example.yaml exists' } else { Fail 'tools.staging.example.yaml MISSING' }
if (Test-Path $configReadme)   { Pass 'configs/mcp-toolbox/README.md exists' } else { Fail 'configs/mcp-toolbox/README.md MISSING' }

Section '4. No Real Credentials in Example Files'
$exampleFiles = @($devExample, $stagingExample)
foreach ($file in $exampleFiles) {
    if (-not (Test-Path $file)) { continue }
    $content = Get-Content $file -Raw
    $leaked  = $false
    foreach ($pat in $credPatterns) {
        if ($content -match $pat) {
            $fname = [System.IO.Path]::GetFileName($file)
            Fail "Potential real credential in $fname (pattern: $pat)"
            $leaked = $true
        }
    }
    if (-not $leaked) {
        $fname = [System.IO.Path]::GetFileName($file)
        Pass "No real credentials detected in $fname"
    }
}

Section '5. Main Documentation'
if (Test-Path $DocsPath) { Pass 'docs/mcp/mcp-toolbox.md exists' }
else { Fail 'docs/mcp/mcp-toolbox.md MISSING' }

Section '6. Backend Dev Guide'
$backendGuide = 'C:\Users\adelm\SeaBridgeAI\manageesg-backend\docs\mcp\mcp-toolbox-dev-guide.md'
if (Test-Path $backendGuide) { Pass 'Backend dev guide exists' }
else { Warn "Backend dev guide not found at $backendGuide" }

Section '7. OpenSeaBri Dev Guide'
$openseabriGuide = 'C:\Users\adelm\SeaBridgeAI\openseabri\docs\mcp-toolbox-dev-guide.md'
if (Test-Path $openseabriGuide) { Pass 'OpenSeaBri dev guide exists' }
else { Warn "OpenSeaBri dev guide not found at $openseabriGuide" }

Section '8. Active Config Safety (if tools.dev.yaml exists)'
$devConfig = "$ConfigDir\tools.dev.yaml"
if (Test-Path $devConfig) {
    $content = Get-Content $devConfig -Raw
    foreach ($pat in $credPatterns) {
        if ($content -match $pat) {
            Warn 'tools.dev.yaml may contain real credentials - ensure it is gitignored'
            break
        }
    }
    git -C $ConfigDir check-ignore -q tools.dev.yaml 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { Pass 'tools.dev.yaml is gitignored' }
    else { Fail 'tools.dev.yaml exists but is NOT gitignored - risk of credential commit' }
} else {
    Info 'tools.dev.yaml not present (copy from tools.dev.example.yaml to create)'
}

Section '9. Duplicate Clone Check'
$dupLocations = @(
    'C:\Users\adelm\SeaBridgeAI\manageesg-backend\external\mcp-toolbox',
    'C:\Users\adelm\SeaBridgeAI\manageesg-frontend\external\mcp-toolbox',
    'C:\Users\adelm\SeaBridgeAI\openseabri\external\mcp-toolbox',
    'C:\Users\adelm\SeaBridgeAI\autoresearch\mcp-toolbox',
    'C:\Users\adelm\SeaBridgeAI\_upstream\mcp-toolbox'
)
$foundDups = $false
foreach ($loc in $dupLocations) {
    if (Test-Path $loc) {
        Warn "Duplicate clone found at $loc - central clone at $ClonePath should be the only one"
        $foundDups = $true
    }
}
if (-not $foundDups) { Pass 'No duplicate clones detected in project repos' }

Section 'Summary'
if ($ErrorCount -eq 0) {
    Write-Host ''
    Write-Host '  All checks passed. MCP Toolbox is correctly installed.' -ForegroundColor Green
} else {
    Write-Host ''
    Write-Host "  $ErrorCount check(s) failed. See [FAIL] items above." -ForegroundColor Red
    exit 1
}
