import { Lap } from '../../lib/domain/lap';
import { RFIDTag } from '../../lib/readers/base-reader';
import { insertRace } from '../../modules/database/tables/races';
import { UserData } from '../../modules/database/tables/users';

import { Race, RACE_EVENT, RaceParams } from '../../lib/domain/race';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateRaceInfoView } from './race-info-view';

export interface Races {
    [key: string]: Race;
}

const currentRaces: Races = {};

export const getRace = (tag: RFIDTag, user: UserData, params: RaceParams): Race => {
    const race = currentRaces[tag.uid];
    if (race) {
        return race;
    }

    currentRaces[tag.uid] = createRace(user, params, tag.uid);
    return currentRaces[tag.uid];
};

export const closeRace = (uid: string): void => {
   delete currentRaces[uid];
   updateRaceInfoView(currentRaces);
};

export const updateRaces = (): void => {
    updateRaceInfoView(currentRaces);
};

const createRace = (user: UserData, params: RaceParams, uid: string): Race => {
    const race = new Race(user, params);
    race.on(RACE_EVENT.START, raceStartHandler);
    race.on(RACE_EVENT.LAP_FINISH, (lap: Lap) => {
        raceLapFinishHandler(user, lap);
    });
    race.on(RACE_EVENT.FINISH, () => {
        raceFinishHandler(uid);
    });

    return race;
};

const raceStartHandler = (): void => {
    updateRaceInfoView(currentRaces);
};

const raceLapFinishHandler = (user: UserData, lap: Lap): void => {
    insertRace(user.uid, lap.getTotalTime());

    updateRaceInfoView(currentRaces);
    updateTotalInfo();
    updateRaceHistory();
};

const raceFinishHandler = (uid: string): void => {
    delete currentRaces[uid];

    updateRaceInfoView(currentRaces);
    updateTotalInfo();
    updateRaceHistory();
};
