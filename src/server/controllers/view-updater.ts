import { IPC_APP, IPC_MAIN_READER, IPC_PORTABLE_READER } from '../databus/ipc/events';
import { READER_STATUS } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { MainReader } from '../lib/readers/main-reader';
import { PortableReader } from '../lib/readers/portable-reader';
import { View } from '../view';

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

        View.contests.updateContestsData();
        View.results.updateUsersData();
        View.results.updateRaceHistory();
        View.results.updateTotalInfo();
        View.race.updateRaceInfo();
    });
};
