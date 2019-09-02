import { ipcMain } from 'electron';
import { mainWindow } from '../../index';

export interface RootDispatcher {
    sendEvent: (type: string, data?: any) => void;
    addPageListener: (type: string, listener: (evt: any, data: any) => void) => void;
}

const rootDispatcher: RootDispatcher = {
    sendEvent(type: string, data?: any): void {
        mainWindow.webContents.send(type, data);
    },
    addPageListener(type: string, listener: Function): void {
        ipcMain.on(type, listener);
    },
};

export default rootDispatcher;
