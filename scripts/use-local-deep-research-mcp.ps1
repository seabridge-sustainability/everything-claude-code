param(
  [switch]$Configure,
  [string]$ClaudeConfigPath = "C:\Users\adelm\.claude\settings.json"
)

$ErrorActionPreference = "Stop"

$Ecc = "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
$Venv = Join-Path $Ecc ".venvs\local-deep-research"
$VenvLdrMcp = Join-Path $Venv "Scripts\ldr-mcp.exe"
$Command = $null

if (Test-Path $VenvLdrMcp) {
  $Command = $VenvLdrMcp
} else {
  $pathCommand = Get-Command "ldr-mcp" -ErrorAction SilentlyContinue
  if ($pathCommand) { $Command = $pathCommand.Source }
}

if (!$Command) {
  throw "ldr-mcp is not available. Install centrally first: $Venv\Scripts\python.exe -m pip install `"local-deep-research[mcp]`""
}

Write-Host "ldr-mcp command: $Command"
Write-Host "Transport: STDIO only"
Write-Host "LLM provider: ollama"
Write-Host "Ollama URL: http://localhost:11434"
Write-Host "Model: gemma4:latest"

if (!$Configure) {
  Write-Host "Dry run only. Re-run with -Configure to update Claude Code MCP config with a timestamped backup."
  exit 0
}

if (!(Test-Path $ClaudeConfigPath)) {
  New-Item -ItemType File -Force -Path $ClaudeConfigPath | Out-Null
  Set-Content -Path $ClaudeConfigPath -Value "{}" -Encoding UTF8
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = "$ClaudeConfigPath.local-deep-research.$timestamp.bak"
Copy-Item -LiteralPath $ClaudeConfigPath -Destination $backup

$jsonText = Get-Content -LiteralPath $ClaudeConfigPath -Raw
if ([string]::IsNullOrWhiteSpace($jsonText)) { $jsonText = "{}" }
$config = $jsonText | ConvertFrom-Json

$hasMcpServers = $config.PSObject.Properties.Name -contains "mcpServers"
if (!$hasMcpServers) {
  $config | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value ([pscustomobject]@{})
} elseif ($null -eq $config.mcpServers) {
  $config.mcpServers = [pscustomobject]@{}
}

$server = [pscustomobject]@{
  command = $Command
  env = [pscustomobject]@{
    LDR_LLM_PROVIDER = "ollama"
    LDR_LLM_OLLAMA_URL = "http://localhost:11434"
    LDR_LLM_MODEL = "gemma4:latest"
  }
}

$hasLocalDeepResearch = $config.mcpServers.PSObject.Properties.Name -contains "local-deep-research"
if ($hasLocalDeepResearch) {
  $config.mcpServers."local-deep-research" = $server
} else {
  $config.mcpServers | Add-Member -MemberType NoteProperty -Name "local-deep-research" -Value $server
}

$config | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $ClaudeConfigPath -Encoding UTF8

Write-Host "Updated: $ClaudeConfigPath"
Write-Host "Backup: $backup"
Write-Host "No secrets were written. MCP remains local STDIO."
