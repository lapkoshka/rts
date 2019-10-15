import { closeRaces, updateRaces } from './controllers/race/race-scenario';
import { updateUsers } from './controllers/results/users';
import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from './ipc/ipc-events';
import rootDispatcher from './modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './controllers/results/history';
import { updateTotalInfo } from './controllers/results/total';
import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import { closeDatabase } from './modules/database/database';

import initPortableReaderController from './controllers/portable-reader/controller';
import initMainReaderController from './controllers/main-reader/controller';
import initRaceController from './controllers/race/controller';
import initRSSIController from './controllers/rssi/controller';
import initFakeTagController from './controllers/fake-tag/controller';
import initRegistrationController from './controllers/registration/controller';
import initSmartbannerController from './controllers/control-panel/controller';
import initResultsController from './controllers/results/controller';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

const updateView = (): void => {
    updateRaceHistory();
    updateTotalInfo();
    updateUsers();
    rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    updateRaces();
};

const start = (): void => {
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
