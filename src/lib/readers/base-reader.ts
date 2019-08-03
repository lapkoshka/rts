import * as EventEmitter from 'events';
import { ChildProcess } from 'child_process';

export interface ProtocolMessages {
    START_LISTEN: string;
    CONTINUE_LISTEN?: string;
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
        this.emit('disconnected', `${this.type} app was disconnected`);

        console.log(`${this.type} process was killed`);
    }

    public fakeTag(tag: string): void {
        this.emit('tag', tag || `FAKE_${this.type}_TAG:123456789`);
    }
}
export default BaseReader;
