@echo off
echo ========================================
echo    Smart Reader File Association Setup
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with administrator privileges.
) else (
    echo This script requires administrator privileges.
    echo Please right-click and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo.
echo This will register Smart Reader to open .md files by default.
echo.
echo Supported file types:
echo - .md
echo - .markdown
echo - .mdown
echo - .mkdn
echo - .mdx
echo - .mkd
echo - .mdwn
echo - .mdtxt
echo - .mdtext
echo.

set /p choice="Do you want to continue? (Y/N): "
if /i "%choice%" neq "Y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo Setting up file associations...

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create registry entries
reg add "HKEY_CLASSES_ROOT\.md" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.md" /v "Content Type" /d "text/markdown" /f >nul
reg add "HKEY_CLASSES_ROOT\.md" /v "PerceivedType" /d "text" /f >nul

reg add "HKEY_CLASSES_ROOT\.markdown" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mdown" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mkdn" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mdx" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mkd" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mdwn" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mdtxt" /ve /d "SmartReader.Document" /f >nul
reg add "HKEY_CLASSES_ROOT\.mdtext" /ve /d "SmartReader.Document" /f >nul

reg add "HKEY_CLASSES_ROOT\SmartReader.Document" /ve /d "Markdown Document" /f >nul
reg add "HKEY_CLASSES_ROOT\SmartReader.Document" /v "FriendlyTypeName" /d "Markdown Document" /f >nul

reg add "HKEY_CLASSES_ROOT\SmartReader.Document\DefaultIcon" /ve /d "\"%CURRENT_DIR%\MarkdownFlow.bat\",0" /f >nul

reg add "HKEY_CLASSES_ROOT\SmartReader.Document\shell" /ve /d "open" /f >nul
reg add "HKEY_CLASSES_ROOT\SmartReader.Document\shell\open" /ve /d "Open with Smart Reader" /f >nul
reg add "HKEY_CLASSES_ROOT\SmartReader.Document\shell\open\command" /ve /d "\"%CURRENT_DIR%\MarkdownFlow.bat\" \"%%1\"" /f >nul

reg add "HKEY_CLASSES_ROOT\Applications\SmartReader.exe" /ve /d "Smart Reader" /f >nul
reg add "HKEY_CLASSES_ROOT\Applications\SmartReader.exe\shell\open\command" /ve /d "\"%CURRENT_DIR%\MarkdownFlow.bat\" \"%%1\"" /f >nul

echo.
echo File associations registered successfully!
echo.
echo Smart Reader is now set as the default application for markdown files.
echo.
echo You can now:
echo 1. Double-click any .md file to open it with Smart Reader
echo 2. Right-click on .md files and select "Open with Smart Reader"
echo 3. Use "Open with" to choose Smart Reader for other file types
echo.
echo To remove these associations, run: unregister-file-association.bat
echo.
pause
