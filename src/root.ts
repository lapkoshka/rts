import PortableReader from "./lib/readers/portable-reader";
import { User } from './lib/types'
import initPortableReader from './modules/portable-reader';
import { RootDispatcher } from "./index";
import { updateUser, insertUser, getUsers, getUserRaces } from "./modules/database";

const updateView = async (dispatcher: RootDispatcher) => {
    let users = [];

    try {
        users = await getUsers();
    } catch (err) {
        throw Error(err);
    }

    const data = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const races = await getUserRaces(user.uid);
        // TODO: 
        // sort by best time
        data.push({
            firstname: user.firstname,
            lastname: user.lastname,
            time: races[0] ? races[0].time : '-',
            count: races.length
        });
    };

    dispatcher.sendEvent('onUsersDataUpdate', data);
};

const submitNewUser = (user: User): Promise<string> => 
    (user.alreadyRegistred ? updateUser : insertUser)(user);

const waitView = (dispatcher: RootDispatcher): Promise<void> => {
    return new Promise((resolve) => {
        dispatcher.addPageListener('onViewReady', () => {
            resolve();
        });
    });
};

const root = async (
    portableReader: PortableReader,
    dispatcher: RootDispatcher,
) => {
    await waitView(dispatcher);
    updateView(dispatcher);
    initPortableReader(portableReader, dispatcher);

    dispatcher.addPageListener('fakeTag', () => {
        portableReader.fakeTag();
    });

    // registration events to the registration events module
    dispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    dispatcher.addPageListener('onRegistrationSubmit', (evt: any, user: User) => {
        submitNewUser(user).then(message => {
            console.log(message);
            updateView(dispatcher);
        })
        .catch(err => {
            throw Error(err);
        });

        portableReader.continue();
    })
}

export default root;
