const { app, BrowserWindow, dialog, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  // Create the browser window with optimized settings
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      // Performance optimizations
      backgroundThrottling: false,
      offscreen: false,
      experimentalFeatures: false
    },
    icon: path.join(__dirname, 'assets/icon_256.png'),
    titleBarStyle: 'default',
    show: false,
    backgroundColor: '#f9fafb',
    title: 'Smart Reader',
    // Performance optimizations
    frame: true,
    transparent: false,
    hasShadow: true,
    thickFrame: false,
    skipTaskbar: false,
    alwaysOnTop: false,
    fullscreenable: true,
    resizable: true,
    minimizable: true,
    maximizable: true,
    closable: true
  });

  // Load the index.html file with optimizations
  mainWindow.loadFile('renderer/index.html');

  // Performance optimizations
  mainWindow.webContents.on('dom-ready', () => {
    // Disable unnecessary features for faster startup
    mainWindow.webContents.setZoomFactor(1.0);
  });

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Focus the window for better user experience
    mainWindow.focus();
  });

  // Open DevTools in development
  if (process.argv.includes('--dev') || process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create application menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open Document',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            openFile();
          }
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Dark Mode',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.send('toggle-dark-mode');
          }
        },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        },
        { type: 'separator' },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(currentZoom + 0.1);
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(Math.max(0.5, currentZoom - 0.1));
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            mainWindow.webContents.setZoomFactor(1);
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Smart Reader',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Smart Reader',
              message: 'Smart Reader v1.0.0',
              detail: 'A smart and elegant desktop application for reading Markdown files.\n\nExperience intelligent markdown reading with smart features.\n\nBuilt with Electron and love ❤️'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Open file dialog
async function openFile() {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'mdown', 'mkdn', 'mdx', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text'] },
      { name: 'PDF Files', extensions: ['pdf'] },
      { name: 'All Supported Files', extensions: ['md', 'markdown', 'mdown', 'mkdn', 'mdx', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text', 'pdf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const fileType = getFileType(filePath);
    
    try {
      if (fileType === 'pdf') {
        // For PDF files, send the file path and type without reading content
        mainWindow.webContents.send('file-opened', { filePath, fileType });
      } else {
        // For text files (markdown), read the content
        const content = fs.readFileSync(filePath, 'utf-8');
        mainWindow.webContents.send('file-opened', { filePath, content, fileType });
      }
    } catch (error) {
      dialog.showErrorBox('Error', `Failed to read file: ${error.message}`);
    }
  }
}

// Get file type based on extension
function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    return 'pdf';
  } else if (ext.match(/\.(md|markdown|mdown|mkdn|mdx|mkd|mdwn|mdtxt|mdtext|text)$/)) {
    return 'markdown';
  }
  return 'unknown';
}

// Handle file drop
function handleFileDrop(filePath) {
  const fileType = getFileType(filePath);
  
  if (fileType === 'pdf') {
    try {
      mainWindow.webContents.send('file-opened', { filePath, fileType });
    } catch (error) {
      dialog.showErrorBox('Error', `Failed to open PDF file: ${error.message}`);
    }
  } else if (fileType === 'markdown') {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      mainWindow.webContents.send('file-opened', { filePath, content, fileType });
    } catch (error) {
      dialog.showErrorBox('Error', `Failed to read file: ${error.message}`);
    }
  } else {
    dialog.showErrorBox('Error', 'Unsupported file type. Please open a Markdown or PDF file.');
  }
}

// IPC handlers
ipcMain.handle('open-file-dialog', async () => {
  await openFile();
});

ipcMain.handle('get-file-content', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-pdf-data', async (event, filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return { success: true, data: data.buffer };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle command line arguments
let fileToOpen = null;

// Check for file argument
if (process.argv.length > 2) {
  const arg = process.argv[2];
  if (arg && !arg.startsWith('--') && fs.existsSync(arg)) {
    fileToOpen = arg;
  }
}

// Performance optimizations for faster startup
app.commandLine.appendSwitch('--disable-background-timer-throttling');
app.commandLine.appendSwitch('--disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('--disable-renderer-backgrounding');
app.commandLine.appendSwitch('--disable-features', 'TranslateUI');
app.commandLine.appendSwitch('--disable-ipc-flooding-protection');
app.commandLine.appendSwitch('--disable-extensions');
app.commandLine.appendSwitch('--disable-plugins');
app.commandLine.appendSwitch('--disable-default-apps');
app.commandLine.appendSwitch('--disable-sync');
app.commandLine.appendSwitch('--disable-translate');
app.commandLine.appendSwitch('--disable-logging');
app.commandLine.appendSwitch('--silent');
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
// Additional optimizations for portable builds
app.commandLine.appendSwitch('--disable-dev-shm-usage');
app.commandLine.appendSwitch('--disable-gpu');
app.commandLine.appendSwitch('--disable-software-rasterizer');
app.commandLine.appendSwitch('--disable-background-networking');
app.commandLine.appendSwitch('--disable-client-side-phishing-detection');
app.commandLine.appendSwitch('--disable-component-update');
app.commandLine.appendSwitch('--disable-domain-reliability');
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');

// App event handlers
app.whenReady().then(() => {
  // Set the app icon
  const iconPath = path.join(__dirname, 'assets/icon_256.png');
  const icon = nativeImage.createFromPath(iconPath);
  app.dock?.setIcon(icon); // For macOS dock
  
  // For Windows, set the app icon
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.smartreader.app');
  }
  
  createWindow();
  createMenu();
  
  // Open file if provided as argument
  if (fileToOpen) {
    setTimeout(() => {
      handleFileDrop(fileToOpen);
    }, 1000); // Wait for window to be ready
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle file associations (Windows)
app.on('open-file', (event, filePath) => {
  event.preventDefault();
  if (mainWindow) {
    handleFileDrop(filePath);
  } else {
    app.once('ready', () => {
      handleFileDrop(filePath);
    });
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});
