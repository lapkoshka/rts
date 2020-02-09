import { IPC_MAIN_READER } from '../databus/ipc/events';
import { READER_EVENT, READER_STATUS } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { MainReader } from '../lib/readers/main-reader';

export const initMainReaderController = (mReader: MainReader): void => {
    mReader.on(READER_EVENT.CONNECTING_START, () => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mReader.status);
    });

    mReader.on(READER_EVENT.CONNECTED, () => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mReader.status);
    });

    mReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mReader.status);
        IpcRoot.send<string>(IPC_MAIN_READER.ERROR, message);
    });

    mReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mReader.status);
        IpcRoot.send<string>(IPC_MAIN_READER.DISCONNECT, message);
    });

    mReader.on(READER_EVENT.ON_IP_RECIEVED, (ip: string) => {
        IpcRoot.send<string>(IPC_MAIN_READER.IP_RECIEVED, ip);
    });
};

