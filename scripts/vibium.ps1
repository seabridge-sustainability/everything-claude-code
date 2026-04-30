param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $VibiumArgs
)

$ErrorActionPreference = "Stop"

$npmShim = Join-Path $env:APPDATA "npm\vibium.cmd"
if (Test-Path -LiteralPath $npmShim) {
    & $npmShim @VibiumArgs
    exit $LASTEXITCODE
}

$cmd = Get-Command vibium -ErrorAction SilentlyContinue
if (-not $cmd) {
    throw "vibium is not installed. Run: npm install -g vibium"
}

& $cmd.Source @VibiumArgs
exit $LASTEXITCODE
