import {combineReducers, createStore} from 'redux';
import readersControl from './readers-control/reader-control-actions';
import raceInfo from './race-info/race-info-actions';

const store = createStore(combineReducers({
  readersControl,
  raceInfo
}));

export default store;
