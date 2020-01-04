import { IpcRenderer } from 'electron';
import {
    IPC_APP,
    IPC_CONTESTS,
    IPC_MAIN_READER,
    IPC_PORTABLE_READER,
    IPC_RACE,
    IPC_REGISTRATION,
    IPC_RESULTS,
    IPC_RSSI_CHART,
} from '../server/ipc/ipc-events';

type IpcEventType =
    IPC_APP |
    IPC_MAIN_READER |
    IPC_PORTABLE_READER |
    IPC_RACE |
    IPC_REGISTRATION |
    IPC_RESULTS |
    IPC_RSSI_CHART |
    IPC_CONTESTS;

// @ts-ignore
const ipc: IpcRenderer = window.require('electron').ipcRenderer;

export class Ipc {
    public static on<T>(type: IpcEventType, callback: (data: T) => void): void {
        ipc.on(type, (_: Event, data: T) => {
            callback(data);
        });
    }

    public static send(type: IpcEventType, data?: any): void {
        ipc.send(type, data);
    }
}
