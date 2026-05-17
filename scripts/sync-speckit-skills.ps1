#!/usr/bin/env pwsh
<#
.SYNOPSIS
Sync SeaBridgeAI curated Spec Kit skills into a target repository.

.DESCRIPTION
Installs thin agent wrappers and SeaBridge Spec Kit templates from ECC. The
script is dry-run friendly, skips existing files by default, and can back up
overwritten files when -Force is used.
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$TargetRepo,

    [ValidateSet('claude','codex','gemini','opencode','cursor','copilot','windsurf','qwen','hermes','cline')]
    [string]$Agent = 'codex',

    [string[]]$Skills = @(
        'speckit-constitution',
        'speckit-specify',
        'speckit-clarify',
        'speckit-plan',
        'speckit-tasks',
        'speckit-analyze',
        'speckit-checklist',
        'speckit-implement',
        'speckit-taskstoissues'
    ),

    [switch]$DryRun,
    [switch]$Backup,
    [switch]$Force,
    [switch]$SkipTemplates
)

$ErrorActionPreference = 'Stop'

function Resolve-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        throw "Target repository does not exist: $Path"
    }
    return (Resolve-Path -LiteralPath $Path).Path
}

function Get-RelativePath {
    param(
        [Parameter(Mandatory = $true)][string]$Base,
        [Parameter(Mandatory = $true)][string]$Path
    )
    $baseUri = [Uri]((Join-Path $Base '.') -replace '\\', '/')
    $pathUri = [Uri]($Path -replace '\\', '/')
    return [Uri]::UnescapeDataString($baseUri.MakeRelativeUri($pathUri).ToString()).Replace('/', [IO.Path]::DirectorySeparatorChar)
}

function Assert-InTarget {
    param(
        [Parameter(Mandatory = $true)][string]$TargetRoot,
        [Parameter(Mandatory = $true)][string]$Path
    )
    $full = [IO.Path]::GetFullPath($Path)
    $root = [IO.Path]::GetFullPath($TargetRoot)
    $comparison = if ($IsWindows -or $null -eq $IsWindows) {
        [StringComparison]::OrdinalIgnoreCase
    } else {
        [StringComparison]::Ordinal
    }
    if (-not $full.StartsWith($root.TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar, $comparison) -and
        -not [string]::Equals($full, $root, $comparison)) {
        throw "Refusing to write outside target repo: $full"
    }
}

function Get-AgentDestination {
    param(
        [Parameter(Mandatory = $true)][string]$TargetRoot,
        [Parameter(Mandatory = $true)][string]$Agent,
        [Parameter(Mandatory = $true)][string]$Skill
    )

    $stem = $Skill -replace '^speckit-', ''
    switch ($Agent) {
        'claude' { return Join-Path $TargetRoot ".claude/skills/$Skill/SKILL.md" }
        'codex' { return Join-Path $TargetRoot ".agents/skills/$Skill/SKILL.md" }
        'cursor' { return Join-Path $TargetRoot ".cursor/skills/$Skill/SKILL.md" }
        'hermes' { return Join-Path $TargetRoot ".agents/skills/$Skill/SKILL.md" }
        'cline' { return Join-Path $TargetRoot ".agents/skills/$Skill/SKILL.md" }
        'gemini' { return Join-Path $TargetRoot ".gemini/commands/speckit-$stem.toml" }
        'opencode' { return Join-Path $TargetRoot ".opencode/commands/speckit.$stem.md" }
        'windsurf' { return Join-Path $TargetRoot ".windsurf/workflows/speckit.$stem.md" }
        'qwen' { return Join-Path $TargetRoot ".qwen/commands/speckit.$stem.md" }
        'copilot' { return Join-Path $TargetRoot ".github/prompts/speckit.$stem.prompt.md" }
    }
}

