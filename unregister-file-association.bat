@echo off
echo Removing Smart Reader file associations...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as Administrator - Good!
) else (
    echo This script needs to be run as Administrator.
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo Removing file associations...

REM Remove file extensions
reg delete "HKCU\Software\Classes\.md" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.markdown" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mdown" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mkdn" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mdx" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mkd" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mdwn" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mdtxt" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.mdtext" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.text" /f >nul 2>&1
reg delete "HKCU\Software\Classes\.pdf" /f >nul 2>&1

REM Remove the main application key
reg delete "HKCU\Software\Classes\SmartReader" /f >nul 2>&1

echo.
echo File associations removed successfully!
echo.
echo Refreshing Windows Explorer...
taskkill /f /im explorer.exe >nul 2>&1
start explorer.exe >nul 2>&1

echo.
echo Uninstall complete!
pause