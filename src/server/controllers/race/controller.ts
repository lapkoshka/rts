import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { mainReader } from '../../modules/readers/main-reader';
import { getLap } from './lap-scenario';

export default (): void => {
    mainReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        const lap = await getLap(tag);
        if (!lap) {
            return;
        }

        lap.appendTag(tag);
    });
};
