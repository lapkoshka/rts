import { IPC_CONTESTS } from '../../databus/ipc/events';
import { IpcRoot } from '../../databus/ipc/root';
import { Storage } from '../../storage';
import { ContestData } from '../../storage/domains/contests';

export class ContestViewUpdater {
    public static async updateContestsData(): Promise<void> {
        const contestList = await Storage.contests.getAll();
        IpcRoot.send<ContestData[]>(IPC_CONTESTS.LIST, contestList);

        const selectedContestId = Storage.contests.getSelectedContest();
        IpcRoot.send<number|undefined>(IPC_CONTESTS.SELECTED_CONTEST_ID, selectedContestId);
    }
}
