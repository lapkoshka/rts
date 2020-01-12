import { IPC_RESULTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { deleteRace } from '../../modules/database/tables/races';
// import { deleteUser } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { viewUpdater } from '../../view-data/view-updater';
import { updateRaceHistory } from './history';
import { updateTotalInfo } from './total';

export interface OnUserDeleteData {
    uid: string;
    contestId: number;
}

export const initResultsController = () => {
    rootDispatcher.addPageListener(IPC_RESULTS.ON_RACE_DELETE, (_, id: number) => {
        deleteRace(id).then(() => {
            updateRaceHistory();
            updateTotalInfo();
        }).catch((err: Error) => {
            throw err;
        });
    });

    rootDispatcher.addPageListener(IPC_RESULTS.ON_USER_DELETE, (_, data: OnUserDeleteData) => {
        const { uid, contestId } = data;
        dbMorda.tagContest.deattachContest(uid, contestId)
            .then(() => {
                viewUpdater.results.updateUsersData();

            // deprecated
            updateRaceHistory();
            updateTotalInfo();
        })
        .catch(console.error);
    });
};
