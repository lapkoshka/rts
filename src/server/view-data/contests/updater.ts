import { IPC_CONTESTS } from '../../databus/ipc/events';
import { dbMorda } from '../../modules/database/database';
import { IpcRoot } from '../../databus/ipc/root';
import { Storage } from '../../storage';

export const updateContestsData = async (): Promise<void> => {
    try {
        const contestList = await dbMorda.contests.get();
        // todo type send<>
        IpcRoot.send(IPC_CONTESTS.LIST, contestList);
        const selectedContestId = Storage.contests.getSelectedContest();
        IpcRoot.send<number|undefined>(IPC_CONTESTS.SELECTED_CONTEST_ID, selectedContestId);
    } catch (e) {
        throw Error(e);
    }
};
