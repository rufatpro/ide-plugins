@echo off
setlocal enabledelayedexpansion
set FAILED=0
cd /d "%~dp0"

echo Cleaning extension build artifacts...

if exist build (
  rmdir /s /q build
  if exist build (
    echo   [fail] build\ is locked or not deleted
    set FAILED=1
  ) else (
    echo   [ok] build\
  )
)

if exist log.1main.log (
  del /q log.1main.log
  if exist log.1main.log (
    echo   [fail] log.1main.log not deleted
    set FAILED=1
  ) else (
    echo   [ok] log.1main.log
  )
)

if exist log.1err.log (
  del /q log.1err.log
  if exist log.1err.log (
    echo   [fail] log.1err.log not deleted
    set FAILED=1
  ) else (
    echo   [ok] log.1err.log
  )
)

if "!FAILED!"=="0" (
  echo Done.
) else (
  echo Clean finished with errors.
  exit /b 1
)
