import { IPC_APP } from '../databus/ipc/events';
import { RFIDTag } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { MainReader } from '../lib/readers/main-reader';
import { PortableReader } from '../lib/readers/portable-reader';

export const initFakeTagController = (mReader: MainReader, pReader: PortableReader) => {
    IpcRoot.on<RFIDTag>(IPC_APP.FAKE_PORTABLE_TAG, (tag) => {
        pReader.fakeTag(tag.uid, tag.rssi);
    });

    IpcRoot.on<RFIDTag>(IPC_APP.FAKE_MAIN_TAG, (tag) => {
        mReader.fakeTag(tag.uid, tag.rssi);
    });
};
