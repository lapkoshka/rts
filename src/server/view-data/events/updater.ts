import { IPC_EVENTS } from '../../ipc/ipc-events';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { getEventList } from './processor';

export const updateEventsData = async (): Promise<void> => {
    const eventsList = await getEventList();
    rootDispatcher.sendEvent(IPC_EVENTS.LIST, eventsList);
};
