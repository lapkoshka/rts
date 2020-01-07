import { Nullable } from '../../../common/types';
import { ContestData } from '../../../server/view-data/contests/contests';
import { RootState } from '../../store';

const isContestStarted = (contest: ContestData): boolean =>
    contest.started_flag === 1 && contest.finished_flag === 0;

export const selectContest = (list: ContestData[], id: Nullable<number>): ContestData => {
    if (id === null) {
        return list[0];
    }

    const found = list.find((contestData: ContestData) => contestData.id === id);

    if (!found) {
        return list[0];
    }

    return found;
};


export const selectCurrentContest = (state: RootState): Nullable<ContestData> =>
    state.contestInfo.contestList.find(isContestStarted) || null;
