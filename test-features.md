# Smart Reader - Test Document

## Features Added

This document tests the new features added to Smart Reader:

### ✅ PDF Support
- PDF files can now be opened and viewed
- PDF navigation controls (previous/next page)
- PDF zoom controls (zoom in/out, fit to width)
- PDF keyboard shortcuts (arrow keys, Home/End)

### ✅ Side Panel
- Toggle side panel with the hamburger menu button
- Switch between document types (Markdown/PDF)
- Keyboard shortcut: `Ctrl+B` or `\` to toggle side panel

### ✅ Enhanced File Support
- Support for both Markdown (.md, .markdown, etc.) and PDF (.pdf) files
- Drag and drop support for both file types
- File type detection and appropriate rendering

## Keyboard Shortcuts

### General
- `Ctrl+O` - Open file
- `Ctrl+D` - Toggle dark mode
- `Ctrl+,` - Open settings
- `Ctrl+R` - Toggle reading mode
- `Ctrl+B` or `\` - Toggle side panel
- `Escape` - Close modals/panels

### Markdown Mode
- `Ctrl++` - Increase font size
- `Ctrl+-` - Decrease font size
- `Ctrl+0` - Reset font size

### PDF Mode
- `Ctrl++` - Zoom in
- `Ctrl+-` - Zoom out
- `Ctrl+0` - Reset zoom
- `←` / `→` - Previous/Next page
- `Home` - First page
- `End` - Last page

## Testing Instructions

1. **Test Markdown**: Open this file to test markdown rendering
2. **Test PDF**: Try opening any PDF file to test PDF viewing
3. **Test Side Panel**: Click the hamburger menu to toggle the side panel
4. **Test File Switching**: Use the side panel to switch between document types
5. **Test Drag & Drop**: Drag both .md and .pdf files into the application

## Code Blocks

Here's a code block to test syntax highlighting:

```javascript
function testPDFSupport() {
    console.log("PDF support is working!");
    return true;
}

function testSidePanel() {
    const panel = document.getElementById('side-panel');
    panel.classList.toggle('hidden');
}
```

## Lists

### Features
- PDF viewing with PDF.js
- Side panel for document type switching
- Enhanced keyboard shortcuts
- Improved file type detection
- Better drag and drop support

### File Types Supported
1. Markdown files (.md, .markdown, .mdown, .mkdn, .mdx, .mkd, .mdwn, .mdtxt, .mdtext, .text)
2. PDF files (.pdf)

---

*Smart Reader now supports both Markdown and PDF documents with a beautiful, modern interface!*
