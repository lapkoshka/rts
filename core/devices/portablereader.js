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
        const delay = '2000';
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

    kill() {
        this.process.kill();
        console.log('Portable reader process was killed');
    }

}