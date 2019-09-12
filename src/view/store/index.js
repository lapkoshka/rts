import {combineReducers, createStore} from 'redux';
import readersControl from './reader-control-actions';
import raceInfo from './race-info-actions';
import resultsInfo from './results-info-action';
import registration from './registration';

const store = createStore(combineReducers({
    readersControl,
    raceInfo,
    resultsInfo,
    registration,
}));

export default store;
