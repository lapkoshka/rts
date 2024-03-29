const electron = require('electron');
const path = require('path');
const url = require('url');
const { services } = require('../build/server/services');

const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow() {
    services.start();
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 800,
        title: 'main',
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished\
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }

    services.shutdown();
});

// Close application over CTRL+C or kill process
app.on('before-quit', () => {
    services.shutdown();
});

// Close over kill process
app.on('will-quit', () => {
    services.shutdown();
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
