# 📝 Markdown Reader Desktop App – Development Guidelines

## 📌 Objective

Create a cross-platform desktop application to **read and render Markdown files** with a clean UI, basic file navigation, and live preview of Markdown content.

---

## ⚙️ Tech Stack

| Layer             | Tech/Tool                       |
|------------------|----------------------------------|
| Platform         | [Electron.js](https://www.electronjs.org/) |
| UI Framework     | HTML, CSS, [TailwindCSS](https://tailwindcss.com/) or [React](https://reactjs.org/) |
| Markdown Parser  | [Marked.js](https://marked.js.org/) or [Showdown](https://github.com/showdownjs/showdown) |
| File Handling    | Node.js `fs` module              |
| Optional Features| Monaco Editor, Highlight.js      |

---

## 🗂️ Project Structure

markdown-reader/
├── main.js # Electron main process
├── package.json # App metadata & dependencies
├── preload.js # Preload scripts (if needed)
├── /renderer # Frontend files
│ ├── index.html # Main UI layout
│ ├── styles.css # Custom styles or Tailwind
│ └── renderer.js # DOM interaction & Markdown rendering
├── /assets # Icons, logos, etc.
└── /docs # Sample .md files (for testing)

yaml
Copy code

---

## 🛠️ Setup Instructions

### 1. 📦 Initialize the Project

```bash
mkdir markdown-reader && cd markdown-reader
npm init -y
npm install electron marked
2. 📁 Create the Core Files
main.js – Starts the Electron app and loads the UI.

index.html – Holds the interface with an input and rendered output section.

renderer.js – Parses Markdown and injects it into the DOM.

🧠 Core Features to Implement
✅ File Open Dialog
Let users open .md files via:

File menu (File > Open)

Button on UI ("Open Markdown File")

Use Electron’s dialog.showOpenDialog for file selection.

✅ Markdown Rendering
Use marked() to convert .md content into HTML.

Inject the HTML into a container (e.g., <div id="preview">).

✅ File Watch (Optional)
Watch the opened file for changes and auto-update preview.

✅ Syntax Highlighting (Optional)
Use highlight.js to highlight code blocks inside Markdown.

📄 Example Code Snippets
main.js
js
Copy code
const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);
renderer.js
js
Copy code
const marked = require('marked');
const fs = require('fs');

document.getElementById('openFile').addEventListener('click', async () => {
  const { dialog } = require('electron').remote;
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'Markdown', extensions: ['md'] }],
    properties: ['openFile']
  });

  if (!result.canceled) {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    document.getElementById('preview').innerHTML = marked(content);
  }
});
index.html
html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Markdown Reader</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <button id="openFile">Open Markdown File</button>
  <div id="preview"></div>
  <script src="renderer.js"></script>
</body>
</html>
🎨 Optional Enhancements
Feature	Description
Dark Mode	Toggle light/dark theme
Live Preview	Auto-update preview as file is edited
Drag & Drop	Drop .md file into app window
Tabs	Support multiple Markdown files at once
Search	Ctrl+F to search in content
Print to PDF	Export rendered markdown as PDF

🚀 Build & Package
Use Electron Forge or Electron Builder to package the app:

bash
Copy code
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
✅ Final Notes
Test on Windows, macOS, and Linux.

Ensure security by disabling nodeIntegration if not required.

Keep UI minimal and content-focused.

