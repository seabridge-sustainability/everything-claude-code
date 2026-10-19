param([string]$PythonCommand = 'py', [string]$PythonVersion = '-3.13')
$ErrorActionPreference = 'Stop'
$reaRoot = $PSScriptRoot
$reaPin = Get-Content (Join-Path $reaRoot 'upstream.json') -Raw | ConvertFrom-Json
$reaSource = Join-Path $reaRoot 'vendor/rea'
if (-not (Test-Path -LiteralPath $reaSource)) {
    git clone $reaPin.repository $reaSource
    if ($LASTEXITCODE -ne 0) { throw 'REA clone failed' }
    git -C $reaSource checkout --detach $reaPin.revision
    if ($LASTEXITCODE -ne 0) { throw 'REA pin checkout failed' }
}
$reaRevision = git -C $reaSource rev-parse HEAD
if ($reaRevision -ne $reaPin.revision) { throw 'Existing REA differs from pin; preserve it and review before upgrading' }
Push-Location $reaSource
try {
    npm ci --ignore-scripts --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'REA dependency install failed' }
    npm run build:cached
    if ($LASTEXITCODE -ne 0) { throw 'REA build failed' }
} finally { Pop-Location }
if ($IsWindows -or $env:OS -eq 'Windows_NT') {
    $reaArtifactDir = Join-Path $reaSource 'native/windows/build'
    $reaArtifact = Join-Path $reaArtifactDir 'rea-windows-x64.node'
    if (-not (Test-Path -LiteralPath $reaArtifact)) {
        $reaArchiveDir = Join-Path $reaRoot 'state'
        New-Item -ItemType Directory -Force $reaArchiveDir | Out-Null
        $reaPack = npm pack "rea-agents@$($reaPin.version)" --ignore-scripts --pack-destination $reaArchiveDir --json | ConvertFrom-Json
        if ($LASTEXITCODE -ne 0 -or $reaPack.integrity -ne $reaPin.releaseIntegrity) { throw 'REA release integrity differs from approved pin' }
        $reaArchive = Join-Path $reaArchiveDir $reaPack.filename
        $reaHash = [Convert]::ToBase64String([System.Security.Cryptography.SHA512]::Create().ComputeHash([System.IO.File]::ReadAllBytes($reaArchive)))
        if ("sha512-$reaHash" -ne $reaPin.releaseIntegrity) { throw 'REA archive checksum mismatch' }
        tar -xzf $reaArchive -C $reaSource --strip-components=1 package/native/windows/build/manifest.json package/native/windows/build/rea-windows-x64.node
        if ($LASTEXITCODE -ne 0) { throw 'REA Windows helper extraction failed' }
    }
    if ((Get-FileHash -LiteralPath $reaArtifact -Algorithm SHA256).Hash.ToLowerInvariant() -ne $reaPin.windowsArtifactSha256) { throw 'REA Windows helper checksum mismatch' }
    node (Join-Path $reaSource 'scripts/verify-windows-native-artifact.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'REA Windows helper verification failed' }
}
$reaPython = Join-Path $reaRoot '.venv/Scripts/python.exe'
if (Test-Path -LiteralPath (Join-Path $reaRoot 'active-upstream.json')) {
    & (Join-Path $reaRoot 'install-release.ps1')
}
if (-not (Test-Path -LiteralPath $reaPython)) {
    & $PythonCommand $PythonVersion -m venv (Join-Path $reaRoot '.venv')
    if ($LASTEXITCODE -ne 0) { throw 'Python environment creation failed' }
}
& $reaPython -m pip install -r (Join-Path $reaRoot 'requirements.txt')
if ($LASTEXITCODE -ne 0) { throw 'Video dependency install failed' }
Push-Location $reaRoot
try {
    node configure.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Workspace configuration failed' }
    & $reaPython -c "from huggingface_hub import snapshot_download; snapshot_download('Systran/faster-whisper-tiny', revision='$($reaPin.whisperRevision)', local_dir='state/models/tiny', allow_patterns=['config.json','model.bin','tokenizer.json','vocabulary.txt'])"
    if ($LASTEXITCODE -ne 0) { throw 'Local transcription model download failed' }
    node cli.mjs doctor
    if ($LASTEXITCODE -ne 0) { throw 'Bridge runtime is not ready' }
} finally { Pop-Location }
