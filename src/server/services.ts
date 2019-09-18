import { updateUsers } from './controllers/results/users';
import rootDispatcher from './modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './controllers/results/history';
import { updateTotalInfo } from './controllers/results/total';

import initPortableReaderController from './controllers/portable-reader/controller';
import initMainReaderController from './controllers/main-reader/controller';
import initRaceController from './controllers/race/controller';
import initRSSIController from './controllers/rssi/controller';
import initFakeTagController from './controllers/fake-tag/controller';
import initRegistrationController from './controllers/registration/controller';
import initSmartbannerController from './controllers/smartbanner/controller';
import initResultsController from './controllers/results/controller';
import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import { closeDatabase } from './modules/database/database';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener('viewDidMount', () => {
            resolve();
        });
    });
};

const start = async (): Promise<void> => {
    await waitView();

    initPortableReaderController();
    initMainReaderController();
    initRaceController();
    initRSSIController();
    initFakeTagController();
    initRegistrationController();
    initSmartbannerController();
    initResultsController();

    // TODO: update results main function
    updateRaceHistory();
    updateTotalInfo();
    updateUsers();
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
