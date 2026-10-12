# Explicit opt-in native prerequisites. Does not modify machine Java/PATH or
# existing Ghidra installations. Versions and release digests are pinned locally.
$ErrorActionPreference = 'Stop'
$reaPins = Get-Content (Join-Path $PSScriptRoot 'native-provider.json') -Raw | ConvertFrom-Json
$reaTools = Join-Path $PSScriptRoot 'state/tools'
$reaDownloads = Join-Path $reaTools 'downloads'
New-Item -ItemType Directory -Path $reaDownloads -Force | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
foreach ($reaPackage in @($reaPins.ghidra, $reaPins.jdk)) {
    $reaArchive = Join-Path $reaDownloads $reaPackage.archive
    if (-not (Test-Path -LiteralPath $reaArchive)) {
        & curl.exe -fL --retry 2 --silent --show-error -o $reaArchive $reaPackage.url
        if ($LASTEXITCODE -ne 0) { throw "Download failed: $($reaPackage.archive)" }
    }
    if ((Get-FileHash -LiteralPath $reaArchive -Algorithm SHA256).Hash.ToLowerInvariant() -ne $reaPackage.sha256) { throw 'Native prerequisite digest mismatch' }
    $reaDestination = Join-Path $reaTools $reaPackage.directory
    if (-not (Test-Path -LiteralPath $reaDestination)) {
        [System.IO.Compression.ZipFile]::ExtractToDirectory($reaArchive, $reaTools)
    }
}
$reaGhidra = Join-Path $reaTools $reaPins.ghidra.directory
$reaJava = Join-Path $reaTools $reaPins.jdk.directory
if (-not (Test-Path -LiteralPath (Join-Path $reaGhidra 'support/analyzeHeadless.bat'))) { throw 'Ghidra headless launcher missing' }
if (-not (Test-Path -LiteralPath (Join-Path $reaJava 'bin/javac.exe'))) { throw 'Full JDK missing' }
$reaWorkspaceFile = Join-Path $PSScriptRoot 'workspace.local.json'
$reaWorkspaceText = [IO.File]::ReadAllText($reaWorkspaceFile)
$reaWorkspace = $reaWorkspaceText | ConvertFrom-Json
$reaWorkspace | Add-Member native ([pscustomobject]@{ provider='ghidra'; ghidraInstallDir=$reaGhidra; javaHome=$reaJava }) -Force
if ([IO.File]::ReadAllText($reaWorkspaceFile) -ne $reaWorkspaceText) { throw 'Workspace config changed concurrently' }
[IO.File]::WriteAllText($reaWorkspaceFile, ($reaWorkspace | ConvertTo-Json -Depth 12) + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
& node (Join-Path $PSScriptRoot 'cli.mjs') upstream doctor --provider ghidra --format json
if ($LASTEXITCODE -ne 0) { throw 'REA doctor failed; inspect provider diagnostics' }
