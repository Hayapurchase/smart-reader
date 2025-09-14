# Markdown Reader

A beautiful, cross-platform desktop application for reading and viewing Markdown files.

## Features

- 🎨 **Modern UI** - Clean, responsive interface with TailwindCSS
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📁 **File Management** - Easy file opening and navigation
- 🎯 **Syntax Highlighting** - Code blocks with syntax highlighting
- 🔄 **Live Preview** - Real-time content updates
- 🖱️ **Drag & Drop** - Simply drag Markdown files into the app
- ⌨️ **Keyboard Shortcuts** - Efficient navigation and control
- 📱 **Responsive** - Works on different screen sizes

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

### Building for Distribution

To build the application for distribution:

```bash
npm run build
```

This will create distributable packages in the `dist` folder.

## Usage

### Opening Files

- Click the "Open File" button
- Use the File menu (File > Open Markdown File)
- Drag and drop a Markdown file into the application window
- Use keyboard shortcut `Ctrl+O` (or `Cmd+O` on Mac)

### Supported File Types

- `.md` - Standard Markdown files
- `.markdown` - Alternative Markdown extension
- `.mdown`, `.mkdn`, `.mdx` - Other Markdown variants
- `.mkd`, `.mdwn`, `.mdtxt`, `.mdtext` - Additional extensions
- `.text` - Plain text files

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+O` / `Cmd+O` | Open file |
| `Ctrl+D` / `Cmd+D` | Toggle dark mode |
| `F11` | Toggle fullscreen |
| `Escape` | Close overlays |
| `Ctrl+R` / `Cmd+R` | Reload application |

### Dark Mode

Toggle dark mode using:
- The dark mode button in the header
- Keyboard shortcut `Ctrl+D` (or `Cmd+D` on Mac)
- The View menu

## Technical Details

### Built With

- **Electron** - Cross-platform desktop framework
- **HTML/CSS/JavaScript** - Frontend technologies
- **TailwindCSS** - Utility-first CSS framework
- **Marked.js** - Markdown parser and compiler
- **Highlight.js** - Syntax highlighting for code blocks

### Project Structure

```
markdown-reader/
├── main.js                 # Electron main process
├── package.json           # App metadata & dependencies
├── renderer/              # Frontend files
│   ├── index.html        # Main UI layout
│   ├── styles.css        # Custom styles
│   └── renderer.js       # DOM interaction & rendering
├── assets/               # Icons and images
└── docs/                 # Sample Markdown files
```

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the application with developer tools open.

### Code Structure

- `main.js` - Handles window creation, file operations, and IPC
- `renderer/index.html` - Main UI structure
- `renderer/styles.css` - Styling and themes
- `renderer/renderer.js` - Frontend logic and Markdown rendering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/) for the desktop framework
- [Marked.js](https://marked.js.org/) for Markdown parsing
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Highlight.js](https://highlightjs.org/) for syntax highlighting

## Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include your operating system and version
4. Provide steps to reproduce any bugs

---

**Enjoy reading your Markdown files!** 📚✨
