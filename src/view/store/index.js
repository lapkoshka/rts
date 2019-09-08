import {combineReducers, createStore} from 'redux';
import readersControl from './readers-control';

export default createStore(combineReducers({
  readersControl,
}));
