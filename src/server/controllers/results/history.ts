import { toHumanReadableTime } from '../../lib/functions';
import { getRaces, RaceData } from '../../modules/database/race';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

export interface RaceHistoryRow extends RaceData {
    username: string;
    formattedTIme: string;
};

export type RaceHistory = RaceHistoryRow[];

export const updateRaceHistory = (): void => {
    getRaces().then((raceData: RaceData[]) => {
        const updateData: RaceHistory = raceData.map((race: RaceData) => ({
            ...race,
            username: race.firstname + ' ' + race.lastname,
            formattedTIme: toHumanReadableTime(race.time),
        }));
        rootDispatcher.sendEvent('onRaceHistoryUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
