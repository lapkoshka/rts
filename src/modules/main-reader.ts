import { RootDispatcher } from '../index';
import MainReader from '../lib/readers/main-reader';

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

    mainReader.on('tag', (tag: string) => {
        console.log(tag);
        // dispatcher.sendEvent('onMainReaderTag', tag);
    });

    mainReader.startListen();
};

export default init;
