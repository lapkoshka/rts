import { app, BrowserWindow } from 'electron';
import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import root from './root';
import * as path from 'path';
import { gracefulShutdown } from './lib/service';
import { closeDatabase } from './modules/database/database';

export let mainWindow: BrowserWindow;

app.on('ready', () => {
    root();

    mainWindow = new BrowserWindow({width: 1600, height: 800});
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
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
