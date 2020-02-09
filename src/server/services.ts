import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import { dbMorda } from './modules/database/database';

import { initContestController } from './controllers/contests';
import { initViewUpdaterController } from './controllers/view-updater';
import { initPortableReaderController } from './controllers/portable-reader';
import { initMainReaderController } from './controllers/main-reader';
import { initRaceController } from './controllers/race';
import { initRSSIController } from './controllers/rssi-chart';
import { initFakeTagController } from './controllers/fake-tag';
import { initRegistrationController } from './controllers/registration';
import { initSmartbannerController } from './controllers/control-panel';
import { initResultsController } from './controllers/results';

const start = (): void => {
    initViewUpdaterController();
    initPortableReaderController();
    initMainReaderController();
    initRaceController();
    initRSSIController();
    initFakeTagController();
    initRegistrationController();
    initSmartbannerController();
    initResultsController();
    initContestController();
};

const shutdown = () => {
    mainReader.kill();
    portableReader.kill();
    dbMorda.closeDatabase();
};

export const services = {
    start,
    shutdown,
};
