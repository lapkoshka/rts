'use strict';
const exec = require('child_process').execFile;
const spawn = require('child_process').spawn;


module.exports = class MainReader {
    constructor() {
        this.ip = null;
        this.process = null;
        this.isConnected = false;

        this.onConnected = null;
        this.onTag = null;
    }

    open() {
        const scantime = '20';
        const args = [Q_VALUE._4, SESSION.AUTO, scantime];
        this.process = spawn(process.cwd() + '/bin/MainReaderAdapter.exe', args);
        this.process.stdout.on('data', data => {
            if (!this.isConnected) {
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
            } else {
                const chunk = data.toString().trim().split('\n');
                chunk.forEach(tag => {
                    const [status, message] = tag.split(':');
                    if (status === 'tag') {
                        this.onTag(message.replace('\r', ''));
                    } else {
                        throw new Error('Something went wrong with tag', tag);
                    }
                });
            }

        });
            
        this.process.on('close', (code, signal) => {
            console.log('Main reader process was closed', code, signal);
        });
    }

    startListen() {
        if (this.isConnected) {
            this.process.stdin.write("1\r\n");
        } else {
            throw new Error('Main reader does not connected');
        }
    }

    kill() {
        this.process.kill();
        console.log('Main reader process was killed');
    }
}

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
}

const SESSION = {
    _0: '0',
    _1: '1',
    _2: '2',
    _3: '3',
    AUTO: '255'
}