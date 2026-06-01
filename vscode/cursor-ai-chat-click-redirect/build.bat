@echo off
setlocal
cd /d "%~dp0"

for /f %%v in ('node -p "require('./package.json').version"') do set VER=%%v
if "%VER%"=="" (
  echo BUILD FAILED - cannot read version from package.json
  exit /b 1
)

if not exist build mkdir build

call npx vsce package -o "build\cursor-ai-chat-click-redirect-%VER%.vsix" --baseContentUrl "https://github.com/rufatpro/plugins/tree/main/plugins/vscode/cursor-ai-chat-click-redirect" > log.1main.log 2> log.1err.log
if %ERRORLEVEL% equ 0 (
  echo BUILD SUCCESSFUL - see log.1main.log
  dir /b "build\*.vsix" 2>nul
) else (
  echo BUILD FAILED - see log.1main.log and log.1err.log
  exit /b %ERRORLEVEL%
)
