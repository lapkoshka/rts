import { RootDispatcher } from '../../index';
import MainReader, { READER_EVENT } from '../../lib/readers/base-reader';
import RSSITracePoint from '../../lib/rssi-trace-point';
import { RFIDTag, User } from '../../lib/types';
import { getUserByTag } from '../../lib/users';
import Lap from './domain/lap';

interface Laps {
    [key: string]: Lap;
}
const currentLaps: Laps = {};

const onLapStartHandler = async (tracePoint: RSSITracePoint) => {
    // const user = await getUserByTag(tracePoint.tag);
};

const onLapFinishHandler = async (tracePoint: RSSITracePoint, time: number) => {
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

const createLap = (tag: RFIDTag, user: User): Lap => {
    const lap = new Lap(user);
    lap.onStart = onLapStartHandler;
    lap.onFinish = onLapFinishHandler;
    currentLaps[tag.uid] = lap;

    return lap;
};

const handleRecievedTag = async (tag: RFIDTag, dispatcher: RootDispatcher): Promise<void> => {
    const lap = await getLap(tag);
    if (!lap) {
        return;
    }

    lap.appendTag(tag);
};

const init = (mainReader: MainReader, dispatcher: RootDispatcher): void => {
    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        handleRecievedTag(tag, dispatcher);
    });
};

export default init;
