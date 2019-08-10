import { RootDispatcher } from '../index';
import MainReader from '../lib/readers/main-reader';
import { RFIDTag } from '../lib/types';

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

    mainReader.on('tag', (tag: RFIDTag) => {
        dispatcher.sendEvent('onMainReaderTag', tag);
    });
};

export default init;
