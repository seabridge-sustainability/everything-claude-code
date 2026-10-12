$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$listener = Get-NetTCPConnection -State Listen -LocalPort 3183 -ErrorAction SilentlyContinue
if ($listener) {
    $health = Invoke-RestMethod -Uri 'http://127.0.0.1:3183/api/health' -TimeoutSec 10
    if ($health.status -eq 'ok') { Write-Output 'Paperclip is already ready at http://127.0.0.1:3183'; return }
    throw 'Port3183 is occupied; preserve its owner and inspect before launching.'
}
& node (Join-Path $root 'setup.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Paperclip isolated setup failed.' }
$ownerIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
foreach ($secretFile in @('state/instances/seabridge/.env', 'state/instances/seabridge/secrets/master.key')) {
    & icacls (Join-Path $root $secretFile) /inheritance:r /grant:r "${ownerIdentity}:(F)" | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Unable to enforce owner-only ACL on owned Paperclip secrets.' }
}
$state = Join-Path $root 'state'
$node = (Get-Command node).Source
$process = Start-Process -FilePath $node -ArgumentList @('--max-old-space-size=768', (Join-Path $root 'server.mjs')) -WorkingDirectory $root -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $state 'server.stdout.log') -RedirectStandardError (Join-Path $state 'server.stderr.log')
$process.Id | Set-Content -LiteralPath (Join-Path $state 'launcher.pid')
Write-Output "Paperclip starting as process $($process.Id); dashboard http://127.0.0.1:3183."
