import { app, BrowserWindow } from 'electron';
import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import root from './root';
import * as path from 'path';
import { gracefulShutdown } from './lib/service';
import { closeDatabase } from './modules/database/database';

export let mainWindow: BrowserWindow;

const PATH_TO_HTML_PAGE = process.env.OLD_VIEW ?
    '../src/index-deprecated.html' : '../dist/view/index.html';

app.on('ready', () => {
    root();

    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
    mainWindow.loadFile(path.join(__dirname, PATH_TO_HTML_PAGE));
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
