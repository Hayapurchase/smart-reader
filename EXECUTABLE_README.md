# Smart Reader Executables

This directory contains several ways to run your Smart Reader application as an executable:

## Available Executables

### 1. SmartReader.exe
- **Type**: Node.js executable created with pkg
- **Size**: ~37MB
- **Description**: Simple launcher that starts the Electron application
- **Usage**: Double-click to run, or run from command line

### 2. SmartReader-Enhanced.exe
- **Type**: Enhanced Node.js executable with better error handling
- **Size**: ~37MB
- **Description**: Advanced launcher with dependency checking and user-friendly messages
- **Usage**: Double-click to run, or run from command line

### 3. MarkdownFlow.bat
- **Type**: Windows Batch file
- **Size**: <1KB
- **Description**: Simple batch file launcher
- **Usage**: Double-click to run

### 4. MarkdownFlow.ps1
- **Type**: PowerShell script
- **Size**: <1KB
- **Description**: PowerShell launcher with error handling
- **Usage**: Right-click → "Run with PowerShell" or run from PowerShell

## Requirements

All executables require:
- Node.js installed on the system
- npm available in PATH
- The project files (package.json, main.js, etc.) in the same directory

## How to Use

1. **For the .exe files**: Simply double-click them to run
2. **For the .bat file**: Double-click to run
3. **For the .ps1 file**: Right-click and select "Run with PowerShell"

## Troubleshooting

If you encounter issues:

1. **"Node.js not found"**: Install Node.js from https://nodejs.org/
2. **"npm not found"**: Make sure npm is in your system PATH
3. **"Dependencies missing"**: The enhanced executable will automatically install them
4. **Permission errors**: Run as administrator if needed

## Notes

- The .exe files are standalone executables that don't require Node.js to be pre-installed
- The .bat and .ps1 files require Node.js and npm to be installed
- All launchers will start the Electron application in development mode
- The enhanced executable provides better error messages and automatic dependency installation

## File Structure

Make sure these files are in the same directory as your project:
```
YourProject/
├── SmartReader.exe
├── SmartReader-Enhanced.exe
├── MarkdownFlow.bat
├── MarkdownFlow.ps1
├── package.json
├── main.js
├── preload.js
├── renderer/
└── node_modules/
```
