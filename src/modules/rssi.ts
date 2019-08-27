import { RootDispatcher } from '../index';
import { READER_EVENT } from '../lib/readers/base-reader';
import MainReader from '../lib/readers/main-reader';
import { RFIDTag } from '../lib/types';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        dispatcher.sendEvent('onMainReaderTag', tag);
    });

    dispatcher.addPageListener('onUsernameClick', (evt: any, user: object) => {
        dispatcher.sendEvent('onUsernameClick', user);
    });
};

export default init;
