import { IPC_RESULTS } from '../databus/ipc/events';
import { IpcRoot } from '../databus/ipc/root';
import { Storage } from '../storage';
import { View } from '../view';

export const initResultsController = () => {
    IpcRoot.on<number>(IPC_RESULTS.ON_RACE_DELETE, async (id) => {
        await Storage.races.deleteRace(id);
        View.results.updateRaceHistory();
        View.results.updateTotalInfo();
    });
};
