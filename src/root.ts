import BaseReader from './lib/readers/base-reader';
import MainReader from './lib/readers/main-reader';
import PortableReader from './lib/readers/portable-reader';
import { User } from './lib/types';
import initPortableReaderEvents from './modules/portable-reader';
import initMainReaderEvents from './modules/main-reader';
import initRaceEvents from './modules/race';
import { RootDispatcher } from './index';
import { updateUser, insertUser, getUsers, getUserRaces } from './modules/database/database';
import { updateUsersView } from './modules/users';

const submitNewUser = (user: User): Promise<string> =>
    (user.alreadyRegistred ? updateUser : insertUser)(user);

const waitView = (dispatcher: RootDispatcher): Promise<void> => {
    return new Promise((resolve) => {
        dispatcher.addPageListener('onViewReady', () => {
            resolve();
        });
    });
};

const switchReader = (reader: BaseReader): void => {
    if (reader.isConnected) {
        reader.kill();
        return;
    }

    reader.startListen();
};

const root = async (
    mainReader: MainReader,
    portableReader: PortableReader,
    dispatcher: RootDispatcher,
) => {
    await waitView(dispatcher);

    updateUsersView(dispatcher);
    initPortableReaderEvents(portableReader, dispatcher);
    initMainReaderEvents(mainReader, dispatcher);
    initRaceEvents(mainReader, dispatcher);

    dispatcher.addPageListener('fakePortableTag', (evt: any, tag: string) => {
        portableReader.fakeTag(tag);
    });

    dispatcher.addPageListener('fakeMainTag', (evt: any, tag: string) => {
        mainReader.fakeTag(tag);
    });

    // registration events to the registration events module
    dispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    dispatcher.addPageListener('onRegistrationSubmit', (evt: any, user: User) => {
        submitNewUser(user).then((message: string) => {
            console.log(message);
            updateUsersView(dispatcher);
        })
        .catch((err: string) => {
            throw Error(err);
        });

        portableReader.continue();
    });

    dispatcher.addPageListener('portableReaderTriggerClick', () => {
        switchReader(portableReader);
    });

    dispatcher.addPageListener('mainReaderTriggerClick', () => {
        // TODO: popup alert if any active races
        switchReader(mainReader);
    });
};

export default root;
