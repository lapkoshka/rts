import { IPC_REGISTRATION } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserFormData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';
import { viewUpdater } from '../../view-data/view-updater';

// todo: переделать на async/await чтобы было едино везде

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

export const initRegistrationController = () => {
    rootDispatcher.addPageListener(IPC_REGISTRATION.CANCEL, () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.SUBMIT, (_, formData: UserFormData) => {
        submitNewUser(formData)
            .then(() => attachTagToContest(formData))
            .then(viewUpdater.results.updateUsersData)
            .catch((e) => {
                throw Error(e);
            });

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.ATTACH_USER, (_, formData: UserFormData) => {
        dbMorda.tagsMethods.addTagForUser(formData)
            .then(() => {
                return attachTagToContest(formData);
            })
            .then(viewUpdater.results.updateUsersData)
            .catch((e) => {
                throw Error(e);
            });

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_TAG, (_, uid: string) => {
        dbMorda.tagsMethods.deleteTag(uid)
            .then(viewUpdater.results.updateUsersData)
            .catch((e) => {
                throw Error(e);
            });

       portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_CONTEST, (_, data: DeattachContestData) => {
        const { uid, contestId } = data;

        dbMorda.tagContest.deattachContest(uid, contestId)
            .then(viewUpdater.results.updateUsersData)
            .catch((e) => {
                throw Error(e);
            });

        portableReader.continue();
    });
};

