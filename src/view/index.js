import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux'
import readersControl from './store/readers-control'

import {combineReducers, createStore} from 'redux';
import {setReaderStatus} from './store/readers-control';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <App ipc={window.ipc}/>
  </Provider>
, document.getElementById('root'));
