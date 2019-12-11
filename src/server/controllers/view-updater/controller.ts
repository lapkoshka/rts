import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from '../../ipc/ipc-events';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { portableReader } from '../../modules/readers/portable-reader';
import { updateEventsData } from '../../view-data/events/updater';
import { updateRaces } from '../race/race-scenario';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateUsers } from '../results/users';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        rootDispatcher.addPageListener(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

const updateView = (): void => {
    rootDispatcher.sendEvent(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    rootDispatcher.sendEvent(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);
    updateEventsData();

    // deprecated
    updateRaceHistory();
    updateTotalInfo();
    updateUsers();
    updateRaces();
};

export const initViewUpdaterController = () => {
    const pageReady = waitView();
    rootDispatcher.addPageListener(IPC_APP.START, async () => {
        await pageReady;
        updateView();
    });
}
