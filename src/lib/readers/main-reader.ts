import { ChildProcess, spawn } from 'child_process';
import * as EventEmitter from 'events';
import * as fs from 'fs';

const EXE_FILE_PATH = process.cwd() + '/bin/MainReaderAdapter.exe';

const Q_VALUE = {
    _1: '1',
    _2: '2',
    _3: '3',
    _4: '4',
    _5: '5',
    _6: '6',
    _7: '7',
    _8: '8',
    _9: '9',
    _10: '10',
    _11: '11',
    _12: '12',
    _13: '13',
    _14: '14',
    _15: '15'
};

const SESSION = {
    _0: '0',
    _1: '1',
    _2: '2',
    _3: '3',
    AUTO: '255'
};

class MainReader extends EventEmitter {
    private process: ChildProcess;
    private isConnected: boolean;

    constructor() {
        super();
        this.process = null;
        this.isConnected = false;
    }

    private open(): Promise<string> {
        this.emit('connectingStart');
        if (!fs.existsSync(EXE_FILE_PATH)) {
            const msg = `${EXE_FILE_PATH} not found`;
            this.emit('connectingFailed', msg);
            return Promise.reject(msg);
        }

        return new Promise((resolve, reject) => {
            const scantime = '20';
            const args = [Q_VALUE._4, SESSION.AUTO, scantime];
            this.process = spawn(EXE_FILE_PATH, args);
            this.process.stdout.on('data', data => {
                if (!this.isConnected) {
                    const [status, message] = data.toString().trim().split(':');

                    if (status === 'error') {
                        // TODO: core message to uppercase
                        this.emit('connectingFailed', message);
                        reject(`Connected to main reader failed, message: ${message}`);
                        return;
                    }

                    if (status === 'ok' && message === 'connected') {
                        this.isConnected = true;
                        this.emit('connected');
                        resolve();

                        return;
                    }
                } else {
                    const chunk = data.toString().trim().split('\n');
                    chunk.forEach(line => {
                        const status = line.split(':')[0];

                        if (status === 'tag') {
                            this.emit('tag', this.parseTag(line));
                        } else {
                            // TODO: logger
                            throw new Error('Something went wrong with tag, line: ' + line);
                        }
                    });
                }
            });

            // TODO: CATCH ERROR IF READER DISCONNECT
            this.process.on('close', (code, signal) => {
                console.log('Main reader process was closed', code, signal);
            });
        });
    }

    // TODO: base readers class
    public startListen(): void {
        this.open().then(() => {
        // TODO: improve protocol naming
        // TODO: create enum with messages
            this.sendMessage("1\r\n");
        }).catch((err: any) => {
            // TODO: same logic with portable reader
            console.log(err);
        });
    }

    private sendMessage(message: string) {
        if (this.isConnected) {
            this.process.stdin.write(message);
        } else {
            throw new Error('Portable reader does not connected');
        }
    }

    // TODO:
    public stopListen(): void {

    }

    public kill(): void {
        this.process.kill();
        console.log('Main reader process was killed');
    }

    public fakeTag(tag: string): void {
        this.emit('tag', tag || 'FAKE_MAIN_READER_TAG:123456789');
    }

    private parseTag(data: string) {
        const [_, uid, rssi] = data.replace('\r', '').split(':');
        // TODO: rssi is undefined
        return {
            uid,
            rssi
        }
    }
}

export default MainReader;
