import { toHumanReadableTime } from '../../lib/functions';
import { getTotalUserRaces, UserRacesData } from './../database/database';
import rootDispatcher from './../dispatcher/root-dispatcher';

export const updateTotalInfo = (): void => {
    getTotalUserRaces().then((userRacesData: UserRacesData[]) => {
        const updateData = userRacesData.map((row: UserRacesData) => ({
                ...row,
                besttime: toHumanReadableTime(row.besttime),
        }));
        rootDispatcher.sendEvent('onTotalInfoUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
