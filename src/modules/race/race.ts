import MainReader, { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import RSSITracePoint from '../../lib/rssi-trace-point';
import { UserData } from '../database/database';
import Lap from './domain/lap';
import { getUserByTag } from './domain/users';

interface Laps {
    [key: string]: Lap;
}
const currentLaps: Laps = {};

const onLapStartHandler = async (_: RSSITracePoint) => {
    // const user = await getUserByTag(tracePoint.tag);
};

const onLapFinishHandler = async (_: UserData, __: number) => {
    // const user = await getUserByTag(tracePoint.tag);
};

export const getLap = async (tag: RFIDTag): Promise<Lap> => {
    const lap = currentLaps[tag.uid];
    if (lap) {
        return lap;
    }

    const user = await getUserByTag(tag);
    if (!user) {
        return;
    }

    return createLap(tag, user);
};

const createLap = (tag: RFIDTag, user: UserData): Lap => {
    const lap = new Lap(user);
    lap.onStart = onLapStartHandler;
    lap.onFinish = onLapFinishHandler;
    currentLaps[tag.uid] = lap;

    return lap;
};

const handleRecievedTag = async (tag: RFIDTag): Promise<void> => {
    const lap = await getLap(tag);
    if (!lap) {
        return;
    }

    lap.appendTag(tag);
};

const init = (mainReader: MainReader): void => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        handleRecievedTag(tag);
    });
};

export default init;
