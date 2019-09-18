import { toHumanReadableTime } from '../../lib/functions';
import { getRaces, RaceData } from '../../modules/database/race';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

export const updateRaceHistory = (): void => {
    getRaces().then((raceData: RaceData[]) => {
        const updateData = raceData.map((race: RaceData) => ({
            ...race,
            username: race.firstname + ' ' + race.lastname,
            time: toHumanReadableTime(race.time),
        }));
        rootDispatcher.sendEvent('onRaceHistoryUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
