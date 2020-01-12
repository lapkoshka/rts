import { IPC_REGISTRATION } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserFormData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';

export interface DeattachContestData {
    uid: string;
    contestId: number;
}

const submitNewUser = (user: UserFormData): Promise<number> => {
    if (user.alreadyRegistred) {
        return dbMorda.users.updateUser(user);
    }

    return dbMorda.users.insertUser(user);
};

const attachTagToContest = ({ uid, attachContestId }: UserFormData): Promise<void> => {
    const shouldAttachToContest = attachContestId !== undefined;
    if (!shouldAttachToContest) {
        return Promise.resolve();
    }

    return dbMorda.users.attachTagToContest(uid, attachContestId);
};

export const initRegistrationController = () => {
    rootDispatcher.addPageListener(IPC_REGISTRATION.CANCEL, () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.SUBMIT, (_, formData: UserFormData) => {
        submitNewUser(formData)
            .then(() => {
                return attachTagToContest(formData);
            })
            // .then(viewUpdate)
            .catch(console.error);

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.ATTACH_USER, (_, formData: UserFormData) => {
        dbMorda.users.addTagForUser(formData)
            .catch(console.error);
        attachTagToContest(formData);

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_TAG, (_, uid: string) => {
       dbMorda.users.deleteTag(uid)
           .catch(console.error);

       portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_CONTEST, (_, data: DeattachContestData) => {
        const { uid, contestId } = data;

        dbMorda.users.deattachContest(uid, contestId)
            .catch(console.error);

        portableReader.continue();
    });
};

