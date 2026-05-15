param(
  [Parameter(Mandatory = $true, Position = 0)]
  [ValidateSet("check", "doctor", "skillpack", "resolvable", "sources", "mcp", "index-plan", "index-apply")]
  [string]$Action,

  [string[]]$Repos = @(
    "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
    "C:\Users\adelm\SeaBridgeAI\openseabri",
    "C:\Users\adelm\SeaBridgeAI\SeaBridgeAI",
    "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
  )
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$gbrain = Join-Path $scriptRoot "gbrain.ps1"
if (-not (Test-Path -LiteralPath $gbrain)) {
  throw "GBrain wrapper not found: $gbrain"
}

function Invoke-GBrain {
  param([string[]]$Arguments)
  & $gbrain @Arguments
  $script:LastGBrainExit = $LASTEXITCODE
}

function Get-RepoId {
  param([string]$Path)
  $name = Split-Path -Leaf $Path
  if ([string]::IsNullOrWhiteSpace($name)) {
    $name = (Resolve-Path -LiteralPath $Path).Path.Split([IO.Path]::DirectorySeparatorChar)[-1]
  }
  return ($name -replace '[^A-Za-z0-9_-]', '-').ToLowerInvariant()
}

function Test-McpFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    [pscustomobject]@{ path = $Path; exists = $false; validJson = $false; hasGbrain = $false }
    return
  }
  try {
    $json = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
    $servers = $json.mcpServers
    $hasGbrain = $false
    if ($null -ne $servers) {
      $hasGbrain = [bool]($servers.PSObject.Properties.Name -contains "gbrain")
    }
    [pscustomobject]@{ path = $Path; exists = $true; validJson = $true; hasGbrain = $hasGbrain }
  } catch {
    [pscustomobject]@{ path = $Path; exists = $true; validJson = $false; hasGbrain = $false }
  }
}

switch ($Action) {
  "check" {
    $cmd = Get-Command gbrain -ErrorAction SilentlyContinue
    [pscustomobject]@{
      gbrainOnPath = [bool]$cmd
      gbrainPath = if ($cmd) { $cmd.Source } else { $null }
      eccWrapper = $gbrain
      gbrainReference = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\gbrain"
      upstreamMirror = "C:\Users\adelm\SeaBridgeAI\_upstream\gbrain"
    } | ConvertTo-Json -Depth 3
    Invoke-GBrain @("--version")
    exit $script:LastGBrainExit
  }
  "doctor" {
    Invoke-GBrain @("doctor", "--json")
    exit $script:LastGBrainExit
  }
  "skillpack" {
    Invoke-GBrain @("skillpack-check", "--quiet")
    exit $script:LastGBrainExit
  }
  "resolvable" {
    Invoke-GBrain @("check-resolvable")
    exit $script:LastGBrainExit
  }
  "sources" {
    Invoke-GBrain @("sources", "list")
    exit $script:LastGBrainExit
  }
  "mcp" {
    $files = @(
      "C:\Users\adelm\SeaBridgeAI\manageesg-backend\.mcp.json",
      "C:\Users\adelm\SeaBridgeAI\manageesg-backend\seabridge_ai\src\sustainability_ai\ai_mcp\servers_config.json",
      "C:\Users\adelm\SeaBridgeAI\openseabri\.mcp.json",
      "C:\Users\adelm\SeaBridgeAI\everything-claude-code\.mcp.json",
      "C:\Users\adelm\SeaBridgeAI\everything-claude-code\mcp-configs\mcp-servers.json"
    )
    $files | ForEach-Object { Test-McpFile $_ } | ConvertTo-Json -Depth 3
  }
  "index-plan" {
    foreach ($repo in $Repos) {
      if (-not (Test-Path -LiteralPath $repo)) {
        Write-Output "# missing: $repo"
        continue
      }
      $id = Get-RepoId $repo
      Write-Output "C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 sources add $id --path `"$repo`" --name $id --no-federated"
      if (Test-Path -LiteralPath (Join-Path $repo ".git")) {
        Write-Output "C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 sync --source $id --strategy code --full --no-pull --no-embed --skip-failed"
      } else {
        Write-Output "# non-git path: import markdown instead of code sync"
        Write-Output "C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 import `"$repo`" --no-embed"
      }
    }
  }
  "index-apply" {
    Write-Error "index-apply is intentionally disabled in this wrapper. Run index-plan, review the target paths, initialize/configure the brain explicitly, then execute the printed commands yourself." -ErrorAction Continue
    exit 2
  }
}
