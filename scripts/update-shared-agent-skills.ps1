param(
  [string]$SharedSkillsPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills",
  [switch]$Pull
)

$ErrorActionPreference = "Stop"

$canonical = Join-Path $PSScriptRoot "update-canonical-skills.ps1"
if (-not (Test-Path -LiteralPath $canonical)) {
  throw "Canonical ECC skills update helper is missing: $canonical"
}

Write-Warning "This compatibility wrapper is retained only for older local hooks. Prefer scripts\update-canonical-skills.ps1."

& $canonical -MattPocockSnapshotPath $SharedSkillsPath -Pull:$Pull
