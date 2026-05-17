#!/usr/bin/env pwsh
<#
.SYNOPSIS
Cross-repo rollout helper for SeaBridgeAI curated Spec Kit skills.

.DESCRIPTION
Discovers applicable coding-agent surfaces in each SeaBridgeAI repo and invokes
sync-speckit-skills.ps1 for each one. This script is dry-run by default. Pass
-Apply to write files. Existing files are skipped unless -Force is passed to the
underlying sync.
#>

[CmdletBinding()]
param(
    [string[]]$TargetRepos,

    [ValidateSet('auto','claude','codex','gemini','opencode','cursor','copilot','windsurf','qwen','hermes','cline')]
    [string[]]$Agents = @('auto'),

    [switch]$Apply,
    [switch]$Force,
    [switch]$Backup,
    [switch]$IncludeUpstream,
    [switch]$SkipTemplates
)

$ErrorActionPreference = 'Stop'

$eccRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$workspaceRoot = (Resolve-Path -LiteralPath (Join-Path $eccRoot '..')).Path
$syncScript = Join-Path $eccRoot 'scripts/sync-speckit-skills.ps1'

if (-not (Test-Path -LiteralPath $syncScript -PathType Leaf)) {
    throw "Missing sync script: $syncScript"
}

function Get-DefaultTargets {
    param([string]$WorkspaceRoot, [bool]$IncludeUpstream)

    $names = @(
        'manageesg-backend',
        'manageesg-frontend',
        'openseabri',
        'seabridge-dev',
        'shared-agent-skills'
    )
    if ($IncludeUpstream) {
        $names += '_upstream'
    }

    foreach ($name in $names) {
        Join-Path $WorkspaceRoot $name
    }
}

function Test-PathAny {
    param([string]$Root, [string[]]$RelativePaths)
    foreach ($relative in $RelativePaths) {
        if (Test-Path -LiteralPath (Join-Path $Root $relative)) {
            return $true
        }
    }
    return $false
}

function Get-AutoAgents {
    param([Parameter(Mandatory = $true)][string]$RepoRoot)

    $detected = New-Object System.Collections.Generic.List[string]

    if (Test-PathAny $RepoRoot @('.claude', 'CLAUDE.md')) { $detected.Add('claude') }
    if (Test-PathAny $RepoRoot @('.agents', '.codex', 'AGENTS.md')) { $detected.Add('codex') }
    if (Test-PathAny $RepoRoot @('.gemini', 'GEMINI.md')) { $detected.Add('gemini') }
    if (Test-PathAny $RepoRoot @('.opencode', 'OPENCODE.md')) { $detected.Add('opencode') }
    if (Test-PathAny $RepoRoot @('.cursor')) { $detected.Add('cursor') }
    if (Test-PathAny $RepoRoot @('.windsurf')) { $detected.Add('windsurf') }
    if (Test-PathAny $RepoRoot @('.qwen', 'QWEN.md')) { $detected.Add('qwen') }
    if (Test-PathAny $RepoRoot @('.github')) { $detected.Add('copilot') }

    return @($detected | Select-Object -Unique)
}

if (-not $TargetRepos -or $TargetRepos.Count -eq 0) {
    $TargetRepos = @(Get-DefaultTargets -WorkspaceRoot $workspaceRoot -IncludeUpstream:$IncludeUpstream)
}

$mode = if ($Apply) { 'APPLY' } else { 'DRY RUN' }
Write-Output "SeaBridgeAI Spec Kit cross-repo sync: $mode"
Write-Output "ECC: $eccRoot"
Write-Output ''

$summary = @()

foreach ($target in $TargetRepos) {
    if (-not (Test-Path -LiteralPath $target -PathType Container)) {
        $summary += [PSCustomObject]@{
            Repo = $target
            Agent = ''
            Status = 'Skipped'
            Detail = 'repo missing'
        }
        continue
    }

    $repoRoot = (Resolve-Path -LiteralPath $target).Path
    $repoAgents = if ($Agents -contains 'auto') {
        Get-AutoAgents -RepoRoot $repoRoot
    } else {
        @($Agents | Where-Object { $_ -ne 'auto' } | Select-Object -Unique)
    }

    if (-not $repoAgents -or $repoAgents.Count -eq 0) {
        $summary += [PSCustomObject]@{
            Repo = $repoRoot
            Agent = ''
            Status = 'Skipped'
            Detail = 'no applicable agent surface detected'
        }
        continue
    }

    foreach ($agent in $repoAgents) {
        $args = @(
            '-ExecutionPolicy', 'Bypass',
            '-File', $syncScript,
            '-TargetRepo', $repoRoot,
            '-Agent', $agent
        )
        if (-not $Apply) { $args += '-DryRun' }
        if ($Force) { $args += '-Force' }
        if ($Backup) { $args += '-Backup' }
        if ($SkipTemplates) { $args += '-SkipTemplates' }

        try {
            & powershell @args | Out-Host
            $summary += [PSCustomObject]@{
                Repo = $repoRoot
                Agent = $agent
                Status = 'OK'
                Detail = $mode
            }
        } catch {
            $summary += [PSCustomObject]@{
                Repo = $repoRoot
                Agent = $agent
                Status = 'Failed'
                Detail = $_.Exception.Message
            }
        }
    }
}

Write-Output ''
Write-Output 'Summary'
$summary | Format-Table -AutoSize

$failed = @($summary | Where-Object { $_.Status -eq 'Failed' })
if ($failed.Count -gt 0) {
    exit 1
}
