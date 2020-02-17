import { IPC_RESULTS } from '../../databus/ipc/events';
import { IpcRoot } from '../../databus/ipc/root';
import { toHumanReadableTime } from '../../lib/functions';
import { Storage } from '../../storage';
import { RaceData, UserRacesData } from '../../storage/domains/races';
import { UserData } from '../../storage/domains/users';
import { getUsername } from '../formatters/users';

export type UserInfoViewData = Array<{
    uid: string;
    username: string;
}>

export type TotalInfoViewData = Array<{
    username: string;
    formattedTime: string;
    count: number;
}>

export type RaceHistoryViewData = Array<{
    id: number;
    username: string;
    formattedTime: string;
}>

export class ResultsViewUpdater {
    public static async updateUsersData(): Promise<void> {
        const selectedContestId = Storage.contests.getSelectedContest();
        const usersByContests = await Storage.users.getUsersByContest(selectedContestId);

        const updateData = usersByContests.map((user: UserData) => ({
            uid: user.uid, // todo fix
            username: getUsername(user),
        }));

        IpcRoot.send<UserInfoViewData>(IPC_RESULTS.USERS_DATA_UPDATE, updateData);
    }

    public static async updateRaceHistory(): Promise<void> {
        const selectedContestId = Storage.contests.getSelectedContest();
        const raceData = await Storage.races.getRacesByContest(selectedContestId);

        const updateData = raceData.map((race: RaceData) => ({
            id: race.id,
            username: getUsername(race),
            formattedTime: toHumanReadableTime(race.time),
        }));

        IpcRoot.send<RaceHistoryViewData>(IPC_RESULTS.RACE_HISTORY_UPDATE, updateData);
    }

    public static async updateTotalInfo(): Promise<void> {
        const selectedContestId = await Storage.contests.getSelectedContest();
        const totalInfoByContests = await Storage.races.getTotalInfoByContests(selectedContestId);
        const updateData = totalInfoByContests
            .map((row: UserRacesData) => ({
                count: row.count,
                username: getUsername(row),
                formattedTime: toHumanReadableTime(row.besttime),
            }));
        IpcRoot.send<TotalInfoViewData>(IPC_RESULTS.TOTAL_INFO_UPDATE, updateData);
    }
}
