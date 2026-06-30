const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('launch-game', async (event, { serverIp, serverPort, nickname, password }) => {
  try {
    const sampPath = process.platform === 'win32'
      ? 'C:\\Program Files\\GTA San Andreas\\gta_sa.exe'
      : '/path/to/gta_sa';

    const command = `${sampPath} -h ${serverIp} -p ${serverPort} -n ${nickname}`;

    spawn(command, { shell: true });
    return { success: true, message: 'Jogo lançado com sucesso!' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('check-samp-install', async () => {
  const fs = require('fs');
  const sampPath = process.platform === 'win32'
    ? 'C:\\Program Files\\GTA San Andreas\\gta_sa.exe'
    : '/path/to/gta_sa';

  const installed = fs.existsSync(sampPath);
  return { installed, path: sampPath };
});
