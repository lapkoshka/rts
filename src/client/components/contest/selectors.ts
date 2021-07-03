import { Nullable } from '../../../common/types';
import { ContestData } from '../../../server/storage/domains/contests';
import { RootState } from '../../store';

const isContestStarted = (contest: ContestData): boolean =>
    contest.started_flag === 1 && contest.finished_flag === 0;

export const selectContest = (state: RootState): ContestData => {
    const { selectedContest } = state.contestInfo;

    if (selectedContest === null) {
        return state.contestInfo.contestList[0];
    }

    const found = state.contestInfo.contestList.find((contestData: ContestData) =>
        contestData.id === selectedContest);

    if (!found) {
        return state.contestInfo.contestList[0];
    }

    return found;
};


export const selectCurrentContest = (state: RootState): Nullable<ContestData> =>
    state.contestInfo.contestList.find(isContestStarted) || null;
