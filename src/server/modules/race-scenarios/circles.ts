import { Race, RACE_EVENT, RaceParams } from '../../lib/domain/race';
import { RFIDTag } from '../../lib/readers/base-reader';
import { Storage } from '../../storage';
import { UserData } from '../../storage/domains/users';
import { View } from '../../view';

export interface Races {
    [key: string]: Race;
}

export const currentRaces: Races = {};

const writeRace = async (race: Race): Promise<void> => {
    const contestId = await Storage.contests.getCurrentContestId();
    const raceId = await Storage.races.saveRace(race.user.id, contestId, race.getTotalTime());

    let counter = 0;
    for (const lap of race.laps) {
        Storage.races.saveLap(raceId, counter, lap.getTotalTime());
        counter++;
    }
};

const createRace = (uid: string, user: UserData, params: RaceParams): Race => {
    const race = new Race(user, params);
    race.on(RACE_EVENT.START, () => {
        View.race.updateRaceInfo();
    });

    race.on(RACE_EVENT.LAP_FINISH, () => {
        View.race.updateRaceInfo();
    });

    race.on(RACE_EVENT.FINISH, async () => {
        const race = currentRaces[uid];
        await writeRace(race);
        delete currentRaces[uid];

        View.race.updateRaceInfo();
        View.results.updateRaceHistory();
        View.results.updateTotalInfo();
    });

    return race;
};

export const getRace = (tag: RFIDTag, user: UserData, params: RaceParams): Race => {
    const { uid } = tag;
    const race = currentRaces[uid];
    if (race) {
        return race;
    }

    currentRaces[uid] = createRace(uid, user, params);
    return currentRaces[uid];
};

export class CirclesScenario {
    public static appendTag(tag: RFIDTag, user: UserData, params: RaceParams): void {
        const race = getRace(tag, user, params);
        race.appendTag(tag);
    }

    public static closeRace = (uid: string): void => {
        delete currentRaces[uid];
        View.race.updateRaceInfo();
    };
}
