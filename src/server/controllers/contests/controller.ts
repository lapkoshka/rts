import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { ContestFormData } from '../../modules/database/tables/contests';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { viewUpdater } from '../../view-data/view-updater';

export const initContestController = () => {
    rootDispatcher.addPageListener(IPC_CONTESTS.CREATE, () => {
        dbMorda.contests.create()
            .then(viewUpdater.contests.updateContestsData)
            .catch(console.error)
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.SETTINGS_CHANGE, (_, data: ContestFormData) => {
       dbMorda.contests.changeSettings(data)
           .then(viewUpdater.contests.updateContestsData)
           .catch(console.error)
    });
}
