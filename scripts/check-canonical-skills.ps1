param(
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [string]$MattPocockSnapshotPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills",
  [switch]$SkipRepoPointers
)

$ErrorActionPreference = "Stop"

$required = @(
  "$MattPocockSnapshotPath\skills\productivity\grill-me\SKILL.md",
  "$MattPocockSnapshotPath\skills\deprecated\ubiquitous-language\SKILL.md",
  "$MattPocockSnapshotPath\skills\engineering\improve-codebase-architecture\SKILL.md",
  "$EccPath\AGENT_SKILLS.md",
  "$EccPath\.agents\skills\grill-me\SKILL.md",
  "$EccPath\.agents\skills\ubiquitous-language\SKILL.md",
  "$EccPath\.agents\skills\improve-codebase-architecture\SKILL.md",
  "$EccPath\manifests\agent-skills\matt-pocock-skills.json",
  "$EccPath\docs\agent-skills\MATT_POCOCK_SKILLS_INTEGRATION.md"
)

$missing = @()
foreach ($path in $required) {
  if (-not (Test-Path $path)) {
    $missing += $path
  }
}

if ($missing.Count -gt 0) {
  Write-Error ("Missing canonical skill files:`n" + ($missing -join "`n"))
}

$registry = Get-Content -Raw -Path "$EccPath\manifests\agent-skills\matt-pocock-skills.json" | ConvertFrom-Json
foreach ($wrapper in $registry.active_wrappers) {
  $wrapperPath = Join-Path $EccPath ".agents\skills\$($wrapper.name)\SKILL.md"
  if (-not (Test-Path $wrapperPath)) {
    throw "Wrapper missing: $($wrapper.wrapper)"
  }
  $relativeSource = ($wrapper.source -replace [regex]::Escape("C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills\"), "")
  if ($relativeSource -eq $wrapper.source) {
    $relativeSource = ($wrapper.source -replace [regex]::Escape("C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills"), "").TrimStart('\')
  }
  $sourcePath = Join-Path $MattPocockSnapshotPath $relativeSource
  if (-not (Test-Path $sourcePath)) {
    throw "Source missing: $($wrapper.source)"
  }
}

$deprecatedRepoPointers = @(
  "C:\Users\adelm\SeaBridgeAI\manageesg-backend\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\manageesg-frontend\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\openseabri\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\_upstream\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\autoresearch\AGENT_SKILLS.md"
)

if (-not $SkipRepoPointers) {
  foreach ($path in $deprecatedRepoPointers) {
    if (Test-Path $path) {
      throw "Deprecated repo-local skill pointer should be removed: $path"
    }
  }
}

Write-Host "[skills] Canonical ECC skills validation PASS"
