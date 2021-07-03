import { IPC_RESULTS } from '../../databus/ipc/events';
import { IpcRoot } from '../../databus/ipc/root';
import { toHumanReadableTime } from '../../lib/functions';
import { Storage } from '../../storage';
import { RaceData, UserRacesData } from '../../storage/domains/races';
import { UserData } from '../../storage/domains/users';
import { getUsername } from '../formatters/users';

export type RaceHistoryViewData = Array<{
    id: number;
    username: string;
    lapsCounter: string;
    totalTime: string;
    bestLapTime: string;
}>

export type UserInfoViewData = Array<{
    uid: string;
    username: string;
}>

export type TotalInfoViewData = Array<{
    username: string;
    formattedTime: string;
    count: number;
}>

export class ResultsViewUpdater {
    public static async updateRaceHistory(): Promise<void> {
        const selectedContestId = await Storage.contests.getSelectedContest();
        const raceHistory = await this.getRaceHistory(selectedContestId);
        IpcRoot.send<RaceHistoryViewData>(IPC_RESULTS.RACE_HISTORY_UPDATE, raceHistory);

        const currentContestId = await Storage.contests.getCurrentContestId();
        if (currentContestId === selectedContestId) {
            IpcRoot.send<RaceHistoryViewData>(IPC_RESULTS.CURRENT_RACE_HISTORY_UPDATE, raceHistory);
            return;
        }

        const currentRaceHistory = await this.getRaceHistory(currentContestId);
        IpcRoot.send<RaceHistoryViewData>(IPC_RESULTS.CURRENT_RACE_HISTORY_UPDATE, currentRaceHistory);
    }

    public static async updateUsersData(): Promise<void> {
        const selectedContestId = await Storage.contests.getSelectedContest();
        const userData = await this.getUserData(selectedContestId);
        IpcRoot.send<UserInfoViewData>(IPC_RESULTS.USERS_DATA_UPDATE, userData);

        const currentContestId = await Storage.contests.getCurrentContestId();
        if (currentContestId === selectedContestId) {
            IpcRoot.send<UserInfoViewData>(IPC_RESULTS.CURRENT_USERS_DATA_UPDATE, userData);
            return;
        }

        const currentUserData = await this.getUserData(currentContestId);
        IpcRoot.send<UserInfoViewData>(IPC_RESULTS.CURRENT_USERS_DATA_UPDATE, currentUserData);
    }

    public static async updateTotalInfo(): Promise<void> {
        const selectedContestId = await Storage.contests.getSelectedContest();
        const totalInfo = await this.getTotalInfo(selectedContestId);
        IpcRoot.send<TotalInfoViewData>(IPC_RESULTS.TOTAL_INFO_UPDATE, totalInfo);

        const currentContestId = await Storage.contests.getCurrentContestId();
        if (currentContestId === selectedContestId) {
            IpcRoot.send<TotalInfoViewData>(IPC_RESULTS.CURRENT_TOTAL_INFO_UPDATE, totalInfo);
        }

        const currentTotalInfo = await this.getTotalInfo(currentContestId);
        IpcRoot.send<TotalInfoViewData>(IPC_RESULTS.CURRENT_TOTAL_INFO_UPDATE, currentTotalInfo);
    }

    private static async getRaceHistory(contestId: number): Promise<RaceHistoryViewData> {
        const raceData = await Storage.races.getRacesByContest(contestId);

        return raceData.map((race: RaceData) => ({
            id: race.id,
            lapsCounter: `${race.lapsCount}/${race.lapsCount}`,
            username: getUsername(race),
            totalTime: toHumanReadableTime(race.totalTime),
            bestLapTime: toHumanReadableTime(race.bestLapTime)
        }));
    }

    private static async getUserData(contestId: number): Promise<UserInfoViewData> {
        const usersByContests = await Storage.users.getUsersByContest(contestId);

        return usersByContests.map((user: UserData) => ({
            uid: user.uid,
            username: getUsername(user),
        }));
    }

    private static async getTotalInfo(contestId: number): Promise<TotalInfoViewData> {
        const totalInfoByContests = await Storage.races.getTotalInfoByContests(contestId);

        return totalInfoByContests.map((row: UserRacesData) => ({
                count: row.count,
                username: getUsername(row),
                formattedTime: toHumanReadableTime(row.besttime),
            }));
    }
}
