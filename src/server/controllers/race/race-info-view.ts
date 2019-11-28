import { IPC_RACE } from '../../ipc/ipc-events';
import { toHumanReadableTime } from '../../lib/functions';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { Races } from './race-scenario';

export interface CurrentRaceRow {
    uid: string;
    username: string;
    laps: string;
    bestlap: string;
}

export type CurrentRaces = CurrentRaceRow[];

export const updateRaceInfoView = (races: Races) => {
    const currentRaces = Object.keys(races)
        .reduce((currentRaces: CurrentRaces, uid: string) => {
            const race = races[uid];
            const bestTime = race.getBestTime();
            currentRaces.push({
                uid,
                username: `${race.user.firstname} ${race.user.lastname}`,
                laps: race.getLapsCounter(),
                bestlap: bestTime ? toHumanReadableTime(bestTime) : '-',
            });

            return currentRaces;
        }, []);

    rootDispatcher.sendEvent(IPC_RACE.CURRENT_RACES_CHANGED, currentRaces);
};
