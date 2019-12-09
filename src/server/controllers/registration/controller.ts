
import { IPC_REGISTRATION } from '../../ipc/ipc-events';
import { insertUser, updateUser, UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateUsers } from '../results/users';

const submitNewUser = (user: UserData): Promise<string> =>
    (user.alreadyRegistred ? updateUser : insertUser)(user);

export const initRegistrationController = () => {
    rootDispatcher.addPageListener(IPC_REGISTRATION.CANCEL, () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener(IPC_REGISTRATION.SUBMIT, (_, user: UserData) => {
        submitNewUser(user).then(() => {
            updateRaceHistory();
            updateTotalInfo();
            updateUsers();
        })
            .catch((err: string) => {
                throw Error(err);
            });

        portableReader.continue();
    });
};

