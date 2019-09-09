import Lap, { LAP_EVENT } from '../../lib/domain/lap';
import { RFIDTag } from '../../lib/readers/base-reader';
import { insertRace } from '../../modules/database/race';
import { UserData } from '../../modules/database/users';
import { getUserByTag } from '../../modules/users';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateRaceInfoView } from './race-info-view';

export interface Laps {
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
        // TODO: decorate as finished
        updateRaceInfoView(currentLaps);

        setTimeout(() => {
            delete currentLaps[lap.user.uid];
            updateRaceInfoView(currentLaps);
            updateTotalInfo();
            updateRaceHistory();
        }, 2000);
        return;
    }

    if (startTrace && startTrace.completed) {
        updateRaceInfoView(currentLaps);
    }
};

const createLap = (tag: RFIDTag, user: UserData): Lap => {
    const lap = new Lap(user);
    lap.on(LAP_EVENT.ON_START, lapEventHandler);
    lap.on(LAP_EVENT.ON_FINISH, lapEventHandler);
    currentLaps[tag.uid] = lap;

    return lap;
};
