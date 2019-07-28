import { ipcMain, BrowserWindow } from 'electron';
import PortableReader from "./lib/readers/portable-reader";
import { User } from './lib/users'
import { verbose, Database } from 'sqlite3';
const sqlite3 = verbose();

const DATABASE_PATH = './database/rts.db';

class MainPageRoot {
    private portableReader: PortableReader;
    private window: BrowserWindow;
    private db: Database;

    constructor(window: BrowserWindow, portableReader: PortableReader) {
        this.window = window;
        this.portableReader = portableReader;
        this.db = this.connectDatabase();

        // TODO: need return promise?
        this.prepareDatabase();
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
            this.submitNewUser(user);
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

        this.portableReader.on('tag', async (tag: string) => {
            const user = await this.getUser(tag);

            this.sendEvent('onPortableReaderTag', user);

        });

        this.portableReader.startListen();
    }

    private addPageListener(type: string, listener: Function) {
        ipcMain.on(type, listener);
    }

    private sendEvent(type: string, data?: any) {
        this.window.webContents.send(type, data);
    }

    private connectDatabase(): Database {
        return new sqlite3.Database(DATABASE_PATH, (err: Error) => {
            if (err) {
              throw Error(err.message);
            }

            console.log(`Connected to the ${DATABASE_PATH} SQlite database.`);
        });
    }

    private prepareDatabase():void {
        // something wrong with res and err types
        this.db.run(`create table if not exists users(
            uid not null unique,
            firstname text,
            lastname text,
            thirdname text,
            email text,
            phone text,
            about text,
            number integer,
            dob integer,
            city text,
            bike text
        );`);
    }

    private submitNewUser(user: User): void {
        if (user.alreadyRegistred) {
            this.updateUser(user);
            return;
        }

        this.insertUser(user);
    }

    private async getUser(uid: string): Promise<User> {
        const user: User = {
            uid,
            alreadyRegistred: false
        };

        return new Promise((resolve, reject) => {
            this.db.get(`select * from users where uid = (?)`, [uid], (err, row) => {
                if (!row) {
                    resolve(user);
                    return;
                }

                user.alreadyRegistred = true;
                resolve(Object.assign(user, row));
            })
        });
    }

    private updateUser(user: User): void {
        const { uid, firstname, lastname } = user;
        console.log(firstname, lastname);
        this.db.run(`update users 
        set
        firstname = (?),
        lastname = (?)
        where uid = (?)
        `, [firstname, lastname, uid], (err: any, row: any) => {
            console.log(err, row);
            if (err) {
                // TODO: logger for exceptions with gui on client
                throw Error(`Something went wrong with user update: ${err.message}`);
            }

            console.log('User updated');
        });
    }

    private insertUser(user: User): void {
        const { uid, firstname, lastname } = user;

        this.db.run(`insert into users(
            uid,
            firstname,
            lastname
            ) values (?, ?, ?)`, [uid, firstname, lastname], function(err) {

            const isUserAlreadyExist = err && 
                err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.uid';
            if (isUserAlreadyExist) {
                // TODO: logger for exceptions with gui on client
                throw Error(`User with uid ${uid} already exist`);
            }

            console.log(`A row has been inserted with uid ${uid}`);
        });
    }
}

export default MainPageRoot;
