#!/usr/bin/env pwsh
# check-mcp-security.ps1 - Read-only MCP and agent config safety checks.
# Does not print secret values. Does not modify files.

param(
  [string[]]$Paths = @(
    "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
    "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
    "C:\Users\adelm\SeaBridgeAI\manageesg-frontend",
    "C:\Users\adelm\SeaBridgeAI\openseabri",
    "C:\Users\adelm\SeaBridgeAI\_upstream",
    "C:\Users\adelm\SeaBridgeAI\autoresearch"
  ),
  [switch]$FailOnHigh,
  [switch]$IncludeTemplates
)

$ErrorActionPreference = "SilentlyContinue"
$HighCount = 0
$WarnCount = 0

function Section($msg) { Write-Host "`n=== $msg ===" -ForegroundColor White }
function Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow; $script:WarnCount++ }
function High($msg) { Write-Host "[HIGH] $msg" -ForegroundColor Red; $script:HighCount++ }
function MaskPath($Path) { return $Path }

$targetNames = @(
  ".mcp.json", "mcp.json", "mcp-servers.json", "mcp_agent.config.yaml",
  "settings.json", "settings.local.json", "opencode.json", "opencode.jsonc",
  "hooks.json", "AGENTS.md", "AGENTS_SYSTEM.md", "CLAUDE.md", "GEMINI.md",
  "CODEX.md", "OPENCODE.md"
)

$highPatterns = @(
  @{ Name = "dangerous permission bypass"; Pattern = "(?i)dangerously-skip-permissions|--yolo|permission-skipping|skip permissions" },
  @{ Name = "wildcard Bash permission"; Pattern = "Bash\(\*\)" },
  @{ Name = "auto-approved MCP/tool calls"; Pattern = "(?i)autoApprove" },
  @{ Name = "remote script execution"; Pattern = "(?i)(curl|wget).{0,80}(\|\s*(bash|sh|pwsh|powershell))" },
  @{ Name = "global install command in hook/config"; Pattern = "(?i)(npm|pnpm|yarn|pip|uv|cargo|gem)\s+(install|add).{0,80}(-g|global)" },
  @{ Name = "privileged Docker"; Pattern = "(?i)docker\s+run.{0,80}(--privileged|--pid=host|--network=host|-v\s*/:/)" },
  @{ Name = "destructive shell command"; Pattern = "(?i)rm\s+-rf|git\s+reset\s+--hard|git\s+push\s+--force|drop\s+database|delete\s+bucket" }
)

$warnPatterns = @(
  @{ Name = "npx auto-install"; Pattern = "(?i)npx\s+-y|npx\s+--yes" },
  @{ Name = "remote MCP transport"; Pattern = "(?i)https?://|sse|streamable" },
  @{ Name = "database MCP/config reference"; Pattern = "(?i)postgres|mongodb|mysql|redis|falkor|database" },
  @{ Name = "browser automation config"; Pattern = "(?i)playwright|browser|chrome|puppeteer" },
  @{ Name = "filesystem access config"; Pattern = "(?i)filesystem|file-system|fs-server" },
  @{ Name = "prompt-injection phrase"; Pattern = "(?i)ignore previous instructions|you are now|developer mode|reveal system prompt" }
)

foreach ($root in $Paths) {
  if (-not (Test-Path $root)) {
    Warn "Path missing: $root"
    continue
  }

  Section $root
  $files = Get-ChildItem -LiteralPath $root -Recurse -File -Force |
    Where-Object {
      $_.FullName -notmatch "\\(node_modules|\.git|dist|build|\.next|graphify-out|venv|\.venv|venv312|venv312_backup|site-packages|__pycache__)\\" -and
      ($IncludeTemplates -or $_.FullName -notmatch "\\(external|vendor|references|examples|example|samples|sample|demo|demos|tutorial|tutorials|guide|guides|cookbook|playground|docs[\\/](ja-JP|ko-KR|pt-BR|tr|zh-CN|zh-TW)|\.claude[\\/]skills)\\") -and
      ($targetNames -contains $_.Name)
    }

  Info "Config/instruction files inspected: $($files.Count)"

  foreach ($file in $files) {
    $content = Get-Content -LiteralPath $file.FullName -Raw
    foreach ($rule in $highPatterns) {
      $matched = $false
      foreach ($line in ($content -split "`r?`n")) {
        if ($line -match $rule.Pattern) {
          if ($line -match "(?i)do not|never|requires explicit approval|require explicit approval|without explicit approval|disabled by default|not authorized|no global install|no destructive") {
            continue
          }
          $matched = $true
          break
        }
      }
      if ($matched) {
        High "$($rule.Name): $(MaskPath $file.FullName)"
      }
    }
    foreach ($rule in $warnPatterns) {
      if ($content -match $rule.Pattern) {
        Warn "$($rule.Name): $(MaskPath $file.FullName)"
      }
    }
  }
}

Section "Summary"
Info "High findings: $HighCount"
Info "Warnings: $WarnCount"
Info "No secret values were printed."

if ($FailOnHigh -and $HighCount -gt 0) {
  exit 1
}
exit 0
