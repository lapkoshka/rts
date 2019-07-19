const { ipcMain } = require('electron');

class MainPageRoot {
    constructor(window, portableReader) {
        this.window = window;
        this.portableReader = portableReader;

        this._init();
    }

    _init() {
        this._addPageListener('DOMContentLoaded', _ => {
            this._initPortableReader();
        });

        this._addPageListener('fakeTag', _ => {
            this.portableReader.fakeTag();
        });
    }

    _initPortableReader() {
        this.portableReader.on('connectingStart', evt => {
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
