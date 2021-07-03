import { MainReader } from './lib/readers/main-reader';
import { PortableReader } from './lib/readers/portable-reader';
import { Storage } from './storage';

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

const mainReader = new MainReader('/bin/MainReaderAdapter.exe');
const portableReader = new PortableReader('/bin/portablereader.exe');

const start = (): void => {
    initViewUpdaterController(mainReader, portableReader);
    initPortableReaderController(portableReader);
    initMainReaderController(mainReader);
    initRaceController(mainReader);
    initRSSIController(mainReader);
    initFakeTagController(mainReader, portableReader);
    initRegistrationController(portableReader);
    initSmartbannerController(mainReader, portableReader);
    initResultsController();
    initContestController();
};

const shutdown = () => {
    mainReader.kill();
    portableReader.kill();
    Storage.close();
};

export const services = {
    start,
    shutdown,
};