function New-WrapperContent {
    param(
        [Parameter(Mandatory = $true)][string]$Skill,
        [Parameter(Mandatory = $true)][string]$CanonicalPath,
        [Parameter(Mandatory = $true)][string]$Agent
    )

    $stem = $Skill -replace '^speckit-', ''
    $description = "SeaBridgeAI curated Spec Kit $stem workflow."

    if ($Agent -eq 'gemini') {
        $prompt = "Load and follow the canonical SeaBridgeAI Spec Kit skill: $CanonicalPath. Preserve all SeaBridgeAI approval gates, DoD, tenant isolation, auditability, AI governance, and verification requirements."
        $escaped = $prompt.Replace('\', '\\').Replace('"', '\"')
        return "description = `"$description`"`n`nprompt = `"$escaped`"`n"
    }

    return @"
---
name: $Skill
description: $description
---

# $Skill

Canonical skill:
``$CanonicalPath``

Load and follow the canonical skill body. Do not copy or fork behavior into this repo.
"@
}

function Write-ManagedFile {
    param(
        [Parameter(Mandatory = $true)][string]$TargetRoot,
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content,
        [Parameter(Mandatory = $true)][string]$BackupRoot
    )

    Assert-InTarget -TargetRoot $TargetRoot -Path $Path
    $relative = Get-RelativePath -Base $TargetRoot -Path ([IO.Path]::GetFullPath($Path))

    if (Test-Path -LiteralPath $Path -PathType Leaf) {
        if (-not $Force) {
            return [PSCustomObject]@{ Action = 'Skipped'; Path = $relative; Reason = 'exists' }
        }
        if ($Backup) {
            $backupPath = Join-Path $BackupRoot $relative
            if (-not $DryRun) {
                New-Item -ItemType Directory -Path (Split-Path $backupPath -Parent) -Force | Out-Null
                Copy-Item -LiteralPath $Path -Destination $backupPath -Force
            }
        }
        $action = 'Updated'
    } else {
        $action = 'Added'
    }

    if (-not $DryRun) {
        New-Item -ItemType Directory -Path (Split-Path $Path -Parent) -Force | Out-Null
        $utf8NoBom = [Text.UTF8Encoding]::new($false)
        [IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
    }

    return [PSCustomObject]@{ Action = $action; Path = $relative; Reason = '' }
}

$eccRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$targetRoot = Resolve-Directory -Path $TargetRepo
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = Join-Path $targetRoot ".speckit-backups/$timestamp"
$results = @()

foreach ($skill in $Skills) {
    if ($skill -notmatch '^speckit-[a-z]+$') {
        throw "Unsupported skill name: $skill"
    }

    $canonicalName = $skill -replace '^speckit-', ''
    $canonicalPath = Join-Path $eccRoot "skills/spec-kit/$canonicalName/SKILL.md"
    if (-not (Test-Path -LiteralPath $canonicalPath -PathType Leaf)) {
        throw "Canonical skill not found: $canonicalPath"
    }

    $destination = Get-AgentDestination -TargetRoot $targetRoot -Agent $Agent -Skill $skill
    $content = New-WrapperContent -Skill $skill -CanonicalPath $canonicalPath -Agent $Agent
    $results += Write-ManagedFile -TargetRoot $targetRoot -Path $destination -Content $content -BackupRoot $backupRoot
}

if (-not $SkipTemplates) {
    $templateMap = @{
        'seabridge-constitution-template.md' = 'constitution-template.md'
        'seabridge-spec-template.md' = 'spec-template.md'
        'seabridge-plan-template.md' = 'plan-template.md'
        'seabridge-tasks-template.md' = 'tasks-template.md'
        'seabridge-checklist-template.md' = 'checklist-template.md'
    }
    foreach ($entry in $templateMap.GetEnumerator()) {
        $source = Join-Path $eccRoot "skills/spec-kit/presets/seabridge/$($entry.Key)"
        $destination = Join-Path $targetRoot ".specify/templates/$($entry.Value)"
        $content = Get-Content -LiteralPath $source -Raw
        $results += Write-ManagedFile -TargetRoot $targetRoot -Path $destination -Content $content -BackupRoot $backupRoot
    }
}

$mode = if ($DryRun) { 'DRY RUN' } else { 'APPLIED' }
Write-Output "Spec Kit sync $mode"
Write-Output "Target: $targetRoot"
Write-Output "Agent: $Agent"
if ($Backup -and $Force) { Write-Output "Backup root: $backupRoot" }
Write-Output ''
$results | Sort-Object Action, Path | Format-Table -AutoSize
