import { IPC_CONTESTS } from '../../ipc/ipc-events';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { getContestList } from './processor';

export const updateContestsData = async (): Promise<void> => {
    const contestList = await getContestList();
    rootDispatcher.sendEvent(IPC_CONTESTS.LIST, contestList);
};
