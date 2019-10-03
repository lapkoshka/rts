import Lap, { LAP_EVENT } from '../../lib/domain/lap';
import { RaceParams } from '../../lib/domain/race';
import { RFIDTag } from '../../lib/readers/base-reader';
import { insertRace } from '../../modules/database/race';
import { UserData } from '../../modules/database/users';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateRaceInfoView } from './race-info-view';

export interface Laps {
    [key: string]: Lap;
}

const currentLaps: Laps = {};

export const getLap = (tag: RFIDTag, user: UserData, params: RaceParams): Lap => {
    const lap = currentLaps[tag.uid];
    if (lap) {
        return lap;
    }

    return createLap(tag, user, params);
};

const lapEventHandler = (lap: Lap) => {
    const {startTrace, finishTrace } = lap;

    // TODO: replace lap-scenario to race-scenario here
    if (finishTrace && finishTrace.completed) {
        insertRace(lap.user.uid, lap.getTotalTime());
        delete currentLaps[lap.user.uid];

        // TODO: update raceInfoView with currentRaces
        updateRaceInfoView(currentLaps);
        updateTotalInfo();
        updateRaceHistory();

        return;
    }

    if (startTrace && startTrace.completed) {
        updateRaceInfoView(currentLaps);
    }
};

const createLap = (tag: RFIDTag, user: UserData, params: RaceParams): Lap => {
    const lap = new Lap(user, params);
    lap.on(LAP_EVENT.ON_START, lapEventHandler);
    lap.on(LAP_EVENT.ON_FINISH, lapEventHandler);
    currentLaps[tag.uid] = lap;

    return lap;
};
