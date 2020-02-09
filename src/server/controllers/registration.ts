import { IPC_REGISTRATION } from '../databus/ipc/events';
import { PortableReader } from '../lib/readers/portable-reader';
import { dbMorda } from '../storage/tools/database/database';
import { UserFormData } from '../storage/tools/database/tables/users';
import { IpcRoot } from '../databus/ipc/root';
import { viewUpdater } from '../view-data/view-updater';

export interface DeattachContestData {
    uid: string;
    contestId: number;
}

/**
 * Сохраняет нового участника или обновляет существующего если на форме был клик по submit
 */
const submitNewUser = (user: UserFormData): Promise<number> => {
    if (user.alreadyRegistred) {
        return dbMorda.users.updateUser(user);
    }

    return dbMorda.users.insertUser(user);
};

/**
 * Закрепляет метку за определенным контестом
 */
const attachTagToContest = ({ uid, attachContestId }: UserFormData): Promise<void> => {
    const shouldAttachToContest = attachContestId !== undefined;
    if (!shouldAttachToContest) {
        return Promise.resolve();
    }

    return dbMorda.tagContest.attachTagToContest(uid, attachContestId);
};

export const initRegistrationController = (pReader: PortableReader) => {
    IpcRoot.on(IPC_REGISTRATION.CANCEL, pReader.continue);

    IpcRoot.on<UserFormData>(IPC_REGISTRATION.SUBMIT, async(formData) => {
        await submitNewUser(formData);
        await attachTagToContest(formData);
        viewUpdater.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<UserFormData>(IPC_REGISTRATION.ATTACH_USER, async (formData) => {
        await dbMorda.tagsMethods.addTagForUser(formData);
        await attachTagToContest(formData);
        viewUpdater.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<string>(IPC_REGISTRATION.DEATTACH_TAG, async (uid) => {
        await dbMorda.tagsMethods.deleteTag(uid);
        viewUpdater.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<DeattachContestData>(IPC_REGISTRATION.DEATTACH_CONTEST, async (data) => {
        const { uid, contestId } = data;

        dbMorda.tagContest.deattachContest(uid, contestId);
        viewUpdater.results.updateUsersData();

        pReader.continue();
    });
};
