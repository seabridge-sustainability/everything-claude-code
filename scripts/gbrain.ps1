param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$GBrainArgs
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$gbrainRoot = Join-Path $repoRoot "references\gbrain"

if (-not (Test-Path (Join-Path $gbrainRoot "src\cli.ts"))) {
  throw "GBrain reference checkout not found at $gbrainRoot"
}

Push-Location $gbrainRoot
try {
  $globalExe = Join-Path $env:USERPROFILE ".bun\bin\gbrain.exe"
  if (Test-Path $globalExe) {
    & $globalExe @GBrainArgs
  } else {
    & bun run src\cli.ts @GBrainArgs
  }
  exit $LASTEXITCODE
} finally {
  Pop-Location
}
