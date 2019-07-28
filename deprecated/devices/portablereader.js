'use strict';
const exec = require('child_process').execFile;
const spawn = require('child_process').spawn;

module.exports = class PortableReader {
    constructor() {
        this.process = null;
        this.isConnected = false;
        
        this.onConnected = null;
        this.onTag = null;
    }

    open() {
        const delay = '200';
        this.process = spawn(process.cwd() + '/bin/portablereader.exe', [delay]);
        this.process.stdout.on('data', data => {
            const [status, message] = data.toString().trim().split(':');
            if (this.onConnected === null || this.onTag === null) {
                this.onConnected('Handlers must be assigned');
                return;
            }

            if (status === 'error') {
                this.onConnected(message);
                return;
            }

            if (status === 'ok' && message === 'connected') {
                this.isConnected = true;
                this.onConnected();
                return;
            }

            if (status === 'tag') {
                this.onTag(message);
                return;
            }
        });

        //TODO CATCH ERROR IF READER DISCONNECT
        this.process.on('close', (code, signal) => {
            console.log('Portable reader process was closed', code, signal);
        });
    }

    startListen() {
        this._sendMessage(pREADER_MSG.START);
    }

    continue() {
        this._sendMessage(pREADER_MSG.CONTINUE);
    }

    _sendMessage(message) {
        if (this.isConnected) {
            this.process.stdin.write(message);
        } else {
            throw new Error('Portable reader does not connected');
        }
    }

    kill() {
        this.process.kill();
        console.log('Portable reader process was killed');
    }

}

const pREADER_MSG = {
    START: '1\r\n',
    CONTINUE: '2\r\n'
};