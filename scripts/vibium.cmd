@echo off
setlocal

set "VIBIUM=%APPDATA%\npm\vibium.cmd"
if exist "%VIBIUM%" goto run

for /f "delims=" %%I in ('where vibium 2^>nul') do (
  set "VIBIUM=%%I"
  goto run
)

echo vibium is not installed. Run: npm install -g vibium 1>&2
exit /b 1

:run
"%VIBIUM%" %*
exit /b %ERRORLEVEL%
