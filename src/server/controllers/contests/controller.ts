import { getTimestamp } from '../../../common/helpers';
import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { ContestFormData } from '../../modules/database/tables/contests';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { Storage } from '../../storage';
import { viewUpdater } from '../../view-data/view-updater';

export const initContestController = () => {
    rootDispatcher.addPageListener(IPC_CONTESTS.CREATE, async () => {
        try {
            const id = await dbMorda.contests.create();
            viewUpdater.contests.updateContestsData();
            rootDispatcher.sendEvent(IPC_CONTESTS.CONTEST_CREATED, id);
        } catch (e) {
            throw Error(e);
        }
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.SETTINGS_CHANGE, async (_, data: ContestFormData) => {
        try {
            await dbMorda.contests.changeSettings(data);
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.DELETE, async (_, id: number) => {
        try {
            await dbMorda.contests.delete(id);
            viewUpdater.contests.updateContestsData();
            rootDispatcher.sendEvent(IPC_CONTESTS.ON_CONTEST_DELETED);
        } catch (e) {
            throw Error(e);
        }
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.START, async (_, id: number) => {
        try {
            const startedContests = await dbMorda.contests.getStartedContests();

            if (startedContests.length > 0) {
                rootDispatcher.sendEvent(IPC_CONTESTS.START_ERROR);
                return;
            }

            await dbMorda.contests.start(id, getTimestamp());
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.CLOSE, async (_, id: number) => {
        try {
            await dbMorda.contests.close(id, getTimestamp());
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    rootDispatcher.addPageListener(IPC_CONTESTS.SET_SELECTED_CONTEST, (_, id: number) => {
        Storage.contests.saveSelectedContest(id);
        rootDispatcher.sendEvent<number>(IPC_CONTESTS.SELECTED_CONTEST_ID, id);
        viewUpdater.results.updateUsersData();
        viewUpdater.results.updateRaceHistory();
    });
};
