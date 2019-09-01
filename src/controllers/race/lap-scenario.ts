import Lap, { LAP_EVENT } from '../../lib/domain/lap';
import { RFIDTag } from '../../lib/readers/base-reader';
import { insertRace, UserData } from '../../modules/database/database';
import { getUserByTag } from '../../modules/users';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { lapViewController } from './view-controller';

interface Laps {
    [key: string]: Lap;
}
const currentLaps: Laps = {};

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

const lapEventHandler = (lap: Lap) => {
    const {startTrace, finishTrace } = lap;

    if (finishTrace && finishTrace.completed) {
        insertRace(lap.user.uid, lap.getTotalTime());
        lapViewController.decorateUserAsFinished(lap);

        setTimeout(async () => {
            await lapViewController.removeUser(lap.user);
            delete currentLaps[lap.user.uid];
            updateTotalInfo();
            updateRaceHistory();
        }, 2000);
        return;
    }

    if (startTrace && startTrace.completed) {
        lapViewController.addUser(lap);
    }
};

const createLap = (tag: RFIDTag, user: UserData): Lap => {
    const lap = new Lap(user);
    lap.on(LAP_EVENT.ON_START, lapEventHandler);
    lap.on(LAP_EVENT.ON_FINISH, lapEventHandler);
    currentLaps[tag.uid] = lap;

    return lap;
};
