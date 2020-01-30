import { Lap } from '../../lib/domain/lap';
import { RFIDTag } from '../../lib/readers/base-reader';
import { dbMorda } from '../../modules/database/database';
import { insertRace } from '../../modules/database/tables/races';
import { UserData } from '../../modules/database/tables/users';

import { Race, RACE_EVENT, RaceParams } from '../../lib/domain/race';
import { viewUpdater } from '../../view-data/view-updater';
import { updateRaceHistory } from '../results/history';
import { updateTotalInfo } from '../results/total';
import { updateRaceInfoView } from './race-info-view';

export interface Races {
    [key: string]: Race;
}

const currentRaces: Races = {};

const raceStartHandler = (): void => {
    updateRaceInfoView(currentRaces);
};

const raceLapFinishHandler = (user: UserData, lap: Lap, raceId: number): void => {
    insertRace(user.uid, lap.getTotalTime());
    await dbMorda.laps.insertLap();

    viewUpdater.results.update()//??
    updateRaceInfoView(currentRaces);
    updateTotalInfo();
    updateRaceHistory();
};

const raceFinishHandler = async (uid: string, id: number): void => {
    delete currentRaces[uid];
    await dbMorda.races.finishRace(raceId);

    viewUpdater.results.update()//??
    updateRaceInfoView(currentRaces);
    updateTotalInfo();
    updateRaceHistory();
};

const createRace = async (user: UserData, params: RaceParams, uid: string): Race => {
    const raceId = await dbMorda.races.createRace(user.id, contestId);
    const race = new Race(raceId, user, params);
    race.on(RACE_EVENT.START, raceStartHandler);
    race.on(RACE_EVENT.LAP_FINISH, (lap: Lap) => {
        raceLapFinishHandler(user, lap, raceId);
    });
    race.on(RACE_EVENT.FINISH, () => {
        raceFinishHandler(uid, raceId);
    });

    return race;
};

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
