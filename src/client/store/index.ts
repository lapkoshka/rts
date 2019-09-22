import { combineReducers, createStore, Store } from 'redux';
import readersControl, { ReaderControlState } from './control-panel-store';
import raceInfo, { RaceInfoState } from './race-info-store';
import resultsInfo, { ResultsInfoState } from './results-info-store';
import registration, { RegistrationState } from './registration-store';

export interface Action<T> {
    type: string;
    payload?: T;
}

export interface RootState {
    readersControl: ReaderControlState;
    raceInfo: RaceInfoState;
    resultsInfo: ResultsInfoState;
    registration: RegistrationState;
}

const store: Store<RootState> = createStore(combineReducers({
    readersControl,
    raceInfo,
    resultsInfo,
    registration,
}));

export default store;
