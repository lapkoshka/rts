const MainPageRoot = require('./pages/main/root');
const {app, BrowserWindow} = require('electron');
let window;
let root;
  
app.on('ready', () => {
  window = new BrowserWindow({width: 1600, height: 800});
  root = new MainPageRoot(window);
//   root.initRegEvents();

  window.loadFile('src/pages/main/page.html')

  // Open the DevTools.
  window.webContents.openDevTools()

  window.on('closed', (evt) => {
    window = null;
  })
});
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
//   root.killAll();
});
