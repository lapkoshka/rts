const { ipcRenderer } = require('electron');

function sendRendererEvent(type, data) {
    ipcRenderer.send(type, data);
};

function onRendererEvent(type, listener) {
    ipcRenderer.on(type, listener)
};

module.exports = {
    sendRendererEvent,
    onRendererEvent
}