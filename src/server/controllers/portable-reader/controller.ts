import { Nullable } from '../../../common/types';
import { IPC_PORTABLE_READER } from '../../databus/ipc/events';
import { READER_EVENT, READER_STATUS, RFIDTag } from '../../lib/readers/base-reader';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { IpcRoot } from '../../databus/ipc/root';
import { portableReader } from '../../modules/readers/portable-reader';

export interface PortableReaderRegistrationData {
    uid: string;
    user: Nullable<UserData>;
    allUsers: UserData[];
}

export const initPortableReaderController = () => {
    portableReader.on(READER_EVENT.CONNECTING_START, () => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    });

    portableReader.on(READER_EVENT.CONNECTED, () => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    });

    portableReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
        IpcRoot.send<string>(IPC_PORTABLE_READER.ERROR, message);
    });

    portableReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
        IpcRoot.send<string>(IPC_PORTABLE_READER.DISCONNECT, message);
    });

    portableReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        try {
            const user = await dbMorda.users.getUser(tag.uid);
            if (user) {
                user.contests = await dbMorda.tagContest.getContests(tag.uid);
            }

            IpcRoot.send<PortableReaderRegistrationData>(IPC_PORTABLE_READER.TAG, {
                uid: tag.uid,
                user,
                allUsers: await dbMorda.users.getUsers(),
            });
        } catch (e) {
            throw Error(e);
        }
    });
};

