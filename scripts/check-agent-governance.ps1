#!/usr/bin/env pwsh
# check-agent-governance.ps1 - SeaBridgeAI advisory agent-governance inventory.
# Read-only. No installs, no auto-fix, no commits, no pushes.

param(
  [switch]$WithAgentShield,
  [switch]$AllowNpxDownload,
  [switch]$FailOnHigh
)

$ErrorActionPreference = "Stop"
$Root = "C:\Users\adelm\SeaBridgeAI"
$ECCRoot = Join-Path $Root "everything-claude-code"
$Repos = @("everything-claude-code","manageesg-backend","manageesg-frontend","openseabri","_upstream","autoresearch")

function Section($msg) { Write-Host "`n=== $msg ===" -ForegroundColor White }
function Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Count-Files($Files, [scriptblock]$Predicate) { return @($Files | Where-Object $Predicate).Count }

Section "Agent Governance Inventory"
$rows = @()
foreach ($repo in $Repos) {
  $path = Join-Path $Root $repo
  if (-not (Test-Path $path)) {
    Warn "Missing repo path: $path"
    continue
  }
  $files = @(rg --files --hidden $path -g '!**/node_modules/**' -g '!**/.git/**' -g '!**/dist/**' -g '!**/build/**' -g '!**/.next/**' -g '!**/graphify-out/**' -g '!**/external/unsloth/**' -g '!**/unsloth/studio/frontend/**')
  $rows += [pscustomobject]@{
    Repo = $repo
    Workflows = Count-Files $files { $_ -match "\\.github[\\/](workflows)[\\/].+\.(yml|yaml)$" }
    MCPConfigs = Count-Files $files { (Split-Path $_ -Leaf) -in @(".mcp.json","mcp.json","mcp-servers.json","mcp_agent.config.yaml") }
    AgentDocs = Count-Files $files { (Split-Path $_ -Leaf) -in @("AGENTS.md","AGENTS_SYSTEM.md","CLAUDE.md","GEMINI.md","CODEX.md","OPENCODE.md") }
    HookManifests = Count-Files $files { (Split-Path $_ -Leaf) -eq "hooks.json" }
    ClaudeSettings = Count-Files $files { $_ -match "\\.claude[\\/](settings|settings\.local)\.json$" }
    OpenCodeConfigs = Count-Files $files { (Split-Path $_ -Leaf) -in @("opencode.json","opencode.jsonc") }
  }
}
$rows | Format-Table -AutoSize

Section "MCP And Agent Config Safety"
$mcpScript = Join-Path $ECCRoot "scripts\check-mcp-security.ps1"
& $mcpScript -FailOnHigh:$FailOnHigh
$mcpExit = $LASTEXITCODE

if ($WithAgentShield) {
  Section "Agent Shield Advisory Scan"
  $runner = Join-Path $ECCRoot "scripts\run-agentshield-local.ps1"
  foreach ($repo in $Repos) {
    $path = Join-Path $Root $repo
    if (Test-Path $path) {
      & $runner -Path $path -Format json -AllowNpxDownload:$AllowNpxDownload
    }
  }
} else {
  Section "Agent Shield Advisory Scan"
  Info "Skipped. Re-run with -WithAgentShield after approving local deps or -AllowNpxDownload."
}

if ($FailOnHigh -and $mcpExit -ne 0) {
  exit $mcpExit
}
exit 0
