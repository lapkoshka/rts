import {combineReducers, createStore} from 'redux';
import readersControl from './readers-control';
import raceInfo from './race-info';

const store = createStore(combineReducers({
  readersControl,
  raceInfo
}));

export default store;
