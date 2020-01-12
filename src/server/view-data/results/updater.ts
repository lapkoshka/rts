import { IPC_RESULTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';

export const updateUsersData = async (): Promise<void> => {
    dbMorda.users.getUsers()
        .then((users: UserData[]) => {
            rootDispatcher.sendEvent<UserData[]>(IPC_RESULTS.USERS_DATA_UPDATE, users);
        })
        .catch(console.error);
};
