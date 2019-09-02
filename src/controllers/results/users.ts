import { getUsers, UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

export const updateUsers = (): void => {
  getUsers().then((users: UserData[]) => {
      rootDispatcher.sendEvent('onUsersDataUpdate', users);
  }).catch((err: Error) => {
      throw err;
  });
};
