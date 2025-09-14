@echo off
echo Registering Smart Reader file associations...
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

REM Get the current directory
set "APP_PATH=%~dp0win-unpacked\Smart Reader.exe"

REM Check if the executable exists
if not exist "%APP_PATH%" (
    echo Error: Smart Reader.exe not found at %APP_PATH%
    echo Please build the application first using: npm run build:portable
    pause
    exit /b 1
)

echo Registering file associations...

REM Register the main application
reg add "HKCU\Software\Classes\SmartReader" /ve /d "Smart Reader Document" /f >nul
reg add "HKCU\Software\Classes\SmartReader" /v "FriendlyTypeName" /d "Smart Reader Document" /f >nul
reg add "HKCU\Software\Classes\SmartReader\DefaultIcon" /ve /d "%APP_PATH%,0" /f >nul
reg add "HKCU\Software\Classes\SmartReader\shell\open\command" /ve /d "\"%APP_PATH%\" \"%%1\"" /f >nul

REM Associate file extensions
reg add "HKCU\Software\Classes\.md" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.md" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.markdown" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.markdown" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mdown" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mdown" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mkdn" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mkdn" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mdx" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mdx" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mkd" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mkd" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mdwn" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mdwn" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mdtxt" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mdtxt" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.mdtext" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.mdtext" /v "Content Type" /d "text/markdown" /f >nul

reg add "HKCU\Software\Classes\.text" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.text" /v "Content Type" /d "text/plain" /f >nul

reg add "HKCU\Software\Classes\.pdf" /ve /d "SmartReader" /f >nul
reg add "HKCU\Software\Classes\.pdf" /v "Content Type" /d "application/pdf" /f >nul

echo.
echo File associations registered successfully!
echo You can now right-click on .md, .pdf, and other supported files to open them with Smart Reader.
echo.
echo Refreshing Windows Explorer...
taskkill /f /im explorer.exe >nul 2>&1
start explorer.exe >nul 2>&1

echo.
echo Setup complete! Try right-clicking on a .md or .pdf file.
pause