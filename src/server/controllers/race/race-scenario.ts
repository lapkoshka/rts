// import Lap, { LAP_EVENT } from '../../lib/domain/lap';
// import { RFIDTag } from '../../lib/readers/base-reader';
// import { insertRace } from '../../modules/database/race';
// import { UserData } from '../../modules/database/users';
// import { updateRaceHistory } from '../results/history';
// import { updateTotalInfo } from '../results/total';
// import { RaceParams } from './controller';
// import { updateRaceInfoView } from './race-info-view';

export interface Races {
    [key: string]: Race;
}

const currentRaces: Races = {};

// TODO: work in progress...


export const getRace = (tag: RFIDTag, user: UserData, params: RaceParams): Race => {
    let race = currentRaces[tag.uid];
    if (race) {
        return race;
    }

    race = new Race(user, params);
    race.on(RACE_EVENT.START, raceEventHandler);
    race.on(RACE_EVENT.ON_LAP_FINISH, raceEventHandler);
    race.on(RACE_EVENT.FINISH, raceEventHandler);
    currentRaces[tag.uid] = race;

    return race;
};

const raceEventHandler = () => {
        // insertRace(lap.user.uid, lap.getTotalTime());
        // updateRaceInfoView(currentLaps);
        // updateTotalInfo();
        // updateRaceHistory();
};
