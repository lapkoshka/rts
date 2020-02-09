import { IPC_APP } from '../databus/ipc/events';
import { RFIDTag } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { mainReader } from '../modules/readers/main-reader';
import { portableReader } from '../modules/readers/portable-reader';

export const initFakeTagController = () => {
    IpcRoot.on<RFIDTag>(IPC_APP.FAKE_PORTABLE_TAG, (tag) => {
        portableReader.fakeTag(tag.uid, tag.rssi);
    });

    IpcRoot.on<RFIDTag>(IPC_APP.FAKE_MAIN_TAG, (tag) => {
        mainReader.fakeTag(tag.uid, tag.rssi);
    });
};
