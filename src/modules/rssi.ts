import { READER_EVENT, RFIDTag } from '../lib/readers/base-reader';
import MainReader from '../lib/readers/main-reader';
import rootDispatcher from './dispatcher/root-dispatcher';

const init = (mainReader: MainReader) => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        rootDispatcher.sendEvent('onMainReaderTag', tag);
    });

    rootDispatcher.addPageListener('onUsernameClick', (_: any, user: object) => {
        rootDispatcher.sendEvent('onUsernameClick', user);
    });
};

export default init;
