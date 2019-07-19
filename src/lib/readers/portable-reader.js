const { spawn } = require('child_process');
const EventEmitter = require('events');
const fs = require('fs');

const pREADER_MSG = {
    START_LISTEN: 'start_listen\r\n',
    CONTINUE_LISEN: 'continue_listen\r\n'
};

const EXE_FILE_PATH = '/bin/portablereader.exe';

class PortableReader extends EventEmitter {
    constructor() {
        super();
        this.process = null;
        this.isConnected = false;
    }

    startListen() {
        this._open().then(_ => {
            this._sendMessage(pREADER_MSG.START_LISTEN);
        }).catch(err => {
            console.log(err);
        });

    }

    continue() {
        this._sendMessage(pREADER_MSG.CONTINUE_LISTEN);
    }

    kill() {
        if (!this.process) {
            return;
        }

        this.process.kill();
        console.log('Portable reader process was killed');
    }

    fakeTag() {
        this.emit('tag', 'FAKE_TAG_UID:123456789');
    }

    _open() {
        this.emit('connectingStart');
        const msg = `${EXE_FILE_PATH} not found`;
        if (!fs.existsSync(EXE_FILE_PATH)) {
            this.emit('connectedFailed', msg);
            return Promise.reject(msg);
        }

        return new Promise((resolve, reject) => {
            const delay = '200';
            this.process = spawn(process.cwd() + EXE_FILE_PATH, [delay]);
            this.process.stdout.on('data', data => {
                const [status, message] = data.toString().trim().split(':');

                if (status === 'error') {
                    this.emit('connectedFailed', message);
                    reject('Connected to portable reader failed, message: ', message);
                    return;
                }

                if (status === 'ok' && message === 'connected') {
                    this.isConnected = true;
                    this.emit('connected');
                    resolve();

                    return;
                }

                if (status === 'tag') {
                    this.emit('tag', message);

                    return;
                }
            });

            //TODO CATCH ERROR IF READER DISCONNECT
            this.process.on('close', (code, signal) => {
                console.log('Portable reader process was closed', code, signal);
            });
        });
    }

    _sendMessage(message) {
        if (this.isConnected) {
            this.process.stdin.write(message);
        } else {
            throw new Error('Portable reader does not connected');
        }
    }
}

module.exports = PortableReader;
