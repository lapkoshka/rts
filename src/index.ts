import { app, BrowserWindow, ipcMain } from "electron";
import root from "./root";
import PortableReader from "./lib/readers/portable-reader";
import * as path from 'path';

//TODO: add type
export interface RootDispatcher {
  sendEvent: any;
  addPageListener: any;
}

let window: BrowserWindow;

const rootDispatcher: RootDispatcher = {
  sendEvent(type: string, data?: any) {
    window.webContents.send(type, data);
  },
  addPageListener(type: string, listener: Function) {
      ipcMain.on(type, listener)
  }
 };

const portableReader = new PortableReader();

app.on('ready', () => {
  window = new BrowserWindow({width: 1600, height: 800});
  root(portableReader, rootDispatcher);

  window.loadFile(path.join(__dirname, '../src/index.html'));

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
