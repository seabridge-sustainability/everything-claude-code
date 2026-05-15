param(
  [string]$SharedSkillsPath = "C:\Users\adelm\SeaBridgeAI\shared-agent-skills",
  [switch]$Pull
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $SharedSkillsPath)) {
  Write-Host "[skills] Cloning mattpocock/skills to $SharedSkillsPath"
  git clone https://github.com/mattpocock/skills $SharedSkillsPath
}

if (-not (Test-Path (Join-Path $SharedSkillsPath ".git"))) {
  throw "Shared skills path is not a git checkout: $SharedSkillsPath"
}

$status = git -C $SharedSkillsPath status --short
if ($status) {
  Write-Warning "Shared skills checkout has local changes. Preserving them; not pulling."
  $status
} elseif ($Pull) {
  Write-Host "[skills] Pulling upstream with --ff-only"
  git -C $SharedSkillsPath pull --ff-only
}

$commit = git -C $SharedSkillsPath rev-parse HEAD
Write-Host "[skills] Path: $SharedSkillsPath"
Write-Host "[skills] Commit: $commit"
Write-Host "[skills] Registry: C:\Users\adelm\SeaBridgeAI\everything-claude-code\manifests\agent-skills\matt-pocock-skills.json"
