const { BrowserWindow, screen } = require('electron');
const path = require('path');

// 悬浮球
const createSuspensionWindow = (suspensionConfig) => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: suspensionConfig.width,
    height: suspensionConfig.height,
    type: 'toolbar',
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'views/FloatBall/index.html'));
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 150, top: screen.getPrimaryDisplay().workAreaSize.height - 100 }
  // mainWindow.setBounds({ x: left, y: top, width: suspensionConfig.width, height: suspensionConfig.height })
  win.setPosition(left, top)
  // mainWindow.setIgnoreMouseEvents(true, { forward: true })
  // win.webContents.openDevTools({mode:'detach'})

  return win
};

const createEssayWindow = () => {
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 400, top: screen.getPrimaryDisplay().workAreaSize.height - 800 }
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    minWidth: 300,
    x: left,
    y: top,
    icon: path.join(__dirname, './assets/edit-green.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, 'views/Essay/index.html'));
  // win.webContents.openDevTools()
  return win
}

const createTodoWindow = () => {
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 380, top: screen.getPrimaryDisplay().workAreaSize.height - 820 }
  const win = new BrowserWindow({
    width: 300,
    minWidth: 300,
    height: 500,
    x: left,
    y: top,
    icon: path.join(__dirname, './assets/edit-green.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, 'views/Todo/index.html'));
  // win.webContents.openDevTools()
  return win
}

const createConfigWindow = () => {
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 360, top: screen.getPrimaryDisplay().workAreaSize.height - 840 }
  const win = new BrowserWindow({
    width: 300,
    minWidth: 300,
    maxWidth: 300,
    height: 500,
    x: left,
    y: top,
    icon: path.join(__dirname, './assets/edit-green.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, 'views/Config/index.html'));
  // win.webContents.openDevTools()
  return win
}

module.exports = {
  createSuspensionWindow,
  createEssayWindow,
  createTodoWindow,
  createConfigWindow
}