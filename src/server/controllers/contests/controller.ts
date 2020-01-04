import { getTimestamp } from '../../../common/helpers';
import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { ContestFormData } from '../../modules/database/tables/contests';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { viewUpdater } from '../../view-data/view-updater';

export const initContestController = () => {
    rootDispatcher.addPageListener(IPC_CONTESTS.CREATE, () => {
        dbMorda.contests.create()
            .then((id: number) => {
                viewUpdater.contests.updateContestsData();
                rootDispatcher.sendEvent(IPC_CONTESTS.CONTEST_CREATED, id);
            })
            .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.SETTINGS_CHANGE, (_, data: ContestFormData) => {
       dbMorda.contests.changeSettings(data)
           .then(viewUpdater.contests.updateContestsData)
           .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.DELETE, (_, id: number) => {
       dbMorda.contests.delete(id)
           .then(() => {
               viewUpdater.contests.updateContestsData();
               rootDispatcher.sendEvent(IPC_CONTESTS.ON_CONTEST_DELETED);
           })
           .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.START, async (_, id: number) => {
        const startedContests = await dbMorda.contests.getStartedContests();

        if (startedContests.length > 0) {
            rootDispatcher.sendEvent(IPC_CONTESTS.START_ERROR);
            return;
        }

        dbMorda.contests.start(id, getTimestamp())
            .then(viewUpdater.contests.updateContestsData)
            .catch(console.error);
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.CLOSE, (_, id: number) => {
        dbMorda.contests.close(id, getTimestamp())
            .then(viewUpdater.contests.updateContestsData)
            .catch(console.error);
    });
};
