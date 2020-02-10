import { IPC_REGISTRATION } from '../databus/ipc/events';
import { PortableReader } from '../lib/readers/portable-reader';
import { Storage } from '../storage';
import { UserFormData } from '../storage/domains/users';
import { IpcRoot } from '../databus/ipc/root';
import { View } from '../view';

export interface DeattachContestData {
    uid: string;
    contestId: number;
}

/**
 * Сохраняет нового участника или обновляет существующего если на форме был клик по submit
 */
const submitNewUser = (user: UserFormData): Promise<number> => {
    if (user.alreadyRegistred) {
        return Storage.users.updateUser(user);
    }

    return Storage.users.saveUser(user);
};

/**
 * Закрепляет метку за определенным контестом
 */
const attachTagToContest = ({ uid, attachContestId }: UserFormData): Promise<void> => {
    const shouldAttachToContest = attachContestId !== undefined;
    if (!shouldAttachToContest) {
        return Promise.resolve();
    }

    return Storage.contests.attachTagToContest(uid, attachContestId);
};

export const initRegistrationController = (pReader: PortableReader) => {
    IpcRoot.on(IPC_REGISTRATION.CANCEL, pReader.continue);

    IpcRoot.on<UserFormData>(IPC_REGISTRATION.SUBMIT, async(formData) => {
        await submitNewUser(formData);
        await attachTagToContest(formData);
        View.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<UserFormData>(IPC_REGISTRATION.ATTACH_USER, async (formData) => {
        await Storage.users.attachTagToUser(formData);
        await attachTagToContest(formData);
        View.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<string>(IPC_REGISTRATION.DEATTACH_TAG, async (uid) => {
        await Storage.users.deattachTag(uid);
        View.results.updateUsersData();

        pReader.continue();
    });

    IpcRoot.on<DeattachContestData>(IPC_REGISTRATION.DEATTACH_CONTEST, async (data) => {
        const { uid, contestId } = data;

        Storage.contests.deattachContest(uid, contestId);
        View.results.updateUsersData();

        pReader.continue();
    });
};
