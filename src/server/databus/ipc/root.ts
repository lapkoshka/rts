import { ipcMain, BrowserWindow } from 'electron';

export class IpcRoot {
    public static send<T> (type: string, data?: T): void {
        BrowserWindow.getAllWindows().forEach((win: BrowserWindow) => {
            win.webContents.send(type, data);
        });
    }

    public static on<T>(type: string, listener: (data: T) => void): void {
        // evt: Electron.IpcMainEvent instead any after Electron version update
        ipcMain.on(type, (evt: any, data: T): void => {
            listener(data);
        });
    }
}
