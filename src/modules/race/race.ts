import { RootDispatcher } from '../../index';
import MainReader from '../../lib/readers/main-reader';
import initTimeoutMode from './modes/by-timeout';

const init = (mainReader: MainReader, dispatcher: RootDispatcher) => {
    initTimeoutMode(mainReader, dispatcher);
};
