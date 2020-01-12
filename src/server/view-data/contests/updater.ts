import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';

export const updateContestsData = async (): Promise<void> => {
    const contestList = await dbMorda.contests.get();
    rootDispatcher.sendEvent(IPC_CONTESTS.LIST, contestList);
};
