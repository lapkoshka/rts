import { ipcMain, BrowserWindow } from 'electron';
import PortableReader from "./lib/readers/portable-reader";
import { Tag } from "./lib/readers/entities";
import { User } from './lib/users'
// var sqlite3 = require('sqlite3').verbose();
import { verbose, Database } from 'sqlite3';
const sqlite3 = verbose();


class MainPageRoot {
    private portableReader: PortableReader;
    private window: BrowserWindow;
    private db: Database;

    constructor(window: BrowserWindow, portableReader: PortableReader) {
        this.window = window;
        this.portableReader = portableReader;
        // this.db = new sqlite3.Database('./database/rts.db');
        this.db = new sqlite3.Database(':memory:');

        this.init();
    }

    private init(): void {
        this.initPortableReader();

        this.addPageListener('fakeTag', () => {
            this.portableReader.fakeTag();
        });

        this.addPageListener('onCancelRegistration', () => {
            this.portableReader.continue();
        });

        this.addPageListener('onRegistrationSubmit', (evt: any, user: User) => {
            const { uid, firstname, lastname } = user;
            console.log(uid, firstname, lastname);

            this.portableReader.continue();
        })
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
