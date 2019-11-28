import { combineReducers, createStore, Store } from 'redux';
import { readersControlReducer as readersControl, ReaderControlState } from './control-panel-store';
import { raceInfoReducer as raceInfo, RaceInfoState } from './race-info-store';
import { resultsInfoReducer as resultsInfo, ResultsInfoState } from './results-info-store';
import { registrationReducer as registration, RegistrationState } from './registration-store';
import { rssiChartReducer as rssiChart, RSSIChartState } from './rssi-chart-store';

export interface Action<T> {
    type: string;
    payload?: T;
}

export interface RootState {
    readersControl: ReaderControlState;
    raceInfo: RaceInfoState;
    resultsInfo: ResultsInfoState;
    registration: RegistrationState;
    rssiChart: RSSIChartState;
}

export const store: Store<RootState> = createStore(combineReducers({
    readersControl,
    raceInfo,
    resultsInfo,
    registration,
    rssiChart,
}));

