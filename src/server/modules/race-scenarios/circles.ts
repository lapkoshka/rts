import { Race, RACE_EVENT, RaceParams } from '../../lib/domain/race';
import { RFIDTag } from '../../lib/readers/base-reader';
import { viewUpdater } from '../../view-data/view-updater';
import { dbMorda } from '../database/database';
import { UserData } from '../database/tables/users';

export interface Races {
    [key: string]: Race;
}

export const currentRaces: Races = {};

const writeRace = async (race: Race): Promise<void> => {
    try {
        const contestId = await dbMorda.contests.getCurrentContestId();
        const raceId = await dbMorda.races.insertRace(race.user.id, contestId, race.getTotalTime());

        let counter = 0;
        for (const lap of race.laps) {
            await dbMorda.laps.insertLap(raceId, counter, lap.getTotalTime());
            counter++;
        }
    } catch (e) {
        throw Error(e);
    }
};

const createRace = (uid: string, user: UserData, params: RaceParams): Race => {
    const race = new Race(user, params);
    race.on(RACE_EVENT.START, () => {
        viewUpdater.race.updateRaceInfo();
    });

    race.on(RACE_EVENT.LAP_FINISH, () => {
        viewUpdater.race.updateRaceInfo();
    });

    race.on(RACE_EVENT.FINISH, async () => {
        const race = currentRaces[uid];
        await writeRace(race);
        delete currentRaces[uid];

        viewUpdater.race.updateRaceInfo();
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
        viewUpdater.race.updateRaceInfo();
    };
}
