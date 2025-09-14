# Smart Reader - Feature Update

## New Features Added

### 📄 PDF Support
- **PDF.js Integration**: Full PDF viewing support using PDF.js library
- **Navigation Controls**: Previous/Next page buttons with keyboard shortcuts
- **Zoom Controls**: Zoom in, zoom out, and fit-to-width functionality
- **Page Information**: Display current page and total pages
- **Canvas Rendering**: High-quality PDF rendering on HTML5 canvas

### 🎛️ Side Panel
- **Document Type Switcher**: Toggle between Markdown and PDF viewing modes
- **Toggle Button**: Hamburger menu button to show/hide side panel
- **Smooth Animations**: CSS transitions for panel show/hide
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Shortcut**: `Ctrl+B` or `\` to toggle panel

### 🔧 Enhanced File Handling
- **File Type Detection**: Automatic detection of Markdown vs PDF files
- **Multiple File Types**: Support for various Markdown extensions and PDF files
- **Drag & Drop**: Enhanced drag and drop for both file types
- **File Dialogs**: Updated file open dialogs with proper filters

## Technical Implementation

### Dependencies Added
- `pdfjs-dist`: PDF.js library for PDF rendering and manipulation

### Files Modified
- `package.json`: Added PDF.js dependency
- `main.js`: Enhanced file handling and type detection
- `renderer/index.html`: Added side panel and PDF viewer UI
- `renderer/styles.css`: Added styling for side panel and PDF viewer
- `renderer/renderer.js`: Complete PDF functionality and side panel logic

### New UI Components
- Side panel with document type buttons
- PDF viewer with toolbar and canvas
- Enhanced file type indicators
- Improved empty state messaging

## Keyboard Shortcuts

### General
- `Ctrl+O` - Open file dialog
- `Ctrl+D` - Toggle dark mode
- `Ctrl+,` - Open settings
- `Ctrl+R` - Toggle reading mode
- `Ctrl+B` or `\` - Toggle side panel
- `Escape` - Close modals and panels

### Markdown Mode
- `Ctrl++` - Increase font size
- `Ctrl+-` - Decrease font size
- `Ctrl+0` - Reset font size

### PDF Mode
- `Ctrl++` - Zoom in
- `Ctrl+-` - Zoom out
- `Ctrl+0` - Reset zoom to 100%
- `←` / `→` - Navigate pages
- `Home` - Go to first page
- `End` - Go to last page

## Supported File Types

### Markdown Files
- `.md` - Standard Markdown
- `.markdown` - Alternative Markdown extension
- `.mdown`, `.mkdn`, `.mdx` - Other Markdown variants
- `.mkd`, `.mdwn`, `.mdtxt`, `.mdtext` - Additional Markdown extensions
- `.text` - Plain text files

### PDF Files
- `.pdf` - Portable Document Format files

## Usage Instructions

1. **Opening Files**:
   - Use `Ctrl+O` or click "Open File" to browse for documents
   - Drag and drop files directly into the application
   - Files are automatically detected as Markdown or PDF

2. **Switching Document Types**:
   - Click the hamburger menu button to open the side panel
   - Click "Markdown" or "PDF" to switch viewing modes
   - The application remembers the current document type

3. **PDF Navigation**:
   - Use the toolbar buttons or keyboard shortcuts to navigate
   - Zoom controls adjust the PDF scale
   - "Fit Width" automatically scales to container width

4. **Side Panel**:
   - Toggle with the hamburger menu or `Ctrl+B`
   - Click outside the panel to close it
   - Panel automatically closes on mobile devices

## Browser Compatibility

The application uses modern web technologies:
- HTML5 Canvas for PDF rendering
- CSS Grid and Flexbox for layout
- ES6+ JavaScript features
- PDF.js for PDF processing

## Future Enhancements

Potential areas for future development:
- PDF text search functionality
- PDF annotations support
- Additional document formats (Word, RTF, etc.)
- Document thumbnails in side panel
- Split-view for multiple documents
- PDF form filling capabilities

---

*Smart Reader now provides a comprehensive document viewing experience with support for both Markdown and PDF files!*
