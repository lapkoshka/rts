import { IPC_RACE } from '../../databus/ipc/events';
import { toHumanReadableTime } from '../../lib/functions';
import { IpcRoot } from '../../databus/ipc/root';
import { currentRaces as racesState } from './../../controllers/race/race-scenario';

export interface CurrentRaceRow {
    uid: string;
    username: string;
    laps: string;
    bestlap: string;
}

export type CurrentRaces = CurrentRaceRow[];

export const updateRaceInfo = (): void => {
    const currentRaces = Object.keys(racesState)
        .reduce((currentRaces: CurrentRaces, uid: string) => {
            const race = racesState[uid];
            const bestTime = race.getBestTime();
            currentRaces.push({
                uid,
                username: `${race.user.firstname} ${race.user.lastname}`,
                laps: race.getLapsCounter(),
                bestlap: bestTime ? toHumanReadableTime(bestTime) : '-',
            });

            return currentRaces;
        }, []);

    IpcRoot.send<CurrentRaces>(IPC_RACE.CURRENT_RACES_CHANGED, currentRaces);
};
