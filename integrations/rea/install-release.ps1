param()
$ErrorActionPreference = 'Stop'
# Explicit, owner-approved installation only. Never replace a live legacy runtime.
$reaRoot = $PSScriptRoot
$reaPin = Get-Content -LiteralPath (Join-Path $reaRoot 'active-upstream.json') -Raw | ConvertFrom-Json
if ($reaPin.version -notmatch '^\d+\.\d+\.\d+$') { throw 'Invalid REA release version' }
$reaManifestRoot = Join-Path $reaRoot 'release'
# Windows PowerShell 5 cannot parse npm's empty root-package key; use Node's
# standard JSON parser rather than changing the lockfile representation.
& node -e "const fs=require('fs'); const l=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); const p=JSON.parse(fs.readFileSync(process.argv[2],'utf8')); const r=l.packages['node_modules/rea-agents']; if(!r || r.version!==p.version || r.integrity!==p.releaseIntegrity) process.exit(1);" (Join-Path $reaManifestRoot 'package-lock.json') (Join-Path $reaRoot 'active-upstream.json')
if ($LASTEXITCODE -ne 0) { throw 'Locked package differs from approved REA release' }
$reaDestination = Join-Path $reaRoot "vendor/rea-$($reaPin.version)"
$reaEntry = Join-Path $reaRoot $reaPin.entryPoint
if (Test-Path -LiteralPath $reaEntry) {
    $reaInstalled = Get-Content -LiteralPath (Join-Path $reaDestination 'node_modules/rea-agents/package.json') -Raw | ConvertFrom-Json
    if ($reaInstalled.version -ne $reaPin.version) { throw 'Existing runtime differs; preserve it for review' }
    Write-Output "REA $($reaPin.version) already installed; no files replaced."
} else {
    if (Test-Path -LiteralPath (Join-Path $reaDestination 'node_modules')) { throw 'Partial installation found; preserve it for review, do not clean a potentially live runtime' }
    New-Item -ItemType Directory -Path $reaDestination -Force | Out-Null
    foreach ($reaFile in @('package.json', 'package-lock.json')) {
        $reaSourceFile = Join-Path $reaManifestRoot $reaFile
        $reaTargetFile = Join-Path $reaDestination $reaFile
        if ((Test-Path -LiteralPath $reaTargetFile) -and (Get-FileHash -LiteralPath $reaTargetFile).Hash -ne (Get-FileHash -LiteralPath $reaSourceFile).Hash) { throw "Existing $reaFile differs; preserve it for review" }
        if (-not (Test-Path -LiteralPath $reaTargetFile)) { Copy-Item -LiteralPath $reaSourceFile -Destination $reaTargetFile }
    }
    Push-Location $reaDestination
    try {
        npm ci --ignore-scripts --no-audit --no-fund
        if ($LASTEXITCODE -ne 0) { throw 'Locked REA installation failed' }
    } finally { Pop-Location }
}
$reaObserved = (& node $reaEntry --version | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $reaObserved -ne $reaPin.version) { throw 'Installed REA version verification failed' }
if ($env:OS -eq 'Windows_NT') {
    & node (Join-Path $reaDestination 'node_modules/rea-agents/scripts/verify-windows-native-artifact.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'Published Windows helper verification failed' }
}
Write-Output "Verified REA $($reaPin.version). Existing sessions and user configuration were not changed."
