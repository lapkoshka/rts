import { ContestData } from '../../server/storage/domains/contests';
import { Action } from './index';

type ContestInfoAction = Action<ContestData[] | number | boolean>;

const SET_CONTEST_LIST = 'contest/SET_CONTEST_LIST';
const SET_SELECTED_CONTEST = 'contest/SET_SELECTED_CONTEST';
const SET_SHOW_CONTEST_SETTINGS = 'contest/SET_SHOW_CONTEST_SETTINGS';

export interface ContestInfoState {
    contestList: ContestData[];
    selectedContest: number|undefined;
    showContestSettings: boolean;
}

export const initialState: ContestInfoState = {
    contestList: [],
    selectedContest: undefined,
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
