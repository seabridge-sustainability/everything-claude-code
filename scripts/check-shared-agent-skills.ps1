param(
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [string]$SharedSkillsPath = "C:\Users\adelm\SeaBridgeAI\shared-agent-skills",
  [switch]$SkipRepoPointers
)

$ErrorActionPreference = "Stop"

$required = @(
  "$SharedSkillsPath\skills\productivity\grill-me\SKILL.md",
  "$SharedSkillsPath\skills\deprecated\ubiquitous-language\SKILL.md",
  "$SharedSkillsPath\skills\engineering\improve-codebase-architecture\SKILL.md",
  "$EccPath\AGENT_SKILLS.md",
  "$EccPath\AGENT.md",
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
  Write-Error ("Missing shared agent skill files:`n" + ($missing -join "`n"))
}

$registry = Get-Content -Raw -Path "$EccPath\manifests\agent-skills\matt-pocock-skills.json" | ConvertFrom-Json
foreach ($wrapper in $registry.active_wrappers) {
  $wrapperPath = Join-Path $EccPath ".agents\skills\$($wrapper.name)\SKILL.md"
  if (-not (Test-Path $wrapperPath)) {
    throw "Wrapper missing: $($wrapper.wrapper)"
  }
  $relativeSource = ($wrapper.source -replace [regex]::Escape("C:\Users\adelm\SeaBridgeAI\shared-agent-skills\"), "")
  if ($relativeSource -eq $wrapper.source) {
    $relativeSource = ($wrapper.source -replace [regex]::Escape("C:\Users\adelm\SeaBridgeAI\shared-agent-skills"), "").TrimStart('\')
  }
  $sourcePath = Join-Path $SharedSkillsPath $relativeSource
  if (-not (Test-Path $sourcePath)) {
    throw "Source missing: $($wrapper.source)"
  }
}

$repoPointers = @(
  "C:\Users\adelm\SeaBridgeAI\manageesg-backend\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\manageesg-frontend\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\openseabri\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\_upstream\AGENT_SKILLS.md",
  "C:\Users\adelm\SeaBridgeAI\autoresearch\AGENT_SKILLS.md"
)

if (-not $SkipRepoPointers) {
  foreach ($path in $repoPointers) {
    if (-not (Test-Path $path)) {
      throw "Repo pointer missing: $path"
    }
    $content = Get-Content -Raw -LiteralPath $path
    if ($content -notmatch "SEABRIDGE_AGENT_SYSTEM_V1" -or $content -notmatch "AGENT_SKILLS.md") {
      throw "Repo pointer does not reference central skills contract: $path"
    }
  }
}

Write-Host "[skills] Shared agent skills validation PASS"
