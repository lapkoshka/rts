import { spawn } from 'child_process';
import * as fs from 'fs';
import { RFIDTag } from '../types';
import BaseReader, { ProtocolMessages, READER_EVENT } from './base-reader';

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
    _15: '15',
};

const SESSION = {
    _0: '0',
    _1: '1',
    _2: '2',
    _3: '3',
    AUTO: '255',
};

const M_READER_MSG: ProtocolMessages = {
    START_LISTEN: 'start_listen\r\n',
};

class MainReader extends BaseReader {
    constructor(path: string) {
        super(path);
        this.type = 'MAIN_READER';
        this.PROTOCOL = M_READER_MSG;
    }

    public open(): Promise<string> {
        this.emit(READER_EVENT.CONNECTING_START);
        if (!fs.existsSync(this.exeFilePath)) {
            const msg = `${this.exeFilePath} not found`;
            return Promise.reject(msg);
        }

        return new Promise((resolve, reject) => {
            const scantime = '20';
            const args = [Q_VALUE._4, SESSION.AUTO, scantime];
            this.process = spawn(this.exeFilePath, args);
            this.process.stdout.on('data', (data: string) => {
                if (!this.isConnected) {
                    const [status, message] = data.toString().trim().split(':');

                    if (status === 'found') {
                        this.emit(READER_EVENT.ON_IP_RECIEVED, message);
                    }

                    if (status === 'error') {
                        this.emit(READER_EVENT.CONNECTING_FAILED, message);
                        reject(`Connected to main reader failed, message: ${message}`);
                        return;
                    }

                    if (status === 'ok' && message === 'connected') {
                        this.isConnected = true;
                        this.emit(READER_EVENT.CONNECTED);
                        resolve();

                        return;
                    }
                } else {
                    const chunk = data.toString().trim().split('\n');
                    chunk.forEach((line: string) => {
                        const status = line.split(':')[0];

                        if (status === 'tag') {
                            this.emit(READER_EVENT.TAG, this.parseTag(line));
                        } else {
                            throw new Error('Something went wrong with tag, line: ' + line);
                        }
                    });
                }
            });

            this.process.on('close', (code, signal) => {
                console.log('Main reader process was closed', code, signal);
            });
        });
    }

    private parseTag(data: string): RFIDTag {
        const values = data.replace('\r', '')
            .split(':');
        return {
            uid: values[1],
            rssi: parseInt(values[2], 10),
        };
    }
}

export default MainReader;
