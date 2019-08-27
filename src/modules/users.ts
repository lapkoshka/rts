import { RootDispatcher } from '../index';
import { toHumanReadableTime } from '../lib/functions';
import { getUserRaces, RaceData } from './database/database';

export const updateUsersView = async (dispatcher: RootDispatcher) => {
    getUserRaces().then((raceData: RaceData[]) => {
        const updateData = raceData.map((row: RaceData) => ({
                ...row,
                besttime: toHumanReadableTime(row.besttime),
        }));
        dispatcher.sendEvent('onUsersDataUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
