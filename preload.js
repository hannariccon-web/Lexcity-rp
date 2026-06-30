const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  launchGame: (data) => ipcRenderer.invoke('launch-game', data),
  checkSampInstall: () => ipcRenderer.invoke('check-samp-install'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
