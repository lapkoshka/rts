import { toHumanReadableTime } from '../../lib/functions';
import { getTotalUserRaces, UserRacesData } from '../../modules/database/race';
import rootDispatcher from '../../modules/dispatcher/root-dispatcher';

interface TotalInfoRow extends UserRacesData {
  username: string;
  formattedTime: string;
}

export type TotalInfo = TotalInfoRow[];

export const updateTotalInfo = (): void => {
    getTotalUserRaces().then((userRacesData: UserRacesData[]) => {
        const updateData: TotalInfo = userRacesData.map((row: UserRacesData) => ({
                ...row,
                username: row.firstname + ' ' + row.lastname,
                formattedTime: toHumanReadableTime(row.besttime),
        }));
        rootDispatcher.sendEvent('onTotalInfoUpdate', updateData);
    }).catch((err: Error) => {
        throw err;
    });
};
