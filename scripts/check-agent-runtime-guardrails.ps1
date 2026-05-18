param(
  [string[]]$RepoPaths = @(
    "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
    "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
    "C:\Users\adelm\SeaBridgeAI\manageesg-frontend",
    "C:\Users\adelm\SeaBridgeAI\openseabri",
    "C:\Users\adelm\SeaBridgeAI\climada-stack",
    "C:\Users\adelm\SeaBridgeAI\autoresearch",
    "C:\Users\adelm\SeaBridgeAI\.falkordb-data",
    "C:\Users\adelm\SeaBridgeAI\_upstream",
    "C:\Users\adelm\SeaBridgeAI\SeaBridgeAI"
  ),
  [switch]$FailOnFinding
)

$ErrorActionPreference = "Stop"
$findings = New-Object System.Collections.Generic.List[object]

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

$central = "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
if (Test-Path "$central\scripts\check-canonical-skills.ps1") {
  & "$central\scripts\check-canonical-skills.ps1" `
    -MattPocockSnapshotPath "$central\references\matt-pocock-skills" | Out-Host
}

$findings | ConvertTo-Json -Depth 4

if ($findings.Count -gt 0 -and $FailOnFinding) {
  exit 1
}
