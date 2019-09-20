import { CurrentRaceLine } from '../../server/controllers/race/race-info-view';
import { Action } from './index';

type RaceInfoAction = Action<CurrentRaceLine[]>;

export interface RaceInfoState {
    currentRaces: CurrentRaceLine[];
}

export const initialState: RaceInfoState = {
    currentRaces: [],
  };

export const setCurrentRaces = (payload: CurrentRaceLine[]) => ({
    type: 'SET_CURRENT_RACES',
    payload,
});

export default (state = initialState, action: RaceInfoAction) => {
    switch (action.type) {
        case 'SET_CURRENT_RACES':
            return {
                ...state,
                currentRaces: action.payload as CurrentRaceLine[]
            };
        default:
            return state;
    }
};
