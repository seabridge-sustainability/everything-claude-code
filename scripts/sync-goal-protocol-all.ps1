param(
    [switch]$DryRun,
    [switch]$Apply,
    [switch]$Backup,
    [switch]$IncludeOptionalAgentFiles,
    [switch]$IncludeAutoLoop,
    [switch]$IncludeAntiStuckRules,
    [switch]$IncludeCompletionEvidence
)

$ErrorActionPreference = "Stop"

if (-not $DryRun -and -not $Apply) {
    throw "Choose -DryRun or -Apply."
}

if ($DryRun -and $Apply) {
    throw "Use only one of -DryRun or -Apply."
}

$scriptPath = Join-Path $PSScriptRoot "sync-goal-protocol.ps1"
$repos = @(
    "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
    "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
    "C:\Users\adelm\SeaBridgeAI\manageesg-frontend",
    "C:\Users\adelm\SeaBridgeAI\openseabri",
    "C:\Users\adelm\SeaBridgeAI\climada-stack",
    "C:\Users\adelm\SeaBridgeAI\autoresearch",
    "C:\Users\adelm\SeaBridgeAI\_upstream"
)

foreach ($repo in $repos) {
    if (-not (Test-Path -LiteralPath $repo -PathType Container)) {
        Write-Warning "Skipping missing repo: $repo"
        continue
    }

    Write-Output "=== $repo"
    $args = @("-ExecutionPolicy", "Bypass", "-File", $scriptPath, "-TargetRepo", $repo)
    if ($DryRun) { $args += "-DryRun" }
    if ($Backup) { $args += "-Backup" }
    if ($IncludeOptionalAgentFiles) { $args += "-IncludeOptionalAgentFiles" }
    if ($IncludeAutoLoop) { $args += "-IncludeAutoLoop" }
    if ($IncludeAntiStuckRules) { $args += "-IncludeAntiStuckRules" }
    if ($IncludeCompletionEvidence) { $args += "-IncludeCompletionEvidence" }
    & powershell @args
}
