<#
.SYNOPSIS
    Sets up GSD (Get Shit Done) integration for Claude Code.
.DESCRIPTION
    Creates a junction from ~/.claude/get-shit-done to this repo's
    .claude/get-shit-done/ directory, verifies the GSD SDK is available,
    and ensures .planning/ is in the project's .gitignore.
#>

param(
    [switch]$Force
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$repoRoot\.claude\get-shit-done")) {
    $repoRoot = Split-Path -Parent $PSScriptRoot
}
$gsdSource = Join-Path $repoRoot ".claude\get-shit-done"
$gsdTarget = Join-Path $env:USERPROFILE ".claude\get-shit-done"

if (-not (Test-Path $gsdSource)) {
    Write-Error "GSD source not found at $gsdSource"
    exit 1
}

# Create junction
if (Test-Path $gsdTarget) {
    $item = Get-Item $gsdTarget
    if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        if ($Force) {
            Remove-Item $gsdTarget -Force
            Write-Host "Removed existing junction at $gsdTarget"
        } else {
            Write-Host "Junction already exists at $gsdTarget (use -Force to recreate)"
            $existing = (Get-Item $gsdTarget).Target
            Write-Host "  -> $existing"
        }
    } elseif ($Force) {
        Remove-Item $gsdTarget -Recurse -Force
        Write-Host "Removed existing directory at $gsdTarget"
    } else {
        Write-Error "$gsdTarget exists and is not a junction. Use -Force to replace."
        exit 1
    }
}

if (-not (Test-Path $gsdTarget)) {
    New-Item -ItemType Junction -Path $gsdTarget -Target $gsdSource | Out-Null
    Write-Host "Created junction: $gsdTarget -> $gsdSource"
}

# Verify SDK
try {
    $sdkVersion = & npx --yes gsd-sdk --version 2>$null
    Write-Host "GSD SDK version: $sdkVersion"
} catch {
    Write-Warning "gsd-sdk not found. Run 'npm install' in the ECC repo to install @gsd-build/sdk."
}

# Ensure .planning/ in .gitignore of current project
$gitignore = Join-Path (Get-Location) ".gitignore"
if (Test-Path $gitignore) {
    $content = Get-Content $gitignore -Raw
    if ($content -notmatch "\.planning/") {
        Add-Content $gitignore "`n.planning/"
        Write-Host "Added .planning/ to $gitignore"
    } else {
        Write-Host ".planning/ already in $gitignore"
    }
} else {
    Write-Host "No .gitignore found in current directory — skipping .planning/ addition"
}

Write-Host "`nGSD setup complete. Commands available as /gsd-<name> in Claude Code."
