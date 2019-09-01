import { insertUser, updateUser, UserData } from '../../modules/database/database';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';
import { updateTotalInfo } from '../results/total';

const submitNewUser = (user: UserData): Promise<string> =>
    (user.alreadyRegistred ? updateUser : insertUser)(user);

export default () => {
    rootDispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener('onRegistrationSubmit', (_: any, user: UserData) => {
        submitNewUser(user).then((message: string) => {
            console.log(message);
            updateTotalInfo();
        })
        .catch((err: string) => {
            throw Error(err);
        });

        portableReader.continue();
    });
};

