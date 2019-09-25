import { updateUsers } from './controllers/results/users';
import { IPC_APP } from './ipc/ipc-events';
import rootDispatcher from './modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './controllers/results/history';
import { updateTotalInfo } from './controllers/results/total';

import initPortableReaderController from './controllers/portable-reader/controller';
import initMainReaderController from './controllers/main-reader/controller';
import initRaceController from './controllers/race/controller';
import initRSSIController from './controllers/rssi/controller';
import initFakeTagController from './controllers/fake-tag/controller';
import initRegistrationController from './controllers/registration/controller';
import initSmartbannerController from './controllers/control-panel/controller';
import initResultsController from './controllers/results/controller';
import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import { closeDatabase } from './modules/database/database';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

const updateView = (): void => {
    updateRaceHistory();
    updateTotalInfo();
    updateUsers();
    // updateReaders();
    // closeRaces();
};

const start = async (): Promise<void> => {
    rootDispatcher.addPageListener(IPC_APP.START, async () => {
        await waitView();
        updateView();
    });

    initPortableReaderController();
    initMainReaderController();
    initRaceController();
    initRSSIController();
    initFakeTagController();
    initRegistrationController();
    initSmartbannerController();
    initResultsController();
};

const shutdown = () => {
    mainReader.kill();
    portableReader.kill();
    closeDatabase();
};

export const services = {
    start,
    shutdown,
};
