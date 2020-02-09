import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from '../databus/ipc/events';
import { READER_STATUS } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { MainReader } from '../lib/readers/main-reader';
import { PortableReader } from '../lib/readers/portable-reader';
import { viewUpdater } from '../view-data/view-updater';

const waitView = (): Promise<void> => {
    return new Promise((resolve) => {
        IpcRoot.on(IPC_APP.VIEW_DID_MOUNT, resolve);
    });
};

export const initViewUpdaterController = (mReader: MainReader, pReader: PortableReader) => {
    const pageReady = waitView();

    IpcRoot.on(IPC_APP.START, async () => {
        await pageReady;

        IpcRoot.send<READER_STATUS>(IPC_MAIN_READER.STATUS_CHANGE, mReader.status);
        IpcRoot.send<READER_STATUS>(IPC_PORTABLE_READER.STATUS_CHANGE, pReader.status);

        viewUpdater.contests.updateContestsData();
        viewUpdater.results.updateUsersData();
        viewUpdater.results.updateRaceHistory();
        viewUpdater.results.updateTotalInfo();
        viewUpdater.race.updateRaceInfo();
    });
};
