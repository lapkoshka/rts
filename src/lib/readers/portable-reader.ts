import { ChildProcess, spawn } from 'child_process';
import * as fs from 'fs';
import BaseReader, { ProtocolMessages } from './base-reader';

const P_READER_MSG: ProtocolMessages = {
    START_LISTEN: 'start_listen\r\n',
    CONTINUE_LISTEN: 'continue_listen\r\n',
};

class PortableReader extends BaseReader {
    constructor(path: string) {
        super(path);
        this.type = 'PORTABLE_READER';
        this.PROTOCOL = P_READER_MSG;
    }

    public continue(): void {
        if (this.isConnected) {
            this.sendMessage(this.PROTOCOL.CONTINUE_LISTEN);
        }
    }

    public open(): Promise<string> {
        this.emit('connectingStart');
        if (!fs.existsSync(this.exeFilePath)) {
            const msg = `${this.exeFilePath} not found`;
            return Promise.reject(msg);
        }

        return new Promise((resolve, reject) => {
            const delay = '200';
            this.process = spawn(this.exeFilePath, [delay]);
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

            this.process.on('close', (code, signal) => {
                console.log('Portable reader process was closed', code, signal);
            });
        });
    }
}

export default PortableReader;
