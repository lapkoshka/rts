import { IPC_RESULTS } from '../../ipc/ipc-events';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { Storage } from '../../storage';
import { viewUpdater } from '../../view-data/view-updater';

export const initResultsController = () => {
    rootDispatcher.addPageListener(IPC_RESULTS.ON_RACE_DELETE, async (_, id: number) => {
        await Storage.races.deleteRace(id);
        viewUpdater.results.updateRaceHistory();
        viewUpdater.results.updateTotalInfo();
    });
};
