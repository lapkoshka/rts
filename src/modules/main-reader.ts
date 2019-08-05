import { RootDispatcher } from '../index';
import MainReader from '../lib/readers/main-reader';
import { RFIDTag } from '../lib/types';
import { getUsersMap } from '../lib/users';
import { getUsers } from './database/database';
import { handleUserInRace } from './race';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on('connectingStart', () => {
        dispatcher.sendEvent('onMainReaderConnectingStart');
    });

    mainReader.on('connected', () => {
        dispatcher.sendEvent('onMainReaderConnected');
    });

    mainReader.on('connectingFailed', (message: string) => {
        dispatcher.sendEvent('onMainReaderConnectingFailed', message);
    });

    mainReader.on('disconnected', (message: string) => {
        dispatcher.sendEvent('onMainReaderDisconnected', message);
    });

    mainReader.on('onIpReceived', (ip: string) => {
        dispatcher.sendEvent('onMainReaderIpReceived', ip);
    });

    mainReader.on('tag', async (tag: string) => {
        const users = getUsersMap(await getUsers());
        const user = users.get(tag);
        if (!user) {
            return;
        }

        handleUserInRace(user);
    });
};

export default init;
