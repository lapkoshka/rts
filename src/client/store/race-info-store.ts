import { CurrentRaces } from '../../server/controllers/race/race-info-view';
import { defaultRaceParams, RaceParams } from '../../server/lib/domain/race';
import { Action } from './index';

type RaceInfoAction = Action<CurrentRaces | RaceParams>;

export interface RaceInfoState {
    currentRaces: CurrentRaces;
    raceParams: RaceParams;
}

export const initialState: RaceInfoState = {
    currentRaces: [],
    raceParams: defaultRaceParams,
};

export const setCurrentRaces = (payload: CurrentRaces) => ({
    type: 'SET_CURRENT_RACES',
    payload,
});

export const setRaceParams = (payload: RaceParams) => ({
    type: 'SET_RACE_PARAMS',
    payload,
});

export default (state = initialState, action: RaceInfoAction) => {
    switch (action.type) {
        case 'SET_CURRENT_RACES':
            return {
                ...state,
                currentRaces: action.payload as CurrentRaces,
            };
        case 'SET_RACE_PARAMS':
            return {
                ...state,
                raceParams: action.payload as RaceParams,
            };
        default:
            return state;
    }
};
