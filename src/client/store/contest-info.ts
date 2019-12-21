import { ContestData } from '../../server/view-data/contests/contests';
import { Action } from './index';

type ContestInfoAction = Action<ContestData[]>;

const SET_CONTEST_LIST = 'contest/SET_CONTEST_LIST';

export interface ContestInfoState {
    contestList: ContestData[];
}

export const initialState: ContestInfoState = {
    contestList: [{
        id: 0,
        name: 'Создайте мероприятие',
        description: 'Нет созданных мероприятий',
        laps: 0,
        started_flag: 1,
        finished_flag: 1,
        start_time: 1,
        finish_time: 1,
    }],
};

export const setContestList = (payload: ContestData[]) => ({
    type: SET_CONTEST_LIST,
    payload,
});

export const contestInfoReducer = (state = initialState, action: ContestInfoAction) => {
    switch (action.type) {
        case SET_CONTEST_LIST:
            return {
                ...state,
                contestList: action.payload as ContestData[],
            };
        default:
            return state;
    }
};
