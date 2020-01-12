import { IPC_RESULTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';

// TODO: rewrite ant tables, remove export from (.*)Row interfaces
export interface UserRow {
    uid: string;
    username: string;
}

export type Users = UserRow[];

export const updateUsers = (): void => {
    dbMorda.users.getUsers()
        .then((users: UserData[]) => {
            const updatedData: Users = users.map((user: UserData) => ({
                uid: user.uid,
                username: user.firstname + ' ' + user.lastname,
            }));

            rootDispatcher.sendEvent(IPC_RESULTS.USERS_DATA_UPDATE, updatedData);
        })
        .catch((err: Error) => {
            throw err;
        });
};
