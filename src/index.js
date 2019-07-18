const MainPageRoot = require('./pages/main/root');
const {app, BrowserWindow} = require('electron');
const PortableReader = require('./lib/readers/portable-reader');
let window;
let root;

const portableReader = new PortableReader();
  
app.on('ready', () => {
  window = new BrowserWindow({width: 1600, height: 800});
  root = new MainPageRoot(window, portableReader);
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

  portableReader.kill();
});
