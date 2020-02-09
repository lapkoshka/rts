import { IPC_RESULTS } from '../../databus/ipc/events';
import { toHumanReadableTime } from '../../lib/functions';
import { UserData } from '../../storage/domains/users';
import { dbMorda } from '../../storage/tools/database/database';
import { RaceData, UserRacesData } from '../../storage/tools/database/tables/races';
import { IpcRoot } from '../../databus/ipc/root';
import { Storage } from '../../storage';

export interface TotalInfoRow extends UserRacesData {
    username: string;
    formattedTime: string;
}

export type TotalInfo = TotalInfoRow[];

export interface RaceHistoryRow extends RaceData {
    username: string;
    formattedTime: string;
}

export type RaceHistory = RaceHistoryRow[];

export const updateUsersData = async (): Promise<void> => {
    try {
        const selectedContestId = Storage.contests.getSelectedContest();
        const users: UserData[] = await dbMorda.users.getUsersByContest(selectedContestId);
        IpcRoot.send<UserData[]>(IPC_RESULTS.USERS_DATA_UPDATE, users);
    } catch (e) {
        throw Error(e);
    }
};

export const updateRaceHistory = async (): Promise<void> => {
    try {
        const selectedContestId = Storage.contests.getSelectedContest();
        const raceData = await dbMorda.races.getRacesByContest(selectedContestId);

        const updateData = raceData.map((race: RaceData) => ({
            ...race,
            username: race.firstname + ' ' + race.lastname,
            formattedTime: toHumanReadableTime(race.time),
        }));

        IpcRoot.send<RaceHistory>(IPC_RESULTS.RACE_HISTORY_UPDATE, updateData);
    } catch (e) {
        throw Error(e);
    }
};

export const updateTotalInfo = async (): Promise<void> => {
    // const totalInfo =
    // const updateData
    // IpcRoot.send(IPC_RESULTS.TOTAL_INFO_UPDATE, updateData);


    // getTotalUserRaces().then((userRacesData: UserRacesData[]) => {
    //     const updateData: TotalInfo = userRacesData.map((row: UserRacesData) => ({
    //         ...row,
    //         username: row.firstname + ' ' + row.lastname,
    //         formattedTime: toHumanReadableTime(row.besttime),
    //     }));
    //     IpcRoot.send(IPC_RESULTS.TOTAL_INFO_UPDATE, updateData);
    // }).catch((err: Error) => {
    //     throw err;
    // });
};
