import { IPC_RACE } from '../../ipc/ipc-events';
import { defaultRaceParams } from '../../lib/domain/lap';
import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { getUserByTag } from '../../modules/users';
import { getLap } from './lap-scenario';

export interface RaceParams {
    rssiFilter: [number, number];
    rssiTraceTimeout: number;
}

let raceParams = defaultRaceParams;

export default (): void => {
    rootDispatcher.addPageListener(IPC_RACE.UPDATE_RACE_PARAMS, (_, params: RaceParams) => {
        raceParams = params;
    });

    mainReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        const user = await getUserByTag(tag);
        if (!user) {
            return;
        }

        const lap = await getLap(tag, user, raceParams);
        lap.appendTag(tag);
    });
};
