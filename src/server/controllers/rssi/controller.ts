import { IPC_MAIN_READER } from '../../ipc/ipc-events';
import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';

export default () => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        rootDispatcher.sendEvent(IPC_MAIN_READER.TAG, tag);
    });
};
