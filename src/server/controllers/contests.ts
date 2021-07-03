import { getTimestamp } from '../../common/helpers';
import { IPC_CONTESTS } from '../databus/ipc/events';
import { ContestFormData } from '../storage/domains/contests';
import { IpcRoot } from '../databus/ipc/root';
import { Storage } from '../storage';
import { View } from '../view';

export const initContestController = () => {
    IpcRoot.on(IPC_CONTESTS.CREATE, async () => {
        const id = await Storage.contests.create();
        View.contests.updateContestsData();
        IpcRoot.send<number>(IPC_CONTESTS.CONTEST_CREATED, id);
    });

    IpcRoot.on<ContestFormData>(IPC_CONTESTS.SETTINGS_CHANGE, async (data) => {
        await Storage.contests.changeSettings(data);
        View.contests.updateContestsData();
    });

    IpcRoot.on<number>(IPC_CONTESTS.DELETE, async (id) => {
        await Storage.contests.delete(id);
        View.contests.updateContestsData();
        IpcRoot.send(IPC_CONTESTS.ON_CONTEST_DELETED);
    });

    IpcRoot.on<number>(IPC_CONTESTS.START, async (id) => {
        const startedContests = await Storage.contests.getStartedContests();

        if (startedContests.length > 0) {
            IpcRoot.send(IPC_CONTESTS.START_ERROR);
            return;
        }

        await Storage.contests.start(id, getTimestamp());
        View.contests.updateContestsData();
    });

    IpcRoot.on<number>(IPC_CONTESTS.CLOSE, async (id) => {
        await Storage.contests.close(id, getTimestamp());
        View.contests.updateContestsData();
    });

    IpcRoot.on<number>(IPC_CONTESTS.SET_SELECTED_CONTEST, (id) => {
        Storage.contests.saveSelectedContest(id);
        IpcRoot.send<number>(IPC_CONTESTS.SELECTED_CONTEST_ID, id);
        View.results.updateUsersData();
        View.results.updateRaceHistory();
    });
};
