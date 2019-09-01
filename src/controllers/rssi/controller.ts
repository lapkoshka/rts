import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';

export default () => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        rootDispatcher.sendEvent('onMainReaderTag', tag);
    });

    rootDispatcher.addPageListener('onUsernameClick', (_: any, user: object) => {
        rootDispatcher.sendEvent('onUsernameClick', user);
    });
};
