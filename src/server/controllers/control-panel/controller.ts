
import { IPC_MAIN_READER, IPC_PORTABLE_READER } from '../../ipc/ipc-events';
import { BaseReader } from '../../lib/readers/base-reader';
import { MainReaderSettings } from '../../lib/readers/main-reader';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
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
    rootDispatcher.addPageListener(IPC_PORTABLE_READER.TRIGGER_CLICK, () => {
        switchReader(portableReader);
    });

    rootDispatcher.addPageListener(IPC_MAIN_READER.TRIGGER_CLICK, (_, settings: MainReaderSettings) => {
        mainReader.settings = settings;
        switchReader(mainReader);
    });
};
