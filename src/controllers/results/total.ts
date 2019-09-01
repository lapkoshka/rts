import { toHumanReadableTime } from '../../lib/functions';
import { getTotalUserRaces, UserRacesData } from '../../modules/database/database';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

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
