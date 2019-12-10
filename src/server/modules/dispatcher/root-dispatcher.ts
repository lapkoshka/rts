import { ipcMain, BrowserWindow } from 'electron';

export interface RootDispatcher {
    sendEvent: (type: string, data?: any) => void;
    addPageListener: (type: string, listener: (evt: any, data: any) => void) => void;
}

export const rootDispatcher: RootDispatcher = {
    sendEvent(type: string, data?: any): void {
        BrowserWindow.getAllWindows().forEach((win: BrowserWindow) => {
            win.webContents.send(type, data);
        });
    },
    addPageListener(type: string, listener: Function): void {
        ipcMain.on(type, listener);
    },
};
