import { combineReducers, createStore, Store } from 'redux';
import readersControl, { ReaderControlState } from './control-panel-store';
import raceInfo, { RaceInfoState } from './race-info-store';
import resultsInfo, { ResultsInfoState } from './results-info-store';
import registration, { RegistrationState } from './registration-store';
import rssiChart, { RSSIChartState } from './rssi-chart-store';

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

const store: Store<RootState> = createStore(combineReducers({
    readersControl,
    raceInfo,
    resultsInfo,
    registration,
    rssiChart,
}));

export default store;
