import { Nullable } from '../../common/types';
import { ContestData } from '../../server/view-data/contests/contests';
import { Action } from './index';

type ContestInfoAction = Action<ContestData[] | number>;

const SET_CONTEST_LIST = 'contest/SET_CONTEST_LIST';
const SET_SELECTED_CONTEST = 'contest/SET_SELECTED_CONTEST';

const LS_CONTEST_ID = 'SELECTED_CONTEST';

export interface ContestInfoState {
    contestList: ContestData[];
    selectedContest: Nullable<number>;
}

export const initialState: ContestInfoState = {
    contestList: [],
    selectedContest: Number(localStorage.getItem(LS_CONTEST_ID)),
};

export const setContestList = (payload: ContestData[]) => ({
    type: SET_CONTEST_LIST,
    payload,
});

export const setSelectedContest = (payload: number) => ({
    type: SET_SELECTED_CONTEST,
    payload,
})

export const contestInfoReducer = (state = initialState, action: ContestInfoAction) => {
    switch (action.type) {
        case SET_CONTEST_LIST:
            return {
                ...state,
                contestList: action.payload as ContestData[],
            };
        case SET_SELECTED_CONTEST:
            localStorage.setItem(LS_CONTEST_ID, action.payload.toString());

            return {
                ...state,
                selectedContest: action.payload as number,
            }
        default:
            return state;
    }
};
