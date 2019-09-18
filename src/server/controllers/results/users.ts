import { getUsers, UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

export const updateUsers = (): void => {
  getUsers().then((users: UserData[]) => {
      const updatedData = users.map((user: UserData) => ({
          uid: user.uid,
          username: user.firstname + ' ' + user.lastname,
      }));

      rootDispatcher.sendEvent('onUsersDataUpdate', process.env.OLD_VIEW ? users : updatedData);
  }).catch((err: Error) => {
      throw err;
  });
};
