const electron = require('electron')
const Controller = require('./controller.js');
const {app, BrowserWindow} = require('electron');
let win;
let root;
  
app.on('ready', () => {
  win = new BrowserWindow({width: 1600, height: 800});
  root = new Controller(win);
  root.initRegEvents();

  win.loadFile('view/reg.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.on('closed', (evt) => {
    win = null;
  })
});
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  root.killAll();
});
