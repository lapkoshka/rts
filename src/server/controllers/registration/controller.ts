import { IPC_REGISTRATION } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserFormData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';

interface DeattachContestData {
    userId: number;
    contestId: number;
}

const submitNewUser = (user: UserFormData): Promise<number> => {
    if (user.alreadyRegistred) {
        return dbMorda.users.updateUser(user);
    }

    return dbMorda.users.insertUser(user);
};

const attachUserToContest = (userId: number, contestId?: number): Promise<void> => {
    const shouldAttachToContest = contestId !== undefined;
    if (!shouldAttachToContest) {
        return Promise.resolve();
    }

    return dbMorda.users.attachUserToContest(userId, contestId);
};

export const initRegistrationController = () => {
    rootDispatcher.addPageListener(IPC_REGISTRATION.CANCEL, () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.SUBMIT, (_, formData: UserFormData) => {
        submitNewUser(formData)
            .then((userId: number) => {
                return attachUserToContest(userId, formData.constestId);
            })
            // .then(viewUpdate)
            .catch(console.error);

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.USER_ATTACH, (_, formData: UserFormData) => {
        dbMorda.users.addTagForUser(formData)
            .catch(console.error);
        attachUserToContest(formData.attachUserId, formData.constestId);

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_TAG, (_, uid: string) => {
       dbMorda.users.deleteTag(uid)
           .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_CONTEST, (_, data: DeattachContestData) => {
        const { userId, contestId } = data;

        dbMorda.users.deattachContest(userId, contestId)
            .catch(console.error);
    });
};

