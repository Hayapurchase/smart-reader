# Smart Reader Launcher
# This script launches the Smart Reader Electron application

param(
    [string]$FilePath
)

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Smart Reader - Markdown Reader" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please make sure this script is in your project directory." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes on first run." -ForegroundColor Yellow
    Write-Host ""
    
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Starting Smart Reader..." -ForegroundColor Green
Write-Host "Press Ctrl+C to exit the application." -ForegroundColor Gray
Write-Host ""

# Check if a file argument was provided
if ($FilePath) {
    Write-Host "Opening file: $FilePath" -ForegroundColor Cyan
    npm start -- $FilePath
} else {
    Write-Host "No file specified, starting Smart Reader normally..." -ForegroundColor Gray
    npm start
}

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Smart Reader encountered an error." -ForegroundColor Red
    Write-Host "Make sure Node.js and npm are installed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
