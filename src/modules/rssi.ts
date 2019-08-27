import { RootDispatcher } from '../index';
import { READER_EVENT, RFIDTag } from '../lib/readers/base-reader';
import MainReader from '../lib/readers/main-reader';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        dispatcher.sendEvent('onMainReaderTag', tag);
    });

    dispatcher.addPageListener('onUsernameClick', (_: any, user: object) => {
        dispatcher.sendEvent('onUsernameClick', user);
    });
};

export default init;
