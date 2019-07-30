import { ChildProcess, spawn } from 'child_process';
import * as EventEmitter from 'events';
import * as fs from 'fs';

const P_READER_MSG = {
    START_LISTEN: 'start_listen\r\n',
    CONTINUE_LISTEN: 'continue_listen\r\n',
};

const EXE_FILE_PATH = process.cwd() + '/bin/portablereader.exe';

class PortableReader extends EventEmitter {
    private process: ChildProcess;
    private isConnected: boolean;

    constructor() {
        super();
        this.process = null;
        this.isConnected = false;
    }

    public startListen(): void {
        this.open().then(() => {
            this.sendMessage(P_READER_MSG.START_LISTEN);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    public continue(): void {
        this.sendMessage(P_READER_MSG.CONTINUE_LISTEN);
    }

    public kill(): void {
        if (!this.process) {
            return;
        }

        this.process.kill();
        console.log('Portable reader process was killed');
    }

    public fakeTag(tag: string): void {
        this.emit('tag', tag || 'FAKE_PORTABLE_READER_TAG:123456789');
    }

    private open(): Promise<string> {
        this.emit('connectingStart');
        if (!fs.existsSync(EXE_FILE_PATH)) {
            const msg = `${EXE_FILE_PATH} not found`;
            this.emit('connectingFailed', msg);
            return Promise.reject(msg);
        }

        return new Promise((resolve, reject) => {
            const delay = '200';
            this.process = spawn(EXE_FILE_PATH, [delay]);
            this.process.stdout.on('data', (data: string) => {
                const [status, message] = data.toString().trim().split(':');

                if (status === 'tag') {
                    this.emit('tag', message);

                    return;
                }

                if (status === 'error') {
                    this.emit('connectingFailed', message);
                    reject(`Connected to portable reader failed, message: ${message}`);
                    return;
                }

                if (status === 'ok' && message === 'connected') {
                    this.isConnected = true;
                    this.emit('connected');
                    resolve();

                    return;
                }
            });

            // TODO: CATCH ERROR IF READER DISCONNECT
            this.process.on('close', (code, signal) => {
                console.log('Portable reader process was closed', code, signal);
            });
        });
    }

    private sendMessage(message: string): void {
        if (this.isConnected) {
            this.process.stdin.write(message);
        } else {
            throw new Error('Portable reader does not connected');
        }
    }
}

export default PortableReader;
