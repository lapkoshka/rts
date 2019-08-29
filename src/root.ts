import BaseReader from './lib/readers/base-reader';
import MainReader from './lib/readers/main-reader';
import PortableReader from './lib/readers/portable-reader';
import rootDispatcher from './modules/dispatcher/root-dispatcher';
import initPortableReaderEvents from './modules/portable-reader';
import initMainReaderEvents from './modules/main-reader';
import initRaceEvents from './modules/race/race';
import initRSSIEvents from './modules/rssi';
import { updateUser, insertUser, UserData } from './modules/database/database';
import { updateUsersView } from './modules/users';

const submitNewUser = (user: UserData): Promise<string> =>
    (user.alreadyRegistred ? updateUser : insertUser)(user);

const switchReader = (reader: BaseReader): void => {
    if (reader.isConnected) {
        reader.kill();
        return;
    }

    reader.startListen();
};

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener('onViewReady', () => {
            resolve();
        });
    });
};

const root = async (mainReader: MainReader, portableReader: PortableReader) => {
    await waitView();
    // switchReader(mainReader);

    updateUsersView();
    initPortableReaderEvents(portableReader);
    initMainReaderEvents(mainReader);
    initRaceEvents(mainReader);
    initRSSIEvents(mainReader);

    rootDispatcher.addPageListener('fakePortableTag', (_: any, tag: string) => {
        portableReader.fakeTag(tag);
    });

    rootDispatcher.addPageListener('fakeMainTag', (_: any, tag: string) => {
        mainReader.fakeTag(tag);
    });

    // registration events to the registration events module
    rootDispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    rootDispatcher.addPageListener('onRegistrationSubmit', (_: any, user: UserData) => {
        submitNewUser(user).then((message: string) => {
            console.log(message);
            updateUsersView();
        })
        .catch((err: string) => {
            throw Error(err);
        });

        portableReader.continue();
    });

    rootDispatcher.addPageListener('portableReaderTriggerClick', () => {
        switchReader(portableReader);
    });

    rootDispatcher.addPageListener('mainReaderTriggerClick', () => {
        switchReader(mainReader);
    });
};

export default root;
