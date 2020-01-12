import { Nullable } from '../../common/types';
import { ContestData } from '../../server/view-data/contests/contests';
import { Action } from './index';

type ContestInfoAction = Action<ContestData[] | number | boolean>;

const SET_CONTEST_LIST = 'contest/SET_CONTEST_LIST';
const SET_SELECTED_CONTEST = 'contest/SET_SELECTED_CONTEST';
const SET_SHOW_CONTEST_SETTINGS = 'contest/SET_SHOW_CONTEST_SETTINGS';

const LS_CONTEST_ID = 'SELECTED_CONTEST';

export interface ContestInfoState {
    contestList: ContestData[];
    selectedContest: Nullable<number>;
    showContestSettings: boolean;
}

export const initialState: ContestInfoState = {
    contestList: [],
    selectedContest: Number(localStorage.getItem(LS_CONTEST_ID)),
    showContestSettings: false,
};

export const setContestList = (payload: ContestData[]) => ({
    type: SET_CONTEST_LIST,
    payload,
});

export const setSelectedContest = (payload: number) => ({
    type: SET_SELECTED_CONTEST,
    payload,
});

export const showContestSettings = (payload: boolean) => ({
    type: SET_SHOW_CONTEST_SETTINGS,
    payload,
});

export const contestInfoReducer = (state = initialState, action: ContestInfoAction) => {
    switch (action.type) {
        case SET_CONTEST_LIST:
            return {
                ...state,
                contestList: action.payload as ContestData[],
            };
        case SET_SELECTED_CONTEST:
            if (action.payload) {
                localStorage.setItem(LS_CONTEST_ID, action.payload.toString());
            }

            return {
                ...state,
                selectedContest: action.payload as number,
            };
        case SET_SHOW_CONTEST_SETTINGS:
            return {
                ...state,
                showContestSettings: action.payload as boolean,
            };
        default:
            return state;
    }
};