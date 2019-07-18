const { ipcMain } = require('electron');

class MainPageRoot {
    constructor(window, portableReader) {
        this.window = window;
        this.portableReader = portableReader;

        this._init(); 
    }

    _init() {
        this._initPortableReader();
    }

    _initPortableReader() {
        this.portableReader.on('connectingStart', evt => {
            // 4e ne rabotaet-to?
            this._sendEvent('onPortableReaderConnectingStart');
        });
        
        this.portableReader.on('connected', evt => {
            this._sendEvent('onPortableReaderConnected');
        });

        this.portableReader.on('connectedFailed', message => {
            this._sendEvent('onPortableReaderConnectedFailed', message);
        });

        this.portableReader.on('tag', tag => {
            this._sendEvent('onPortableReaderTag', {
                user: {
                    firstname: 'FIRST',
                    lastname: 'LAST'
                },
                tag
            });
        });

        this.portableReader.startListen();
    }

    _addPageListener(type, listener) {
        ipcMain.on(type, listener);
    }

    _sendEvent(type, data) {
        this.window.webContents.send(type, data);
    }
}

module.exports = MainPageRoot;