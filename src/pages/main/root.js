const { ipcMain } = require('electron');

class MainPageRoot {
    constructor(window) {
        this.window = window;

        this.addListener('loaded', (event, data) => console.log(data))   
    }

    addListener(type, listener) {
        ipcMain.on(type, listener);
    }

    sendEvent(type, data) {
        this.window.webContents.send(type, data);
    }
}

module.exports = MainPageRoot;