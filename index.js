// This is usually very slim. Only to open a renderer

const { app, BrowserWindow } = require ('electron')
const path = require('path')

let mainWindow;

app.on('ready', () => {
  const index = path.join(__dirname, 'index.html')
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file:///${index}`);
});