param(
  [string]$MattPocockSnapshotPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills",
  [switch]$Pull
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $MattPocockSnapshotPath)) {
  throw "Vendored Matt Pocock skills snapshot is missing: $MattPocockSnapshotPath"
}

if (Test-Path (Join-Path $MattPocockSnapshotPath ".git")) {
  throw "Canonical skills snapshot must be an ECC-vendored snapshot, not a standalone git checkout: $MattPocockSnapshotPath"
}

if ($Pull) {
  throw "Pull is disabled for the vendored ECC snapshot. Update through everything-claude-code review and commit flow."
}

Write-Host "[skills] Path: $MattPocockSnapshotPath"
Write-Host "[skills] Mode: ECC-vendored snapshot"
Write-Host "[skills] Registry: C:\Users\adelm\SeaBridgeAI\everything-claude-code\manifests\agent-skills\matt-pocock-skills.json"
