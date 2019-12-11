import { mainReader } from './modules/readers/main-reader';
import { portableReader } from './modules/readers/portable-reader';
import { dbMorda } from './modules/database/database';

import { initEventsController } from './controllers/events/controller';
import { initViewUpdaterController } from './controllers/view-updater/controller';
import { initPortableReaderController } from './controllers/portable-reader/controller';
import { initMainReaderController } from './controllers/main-reader/controller';
import { initRaceController } from './controllers/race/controller';
import { initRSSIController } from './controllers/rssi-chart/controller';
import { initFakeTagController } from './controllers/fake-tag/controller';
import { initRegistrationController } from './controllers/registration/controller';
import { initSmartbannerController } from './controllers/control-panel/controller';
import { initResultsController } from './controllers/results/controller';



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
    initEventsController();
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
