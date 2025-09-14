@echo off
echo ========================================
echo    MarkdownFlow Setup Test
echo ========================================
echo.

echo Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo Node.js is installed.
)

echo.
echo Checking npm installation...
npm --version
if errorlevel 1 (
    echo ERROR: npm not found!
    echo Please install Node.js (npm comes with it)
    pause
    exit /b 1
) else (
    echo npm is installed.
)

echo.
echo Checking project files...
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Make sure you're in the project directory.
    pause
    exit /b 1
) else (
    echo package.json found.
)

if not exist "main.js" (
    echo ERROR: main.js not found!
    echo Make sure you're in the project directory.
    pause
    exit /b 1
) else (
    echo main.js found.
)

echo.
echo Checking dependencies...
if not exist "node_modules" (
    echo WARNING: node_modules not found.
    echo Dependencies will be installed when you run the application.
) else (
    echo node_modules found.
)

echo.
echo Checking Electron installation...
npm list electron
if errorlevel 1 (
    echo WARNING: Electron not found in dependencies.
    echo This will be installed when you run npm install.
) else (
    echo Electron is installed.
)

echo.
echo ========================================
echo    Setup Test Complete
echo ========================================
echo.
echo If all checks passed, you can now run:
echo - MarkdownFlow.bat
echo - MarkdownFlow.vbs
echo - MarkdownFlow.ps1
echo - MarkdownFlow-Fixed.exe
echo.
pause
