import { Nullable } from '../../../common/types';
import { ContestData } from '../../../server/view-data/contests/contests';

export const selectContest = (list: ContestData[], id: Nullable<number>): ContestData => {
    if (id === null) {
        return list[0];
    }

    const found = list.find((contestData: ContestData) => contestData.id === id);

    if (!found) {
        return list[0];
    }

    return found;
}
