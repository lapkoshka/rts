import { app, BrowserWindow } from "electron";
import MainPageRoot from "./pages/main/root";
import PortableReader from "./lib/readers/portable-reader";
import * as path from 'path';

let window;
let root;

const portableReader = new PortableReader();

app.on('ready', () => {
  window = new BrowserWindow({width: 1600, height: 800});
  root = new MainPageRoot(window, portableReader);

  window.loadFile(path.join(__dirname, '../src/pages/main/page.html'));

  // Open the DevTools.
  window.webContents.openDevTools()

  window.on('closed', () => {
    window = null;
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }

  portableReader.kill();
});
