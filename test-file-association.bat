@echo off
echo ========================================
echo    Smart Reader File Association Test
echo ========================================
echo.

echo Creating test markdown file...
echo # Test Markdown File > test-file.md
echo. >> test-file.md
echo This is a test markdown file to verify that MarkdownFlow >> test-file.md
echo can open files via command line arguments. >> test-file.md
echo. >> test-file.md
echo ## Features Tested >> test-file.md
echo - File argument handling >> test-file.md
echo - Markdown rendering >> test-file.md
echo - Application startup >> test-file.md
echo. >> test-file.md
echo **Bold text** and *italic text* should render properly. >> test-file.md

echo Test file created: test-file.md
echo.

echo Testing Smart Reader with file argument...
echo This should open Smart Reader with the test file loaded.
echo.

REM Test the batch file with file argument
call "MarkdownFlow.bat" "test-file.md"

echo.
echo Test completed!
echo.
echo If MarkdownFlow opened with the test file, the file association is working correctly.
echo.
pause
