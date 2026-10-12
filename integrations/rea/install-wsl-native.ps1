# Opt-in isolated Linux provider; does not change system Java/Node or REA source.
param([string]$Distribution = 'Ubuntu')
$ErrorActionPreference = 'Stop'
$reaRoot = $PSScriptRoot
$reaDrive = $reaRoot.Substring(0, 1).ToLowerInvariant()
$reaLinuxRoot = '/mnt/' + $reaDrive + '/' + $reaRoot.Substring(3).Replace('\', '/')
& wsl.exe --distribution $Distribution --exec bash ($reaLinuxRoot + '/install-wsl-native.sh') $reaLinuxRoot
if ($LASTEXITCODE -ne 0) { throw 'WSL native provider installation failed' }
$reaLinuxHome = & wsl.exe --distribution $Distribution --exec printenv HOME
if ($LASTEXITCODE -ne 0) { throw 'Cannot resolve the WSL user home' }
$reaRuntime = & wsl.exe --distribution $Distribution --exec cat ($reaLinuxHome.Trim() + '/.local/share/ecc-rea/runtime.json')
if ($LASTEXITCODE -ne 0) { throw 'Cannot read isolated WSL runtime settings' }
$reaWorkspace = Join-Path $reaRoot 'workspace.local.json'
$reaSettings = Get-Content -LiteralPath $reaWorkspace -Raw | ConvertFrom-Json
$reaNative = $reaSettings.native
if (-not $reaNative) { throw 'Run install-native.ps1 first to configure the Windows fallback' }
$reaWsl = $reaRuntime | ConvertFrom-Json
$reaWsl | Add-Member -NotePropertyName distribution -NotePropertyValue $Distribution -Force
$reaNative | Add-Member -NotePropertyName runtime -NotePropertyValue wsl -Force
$reaNative | Add-Member -NotePropertyName wsl -NotePropertyValue $reaWsl -Force
$reaJson = $reaSettings | ConvertTo-Json -Depth 30
[System.IO.File]::WriteAllText($reaWorkspace, $reaJson + "`n", (New-Object System.Text.UTF8Encoding($false)))
& node (Join-Path $reaRoot 'activate-clients.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Provider installed; MCP registration requires attention' }
