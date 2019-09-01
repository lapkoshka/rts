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

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener('onViewReady', () => {
            resolve();
        });
    });
};

const initControllers = (): void => {
    initPortableReaderController();
    initMainReaderController();
    initRaceController();
    initRSSIController();
    initFakeTagController();
    initRegistrationController();
    initSmartbannerController();
};

const root = async (): Promise<void> => {
    await waitView();
    initControllers();

    updateRaceHistory();
    updateTotalInfo();
};

export default root;
