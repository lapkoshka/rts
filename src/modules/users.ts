import { toHumanReadableTime } from '../lib/functions';
import { getUserRaces, RaceData } from './database/database';
import rootDispatcher from './dispatcher/root-dispatcher';

export const updateUsersView = async () => {
    getUserRaces().then((raceData: RaceData[]) => {
        const updateData = raceData.map((row: RaceData) => ({
                ...row,
                besttime: toHumanReadableTime(row.besttime),
        }));
        rootDispatcher.sendEvent('onUsersDataUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
