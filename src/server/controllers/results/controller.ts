import { IPC_RESULTS } from '../../ipc/ipc-events';
import { deleteRace } from '../../modules/database/tables/races';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './history';
import { updateTotalInfo } from './total';

export const initResultsController = () => {
    rootDispatcher.addPageListener(IPC_RESULTS.ON_RACE_DELETE, (_, id: number) => {
        deleteRace(id).then(() => {
            updateRaceHistory();
            updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });
};
