import { IPC_MAIN_READER } from '../../ipc/ipc-events';
import { READER_EVENT } from '../../lib/readers/base-reader';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';

export const initMainReaderController = (): void => {
    mainReader.on(READER_EVENT.CONNECTING_START, () => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    });

    mainReader.on(READER_EVENT.CONNECTED, () => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    });

    mainReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
        rootDispatcher.sendEvent(IPC_MAIN_READER.ERROR, message);
    });

    mainReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
        rootDispatcher.sendEvent(IPC_MAIN_READER.DISCONNECT, message);
    });

    mainReader.on(READER_EVENT.ON_IP_RECIEVED, (ip: string) => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.IP_RECIEVED, ip);
    });
};

