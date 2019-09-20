import { combineReducers, createStore, Reducer } from 'redux';
import readersControl, { ReaderControlState } from './reader-control-actions';
import raceInfo, { RaceInfoState } from './race-info-actions';
import resultsInfo, { ResultsInfoState } from './results-info-action';
import registration, { RegistrationState } from './registration-actions';

export interface Action<T> {
    type: string;
    payload?: T;
}

interface RootState {
    readerControl: ReaderControlState;
    raceInfo: RaceInfoState;
    resultsInfo: ResultsInfoState;
    registration: RegistrationState;
}

const store: Reducer<RootState> = createStore(combineReducers({
    readersControl,
    raceInfo,
    resultsInfo,
    registration,
}));

export default store;
