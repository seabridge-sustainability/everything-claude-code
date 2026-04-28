param(
    [string]$ProjectPath = (Resolve-Path "$PSScriptRoot\..").Path
)

$ErrorActionPreference = "Stop"

$backendEnv = "C:\Users\adelm\SeaBridgeAI\manageesg-backend\.env"
if (-not $env:NVIDIA_API_KEY -and (Test-Path -LiteralPath $backendEnv)) {
    $line = Get-Content -LiteralPath $backendEnv |
        Where-Object { $_ -match '^NVIDIA_API_KEY\s*=\s*.+' } |
        Select-Object -First 1

    if ($line) {
        $env:NVIDIA_API_KEY = ($line -split '=', 2)[1].Trim().Trim('"').Trim("'")
    }
}

if (-not $env:NVIDIA_API_KEY) {
    throw "NVIDIA_API_KEY is not set. Set it in this shell or in C:\Users\adelm\SeaBridgeAI\manageesg-backend\.env before launching OpenCode."
}

opencode $ProjectPath --model nvidia/deepseek-ai/deepseek-v4-pro
