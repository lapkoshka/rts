import PortableReader, { READER_EVENT } from '../lib/readers/base-reader';
import { RootDispatcher } from '../index';
import { getUser, UserData } from './database/database';


const init = (portableReader: PortableReader, dispatcher: RootDispatcher) => {
    portableReader.on(READER_EVENT.CONNECTING_START, () => {
        dispatcher.sendEvent('onPortableReaderConnectingStart');
    });

    portableReader.on(READER_EVENT.CONNECTED, () => {
        dispatcher.sendEvent('onPortableReaderConnected');
    });

    portableReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        dispatcher.sendEvent('onPortableReaderConnectingFailed', message);
    });

    portableReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        dispatcher.sendEvent('onPortableReaderDisconnected', message);
    });

    portableReader.on(READER_EVENT.TAG, async (tag: string) => {
        getUser(tag).then((user: UserData) => {
            dispatcher.sendEvent('onPortableReaderTag', user);
        }).catch((err: Error) => {
           throw err;
        });
    });
};

export default init;
