import { Nullable } from '../../../common/types';
import { IPC_RACE } from '../../ipc/ipc-events';
import { defaultRaceParams, RaceParams } from '../../lib/domain/race';
import { READER_EVENT, RFIDTag } from '../../lib/readers/base-reader';
import { dbMorda } from '../../modules/database/database';
import { UserData } from '../../modules/database/tables/users';
import { rootDispatcher } from '../../modules/dispatcher/root-dispatcher';
import { mainReader } from '../../modules/readers/main-reader';
import { getUserByTag } from '../../modules/users';
import { closeRace, getRace } from './race-scenario';

let raceParams = defaultRaceParams;

const selectUser = (users: UserData[], userId: number, contestId: number): Nullable<UserData> =>
    users.find((user: UserData) => user.id === userId && user.contests.some((id: number) => id === contestId));


export const initRaceController = (): void => {
    rootDispatcher.addPageListener(IPC_RACE.UPDATE_RACE_PARAMS, (_, params: RaceParams) => {
        raceParams = params;
    });

    rootDispatcher.addPageListener(IPC_RACE.ON_CLOSE_RACE, (_, uid: string) => {
        closeRace(uid);
    });

    mainReader.on(READER_EVENT.TAG, async (tag: RFIDTag) => {
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

        const race = getRace(tag, user, raceParams);
        race.appendTag(tag);
    });
};
