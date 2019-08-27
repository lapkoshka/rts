import BaseReader from './lib/readers/base-reader';
import MainReader from './lib/readers/main-reader';
import PortableReader from './lib/readers/portable-reader';
import initPortableReaderEvents from './modules/portable-reader';
import initMainReaderEvents from './modules/main-reader';
import initRaceEvents from './modules/race/race';
import initRSSIEvents from './modules/rssi';
import { RootDispatcher } from './index';
import { updateUser, insertUser, UserData } from './modules/database/database';
import { updateUsersView } from './modules/users';

const submitNewUser = (user: UserData): Promise<string> =>
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
    // switchReader(mainReader);

    updateUsersView(dispatcher);
    initPortableReaderEvents(portableReader, dispatcher);
    initMainReaderEvents(mainReader, dispatcher);
    initRaceEvents(mainReader, dispatcher);
    initRSSIEvents(mainReader, dispatcher);

    dispatcher.addPageListener('fakePortableTag', (_: any, tag: string) => {
        portableReader.fakeTag(tag);
    });

    dispatcher.addPageListener('fakeMainTag', (_: any, tag: string) => {
        mainReader.fakeTag(tag);
    });

    // registration events to the registration events module
    dispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    dispatcher.addPageListener('onRegistrationSubmit', (_: any, user: UserData) => {
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
        switchReader(mainReader);
    });
};

export default root;
