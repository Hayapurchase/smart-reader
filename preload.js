const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('open-file-dialog'),
  getFileContent: (filePath) => ipcRenderer.invoke('get-file-content', filePath),
  onFileOpened: (callback) => ipcRenderer.on('file-opened', callback),
  onToggleDarkMode: (callback) => ipcRenderer.on('toggle-dark-mode', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});
