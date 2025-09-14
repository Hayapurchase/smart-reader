# Smart Reader

A smart and elegant desktop application for reading and rendering Markdown and PDF files, built with Electron.

## Features

- 📖 **Markdown Support** - Render Markdown files with syntax highlighting
- 📄 **PDF Support** - View PDF documents directly in the application
- 🎨 **Modern UI** - Clean and intuitive interface
- ⚡ **Fast Performance** - Optimized for quick startup and smooth operation
- 🖱️ **File Association** - Right-click to open files with Smart Reader
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔍 **Zoom Controls** - Zoom in/out for better readability
- 📱 **Responsive** - Adapts to different window sizes

## Supported File Types

- `.md` - Markdown files
- `.markdown` - Markdown files
- `.mdown` - Markdown files
- `.mkdn` - Markdown files
- `.mdx` - Markdown files
- `.mkd` - Markdown files
- `.mdwn` - Markdown files
- `.mdtxt` - Markdown files
- `.mdtext` - Markdown files
- `.text` - Text files
- `.pdf` - PDF files

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-reader.git
   cd smart-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm start
   ```

4. **Build the application**
   ```bash
   npm run build:portable
   ```

## Usage

### Running the Application

1. **Development Mode**
   ```bash
   npm start
   ```

2. **Production Build**
   ```bash
   npm run build:portable
   ```
   The built application will be in the `dist/win-unpacked/` folder.

### File Association Setup

To enable right-click "Open with Smart Reader" functionality:

1. **Build the application first**
   ```bash
   npm run build:portable
   ```

2. **Run the file association script as Administrator**
   - Right-click on `register-file-association.bat`
   - Select "Run as administrator"
   - Follow the prompts

3. **Test the association**
   - Right-click on any `.md` or `.pdf` file
   - Select "Open with Smart Reader"

## Development

### Project Structure

```
smart-reader/
├── main.js                 # Main Electron process
├── preload.js             # Preload script
├── renderer/              # Renderer process files
│   ├── index.html         # Main HTML file
│   ├── renderer.js        # Renderer JavaScript
│   └── styles.css         # Application styles
├── assets/                # Application assets
│   ├── icon.png           # Application icon
│   └── icon_256.png       # High-res icon
├── docs/                  # Documentation files
├── dist/                  # Build output
└── package.json           # Project configuration
```

### Available Scripts

- `npm start` - Start the application in development mode
- `npm run dev` - Start with development tools
- `npm run build` - Build the application
- `npm run build:portable` - Build portable version
- `npm run build:win` - Build Windows version
- `npm run build:mac` - Build macOS version
- `npm run build:linux` - Build Linux version

### Building for Different Platforms

**Windows:**
```bash
npm run build:win
```

**macOS:**
```bash
npm run build:mac
```

**Linux:**
```bash
npm run build:linux
```

## Configuration

### Customizing the Application

- **Icon**: Replace `assets/icon_256.png` with your custom icon
- **App Name**: Update `productName` in `package.json`
- **Supported Files**: Modify file filters in `main.js`

### Performance Optimization

The application includes several performance optimizations:

- Disabled unnecessary Chrome features
- Optimized window creation
- ASAR packaging for faster file loading
- Background throttling disabled
- GPU acceleration optimized

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://electronjs.org/)
- Markdown rendering with [marked](https://marked.js.org/)
- Syntax highlighting with [highlight.js](https://highlightjs.org/)
- PDF rendering with [PDF.js](https://mozilla.github.io/pdf.js/)

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/smart-reader/issues) page
2. Create a new issue with detailed information
3. Include your operating system and Node.js version

---

Made with ❤️ using Electron
