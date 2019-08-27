import { app, BrowserWindow } from 'electron';
import root from './root';
import MainReader from './lib/readers/main-reader';
import PortableReader from './lib/readers/portable-reader';
import * as path from 'path';
import { gracefulShutdown } from './modules/service';
import { closeDatabase } from './modules/database/database';

export let mainWindow: BrowserWindow;

const mainReader = new MainReader('/bin/MainReaderAdapter.exe');
const portableReader = new PortableReader('/bin/portablereader.exe');

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 1600, height: 800});
    root(mainReader, portableReader);

    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

gracefulShutdown(app,  () => {
    mainReader.kill();
    portableReader.kill();
    closeDatabase();
});
