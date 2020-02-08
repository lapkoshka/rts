import { IPC_MAIN_READER, IPC_PORTABLE_READER } from '../../databus/ipc/events';
import { BaseReader } from '../../lib/readers/base-reader';
import { MainReaderSettings } from '../../lib/readers/main-reader';
import { IpcRoot } from '../../databus/ipc/root';
import { mainReader } from '../../modules/readers/main-reader';
import { portableReader } from '../../modules/readers/portable-reader';

const switchReader = (reader: BaseReader): void => {
    if (reader.isConnected) {
        reader.kill();
        return;
    }

    reader.startListen();
};

export const initSmartbannerController = () => {
    IpcRoot.on(IPC_PORTABLE_READER.TRIGGER_CLICK, () => {
        switchReader(portableReader);
    });

    IpcRoot.on<MainReaderSettings>(IPC_MAIN_READER.TRIGGER_CLICK, (settings) => {
        mainReader.settings = settings;
        switchReader(mainReader);
    });
};
