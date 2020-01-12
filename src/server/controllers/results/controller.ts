import { IPC_RESULTS } from '../../ipc/ipc-events';
import { deleteRace } from '../../modules/database/tables/races';
// import { deleteUser } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { updateRaceHistory } from './history';
import { updateTotalInfo } from './total';
import { updateUsers } from './users';

export const initResultsController = () => {
    rootDispatcher.addPageListener(IPC_RESULTS.ON_RACE_DELETE, (_, id: number) => {
        deleteRace(id).then(() => {
            updateRaceHistory();
            updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });

    rootDispatcher.addPageListener(IPC_RESULTS.ON_USER_DELETE, (_, uid: string) => {
        // deleteUser(uid).then(() => {
        //     updateRaceHistory();
        //     updateUsers();
        //     updateTotalInfo();
        // }).catch((err: Error) => {
        //     throw err;
        // });
    });
};
