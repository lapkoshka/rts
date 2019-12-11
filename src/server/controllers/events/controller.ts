import { IPC_EVENTS } from '../../ipc/ipc-events';
import { dbMorda } from '../../modules/database/database';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { updateEventsData } from '../../view-data/events/updater';

export const initEventsController = () => {
    rootDispatcher.addPageListener(IPC_EVENTS.CREATE, () => {
        dbMorda.events.create()
            .then(() => {
                updateEventsData();
            });
    });
}
