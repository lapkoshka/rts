import BaseReader from '../../lib/readers/base-reader';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { portableReader } from '../../modules/readers/portable-reader';

const switchReader = (reader: BaseReader): void => {
    if (reader.isConnected) {
        reader.kill();
        return;
    }

    reader.startListen();
};

export default () => {
    rootDispatcher.addPageListener('portableReaderTriggerClick', () => {
        switchReader(portableReader);
    });

    rootDispatcher.addPageListener('mainReaderTriggerClick', () => {
        switchReader(mainReader);
    });
};
