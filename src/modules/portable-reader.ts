import PortableReader from '../lib/readers/portable-reader';
import { RootDispatcher } from '../index';
import { getUsersMap } from '../lib/users';
import { getUser, getUsers } from './database/database';


const init = (portableReader: PortableReader, dispatcher: RootDispatcher) => {
    portableReader.on('connectingStart', () => {
        dispatcher.sendEvent('onPortableReaderConnectingStart');
    });

    portableReader.on('connected', () => {
        dispatcher.sendEvent('onPortableReaderConnected');
    });

    portableReader.on('connectingFailed', (message: string) => {
        dispatcher.sendEvent('onPortableReaderConnectingFailed', message);
    });

    portableReader.on('disconnected', (message: string) => {
        dispatcher.sendEvent('onPortableReaderDisconnected', message);
    });

    portableReader.on('tag', async (tag: string) => {
        const user = await getUser(tag);

        dispatcher.sendEvent('onPortableReaderTag', user);
    });
};

export default init;
