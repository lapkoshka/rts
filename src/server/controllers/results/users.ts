import { getUsers, UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

interface UserRow {
  uid: string;
  username: string;
}

export type Users = UserRow[];

export const updateUsers = (): void => {
  getUsers().then((users: UserData[]) => {
      const updatedData: Users = users.map((user: UserData) => ({
          uid: user.uid,
          username: user.firstname + ' ' + user.lastname,
      }));

      rootDispatcher.sendEvent('onUsersDataUpdate', updatedData);
  }).catch((err: Error) => {
      throw err;
  });
};
