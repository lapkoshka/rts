import { ipcMain, BrowserWindow } from 'electron';

let mainWidnow: BrowserWindow;
function getMainWindow(): BrowserWindow {
    if (!mainWidnow) {
        const windowList = BrowserWindow.getAllWindows();
        const win = windowList.find((win) => {
            const title = win.getTitle();
            // WRANING: fragile code, coz electron change window title to value from index.html <title> tag
            return title === 'main' || title === 'RTS';
        });

        if (!win) {
            throw Error('Main window not founded');
        }

        mainWidnow = win;
    }

    return mainWidnow;
}

export interface RootDispatcher {
    sendEvent: (type: string, data?: any) => void;
    addPageListener: (type: string, listener: (evt: any, data: any) => void) => void;
}

const rootDispatcher: RootDispatcher = {
    sendEvent(type: string, data?: any): void {
        getMainWindow().webContents.send(type, data);
    },
    addPageListener(type: string, listener: Function): void {
        ipcMain.on(type, listener);
    },
};

export default rootDispatcher;
