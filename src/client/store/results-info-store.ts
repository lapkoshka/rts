import { UserData } from '../../server/storage/domains/users';
import { RaceHistoryViewData, TotalInfoViewData } from '../../server/view/domains/results';
import { Action } from './index';

type ResultsInfoStore = Action<RaceHistoryViewData | UserData[] | TotalInfoViewData>;

export interface ResultsInfoState {
    history: RaceHistoryViewData;
    users: UserData[];
    total: TotalInfoViewData;
}

const SET_RACE_HISTORY = 'results/SET_RACE_HISTORY';
const SET_USERS = 'results/SET_USERS';
const SET_TOTAL_INFO = 'results/SET_TOTAL_INFO';

export const setRaceHistory = (payload: RaceHistoryViewData) => ({
    type: SET_RACE_HISTORY,
    payload,
});

export const setUsers = (payload: UserData[]) => ({
    type: SET_USERS,
    payload,
});

export const setTotalInfo = (payload: TotalInfoViewData) => ({
    type: SET_TOTAL_INFO,
    payload,
});

export const initialState: ResultsInfoState = {
    history: [],
    users: [],
    total: [],
};

export const resultsInfoReducer = (state = initialState, action: ResultsInfoStore) => {
    switch (action.type) {
        case SET_RACE_HISTORY:
            return {
                ...state,
                history: action.payload as RaceHistoryViewData,
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload as UserData[],
            };
        case SET_TOTAL_INFO:
            return {
                ...state,
                total: action.payload as TotalInfoViewData,
            };
        default:
            return state;
    }
};
