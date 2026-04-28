param(
  [Parameter(Mandatory = $true)]
  [string]$Command,

  [double]$IntervalHours = 4,
  [double]$MaxHours = 72,
  [int]$MaxAttempts = 18,
  [switch]$RetryAll,
  [string]$LogDir = ".ecc\loops",
  [string]$Name = "agent-token-retry"
)

$ErrorActionPreference = "Stop"

function New-SafeName {
  param([string]$Value)
  return ($Value -replace '[^A-Za-z0-9_.-]', '-').Trim('-')
}

function Test-TokenLimitOutput {
  param([string]$Text)

  $patterns = @(
    "rate limit",
    "usage limit",
    "token limit",
    "tokens.*available",
    "quota",
    "429",
    "too many requests",
    "overloaded",
    "capacity",
    "exceeded",
    "try again",
    "try again later"
  )

  foreach ($pattern in $patterns) {
    if ($Text -match $pattern) {
      return $true
    }
  }

  return $false
}

$safeName = New-SafeName $Name
$root = (Resolve-Path ".").Path
$resolvedLogDir = Join-Path $root $LogDir
New-Item -ItemType Directory -Force -Path $resolvedLogDir | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logPath = Join-Path $resolvedLogDir "$safeName-$stamp.log"
$statePath = Join-Path $resolvedLogDir "$safeName-latest.json"

$deadline = (Get-Date).AddHours($MaxHours)
$attempt = 0

@"
[$(Get-Date -Format o)] starting token retry loop
name=$Name
command=$Command
interval_hours=$IntervalHours
max_hours=$MaxHours
max_attempts=$MaxAttempts
retry_all=$RetryAll
cwd=$root
"@ | Tee-Object -FilePath $logPath -Append | Out-Host

while ((Get-Date) -lt $deadline -and $attempt -lt $MaxAttempts) {
  $attempt += 1
  $started = Get-Date
  "[$($started.ToString('o'))] attempt $attempt begin" | Tee-Object -FilePath $logPath -Append | Out-Host

  $output = ""
  $exitCode = 0

  try {
    $output = & powershell -NoProfile -ExecutionPolicy Bypass -Command $Command 2>&1 | Out-String
    $exitCode = $LASTEXITCODE
    if ($null -eq $exitCode) {
      $exitCode = 0
    }
  } catch {
    $output = $_ | Out-String
    $exitCode = 1
  }

  $finished = Get-Date
  $tokenLimited = Test-TokenLimitOutput $output

  @{
    name = $Name
    command = $Command
    attempt = $attempt
    exit_code = $exitCode
    token_limited = $tokenLimited
    retry_all = [bool]$RetryAll
    started_at = $started.ToString("o")
    finished_at = $finished.ToString("o")
    next_retry_after = if ($exitCode -eq 0) { $null } else { $finished.AddHours($IntervalHours).ToString("o") }
    deadline = $deadline.ToString("o")
    log = $logPath
  } | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 $statePath

  $output | Tee-Object -FilePath $logPath -Append | Out-Host
  "[$($finished.ToString('o'))] attempt $attempt exit_code=$exitCode token_limited=$tokenLimited" | Tee-Object -FilePath $logPath -Append | Out-Host

  if ($exitCode -eq 0) {
    "[$(Get-Date -Format o)] command succeeded; stopping loop" | Tee-Object -FilePath $logPath -Append | Out-Host
    exit 0
  }

  if (-not $tokenLimited -and -not $RetryAll) {
    "[$(Get-Date -Format o)] non-token failure detected; stopping without blind retry" | Tee-Object -FilePath $logPath -Append | Out-Host
    exit $exitCode
  }

  if ((Get-Date).AddHours($IntervalHours) -ge $deadline -or $attempt -ge $MaxAttempts) {
    break
  }

  "[$(Get-Date -Format o)] waiting $IntervalHours hour(s) before retry" | Tee-Object -FilePath $logPath -Append | Out-Host
  Start-Sleep -Seconds ([int]($IntervalHours * 3600))
}

"[$(Get-Date -Format o)] retry window expired or max attempts reached" | Tee-Object -FilePath $logPath -Append | Out-Host
exit 124
