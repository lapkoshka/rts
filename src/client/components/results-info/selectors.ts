import { UserData } from '../../../server/modules/database/tables/users';
import { RootState } from '../../store';

export const selectCurrentUsers = (state: RootState): UserData[] => {
    const { selectedContest } = state.contestInfo;

    return selectedContest ? state.resultsInfo.users.filter((user: UserData) =>
        user.contests.some((id: number) => id === selectedContest)) : [];
};
