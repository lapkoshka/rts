import MainReader, { READER_EVENT } from '../lib/readers/base-reader';
import rootDispatcher from './dispatcher/root-dispatcher';

const init = (mainReader: MainReader) => {
    mainReader.on(READER_EVENT.CONNECTING_START, () => {
        rootDispatcher.sendEvent('onMainReaderConnectingStart');
    });

    mainReader.on(READER_EVENT.CONNECTED, () => {
        rootDispatcher.sendEvent('onMainReaderConnected');
    });

    mainReader.on(READER_EVENT.CONNECTING_FAILED, (message: string) => {
        rootDispatcher.sendEvent('onMainReaderConnectingFailed', message);
    });

    mainReader.on(READER_EVENT.DISCONNECT, (message: string) => {
        rootDispatcher.sendEvent('onMainReaderDisconnected', message);
    });

    mainReader.on(READER_EVENT.ON_IP_RECIEVED, (ip: string) => {
        rootDispatcher.sendEvent('onMainReaderIpReceived', ip);
    });
};

export default init;
