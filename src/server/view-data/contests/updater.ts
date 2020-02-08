import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { Storage } from '../../storage';

export const updateContestsData = async (): Promise<void> => {
    try {
        const contestList = await dbMorda.contests.get();
        rootDispatcher.sendEvent(IPC_CONTESTS.LIST, contestList);
        const selectedContestId = Storage.contests.getSelectedContest();
        rootDispatcher.sendEvent(IPC_CONTESTS.SELECTED_CONTEST_ID, selectedContestId);
    } catch (e) {
        throw Error(e);
    }
};
