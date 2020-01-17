import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from '../../ipc/ipc-events';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { portableReader } from '../../modules/readers/portable-reader';
import { viewUpdater } from '../../view-data/view-updater';
import { updateRaces } from '../race/race-scenario';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

const updateView = (): void => {
    rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    viewUpdater.contests.updateContestsData();
    viewUpdater.results.updateUsersData();

    // deprecated
    updateRaceHistory();
    updateTotalInfo();
    updateRaces();
};

export const initViewUpdaterController = () => {
    const pageReady = waitView();
    rootDispatcher.addPageListener(IPC_APP.START, async () => {
        await pageReady;
        updateView();
    });
};
