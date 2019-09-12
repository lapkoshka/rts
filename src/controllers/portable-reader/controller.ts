import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { getUser, UserData } from '../../modules/database/users';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { portableReader } from '../../modules/readers/portable-reader';

export default () => {
    portableReader.on(READER_EVENT.CONNECTING_START, () => {
        rootDispatcher.sendEvent('onPortableReaderConnectingStart');
    });

    portableReader.on(READER_EVENT.CONNECTED, () => {
        rootDispatcher.sendEvent('onPortableReaderConnected');
    });

    portableReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        rootDispatcher.sendEvent('onPortableReaderConnectingFailed', message);
    });

    portableReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        rootDispatcher.sendEvent('onPortableReaderDisconnected', message);
    });

    portableReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        getUser(tag.uid).then((user: UserData) => {
            rootDispatcher.sendEvent('onPortableReaderTag', user);
        }).catch((err: Error) => {
            throw err;
        });
    });
};

