import { ipcMain, BrowserWindow } from 'electron';
import PortableReader from "../../lib/readers/portable-reader";
import { Tag } from "../../lib/readers/entities";


class MainPageRoot {
    private portableReader: PortableReader;
    private window: BrowserWindow;

    constructor(window: BrowserWindow, portableReader: PortableReader) {
        this.window = window;
        this.portableReader = portableReader;

        this.init();
    }

    private init(): void {
        this.addPageListener('DOMContentLoaded', () => {
            this.initPortableReader();
        });

        this.addPageListener('fakeTag', () => {
            this.portableReader.fakeTag();
        });
    }

    private initPortableReader() {
        this.portableReader.on('connectingStart', () => {
            this.sendEvent('onPortableReaderConnectingStart');
        });

        this.portableReader.on('connected', () => {
            this.sendEvent('onPortableReaderConnected');
        });

        this.portableReader.on('connectedFailed', (message: string) => {
            this.sendEvent('onPortableReaderConnectedFailed', message);
        });

        this.portableReader.on('tag', (tag: Tag) => {
            this.sendEvent('onPortableReaderTag', {
                user: {
                    firstname: 'FIRST',
                    lastname: 'LAST'
                },
                tag
            });
        });

        this.portableReader.startListen();
    }

    private addPageListener(type: string, listener: Function) {
        ipcMain.on(type, listener);
    }

    private sendEvent(type: string, data?: any) {
        this.window.webContents.send(type, data);
    }
}

export default MainPageRoot;
