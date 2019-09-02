
import { insertUser, updateUser, UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateUsers } from '../results/users';

const submitNewUser = (user: UserData): Promise<string> =>
    (user.alreadyRegistred ? updateUser : insertUser)(user);

export default () => {
    rootDispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener('onRegistrationSubmit', (_: any, user: UserData) => {
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

