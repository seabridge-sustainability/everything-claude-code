param(
  [string]$EccPath = "",
  [string]$MattPocockSnapshotPath = "",
  [switch]$SkipRepoPointers
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($EccPath)) {
  $EccPath = Split-Path -Parent $PSScriptRoot
}
if ([string]::IsNullOrWhiteSpace($MattPocockSnapshotPath)) {
  $MattPocockSnapshotPath = Join-Path $EccPath "references\matt-pocock-skills"
}
$EccPath = [IO.Path]::GetFullPath($EccPath)
$MattPocockSnapshotPath = [IO.Path]::GetFullPath($MattPocockSnapshotPath)

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
  $normalizedSource = $wrapper.source -replace '\\', '/'
  $sourceMarker = '/references/matt-pocock-skills/'
  $markerIndex = $normalizedSource.IndexOf($sourceMarker, [System.StringComparison]::OrdinalIgnoreCase)
  if ($markerIndex -lt 0) {
    throw "Source is outside the canonical snapshot: $($wrapper.source)"
  }
  $relativeSource = $normalizedSource.Substring($markerIndex + $sourceMarker.Length) -replace '/', [IO.Path]::DirectorySeparatorChar
  $sourcePath = Join-Path $MattPocockSnapshotPath $relativeSource
  if (-not (Test-Path $sourcePath)) {
    throw "Source missing: $($wrapper.source)"
  }
}

if (-not $SkipRepoPointers) {
  $workspaceRoot = Split-Path -Parent $EccPath
  $deprecatedRepoPointers = @(
    (Join-Path $workspaceRoot "manageesg-backend\AGENT_SKILLS.md"),
    (Join-Path $workspaceRoot "manageesg-frontend\AGENT_SKILLS.md"),
    (Join-Path $workspaceRoot "openseabri\AGENT_SKILLS.md"),
    (Join-Path $workspaceRoot "_upstream\AGENT_SKILLS.md"),
    (Join-Path $workspaceRoot "autoresearch\AGENT_SKILLS.md")
  )
  foreach ($path in $deprecatedRepoPointers) {
    if (Test-Path $path) {
      throw "Deprecated repo-local skill pointer should be removed: $path"
    }
  }
}

Write-Host "[skills] Canonical ECC skills validation PASS"
