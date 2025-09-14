# Smart Reader Executable Troubleshooting Guide

## Common Issues and Solutions

### 1. "Node.js not found" or "npm not found"
**Problem**: The system cannot find Node.js or npm.

**Solutions**:
- Install Node.js from https://nodejs.org/
- Make sure Node.js is added to your system PATH
- Restart your command prompt/PowerShell after installing Node.js
- Test by running `node --version` and `npm --version` in command prompt

### 2. "package.json not found"
**Problem**: The executable cannot find the project files.

**Solutions**:
- Make sure you're running the executable from the project directory
- The executable should be in the same folder as `package.json`, `main.js`, etc.
- Check that all project files are present

### 3. "Dependencies missing" or "Module not found"
**Problem**: Required npm packages are not installed.

**Solutions**:
- Run `npm install` in the project directory
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`
- Make sure you have internet connection for downloading packages

### 4. Executable starts but Electron doesn't open
**Problem**: The launcher works but the Electron window doesn't appear.

**Solutions**:
- Check if Electron is installed: `npm list electron`
- Try running `npm start` directly in command prompt
- Check Windows Defender or antivirus software isn't blocking the application
- Look for error messages in the console output

### 5. Permission errors
**Problem**: "Access denied" or permission-related errors.

**Solutions**:
- Run as administrator (right-click → "Run as administrator")
- Check if the folder has proper read/write permissions
- Make sure the executable isn't in a protected system folder

### 6. Antivirus blocking the executable
**Problem**: Antivirus software flags the .exe file as suspicious.

**Solutions**:
- Add the executable to your antivirus whitelist/exceptions
- Temporarily disable real-time protection while testing
- Use the .bat or .ps1 files instead of .exe files

## Testing Steps

1. **Test Node.js installation**:
   ```cmd
   node --version
   npm --version
   ```

2. **Test project setup**:
   ```cmd
   npm install
   npm start
   ```

3. **Test individual launchers**:
   - Double-click `MarkdownFlow.bat`
   - Right-click `MarkdownFlow.ps1` → "Run with PowerShell"
   - Double-click `MarkdownFlow.vbs`

## Recommended Launcher Order

1. **MarkdownFlow.bat** - Most reliable, works in most environments
2. **MarkdownFlow.vbs** - Clean interface, no command window
3. **MarkdownFlow.ps1** - Good for PowerShell users
4. **SmartReader-Fixed.exe** - Standalone executable (if Node.js is installed)

## Getting Help

If you're still having issues:

1. Check the console output for specific error messages
2. Try running `npm start` directly to see if the issue is with the launcher or the app itself
3. Make sure all files are in the correct directory structure
4. Verify Node.js and npm are properly installed and accessible

## File Structure Check

Make sure your project directory looks like this:
```
YourProject/
├── MarkdownFlow.bat
├── MarkdownFlow.vbs
├── MarkdownFlow.ps1
├── MarkdownFlow-Fixed.exe
├── package.json
├── main.js
├── preload.js
├── renderer/
│   ├── index.html
│   ├── renderer.js
│   └── styles.css
└── node_modules/
```
