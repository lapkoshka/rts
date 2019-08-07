import { RootDispatcher } from '../index';
import { toHumanReadableTime } from '../lib/users';
import { getUserRaces, getUsers } from './database/database';
import { Race } from '../lib/types';

export const updateUsersView = async (dispatcher: RootDispatcher) => {
    const data = await getUserRaces();
    dispatcher.sendEvent('onUsersDataUpdate', data.map((row: Race) => {
        return {
            ...row,
            besttime: toHumanReadableTime(row.besttime),
        };
    }));
};
