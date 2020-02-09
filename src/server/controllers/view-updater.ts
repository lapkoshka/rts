import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from '../databus/ipc/events';
import { READER_STATUS } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { mainReader } from '../modules/readers/main-reader';
import { portableReader } from '../modules/readers/portable-reader';
import { viewUpdater } from '../view-data/view-updater';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        IpcRoot.on(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

const updateView = (): void => {
    IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mainReader.status);
    IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, portableReader.status);

    viewUpdater.contests.updateContestsData();
    viewUpdater.results.updateUsersData();
    viewUpdater.results.updateRaceHistory();
    viewUpdater.results.updateTotalInfo();
    viewUpdater.race.updateRaceInfo();
};

export const initViewUpdaterController = () => {
    const pageReady = waitView();
    IpcRoot.on(IPC_APP.START, async () => {
        await pageReady;
        updateView();
    });
};
