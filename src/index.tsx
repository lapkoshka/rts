import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/components/app/app';
import { Provider } from 'react-redux';
import store from './client/store/index';
import 'antd/dist/antd.css';
import './client/static/style/main.scss';
// @ts-ignore
const electron = window.require('electron');
// const fs = electron.remote.require('fs');

const ipc  = electron.ipcRenderer;

// TODO make a component with fields and buttons
// @ts-ignore
window.fakePortableTag = (uid, rssi) => ipc.send('fakePortableTag', { uid, rssi });
// @ts-ignore
window.fakeMainTag = (uid, rssi) => ipc.send('fakeMainTag', { uid, rssi});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);
