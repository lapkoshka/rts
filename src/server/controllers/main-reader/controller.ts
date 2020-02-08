import { IPC_MAIN_READER } from '../../databus/ipc/events';
import { READER_EVENT, READER_STATUS } from '../../lib/readers/base-reader';
import { IpcRoot } from '../../databus/ipc/root';
import { mainReader } from '../../modules/readers/main-reader';

export const initMainReaderController = (): void => {
    mainReader.on(READER_EVENT.CONNECTING_START, () => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    });

    mainReader.on(READER_EVENT.CONNECTED, () => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    });

    mainReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
        IpcRoot.send<string>(IPC_MAIN_READER.ERROR, message);
    });

    mainReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
        IpcRoot.send<string>(IPC_MAIN_READER.DISCONNECT, message);
    });

    mainReader.on(READER_EVENT.ON_IP_RECIEVED, (ip: string) => {
        IpcRoot.send<string>(IPC_MAIN_READER.IP_RECIEVED, ip);
    });
};

