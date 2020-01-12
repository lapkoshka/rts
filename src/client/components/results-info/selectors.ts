import { UserData } from '../../../server/modules/database/tables/users';
import { RootState } from '../../store';
import { selectCurrentContest } from '../contest/selectors';

export const selectCurrentUsers = (state: RootState): UserData[] => {
    const { selectedContest } = state.contestInfo;

    return selectedContest ? state.resultsInfo.users.filter((user: UserData) =>
        user.contest_id === selectedContest) : [];
}
