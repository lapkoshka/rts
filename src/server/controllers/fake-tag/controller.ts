import { IPC_APP } from '../../ipc/ipc-events';
import { RFIDTag } from '../../lib/readers/base-reader';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { portableReader } from '../../modules/readers/portable-reader';

export const initFakeTagController = () => {
    rootDispatcher.addPageListener(IPC_APP.FAKE_PORTABLE_TAG, (_, tag: RFIDTag) => {
        portableReader.fakeTag(tag.uid, tag.rssi);
    });

    rootDispatcher.addPageListener(IPC_APP.FAKE_MAIN_TAG, (_, tag: RFIDTag) => {
        mainReader.fakeTag(tag.uid, tag.rssi);
    });
};
