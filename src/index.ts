import { app, BrowserWindow, ipcMain } from 'electron';
import root from './root';
import MainReader from './lib/readers/main-reader';
import PortableReader from './lib/readers/portable-reader';
import * as path from 'path';
import { gracefulShutdown } from './modules/service';
import { closeDatabase } from './modules/database';


export interface RootDispatcher {
  sendEvent: (type: string, data?: any) => void;
  addPageListener: (type: string, listener: Function) => void;
}

let window: BrowserWindow;

const rootDispatcher: RootDispatcher = {
  sendEvent(type: string, data?: any): void {
    window.webContents.send(type, data);
  },
  addPageListener(type: string, listener: Function): void {
    ipcMain.on(type, listener);
  },
};

// TODO: search and kill unclosed process depends on OS
const mainReader = new MainReader('/bin/MainReaderAdapter.exe');
const portableReader = new PortableReader('/bin/portablereader.exe');

app.on('ready', () => {
  window = new BrowserWindow({width: 1600, height: 800});
  root(mainReader, portableReader, rootDispatcher);

  window.loadFile(path.join(__dirname, '../src/index.html'));

  // Open the DevTools.
  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
});

gracefulShutdown(app,  () => {
  mainReader.kill();
  portableReader.kill();
  closeDatabase();
});
