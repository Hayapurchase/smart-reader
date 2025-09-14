# Smart Reader File Association Guide

This guide explains how to set up Smart Reader to open markdown files using Windows "Open with" functionality.

## Quick Setup

### Option 1: Automatic Setup (Recommended)
1. **Right-click** on `setup-file-association.bat`
2. Select **"Run as administrator"**
3. Follow the prompts to register file associations

### Option 2: Manual Setup
1. Run `register-file-association.bat` as administrator
2. This will register Smart Reader for all markdown file types

## What This Does

After setup, Smart Reader will be available to open these file types:
- `.md` - Standard markdown files
- `.markdown` - Alternative markdown extension
- `.mdown` - Markdown variant
- `.mkdn` - Markdown variant
- `.mdx` - Markdown with JSX
- `.mkd` - Markdown variant
- `.mdwn` - Markdown variant
- `.mdtxt` - Markdown text files
- `.mdtext` - Markdown text files

## How to Use

### Method 1: Double-click Files
- Simply double-click any `.md` file
- Smart Reader will open automatically with the file loaded

### Method 2: Right-click "Open with"
- Right-click on any markdown file
- Select "Open with" → "Smart Reader"
- The file will open in Smart Reader

### Method 3: Command Line
- Open Command Prompt or PowerShell
- Navigate to your project directory
- Run: `MarkdownFlow.bat "path\to\file.md"`

## Files Created

### Setup Scripts
- `setup-file-association.bat` - Complete setup with admin check
- `register-file-association.bat` - Basic registry registration
- `unregister-file-association.bat` - Remove file associations

### Launcher Scripts (Updated)
- `MarkdownFlow.bat` - Now handles file arguments
- `MarkdownFlow.ps1` - PowerShell version with file support
- `MarkdownFlow.vbs` - VBScript launcher

### Application Files (Updated)
- `main.js` - Modified to handle command line file arguments

## Troubleshooting

### "Access Denied" Error
- Make sure you're running the setup script as administrator
- Right-click the script and select "Run as administrator"

### Files Don't Open
- Check that MarkdownFlow.bat is in the same directory as your project
- Verify that Node.js and npm are installed
- Try running `test-setup.bat` to check your environment

### Wrong Application Opens
- The file association might be set to another application
- Run `unregister-file-association.bat` to remove MarkdownFlow associations
- Then run `setup-file-association.bat` again

### Registry Issues
- If you have registry problems, run `unregister-file-association.bat`
- This will clean up all MarkdownFlow registry entries
- Then you can re-run the setup

## Advanced Configuration

### Custom File Types
To add support for additional file types, edit `setup-file-association.bat` and add:
```batch
reg add "HKEY_CLASSES_ROOT\.your-extension" /ve /d "MarkdownFlow.Document" /f >nul
```

### Change Default Application
To make MarkdownFlow the default (not just available in "Open with"):
1. Right-click on a `.md` file
2. Select "Properties"
3. Click "Change" next to "Opens with"
4. Select "MarkdownFlow" from the list

### Remove Associations
Run `unregister-file-association.bat` to completely remove all MarkdownFlow file associations.

## Testing

### Test File Opening
1. Create a test markdown file: `test.md`
2. Double-click it to see if MarkdownFlow opens
3. Or right-click and select "Open with MarkdownFlow"

### Test Command Line
```cmd
MarkdownFlow.bat "path\to\your\file.md"
```

### Test PowerShell
```powershell
.\MarkdownFlow.ps1 "path\to\your\file.md"
```

## File Structure

After setup, your project should look like:
```
YourProject/
├── setup-file-association.bat
├── register-file-association.bat
├── unregister-file-association.bat
├── MarkdownFlow.bat
├── MarkdownFlow.ps1
├── MarkdownFlow.vbs
├── main.js (updated)
├── package.json
└── ... (other project files)
```

## Security Notes

- The setup scripts modify the Windows Registry
- Always run as administrator for proper installation
- The uninstall script safely removes all registry entries
- No system files are modified, only registry entries

## Support

If you encounter issues:
1. Run `test-setup.bat` to check your environment
2. Check `TROUBLESHOOTING.md` for common solutions
3. Try the uninstall script and re-run setup
4. Make sure all files are in the correct directory structure
