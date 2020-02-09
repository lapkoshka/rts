import { getTimestamp } from '../../common/helpers';
import { IPC_CONTESTS } from '../databus/ipc/events';
import { dbMorda } from '../modules/database/database';
import { ContestFormData } from '../modules/database/tables/contests';
import { IpcRoot } from '../databus/ipc/root';
import { Storage } from '../storage';
import { viewUpdater } from '../view-data/view-updater';

export const initContestController = () => {
    IpcRoot.on(IPC_CONTESTS.CREATE, async () => {
        try {
            const id = await dbMorda.contests.create();
            viewUpdater.contests.updateContestsData();
            IpcRoot.send<number>(IPC_CONTESTS.CONTEST_CREATED, id);
        } catch (e) {
            throw Error(e);
        }
    });

    IpcRoot.on<ContestFormData>(IPC_CONTESTS.SETTINGS_CHANGE, async (data) => {
        try {
            await dbMorda.contests.changeSettings(data);
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    IpcRoot.on<number>(IPC_CONTESTS.DELETE, async (id) => {
        try {
            await dbMorda.contests.delete(id);
            viewUpdater.contests.updateContestsData();
            IpcRoot.send(IPC_CONTESTS.ON_CONTEST_DELETED);
        } catch (e) {
            throw Error(e);
        }
    });

    IpcRoot.on<number>(IPC_CONTESTS.START, async (id) => {
        try {
            const startedContests = await dbMorda.contests.getStartedContests();

            if (startedContests.length > 0) {
                IpcRoot.send(IPC_CONTESTS.START_ERROR);
                return;
            }

            await dbMorda.contests.start(id, getTimestamp());
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    IpcRoot.on<number>(IPC_CONTESTS.CLOSE, async (id) => {
        try {
            await dbMorda.contests.close(id, getTimestamp());
            viewUpdater.contests.updateContestsData();
        } catch (e) {
            throw Error(e);
        }
    });

    IpcRoot.on<number>(IPC_CONTESTS.SET_SELECTED_CONTEST, (id) => {
        Storage.contests.saveSelectedContest(id);
        IpcRoot.send<number>(IPC_CONTESTS.SELECTED_CONTEST_ID, id);
        viewUpdater.results.updateUsersData();
        viewUpdater.results.updateRaceHistory();
    });
};
