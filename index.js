// This is usually very slim. Only to open a renderer
//console.log here gets logged on node's console

const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow;

app.on('ready', () => {
  const index = path.join(__dirname, 'index.html')
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file:///${index}`);

  mainWindow.webContents.on('will-navigate', (e, url) => {
    //Intercepts a file being dropped in
    e.preventDefault();

    //Sending command to loader to navigate to link
    mainWindow.webContents.send('navigate', url);
  })
});