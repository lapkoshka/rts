import PortableReader, { READER_EVENT } from '../lib/readers/base-reader';
import { getUser, UserData } from './database/database';
import rootDispatcher from './dispatcher/root-dispatcher';


const init = (portableReader: PortableReader) => {
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

    portableReader.on(READER_EVENT.TAG, async (tag: string) => {
        getUser(tag).then((user: UserData) => {
            rootDispatcher.sendEvent('onPortableReaderTag', user);
        }).catch((err: Error) => {
           throw err;
        });
    });
};

export default init;
