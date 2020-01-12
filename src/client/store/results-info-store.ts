import { UserData } from '../../server/modules/database/tables/users';
import { Action } from './index';
import { RaceHistory } from '../../server/controllers/results/history';
import { TotalInfo } from '../../server/controllers/results/total';

type ResultsInfoStore = Action<RaceHistory | UserData[] | TotalInfo>;

export interface ResultsInfoState {
    history: RaceHistory;
    users: UserData[];
    total: TotalInfo;
}

const SET_RACE_HISTORY = 'results/SET_RACE_HISTORY';
const SET_USERS = 'results/SET_USERS';
const SET_TOTAL_INFO = 'results/SET_TOTAL_INFO';

export const setRaceHistory = (payload: RaceHistory) => ({
    type: SET_RACE_HISTORY,
    payload,
});

export const setUsers = (payload: UserData[]) => ({
    type: SET_USERS,
    payload,
});

export const setTotalInfo = (payload: TotalInfo) => ({
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
                history: action.payload as RaceHistory,
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload as UserData[],
            };
        case SET_TOTAL_INFO:
            return {
                ...state,
                total: action.payload as TotalInfo,
            };
        default:
            return state;
    }
};
