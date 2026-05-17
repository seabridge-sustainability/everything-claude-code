param(
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [string]$SharedSkillsPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills",
  [switch]$SkipRepoPointers
)

$ErrorActionPreference = "Stop"

$canonical = Join-Path $PSScriptRoot "check-canonical-skills.ps1"
if (-not (Test-Path -LiteralPath $canonical)) {
  throw "Canonical ECC skills check is missing: $canonical"
}

Write-Warning "This compatibility wrapper is retained only for older local hooks. Prefer scripts\check-canonical-skills.ps1."

& $canonical -EccPath $EccPath -MattPocockSnapshotPath $SharedSkillsPath -SkipRepoPointers:$SkipRepoPointers
