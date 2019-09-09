import {combineReducers, createStore} from 'redux';
import readersControl from './reader-control-actions';
import raceInfo from './race-info-actions';
import resultsInfo from './results-info-action';

const store = createStore(combineReducers({
  readersControl,
  raceInfo,
  resultsInfo
}));

export default store;
