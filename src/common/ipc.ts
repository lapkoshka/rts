import { IpcRenderer } from 'electron';
// @ts-ignore
export const getIpcRenderer = (): IpcRenderer => window.require('electron').ipcRenderer;

