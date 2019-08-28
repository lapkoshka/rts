import MainReader, { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { UserData } from '../database/database';
import rootDispatcher from '../dispatcher/root-dispatcher';
import Lap from './domain/lap';
import { getUserByTag } from './domain/users';

interface Laps {
    [key: string]: Lap;
}
const currentLaps: Laps = {};

const getLap = async (tag: RFIDTag): Promise<Lap> => {
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

const onLapEventHandler = (lap: Lap) =>
    rootDispatcher.sendEvent('onUserInfo', lap);

const createLap = (tag: RFIDTag, user: UserData): Lap => {
    const lap = new Lap(user);
    // TODO:
    lap.on('lapEvent', evt => {

    });

    lap.onStart = onLapEventHandler;
    lap.onFinish = onLapEventHandler;
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
