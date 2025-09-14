@echo off
title Smart Reader
cd /d "%~dp0"

echo ========================================
echo    Smart Reader - Markdown Reader
echo ========================================
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo Error: package.json not found!
    echo Please make sure this batch file is in your project directory.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few minutes on first run.
    echo.
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

echo Starting Smart Reader...
echo Press Ctrl+C to exit the application.
echo.

REM Check if a file argument was provided
if "%~1"=="" (
    echo No file specified, starting Smart Reader normally...
    npm start
) else (
    echo Opening file: %~1
    npm start -- "%~1"
)

if errorlevel 1 (
    echo.
    echo Smart Reader encountered an error.
    echo Make sure Node.js and npm are installed.
    pause
)
