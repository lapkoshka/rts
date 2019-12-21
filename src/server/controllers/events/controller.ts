import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { viewUpdater } from '../../view-data/view-updater';

export const initEventsController = () => {
    rootDispatcher.addPageListener(IPC_CONTESTS.CREATE, () => {
        dbMorda.contests.create()
            .then(() => {
                viewUpdater.contests.updateContestsData();
            });
    });
}
