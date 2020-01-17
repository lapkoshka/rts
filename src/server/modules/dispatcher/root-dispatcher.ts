import { ipcMain, BrowserWindow } from 'electron';

export interface RootDispatcher {
    sendEvent: <T>(type: string, data?: T) => void;
    addPageListener: (type: string, listener: (evt: any, data: any) => void) => void;
}

export const rootDispatcher: RootDispatcher = {
    sendEvent(type, data?): void {
        BrowserWindow.getAllWindows().forEach((win: BrowserWindow) => {
            win.webContents.send(type, data);
        });
    },
    addPageListener(type: string, listener: Function): void {
        ipcMain.on(type, listener);
    },
};
