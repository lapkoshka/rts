import * as EventEmitter from 'events';
import { ChildProcess } from 'child_process';

export interface RFIDTag {
    uid: string;
    rssi?: number;
}

export interface ProtocolMessages {
    START_LISTEN: string;
    CONTINUE_LISTEN?: string;
}

export enum READER_EVENT {
    TAG = 'tag',
    ON_IP_RECIEVED = 'onIpReceived',
    CONNECTING_FAILED = 'connectingFailed',
    CONNECTING_START = 'connectingStart',
    CONNECTED = 'connected',
    DISCONNECT = 'disconnect',
}

abstract class BaseReader extends EventEmitter {
    public type: string;
    public PROTOCOL: ProtocolMessages;
    public isConnected: boolean;
    public process: ChildProcess;
    public exeFilePath: string;

    constructor(path: string) {
        super();
        this.process = null;
        this.isConnected = false;
        this.exeFilePath = process.cwd() + path;
    }

    public startListen(): void {
        this.open().then(() => {
            this.sendMessage(this.PROTOCOL.START_LISTEN);
        }).catch((msg: string) => {
            this.emit('connectingFailed', msg);
            console.log(msg);
        });
    }

    public abstract open(): Promise<string>;

    public sendMessage(message: string): void {
        if (this.isConnected) {
            this.process.stdin.write(message);
        } else {
            throw new Error(`${this.type} does not connected`);
        }
    }

    public kill(): void {
        if (!this.process) {
            return;
        }

        this.isConnected = false;
        this.process.kill();
        this.emit(READER_EVENT.DISCONNECT, `${this.type} app was disconnected`);

        console.log(`${this.type} process was killed`);
    }

    public fakeTag(uid: string, rssi?: number): void {
        this.emit('tag', {
            uid: uid || `FAKE_${this.type}_TAG:123456789`,
            rssi: rssi === undefined ? 999 : rssi,
        });
    }
}
export default BaseReader;