import { RootDispatcher } from '../index';
import MainReader from '../lib/readers/main-reader';
import { RFIDTag } from '../lib/types';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on('tag', (tag: RFIDTag) => {
        dispatcher.sendEvent('onMainReaderTag', tag);
    });

    dispatcher.addPageListener('onUsernameClick', (evt: any, user: object) => {
        dispatcher.sendEvent('onUsernameClick', user);
    });
};

export default init;
