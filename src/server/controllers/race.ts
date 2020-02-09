import { Nullable } from '../../common/types';
import { IPC_RACE } from '../databus/ipc/events';
import { defaultRaceParams, RaceParams } from '../lib/domain/race';
import { READER_EVENT, RFIDTag } from '../lib/readers/base-reader';
import { MainReader } from '../lib/readers/main-reader';
import { UserData } from '../storage/domains/users';
import { dbMorda } from '../storage/tools/database/database';
import { IpcRoot } from '../databus/ipc/root';
import { CirclesScenario } from '../modules/race-scenarios/circles';

let raceParams = defaultRaceParams;

const selectUser = (users: UserData[], userId: number, contestId: number): Nullable<UserData> =>
    users.find((user: UserData) =>
        user.id === userId && user.contests.some((id: number) => id === contestId));

export const initRaceController = (mReader: MainReader): void => {
    IpcRoot.on<RaceParams>(IPC_RACE.UPDATE_RACE_PARAMS, (params) => {
        raceParams = params;
    });

    IpcRoot.on<string>(IPC_RACE.ON_CLOSE_RACE, (uid) => {
        CirclesScenario.closeRace(uid);
    });

    mReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
        try {
            const userId = await dbMorda.tagsMethods.getUserId(tag.uid);
            if (!userId) {
                return;
            }

            const contestId = await dbMorda.contests.getCurrentContestId();
            if (!contestId) {
                return;
            }

            const users = await dbMorda.users.getUsers();
            const user = selectUser(users, userId, contestId);

            if (!user) {
                return;
            }

            CirclesScenario.appendTag(tag, user, raceParams);
        } catch (e) {
            throw Error(e);
        }
    });
};
