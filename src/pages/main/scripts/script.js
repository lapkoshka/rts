const { ipcRenderer } = require('electron');

function sendRendererEvent(type, data) {
    ipcRenderer.send(type, data);
};

function onRendererEvent(type, listener) {
    ipcRenderer.on(type, listener)
};

sendRendererEvent('loaded', 'hi');