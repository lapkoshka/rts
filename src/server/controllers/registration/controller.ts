
import { IPC_REGISTRATION } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';

const submitNewUser = (user: UserData): Promise<void> =>
    (user.alreadyRegistred ? dbMorda.users.updateUser : dbMorda.users.insertUser)(user);

export const initRegistrationController = () => {
    rootDispatcher.addPageListener(IPC_REGISTRATION.CANCEL, () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.SUBMIT, (_, user: UserData) => {
        submitNewUser(user)
            .then(() => {
                // todo: обновление таблиц после обновления пользователей?
            })
            .catch(console.error);

        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.UPDATE_USER_TAG, (_, user: UserData) => {
       dbMorda.users.addTagForUser(user)
           .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.DEATTACH_TAG, (_, uid: string) => {
       dbMorda.users.deleteTag(uid)
           .catch(console.error);
    });
};

