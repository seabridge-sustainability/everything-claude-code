param(
  [switch]$Json
)

$ErrorActionPreference = "SilentlyContinue"

$Root = "C:\Users\adelm\SeaBridgeAI"
$Ecc = Join-Path $Root "everything-claude-code"
$Clone = Join-Path $Ecc "external\local-deep-research"
$Venv = Join-Path $Ecc ".venvs\local-deep-research"
$TargetRepos = @(
  "manageesg-backend",
  "manageesg-frontend",
  "openseabri",
  "_upstream",
  "autoresearch"
)

function Test-Command($Name) {
  $cmd = Get-Command $Name -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  return $null
}

function Test-Url($Url) {
  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3
    return [ordered]@{ ok = $true; status = [int]$response.StatusCode; error = $null }
  } catch {
    return [ordered]@{ ok = $false; status = $null; error = $_.Exception.Message }
  }
}

function Test-Port($Port) {
  $listeners = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  return [bool]$listeners
}

function Get-GitInfo($Path) {
  if (!(Test-Path (Join-Path $Path ".git"))) {
    return [ordered]@{ exists = $false; remote = $null; branch = $null; commit = $null; dirty = $null; status = @() }
  }

  $status = @(git -C $Path status --short 2>$null)
  return [ordered]@{
    exists = $true
    remote = (git -C $Path remote -v 2>$null | Select-Object -First 1)
    branch = (git -C $Path branch --show-current 2>$null)
    commit = (git -C $Path log -1 --oneline 2>$null)
    dirty = ($status.Count -gt 0)
    status = $status
  }
}

$python = Test-Command "python"
$pip = Test-Command "pip"
$docker = Test-Command "docker"
$ollama = Test-Command "ollama"
$ldrMcpPath = Test-Command "ldr-mcp"
$venvPython = Join-Path $Venv "Scripts\python.exe"
$venvLdrMcp = Join-Path $Venv "Scripts\ldr-mcp.exe"

$pipShowGlobal = $null
if ($python) {
  $pipShowGlobal = (& python -m pip show local-deep-research 2>$null | Select-String "^Version:\s*(.+)$").Matches.Groups[1].Value
}

$pipShowVenv = $null
if (Test-Path $venvPython) {
  $pipShowVenv = (& $venvPython -m pip show local-deep-research 2>$null | Select-String "^Version:\s*(.+)$").Matches.Groups[1].Value
}

$mcpConfigCandidates = @(
  "C:\Users\adelm\.claude\settings.json",
  "C:\Users\adelm\.claude\server.json",
  "C:\Users\adelm\.config\claude\mcp.json"
)

$mcpMatches = @()
foreach ($candidate in $mcpConfigCandidates) {
  if (Test-Path $candidate) {
    $content = Get-Content $candidate -Raw
    if ($content -match "local-deep-research|ldr-mcp") {
      $mcpMatches += $candidate
    }
  }
}

$targets = @()
foreach ($repo in $TargetRepos) {
  $path = Join-Path $Root $repo
  $targets += [ordered]@{ name = $repo; path = $path; exists = (Test-Path $path) }
}

$result = [ordered]@{
  central_clone = [ordered]@{
    path = $Clone
    exists = (Test-Path $Clone)
    git = Get-GitInfo $Clone
  }
  docker = [ordered]@{
    command = $docker
    available = [bool]$docker
    ps_works = $false
    error = $null
  }
  python = [ordered]@{
    command = $python
    pip = $pip
    package_global_version = $pipShowGlobal
    venv = $Venv
    venv_python = (Test-Path $venvPython)
    package_venv_version = $pipShowVenv
  }
  mcp = [ordered]@{
    ldr_mcp_on_path = $ldrMcpPath
    ldr_mcp_in_venv = (Test-Path $venvLdrMcp)
    config_matches = $mcpMatches
  }
  services = [ordered]@{
    ollama = [ordered]@{ command = $ollama; port_11434_listening = Test-Port 11434; health = Test-Url "http://localhost:11434" }
    searxng = [ordered]@{ port_8080_listening = Test-Port 8080; health = Test-Url "http://localhost:8080" }
    local_deep_research = [ordered]@{ port_5000_listening = Test-Port 5000; health = Test-Url "http://localhost:5000" }
  }
  targets = $targets
}

if ($docker) {
  $dockerOutput = docker ps --format "{{.ID}}" 2>&1
  if ($LASTEXITCODE -eq 0) {
    $result.docker.ps_works = $true
  } else {
    $result.docker.error = ($dockerOutput | Out-String).Trim()
  }
}

if ($Json) {
  $result | ConvertTo-Json -Depth 8
} else {
  Write-Host "Local Deep Research central clone: $($result.central_clone.exists) $Clone"
  Write-Host "Git: $($result.central_clone.git.branch) $($result.central_clone.git.commit)"
  Write-Host "Docker command: $($result.docker.command)"
  Write-Host "Docker usable: $($result.docker.ps_works)"
  Write-Host "Venv package version: $($result.python.package_venv_version)"
  Write-Host "ldr-mcp on PATH: $($result.mcp.ldr_mcp_on_path)"
  Write-Host "ldr-mcp in venv: $($result.mcp.ldr_mcp_in_venv)"
  Write-Host "Ollama: $($result.services.ollama.health.ok) http://localhost:11434"
  Write-Host "SearXNG: $($result.services.searxng.health.ok) http://localhost:8080"
  Write-Host "Local Deep Research: $($result.services.local_deep_research.health.ok) http://localhost:5000"
  Write-Host "MCP config matches: $($result.mcp.config_matches -join ', ')"
  Write-Host "Target repos:"
  foreach ($target in $result.targets) {
    Write-Host "  - $($target.name): $($target.exists) $($target.path)"
  }
}
