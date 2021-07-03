import { IPC_MAIN_READER, IPC_PORTABLE_READER } from '../databus/ipc/events';
import { BaseReader } from '../lib/readers/base-reader';
import { MainReader, MainReaderSettings } from '../lib/readers/main-reader';
import { IpcRoot } from '../databus/ipc/root';
import { PortableReader } from '../lib/readers/portable-reader';

const switchReader = (reader: BaseReader): void => {
    if (reader.isConnected) {
        reader.kill();
        return;
    }

    reader.startListen();
};

export const initSmartbannerController = (mReader: MainReader, pReader: PortableReader) => {
    IpcRoot.on(IPC_PORTABLE_READER.TRIGGER_CLICK, () => {
        switchReader(pReader);
    });

    IpcRoot.on<MainReaderSettings>(IPC_MAIN_READER.TRIGGER_CLICK, (settings) => {
        mReader.settings = settings;
        switchReader(mReader);
    });
};
