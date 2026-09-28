param(
  [string[]]$RepoPaths = @(),
  [switch]$FailOnFinding
)

$ErrorActionPreference = "Stop"
$findings = New-Object System.Collections.Generic.List[object]
$central = Split-Path -Parent $PSScriptRoot
$workspace = Split-Path -Parent $central

if ($RepoPaths.Count -eq 0) {
  $RepoPaths = @(
    $central,
    (Join-Path $workspace "manageesg-backend"),
    (Join-Path $workspace "manageesg-frontend"),
    (Join-Path $workspace "openseabri"),
    (Join-Path $workspace "climada-stack"),
    (Join-Path $workspace "autoresearch"),
    (Join-Path $workspace ".falkordb-data"),
    (Join-Path $workspace "_upstream"),
    (Join-Path $workspace "SeaBridgeAI")
  )
}

function Add-Finding($Rule, $Severity, $File, $Line, $Message) {
  $findings.Add([pscustomobject]@{
    rule = $Rule
    severity = $Severity
    file = $File
    line = $Line
    message = $Message
  })
}

foreach ($repo in $RepoPaths) {
  if (-not (Test-Path $repo)) {
    Add-Finding "agent.repo-missing" "medium" $repo 0 "Configured repo path is missing."
    continue
  }
  $agentFiles = Get-ChildItem -Path $repo -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -in @("AGENTS.md","CLAUDE.md","AGENTS_SYSTEM.md","CODEX.md","GEMINI.md","OPENCODE.md","AGENT_SKILLS.md") }
  foreach ($file in $agentFiles) {
    $content = Get-Content -Raw -LiteralPath $file.FullName
    if ($content -notmatch 'SEABRIDGE_AGENT_SYSTEM_V1') {
      Add-Finding "agent.system-id" "medium" $file.FullName 1 "Agent instruction file missing SYSTEM_ID."
    }
    if ($content -match '(?i)yolo|dangerous|autonomous|auto-commit|auto-push|git push|global install|npm install -g' -and $content -notmatch '(?is)without explicit approval|requires explicit approval|not authorized|do not|no .{0,300}authorized') {
      Add-Finding "agent.unsafe-permission-language" "medium" $file.FullName 1 "Potential unsafe execution language without nearby approval gate."
    }
  }
}

if (Test-Path "$central\scripts\check-canonical-skills.ps1") {
  & "$central\scripts\check-canonical-skills.ps1" `
    -EccPath $central `
    -MattPocockSnapshotPath "$central\references\matt-pocock-skills" | Out-Host
}

$findings | ConvertTo-Json -Depth 4

if ($findings.Count -gt 0 -and $FailOnFinding) {
  exit 1
}
