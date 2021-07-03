import { Nullable } from '../../common/types';
import { IPC_PORTABLE_READER } from '../databus/ipc/events';
import { READER_EVENT, READER_STATUS, RFIDTag } from '../lib/readers/base-reader';
import { PortableReader } from '../lib/readers/portable-reader';
import { Storage } from '../storage';
import { UserData } from '../storage/domains/users';
import { IpcRoot } from '../databus/ipc/root';

export interface PortableReaderRegistrationData {
    uid: string;
    user: Nullable<UserData>;
    allUsers: UserData[];
}

export const initPortableReaderController = (pReader: PortableReader) => {
    pReader.on(READER_EVENT.CONNECTING_START, () => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, pReader.status);
    });

    pReader.on(READER_EVENT.CONNECTED, () => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, pReader.status);
    });

    pReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, pReader.status);
        IpcRoot.send<string>(IPC_PORTABLE_READER.ERROR, message);
    });

    pReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, pReader.status);
        IpcRoot.send<string>(IPC_PORTABLE_READER.DISCONNECT, message);
    });

    pReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        const user = await Storage.users.getUser(tag.uid);
        if (user) {
            user.contests = await Storage.contests.getContestIds(tag.uid);
        }

        IpcRoot.send<PortableReaderRegistrationData>(IPC_PORTABLE_READER.TAG, {
            uid: tag.uid,
            user,
            allUsers: await Storage.users.getUsers(),
        });
    });
};

