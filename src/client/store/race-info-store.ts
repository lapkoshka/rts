import { CurrentRaces } from '../../server/controllers/race/race-info-view';
import { Action } from './index';

type RaceInfoAction = Action<CurrentRaces>;

export interface RaceInfoState {
    currentRaces: CurrentRaces;
}

export const initialState: RaceInfoState = {
    currentRaces: [],
  };

export const setCurrentRaces = (payload: CurrentRaces) => ({
    type: 'SET_CURRENT_RACES',
    payload,
});

export default (state = initialState, action: RaceInfoAction) => {
    switch (action.type) {
        case 'SET_CURRENT_RACES':
            return {
                ...state,
                currentRaces: action.payload as CurrentRaces
            };
        default:
            return state;
    }
};
