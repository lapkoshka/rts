import { RootDispatcher } from '../index';
import MainReader, { READER_EVENT } from '../lib/readers/base-reader';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    mainReader.on(READER_EVENT.CONNECTING_START, () => {
        dispatcher.sendEvent('onMainReaderConnectingStart');
    });

    mainReader.on(READER_EVENT.CONNECTED, () => {
        dispatcher.sendEvent('onMainReaderConnected');
    });

    mainReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        dispatcher.sendEvent('onMainReaderConnectingFailed', message);
    });

    mainReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        dispatcher.sendEvent('onMainReaderDisconnected', message);
    });

    mainReader.on(READER_EVENT.ON_IP_RECIEVED, (ip: string) => {
        dispatcher.sendEvent('onMainReaderIpReceived', ip);
    });
};

export default init;
