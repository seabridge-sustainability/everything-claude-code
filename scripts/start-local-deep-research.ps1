param(
  [ValidateSet("auto", "docker", "pip")]
  [string]$Mode = "auto",
  [switch]$NoOllama,
  [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

$Ecc = "C:\Users\adelm\SeaBridgeAI\everything-claude-code"
$Clone = Join-Path $Ecc "external\local-deep-research"
$Venv = Join-Path $Ecc ".venvs\local-deep-research"
$VenvPython = Join-Path $Venv "Scripts\python.exe"
$VenvWeb = Join-Path $Venv "Scripts\ldr-web.exe"

function Test-Url($Url) {
  try {
    Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3 | Out-Null
    return $true
  } catch {
    return $false
  }
}

function Test-Docker {
  if (!(Get-Command docker -ErrorAction SilentlyContinue)) { return $false }
  docker ps --format "{{.ID}}" 2>&1 | Out-Null
  return ($LASTEXITCODE -eq 0)
}

if (!(Test-Path $Clone)) {
  throw "Central Local Deep Research clone not found at $Clone"
}

if (!$NoOllama -and !(Test-Url "http://localhost:11434")) {
  $ollama = Get-Command ollama -ErrorAction SilentlyContinue
  if ($ollama) {
    Start-Process -FilePath $ollama.Source -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 5
  } else {
    Write-Warning "Ollama is not installed or not on PATH. LDR can still use another explicitly configured provider."
  }
}

$selected = $Mode
if ($selected -eq "auto") {
  if (Test-Docker) { $selected = "docker" } else { $selected = "pip" }
}

if ($selected -eq "docker") {
  if (!(Test-Docker)) {
    throw "Docker is not available. Start Docker Desktop or use -Mode pip after the central venv install succeeds."
  }

  Push-Location $Clone
  try {
    docker compose up -d
  } finally {
    Pop-Location
  }
} else {
  if (!(Test-Path $VenvWeb)) {
    throw "pip mode needs $VenvWeb. Install with: $VenvPython -m pip install `"local-deep-research[mcp]`""
  }

  $envBlock = @{
    LDR_WEB_HOST = "127.0.0.1"
    LDR_WEB_PORT = "5000"
    LDR_LLM_PROVIDER = "ollama"
    LDR_LLM_OLLAMA_URL = "http://localhost:11434"
    LDR_LLM_MODEL = "gemma4:latest"
    LDR_SEARCH_ENGINE_WEB_SEARXNG_DEFAULT_PARAMS_INSTANCE_URL = "http://localhost:8080"
    LDR_SEARCH_TOOL = "searxng"
  }

  foreach ($key in $envBlock.Keys) {
    [Environment]::SetEnvironmentVariable($key, $envBlock[$key], "Process")
  }

  Start-Process -FilePath $VenvWeb -WindowStyle Hidden
}

Write-Host "Local Deep Research mode: $selected"
Write-Host "Web app: http://localhost:5000"
Write-Host "Ollama: http://localhost:11434"
Write-Host "SearXNG: http://localhost:8080 (Docker compose mode, or run separately)"
Write-Host "Network exposure: local-only wrapper; do not publish these ports publicly."

if (!$NoBrowser -and (Test-Url "http://localhost:5000")) {
  Start-Process "http://localhost:5000"
}
