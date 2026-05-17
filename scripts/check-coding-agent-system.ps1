param(
  [string]$RootPath = "C:\Users\adelm\SeaBridgeAI",
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [switch]$IncludeOptionalRepos,
  [switch]$AsJson
)

$ErrorActionPreference = "Stop"

$expectedActiveRepos = @(
  "manageesg-backend",
  "manageesg-frontend",
  "openseabri",
  "everything-claude-code",
  "autoresearch",
  "_upstream"
)

$optionalUnresolvedRepos = @(
  @{ Name = "file-code"; Path = Join-Path $RootPath "file-code"; Expected = "optional-or-future" },
  @{ Name = "app-streaming"; Path = Join-Path $RootPath "app-streaming"; Expected = "optional-or-future" },
  @{ Name = "SeaBridgeAI_upstream"; Path = "C:\Users\adelm\SeaBridgeAI_upstream"; Expected = "stale-alias-for-_upstream" }
)

function Add-Finding($List, $Rule, $Severity, $Message, $Path = $null) {
  $List.Add([pscustomobject]@{
    rule = $Rule
    severity = $Severity
    path = $Path
    message = $Message
  }) | Out-Null
}

$findings = New-Object System.Collections.Generic.List[object]

$workspacePath = Join-Path $RootPath "SeaBridgeAI.code-workspace"
if (Test-Path -LiteralPath $workspacePath) {
  try {
    $workspace = Get-Content -Raw -LiteralPath $workspacePath | ConvertFrom-Json
    $workspaceFolders = @($workspace.folders | ForEach-Object { if ($_.name) { $_.name } else { $_.path } })
    foreach ($repo in $expectedActiveRepos) {
      if ($repo -notin $workspaceFolders) {
        Add-Finding $findings "workspace-folder-missing" "warn" "Expected active repo is not listed in SeaBridgeAI.code-workspace: $repo" $workspacePath
      }
    }
  } catch {
    Add-Finding $findings "workspace-parse" "warn" "Could not parse SeaBridgeAI.code-workspace: $($_.Exception.Message)" $workspacePath
  }
} else {
  Add-Finding $findings "workspace-missing" "warn" "SeaBridgeAI.code-workspace was not found." $workspacePath
}

foreach ($repo in $expectedActiveRepos) {
  $repoPath = Join-Path $RootPath $repo
  if (-not (Test-Path -LiteralPath $repoPath)) {
    Add-Finding $findings "active-repo-missing" "error" "Expected active repo path is missing: $repoPath" $repoPath
    continue
  }

  $rootFiles = @("AGENTS.md", "AGENTS_SYSTEM.md", "CLAUDE.md", "CODEX.md", "GEMINI.md", "OPENCODE.md") |
    ForEach-Object { Join-Path $repoPath $_ } |
    Where-Object { Test-Path -LiteralPath $_ }

  if ($rootFiles.Count -eq 0) {
    Add-Finding $findings "root-agent-docs-missing" "warn" "No root agent instruction files found." $repoPath
    continue
  }

  $systemHits = @(Select-String -Path $rootFiles -Pattern "SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1" -SimpleMatch -ErrorAction SilentlyContinue)
  if ($systemHits.Count -eq 0) {
    Add-Finding $findings "system-id-missing" "warn" "No SYSTEM_ID hit in root instruction files." $repoPath
  }

  $pointerHits = @(Select-String -Path $rootFiles -Pattern "everything-claude-code" -SimpleMatch -ErrorAction SilentlyContinue)
  if ($pointerHits.Count -eq 0) {
    Add-Finding $findings "ecc-pointer-missing" "warn" "No ECC pointer hit in root instruction files." $repoPath
  }

  $allowedRootMarkdown = @(
    "README.md",
    "README.zh-CN.md",
    "AGENTS.md",
    "AGENTS_SYSTEM.md",
    "AGENT.md",
    "AGENT_SKILLS.md",
    "CLAUDE.md",
    "GEMINI.md",
    "CODEX.md",
    "OPENCODE.md",
    "FOD.md",
    "SEABRIDGE_CODING_AGENT_SYSTEM.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    "LICENSE.md",
    "IMPORT_POLICY.md",
    "REFERENCE.md",
    "TOOLS.md",
    "USER.md",
    "SOUL.md"
  )
  $artifactNamePattern = "(?i)(report|handoff|qa|smoke|audit|readiness|deploy|deployment|benchmark|results|validation|status|closeout|continuation|review|fix|conflict|log)"
  $rootMarkdown = @(Get-ChildItem -LiteralPath $repoPath -File -Force -ErrorAction SilentlyContinue |
    Where-Object {
      $_.Extension -eq ".md" -and
      $_.Name -notin $allowedRootMarkdown -and
      $_.Name -match $artifactNamePattern
    })
  foreach ($file in $rootMarkdown) {
    Add-Finding $findings "root-artifact-candidate" "info" "Likely transient root artifact should be reviewed for docs/reports relocation." $file.FullName
  }
}

if ($IncludeOptionalRepos) {
  foreach ($repo in $optionalUnresolvedRepos) {
    if (-not (Test-Path -LiteralPath $repo.Path)) {
      Add-Finding $findings "optional-repo-not-present" "info" "$($repo.Name) is not present at expected path; treat as inactive until user confirms location. Classification: $($repo.Expected)" $repo.Path
    }
  }
}

if (Test-Path -LiteralPath $EccPath) {
  $canonical = @(Get-ChildItem -LiteralPath (Join-Path $EccPath "skills") -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -like "sea-*" } |
    Select-Object -ExpandProperty Name)
  $wrappers = @(Get-ChildItem -LiteralPath (Join-Path $EccPath ".agents\skills") -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -like "sea-*" } |
    Select-Object -ExpandProperty Name)

  foreach ($skill in $canonical) {
    if ($skill -notin $wrappers) {
      Add-Finding $findings "missing-wrapper" "error" "Canonical skill has no .agents wrapper: $skill" (Join-Path $EccPath "skills\$skill\SKILL.md")
    }
  }
  foreach ($skill in $wrappers) {
    if ($skill -notin $canonical) {
      Add-Finding $findings "missing-canonical" "error" "Wrapper skill has no canonical skill body: $skill" (Join-Path $EccPath ".agents\skills\$skill\SKILL.md")
    }
  }

  foreach ($requiredDoc in @(
    "docs\SKILL_ROUTING_REFERENCE.md",
    "docs\onboarding\CODING_AGENT_ONBOARDING_GUIDE.md",
    "docs\CODING_AGENT_SYSTEM_STRATEGY_REVIEW_2026-05-10.md"
  )) {
    $docPath = Join-Path $EccPath $requiredDoc
    if (-not (Test-Path -LiteralPath $docPath)) {
      Add-Finding $findings "required-doc-missing" "error" "Required coding-agent system doc is missing." $docPath
    }
  }
} else {
  Add-Finding $findings "ecc-missing" "error" "ECC path is missing." $EccPath
}

if ($AsJson) {
  if ($findings.Count -eq 0) {
    "[]"
  } else {
    $findings | ConvertTo-Json -Depth 5
  }
} else {
  if ($findings.Count -eq 0) {
    Write-Host "[coding-agent-system] PASS: no findings."
  } else {
    $findings | Format-Table -AutoSize
  }
}

if (@($findings | Where-Object { $_.severity -eq "error" }).Count -gt 0) {
  exit 1
}
