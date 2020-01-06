import { IPC_PORTABLE_READER } from '../../ipc/ipc-events';
import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';

export interface PortableReaderTagData {
    newUser: UserData;
    allUsers: UserData[];
}

export const initPortableReaderController = () => {
    portableReader.on(READER_EVENT.CONNECTING_START, () => {
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    });

    portableReader.on(READER_EVENT.CONNECTED, () => {
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    });

    portableReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.ERROR, message);
    });

    portableReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.DISCONNECT, message);
    });

    portableReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        rootDispatcher.sendEvent(IPC_PORTABLE_READER.TAG, {
            newUser: await dbMorda.users.getUser(tag.uid),
            allUsers: await dbMorda.users.getUsers(),
        } as PortableReaderTagData);
    });
};

