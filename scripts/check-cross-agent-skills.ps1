param(
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [switch]$Advisory
)

$ErrorActionPreference = "Stop"

# Cross-agent skill-surface parity check.
# Verifies that the canonical skill bodies (skills\<name>\SKILL.md) and the
# cross-agent wrappers (.agents\skills\<name>\SKILL.md) agree, so Claude Code,
# Codex, Gemini, OpenCode, and other agents resolve the same skill set.

$canonicalSkills = @(
  "goal-default",
  "sea-skill-map",
  "sea-gsd-controlled-execution",
  "sea-senior-dev-workflow",
  "sea-test-driven-development",
  "sea-verification-before-completion",
  "sea-security-reviewer",
  "sea-platform-diagnostics",
  "sea-error-recovery-loop",
  "sea-cross-repo-handoff",
  "sea-context-hygiene",
  "sea-task-queue-execution",
  "sea-teach-loop",
  "sea-reliability-reviewer",
  "sea-architecture-reviewer",
  "sea-frontend-ux-reviewer",
  "sea-backend-api-reviewer",
  "sea-ai-grounding-reviewer",
  "sea-production-readiness-reviewer"
)

$failures = @()

# 1. Every canonical skill must have a body and a wrapper.
foreach ($name in $canonicalSkills) {
  $body = Join-Path $EccPath "skills\$name\SKILL.md"
  $wrapper = Join-Path $EccPath ".agents\skills\$name\SKILL.md"
  if (-not (Test-Path $body)) { $failures += "missing canonical body: skills\$name\SKILL.md" }
  if (-not (Test-Path $wrapper)) { $failures += "missing wrapper: .agents\skills\$name\SKILL.md" }
}

# 2. Every sea-* wrapper must point at an existing canonical body.
$wrapperDirs = Get-ChildItem (Join-Path $EccPath ".agents\skills") -Directory |
  Where-Object { $_.Name -like "sea-*" -or $_.Name -eq "goal-default" }
foreach ($dir in $wrapperDirs) {
  $wrapperFile = Join-Path $dir.FullName "SKILL.md"
  if (-not (Test-Path $wrapperFile)) {
    $failures += "wrapper dir without SKILL.md: .agents\skills\$($dir.Name)"
    continue
  }
  $content = Get-Content -Raw -Path $wrapperFile
  if ($content -notmatch "Canonical skill:") {
    $failures += "wrapper missing 'Canonical skill:' pointer: .agents\skills\$($dir.Name)\SKILL.md"
  }
  $body = Join-Path $EccPath "skills\$($dir.Name)\SKILL.md"
  if (-not (Test-Path $body)) {
    $failures += "wrapper has no canonical body: skills\$($dir.Name)\SKILL.md"
  }
}

# 3. Every sea-* canonical body must have a wrapper (AGENTS_SYSTEM.md rule:
#    a cataloged skill needs both a canonical file and a wrapper).
$bodyDirs = Get-ChildItem (Join-Path $EccPath "skills") -Directory |
  Where-Object { $_.Name -like "sea-*" }
foreach ($dir in $bodyDirs) {
  $wrapper = Join-Path $EccPath ".agents\skills\$($dir.Name)\SKILL.md"
  if (-not (Test-Path $wrapper)) {
    $failures += "canonical body has no wrapper: .agents\skills\$($dir.Name)\SKILL.md"
  }
}

if ($failures.Count -gt 0) {
  $message = "[cross-agent-skills] FAIL:`n" + (($failures | Sort-Object -Unique) -join "`n")
  if ($Advisory) {
    Write-Host $message
    exit 0
  }
  Write-Error $message
  exit 1
}

Write-Host "[cross-agent-skills] Cross-agent skill surface parity PASS"
