import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './store';
import { ipcRenderer as ipc} from 'electron';
import 'antd/dist/antd.css';
import './static/style/main.scss';

// TODO make a component with fields and buttons
window.fakePortableTag = (uid, rssi) =>
  ipc.send('fakePortableTag', { uid, rssi });
window.fakeMainTag = (uid, rssi) =>
  ipc.send('fakeMainTag', { uid, rssi});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'));
